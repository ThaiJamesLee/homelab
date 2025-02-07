# https://geekscircuit.com/installing-zoraxy-reverse-proxy-your-gateway-to-efficient-web-routing/
mkdir zoraxy
cd zoraxy
curl https://github.com/tobychui/zoraxy/releases/latest/download/zoraxy_linux_amd64 --output zoraxy_linux_amd64
mv zoraxy_linux_amd64 zoraxy
chmod +x zoraxy

ZORAXY_DIR=$(pwd)
ZORAXY_BIN="${ZORAXY_DIR}/zoraxy"
echo "${ZORAXY_BIN} -port=:8000" > start.sh

echo """
[Unit]
Description=Zoraxy Reverse Proxy Server
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=root
Group=root
WorkingDirectory=${ZORAXY_DIR}
ExecStart=${ZORAXY_DIR}/start.sh
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=zoraxy

[Install]
WantedBy=multi-user.target
""" > /etc/systemd/system/zoraxy.service

sudo systemctl daemon-reload
sudo systemctl enable zoraxy
sudo systemctl start zoraxy