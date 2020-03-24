nginx['listen_port'] = 15000
nginx['listen_https'] = false
nginx['proxy_set_headers'] = {"X-Forwarded-Proto" => "https","X-Forwarded-Ssl" => "on"}
gitlab_rails['registry_enabled'] = true
registry['enable'] = true
registry_nginx['enable'] = true
registry_nginx['listen_port'] = 15001
registry_nginx['listen_https'] = false
registry_nginx['proxy_set_headers'] = {"X-Forwarded-Proto" => "https","X-Forwarded-Ssl" => "on"}
# registry['registry_http_addr'] = "localhost:5001"
postgresql['shared_buffers'] = "256MB"
unicorn['worker_processes'] = 4
prometheus_monitoring['enable'] = false
