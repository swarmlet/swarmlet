# Test dependencies

describe package('git') do
  it { should be_installed }
end

describe package('rsync') do
  it { should be_installed }
end
