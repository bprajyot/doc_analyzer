import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    supabase_url = os.getenv('SUPABASE_URL')
    supabase_key = os.getenv('SUPABASE_KEY')
    bucket_name = os.getenv('SUPABASE_BUCKET_NAME')