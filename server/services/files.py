from config import supabase
import os
# Upload a file to Supabase Storage and return its public URL
def upload_document(file_stream, file_name: str, address: str = "documents/actual"):
    try:
        # Upload file (overwrite if it already exists)
        supabase.storage.from_(address).upload(file_name, file_stream, {"upsert": True})
        
        doc_url = supabase.storage.from_(address).get_public_url(file_name)
        return doc_url
    
    except Exception as e:
        return {"error": str(e)}

# pass the address as documents/actual or documents/summarized
def get_url(file_name: str, address: str):
    try:
        path = f"{address}/{file_name}"
        url = supabase.storage.from_(address).get_public_url(path)
    except Exception as e:
        return {"error": str(e)}
    
# pass the address as documents/actual or documents/summarized
def download_document(file_name: str, address: str, download_path: str="./downlaods"):
    try:
        parts = address.split("/", 1)
        if len(parts) != 2:
            return {"error": "Invalid address format. Use 'documents/actual' or 'documents/summarized'."}

        bucket_name, folder = parts
        storage_path = f"{folder}/{file_name}"

        response = supabase.storage.from_(bucket_name).download(storage_path)

        if isinstance(response, dict) and response.get("error"):
            raise Exception(response["error"]["message"])

        os.makedirs(download_path, exist_ok=True)

        local_file_path = os.path.join(download_path, file_name)

        file_bytes = response if isinstance(response, (bytes, bytearray)) else response.read()
        with open(local_file_path, "wb") as f:
            f.write(file_bytes)

        return {"path": os.path.abspath(local_file_path)}

    except Exception as e:
        return {"error": str(e)}