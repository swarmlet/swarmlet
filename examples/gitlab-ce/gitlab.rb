nginx['listen_https'] = false
nginx['redirect_http_to_https'] = false
nginx['proxy_set_headers'] = {"X-Forwarded-Proto" => "https","X-Forwarded-Ssl" => "on"}

registry['enable'] = true
registry_nginx['enable'] = true
registry_nginx['listen_https'] = false
registry_nginx['redirect_http_to_https'] = false
registry_nginx['proxy_set_headers'] = {"X-Forwarded-Proto" => "https","X-Forwarded-Ssl" => "on"}

gitlab_rails['registry_enabled'] = true
gitlab_rails['initial_root_password'] = File.read('/run/secrets/gitlab_root_password')

postgresql['shared_buffers'] = "256MB"
unicorn['worker_processes'] = 4
