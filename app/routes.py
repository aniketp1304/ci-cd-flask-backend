from flask import Blueprint, jsonify
import logging

main = Blueprint('main', __name__)
logger = logging.getLogger(__name__)

@main.route('/health')
def health_check():
    """Health check endpoint returning 200 OK."""
    logger.info("Health check endpoint called")
    return jsonify({"status": "ok"}), 200

@main.route('/hello')
def hello_world():
    """Hello world endpoint returning JSON."""
    logger.info("Hello world endpoint called")
    return jsonify({"message": "Hello, World!"}), 200
