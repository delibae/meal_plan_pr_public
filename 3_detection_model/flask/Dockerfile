FROM python:3.10-slim-bullseye


RUN python3 -m pip install --upgrade pip

RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

# COPY requirements2.txt requirements2.txt

# RUN pip install -r requirements2.txt

# COPY requirements3.txt requirements3.txt

# RUN pip install -r requirements3.txt

COPY . ./docker

EXPOSE 30003

CMD ["python", "./docker/app.py"]

