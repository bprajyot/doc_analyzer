from supabase import create_client, Client
from server.config import Config
import uuid
from datetime import datetime

# Initialize Supabase client
supabase: Client = create_client(Config.supabase_url, Config.supabase_key)


# Upload a file to Supabase Storage and return its public URL
def upload_document(file_stream, file_name: str, bucket_name: str = Config.bucket_name):
    try:
        # Upload file (overwrite if it already exists)
        supabase.storage.from_(bucket_name).upload(file_name, file_stream, {"upsert": True})
        
        # Get public URL
        doc_url = supabase.storage.from_(bucket_name).get_public_url(file_name)
        return doc_url
    
    except Exception as e:
        return {"error": str(e)}


# Store metadata and document info in the "documents" table
def store_data(filename, summary, metadata, risks, doc_url):
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

        response = supabase.table("documents").insert(data).execute()

        # ✅ New API returns dict, not object with .error
        if hasattr(response, "error") and response.error:
            raise Exception(response.error.message)
        
        return response.data or data

    except Exception as e:
        return {"error": str(e)}
