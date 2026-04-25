import os
import time
import xml.etree.ElementTree as ET
from sqlalchemy.exc import OperationalError
import random
from flask import Flask, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, MetaData, Table
from sqlalchemy.orm import declarative_base, sessionmaker

app = Flask(__name__)
CORS(app)

DATABASE_URL = os.environ.get("DATABASE_URL", "sqlite:///./mirac.db")
engine = create_engine(DATABASE_URL)
Base = declarative_base()
Session = sessionmaker(bind=engine)

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    password = Column(String)

class Plant(Base):
    __tablename__ = 'plants'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    municipality = Column(String)

def init_db():
    max_retries = 15
    for i in range(max_retries):
        try:
            Base.metadata.create_all(engine)
            print("Database connected and initialized.")
            return
        except OperationalError:
            print(f"Database not ready, retrying {i+1}/{max_retries}...")
            time.sleep(2)
    print("Failed to connect to database.")

init_db()

def load_plants():
    session = Session()
    if session.query(Plant).count() == 0:
        try:
            tree = ET.parse('/app/AIGUA_DEPURADORES.gml')
            root = tree.getroot()
            namespaces = {'fme': 'http://www.safe.com/gml/fme', 'gml': 'http://www.opengis.net/gml'}
            for member in root.findall('gml:featureMember', namespaces):
                plant_node = member.find('fme:AIGUA_DEPURADORES', namespaces)
                if plant_node is not None:
                    name = plant_node.find('fme:NOM_EDAR', namespaces)
                    muni = plant_node.find('fme:NOM_MUNI', namespaces)
                    if name is not None and muni is not None:
                        session.add(Plant(name=name.text, municipality=muni.text))
            session.commit()
            print("Loaded plants from GML")
        except Exception as e:
            print("Error loading plants:", e)
            # Add some mock plants if file is missing
            session.add(Plant(name="Mock Plant 1", municipality="Barcelona"))
            session.add(Plant(name="Mock Plant 2", municipality="Tarragona"))
            session.commit()
    session.close()

# In a real app we'd load this correctly after DB is ready, we'll just do it on first request
@app.before_request
def before_request_func():
    if not hasattr(app, 'initialized'):
        load_plants()
        app.initialized = True

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400
        
    session = Session()
    user = session.query(User).filter_by(email=email).first()
    if user:
        session.close()
        return jsonify({"error": "User already exists"}), 400
        
    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    session.add(new_user)
    session.commit()
    session.close()
    
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400
    
    session = Session()
    user = session.query(User).filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        session.close()
        return jsonify({"error": "Invalid email or password"}), 401
        
    session.close()
    return jsonify({"message": "Logged in successfully", "token": "mock-jwt-token"})

@app.route('/api/dashboard', methods=['GET'])
def dashboard():
    session = Session()
    plants = session.query(Plant).limit(10).all()
    session.close()
    
    river_mouths = [
        {"id": 1, "name": "Llobregat River Mouth", "status": "Polluted", "pollutionLevel": 0.8},
        {"id": 2, "name": "Besòs River Mouth", "status": "Clean", "pollutionLevel": 0.2},
        {"id": 3, "name": "Ter River Mouth", "status": "Warning", "pollutionLevel": 0.6},
        {"id": 4, "name": "Ebre River Mouth", "status": "Clean", "pollutionLevel": 0.1},
        {"id": 5, "name": "Francolí River Mouth", "status": "Polluted", "pollutionLevel": 0.9},
    ]
    
    # Assign a random plant as the source of pollution for polluted mouths
    results = []
    for mouth in river_mouths:
        source = None
        if mouth["status"] in ["Polluted", "Warning"] and plants:
            plant = random.choice(plants)
            source = {
                "name": plant.name,
                "municipality": plant.municipality,
                "confidence": round(random.uniform(0.7, 0.99), 2),
                "reason": "Copernicus satellite detected anomaly correlating with recent heavy rainfall in the area."
            }
        results.append({
            "mouth": mouth,
            "source": source
        })
        
    return jsonify(results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
