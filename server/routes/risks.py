from flask import Blueprint, request, jsonify, send_file

from server.services.database import get_all_docs, get_doc_by_id, upload_document

from server.utils.get_metadata import fetch_metadata
from server.utils.create_pdf import create_pdf

risks = Blueprint('risks', __name__)

# return a list of all the risky document's details
@risks.route('/risks/report/list', methods=['GET'])
def get_risks():
    pass
    docs = get_all_docs()
    risky_docs = []
    for doc in docs:
        if doc.get("risks") != "No issues found":
            id = doc["id"]
            metadata = fetch_metadata(id)
            risky_docs.append(
                {
                    "id": doc["id"],
                    "title": "Risk Report",
                    "document": {
                        'filename': doc['filename'],
                        'summary': doc['summary'],
                        'metadata': metadata
                    },
                    "description": doc["risks"]
                }
            )

    return jsonify(risky_docs), 200

# return a risky document's details of mentioned id

@risks.route('/risks/report/<string:risk_id>', methods=['GET'])
def get_risk_report(risk_id):
    doc = get_doc_by_id(risk_id)
    if not doc:
        return jsonify({"error": "Document not found"}), 404
    if doc.get("risks") == "No issues found":
        return jsonify({"error": "No issues found"}), 404

    metadata = fetch_metadata(risk_id)
    report = {
        "id": doc["id"],
        "title": "Risk Report",
        "document": {
            'filename': doc['filename'],
            'summary': doc['summary'],
            'metadata': metadata
        },
        "description": doc["risks"]
    }
    return jsonify(report), 200