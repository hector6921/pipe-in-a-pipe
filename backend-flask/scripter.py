import subprocess


def build_app(url, framework):
    repo_folder = get_folder(url)
    subprocess.call("sh ./terraform/provision.sh {} {}".format(url, repo_folder), shell=True)
    return None


def get_folder(url):
    repo_folder = url.split('/', 4)[4].split('.')[0]
    return repo_folder


build_app('https://github.com/example/project.git', 'flask')
