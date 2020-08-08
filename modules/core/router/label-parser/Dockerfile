FROM python:3.8-alpine

WORKDIR /app

COPY . .

RUN pip3 --disable-pip-version-check --no-cache-dir install -r requirements.txt

ENTRYPOINT [ "./label-parser" ]
