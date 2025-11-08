from server.config import supabase
import os

# Upload details of document to the storage
def save_to_storage(file_stream, file_name: str):
    try:
        # Ensure we have bytes
        if hasattr(file_stream, "read"):
            file_bytes = file_stream.read()
        else:
            file_bytes = file_stream

        file_path = f"actual/{file_name}"
        print("Uploading to Supabase Storage:", file_path)

        # Try uploading — if the file exists, delete first to emulate upsert
        try:
            # Attempt upload
            response = supabase.storage.from_("documents").upload(
                file_path,
                file_bytes,
                file_options={"content-type": "application/pdf"}
            )
        except Exception as e:
            # If file already exists, delete it and retry
            if "already exists" in str(e).lower():
                print("File exists, deleting and re-uploading...")
                supabase.storage.from_("documents").remove([file_path])
                response = supabase.storage.from_("documents").upload(
                    file_path,
                    file_bytes,
                    file_options={"content-type": "application/pdf"}
                )
            else:
                raise e

        print("Storage upload response:", response)

        # Generate a public URL
        public_url = supabase.storage.from_("documents").get_public_url(file_path)
        print("Public URL:", public_url)

        return public_url

    except Exception as e:
        print("Storage upload failed:", str(e))
        return f"ERROR: {str(e)}"



# pass the address as documents/actual or documents/summarized


def get_url(file_name: str, address: str) -> str:
    try:
        response = supabase.storage.from_(address).get_public_url(file_name)
        if isinstance(response, dict):
            public_url = response.get("data", {}).get("publicUrl")
        else:
            public_url = str(response)
        if not public_url:
            raise Exception("No public URL returned.")

        return public_url

    except Exception as e:
        print(f"[get_url ERROR] {e}")
        return f"ERROR: {str(e)}"


# pass the address as documents/actual or documents/summarized
def download_document(file_name: str, address: str, download_path: str = "./downlaods"):
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

        file_bytes = response if isinstance(
            response, (bytes, bytearray)) else response.read()
        with open(local_file_path, "wb") as f:
            f.write(file_bytes)

        return {"path": os.path.abspath(local_file_path)}

    except Exception as e:
        return {"error": str(e)}
