import os
import uuid
from datetime import datetime
from config import supabase
from server.config import Config

def save(filename, summary, metadata, risks, doc_url):
    try:
        doc_id = str(uuid.uuid4())
        data = {
            "id": doc_id,
            "filename": filename,
            "summary": summary,
            "metadata": metadata,
            "risks": risks,
            "doc_url": doc_url,
            "created_at": datetime.now().isoformat(),
        }

        response = supabase.table("documents_details").insert(data).execute()

        # ✅ New API returns dict, not object with .error
        if hasattr(response, "error") and response.error:
            raise Exception(response.error.message)
        
        return response.data or data

    except Exception as e:
        return {"error": str(e)}
    
def get_all_docs(supabase = Config.supabase):
    try:
        response = supabase.table("documents_details").select("*").execute()
        if hasattr(response, "error") and response.error:
            raise Exception(response.error.message)
        return response.data

    except Exception as e:
        return {"error": str(e)}
    
def get_doc_by_id(doc_id: str, supabase = Config.supabase):
    try:
        response = supabase.table("documents_details").select("*").eq("id", doc_id).single().execute()

        if hasattr(response, "error") and response.error:
            raise Exception(response.error.message)
        return response.data if response.data else {"message": "Document not found"}

    except Exception as e:
        return {"error": str(e)}