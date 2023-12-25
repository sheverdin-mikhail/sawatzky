FROM python:3.9

RUN mkdir -p /home/app


# Install pip requirements
RUN python -m pip install --upgrade pip


COPY ./req.txt .
RUN pip install -r req.txt


RUN groupadd app
RUN useradd -m -g app app -p dfqw12fewefwq
RUN usermod -aG app app

ENV HOME=/home/app
ENV APP_HOME=/home/app/back

RUN mkdir $APP_HOME
RUN mkdir $APP_HOME/staticfiles
RUN mkdir -m=777 $APP_HOME/media
WORKDIR $APP_HOME


COPY . $APP_HOME

RUN chown -R app $APP_HOME

USER app