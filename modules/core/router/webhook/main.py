# -*- coding: utf-8 -*-
import argparse
import subprocess
import sys
import os
import threading
import socket
import uuid

try:
    from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
except ImportError:
    from http.server import BaseHTTPRequestHandler, HTTPServer

try:
    from urlparse import urlparse, parse_qsl
except ImportError:
    from urllib.parse import urlparse, parse_qsl


def get_handler(args):
    class CommandHandler(BaseHTTPRequestHandler):
        exec_in_progress = False

        def _constant_time_compare(self, val1, val2):
            """
            Mitigate timing attacks on the URL.
            """
            if len(val1) != len(val2):
                return False

            result = 0
            for x, y in zip(val1, val2):
                result |= ord(x) ^ ord(y)
            return result == 0

        def _exec(self, parameters):
            CommandHandler.exec_in_progress = True
            if args.template:
                try:
                    subprocess.call(args.command.format(**parameters), shell=True)
                except KeyError:
                    print("Could not execute command, required parameters not passed.")
            else:
                subprocess.call(args.command, shell=True)
            CommandHandler.exec_in_progress = False
            os._exit(1)

        def do_GET(self):
            url = urlparse(self.path)
            path = url.path
            parameters = dict(parse_qsl(url.query))

            if "/favicon" in path:
                return

            if "/join" in path and self._constant_time_compare(
                path, "/join/%s" % args.key
            ):
                self.send_response(200)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                with open(args.ssh_key) as ssh_key, open(args.entrypoint) as entrypoint:
                    # key =
                    data = (
                        entrypoint.read()
                        .replace(
                            "{{ SSH_PUBLIC_KEY }}",
                            ssh_key.read().replace("\n", " ").rstrip(),
                        )
                        .replace(
                            "{{ CALLBACK_URL }}",
                            "http://%s:%s%s/%s"
                            % (args.interface, args.port, "/callback", args.key),
                        )
                    )
                    self.wfile.write(bytes(data, "utf-8"))
            elif "/callback/%s" % args.key in path:
                t = threading.Thread(target=self._exec, args=[parameters])
                t.daemon = True
                t.start()
                self.send_response(200)
                self.send_header("Content-type", "text/html")
                self.end_headers()
            else:
                self.send_response(404)
                self.send_header("Content-type", "text/html")
                self.end_headers()
                os._exit(1)

            return

        def log_message(self, format, *args):
            return

        do_POST = do_GET

    return CommandHandler


def main():
    with socket.socket() as s:
        s.bind(("", 0))
        ip = socket.gethostbyname(socket.gethostname())
        port = s.getsockname()[1]
        s.close()

        parser = argparse.ArgumentParser(
            description="Run a command when a webhook is triggered."
        )
        parser.add_argument(
            "command", help="the command to run when the URL is requested"
        )
        parser.add_argument(
            "-k",
            "--key",
            default=str(uuid.uuid4()).replace("-", "")[:16],
            help="the secret key that will trigger the command",
        )
        parser.add_argument(
            "-t",
            "--template",
            default="host,address",
            help="whether to use template formatting based on the query string parameters",
        )
        parser.add_argument(
            "-p", "--port", type=int, default=port, help="the port to listen on"
        )
        parser.add_argument(
            "-i", "--interface", default=str(ip), help="the IP address to listen on"
        )
        parser.add_argument(
            "-s",
            "--ssh-key",
            default="/mnt/gfs/ansible/.ssh/id_rsa_ansible.pub",
            help="public SSH key of the Ansible control node",
        )
        parser.add_argument(
            "-e",
            "--entrypoint",
            default="%s/entrypoint" % os.path.dirname(os.path.realpath(__file__)),
            help="client entrypoint script",
        )
        args = parser.parse_args()

        try:
            server = HTTPServer((args.interface, args.port), get_handler(args))
        except:
            print("Could not start server, invalid interface or port specified.")
            os._exit(1)

        print(
            "       curl -fsSL http://%s:%s%s/%s | bash"
            % (args.interface, args.port, "/join", args.key)
        )
        print("\n-----> Waiting for remote..")
        try:
            server.serve_forever()
        except:
            server.socket.close()


if __name__ == "__main__":
    main()
