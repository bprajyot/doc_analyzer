from flask import Blueprint, request, jsonify, send_file

from server.agents.summarizer import document_summarizer
from server.agents.risk_analyzer import risk_analyzer
from server.agents.metadata_collector import metadata_collector

from server.utils.document_parser import parse_pdf

from server.services.database import get_all_docs, get_doc_by_id, upload_document
from server.services.files import save_to_storage, get_url, download_document

from server.config import supabase
from datetime import datetime
import os
import uuid

documents = Blueprint('documents', __name__)

@documents.route('/documents/stats', methods=["GET"])
def get_stats():
    try:
        response = supabase.table("documents_details").select("*").execute()
        documents = response.data or []
        total = len(documents)
        risky = sum(1 for doc in documents if doc.get("risks")!="No issues found")

        return jsonify({
            "total": total,
            "risky": risky    
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@documents.route('/documents/upload', methods=["POST"])
def upload_documents():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    content = file.read()
    
    stamp = datetime.now().strftime(f"%H%M%S")
    old_name, ext = os.path.splitext(file.filename)
    new_name = f"{old_name}{stamp}{ext}"

    temp = save_to_storage(content, new_name)
    url = get_url(new_name, "documents") 
    text = parse_pdf(content)
    summarize = document_summarizer()
    summary = summarize(text)
    meta_data_ext = metadata_collector()
    metadata = meta_data_ext(text)
    risks_analyser = risk_analyzer()
    risks = risks_analyser(text)
    
    data = {
        "id": str(uuid.uuid4()),
        "filename": new_name,
        "summary": summary,
        "metadata": metadata,
        "risks": risks,
        "url": url,
    }

    upload_document(new_name, summary, metadata, risks, url)
    # save_to_storage(content, new_name)
    return jsonify({
        "message": "Document processed",
        "data": data
    }), 200

@documents.route('/documents/report/list', methods=["GET"])
def get_documents():
    docs = get_all_docs()
    return jsonify(docs), 200

@documents.route('/documents/report/<string:document_id>', methods=["GET"])
def get_document(document_id):
    doc = get_doc_by_id(document_id)
    if not doc:
        return jsonify({"error": "Document not found"}), 404
    return jsonify(doc)