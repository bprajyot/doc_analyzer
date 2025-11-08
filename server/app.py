from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Register Blueprints
    from server.routes.documents import documents
    # from routes.risks import risks

    app.register_blueprint(documents, url_prifix='/documents')
    # app.register_blueprint(risks, url_prifix='/risks')

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)    