#!/bin/bash

echo "alias rm='echo \"no\"'" | sudo tee /etc/profile.d/disable-rm.sh > /dev/null
sudo chmod +x /etc/profile.d/disable-rm.sh

sudo apt update
sudo apt install -y budgie-desktop tuxpaint firefox

sudo apt-get update

sudo mkdir -p /etc/xdg/autostart
cat <<EOF | sudo tee /etc/xdg/autostart/firefox-kiosk.desktop > /dev/null
[Desktop Entry]
Type=Application
Name=Firefox Kiosk
Exec=firefox --kiosk https://youtomb.github.io
X-GNOME-Autostart-enabled=true
EOF

sudo reboot