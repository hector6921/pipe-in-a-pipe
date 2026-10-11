FROM python:latest

WORKDIR .
COPY ./requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
ENV FLASK_APP=application.py

ENTRYPOINT flask run --host=0.0.0.0
EXPOSE 5000
