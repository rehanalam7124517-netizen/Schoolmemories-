# School Memories V8.3 — Firebase Full Social Backend

This build keeps the existing School Memories UI/media and connects the social layer to Firebase Authentication + Cloud Firestore.

Online Firestore features:
- Accounts / profiles / username search
- Secure admin by Firebase UID
- Follow / unfollow + counts
- Activity notifications
- Reel/post metadata, likes, comments, replies, comment likes
- Seen-reel history per user
- Direct text messaging + small media
- Groups + group messages
- Admin channels + follows/posts/reactions

Existing GitHub-hosted School Memories media is unchanged.

## Free-tier media note
The project is on Firebase Spark without Cloud Storage. Small images/files can be embedded in Firestore after compression. Large videos are kept on the creator's device and their metadata syncs online. Cross-device large reel/video uploads require a media-storage provider later.

## Required Firestore rules
Publish the included `firestore.rules` once before testing the full backend.

Admin Firebase UID:
`U9D7P7hhukauNmUpLL6STrWtuma2`

## V8.4 — Supabase media storage

- Firebase Auth + Firestore remain the account/social backend.
- Supabase Storage bucket: `school-media`.
- User uploads are stored under `reels|posts|profiles|messages|groups/<firebase-uid>/...`.
- Admin channel media uses `channels/<firebase-uid>/...`.
- Firestore stores only media URL/path/type/name/size, not large base64 video data.
- The Supabase publishable key is browser-safe; upload/delete security is enforced by Storage RLS.
- Standard upload is capped in this build at 50 MB per file.
- Existing GitHub `media/` and `js/media-manifest.js` are not replaced by the code-only deploy commands.

## V8.4.1 Reel display fix
- Reel video now always uses the uploaded video's original aspect ratio (`object-fit: contain`), so no top/bottom/side content is cropped.
- Removed the blurred/gradient plate behind reel username/caption; text uses only a small shadow for readability.
- Profile reel thumbnails no longer trigger the browser's native video player; tapping them always opens the site's Reel viewer.
- Profile reel thumbnails also use `contain`, so their preview is not cropped.
