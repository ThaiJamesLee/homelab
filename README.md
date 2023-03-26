# homelab

## Heimdall

<http://ma.heimdall.local>

## Proxmox

<https://ma.home.proxmox.local:8006>

## Pihole

<http://ma.home.pihole.local/admin/login.php>

### Install Pihole

```sh
curl -sSL https://install.pi-hole.net | bash
```

See: <https://docs.pi-hole.net/main/basic-install/>

## CUPS

<https://ma.home.airprint.local:631>

## Home Assistant

<http://ma.home.assistant.local:8123>

## Guacamole

<>

## Docker on Proxmox LXC

### Install Docker

Before you start, the lxc environment probably requires `curl` and `gpg` first

```sh
sudo apt-get update
```

```sh
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg
```

```sh
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

```sh
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

```sh
sudo apt-get update
```

```sh
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

See: <https://docs.docker.com/engine/install/ubuntu/>
