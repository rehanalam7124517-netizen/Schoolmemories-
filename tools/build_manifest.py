from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
photo_ext={'.jpg','.jpeg','.png','.webp','.gif','.avif'}
video_ext={'.mp4','.webm','.mov','.m4v','.ogg'}
photos=[];videos=[]
for p in sorted((root/'media'/'photos').iterdir()):
    if p.is_file() and p.suffix.lower() in photo_ext:
        photos.append('media/photos/'+p.name)
for p in sorted((root/'media'/'videos').iterdir()):
    if p.is_file() and p.suffix.lower() in video_ext:
        videos.append('media/videos/'+p.name)
out='window.BUILTIN_MEDIA = '+json.dumps({'photos':photos,'videos':videos},ensure_ascii=False,indent=2)+';\n'
(root/'js'/'media-manifest.js').write_text(out,encoding='utf-8')
print(f'Updated manifest: {len(photos)} photos, {len(videos)} videos')
