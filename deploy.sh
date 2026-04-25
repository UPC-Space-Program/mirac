#!/bin/bash

# Define domain and cert path
DOMAIN="cassini.joelgarciamartin.com"
CERT_PATH="./data/certbot/conf/live/$DOMAIN/fullchain.pem"

echo "### Pulling latest changes..."
git pull

echo "### Rebuilding containers..."
# This ensures that 'frontend' and 'backend' are rebuilt with the latest code
# --no-cache forces a completely clean image build from the new git code
docker compose build --no-cache
# -V (--renew-anon-volumes) prevents Docker from serving the old cached Next.js build volume
docker compose up -d --force-recreate -V

echo "### Check SSL Certificates..."
if [ -f "$CERT_PATH" ]; then
  echo "Existing certificate found for $DOMAIN."
  echo "Starting services in production mode..."
  # -d: Detached mode
  # --remove-orphans: Cleanup old containers
  # --force-recreate: Ensure we use the new image even if config didn't change
  # -V: Renew anonymous volumes to clear Next.js cache
  docker compose up -d --remove-orphans --force-recreate -V
  
  echo "### Deployment Complete! ###"
  echo "Your site should be live at https://$DOMAIN"
else
  echo "No existing certificate found at $CERT_PATH."
  echo "Starting initialization script..."
  chmod +x init-letsencrypt.sh
  ./init-letsencrypt.sh
fi
