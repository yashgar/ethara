import os
from pymongo import MongoClient

MONGO_URI = os.environ.get("MONGO_URL")

if not MONGO_URI:
    MONGO_URI = "mongodb://localhost:27017/ethara"

print(f"⚠️ DEBUG: Booting up with MONGO_URI string length: {len(MONGO_URI)}")

client = MongoClient(MONGO_URI)

db = client.get_database("ethara_db")
print("Successfully connected to MongoDB!")
