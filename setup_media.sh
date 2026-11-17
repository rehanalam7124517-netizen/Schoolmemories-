#!/data/data/com.termux/files/usr/bin/bash
set -e
cd "$(dirname "$0")"
mkdir -p media/photos media/videos media/music
PHOTO_SRC="$HOME/storage/shared/DOSTO KA MAHOULA 2"
VIDEO_SRC="$HOME/storage/shared/DOSTON KA MAHOULA"
if [ -d "$PHOTO_SRC" ]; then
  find "$PHOTO_SRC" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' -o -iname '*.gif' -o -iname '*.avif' \) -exec cp -f {} media/photos/ \;
  echo "Photos copied."
else echo "Photo source not found: $PHOTO_SRC"; fi
if [ -d "$VIDEO_SRC" ]; then
  find "$VIDEO_SRC" -maxdepth 1 -type f \( -iname '*.mp4' -o -iname '*.webm' -o -iname '*.mov' -o -iname '*.m4v' -o -iname '*.ogg' \) -exec cp -f {} media/videos/ \;
  echo "Videos copied."
else echo "Video source not found: $VIDEO_SRC"; fi
SONG=$(find "$HOME/storage/shared" -type f -iname '*Tera*Yaar*Hoon*Main*.mp3' -print -quit 2>/dev/null || true)
if [ -n "$SONG" ]; then cp -f "$SONG" media/music/memories.mp3; echo "Music copied: memories.mp3"; else echo "Song not found automatically. Add it as media/music/memories.mp3"; fi
python tools/build_manifest.py
printf '\nREADY ✅\nPhotos: '; find media/photos -maxdepth 1 -type f ! -name '.gitkeep' | wc -l
printf 'Videos: '; find media/videos -maxdepth 1 -type f ! -name '.gitkeep' | wc -l
printf 'Music: '; [ -f media/music/memories.mp3 ] && echo YES || echo NO
