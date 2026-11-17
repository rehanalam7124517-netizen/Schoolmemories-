THE OG LEGENDS — OUR MEMORIES (UPDATED)

PIN: 2017

QUICK TERMUX SETUP
1) Put this project in ~/rehanakhtar
2) cd ~/rehanakhtar
3) chmod +x setup_media.sh refresh_media.sh
4) ./setup_media.sh
5) python -m http.server 8080
6) Open http://localhost:8080

WHAT IS FIXED
- PIN unlock uses 2017 directly (no hash mismatch)
- Remember-device unlock no longer breaks music/openSite
- Photos are object-fit: contain: full photo visible, no cropping
- Full-screen photo/video viewer with Previous/Next
- Built-in photos/videos auto-discover on Python localhost even if manifest is stale
- refresh_media.sh creates a permanent manifest for hosting/GitHub Pages
- New folders can be created in the web; add photos/videos from device; change folder DP
- Browser-created folder media is stored in IndexedDB on that browser/device
- Music path: media/music/memories.mp3

IMPORTANT
This is a static website PIN. It hides the UI but is not server-side security. Do not use it for highly sensitive media on public hosting.


V6 updates:
- Surprise Memories now reveals exactly 5 long memories once per visit to the page. Leave/back and return to reset.
- End page expanded with a long 3-part message.
- Delete folder button is available on every folder card and inside every folder. Built-in folders are hidden locally; original disk files are not erased.
- Music pauses when the page closes/goes to background and attempts to resume when visible/unlocked.
