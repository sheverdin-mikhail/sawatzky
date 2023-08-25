# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.9

WORKDIR /home/app/web

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1
# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1


# install psycopg2 dependencies
RUN apt-get update\
    && apt-get install netcat -y
RUN apt-get upgrade -y  && apt-get install postgresql gcc python3-dev musl-dev -y

# Install pip requirements
RUN python -m pip install --upgrade pip
COPY ./req.txt .
RUN python -m pip install -r req.txt


COPY . .
