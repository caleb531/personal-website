#!/usr/bin/env bash

# Set SSH environment variables
source .env

# LOCAL_BUILD_DIR must end with a /
LOCAL_BUILD_DIR="$(mktemp -d)"/
# REMOTE_PROD_DEST_DIR is relative to ~ on remote
REMOTE_PROD_DEST_DIR=./public_html

# Build production site to temporary build directory
JEKYLL_ENV=production jekyll build --destination "$LOCAL_BUILD_DIR"

# Copy local production build directory to remote
rsync \
  --archive \
  --checksum \
  --rsh "ssh -p $SSH_PORT" \
  --verbose \
  "$LOCAL_BUILD_DIR" \
  "$SSH_USER"@"$SSH_HOSTNAME":"$REMOTE_PROD_DEST_DIR"

# Remove local production directory when finished
rm -rf "$LOCAL_BUILD_DIR"
