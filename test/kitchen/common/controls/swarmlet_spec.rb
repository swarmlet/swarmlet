describe user('git') do
  it { should exist }
  its('group')  { should eq 'git' }
  its('groups') { should eq ['git', 'docker']}
  its('home')   { should eq '/mnt/gfs/git' }
  its('shell')  { should eq '/bin/bash' }
end

describe file('/usr/local/sbin/swarmlet') do
  it { should be_symlink }
  it { should_not be_directory }
  its('link_path') { should eq '/mnt/gfs/swarmlet/swarmlet' }
end
