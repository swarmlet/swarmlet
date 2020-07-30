from flask import Flask
from redis import Redis
from docker import APIClient
import threading
import socket
import json

app = Flask(__name__)
redis = Redis(host='redis', port=6379)
client = APIClient(base_url='unix://var/run/docker.sock')


def EventCollector():
    redis.set('event_log', '')
    for event in client.events(decode=True):
        redis.append('event_log', '%s,' % json.dumps(event))
    pass


@app.route('/events')
def events():
    return '[%s]' % str(redis.get('event_log'), 'utf-8')[:-1]


@app.route('/')
def main():
    host_name = socket.gethostname()
    host_ip = socket.gethostbyname(host_name)

    script = '<script> (() => {' \
        'const events = document.createElement("pre");' \
        'document.body.appendChild(events);' \
        'setInterval(() => fetch(window.location.origin + "/events")' \
        '.then(res => res.text())' \
        '.then(res => events.innerHTML = JSON.stringify(JSON.parse(res), null, 2)), 1000)' \
        '})() </script>'

    return '<html><body><h1>Docker Events</h1><p>' \
        'HostName: %s<br>' \
        'IP: %s</p>' \
        '<p>Docker events:</p>%s</body></html>' % (
            host_name,
            host_ip,
            script,
        )


if __name__ == "__main__":
    event_collector = threading.Thread(target=EventCollector, args=[])
    event_collector.start()
    app.run(host="0.0.0.0", port=5000, debug=True, threaded=True)
