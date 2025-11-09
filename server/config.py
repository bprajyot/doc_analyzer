import os
from dotenv import load_dotenv
from supabase import create_client, Client
load_dotenv()

class Config:
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_KEY')
    bucket_name = os.getenv('SUPABASE_BUCKET_NAME')

supabase: Client = create_client(Config.supabase_url, Config.supabase_key)