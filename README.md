# homelab

## Heimdall

<http://ma.heimdall.local>

### Install Heimdall

1. Install docker as described [below](#Docker-on-Proxmox-LXC)

2. Install and run docker image

```sh
sudo docker run --name=heimdall -d -v /home/heimdall:/config -e PGID=1000 -e PUID=1000 -p 8080:80 -p 8443:443 linuxserver/heimdall
```

See: https://hub.docker.com/r/linuxserver/heimdall/

## Proxmox

<https://ma.home.proxmox.local:8006>

## Pihole

<http://ma.home.pihole.local/admin/login.php>

### Install Pihole

```sh
curl -sSL https://install.pi-hole.net | bash
```

See: <https://docs.pi-hole.net/main/basic-install/>

### Ads Lists

- <https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/Phishing-Angriffe>
- <https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/spam.mails>
- <https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/malware>
- <https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/Streaming>
- <https://raw.githubusercontent.com/Monstanner/DuckDuckGo-Fakeshops-Blocklist/main/Blockliste>
- <https://raw.githubusercontent.com/RPiList/specials/master/Blocklisten/easylist>
- <https://raw.githubusercontent.com/anudeepND/blacklist/master/adservers.txt>

## CUPS

<https://ma.home.airprint.local:631>

## Home Assistant

<http://ma.home.assistant.local:8123>

### Install with Docker in LXC

1. Install docker as described [below](#Docker-on-Proxmox-LXC)
2. Install and run home assistant

```sh
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=Europe/Berlin \
  -v /home/homeassistant:/config \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

See: <https://www.home-assistant.io/installation/linux#install-home-assistant-container>

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
