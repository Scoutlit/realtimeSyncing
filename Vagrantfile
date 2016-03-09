# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = 'bento/centos-7.2'

  config.vm.provision 'shell',
    inline: "sed -i 's/enforcing/disabled/g' /etc/selinux/config"

  config.vm.provision :chef_zero do |chef|
    chef.cookbooks_path = ['cookbooks']
    chef.nodes_path = ['nodes']
    # chef.log_level = :debug
    chef.add_recipe 'git'
    chef.add_recipe 'vim'
    chef.json = {
      :git => {
        :prefix => "/usr/local"
      }
    }
  end

  config.vm.provision "shell", inline: $script

end

$script = <<EOF
curl --silent --location https://rpm.nodesource.com/setup_5.x | bash -
yum clean all
yum install -y gcc-c++ make nodejs
EOF
