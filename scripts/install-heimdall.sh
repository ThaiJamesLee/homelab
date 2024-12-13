sudo docker run --name=heimdall -d -v /home/heimdall:/config -e PGID=1000 -e PUID=1000 -p 8080:80 -p 8443:443 linuxserver/heimdall
