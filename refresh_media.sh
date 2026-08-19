#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$(dirname "$0")"
python tools/build_manifest.py
printf '\nDone. Refresh the website in your browser.\n'
