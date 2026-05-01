from pymongo import MongoClient
import os
MONGO_URI = os.environ.get("MONGO_URL") or os.environ.get("MONGODB_URI")
if not MONGO_URI:
    MONGO_URI = "mongodb://localhost:27017/ethara"
safe_url = MONGO_URI.split('@')[-1] if '@' in MONGO_URI else MONGO_URI
print(f"Attempting to connect to host: {safe_url}")
client = MongoClient(MONGO_URI,authSource="Admin")
db = client.get_database("railway")
print("Successfully connected to MongoDB!")
