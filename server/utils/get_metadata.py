import json
from server.config import supabase  # your Supabase config class

def fetch_metadata(record_id: str):
    response = supabase.table("documents_details").select("metadata").eq("id", record_id).execute()
    
    if not response.data:
        print("No record found.")
        return None

    metadata_raw = response.data[0].get("metadata")

    if isinstance(metadata_raw, str):
        try:
            metadata = json.loads(metadata_raw)
        except json.JSONDecodeError:
            print("Invalid JSON string found.")
            metadata = metadata_raw
    else:
        metadata = metadata_raw

    return metadata
