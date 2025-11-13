import os
import uuid
from datetime import datetime
from server.config import supabase
from server.config import Config
import json

def upload_document(filename, summary, metadata, risks, doc_url):
    try:
        doc_id = str(uuid.uuid4())
        data = {
            "id": doc_id,
            "filename": filename,
            "summary": summary,
            "metadata": json.dumps(metadata),
            "risks": json.dumps(risks),
            "url": doc_url,  # consistent naming
        }

        print("Uploading to Supabase:")
        response = supabase.table("documents_details").insert(data).execute()
        print("Supabase insert response:")

        if not getattr(response, "data", None):
            raise Exception(f"Insert failed: {response}")

        return response.data or data

    except Exception as e:
        print("Upload error:", str(e))
        return {"error": str(e)}

def get_all_docs(supabase = supabase):
    try:
        response = supabase.table("documents_details").select("*").execute()
        if hasattr(response, "error") and response.error:
            raise Exception(response.error.message)
        return response.data

    except Exception as e:
        return {"error": str(e)}
    
def get_doc_by_id(doc_id: str, supabase=supabase):
    try:
        # Don't use .single(); just get the list of results
        response = supabase.table("documents_details").select("*").eq("id", doc_id).execute()

        if hasattr(response, "error") and response.error:
            raise Exception(response.error.message)

        data = response.data
        if not data:
            return None  # No document found

        # Return the first document
        return data[0]

    except Exception as e:
        print(f"Error fetching document {doc_id}: {e}")
        return None
