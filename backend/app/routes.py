from flask import Blueprint, jsonify, request
from .services import (
    get_stops, update_stops,
    get_agencies, update_agencies,
    get_routes, update_routes,
    get_calendar, update_calendar
)

api = Blueprint('api', __name__)

# Stops
@api.route('/stops', methods=['GET'])
def api_get_stops():
    data = get_stops()
    return jsonify(data)

@api.route('/stops', methods=['POST'])
def api_update_stops():
    data = request.json
    update_stops(data)
    return {'status': 'ok'}

# Agencies
@api.route('/agencies', methods=['GET'])
def api_get_agencies():
    data = get_agencies()
    return jsonify(data)

@api.route('/agencies', methods=['POST'])
def api_update_agencies():
    data = request.json
    update_agencies(data)
    return {'status': 'ok'}

# Routes
@api.route('/routes', methods=['GET'])
def api_get_routes():
    data = get_routes()
    return jsonify(data)

@api.route('/routes', methods=['POST'])
def api_update_routes():
    data = request.json
    update_routes(data)
    return {'status': 'ok'}

# Calendar
@api.route('/calendar', methods=['GET'])
def api_get_calendar():
    data = get_calendar()
    return jsonify(data)

@api.route('/calendar', methods=['POST'])
def api_update_calendar():
    data = request.json
    update_calendar(data)
    return {'status': 'ok'}
