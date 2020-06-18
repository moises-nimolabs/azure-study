# 

You are only DevOps engineer in Solar Impulse. You receive request to deploy following infrastructure.
One vNet named solar-impulse-test with subnet that contains one Azure Container Instance. Docker image should be based on official dnsmasq docker image with configuration:

server=8.8.8.8 server=8.8.4.4
Second vNet solar-impulse-acc with subnet that contains one VM. VM should be accessible from 195.169.110.175 with password authentication type. Solar-impulse-test and solar-impulse-acc need to be connected. NSG on subnet level is only protection required.
Your task is:
1. To provide deployment scripts (PowerShell or Azure CLI).
2. To describe CI/CD pipelines.
3. To point out your security concerns and advise about security improvements for the deployed infrastructure.

# azure cli getting started

## add azure-devops extension
az extension add --name azure-devops

# azure cli in docker
To run azure cli in docker:
```
az login
```

This will redirect you to azure login page.  
* Insert credentials  


# azure vm create
```
az vm create -n mvm -g moises-playground --image UbuntuLTS --generate-ssh-keys
```

# 1. azure network vnet
## create
az network vnet create --resource-group moises-playground --name mNet   --address-prefixes 10.0.0.0/16 --subnet-name mSubNet --subnet-prefixes 10.0.0.0/24

az network vnet create -g moises-playground -n mNet   --address-prefixes 10.0.0.0/16 --subnet-name mSubNet --subnet-prefixes 10.0.0.0/24

## delete
az network vnet delete -g moises-playground -n mNet

# 2. azure network nsg
## create
az network nsg create -g moises-playground -n mNSG --tags secure_nsg

## delete
az network nsg delete -g moises-playground -n mNSG

# 3. azure network interface #
## create
az network nic create -g moises-playground -n mNIC -