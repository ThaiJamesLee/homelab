sudo docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=Europe/Berlin \
  -v /home/homeassistant:/config \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
