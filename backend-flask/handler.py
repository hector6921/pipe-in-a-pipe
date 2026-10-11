import subprocess
import json
from operator import itemgetter
import requests


def build_app(url, framework):
    repo_folder = get_folder(url)
    subprocess.call(f'git clone {url}', shell=True)

    if framework == 'flask':
        subprocess.call('docker build -t "flask-container" ./flask/DockerfileFlask', shell=True)
    elif framework == 'react':
        subprocess.call('docker build -t "react-container" ./react/DockerfileReact', shell=True)
    else:
        return None

    subprocess.call('sh ./backend-flask/build.sh {} {}'.format(url, repo_folder), shell=True)
    return None


def get_folder(url):
    repo_folder = url.split('/', 4)[4].split('.')[0]
    return repo_folder


def get_repos(auth_token, user):
    response = requests.get(f'https://api.github.com/users/{user}/repos', headers={'Authorization': f'token {auth_token}'})
    return json.loads(response.text)


def get_user_info(auth_token):
    user_data = []
    user_keys = ['avatar_url', 'name', 'login', 'html_url']
    response = requests.get('https://api.github.com/user', headers={'Authorization': f'token {auth_token}'})
    full_api_call = json.loads(response.text)
    user_data = itemgetter(*user_keys)(full_api_call)
    return user_data
