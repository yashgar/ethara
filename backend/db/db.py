from pymongo import MongoClient
import os
from dotenv import load_dotenv
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/ethara")
client = MongoClient(MONGO_URI)
db = client['ethara']
print("Successfully connected to MongoDB!")