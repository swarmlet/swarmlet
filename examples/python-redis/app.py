from flask import Flask
from redis import Redis
import socket

app = Flask(__name__)
redis = Redis(host='redis', port=6379)

@app.route('/')
def hello():
    count = redis.incr('hits')
    host_name = socket.gethostname()
    host_ip = socket.gethostbyname(host_name)
    return '<h1>Hello World!</h1>' \
        'I have been seen %s times<br>' \
        'HostName = %s<br>' \
        'IP = %s<br>' \
        'Try refreshing the page.' % (count, host_name, host_ip)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)

