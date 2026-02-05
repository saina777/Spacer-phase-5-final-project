from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .config import Config
from .database import db, migrate

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)
    JWTManager(app)

    # Register blueprints (to be added as we create routes)
    # from .users.routes import users_bp
    # app.register_blueprint(users_bp)
    
    @app.route('/')
    def index():
        return {"message": "Spacer API is running"}

    return app
