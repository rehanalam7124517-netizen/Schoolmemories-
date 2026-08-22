/*
  School Memories V8.4 — Firebase + Supabase full social/media backend layer
  ---------------------------------------------------------
  Uses Firebase Authentication + Cloud Firestore for accounts/social data and
  Supabase Storage for user-uploaded photos/videos/files. Existing GitHub memory
  media remains static and untouched. Firebase ID tokens authenticate Supabase
  uploads through the configured third-party Firebase integration.
*/
(function(){
  const ADMIN_UID='U9D7P7hhukauNmUpLL6STrWtuma2';
  const ONLINE_CACHE_MS=15000;
  const SB=window.SUPABASE_CONFIG||{};
  const SUPABASE_URL=String(SB.url||'').replace(/\/$/,'');
  const SUPABASE_KEY=String(SB.publishableKey||'');
  const SUPABASE_BUCKET=String(SB.bucket||'school-media');
  const MAX_SUPABASE_FILE_BYTES=50*1024*1024;
  const fbState={
    usersCache:null,usersCacheAt:0,
    activityUnsub:null,chatUnsub:null,chatsUnsub:null,groupUnsub:null,channelUnsub:null,
    sessionUid:null
  };

  function db(){return firebase.firestore()}
  function auth(){return firebase.auth()}
  function uid(){return auth().currentUser?.uid||currentLocalUser?.uid||null}
  function now(){return Date.now()}
  function timeVal(v){return v&&typeof v.toMillis==='function'?v.toMillis():(Number(v)||0)}
  function docData(doc){const x={id:doc.id,...doc.data()};for(const k of ['created','updated','lastMessageAt'])if(x[k])x[k]=timeVal(x[k]);return x}
  function safeArray(v){return Array.isArray(v)?v:[]}
  function online(){return firebaseReady()&&!!auth().currentUser}
  function isAdminUid(id=uid()){return !!id&&id===ADMIN_UID}
  function currentUid(){return uid()}
  function chatIdFor(a,b){return [a,b].sort().join('__')}
  function localStoreHas(name){return !!DB?.objectStoreNames?.contains(name)}
  function localById(rows,id){return rows.find(x=>x.id===id)}
  function localMediaUrl(item,kind){
    if(item?.mediaUrl)return item.mediaUrl;
    if(item?.mediaData)return item.mediaData;
    const b=kind==='reel'?item?.videoBlob:item?.mediaBlob;
    if(b instanceof Blob)return URL.createObjectURL(b);
    return '';
  }
  function localAttachmentUrl(x){
    if(x?.mediaUrl)return x.mediaUrl;
    if(x?.mediaData)return x.mediaData;
    if(x?.blob instanceof Blob)return URL.createObjectURL(x.blob);
    return '';
  }
  function mimeFromDataUrl(s){const m=/^data:([^;,]+)/.exec(s||'');return m?.[1]||''}
  function dataUrlToBlob(data){
    if(!data)return null;
    try{const [head,body]=data.split(',');const mime=(head.match(/data:([^;]+)/)||[])[1]||'application/octet-stream';const bin=atob(body);const a=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);return new Blob([a],{type:mime})}catch{return null}
  }
  function approxDataBytes(data){if(!data)return 0;const i=data.indexOf(',');return Math.ceil((data.length-(i+1))*3/4)}
  async function readDataURL(file){return fileToDataURL(file)}
  async function compressImage(file,maxSide=900,quality=.72){
    if(!file)return '';
    if(!String(file.type||'').startsWith('image/'))return readDataURL(file);
    return new Promise((resolve,reject)=>{
      const img=new Image(),url=URL.createObjectURL(file);
      img.onload=()=>{
        try{
          const scale=Math.min(1,maxSide/Math.max(img.naturalWidth||1,img.naturalHeight||1));
          const c=document.createElement('canvas');c.width=Math.max(1,Math.round(img.naturalWidth*scale));c.height=Math.max(1,Math.round(img.naturalHeight*scale));
          c.getContext('2d').drawImage(img,0,0,c.width,c.height);const out=c.toDataURL('image/jpeg',quality);URL.revokeObjectURL(url);resolve(out)
        }catch(ex){URL.revokeObjectURL(url);reject(ex)}
      };
      img.onerror=()=>{URL.revokeObjectURL(url);reject(new Error('image decode failed'))};img.src=url;
    })
  }
  function storageReady(){return !!(SUPABASE_URL&&SUPABASE_KEY&&SUPABASE_BUCKET&&auth().currentUser)}
  function safeFilePart(v){return String(v||'file').replace(/[^a-zA-Z0-9._-]+/g,'_').replace(/^_+|_+$/g,'').slice(-90)||'file'}
  function storageFolder(kind){
    const k=String(kind||'').toLowerCase();
    if(k==='reel')return 'reels';
    if(k==='post')return 'posts';
    if(k==='dp'||k.includes('profile'))return 'profiles';
    if(k.includes('group'))return 'groups';
    if(k.includes('channel'))return 'channels';
    return 'messages';
  }
  function publicStorageUrl(path){return `${SUPABASE_URL}/storage/v1/object/public/${encodeURIComponent(SUPABASE_BUCKET)}/${String(path).split('/').map(encodeURIComponent).join('/')}`}
  async function firebaseBearer(){const u=auth().currentUser;if(!u)throw new Error('LOGIN REQUIRED');return u.getIdToken(true)}
  async function uploadStorageMedia(file,kind='message'){
    if(!file)return {mediaUrl:'',mediaPath:'',mediaData:'',mediaLocalOnly:false,mediaType:'',mediaName:'',mediaSize:0};
    if(!storageReady())throw new Error('SUPABASE STORAGE NOT CONFIGURED');
    if(file.size>MAX_SUPABASE_FILE_BYTES)throw new Error('FILE TOO LARGE • MAX 50 MB');
    const folder=storageFolder(kind),ext=(safeFilePart(file.name).split('.').pop()||'bin').slice(0,10),name=`${Date.now()}-${Math.random().toString(36).slice(2,10)}.${ext}`,path=`${folder}/${currentUid()}/${name}`,token=await firebaseBearer();
    const res=await fetch(`${SUPABASE_URL}/storage/v1/object/${encodeURIComponent(SUPABASE_BUCKET)}/${path.split('/').map(encodeURIComponent).join('/')}`,{method:'POST',headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${token}`,'Content-Type':file.type||'application/octet-stream','x-upsert':'false'},body:file});
    if(!res.ok){let msg='';try{msg=(await res.json()).message||''}catch{}throw new Error(`MEDIA UPLOAD FAILED${msg?' • '+msg:''}`)}
    return {mediaUrl:publicStorageUrl(path),mediaPath:path,mediaData:'',mediaLocalOnly:false,mediaType:file.type||'application/octet-stream',mediaName:file.name||name,mediaSize:file.size||0};
  }
  async function deleteStoragePath(path){
    if(!path||!storageReady())return true;try{const token=await firebaseBearer(),res=await fetch(`${SUPABASE_URL}/storage/v1/object/${encodeURIComponent(SUPABASE_BUCKET)}/${String(path).split('/').map(encodeURIComponent).join('/')}`,{method:'DELETE',headers:{apikey:SUPABASE_KEY,Authorization:`Bearer ${token}`}});if(!res.ok&&res.status!==404){console.warn('Supabase delete failed',res.status,await res.text());return false}return true}catch(ex){console.warn('Supabase delete failed',ex);return false}
  }
  async function smallMediaPayload(file,kind='message'){return uploadStorageMedia(file,kind)}
  async function imageUploadPayload(file,kind='dp',maxSide=420,quality=.78){
    if(!file)return {dpUrl:'',dpPath:''};
    const data=await compressImage(file,maxSide,quality),blob=dataUrlToBlob(data),named=new File([blob],safeFilePart(file.name||'image.jpg').replace(/\.[^.]+$/,'.jpg'),{type:'image/jpeg'}),m=await uploadStorageMedia(named,kind);return {dpUrl:m.mediaUrl,dpPath:m.mediaPath};
  }
  function showStorageNotice(){/* V8.4 uses Supabase Storage; no local-only warning. */}
  async function onlineUsers(force=false){
    if(!online())return getAll('users');
    if(!force&&fbState.usersCache&&now()-fbState.usersCacheAt<ONLINE_CACHE_MS)return fbState.usersCache;
    const snap=await db().collection('users').get(),rows=snap.docs.map(docData).map(u=>({...u,username:normUser(u.username)}));
    fbState.usersCache=rows;fbState.usersCacheAt=now();
    if(localStoreHas('users'))for(const u of rows)try{await put('users',u)}catch{}
    return rows;
  }
  async function onlineUserByUid(id){
    if(!id)return null;const snap=await db().collection('users').doc(id).get();if(!snap.exists)return null;const u=docData(snap);u.username=normUser(u.username);try{await put('users',u)}catch{}return u
  }
  async function onlineUserByUsername(name){
    const username=normUser(name);if(!username)return null;
    try{
      const map=await db().collection('usernames').doc(username).get();if(map.exists){const u=await onlineUserByUid(map.data().uid);if(u)return u}
    }catch{}
    const q=await db().collection('users').where('username','==',username).limit(1).get();if(q.empty)return null;return onlineUserByUid(q.docs[0].id)
  }
  async function ensureUsernameMap(profile){
    if(!online()||!profile?.username||!profile?.uid)return;
    try{await db().collection('usernames').doc(profile.username).set({uid:profile.uid,username:profile.username,updated:now()},{merge:true})}catch(ex){console.warn('username map',ex)}
  }
  function invalidateUsers(){fbState.usersCache=null;fbState.usersCacheAt=0}
  function stopSnapshot(key){try{fbState[key]?.()}catch{}fbState[key]=null}
  function stopOnlineListeners(){for(const k of ['activityUnsub','chatUnsub','chatsUnsub','groupUnsub','channelUnsub'])stopSnapshot(k)}

  // Admin identity is backend UID only. Username/role cannot grant backend admin power.
  try{isAdminUser=function(u=currentLocalUser){return !!u&&u.uid===ADMIN_UID}}catch{}
  try{dpUrl=function(u){return u?.dpUrl||u?.dpData||(u?.dpBlob?URL.createObjectURL(u.dpBlob):'assets/common.jpg')}}catch{}

  const oldSyncFirebaseUserToLocal=syncFirebaseUserToLocal;
  syncFirebaseUserToLocal=async function(profile){
    if(!profile)return null;
    profile={...profile,username:normUser(profile.username),role:profile.uid===ADMIN_UID?'admin':'user'};
    const x=await oldSyncFirebaseUserToLocal(profile);await ensureUsernameMap(x);invalidateUsers();startOnlineSession(x);return x;
  };

  async function startOnlineSession(profile=currentLocalUser){
    if(!profile?.uid||!online())return;
    if(fbState.sessionUid===profile.uid)return;
    stopOnlineListeners();fbState.sessionUid=profile.uid;
    await ensureUsernameMap(profile);
    listenActivityBadge();
    // Migrate local metadata once. Large files stay local but are represented online.
    migrateLocalSocialMetadata().catch(ex=>console.warn('migration',ex));
    migrateLocalMediaToSupabase().catch(ex=>console.warn('media migration',ex));
  }
  if(!firebaseReady()){console.error('School Memories Firebase backend: Firebase SDK unavailable');return;}

  auth().onAuthStateChanged(user=>{if(!user){stopOnlineListeners();fbState.sessionUid=null;return}setTimeout(async()=>{try{const p=await firebaseProfileByUid(user.uid);if(p&&currentLocalUser?.uid===user.uid)startOnlineSession({...p,uid:user.uid})}catch{}},250)});

  // ---------- Account registration/login ----------
  $('localRegisterForm').onsubmit=async e=>{
    e.preventDefault();const err=$('userGateError');err.textContent='';
    let cred=null;
    try{
      await waitDB();if(!firebaseReady())return err.textContent='❌ ꜰɪʀᴇʙᴀꜱᴇ ɴᴏᴛ ᴄᴏɴɴᴇᴄᴛᴇᴅ';
      const username=normUser($('registerUsername').value),pw=$('registerPassword').value,name=$('registerName').value.trim();
      if(!name)return err.textContent='❌ ᴅɪꜱᴘʟᴀʏ ɴᴀᴍᴇ ʀᴇQᴜɪʀᴇᴅ';if(username.length<3)return err.textContent='❌ ᴜꜱᴇʀɴᴀᴍᴇ ᴛᴏᴏ ꜱʜᴏʀᴛ';if(pw.length<6)return err.textContent='❌ ᴘᴀꜱꜱᴡᴏʀᴅ ᴍɪɴɪᴍᴜᴍ 6 ᴄʜᴀʀᴀᴄᴛᴇʀꜱ';if(pw!==$('registerConfirm').value)return err.textContent='❌ ᴘᴀꜱꜱᴡᴏʀᴅꜱ ᴅᴏ ɴᴏᴛ ᴍᴀᴛᴄʜ';
      cred=await auth().createUserWithEmailAndPassword(firebaseEmailForUsername(username),pw);
      const dpFile=$('registerDp').files[0]||null,dp=dpFile?await imageUploadPayload(dpFile,'dp',420,.78):{dpUrl:'',dpPath:''};
      const profile={uid:cred.user.uid,username,userId:'OG'+Date.now().toString(36).toUpperCase(),name,dpData:'',dpUrl:dp.dpUrl,dpPath:dp.dpPath,bio:'',role:cred.user.uid===ADMIN_UID?'admin':'user',created:now(),updated:now()};
      const batch=db().batch(),uRef=db().collection('users').doc(cred.user.uid),nRef=db().collection('usernames').doc(username);batch.set(uRef,profile);batch.set(nRef,{uid:cred.user.uid,username,created:now()});await batch.commit();
      await syncFirebaseUserToLocal(profile);updateAccountUI();gate(false);e.target.reset();showPage(0);
    }catch(ex){
      console.error('Firebase create user failed:',ex);if(cred?.user)try{await cred.user.delete()}catch{}
      if(ex.code==='auth/email-already-in-use')err.textContent='❌ @ᴜꜱᴇʀɴᴀᴍᴇ ᴀʟʀᴇᴀᴅʏ ᴇxɪꜱᴛꜱ';else if(ex.code==='auth/weak-password')err.textContent='❌ ᴘᴀꜱꜱᴡᴏʀᴅ ᴍɪɴɪᴍᴜᴍ 6';else err.textContent='❌ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴄʀᴇᴀᴛᴇ ᴜꜱᴇʀ • '+(ex.message||'FIREBASE ERROR');
    }
  };
  $('localLoginForm').onsubmit=async e=>{
    e.preventDefault();const err=$('userGateError');err.textContent='';
    try{
      await waitDB();const username=normUser($('loginUsername').value),pw=$('loginPassword').value;const cred=await auth().signInWithEmailAndPassword(firebaseEmailForUsername(username),pw),profile=await firebaseProfileByUid(cred.user.uid);
      if(!profile){await auth().signOut();return err.textContent='❌ ᴘʀᴏꜰɪʟᴇ ᴅᴀᴛᴀ ɴᴏᴛ ꜰᴏᴜɴᴅ'}await syncFirebaseUserToLocal(profile);updateAccountUI();gate(false);e.target.reset();await restoreLastView();
    }catch(ex){console.error('Firebase login failed:',ex);err.textContent='❌ ᴡʀᴏɴɢ ᴜꜱᴇʀɴᴀᴍᴇ ᴏʀ ᴘᴀꜱꜱᴡᴏʀᴅ'}
  };

  // ---------- Edit profile: Firebase Auth + Firestore ----------
  function replaceNode(id){const old=$(id);if(!old)return null;const n=old.cloneNode(true);old.replaceWith(n);return n}
  const editForm=replaceNode('editUserForm');
  if(editForm){
    const dpInput=$('editDpInput');dpInput.onchange=async()=>{const f=dpInput.files[0];if(f)$('editDpPreview').src=await compressImage(f,420,.78)};
    editForm.onsubmit=async e=>{
      e.preventDefault();const err=$('editUserError');err.textContent='';if(!currentLocalUser||!online())return;
      try{
        const fbUser=auth().currentUser,currentPw=$('editCurrentPassword').value,oldUsername=currentLocalUser.username,newUsername=normUser($('editUsername').value),name=$('editDisplayName').value.trim(),bio=$('editBio').value.trim(),np=$('editNewPassword').value,cp=$('editConfirmPassword').value;
        if(!currentPw)return err.textContent='❌ ᴄᴜʀʀᴇɴᴛ ᴘᴀꜱꜱᴡᴏʀᴅ ʀᴇQᴜɪʀᴇᴅ';if(!name)return err.textContent='❌ ᴅɪꜱᴘʟᴀʏ ɴᴀᴍᴇ ʀᴇQᴜɪʀᴇᴅ';if(newUsername.length<3)return err.textContent='❌ ᴜꜱᴇʀɴᴀᴍᴇ ᴛᴏᴏ ꜱʜᴏʀᴛ';if(np&&np.length<6)return err.textContent='❌ ɴᴇᴡ ᴘᴀꜱꜱᴡᴏʀᴅ ᴍɪɴɪᴍᴜᴍ 6';if(np!==cp)return err.textContent='❌ ɴᴇᴡ ᴘᴀꜱꜱᴡᴏʀᴅꜱ ᴅᴏ ɴᴏᴛ ᴍᴀᴛᴄʜ';
        const credential=firebase.auth.EmailAuthProvider.credential(fbUser.email,currentPw);await fbUser.reauthenticateWithCredential(credential);
        if(newUsername!==oldUsername){
          const map=await db().collection('usernames').doc(newUsername).get();if(map.exists&&map.data().uid!==fbUser.uid)return err.textContent='❌ @ᴜꜱᴇʀɴᴀᴍᴇ ᴀʟʀᴇᴀᴅʏ ᴇxɪꜱᴛꜱ';
          await fbUser.updateEmail(firebaseEmailForUsername(newUsername));
        }
        if(np)await fbUser.updatePassword(np);
        const f=$('editDpInput').files[0]||null,oldDpPath=currentLocalUser.dpPath||'',dp=f?await imageUploadPayload(f,'dp',420,.78):{dpUrl:currentLocalUser.dpUrl||'',dpPath:oldDpPath};
        const updated={...currentLocalUser,uid:fbUser.uid,username:newUsername,name,bio,dpData:f?'':(currentLocalUser.dpData||''),dpUrl:dp.dpUrl,dpPath:dp.dpPath,role:fbUser.uid===ADMIN_UID?'admin':'user',updated:now()};delete updated.passwordHash;delete updated.dpBlob;
        const batch=db().batch();batch.set(db().collection('users').doc(fbUser.uid),updated,{merge:true});batch.set(db().collection('usernames').doc(newUsername),{uid:fbUser.uid,username:newUsername,updated:now()},{merge:true});if(newUsername!==oldUsername)batch.delete(db().collection('usernames').doc(oldUsername));await batch.commit();
        // keep local media ownership display in sync
        for(const s of ['reels','posts','messages','comments','postComments','activity','follows'])if(localStoreHas(s))try{for(const x of await getAll(s)){let c=false;for(const k of ['username','from','to','actor','target','follower','following'])if(x[k]===oldUsername){x[k]=newUsername;c=true}if(c)await put(s,x)}}catch{}
        if(f&&oldDpPath&&oldDpPath!==dp.dpPath)deleteStoragePath(oldDpPath).catch(()=>{});try{await del('users',oldUsername)}catch{}await put('users',updated);currentLocalUser=updated;invalidateUsers();updateAccountUI();$('editUserDialog').close();if($('userProfileDialog').open)$('userProfileDialog').close();openSocialProfile(newUsername);updateMessageBadge();
      }catch(ex){console.error('online edit profile',ex);err.textContent=ex.code==='auth/wrong-password'||ex.code==='auth/invalid-credential'?'❌ ᴄᴜʀʀᴇɴᴛ ᴘᴀꜱꜱᴡᴏʀᴅ ɪꜱ ᴡʀᴏɴɢ':'❌ ᴄᴏᴜʟᴅ ɴᴏᴛ ꜱᴀᴠᴇ • '+(ex.message||'ERROR')}
    };
  }

  // ---------- Search + recent users ----------
  recentUsers=async function(){
    const h=$('recentUsers');h.innerHTML='';const users=await onlineUsers(),names=JSON.parse(localStorage.getItem('og_recent_users')||'[]');names.map(n=>users.find(u=>u.username===n)).filter(Boolean).forEach(u=>h.appendChild(userBtn(u)));
  };
  $('searchInput').oninput=async()=>{
    const raw=$('searchInput').value.trim().toLowerCase(),q=normUser(raw),h=$('searchResults');h.innerHTML='';if(!raw)return;const users=await onlineUsers();users.filter(u=>u.username.includes(q)||(u.userId||'').toLowerCase().includes(raw)).slice(0,50).forEach(u=>h.appendChild(userBtn(u)));if(!h.children.length)h.innerHTML='<div class="empty-state">ɴᴏ ᴜꜱᴇʀ ꜰᴏᴜɴᴅ</div>';
  };

  // ---------- Follows ----------
  followStats=async function(username){
    const u=await onlineUserByUsername(username);if(!u)return {followers:[],following:[]};
    const [a,b]=await Promise.all([db().collection('follows').where('targetId','==',u.uid).get(),db().collection('follows').where('followerId','==',u.uid).get()]);
    const users=await onlineUsers();const byUid=new Map(users.map(x=>[x.uid,x.username]));return {followers:a.docs.map(d=>byUid.get(d.data().followerId)||d.data().followerUsername).filter(Boolean),following:b.docs.map(d=>byUid.get(d.data().targetId)||d.data().targetUsername).filter(Boolean)};
  };
  isFollowing=async function(username){const target=await onlineUserByUsername(username);if(!target||!currentUid())return false;return (await db().collection('follows').doc(`${currentUid()}_${target.uid}`).get()).exists};
  toggleFollowUser=async function(username){
    const target=await onlineUserByUsername(username);if(!target||target.uid===currentUid())return false;const id=`${currentUid()}_${target.uid}`,ref=db().collection('follows').doc(id),snap=await ref.get();if(snap.exists){await ref.delete();return false}
    await ref.set({followerId:currentUid(),targetId:target.uid,followerUsername:currentLocalUser.username,targetUsername:target.username,created:now()});await addActivity(target.username,'follow',currentLocalUser.username,{});return true;
  };
  openFollowList=async function(username,kind){
    const st=await followStats(username),names=kind==='followers'?st.followers:st.following,users=await onlineUsers(),host=$('followListBody');$('followListTitle').textContent=kind==='followers'?'👥 ꜰᴏʟʟᴏᴡᴇʀꜱ':'👥 ꜰᴏʟʟᴏᴡɪɴɢ';host.innerHTML='';for(const name of names){const u=users.find(x=>x.username===name);if(!u)continue;const row=userBtn(u);row.onclick=()=>{$('followListDialog').close();openSocialProfile(u.username)};host.appendChild(row)}if(!host.children.length)host.innerHTML='<div class="empty-state">ɴᴏ ᴜꜱᴇʀꜱ ʏᴇᴛ</div>';if(!$('followListDialog').open)$('followListDialog').showModal();
  };

  // ---------- Activity ----------
  addActivity=async function(targetUsername,type,actorUsername,extra={}){
    try{
      const [target,actor]=await Promise.all([onlineUserByUsername(targetUsername),onlineUserByUsername(actorUsername)]);if(!target||!actor||target.uid===actor.uid)return;
      const ref=db().collection('activities').doc();await ref.set({recipientId:target.uid,recipientUsername:target.username,actorId:actor.uid,actorUsername:actor.username,type,created:now(),read:false,...extra});
    }catch(ex){console.warn('activity write',ex)}
  };
  async function fetchActivities(){if(!currentUid())return [];const s=await db().collection('activities').where('recipientId','==',currentUid()).get();return s.docs.map(docData).sort((a,b)=>b.created-a.created)}
  updateActivityBadge=async function(){
    if(!currentUid())return;try{const rows=await fetchActivities(),n=rows.filter(a=>!a.read).length,b=activityBadgeEl();if(!b)return;b.textContent=n?String(Math.min(n,99)):'';b.hidden=!n}catch{}
  };
  renderActivity=async function(){
    const host=$('activityList');if(!host||!currentLocalUser)return;host.innerHTML='';const activities=await fetchActivities(),users=await onlineUsers(),byUid=new Map(users.map(u=>[u.uid,u]));const map={follow:'ꜱᴛᴀʀᴛᴇᴅ ꜰᴏʟʟᴏᴡɪɴɢ ʏᴏᴜ','reel-like':'ʟɪᴋᴇᴅ ʏᴏᴜʀ ʀᴇᴇʟ',comment:'ᴄᴏᴍᴍᴇɴᴛᴇᴅ ᴏɴ ʏᴏᴜʀ ʀᴇᴇʟ',reply:'ʀᴇᴘʟɪᴇᴅ ᴛᴏ ʏᴏᴜʀ ᴄᴏᴍᴍᴇɴᴛ','comment-like':'ʟɪᴋᴇᴅ ʏᴏᴜʀ ᴄᴏᴍᴍᴇɴᴛ','post-like':'ʟɪᴋᴇᴅ ʏᴏᴜʀ ᴘᴏꜱᴛ','post-comment':'ᴄᴏᴍᴍᴇɴᴛᴇᴅ ᴏɴ ʏᴏᴜʀ ᴘᴏꜱᴛ','post-reply':'ʀᴇᴘʟɪᴇᴅ ᴛᴏ ʏᴏᴜʀ ᴘᴏꜱᴛ ᴄᴏᴍᴍᴇɴᴛ','post-comment-like':'ʟɪᴋᴇᴅ ʏᴏᴜʀ ᴘᴏꜱᴛ ᴄᴏᴍᴍᴇɴᴛ'};
    for(const a of activities){const u=byUid.get(a.actorId)||await onlineUserByUsername(a.actorUsername)||{username:a.actorUsername};const row=document.createElement('button');row.className='activity-row';row.innerHTML=`<img src="${dpUrl(u)}"><span><b>@${escapeHtml(u.username||a.actorUsername)}</b><small>${map[a.type]||escapeHtml(a.type)}</small></span><em>${fmtMsgTime(a.created)}</em>`;row.onclick=async()=>{await db().collection('activities').doc(a.id).set({read:true},{merge:true});$('activityDialog').close();updateActivityBadge();if(a.reelId)openReelsPage(a.reelId);else if(a.postId){const ps=await onlinePostsForUser(a.recipientId);const i=Math.max(0,ps.findIndex(p=>p.id===a.postId));openPostViewer(ps,i)}else openSocialProfile(u.username)};host.appendChild(row)}if(!host.children.length)host.innerHTML='<div class="empty-state">🔔 ɴᴏ ᴀᴄᴛɪᴠɪᴛʏ ʏᴇᴛ</div>';
  };
  openActivity=async function(){if(!currentLocalUser)return gate(true);await renderActivity();const d=$('activityDialog');if(!d.open)d.showModal();const rows=await fetchActivities();const batch=db().batch();for(const a of rows)if(!a.read)batch.set(db().collection('activities').doc(a.id),{read:true},{merge:true});try{await batch.commit()}catch{}updateActivityBadge()};
  const clearActivity=replaceNode('activityClearBtn');if(clearActivity)clearActivity.onclick=async()=>{if(!currentUid()||!confirm('Clear activity?'))return;const rows=await fetchActivities(),batch=db().batch();rows.forEach(a=>batch.delete(db().collection('activities').doc(a.id)));await batch.commit();renderActivity();updateActivityBadge()};
  function listenActivityBadge(){stopSnapshot('activityUnsub');if(!currentUid())return;fbState.activityUnsub=db().collection('activities').where('recipientId','==',currentUid()).onSnapshot(()=>{updateActivityBadge();if($('activityDialog')?.open)renderActivity()},ex=>console.warn('activity listener',ex))}

  // ---------- Reels / Posts metadata + small-media sync ----------
  async function localReelMap(){return new Map((localStoreHas('reels')?await getAll('reels'):[]).map(x=>[x.id,x]))}
  async function localPostMap(){return new Map((localStoreHas('posts')?await getAll('posts'):[]).map(x=>[x.id,x]))}
  async function mergeOnlineMediaDoc(d,localMap,kind){
    const l=localMap.get(d.id)||{};return {...l,...d,id:d.id,username:d.ownerUsername||d.username||l.username,ownerId:d.ownerId||l.ownerId,videoBlob:l.videoBlob,mediaBlob:l.mediaBlob,mediaUrl:d.mediaUrl||l.mediaUrl||'',mediaPath:d.mediaPath||l.mediaPath||'',mediaData:d.mediaData||l.mediaData||'',mediaLocalOnly:!!d.mediaLocalOnly,mediaType:d.mediaType||l.mediaType||'',mediaName:d.mediaName||l.mediaName||''}
  }
  async function allOnlineReels(){
    const [snap,lm]=await Promise.all([db().collection('reels').get(),localReelMap()]);const out=[];for(const doc of snap.docs)out.push(await mergeOnlineMediaDoc(docData(doc),lm,'reel'));
    // Preserve truly local legacy reels not yet migrated.
    for(const [id,l] of lm)if(!out.some(x=>x.id===id))out.push(l);return out.sort((a,b)=>(b.created||0)-(a.created||0));
  }
  async function allOnlinePosts(){
    const [snap,lm]=await Promise.all([db().collection('posts').get(),localPostMap()]);const out=[];for(const doc of snap.docs)out.push(await mergeOnlineMediaDoc(docData(doc),lm,'post'));for(const [id,l] of lm)if(!out.some(x=>x.id===id))out.push(l);return out.sort((a,b)=>(b.created||0)-(a.created||0));
  }
  async function onlineReelsForUser(ownerId){return (await allOnlineReels()).filter(x=>x.ownerId===ownerId||(!x.ownerId&&x.username===currentLocalUser?.username))}
  async function onlinePostsForUser(ownerId){return (await allOnlinePosts()).filter(x=>x.ownerId===ownerId||(!x.ownerId&&x.username===currentLocalUser?.username))}
  async function seenReelIds(){
    if(!currentUid())return new Set();try{const s=await db().collection('seenReels').doc(currentUid()).collection('items').get();return new Set(s.docs.map(d=>d.id))}catch{return getSeenReels()}
  }
  markReelSeen=function(id){
    if(!currentLocalUser||!id)return;try{const s=getSeenReels();s.add(id);localStorage.setItem(seenKey(),JSON.stringify([...s].slice(-3000)))}catch{}
    if(currentUid())db().collection('seenReels').doc(currentUid()).collection('items').doc(id).set({reelId:id,seenAt:now()},{merge:true}).catch(()=>{});
  };
  resetSeenReels=function(){if(currentLocalUser)localStorage.removeItem(seenKey());if(currentUid())db().collection('seenReels').doc(currentUid()).collection('items').get().then(s=>{const b=db().batch();s.docs.forEach(d=>b.delete(d.ref));return b.commit()}).catch(()=>{})};

  async function mediaBlobForItem(item,kind){
    const b=kind==='reel'?item?.videoBlob:item?.mediaBlob;if(b instanceof Blob)return b;if(item?.mediaData)return dataUrlToBlob(item.mediaData);if(item?.mediaUrl)try{const r=await fetch(item.mediaUrl);if(r.ok)return r.blob()}catch{}return null
  }
  function mediaPreviewMarkup(item,kind){
    const src=localMediaUrl(item,kind);if(!src)return `<div class="online-media-missing"><b>${kind==='reel'?'🎬':'🖼️'} ᴍᴇᴅɪᴀ ᴜɴᴀᴠᴀɪʟᴀʙʟᴇ</b><small>ᴛʜɪꜱ ᴏʟᴅ ɪᴛᴇᴍ ᴅᴏᴇꜱ ɴᴏᴛ ʜᴀᴠᴇ ᴀɴ ᴏɴʟɪɴᴇ ᴍᴇᴅɪᴀ ꜰɪʟᴇ.</small></div>`;
    return kind==='reel'?`<video src="${src}" playsinline loop preload="metadata"></video>`:((item.mediaType||item.mediaBlob?.type||mimeFromDataUrl(item.mediaData)).startsWith('video/')?`<video src="${src}" controls playsinline preload="metadata"></video>`:`<img src="${src}" alt="${escapeHtml(item.caption||'post')}">`)
  }
  async function reelLikeState(reelId){const s=await db().collection('reels').doc(reelId).collection('likes').get();return {count:s.size,liked:!!currentUid()&&s.docs.some(d=>d.id===currentUid())}}
  async function postLikeState(postId){const s=await db().collection('posts').doc(postId).collection('likes').get();return {count:s.size,liked:!!currentUid()&&s.docs.some(d=>d.id===currentUid())}}
  async function reelCommentCountOnline(reelId){const s=await db().collection('reels').doc(reelId).collection('comments').get();let n=s.size;for(const c of s.docs){try{n+=(await c.ref.collection('replies').get()).size}catch{}}return n}
  async function postCommentCountOnline(postId){const s=await db().collection('posts').doc(postId).collection('comments').get();let n=s.size;for(const c of s.docs){try{n+=(await c.ref.collection('replies').get()).size}catch{}}return n}
  async function toggleNestedLike(parentCollection,id,targetOwnerId,targetOwnerUsername,type,extra={}){
    const ref=db().collection(parentCollection).doc(id).collection('likes').doc(currentUid()),snap=await ref.get();if(snap.exists){await ref.delete();return false}await ref.set({uid:currentUid(),username:currentLocalUser.username,created:now()});if(targetOwnerId!==currentUid())await addActivity(targetOwnerUsername,type,currentLocalUser.username,extra);return true
  }

  // Create / publish: metadata is online; small media is online; large video remains local until media storage is added.
  $('publishCreate').onclick=async()=>{
    if(!createFile||!currentLocalUser||!online())return;const btn=$('publishCreate');btn.disabled=true;
    try{
      const kind=createKind==='reel'?'reel':'post',id=(kind==='reel'?'reel-':'post-')+Date.now()+'-'+Math.random().toString(36).slice(2),caption=$('createCaption').value.trim(),media=await smallMediaPayload(createFile,kind),doc={id,ownerId:currentUid(),ownerUsername:currentLocalUser.username,username:currentLocalUser.username,caption,created:now(),...media};
      if(kind==='reel'){const local={...doc,videoBlob:createFile};await put('reels',local);await db().collection('reels').doc(id).set(doc)}else{const local={...doc,mediaBlob:createFile};await put('posts',local);await db().collection('posts').doc(id).set(doc)}
      $('createReelDialog').close();resetCreate();if(kind==='reel')openReelsPage(id);else openSocialProfile(currentLocalUser.username);
    }catch(ex){console.error('publish online',ex);alert('❌ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴘᴏꜱᴛ • '+(ex.message||'FIREBASE ERROR'))}finally{btn.disabled=false}
  };

  async function deleteReelOnline(r){
    const ref=db().collection('reels').doc(r.id);try{
      const comments=await ref.collection('comments').get();for(const c of comments.docs){const [likes,replies]=await Promise.all([c.ref.collection('likes').get(),c.ref.collection('replies').get()]);for(const d of likes.docs)await d.ref.delete();for(const rp of replies.docs){const ls=await rp.ref.collection('likes').get();for(const x of ls.docs)await x.ref.delete();await rp.ref.delete()}await c.ref.delete()}const likes=await ref.collection('likes').get();for(const l of likes.docs)await l.ref.delete();await ref.delete();if(r.mediaPath)await deleteStoragePath(r.mediaPath);try{await del('reels',r.id)}catch{}return true
    }catch(ex){console.error('delete reel',ex);alert('❌ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴅᴇʟᴇᴛᴇ');return false}
  }
  renderSocialReels=async function(focus){
    const h=$('reelsFeed'),all=await allOnlineReels(),users=await onlineUsers(),seen=await seenReelIds(),rows=focus?all:all.filter(r=>!seen.has(r.id));h.innerHTML='';
    if(!rows.length){h.innerHTML='<div class="empty-state reel-empty-full">✅ ɴᴏ ɴᴇᴡ ʀᴇᴇʟꜱ<br><small>ꜱᴇᴇɴ ʀᴇᴇʟꜱ ᴀʀᴇ ꜱᴛɪʟʟ ᴀᴠᴀɪʟᴀʙʟᴇ ꜰʀᴏᴍ ꜱᴇᴀʀᴄʜ ᴀɴᴅ ᴜꜱᴇʀ ᴘʀᴏꜰɪʟᴇꜱ.</small></div>';return}
    for(const r of rows){
      const u=users.find(x=>x.uid===r.ownerId)||users.find(x=>x.username===r.username)||{username:r.username||r.ownerUsername||'user',uid:r.ownerId},own=r.ownerId?currentUid()===r.ownerId:currentLocalUser?.username===r.username,canModerate=own||isAdminUid(),ls=await reelLikeState(r.id),cc=await reelCommentCountOnline(r.id),c=document.createElement('article');c.className='reel-card reel-full';c.dataset.id=r.id;
      c.innerHTML=`<div class="reel-video-wrap">${mediaPreviewMarkup(r,'reel')}<div class="reel-actions"><button class="like" type="button">${ls.liked?'♥':'♡'}<small class="like-count">${ls.count||''}</small></button><button class="comment" type="button">💬<small class="comment-count">${cc||''}</small></button><button class="share" type="button">📤</button><button class="down" type="button">⬇</button><button class="more" type="button">⋮</button></div><button class="reel-owner" type="button"><img src="${dpUrl(u)}"><div><b>@${escapeHtml(u.username)}${u.uid===ADMIN_UID?' 🛡️':''}</b>${r.caption?`<p>${escapeHtml(r.caption)}</p>`:''}</div></button><div class="reel-more-menu" hidden>${canModerate?'<button class="delete-reel" type="button">🗑️ ᴅᴇʟᴇᴛᴇ ʀᴇᴇʟ</button>':''}<button class="cancel-more" type="button">✕ ᴄʟᴏꜱᴇ</button></div></div>`;
      const reelVideo=c.querySelector('.reel-video-wrap>video');if(reelVideo){reelVideo.controls=false;reelVideo.playsInline=true;reelVideo.setAttribute('playsinline','');reelVideo.setAttribute('webkit-playsinline','');reelVideo.disablePictureInPicture=true;}
      c.querySelector('.reel-owner').onclick=()=>openSocialProfile(u.username);
      c.querySelector('.like').onclick=async()=>{const liked=await toggleNestedLike('reels',r.id,r.ownerId,u.username,'reel-like',{reelId:r.id});const s=await reelLikeState(r.id);c.querySelector('.like').childNodes[0].textContent=liked?'♥':'♡';c.querySelector('.like-count').textContent=s.count||''};
      c.querySelector('.comment').onclick=()=>openReelComments(r,c);
      c.querySelector('.down').onclick=async()=>{const b=await mediaBlobForItem(r,'reel');if(b)dl(b,`@${u.username}-reel.mp4`);else alert('⚠️ ᴍᴇᴅɪᴀ ɪꜱ ɴᴏᴛ ᴏɴ ᴛʜɪꜱ ᴅᴇᴠɪᴄᴇ')};
      c.querySelector('.share').onclick=async()=>{try{const b=await mediaBlobForItem(r,'reel');if(navigator.share){const data={title:`@${u.username}`,text:r.caption||''};if(b){const f=new File([b],r.mediaName||`@${u.username}-reel.mp4`,{type:b.type||r.mediaType||'video/mp4'});if(navigator.canShare?.({files:[f]}))data.files=[f]}await navigator.share(data)}}catch{}};
      const menu=c.querySelector('.reel-more-menu');c.querySelector('.more').onclick=()=>menu.hidden=!menu.hidden;c.querySelector('.cancel-more').onclick=()=>menu.hidden=true;c.querySelector('.delete-reel')?.addEventListener('click',async()=>{if(!confirm(isAdminUid()&&!own?'Admin: delete this user reel?':'Delete this reel?'))return;stopAllReels();if(await deleteReelOnline(r))renderSocialReels()});h.appendChild(c)
    }
    reelObserver?.disconnect();const timers=new Map();reelObserver=new IntersectionObserver(entries=>entries.forEach(e=>{const v=e.target.querySelector('video'),id=e.target.dataset.id;if(!v){if(e.isIntersecting&&e.intersectionRatio>=.72){clearTimeout(timers.get(id));timers.set(id,setTimeout(()=>markReelSeen(id),900))}return}if(e.isIntersecting&&e.intersectionRatio>=.72&&canResumeReel()){pauseBackgroundMusic();h.querySelectorAll('video').forEach(o=>{if(o!==v){try{o.pause();o.currentTime=0}catch{}}});if(v.paused){v.currentTime=0;v.muted=false;v.play().catch(()=>{})}clearTimeout(timers.get(id));timers.set(id,setTimeout(()=>markReelSeen(id),900))}else{clearTimeout(timers.get(id));v.pause();if(e.intersectionRatio<.2)v.currentTime=0}}),{root:h,threshold:[0,.2,.72,1]});h.querySelectorAll('.reel-card').forEach(c=>reelObserver.observe(c));if(focus)setTimeout(()=>h.querySelector(`[data-id="${focus}"]`)?.scrollIntoView({block:'start'}),80)
  };

  // ---------- Reel comments / replies / comment likes ----------
  async function onlineReelCommentTree(reelId){
    const base=db().collection('reels').doc(reelId).collection('comments'),snap=await base.get(),rows=[];
    for(const d of snap.docs){const cm=docData(d),ls=await d.ref.collection('likes').get();cm.likeCount=ls.size;cm.liked=!!currentUid()&&ls.docs.some(x=>x.id===currentUid());cm.kind='comment';rows.push(cm);const reps=await d.ref.collection('replies').get();for(const rp of reps.docs){const r=docData(rp),rl=await rp.ref.collection('likes').get();r.likeCount=rl.size;r.liked=!!currentUid()&&rl.docs.some(x=>x.id===currentUid());r.kind='reply';r.parentId=d.id;rows.push(r)}}
    return rows.sort((a,b)=>a.created-b.created)
  }
  commentsForReel=async function(reelId){return onlineReelCommentTree(reelId)};
  updateReelCommentCount=async function(reelId,btn=null){const n=(await onlineReelCommentTree(reelId)).length,target=btn||[...document.querySelectorAll('.reel-card')].find(x=>x.dataset.id===reelId)?.querySelector('.comment'),count=target?.querySelector('.comment-count');if(count)count.textContent=n?String(n):''};
  renderReelComments=async function(){
    const host=$('commentsList');host.innerHTML='';if(!activeCommentReel)return;const rows=await onlineReelCommentTree(activeCommentReel.id),users=await onlineUsers(),byUid=new Map(users.map(u=>[u.uid,u]));
    for(const cm of rows){const u=byUid.get(cm.ownerId)||users.find(x=>x.username===cm.username)||{username:cm.username||'user'},own=cm.ownerId?cm.ownerId===currentUid():cm.username===currentLocalUser?.username,canDelete=own||isAdminUid(),row=document.createElement('div');row.className='comment-row'+(cm.kind==='reply'?' comment-reply-row':'');row.innerHTML=`<button class="comment-user" type="button"><img src="${dpUrl(u)}"><span><b>@${escapeHtml(u.username)}${u.uid===ADMIN_UID?' 🛡️':''}</b><p>${cm.kind==='reply'?'↩️ ':''}${escapeHtml(cm.text)}</p><small>${fmtMsgTime(cm.created)}</small></span></button><div class="comment-actions-mini"><button class="comment-like" type="button">${cm.liked?'♥':'♡'} <small>${cm.likeCount||''}</small></button>${cm.kind==='comment'?'<button class="comment-reply" type="button">↩️</button>':''}${canDelete?'<button class="comment-delete" type="button">🗑</button>':''}</div>`;
      row.querySelector('.comment-user').onclick=()=>{$('commentsDialog').close();openSocialProfile(u.username)};
      row.querySelector('.comment-like').onclick=async()=>{if(!currentUid())return gate(true);const ref=cm.kind==='reply'?db().collection('reels').doc(activeCommentReel.id).collection('comments').doc(cm.parentId).collection('replies').doc(cm.id):db().collection('reels').doc(activeCommentReel.id).collection('comments').doc(cm.id),like=ref.collection('likes').doc(currentUid()),s=await like.get();if(s.exists)await like.delete();else{await like.set({uid:currentUid(),username:currentLocalUser.username,created:now()});if(cm.ownerId!==currentUid())await addActivity(u.username,'comment-like',currentLocalUser.username,{reelId:activeCommentReel.id,commentId:cm.id})}renderReelComments()};
      row.querySelector('.comment-reply')?.addEventListener('click',()=>{replyToComment=cm;$('commentText').placeholder='↩️ ʀᴇᴘʟʏ ᴛᴏ @'+u.username+'...';$('commentText').focus()});
      row.querySelector('.comment-delete')?.addEventListener('click',async()=>{if(!confirm(isAdminUid()&&!own?'Admin: delete this comment?':'Delete this comment?'))return;if(cm.kind==='reply'){const ref=db().collection('reels').doc(activeCommentReel.id).collection('comments').doc(cm.parentId).collection('replies').doc(cm.id);const l=await ref.collection('likes').get();for(const x of l.docs)await x.ref.delete();await ref.delete()}else{const ref=db().collection('reels').doc(activeCommentReel.id).collection('comments').doc(cm.id),[likes,reps]=await Promise.all([ref.collection('likes').get(),ref.collection('replies').get()]);for(const x of likes.docs)await x.ref.delete();for(const r of reps.docs){const l=await r.ref.collection('likes').get();for(const x of l.docs)await x.ref.delete();await r.ref.delete()}await ref.delete()}await renderReelComments();updateReelCommentCount(activeCommentReel.id)});host.appendChild(row)
    }
    if(!host.children.length)host.innerHTML='<div class="empty-state">💬 ɴᴏ ᴄᴏᴍᴍᴇɴᴛꜱ ʏᴇᴛ<br><small>ʙᴇ ᴛʜᴇ ꜰɪʀꜱᴛ ᴛᴏ ᴄᴏᴍᴍᴇɴᴛ.</small></div>';host.scrollTop=host.scrollHeight
  };
  sendReelComment=async function(){
    const text=$('commentText').value.trim();if(!text||!activeCommentReel||!currentLocalUser)return;const reelOwner=await onlineUserByUid(activeCommentReel.ownerId)||await onlineUserByUsername(activeCommentReel.username),parent=replyToComment;
    if(parent){const ref=db().collection('reels').doc(activeCommentReel.id).collection('comments').doc(parent.id).collection('replies').doc();await ref.set({id:ref.id,ownerId:currentUid(),username:currentLocalUser.username,text,created:now()});const parentOwner=await onlineUserByUid(parent.ownerId)||await onlineUserByUsername(parent.username);if(parentOwner)await addActivity(parentOwner.username,'reply',currentLocalUser.username,{reelId:activeCommentReel.id,commentId:parent.id,replyId:ref.id})}
    else{const ref=db().collection('reels').doc(activeCommentReel.id).collection('comments').doc();await ref.set({id:ref.id,ownerId:currentUid(),username:currentLocalUser.username,text,created:now()});if(reelOwner)await addActivity(reelOwner.username,'comment',currentLocalUser.username,{reelId:activeCommentReel.id,commentId:ref.id})}
    replyToComment=null;$('commentText').value='';$('commentText').placeholder='ᴀᴅᴅ ᴀ ᴄᴏᴍᴍᴇɴᴛ...';await renderReelComments();updateReelCommentCount(activeCommentReel.id)
  };
  $('commentSendBtn').onclick=sendReelComment;$('commentText').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendReelComment()}};

  // ---------- Instagram-style online profiles ----------
  openSocialProfile=async function(name){
    try{
      leaveReelsMode();pauseAllForegroundVideo(false);await waitDB();const u=await onlineUserByUsername(name);if(!u){alert('❌ ᴜꜱᴇʀ ɴᴏᴛ ꜰᴏᴜɴᴅ');return}rememberUser(u.username);localStorage.setItem('og_last_view','profile:'+u.username);
      const [reels,posts,st,following]=await Promise.all([onlineReelsForUser(u.uid),onlinePostsForUser(u.uid),followStats(u.username),u.uid===currentUid()?Promise.resolve(false):isFollowing(u.username)]),own=u.uid===currentUid(),admin=u.uid===ADMIN_UID,dlg=$('userProfileDialog'),b=$('userProfileBody');
      b.innerHTML=`<div class="social-profile-page ig-profile-page"><div class="social-profile-topbar"><button class="profile-back" type="button">←</button><b>@${escapeHtml(u.username)}</b><button class="profile-more" type="button">⋮</button></div><section class="ig-profile-main"><div class="ig-profile-row"><img class="ig-profile-dp" src="${dpUrl(u)}" alt="${escapeHtml(u.name||u.username)} DP"><div class="ig-profile-right"><div class="ig-name-row"><h2>${escapeHtml(u.name||u.username)}</h2>${admin?'<span class="ig-admin-badge">🛡️ ᴀᴅᴍɪɴ</span>':''}</div><div class="ig-stats"><button data-stat="posts"><b>${posts.length}</b><small>ᴘᴏꜱᴛꜱ</small></button><button data-stat="followers"><b>${st.followers.length}</b><small>ꜰᴏʟʟᴏᴡᴇʀꜱ</small></button><button data-stat="following"><b>${st.following.length}</b><small>ꜰᴏʟʟᴏᴡɪɴɢ</small></button><button data-stat="reels"><b>${reels.length}</b><small>ʀᴇᴇʟꜱ</small></button></div></div></div><div class="ig-bio">${u.bio?escapeHtml(u.bio).replace(/\n/g,'<br>'):'<span>ɴᴏ ʙɪᴏ ʏᴇᴛ</span>'}</div><div class="ig-profile-actions">${own?'<button class="mini-btn profile-edit-btn" type="button">✏️ ᴇᴅɪᴛ ᴘʀᴏꜰɪʟᴇ</button>':`<button class="primary-btn profile-follow-btn" type="button">${following?'✓ ꜰᴏʟʟᴏᴡɪɴɢ':'＋ ꜰᴏʟʟᴏᴡ'}</button>`}<button class="mini-btn profile-share-btn" type="button">📤 ꜱʜᴀʀᴇ ᴘʀᴏꜰɪʟᴇ</button></div></section><div class="social-tabs"><button class="active" data-tab="posts">🖼️ ᴘᴏꜱᴛꜱ</button><button data-tab="reels">🎬 ʀᴇᴇʟꜱ</button></div><div class="social-tab-panel posts-panel"><div class="profile-post-grid"></div></div><div class="social-tab-panel reels-panel" hidden><div class="profile-reel-grid"></div></div></div>`;
      const pg=b.querySelector('.profile-post-grid');for(let i=0;i<posts.length;i++){const p=posts[i],cell=document.createElement('button');cell.className='profile-post-cell';const src=localMediaUrl(p,'post');if(src){if((p.mediaType||p.mediaBlob?.type||mimeFromDataUrl(p.mediaData)).startsWith('video/'))cell.innerHTML=`<video src="${src}" muted playsinline preload="metadata"></video><span>▶</span>`;else cell.innerHTML=`<img src="${src}" alt="${escapeHtml(p.caption||'post')}">`}else cell.innerHTML='<div class="social-media-placeholder">🖼️<small>ᴍᴇᴅɪᴀ ᴏɴ ᴏʀɪɢɪɴᴀʟ ᴅᴇᴠɪᴄᴇ</small></div>';cell.onclick=()=>openPostViewer(posts,i);pg.appendChild(cell)}
      const rg=b.querySelector('.profile-reel-grid');for(const r of reels){const cell=document.createElement('button');cell.type='button';cell.className='profile-reel-cell';cell.dataset.r=r.id;cell.title='Open reel';cell.setAttribute('aria-label','Open reel');const src=localMediaUrl(r,'reel');cell.innerHTML=src?`<video src="${src}" muted playsinline webkit-playsinline preload="metadata" tabindex="-1"></video><span>▶</span>`:'<div class="social-media-placeholder">🎬<small>ᴍᴇᴅɪᴀ ᴏɴ ᴏʀɪɢɪɴᴀʟ ᴅᴇᴠɪᴄᴇ</small></div>';cell.onclick=e=>{e.preventDefault();e.stopPropagation();try{cell.querySelector('video')?.pause()}catch{}dlg.close();openReelsPage(r.id)};rg.appendChild(cell)}if(!rg.children.length)rg.innerHTML='<small>ɴᴏ ʀᴇᴇʟꜱ ʏᴇᴛ</small>';
      b.querySelector('.profile-back').onclick=()=>{localStorage.setItem('og_last_view','page');dlg.close();tryPlayMusic()};b.querySelector('.profile-more').onclick=()=>shareProfile(u);b.querySelector('[data-stat="followers"]').onclick=()=>openFollowList(u.username,'followers');b.querySelector('[data-stat="following"]').onclick=()=>openFollowList(u.username,'following');b.querySelector('[data-stat="posts"]').onclick=()=>b.querySelector('[data-tab="posts"]').click();b.querySelector('[data-stat="reels"]').onclick=()=>b.querySelector('[data-tab="reels"]').click();b.querySelectorAll('.social-tabs button').forEach(btn=>btn.onclick=()=>{b.querySelectorAll('.social-tabs button').forEach(x=>x.classList.toggle('active',x===btn));b.querySelector('.reels-panel').hidden=btn.dataset.tab!=='reels';b.querySelector('.posts-panel').hidden=btn.dataset.tab!=='posts'});b.querySelector('.profile-edit-btn')?.addEventListener('click',()=>openEditUserProfile());b.querySelector('.profile-share-btn').onclick=()=>shareProfile(u);b.querySelector('.profile-follow-btn')?.addEventListener('click',async e=>{const yes=await toggleFollowUser(u.username),s=await followStats(u.username);e.currentTarget.textContent=yes?'✓ ꜰᴏʟʟᴏᴡɪɴɢ':'＋ ꜰᴏʟʟᴏᴡ';b.querySelector('[data-stat="followers"] b').textContent=s.followers.length});if(dlg.open)dlg.close();dlg.showModal();
    }catch(ex){console.error('online profile',ex);alert('❌ ᴘʀᴏꜰɪʟᴇ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴏᴘᴇɴ')}
  };

  // ---------- Online Post viewer / likes / comments ----------
  async function onlinePostCommentTree(postId){
    const base=db().collection('posts').doc(postId).collection('comments'),snap=await base.get(),rows=[];for(const d of snap.docs){const cm=docData(d),ls=await d.ref.collection('likes').get();cm.likeCount=ls.size;cm.liked=!!currentUid()&&ls.docs.some(x=>x.id===currentUid());cm.kind='comment';rows.push(cm);const reps=await d.ref.collection('replies').get();for(const rp of reps.docs){const r=docData(rp),rl=await rp.ref.collection('likes').get();r.likeCount=rl.size;r.liked=!!currentUid()&&rl.docs.some(x=>x.id===currentUid());r.kind='reply';r.parentId=d.id;rows.push(r)}}return rows.sort((a,b)=>a.created-b.created)
  }
  postCommentRows=async function(postId){return onlinePostCommentTree(postId)};
  postCounts=async function(post){const [l,c]=await Promise.all([postLikeState(post.id),onlinePostCommentTree(post.id)]);return {likes:l.count,liked:l.liked,comments:c.length}};
  renderPostViewer=async function(){
    const p=activePost;if(!p)return;const u=await onlineUserByUid(p.ownerId)||await onlineUserByUsername(p.username)||{username:p.username||'user'},cnt=await postCounts(p),own=p.ownerId?currentUid()===p.ownerId:currentLocalUser?.username===p.username,canDelete=own||isAdminUid();$('postViewerUserDp').src=dpUrl(u);$('postViewerUsername').textContent='@'+u.username;$('postViewerIndex').textContent=`${activePostIndex+1} / ${activePostList.length}`;$('postViewerCaption').textContent=p.caption||'';$('postViewerTime').textContent=new Date(p.created||now()).toLocaleString();$('postLikeCount').textContent=cnt.likes;$('postCommentCount').textContent=cnt.comments;$('postLikeBtn').textContent=cnt.liked?'♥':'♡';$('postDeleteBtn').hidden=!canDelete;const stage=$('postViewerStage');stage.innerHTML='';const src=localMediaUrl(p,'post');if(!src)stage.innerHTML='<div class="online-media-missing"><b>🖼️ ᴍᴇᴅɪᴀ ɴᴏᴛ ᴏɴ ᴛʜɪꜱ ᴅᴇᴠɪᴄᴇ</b><small>ᴘᴏꜱᴛ ᴍᴇᴛᴀᴅᴀᴛᴀ, ʟɪᴋᴇꜱ ᴀɴᴅ ᴄᴏᴍᴍᴇɴᴛꜱ ᴀʀᴇ ᴏɴʟɪɴᴇ.</small></div>';else if((p.mediaType||p.mediaBlob?.type||mimeFromDataUrl(p.mediaData)).startsWith('video/')){const v=document.createElement('video');v.src=src;v.controls=true;v.playsInline=true;v.autoplay=true;stage.appendChild(v)}else{const im=document.createElement('img');im.src=src;im.alt=p.caption||'post';stage.appendChild(im)}$('postPrevBtn').disabled=activePostIndex<=0;$('postNextBtn').disabled=activePostIndex>=activePostList.length-1
  };
  async function deletePostOnline(p){const ref=db().collection('posts').doc(p.id);try{const comments=await ref.collection('comments').get();for(const c of comments.docs){const [likes,reps]=await Promise.all([c.ref.collection('likes').get(),c.ref.collection('replies').get()]);for(const x of likes.docs)await x.ref.delete();for(const rp of reps.docs){const l=await rp.ref.collection('likes').get();for(const x of l.docs)await x.ref.delete();await rp.ref.delete()}await c.ref.delete()}const likes=await ref.collection('likes').get();for(const x of likes.docs)await x.ref.delete();await ref.delete();if(p.mediaPath)await deleteStoragePath(p.mediaPath);try{await del('posts',p.id)}catch{}return true}catch(ex){console.error(ex);alert('❌ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴅᴇʟᴇᴛᴇ ᴘᴏꜱᴛ');return false}}
  function rebindPostViewerButtons(){
    for(const id of ['postLikeBtn','postCommentBtn','postShareBtn','postDownloadBtn','postDeleteBtn','postCommentsCountBtn','postCommentSend','postCommentText'])replaceNode(id);
    $('postLikeBtn').onclick=async()=>{if(!activePost)return;const owner=await onlineUserByUid(activePost.ownerId)||await onlineUserByUsername(activePost.username);await toggleNestedLike('posts',activePost.id,activePost.ownerId,owner?.username||activePost.username,'post-like',{postId:activePost.id});renderPostViewer()};
    const openComments=async()=>{if(!activePost)return;await renderPostComments();if(!$('postCommentsDialog').open)$('postCommentsDialog').showModal()};$('postCommentBtn').onclick=openComments;$('postCommentsCountBtn').onclick=openComments;
    $('postShareBtn').onclick=async()=>{if(!activePost)return;try{const b=await mediaBlobForItem(activePost,'post');if(navigator.share){const d={title:'@'+(activePost.username||''),text:activePost.caption||''};if(b){const f=new File([b],activePost.mediaName||'post',{type:b.type||activePost.mediaType||'image/jpeg'});if(navigator.canShare?.({files:[f]}))d.files=[f]}await navigator.share(d)}}catch{}};
    $('postDownloadBtn').onclick=async()=>{if(!activePost)return;const b=await mediaBlobForItem(activePost,'post');if(b)dl(b,activePost.mediaName||`@${activePost.username}-post`);else alert('⚠️ ᴍᴇᴅɪᴀ ɪꜱ ɴᴏᴛ ᴏɴ ᴛʜɪꜱ ᴅᴇᴠɪᴄᴇ')};
    $('postDeleteBtn').onclick=async()=>{if(!activePost||!confirm('Delete this post?'))return;const owner=activePost.username;if(!(activePost.ownerId===currentUid()||isAdminUid()))return;if(!(await deletePostOnline(activePost)))return;activePostList=activePostList.filter(x=>x.id!==activePost.id);if(!activePostList.length){closePostViewer();openSocialProfile(owner);return}activePostIndex=Math.min(activePostIndex,activePostList.length-1);activePost=activePostList[activePostIndex];renderPostViewer()};
    $('postCommentSend').onclick=sendPostComment;$('postCommentText').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendPostComment()}};
  }
  renderPostComments=async function(){
    if(!activePost)return;const rows=await onlinePostCommentTree(activePost.id),users=await onlineUsers(),byUid=new Map(users.map(u=>[u.uid,u])),host=$('postCommentsList');host.innerHTML='';for(const cm of rows){const u=byUid.get(cm.ownerId)||users.find(x=>x.username===cm.username)||{username:cm.username||'user'},own=cm.ownerId===currentUid(),row=document.createElement('div');row.className='comment-row '+(cm.kind==='reply'?'comment-reply-row':'');row.innerHTML=`<button class="comment-user"><img src="${dpUrl(u)}"><span><b>@${escapeHtml(u.username)}</b><p>${cm.kind==='reply'?'↩️ ':''}${escapeHtml(cm.text)}</p><small>${fmtMsgTime(cm.created)}</small><div class="comment-actions-mini"><button class="post-comment-like">${cm.liked?'♥':'♡'} ${cm.likeCount||''}</button>${cm.kind==='comment'?'<button class="post-comment-reply">↩ ʀᴇᴘʟʏ</button>':''}</div></span></button>${(own||isAdminUid())?'<button class="comment-delete">🗑</button>':''}`;row.querySelector('.comment-user').onclick=e=>{if(e.target.closest('.comment-actions-mini'))return;$('postCommentsDialog').close();closePostViewer();openSocialProfile(u.username)};row.querySelector('.post-comment-like').onclick=async e=>{e.stopPropagation();const base=cm.kind==='reply'?db().collection('posts').doc(activePost.id).collection('comments').doc(cm.parentId).collection('replies').doc(cm.id):db().collection('posts').doc(activePost.id).collection('comments').doc(cm.id),like=base.collection('likes').doc(currentUid()),s=await like.get();if(s.exists)await like.delete();else{await like.set({uid:currentUid(),username:currentLocalUser.username,created:now()});if(cm.ownerId!==currentUid())await addActivity(u.username,'post-comment-like',currentLocalUser.username,{postId:activePost.id,commentId:cm.id})}renderPostComments()};row.querySelector('.post-comment-reply')?.addEventListener('click',e=>{e.stopPropagation();activePostReply=cm;$('postCommentText').placeholder='↩ @'+u.username+'...';$('postCommentText').focus()});row.querySelector('.comment-delete')?.addEventListener('click',async()=>{if(cm.kind==='reply'){const ref=db().collection('posts').doc(activePost.id).collection('comments').doc(cm.parentId).collection('replies').doc(cm.id),ls=await ref.collection('likes').get();for(const x of ls.docs)await x.ref.delete();await ref.delete()}else{const ref=db().collection('posts').doc(activePost.id).collection('comments').doc(cm.id),[ls,reps]=await Promise.all([ref.collection('likes').get(),ref.collection('replies').get()]);for(const x of ls.docs)await x.ref.delete();for(const r of reps.docs){const l=await r.ref.collection('likes').get();for(const x of l.docs)await x.ref.delete();await r.ref.delete()}await ref.delete()}renderPostComments();renderPostViewer()});host.appendChild(row)}if(!host.children.length)host.innerHTML='<div class="empty-state">💬 ɴᴏ ᴄᴏᴍᴍᴇɴᴛꜱ ʏᴇᴛ</div>'
  };
  sendPostComment=async function(){
    const text=$('postCommentText').value.trim();if(!text||!activePost||!currentLocalUser)return;const postOwner=await onlineUserByUid(activePost.ownerId)||await onlineUserByUsername(activePost.username),parent=activePostReply;if(parent){const ref=db().collection('posts').doc(activePost.id).collection('comments').doc(parent.id).collection('replies').doc();await ref.set({id:ref.id,ownerId:currentUid(),username:currentLocalUser.username,text,created:now()});const u=await onlineUserByUid(parent.ownerId)||await onlineUserByUsername(parent.username);if(u)await addActivity(u.username,'post-reply',currentLocalUser.username,{postId:activePost.id,commentId:parent.id,replyId:ref.id})}else{const ref=db().collection('posts').doc(activePost.id).collection('comments').doc();await ref.set({id:ref.id,ownerId:currentUid(),username:currentLocalUser.username,text,created:now()});if(postOwner)await addActivity(postOwner.username,'post-comment',currentLocalUser.username,{postId:activePost.id,commentId:ref.id})}$('postCommentText').value='';$('postCommentText').placeholder='ᴀᴅᴅ ᴀ ᴄᴏᴍᴍᴇɴᴛ...';activePostReply=null;await renderPostComments();await renderPostViewer()
  };
  rebindPostViewerButtons();

  // ---------- Direct messages (real-time text + small online media) ----------
  async function chatDocsForMe(){if(!currentUid())return [];const s=await db().collection('chats').where('members','array-contains',currentUid()).get();return s.docs.map(docData).sort((a,b)=>(b.updated||b.lastMessageAt||0)-(a.updated||a.lastMessageAt||0))}
  async function ensureChat(other){
    const id=chatIdFor(currentUid(),other.uid),ref=db().collection('chats').doc(id),snap=await ref.get();if(!snap.exists)await ref.set({id,creatorId:currentUid(),members:[currentUid(),other.uid],memberUsernames:[currentLocalUser.username,other.username],created:now(),updated:now(),lastMessage:'',lastMessageAt:0,lastMessageSenderId:'',lastRead:{[currentUid()]:now()},clearedAt:{}});return ref
  }
  renderRecentChats=async function(){
    const host=$('recentChats');host.innerHTML='';if(!currentUid())return;const [chats,users]=await Promise.all([chatDocsForMe(),onlineUsers()]),byUid=new Map(users.map(u=>[u.uid,u]));for(const c of chats){const oid=safeArray(c.members).find(x=>x!==currentUid()),u=byUid.get(oid);if(!u)continue;const lastRead=Number(c.lastRead?.[currentUid()]||0),unread=c.lastMessageSenderId&&c.lastMessageSenderId!==currentUid()&&Number(c.lastMessageAt||0)>lastRead,row=document.createElement('button');row.className='chat-row';row.innerHTML=`<img src="${dpUrl(u)}"><span><b>@${escapeHtml(u.username)}</b><small>${escapeHtml(c.lastMessage||'ᴍᴇꜱꜱᴀɢᴇ')}</small></span><em>${fmtMsgTime(c.lastMessageAt)}${unread?'<i>1</i>':''}</em>`;row.onclick=()=>openChat(u);host.appendChild(row)}if(!host.children.length)host.innerHTML='<div class="empty-state">💬 ɴᴏ ᴄʜᴀᴛꜱ ʏᴇᴛ<br><small>ꜱᴇᴀʀᴄʜ ᴀ ᴜꜱᴇʀ ᴛᴏ ꜱᴛᴀʀᴛ.</small></div>';
  };
  updateMessageBadge=async function(){
    if(!currentUid())return;try{const rows=await chatDocsForMe();let n=0;for(const c of rows){if(c.lastMessageSenderId&&c.lastMessageSenderId!==currentUid()&&Number(c.lastMessageAt||0)>Number(c.lastRead?.[currentUid()]||0))n++}const b=$('messageBtn');if(!b)return;b.dataset.unread=n?String(n):'';b.classList.toggle('has-unread',n>0)}catch{}
  };
  const messageSearch=replaceNode('messageUserSearch');if(messageSearch)messageSearch.oninput=async()=>{const raw=messageSearch.value.trim().toLowerCase(),q=normUser(raw),host=$('messageSearchResults');host.innerHTML='';if(!raw)return;const users=await onlineUsers();users.filter(u=>u.uid!==currentUid()&&(u.username.includes(q)||(u.userId||'').toLowerCase().includes(raw))).slice(0,40).forEach(u=>{const b=document.createElement('button');b.className='chat-row';b.innerHTML=`<img src="${dpUrl(u)}"><span><b>@${escapeHtml(u.username)}</b><small>${escapeHtml(u.name||'')} • ${escapeHtml(u.userId||'')}</small></span><em>›</em>`;b.onclick=()=>openChat(u);host.appendChild(b)});if(!host.children.length)host.innerHTML='<div class="empty-state">ɴᴏ ᴜꜱᴇʀ ꜰᴏᴜɴᴅ</div>'};
  openChat=async function(u){
    activeChatUser=u;$('messagesListView').hidden=true;$('chatView').hidden=false;$('chatUserDp').src=dpUrl(u);$('chatUsername').textContent='@'+u.username;$('chatUserId').textContent=(u.name||'')+' • '+(u.userId||'');$('chatText').value='';const chatRef=await ensureChat(u);await chatRef.set({[`lastRead.${currentUid()}`]:now()},{merge:true});listenChat(chatRef.id);await renderChat();updateMessageBadge()
  };
  function listenChat(chatId){stopSnapshot('chatUnsub');fbState.chatUnsub=db().collection('chats').doc(chatId).collection('messages').orderBy('created').onSnapshot(()=>{if(activeChatUser&&chatId===chatIdFor(currentUid(),activeChatUser.uid))renderChat()},ex=>console.warn('chat listener',ex))}
  renderChat=async function(){
    const host=$('chatMessages');host.innerHTML='';if(!currentUid()||!activeChatUser)return;const id=chatIdFor(currentUid(),activeChatUser.uid),chat=await db().collection('chats').doc(id).get(),cut=Number(chat.data()?.clearedAt?.[currentUid()]||0),s=await db().collection('chats').doc(id).collection('messages').orderBy('created').get();for(const d of s.docs){const m=docData(d);if(m.created<=cut)continue;const mine=m.senderId===currentUid(),row=document.createElement('div');row.className='message-line '+(mine?'mine':'theirs');let media='';const src=m.mediaUrl||m.mediaData||'';if(src){if((m.mediaType||mimeFromDataUrl(src)).startsWith('image/'))media=`<img class="chat-media" src="${src}">`;else if((m.mediaType||mimeFromDataUrl(src)).startsWith('video/'))media=`<video class="chat-media" src="${src}" controls playsinline data-chat-video></video>`;media+=`<a class="chat-download" href="${src}" download="${escapeHtml(m.mediaName||'attachment')}">⬇</a>`}else if(m.mediaLocalOnly)media='<div class="chat-media-unavailable">📎 ʟᴀʀɢᴇ ᴍᴇᴅɪᴀ • ᴏʀɪɢɪɴᴀʟ ᴅᴇᴠɪᴄᴇ ᴏɴʟʏ</div>';row.innerHTML=`<div class="message-bubble">${media}${m.text?`<p>${escapeHtml(m.text)}</p>`:''}<small>${fmtMsgTime(m.created)}</small>${mine?'<button class="delete-message" type="button">🗑</button>':''}</div>`;row.querySelector('.delete-message')?.addEventListener('click',async()=>{if(m.mediaPath)await deleteStoragePath(m.mediaPath);await d.ref.delete();await refreshChatPreview(id);renderChat()});host.appendChild(row)}host.scrollTop=host.scrollHeight;await db().collection('chats').doc(id).set({lastRead:{...(chat.data()?.lastRead||{}),[currentUid()]:now()}},{merge:true});updateMessageBadge()
  };
  async function refreshChatPreview(id){const ref=db().collection('chats').doc(id),s=await ref.collection('messages').orderBy('created','desc').limit(1).get();if(s.empty)await ref.set({lastMessage:'',lastMessageAt:0,lastMessageSenderId:'',updated:now()},{merge:true});else{const m=docData(s.docs[0]);await ref.set({lastMessage:m.text||(m.mediaUrl||m.mediaData||m.mediaLocalOnly?'📎 ᴍᴇᴅɪᴀ':'ᴍᴇꜱꜱᴀɢᴇ'),lastMessageAt:m.created,lastMessageSenderId:m.senderId,updated:now()},{merge:true})}}
  sendMessage=async function(blob=null){
    if(!currentUid()||!activeChatUser)return;const text=$('chatText').value.trim();if(!text&&!blob)return;const chatRef=await ensureChat(activeChatUser),media=blob?await smallMediaPayload(blob,'message'):{mediaData:'',mediaLocalOnly:false,mediaType:'',mediaName:'',mediaSize:0},ref=chatRef.collection('messages').doc(),m={id:ref.id,senderId:currentUid(),senderUsername:currentLocalUser.username,recipientId:activeChatUser.uid,recipientUsername:activeChatUser.username,text,created:now(),...media};await ref.set(m);await chatRef.set({lastMessage:text||(blob?'📎 ᴍᴇᴅɪᴀ':'ᴍᴇꜱꜱᴀɢᴇ'),lastMessageAt:m.created,lastMessageSenderId:currentUid(),updated:now(),members:[currentUid(),activeChatUser.uid],memberUsernames:[currentLocalUser.username,activeChatUser.username]},{merge:true});$('chatText').value='';await renderChat();await renderRecentChats()
  };
  const clearChat=replaceNode('clearChatBtn');if(clearChat)clearChat.onclick=async()=>{if(!activeChatUser||!confirm('Clear this chat for you?'))return;const id=chatIdFor(currentUid(),activeChatUser.uid),ref=db().collection('chats').doc(id),s=await ref.get(),cleared={...(s.data()?.clearedAt||{}),[currentUid()]:now()};await ref.set({clearedAt:cleared},{merge:true});renderChat()};
  $('chatBackBtn').onclick=async()=>{stopSnapshot('chatUnsub');activeChatUser=null;$('chatView').hidden=true;$('messagesListView').hidden=false;await renderRecentChats();updateMessageBadge()};

  const oldOpenMessages=openMessages;openMessages=async function(){await oldOpenMessages();listenRecentChats()};
  function listenRecentChats(){stopSnapshot('chatsUnsub');if(!currentUid())return;fbState.chatsUnsub=db().collection('chats').where('members','array-contains',currentUid()).onSnapshot(()=>{if($('messagesDialog')?.open&&!$ ('messagesListView')?.hidden)renderRecentChats();updateMessageBadge()},ex=>console.warn('chats listener',ex))}

  // ---------- Groups ----------
  groupCanManage=function(g){return !!currentUid()&&(isAdminUid()||g.creatorId===currentUid()||safeArray(g.admins).includes(currentUid()))};
  async function groupRows(){if(!currentUid())return [];const q=isAdminUid()?db().collection('groups').get():db().collection('groups').where('members','array-contains',currentUid()).get(),s=await q;return s.docs.map(docData).sort((a,b)=>b.created-a.created)}
  renderGroupsList=async function(){
    const host=$('groupsList');if(!host||!currentUid())return;host.innerHTML='';const groups=await groupRows();for(const g of groups){const row=document.createElement('button');row.className='chat-row social-row';row.innerHTML=`<img src="${dpUrl(g)}"><span><b>${escapeHtml(g.name)}</b><small>${safeArray(g.members).length} ᴍᴇᴍʙᴇʀꜱ • @${escapeHtml(g.creatorUsername||'')}</small></span><em>›</em>`;row.onclick=()=>openGroupChat(g);host.appendChild(row)}if(!host.children.length)host.innerHTML='<div class="empty-state">👥 ɴᴏ ɢʀᴏᴜᴘꜱ ʏᴇᴛ</div>'
  };
  const groupForm=replaceNode('createGroupForm');if(groupForm)groupForm.onsubmit=async e=>{
    e.preventDefault();if(!currentUid())return;try{const users=await onlineUsers(),byName=new Map(users.map(u=>[u.username,u])),names=parseMemberNames($('groupMembersInput').value),members=[],memberUsernames=[];for(const n of names){const u=byName.get(n);if(u&&!members.includes(u.uid)){members.push(u.uid);memberUsernames.push(u.username)}}if(!members.includes(currentUid())){members.unshift(currentUid());memberUsernames.unshift(currentLocalUser.username)}const dpFile=$('groupDpInput').files[0]||null,ref=db().collection('groups').doc(),gdp=dpFile?await imageUploadPayload(dpFile,'group dp',420,.78):{dpUrl:'',dpPath:''},g={id:ref.id,name:$('groupNameInput').value.trim()||'ɢʀᴏᴜᴘ',dpData:'',dpUrl:gdp.dpUrl,dpPath:gdp.dpPath,creatorId:currentUid(),creatorUsername:currentLocalUser.username,admins:[currentUid()],adminUsernames:[currentLocalUser.username],members,memberUsernames,created:now(),updated:now()};await ref.set(g);e.target.reset();$('createGroupDialog').close();switchMessageTab('groups');renderGroupsList()}catch(ex){console.error(ex);alert('❌ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴄʀᴇᴀᴛᴇ ɢʀᴏᴜᴘ')}
  };
  openGroupChat=async function(g){const s=await db().collection('groups').doc(g.id).get();activeGroup=s.exists?docData(s):g;$('messagesListView').hidden=true;$('chatView').hidden=true;$('channelView').hidden=true;$('groupChatView').hidden=false;$('groupChatDp').src=dpUrl(activeGroup);$('groupChatName').textContent=activeGroup.name;$('groupChatMeta').textContent=`${safeArray(activeGroup.members).length} ᴍᴇᴍʙᴇʀꜱ`;$('groupText').value='';listenGroup(activeGroup.id);await renderGroupMessages()};
  function listenGroup(groupId){stopSnapshot('groupUnsub');fbState.groupUnsub=db().collection('groups').doc(groupId).collection('messages').orderBy('created').onSnapshot(()=>{if(activeGroup?.id===groupId)renderGroupMessages()},ex=>console.warn('group listener',ex))}
  renderGroupMessages=async function(){
    const host=$('groupMessages');if(!host||!activeGroup)return;host.innerHTML='';const users=await onlineUsers(),byUid=new Map(users.map(u=>[u.uid,u])),s=await db().collection('groups').doc(activeGroup.id).collection('messages').orderBy('created').get();for(const d of s.docs){const m=docData(d),u=byUid.get(m.senderId)||{username:m.senderUsername||'user'},mine=m.senderId===currentUid(),row=document.createElement('div');row.className='message-line '+(mine?'mine':'theirs');let media='';if(m.mediaUrl||m.mediaData){const src=m.mediaUrl||m.mediaData,t=m.mediaType||mimeFromDataUrl(src);if(t.startsWith('image/'))media=`<img class="chat-media" src="${src}">`;else if(t.startsWith('video/'))media=`<video class="chat-media" src="${src}" controls playsinline></video>`;media+=`<a class="chat-download" href="${src}" download="${escapeHtml(m.mediaName||'attachment')}">⬇</a>`}else if(m.mediaLocalOnly)media='<div class="chat-media-unavailable">📎 ʟᴀʀɢᴇ ᴍᴇᴅɪᴀ • ᴏʀɪɢɪɴᴀʟ ᴅᴇᴠɪᴄᴇ</div>';const canDelete=mine||groupCanManage(activeGroup);row.innerHTML=`<div class="message-bubble">${!mine?`<b class="bubble-user">@${escapeHtml(u.username)}${u.uid===ADMIN_UID?' 🛡️':''}</b>`:''}${media}${m.text?`<p>${escapeHtml(m.text)}</p>`:''}<small>${fmtMsgTime(m.created)}</small>${canDelete?'<button class="delete-message" type="button">🗑</button>':''}</div>`;row.querySelector('.delete-message')?.addEventListener('click',async()=>{if(m.mediaPath)await deleteStoragePath(m.mediaPath);await d.ref.delete();renderGroupMessages()});host.appendChild(row)}host.scrollTop=host.scrollHeight
  };
  sendGroupMessage=async function(blob=null){if(!currentUid()||!activeGroup)return;const text=$('groupText').value.trim();if(!text&&!blob)return;const media=blob?await smallMediaPayload(blob,'group message'):{mediaData:'',mediaLocalOnly:false,mediaType:'',mediaName:'',mediaSize:0},ref=db().collection('groups').doc(activeGroup.id).collection('messages').doc();await ref.set({id:ref.id,senderId:currentUid(),senderUsername:currentLocalUser.username,text,created:now(),...media});$('groupText').value='';renderGroupMessages()};
  $('groupBackBtn').onclick=()=>{stopSnapshot('groupUnsub');activeGroup=null;$('groupChatView').hidden=true;$('messagesListView').hidden=false;switchMessageTab('groups')};
  const groupMore=replaceNode('groupMoreBtn');if(groupMore)groupMore.onclick=async()=>{
    if(!activeGroup||!currentUid())return;const ref=db().collection('groups').doc(activeGroup.id),manage=groupCanManage(activeGroup);if(manage&&confirm('Delete this group?\nCancel = keep group')){const s=await ref.collection('messages').get();for(const d of s.docs){const m=d.data();if(m.mediaPath)await deleteStoragePath(m.mediaPath);await d.ref.delete()}if(activeGroup.dpPath)await deleteStoragePath(activeGroup.dpPath);await ref.delete();stopSnapshot('groupUnsub');activeGroup=null;$('groupChatView').hidden=true;$('messagesListView').hidden=false;switchMessageTab('groups');return}
    if(activeGroup.creatorId===currentUid()){alert('👑 ɢʀᴏᴜᴘ ᴄʀᴇᴀᴛᴏʀ • ᴅᴇʟᴇᴛᴇ ɢʀᴏᴜᴘ ᴛᴏ ʟᴇᴀᴠᴇ');return}if(confirm('Leave this group?')){const members=safeArray(activeGroup.members).filter(x=>x!==currentUid()),names=safeArray(activeGroup.memberUsernames).filter(x=>x!==currentLocalUser.username),admins=safeArray(activeGroup.admins).filter(x=>x!==currentUid()),adminNames=safeArray(activeGroup.adminUsernames).filter(x=>x!==currentLocalUser.username);await ref.update({members,memberUsernames:names,admins,adminUsernames:adminNames,updated:now()});stopSnapshot('groupUnsub');activeGroup=null;$('groupChatView').hidden=true;$('messagesListView').hidden=false;switchMessageTab('groups')}
  };

  // ---------- Admin Channels ----------
  async function channelsOnline(){const s=await db().collection('channels').get();return s.docs.map(docData).sort((a,b)=>b.created-a.created)}
  async function channelFollowerState(channelId){const s=await db().collection('channels').doc(channelId).collection('followers').get();return {count:s.size,following:!!currentUid()&&s.docs.some(d=>d.id===currentUid())}}
  renderChannelsList=async function(){
    const host=$('channelsList');if(!host||!currentUid())return;host.innerHTML='';const channels=await channelsOnline();$('createChannelBtn').hidden=!isAdminUid();for(const c of channels){const fs=await channelFollowerState(c.id),row=document.createElement('button');row.className='chat-row social-row';row.innerHTML=`<img src="${dpUrl(c)}"><span><b>📢 ${escapeHtml(c.name)}</b><small>${escapeHtml(c.description||'')} • ${fs.count} ꜰᴏʟʟᴏᴡᴇʀꜱ</small></span><em>${fs.following?'✓':'›'}</em>`;row.onclick=()=>openChannel(c);host.appendChild(row)}if(!host.children.length)host.innerHTML='<div class="empty-state">📢 ɴᴏ ᴄʜᴀɴɴᴇʟꜱ ʏᴇᴛ</div>'
  };
  const channelForm=replaceNode('createChannelForm');if(channelForm)channelForm.onsubmit=async e=>{e.preventDefault();if(!isAdminUid())return adminOnly();try{const dpFile=$('channelDpInput').files[0]||null,ref=db().collection('channels').doc(),cdp=dpFile?await imageUploadPayload(dpFile,'channel dp',420,.78):{dpUrl:'',dpPath:''},c={id:ref.id,name:$('channelNameInput').value.trim()||'ᴄʜᴀɴɴᴇʟ',description:$('channelDescInput').value.trim(),dpData:'',dpUrl:cdp.dpUrl,dpPath:cdp.dpPath,createdBy:currentUid(),creatorUsername:currentLocalUser.username,created:now(),updated:now()};await ref.set(c);await ref.collection('followers').doc(currentUid()).set({uid:currentUid(),username:currentLocalUser.username,created:now()});e.target.reset();$('createChannelDialog').close();switchMessageTab('channels');renderChannelsList()}catch(ex){console.error(ex);alert('❌ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴄʀᴇᴀᴛᴇ ᴄʜᴀɴɴᴇʟ')}};
  openChannel=async function(c){const s=await db().collection('channels').doc(c.id).get();activeChannel=s.exists?docData(s):c;$('messagesListView').hidden=true;$('chatView').hidden=true;$('groupChatView').hidden=true;$('channelView').hidden=false;$('channelDp').src=dpUrl(activeChannel);$('channelName').textContent=activeChannel.name;await updateChannelHeader();listenChannel(activeChannel.id);await renderChannelPosts()};
  updateChannelHeader=async function(){if(!activeChannel||!currentUid())return;const fs=await channelFollowerState(activeChannel.id);$('channelMeta').textContent=`${fs.count} ꜰᴏʟʟᴏᴡᴇʀꜱ${activeChannel.description?' • '+activeChannel.description:''}`;$('channelFollowBtn').textContent=isAdminUid()?'⋮':(fs.following?'✓':'＋');$('channelCompose').hidden=!isAdminUid()};
  function listenChannel(id){stopSnapshot('channelUnsub');fbState.channelUnsub=db().collection('channels').doc(id).collection('posts').orderBy('created','desc').onSnapshot(()=>{if(activeChannel?.id===id)renderChannelPosts()},ex=>console.warn('channel listener',ex))}
  $('channelBackBtn').onclick=()=>{stopSnapshot('channelUnsub');activeChannel=null;$('channelView').hidden=true;$('messagesListView').hidden=false;switchMessageTab('channels')};
  const channelFollow=replaceNode('channelFollowBtn');if(channelFollow)channelFollow.onclick=async()=>{if(!activeChannel||!currentUid())return;const ref=db().collection('channels').doc(activeChannel.id);if(isAdminUid()){if(confirm('Admin: delete this channel?')){const p=await ref.collection('posts').get();for(const d of p.docs){const pd=d.data(),l=await d.ref.collection('likes').get();for(const x of l.docs)await x.ref.delete();if(pd.mediaPath)await deleteStoragePath(pd.mediaPath);await d.ref.delete()}if(activeChannel.dpPath)await deleteStoragePath(activeChannel.dpPath);const f=await ref.collection('followers').get();for(const d of f.docs)await d.ref.delete();await ref.delete();activeChannel=null;$('channelView').hidden=true;$('messagesListView').hidden=false;switchMessageTab('channels')}return}const fref=ref.collection('followers').doc(currentUid()),s=await fref.get();if(s.exists)await fref.delete();else await fref.set({uid:currentUid(),username:currentLocalUser.username,created:now()});updateChannelHeader();renderChannelsList()};
  renderChannelPosts=async function(){
    const host=$('channelPosts');if(!host||!activeChannel)return;host.innerHTML='';const s=await db().collection('channels').doc(activeChannel.id).collection('posts').orderBy('created','desc').get();for(const d of s.docs){const p=docData(d),likes=await d.ref.collection('likes').get(),liked=!!currentUid()&&likes.docs.some(x=>x.id===currentUid()),card=document.createElement('article');card.className='channel-post';let media='';if(p.mediaUrl||p.mediaData){const src=p.mediaUrl||p.mediaData,t=p.mediaType||mimeFromDataUrl(src);if(t.startsWith('image/'))media=`<img src="${src}">`;else if(t.startsWith('video/'))media=`<video src="${src}" controls playsinline></video>`;media+=`<a class="channel-download" href="${src}" download="${escapeHtml(p.mediaName||'channel-media')}">⬇</a>`}else if(p.mediaLocalOnly)media='<div class="chat-media-unavailable">📎 ʟᴀʀɢᴇ ᴍᴇᴅɪᴀ • ᴏʀɪɢɪɴᴀʟ ᴅᴇᴠɪᴄᴇ</div>';card.innerHTML=`<div class="channel-post-head"><img src="${dpUrl(activeChannel)}"><span><b>${escapeHtml(activeChannel.name)}</b><small>${fmtMsgTime(p.created)}</small></span>${isAdminUid()?'<button class="channel-delete">🗑</button>':''}</div>${media}${p.text?`<p>${escapeHtml(p.text)}</p>`:''}<button class="channel-like" type="button">${liked?'♥':'♡'} <small>${likes.size||''}</small></button>`;card.querySelector('.channel-like').onclick=async()=>{const lr=d.ref.collection('likes').doc(currentUid()),ls=await lr.get();if(ls.exists)await lr.delete();else await lr.set({uid:currentUid(),username:currentLocalUser.username,created:now()});renderChannelPosts()};card.querySelector('.channel-delete')?.addEventListener('click',async()=>{if(!confirm('Delete channel post?'))return;const l=await d.ref.collection('likes').get();for(const x of l.docs)await x.ref.delete();if(p.mediaPath)await deleteStoragePath(p.mediaPath);await d.ref.delete();renderChannelPosts()});host.appendChild(card)}if(!host.children.length)host.innerHTML='<div class="empty-state">📢 ɴᴏ ᴘᴏꜱᴛꜱ ʏᴇᴛ</div>'
  };
  sendChannelPost=async function(blob=null){if(!activeChannel||!isAdminUid())return adminOnly();const text=$('channelText').value.trim();if(!text&&!blob)return;const media=blob?await smallMediaPayload(blob,'channel post'):{mediaData:'',mediaLocalOnly:false,mediaType:'',mediaName:'',mediaSize:0},ref=db().collection('channels').doc(activeChannel.id).collection('posts').doc();await ref.set({id:ref.id,authorId:currentUid(),authorUsername:currentLocalUser.username,text,created:now(),...media});$('channelText').value='';renderChannelPosts()};

  // ---------- One-time migration of pre-backend local social metadata ----------
  async function migrateLocalSocialMetadata(){
    if(!currentUid()||!currentLocalUser)return;const key='og_fb_full_migrated_'+currentUid();if(localStorage.getItem(key)==='1')return;
    try{
      // Ensure current user profile/admin display and username mapping.
      await db().collection('users').doc(currentUid()).set({uid:currentUid(),username:currentLocalUser.username,name:currentLocalUser.name||currentLocalUser.username,bio:currentLocalUser.bio||'',dpData:currentLocalUser.dpData||'',dpUrl:currentLocalUser.dpUrl||'',dpPath:currentLocalUser.dpPath||'',userId:currentLocalUser.userId||('OG'+Date.now().toString(36).toUpperCase()),role:isAdminUid()?'admin':'user',updated:now()},{merge:true});await ensureUsernameMap(currentLocalUser);
      // Reels/posts created before Firebase: publish metadata. Small files are embedded when possible.
      if(localStoreHas('reels'))for(const r of await getAll('reels'))if(r.username===currentLocalUser.username){const ref=db().collection('reels').doc(r.id),s=await ref.get();if(!s.exists){const media=r.videoBlob instanceof Blob?await smallMediaPayload(r.videoBlob,'reel'):{mediaData:r.mediaData||'',mediaLocalOnly:!r.mediaData,mediaType:r.mediaType||'',mediaName:r.mediaName||'',mediaSize:r.mediaSize||0};await ref.set({id:r.id,ownerId:currentUid(),ownerUsername:currentLocalUser.username,username:currentLocalUser.username,caption:r.caption||'',created:r.created||now(),...media})}}
      if(localStoreHas('posts'))for(const p of await getAll('posts'))if(p.username===currentLocalUser.username){const ref=db().collection('posts').doc(p.id),s=await ref.get();if(!s.exists){const media=p.mediaBlob instanceof Blob?await smallMediaPayload(p.mediaBlob,'post'):{mediaData:p.mediaData||'',mediaLocalOnly:!p.mediaData,mediaType:p.mediaType||'',mediaName:p.mediaName||'',mediaSize:p.mediaSize||0};await ref.set({id:p.id,ownerId:currentUid(),ownerUsername:currentLocalUser.username,username:currentLocalUser.username,caption:p.caption||'',created:p.created||now(),...media})}}
      // Local follows created in earlier builds.
      if(localStoreHas('follows'))for(const f of await getAll('follows'))if(f.follower===currentLocalUser.username){const t=await onlineUserByUsername(f.following);if(t)await db().collection('follows').doc(`${currentUid()}_${t.uid}`).set({followerId:currentUid(),targetId:t.uid,followerUsername:currentLocalUser.username,targetUsername:t.username,created:f.created||now()},{merge:true})}
      localStorage.setItem(key,'1');
    }catch(ex){console.warn('local migration incomplete',ex)}
  }

  async function migrateLocalMediaToSupabase(){
    if(!currentUid()||!currentLocalUser||!storageReady())return;
    const key='og_supabase_media_migrated_v84_'+currentUid();if(localStorage.getItem(key)==='1')return;
    try{
      const [reelSnap,postSnap]=await Promise.all([db().collection('reels').where('ownerId','==',currentUid()).get(),db().collection('posts').where('ownerId','==',currentUid()).get()]);
      const rlocal=localStoreHas('reels')?new Map((await getAll('reels')).map(x=>[x.id,x])):new Map(),plocal=localStoreHas('posts')?new Map((await getAll('posts')).map(x=>[x.id,x])):new Map();
      for(const d of reelSnap.docs){const x=d.data(),l=rlocal.get(d.id);if(!x.mediaUrl&&l?.videoBlob instanceof Blob){const m=await uploadStorageMedia(l.videoBlob,'reel');await d.ref.set({...m,mediaData:'',mediaLocalOnly:false},{merge:true})}}
      for(const d of postSnap.docs){const x=d.data(),l=plocal.get(d.id);if(!x.mediaUrl&&l?.mediaBlob instanceof Blob){const m=await uploadStorageMedia(l.mediaBlob,'post');await d.ref.set({...m,mediaData:'',mediaLocalOnly:false},{merge:true})}}
      localStorage.setItem(key,'1');
    }catch(ex){console.warn('Supabase migration incomplete',ex)}
  }

  // ---------- UI/backend polish ----------
  const msgSub=document.querySelector('#messagesListView .messages-topbar small');if(msgSub)msgSub.textContent='ᴏɴʟɪɴᴇ • ꜰɪʀᴇʙᴀꜱᴇ + ꜱᴜᴘᴀʙᴀꜱᴇ';
  const toolsHeading=$('toolsDialog')?.querySelector('h3');if(toolsHeading)toolsHeading.textContent='ʙᴀᴄᴋᴜᴘ • ʀᴇꜱᴛᴏʀᴇ • ᴏɴʟɪɴᴇ';
  document.documentElement.dataset.backend='firebase-supabase';

  // Keep online listeners tidy when dialogs close / user leaves.
  $('messagesDialog')?.addEventListener('close',()=>{stopSnapshot('chatUnsub');stopSnapshot('groupUnsub');stopSnapshot('channelUnsub');stopSnapshot('chatsUnsub')});
  window.addEventListener('online',()=>{if(currentLocalUser){invalidateUsers();startOnlineSession(currentLocalUser);updateMessageBadge();updateActivityBadge()}});
  window.addEventListener('offline',()=>console.warn('School Memories: offline; online media upload requires connection'));

  // Fix openChat initial read marker (merge map rather than dotted literal field).
  const onlineOpenChat=openChat;openChat=async function(u){
    activeChatUser=u;$('messagesListView').hidden=true;$('chatView').hidden=false;$('chatUserDp').src=dpUrl(u);$('chatUsername').textContent='@'+u.username;$('chatUserId').textContent=(u.name||'')+' • '+(u.userId||'');$('chatText').value='';const ref=await ensureChat(u),s=await ref.get(),lastRead={...(s.data()?.lastRead||{}),[currentUid()]:now()};await ref.set({lastRead},{merge:true});listenChat(ref.id);await renderChat();updateMessageBadge()
  };

  // Make sure current authenticated session activates the backend even if app.js restored first.
  setTimeout(async()=>{try{if(auth().currentUser){const p=await firebaseProfileByUid(auth().currentUser.uid);if(p){p.uid=auth().currentUser.uid;if(currentLocalUser?.uid===p.uid)startOnlineSession(currentLocalUser);invalidateUsers();updateMessageBadge();updateActivityBadge()}}}catch(ex){console.warn('backend bootstrap',ex)}},700);

  console.info('School Memories V8.3 Firebase backend loaded');
})();
