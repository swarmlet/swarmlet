describe docker_service('deployer_agent') do
  it { should exist }

  its('image')    { should eq '127.0.0.1:5000/v2/deployer:latest' }
  its('repo')     { should eq '127.0.0.1:5000/v2/deployer' }
  its('tag')      { should eq 'latest' }
  its('mode')     { should eq 'replicated' }
  its('replicas') { should eq '1/1' }
  its('ports')    { should include '' }
end

describe docker_service('registry_swarmlet-registry') do
  it { should exist }

  its('image')    { should eq 'registry:2' }
  its('repo')     { should eq 'registry' }
  its('tag')      { should eq '2' }
  its('mode')     { should eq 'global' }
  its('replicas') { should eq '1/1' }
  its('ports')    { should include '*:5000->5000/tcp' }
end

describe docker_service('router_traefik') do
  it { should exist }

  its('image')    { should eq 'traefik:v2.4.8' }
  its('repo')     { should eq 'traefik' }
  its('tag')      { should eq 'v2.4.8' }
  its('mode')     { should eq 'replicated' }
  its('replicas') { should eq '1/1' }
  its('ports')    { should include '*:80->80/tcp, *:443->443/tcp, *:8080->8080/tcp' }
end

# describe docker_service('swarmpit_agent') do
#   it { should exist }

#   its('image')    { should eq 'swarmpit/agent:latest' }
#   its('repo')     { should eq 'swarmpit/agent' }
#   its('tag')      { should eq 'latest' }
#   its('mode')     { should eq 'global' }
#   its('replicas') { should eq '1/1' }
#   its('ports')    { should include '' }
# end

# describe docker_service('swarmpit_app') do
#   it { should exist }

#   its('image')    { should eq 'swarmpit/swarmpit:latest' }
#   its('repo')     { should eq 'swarmpit/swarmpit' }
#   its('tag')      { should eq 'latest' }
#   its('mode')     { should eq 'replicated' }
#   its('replicas') { should eq '1/1' }
#   its('ports')    { should include '' }
# end

# describe docker_service('swarmpit_db') do
#   it { should exist }

#   its('image')    { should eq 'couchdb:2.3.0' }
#   its('repo')     { should eq 'couchdb' }
#   its('tag')      { should eq '2.3.0' }
#   its('mode')     { should eq 'replicated' }
#   its('replicas') { should eq '1/1' }
#   its('ports')    { should include '' }
# end
