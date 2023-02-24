FROM python:3.10-slim-bullseye

COPY . ./docker

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

RUN pip install boto3


EXPOSE 30004

CMD ["python", "./docker/app.py"]

