# frozen_string_literal: true

# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = '2'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = 'debian/buster64'
  config.vm.hostname = 'swarmlet'
  config.vm.synced_folder './', '/tmp/swarmlet'

  config.ssh.forward_agent = true

  config.vm.provider :virtualbox do |vb|
    # Use VBoxManage to customize the VM. For example to change memory:
    vb.customize ['modifyvm', :id, '--memory', '1024']
  end

  script = <<-'SCRIPT'
  mkdir -p /root/.ssh
  cp /home/vagrant/.ssh/authorized_keys /root/.ssh/
  cat /tmp/swarmlet/install | bash -s \
    INSTALLATION_TYPE=noninteractive \
    INSTALL_FROM=local \
    INSTALL_MODULES="swarmpit" \
    SWARMLET_USERNAME=admin \
    SWARMLET_PASSWORD=admin \
    ROOT_DOMAIN=example.net \
    DEBUG=true
  SCRIPT

  # Set up salt-master and minion
  config.vm.provision 'shell', inline: script
end
