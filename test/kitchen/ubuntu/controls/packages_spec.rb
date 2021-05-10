# Test dependencies

describe package('glusterfs-client') do
  it { should be_installed }
end

describe package('glusterfs-server') do
  it { should be_installed }
end
