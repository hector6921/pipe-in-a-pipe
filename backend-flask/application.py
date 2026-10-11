import os
from flask import Flask, session, request, redirect, jsonify
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO
import requests
import json
import handler

application = Flask(__name__)
CORS(application)
socketio = SocketIO(application=application, cors_allowed_origins='*')
application.secret_key = os.environ.get('FLASK_SECRET_KEY', 'dev-secret-key')
session_data = {"auth_token": "", "user": ""}
client_ip = os.environ.get('CLIENT_IP', 'localhost')

profile_data = []

@application.route('/dashboard', methods=["GET"])
@cross_origin()
def display_dashboard():
    user_info = handler.get_user_info(session_data["auth_token"])
    session_data["user"] = user_info[2]
    user_repos = handler.get_repos(session_data["auth_token"], session_data["user"])
    return {"user_info": user_info, "repos": user_repos, "status": 200}

@application.route('/getGithubToken')
def exchange_token():
    exchange_code = str(request.args.get('code'))
    json_fcm_data = {
        'client_id': os.environ.get('GITHUB_CLIENT_ID', 'your-client-id'),
        'client_secret': os.environ.get('GITHUB_CLIENT_SECRET', 'your-client-secret'),
        'code': exchange_code,
    }
    json_header = {'Accept': 'application/json'}
    response = requests.post('https://github.com/login/oauth/access_token', headers=json_header, json=json_fcm_data)
    responsejson = json.loads(response.text)

    if 'access_token' in responsejson:
        session_data['auth_token'] = responsejson['access_token']
        return redirect(f'http://{client_ip}:3000/dashboard')

    return redirect(f'http://{client_ip}:3000/')

@application.route('/repoWorkingStation', methods=['POST'])
def displayRepoInfo():
    return redirect(f'http://{client_ip}:3000/repo-work-station')

@application.route('/start_deployment')
def deploy_app():
    handler.build_app()
    return jsonify({"status": "deployment started"})

if __name__ == '__main__':
    socketio.run(application, host='0.0.0.0', port=5000)
