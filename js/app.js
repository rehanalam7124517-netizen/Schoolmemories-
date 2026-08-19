const PEOPLE = [
{n:'ʀᴇʜᴀɴ',nick:'ᴄᴇᴏ 😎',title:'ᴛʜᴇ ᴄᴇᴏ 😎',nature:'ᴍᴏᴏᴅʏ 😎',special:'ʜᴇʟᴘꜰᴜʟ ❤️',memory:'ᴛʜᴇ ᴏɴᴇ ᴡʜᴏ ᴡᴀꜱ ᴀʟᴡᴀʏꜱ ᴛʜᴇʀᴇ ᴡʜᴇɴ ᴛʜᴇ ɢʀᴏᴜᴘ ɴᴇᴇᴅᴇᴅ ꜱᴏᴍᴇᴏɴᴇ. ꜰʀᴏᴍ ꜰᴜɴ ᴍᴏᴍᴇɴᴛꜱ ᴛᴏ ꜱᴇʀɪᴏᴜꜱ ᴏɴᴇꜱ, ᴇᴠᴇʀʏ ᴍᴇᴍᴏʀʏ ʜᴀꜱ ɪᴛꜱ ᴏᴡɴ ꜱᴛᴏʀʏ. ❤️'},
{n:'ᴀʙᴅᴜʟ',nick:'ᴜɴᴘʀᴇᴅɪᴄᴛᴀʙʟᴇ 😂',title:'ᴛʜᴇ ᴜɴᴘʀᴇᴅɪᴄᴛᴀʙʟᴇ 😂',nature:'ꜱɪᴛᴜᴀᴛɪᴏɴᴀʟ 😎',special:'ʙᴇꜱᴛ ᴘʟᴀʏᴇʀ 🏆',memory:'ᴛʜᴇ ᴏɴᴇ ᴡʜᴏꜱᴇ ɴᴇxᴛ ᴍᴏᴠᴇ ᴡᴀꜱ ᴀʟᴡᴀʏꜱ ɪᴍᴘᴏꜱꜱɪʙʟᴇ ᴛᴏ ɢᴜᴇꜱꜱ 😂. ꜰʀᴏᴍ ɢᴀᴍᴇꜱ ᴛᴏ ᴄʟᴀꜱꜱʀᴏᴏᴍ ᴍᴏᴍᴇɴᴛꜱ, ʜᴇ ᴀʟᴡᴀʏꜱ ᴍᴀᴅᴇ ᴛʜɪɴɢꜱ ᴍᴏʀᴇ ɪɴᴛᴇʀᴇꜱᴛɪɴɢ. 🏆'},
{n:'ʀᴀʙꜱᴀɴᴀ',nick:'ʀᴀʙꜱɪ 🤭',title:'ᴛʜᴇ ᴡɪʟᴅ ᴏɴᴇ 🤭',nature:'ᴍᴀꜱᴛɪᴋʜᴏʀ 😂',special:'ᴜɴᴘʀᴇᴅɪᴄᴛᴀʙʟᴇ 😆',memory:'ᴛʜᴇ ᴍᴀꜱᴛɪ ᴀɴᴅ ᴜɴᴘʀᴇᴅɪᴄᴛᴀʙʟᴇ ᴍᴏᴍᴇɴᴛꜱ ᴡɪᴛʜ ʀᴀʙꜱɪ ᴀʀᴇ ꜱᴏᴍᴇᴛʜɪɴɢ ᴛʜᴀᴛ ᴄᴀɴ ɴᴇᴠᴇʀ ʙᴇ ꜰᴏʀɢᴏᴛᴛᴇɴ. 🤭😂'},
{n:'ꜱᴀɴɪʏᴀ',nick:'ᴘʏᴀᴀʀɪ 😄',title:'ᴛʜᴇ ꜱᴡᴇᴇᴛ ᴏɴᴇ 🌸',nature:'ꜱᴡᴇᴇᴛ ❤️',special:'ᴄᴜᴛᴇ ᴠɪʙᴇ ✨',memory:'ᴀ ꜱᴡᴇᴇᴛ ᴘᴇʀꜱᴏɴ ᴡɪᴛʜ ᴀ ꜱɪᴍᴘʟᴇ ᴀɴᴅ ᴄᴜᴛᴇ ᴠɪʙᴇ. 🌸 ꜱᴏᴍᴇ ᴘᴇᴏᴘʟᴇ ʙᴇᴄᴏᴍᴇ ᴀ ᴘᴀʀᴛ ᴏꜰ ɢᴏᴏᴅ ᴍᴇᴍᴏʀɪᴇꜱ ᴡɪᴛʜᴏᴜᴛ ᴇᴠᴇɴ ᴛʀʏɪɴɢ. ❤️'},
{n:'ꜱᴏɴᴜ',nick:'ɢᴜʟᴀʙᴏ 🌹',title:'ᴛʜᴇ ɢᴜʟᴀʙᴏ 🌹',nature:'ꜱʜᴀʀᴛɪ 😄',special:'ᴍᴀꜱᴛɪ ❤️',memory:'ɢᴜʟᴀʙᴏ 🌹 ᴀɴᴅ ʜɪꜱ ᴍᴀꜱᴛɪ! 😂 ᴛʜᴏꜱᴇ ꜰᴜɴɴʏ ᴄʟᴀꜱꜱʀᴏᴏᴍ ᴍᴏᴍᴇɴᴛꜱ ᴡɪʟʟ ᴀʟᴡᴀʏꜱ ʙᴇ ᴀ ᴘᴀʀᴛ ᴏꜰ ᴏᴜʀ ꜱᴄʜᴏᴏʟ ᴍᴇᴍᴏʀɪᴇꜱ. ❤️'},
{n:'ᴀᴍʀᴇɴᴅʀᴀ',nick:'ʙʜᴀᴜᴋᴀʟɪ 🔥',title:'ᴛʜᴇ ʙʜᴀᴜᴋᴀʟɪ 🔥',nature:'ʙᴏʟᴅ 😎',special:'ᴛʜᴇ ᴀᴛᴛɪᴛᴜᴅᴇ 🔥',memory:'ᴛʜᴇ ʙʜᴀᴜᴋᴀʟɪ ᴠɪʙᴇ 🔥 ᴡᴀꜱ ᴀʟᴡᴀʏꜱ ᴅɪꜰꜰᴇʀᴇɴᴛ. ᴛʜᴇ ᴀᴛᴛɪᴛᴜᴅᴇ, ᴛʜᴇ ᴍᴏᴍᴇɴᴛꜱ ᴀɴᴅ ᴛʜᴇ ꜰᴜɴ — ᴇᴠᴇʀʏᴛʜɪɴɢ ʜᴀᴅ ɪᴛꜱ ᴏᴡɴ ꜱᴛʏʟᴇ. 😎'},
{n:'ᴀᴍʀɪᴛ',nick:'ᴛᴀɴᴅᴏᴏʀ 😂',title:'ᴛʜᴇ ᴛᴀɴᴅᴏᴏʀ 😂',nature:'ᴍᴀꜱᴛɪᴋʜᴏʀ 😂',special:'ᴛʜᴇ ᴠɪʙᴇ 😎',memory:'ᴛᴀɴᴅᴏᴏʀ 😂 — ᴏɴᴇ ɴᴀᴍᴇ ᴀɴᴅ ᴛᴏᴏ ᴍᴀɴʏ ꜰᴜɴɴʏ ᴍᴇᴍᴏʀɪᴇꜱ. ᴛʜᴇ ᴍᴀꜱᴛɪ ᴀɴᴅ ᴠɪʙᴇ ᴍᴀᴅᴇ ᴏʀᴅɪɴᴀʀʏ ᴅᴀʏꜱ ᴍᴏʀᴇ ᴍᴇᴍᴏʀᴀʙʟᴇ. 😎❤️'},
{n:'ᴀɴɪᴋᴇᴛ',nick:'ᴋᴀʟʟᴜ 😆',title:'ᴛʜᴇ ᴋᴀʟʟᴜ 😎',nature:'ᴇɴᴇʀɢᴇᴛɪᴄ 🔥',special:'ᴛʀᴏᴜʙʟᴇ ᴍᴀᴋᴇʀ 😂',memory:'ᴋᴀʟʟᴜ 😆 ᴡᴀꜱ ᴀʟᴡᴀʏꜱ ꜰᴜʟʟ ᴏꜰ ᴇɴᴇʀɢʏ. 🔥 ᴡʜᴇʀᴇ ᴛʜᴇʀᴇ ᴡᴀꜱ ᴍᴀꜱᴛɪ, ᴛʜᴇʀᴇ ᴡᴀꜱ ᴀ ɢᴏᴏᴅ ᴄʜᴀɴᴄᴇ ᴀɴɪᴋᴇᴛ ᴡᴀꜱ ꜱᴏᴍᴇᴡʜᴇʀᴇ ɴᴇᴀʀʙʏ. 😂'},
{n:'ᴋʀɪꜱʜɴᴀ',nick:'ᴍᴀʜᴀʀᴀᴊ 👑',title:'ᴛʜᴇ ᴍᴀʜᴀʀᴀᴊ 👑',nature:'ᴄᴏᴏʟ 😎',special:'ᴍᴀʜᴀʀᴀᴊ ᴠɪʙᴇ 👑',memory:'ᴍᴀʜᴀʀᴀᴊ 👑 — ᴛʜᴇ ɴᴀᴍᴇ ɪᴛꜱᴇʟꜰ ᴡᴀꜱ ᴇɴᴏᴜɢʜ. 😂 ᴛʜᴇ ᴄᴏᴏʟ ᴠɪʙᴇ ᴀɴᴅ ᴛʜᴏꜱᴇ ꜱᴄʜᴏᴏʟ ᴍᴏᴍᴇɴᴛꜱ ᴍᴀᴅᴇ ʜɪᴍ ᴀ ᴍᴇᴍᴏʀᴀʙʟᴇ ᴘᴀʀᴛ ᴏꜰ ᴛʜᴇ ɢʀᴏᴜᴘ. 👑'},
{n:'ʜᴇᴍᴀɴᴛ',nick:'ꜱᴜꜱᴛᴍᴀʟ 😴',title:'ᴛʜᴇ ꜱᴜꜱᴛᴍᴀʟ 😴',nature:'ʟᴀᴢʏ 😴',special:'ꜱʟᴇᴇᴘʏ ʜᴇᴀᴅ 😂',memory:'ꜱᴜꜱᴛᴍᴀʟ 😴😂 — ᴛʜᴇ ʟᴀɪᴅ-ʙᴀᴄᴋ ᴠɪʙᴇ ᴀɴᴅ ꜰᴜɴɴʏ ᴍᴏᴍᴇɴᴛꜱ ᴀʀᴇ ᴡʜᴀᴛ ᴍᴀᴅᴇ ʜᴇᴍᴀɴᴛ ᴅɪꜰꜰᴇʀᴇɴᴛ. ꜱᴏᴍᴇ ᴍᴇᴍᴏʀɪᴇꜱ ᴅᴏɴ’ᴛ ɴᴇᴇᴅ ᴍᴜᴄʜ ɴᴏɪꜱᴇ ᴛᴏ ʙᴇ ʀᴇᴍᴇᴍʙᴇʀᴇᴅ. 😄'},
{n:'ᴅᴇᴘᴀɴꜱʜᴜ',nick:'ɴᴀᴜᴛᴀɴᴋɪ 🎭',title:'ᴛʜᴇ ɴᴀᴜᴛᴀɴᴋɪ 🎭',nature:'ᴅʀᴀᴍᴀᴛɪᴄ 🎭',special:'ᴅʀᴀᴍᴀ ᴋɪɴɢ 😂',memory:'ɴᴀᴜᴛᴀɴᴋɪ 🎭😂 — ᴛʜᴇ ᴅʀᴀᴍᴀ ᴀɴᴅ ꜰᴜɴ ᴀʟᴡᴀʏꜱ ᴋᴇᴘᴛ ᴛʜᴇ ɢʀᴏᴜᴘ ᴇɴᴛᴇʀᴛᴀɪɴᴇᴅ. ᴛʜᴏꜱᴇ ᴍᴏᴍᴇɴᴛꜱ ᴀʀᴇ ɴᴏᴡ ᴘᴀʀᴛ ᴏꜰ ᴛʜᴇ ᴍᴇᴍᴏʀɪᴇꜱ ᴡᴇ’ʟʟ ʟᴏᴏᴋ ʙᴀᴄᴋ ᴏɴ. ❤️'}
];

const $ = (id)=>document.getElementById(id);
const pageEls=[...document.querySelectorAll('.page')];
let currentPage=0;
const dots=$('pageDots');
pageEls.forEach((_,i)=>{const d=document.createElement('span');d.onclick=()=>showPage(i);dots.appendChild(d)});
function showPage(i){
  currentPage=Math.max(0,Math.min(i,pageEls.length-1));
  pageEls.forEach((p,idx)=>p.classList.toggle('active',idx===currentPage));
  [...dots.children].forEach((d,idx)=>d.classList.toggle('active',idx===currentPage));
  const active=pageEls[currentPage]; if(active) active.scrollTop=0;
}
$('prevBtn').onclick=()=>showPage(currentPage-1);
$('nextBtn').onclick=()=>showPage(currentPage+1);
$('homeBtn').onclick=()=>showPage(0);
document.querySelectorAll('.jump-btn').forEach(b=>b.onclick=()=>showPage(+b.dataset.target));
showPage(0);

// Music is defined before unlock/openSite so remembered unlock can never break.
const bgMusic=$('bgMusic');
let musicOn=false;
async function tryPlayMusic(){
  try{if(bgMusic.readyState===0)bgMusic.load();await bgMusic.play();musicOn=true;$('musicBtn').textContent='⏸️'}
  catch{musicOn=false;$('musicBtn').textContent='🎵'}
}
$('musicBtn').onclick=async()=>{
  if(bgMusic.paused){await bgMusic.play().catch(()=>{});musicOn=!bgMusic.paused}
  else{bgMusic.pause();musicOn=false}
  $('musicBtn').textContent=musicOn?'⏸️':'🎵';
};
// Stop music when the page/app goes to background or closes; resume when visible again if unlocked.
function pauseMusicForExit(){try{bgMusic.pause()}catch{} musicOn=false; if($('musicBtn'))$('musicBtn').textContent='🎵';}
window.addEventListener('pagehide',pauseMusicForExit);
window.addEventListener('beforeunload',pauseMusicForExit);
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){pauseMusicForExit();return;}
  const unlocked=$('siteShell') && !$('siteShell').hidden && $('siteShell').style.display!=='none';
  if(unlocked)tryPlayMusic();
});

// Simple local PIN gate. This is privacy for a static site, not server-side authentication.
const SITE_PIN='2017';
function openSite(){
  $('lockScreen').hidden=true;
  $('lockScreen').style.display='none';
  $('siteShell').hidden=false;
  $('siteShell').style.display='grid';
  $('pinError').textContent='';
  showPage(0);
  tryPlayMusic();
}
function unlock(){
  const pin=$('pinInput').value.trim();
  if(pin!==SITE_PIN){
    $('pinError').textContent='❌ ᴡʀᴏɴɢ ᴘɪɴ';
    const card=document.querySelector('.lock-card');
    card.classList.remove('shake');void card.offsetWidth;card.classList.add('shake');return;
  }
  if($('rememberDevice').checked)localStorage.setItem('og_unlocked','1');
  openSite();
}
function lockSite(){
  localStorage.removeItem('og_unlocked');
  $('siteShell').hidden=true;$('siteShell').style.display='none';
  $('lockScreen').hidden=false;$('lockScreen').style.display='grid';
  $('pinInput').value='';$('pinError').textContent='';
  bgMusic.pause();musicOn=false;
}
$('unlockBtn').onclick=unlock;
$('pinInput').addEventListener('keydown',e=>{if(e.key==='Enter')unlock()});
$('pinInput').addEventListener('input',()=>{$('pinError').textContent=''});
$('togglePin').onclick=()=>{const i=$('pinInput');i.type=i.type==='password'?'text':'password'};
$('pinInput').type='password';
$('lockBtn').onclick=lockSite;
if(localStorage.getItem('og_unlocked')==='1') openSite();

// People profiles are persisted in IndexedDB. Built-in profiles remain editable on this device.
let activeProfiles=[];
function profileImageSrc(p){return p.imageBlob?URL.createObjectURL(p.imageBlob):(p.image||'assets/common.jpg')}
async function seedProfiles(){
  const saved=await getAll('profiles');
  for(let i=0;i<PEOPLE.length;i++){
    const id='builtin-profile-'+i;
    if(!localStorage.getItem('deleted_'+id) && !saved.some(x=>x.id===id)) await put('profiles',{...PEOPLE[i],id,builtin:true,order:i,image:'assets/common.jpg'});
  }
}
async function renderPeople(){
  if(!DB)return;
  activeProfiles=(await getAll('profiles')).sort((a,b)=>(a.order??9999)-(b.order??9999));
  const peopleGrid=$('peopleGrid');peopleGrid.innerHTML='';
  $('peopleCounter').textContent=`${activeProfiles.length} ᴘʀᴏꜰɪʟᴇꜱ`;
  activeProfiles.forEach((p,i)=>{
    const c=document.createElement('div');c.className='person-card glass';
    c.innerHTML=`<div class="person-img-wrap"><img src="${profileImageSrc(p)}" alt="${p.n}"></div><div class="person-body"><h3>👤 ${p.n}</h3><p>ɴɪᴄᴋɴᴀᴍᴇ — ${p.nick}</p><p>ᴛɪᴛʟᴇ — ${p.title}</p><span class="badge">ᴠɪᴇᴡ ᴍᴇᴍᴏʀʏ</span></div>`;
    c.onclick=()=>openProfile(i);peopleGrid.appendChild(c);
  });
}
function openProfile(i){
  const p=activeProfiles[i];if(!p)return;
  $('profileDialogBody').innerHTML=`<div class="profile-top"><div class="profile-img-wrap"><img src="${profileImageSrc(p)}" alt="${p.n}"></div><div class="profile-info"><div class="eyebrow">👤 ${p.n}</div><h3>${p.title}</h3><div class="profile-details"><p>ɴɪᴄᴋɴᴀᴍᴇ — ${p.nick}</p><p>ɴᴀᴛᴜʀᴇ — ${p.nature}</p><p>ᴋʜᴀᴀꜱ ʙᴀᴀᴛ — ${p.special}</p></div><button class="mini-btn" id="changeProfileImageBtn">🖼️ ᴄʜᴀɴɢᴇ ᴘʀᴏꜰɪʟᴇ ɪᴍᴀɢᴇ</button> <button class="mini-btn danger" id="deleteProfileBtn">🗑️ ᴅᴇʟᴇᴛᴇ ᴘʀᴏꜰɪʟᴇ</button></div></div><div class="memory-box">💭 <b>ᴍᴇᴍᴏʀʏ</b><br><br>${p.memory}</div>`;
  $('profileDialog').showModal();
  $('changeProfileImageBtn').onclick=async()=>{
    const [file]=await filePicker('image/*',false);if(!file)return;
    p.imageBlob=file;await put('profiles',p);$('profileDialog').close();await renderPeople();openProfile(activeProfiles.findIndex(x=>x.id===p.id));
  };
  const delBtn=$('deleteProfileBtn');if(delBtn)delBtn.onclick=async()=>{if(!confirm('Delete this profile?'))return;await del('profiles',p.id);if(p.builtin)localStorage.setItem('deleted_'+p.id,'1');$('profileDialog').close();renderPeople()};
}
$('addProfileBtn').onclick=()=>$('newProfileDialog').showModal();
$('newProfileForm').onsubmit=async e=>{
  e.preventDefault();
  const file=$('profileImageInput').files[0]||null;
  const all=await getAll('profiles');
  const p={id:'profile-'+Date.now()+'-'+Math.random().toString(36).slice(2),builtin:false,order:1000+all.length,n:$('profileName').value.trim(),nick:$('profileNick').value.trim(),title:$('profileTitle').value.trim(),nature:$('profileNature').value.trim(),special:$('profileSpecial').value.trim(),memory:$('profileMemory').value.trim(),image:'assets/common.jpg'};
  if(file)p.imageBlob=file;
  await put('profiles',p);e.target.reset();$('newProfileDialog').close();renderPeople();
};
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>b.closest('dialog').close());

// Built-in media: manifest works everywhere. On Python/Termux localhost we also auto-read
// directory listings so copied files show even before refresh_media.sh is run.
window.BUILTIN_MEDIA=window.BUILTIN_MEDIA||{photos:[],videos:[]};
const PHOTO_EXT=/\.(jpe?g|png|webp|gif|avif)$/i;
const VIDEO_EXT=/\.(mp4|webm|mov|m4v|ogg)$/i;
async function discoverDirectory(path,re){
  try{
    const r=await fetch(path,{cache:'no-store'});if(!r.ok)return [];
    const html=await r.text();
    const doc=new DOMParser().parseFromString(html,'text/html');
    return [...doc.querySelectorAll('a[href]')]
      .map(a=>a.getAttribute('href')).filter(h=>h && !h.startsWith('?') && !h.startsWith('/') && re.test(decodeURIComponent(h)))
      .map(h=>path+encodeURI(decodeURIComponent(h)));
  }catch{return []}
}
async function hydrateBuiltins(){
  if(!window.BUILTIN_MEDIA.photos?.length){const found=await discoverDirectory('media/photos/',PHOTO_EXT);if(found.length)window.BUILTIN_MEDIA.photos=found}
  if(!window.BUILTIN_MEDIA.videos?.length){const found=await discoverDirectory('media/videos/',VIDEO_EXT);if(found.length)window.BUILTIN_MEDIA.videos=found}
}

// IndexedDB for folders/media created from the browser.
let DB;
const req=indexedDB.open('ogLegendsMemories',5);
req.onupgradeneeded=e=>{
  const db=e.target.result;
  if(!db.objectStoreNames.contains('folders'))db.createObjectStore('folders',{keyPath:'id'});
  if(!db.objectStoreNames.contains('media')){const s=db.createObjectStore('media',{keyPath:'id'});s.createIndex('folderId','folderId',{unique:false})}
  if(!db.objectStoreNames.contains('profiles'))db.createObjectStore('profiles',{keyPath:'id'});
  if(!db.objectStoreNames.contains('journeys'))db.createObjectStore('journeys',{keyPath:'id'});
  if(!db.objectStoreNames.contains('hiddenMedia'))db.createObjectStore('hiddenMedia',{keyPath:'id'});
};
req.onsuccess=async e=>{DB=e.target.result;await hydrateBuiltins();await seedBuiltins();await seedProfiles();await seedJourneys();await renderPeople();await renderFolders();await renderJourney()};
function store(name,mode='readonly'){return DB.transaction(name,mode).objectStore(name)}
function getAll(name){return new Promise((res,rej)=>{const r=store(name).getAll();r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
function put(name,val){return new Promise((res,rej)=>{const r=store(name,'readwrite').put(val);r.onsuccess=()=>res();r.onerror=()=>rej(r.error)})}
function del(name,id){return new Promise((res,rej)=>{const r=store(name,'readwrite').delete(id);r.onsuccess=()=>res();r.onerror=()=>rej(r.error)})}
async function mediaForFolder(id){return new Promise((res,rej)=>{const idx=store('media').index('folderId');const r=idx.getAll(id);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
async function seedBuiltins(){
  const folders=await getAll('folders');
  if(!localStorage.getItem('deleted_builtin-photos') && !folders.some(f=>f.id==='builtin-photos'))await put('folders',{id:'builtin-photos',name:'ᴀʟʟ ᴘʜᴏᴛᴏꜱ',type:'photo',note:'ᴍᴇᴅɪᴀ / ᴘʜᴏᴛᴏꜱ',builtin:true,cover:'assets/common.jpg'});
  if(!localStorage.getItem('deleted_builtin-videos') && !folders.some(f=>f.id==='builtin-videos'))await put('folders',{id:'builtin-videos',name:'ᴀʟʟ ᴠɪᴅᴇᴏꜱ',type:'video',note:'ᴍᴇᴅɪᴀ / ᴠɪᴅᴇᴏꜱ',builtin:true,cover:'assets/common.jpg'});
}
async function renderFolders(){
  if(!DB)return;const folders=await getAll('folders');
  for(const type of ['photo','video']){
    const host=$(type==='photo'?'photoFolders':'videoFolders');host.innerHTML='';
    for(const f of folders.filter(x=>x.type===type)){
      const count=f.builtin?((window.BUILTIN_MEDIA[type==='photo'?'photos':'videos']||[]).length+(await mediaForFolder(f.id)).length):(await mediaForFolder(f.id)).length;
      const cover=f.coverBlob?URL.createObjectURL(f.coverBlob):(f.cover||'assets/common.jpg');
      const c=document.createElement('div');c.className='folder-card glass';
      c.innerHTML=`<div class="folder-cover-wrap"><img class="folder-cover" src="${cover}" alt="${f.name}"><span class="folder-count">${count} ${type==='photo'?'📸':'🎬'}</span></div><div class="folder-body"><h3>${f.name}</h3><p>${f.note||'ᴏᴜʀ ᴍᴇᴍᴏʀɪᴇꜱ'}</p><div class="folder-actions"><button class="mini-btn open-folder">ᴏᴘᴇɴ</button>${f.builtin?'':'<button class="mini-btn change-cover">ᴄʜᴀɴɢᴇ ᴅᴘ</button>'}<button class="mini-btn danger delete-folder-card">🗑️ ᴅᴇʟᴇᴛᴇ</button></div></div>`;
      c.querySelector('.open-folder').onclick=e=>{e.stopPropagation();openFolder(f.id)};
      if(!f.builtin)c.querySelector('.change-cover').onclick=e=>{e.stopPropagation();chooseCover(f.id)};
      c.querySelector('.delete-folder-card').onclick=async e=>{e.stopPropagation();await deleteFolder(f)};
      c.onclick=()=>openFolder(f.id);host.appendChild(c);
    }
  }
}

async function deleteFolder(f){
  const msg=f.builtin?'Hide this built-in folder from this browser? Original files in media/ will NOT be deleted.':'Delete this folder and all media added to it on this browser?';
  if(!confirm(msg))return;
  for(const m of await mediaForFolder(f.id))await del('media',m.id);
  await del('folders',f.id);
  if(f.builtin)localStorage.setItem('deleted_'+f.id,'1');
  const d=$('folderDialog');if(d?.open)d.close();
  renderFolders();
}

let newFolderType='photo';
document.querySelectorAll('[data-new-folder]').forEach(b=>b.onclick=()=>{
  newFolderType=b.dataset.newFolder;
  $('newFolderTitle').textContent=newFolderType==='photo'?'📸 ᴄʀᴇᴀᴛᴇ ᴘʜᴏᴛᴏ ꜰᴏʟᴅᴇʀ':'🎬 ᴄʀᴇᴀᴛᴇ ᴠɪᴅᴇᴏ ꜰᴏʟᴅᴇʀ';
  $('newFolderDialog').showModal();
});
$('newFolderForm').onsubmit=async e=>{
  e.preventDefault();const name=$('folderName').value.trim();const note=$('folderNote').value.trim();
  await put('folders',{id:'f-'+Date.now()+'-'+Math.random().toString(36).slice(2),name,type:newFolderType,note,builtin:false,cover:'assets/common.jpg'});
  e.target.reset();$('newFolderDialog').close();renderFolders();
};

let currentViewerItems=[],currentViewerIndex=0,currentViewerType='photo',viewerScale=1;
function openViewer(items,index,type){
  currentViewerItems=items;currentViewerIndex=index;currentViewerType=type;viewerScale=1;
  renderViewer();$('mediaViewerDialog').showModal();
}
function getViewerSrc(item){return item.builtin?item.src:URL.createObjectURL(item.blob)}
function renderViewer(){
  const item=currentViewerItems[currentViewerIndex];if(!item)return;
  $('viewerCount').textContent=`${currentViewerIndex+1} / ${currentViewerItems.length}`;
  const stage=$('viewerStage');stage.innerHTML='';viewerScale=1;
  const src=getViewerSrc(item);
  if(currentViewerType==='photo'){
    const img=document.createElement('img');img.src=src;img.alt=item.name||'photo';img.className='viewer-photo';img.id='viewerActiveMedia';stage.appendChild(img);
  }else{
    const v=document.createElement('video');v.src=src;v.controls=true;v.playsInline=true;v.autoplay=true;v.className='viewer-video';v.id='viewerActiveMedia';stage.appendChild(v);
  }
  $('viewerPrev').disabled=currentViewerItems.length<2;$('viewerNext').disabled=currentViewerItems.length<2;
  $('viewerZoomOut').disabled=currentViewerType!=='photo';$('viewerZoomIn').disabled=currentViewerType!=='photo';$('viewerReset').disabled=currentViewerType!=='photo';
}
function applyViewerScale(){const el=$('viewerActiveMedia');if(el&&currentViewerType==='photo'){el.style.transform=`scale(${viewerScale})`;el.style.transformOrigin='center center';el.style.transition='transform .15s ease'}}
$('viewerPrev').onclick=()=>{currentViewerIndex=(currentViewerIndex-1+currentViewerItems.length)%currentViewerItems.length;renderViewer()};
$('viewerNext').onclick=()=>{currentViewerIndex=(currentViewerIndex+1)%currentViewerItems.length;renderViewer()};
$('viewerZoomIn').onclick=()=>{viewerScale=Math.min(4,viewerScale+.25);applyViewerScale()};
$('viewerZoomOut').onclick=()=>{viewerScale=Math.max(.5,viewerScale-.25);applyViewerScale()};
$('viewerReset').onclick=()=>{viewerScale=1;applyViewerScale()};
$('viewerDownload').onclick=()=>{
  const item=currentViewerItems[currentViewerIndex];if(!item)return;
  const src=getViewerSrc(item);const a=document.createElement('a');a.href=src;a.download=item.name||(`og-memory-${currentViewerIndex+1}.${currentViewerType==='photo'?'jpg':'mp4'}`);document.body.appendChild(a);a.click();a.remove();
  if(!item.builtin)setTimeout(()=>URL.revokeObjectURL(src),1500);
};
$('mediaViewerDialog').addEventListener('close',()=>{$('viewerStage').querySelector('video')?.pause();$('viewerStage').innerHTML='';viewerScale=1});

async function openFolder(id){
  const folders=await getAll('folders');const f=folders.find(x=>x.id===id);if(!f)return;
  const dialog=$('folderDialog'),body=$('folderDialogBody');let items=[];
  if(f.builtin){
    const list=window.BUILTIN_MEDIA[f.type==='photo'?'photos':'videos']||[];
    const hidden=await getAll('hiddenMedia');const hiddenIds=new Set(hidden.map(x=>x.id));
    const built=list.map((src,i)=>({id:f.id+'-b'+i,src,builtin:true,type:f.type,name:decodeURIComponent(src.split('/').pop())})).filter(x=>!hiddenIds.has(x.id));
    const local=await mediaForFolder(id);items=[...built,...local];
  }else items=await mediaForFolder(id);
  const cover=f.coverBlob?URL.createObjectURL(f.coverBlob):(f.cover||'assets/common.jpg');
  body.innerHTML=`<div class="folder-view-head"><img src="${cover}"><div><div class="eyebrow">${f.type==='photo'?'📸':'🎬'} ${f.name}</div><h3>${items.length} ɪᴛᴇᴍꜱ</h3></div></div><div class="folder-view-actions"><button class="mini-btn" id="addMediaBtn">＋ ᴀᴅᴅ ${f.type==='photo'?'ᴘʜᴏᴛᴏꜱ':'ᴠɪᴅᴇᴏꜱ'}</button>${f.builtin?'<span class="badge">ʙʀᴏᴡꜱᴇʀ ᴀᴅᴅ • ʟᴏᴄᴀʟʟʏ ꜱᴀᴠᴇᴅ</span>':'<button class="mini-btn" id="changeCoverInside">🖼️ ᴄʜᴀɴɢᴇ ᴅᴘ</button>'}<button class="mini-btn danger" id="deleteFolderBtn">🗑️ ᴅᴇʟᴇᴛᴇ ꜰᴏʟᴅᴇʀ</button></div><div id="folderMediaGrid" class="media-grid"></div>`;
  const grid=body.querySelector('#folderMediaGrid');
  if(items.length===0)grid.innerHTML='<div class="empty-state">ɴᴏ ᴍᴇᴅɪᴀ ʏᴇᴛ.<br><small>ᴄᴏᴘʏ ꜰɪʟᴇꜱ ᴛᴏ ᴍᴇᴅɪᴀ ꜰᴏʟᴅᴇʀ + ʀᴜɴ refresh_media.sh</small></div>';
  else items.forEach((item,index)=>{
    const tile=document.createElement('div');tile.className='media-tile';const src=item.builtin?item.src:URL.createObjectURL(item.blob);
    if(f.type==='photo')tile.innerHTML=`<img src="${src}" alt="${item.name||'photo'}" loading="lazy"><button class="remove-media">🗑</button>`;
    else tile.innerHTML=`<video src="${src}" muted playsinline preload="metadata"></video><span class="play-badge">▶</span><button class="remove-media">🗑</button>`;
    tile.querySelector(f.type==='photo'?'img':'video').onclick=()=>openViewer(items,index,f.type);
    tile.querySelector('.remove-media').onclick=async e=>{e.stopPropagation();if(!confirm('Delete this '+f.type+' from this gallery?'))return;if(item.builtin)await put('hiddenMedia',{id:item.id});else await del('media',item.id);dialog.close();openFolder(id);renderFolders()};
    grid.appendChild(tile);
  });
  body.querySelector('#addMediaBtn').onclick=()=>addMedia(id,f.type);
  if(!f.builtin)body.querySelector('#changeCoverInside').onclick=()=>chooseCover(id,()=>{dialog.close();openFolder(id)});
  body.querySelector('#deleteFolderBtn').onclick=()=>deleteFolder(f);
  dialog.showModal();
}
function filePicker(accept,multiple=false){return new Promise(res=>{const i=document.createElement('input');i.type='file';i.accept=accept;i.multiple=multiple;i.onchange=()=>res([...i.files]);i.click()})}
async function addMedia(folderId,type){
  const files=await filePicker(type==='photo'?'image/*':'video/*',true);
  for(const file of files)await put('media',{id:'m-'+Date.now()+'-'+Math.random().toString(36).slice(2),folderId,type,name:file.name,blob:file,created:Date.now()});
  $('folderDialog').close();await openFolder(folderId);renderFolders();
}
async function chooseCover(folderId,after){
  const [file]=await filePicker('image/*',false);if(!file)return;
  const folders=await getAll('folders');const f=folders.find(x=>x.id===folderId);f.coverBlob=file;await put('folders',f);renderFolders();if(after)after();
}

const JOURNEY_SEED=[
{id:'journey-1',date:'2024 — ᴛʜᴇ ʙᴇɢɪɴɴɪɴɢ',title:'🏫 ᴡʜᴇɴ ᴏʀᴅɪɴᴀʀʏ ᴅᴀʏꜱ ʙᴇᴄᴀᴍᴇ ᴏᴜʀ ꜱᴛᴏʀʏ',message:'ᴡᴇ ᴅɪᴅ ɴᴏᴛ ᴋɴᴏᴡ ᴀᴛ ᴛʜᴇ ᴛɪᴍᴇ ᴛʜᴀᴛ ᴛʜᴇꜱᴇ ᴏʀᴅɪɴᴀʀʏ ᴄʟᴀꜱꜱʀᴏᴏᴍ ᴅᴀʏꜱ ᴡᴏᴜʟᴅ ʙᴇᴄᴏᴍᴇ ꜱᴏᴍᴇ ᴏꜰ ᴏᴜʀ ꜰᴀᴠᴏᴜʀɪᴛᴇ ᴍᴇᴍᴏʀɪᴇꜱ. ᴛʜᴇ ʟᴀᴜɢʜᴛᴇʀ ʙᴇᴛᴡᴇᴇɴ ʟᴇᴄᴛᴜʀᴇꜱ, ᴛʜᴇ ꜱᴍᴀʟʟ ᴊᴏᴋᴇꜱ, ᴛʜᴇ ᴍᴏᴍᴇɴᴛꜱ ᴡʜᴇɴ ɴᴏ ᴏɴᴇ ᴄᴏᴜʟᴅ ꜱᴛᴏᴘ ʟᴀᴜɢʜɪɴɢ — ᴀʟʟ ᴏꜰ ɪᴛ ꜱʟᴏᴡʟʏ ʙᴜɪʟᴛ ᴛʜᴇ ꜱᴛᴏʀʏ ᴡᴇ ɴᴏᴡ ᴄᴀʟʟ ᴛʜᴇ ᴏɢ ʟᴇɢᴇɴᴅꜱ. ❤️',builtin:true,order:1},
{id:'journey-2',date:'01 ᴊᴀɴᴜᴀʀʏ 2024',title:'🚌 ᴋᴜꜱʜɪɴᴀɢᴀʀ ᴛʀɪᴘ',message:'ᴀ ᴅᴀʏ ᴀᴡᴀʏ ꜰʀᴏᴍ ᴛʜᴇ ᴜꜱᴜᴀʟ ᴄʟᴀꜱꜱʀᴏᴏᴍ ʀᴏᴜᴛɪɴᴇ ɢᴀᴠᴇ ᴜꜱ ᴍᴏᴍᴇɴᴛꜱ ᴛʜᴀᴛ ꜰᴇʟᴛ ᴅɪꜰꜰᴇʀᴇɴᴛ. ᴛʜᴇ ᴛʀᴀᴠᴇʟ, ᴛʜᴇ ᴘʜᴏᴛᴏꜱ, ᴛʜᴇ ᴊᴏᴋᴇꜱ ᴀɴᴅ ᴛʜᴇ ᴘᴇᴏᴘʟᴇ ᴀʀᴏᴜɴᴅ ᴜꜱ ᴍᴀᴅᴇ ɪᴛ ᴍᴏʀᴇ ᴛʜᴀɴ ᴊᴜꜱᴛ ᴀ ᴛʀɪᴘ. ɪᴛ ʙᴇᴄᴀᴍᴇ ᴏɴᴇ ᴏꜰ ᴛʜᴏꜱᴇ ᴅᴀʏꜱ ᴡᴇ ᴄᴀɴ ʟᴏᴏᴋ ʙᴀᴄᴋ ᴏɴ ᴀɴᴅ ɪɴꜱᴛᴀɴᴛʟʏ ʀᴇᴍᴇᴍʙᴇʀ ᴡʜᴏ ᴡᴇ ᴡᴇʀᴇ ᴡɪᴛʜ. 📸❤️',builtin:true,order:2},
{id:'journey-3',date:'2025–26',title:'👑 ᴛʜᴇ ᴏɢ ʟᴇɢᴇɴᴅꜱ',message:'ʙʏ ᴛʜᴇ ᴛɪᴍᴇ ᴡᴇ ʀᴇᴀʟɪꜱᴇᴅ ʜᴏᴡ ꜰᴀꜱᴛ ᴛɪᴍᴇ ᴡᴀꜱ ᴍᴏᴠɪɴɢ, ᴡᴇ ᴀʟʀᴇᴀᴅʏ ʜᴀᴅ ᴀ ɢᴀʟʟᴇʀʏ ꜰᴜʟʟ ᴏꜰ ꜰᴀᴄᴇꜱ, ᴠɪᴅᴇᴏꜱ ᴀɴᴅ ꜱᴛᴏʀɪᴇꜱ. ᴘᴇᴏᴘʟᴇ ᴡɪʟʟ ᴍᴏᴠᴇ ᴛᴏ ᴅɪꜰꜰᴇʀᴇɴᴛ ᴘʟᴀᴄᴇꜱ ᴀɴᴅ ʟɪꜰᴇ ᴡɪʟʟ ᴄʜᴀɴɢᴇ, ʙᴜᴛ ᴛʜᴇꜱᴇ ᴍᴇᴍᴏʀɪᴇꜱ ᴡɪʟʟ ᴀʟᴡᴀʏꜱ ʙᴇ ᴘʀᴏᴏꜰ ᴛʜᴀᴛ ꜰᴏʀ ᴏɴᴇ ᴄʜᴀᴘᴛᴇʀ ᴏꜰ ʟɪꜰᴇ, ᴡᴇ ᴡᴇʀᴇ ʜᴇʀᴇ ᴛᴏɢᴇᴛʜᴇʀ. ᴛʜᴇ ᴇɴᴅ ᴏꜰ ᴀ ᴄʟᴀꜱꜱ ɪꜱ ɴᴏᴛ ᴛʜᴇ ᴇɴᴅ ᴏꜰ ᴛʜᴇ ᴍᴇᴍᴏʀɪᴇꜱ. ❤️♾️',builtin:true,order:3}
];
async function seedJourneys(){const saved=await getAll('journeys');for(const j of JOURNEY_SEED)if(!localStorage.getItem('deleted_'+j.id)&&!saved.some(x=>x.id===j.id))await put('journeys',j)}
async function renderJourney(){if(!DB)return;const host=$('journeyTimeline');if(!host)return;const list=(await getAll('journeys')).sort((a,b)=>(a.order||999)-(b.order||999));host.innerHTML='';for(const j of list){const c=document.createElement('div');c.className='timeline-card journey-card glass';let media='';if(j.mediaBlob){const u=URL.createObjectURL(j.mediaBlob);media=j.mediaType?.startsWith('video')?`<video src="${u}" controls playsinline></video>`:`<img src="${u}" alt="journey">`}c.innerHTML=`<div class="journey-icon">✦</div><div><b>${j.date}</b><h3>${j.title}</h3>${media}<p>${j.message}</p><button class="mini-btn danger journey-delete">🗑️ ᴅᴇʟᴇᴛᴇ ᴍᴇᴍᴏʀʏ</button></div>`;c.querySelector('.journey-delete').onclick=async()=>{if(!confirm('Delete this journey memory?'))return;await del('journeys',j.id);if(j.builtin)localStorage.setItem('deleted_'+j.id,'1');renderJourney()};host.appendChild(c)}}
$('addJourneyBtn').onclick=()=>$('newJourneyDialog').showModal();
$('newJourneyForm').onsubmit=async e=>{e.preventDefault();const file=$('journeyMedia').files[0]||null;const j={id:'journey-'+Date.now(),date:$('journeyDate').value.trim(),title:$('journeyTitle').value.trim(),message:$('journeyMessage').value.trim(),order:Date.now(),builtin:false};if(file){j.mediaBlob=file;j.mediaType=file.type}await put('journeys',j);e.target.reset();$('newJourneyDialog').close();renderJourney()};

const randomLines=[
'ꜱᴄʜᴏᴏʟ ᴅᴀʏꜱ ᴏꜰᴛᴇɴ ꜰᴇʟᴛ ᴏʀᴅɪɴᴀʀʏ ᴡʜɪʟᴇ ᴡᴇ ᴡᴇʀᴇ ʟɪᴠɪɴɢ ᴛʜᴇᴍ. ᴡᴇ ᴅɪᴅɴ’ᴛ ᴋɴᴏᴡ ᴛʜᴀᴛ ᴀ ʀᴀɴᴅᴏᴍ ʟᴀᴜɢʜ ɪɴ ᴄʟᴀꜱꜱ, ᴀ ᴘʜᴏᴛᴏ ᴛᴀᴋᴇɴ ᴡɪᴛʜᴏᴜᴛ ᴀ ᴘʟᴀɴ, ᴏʀ ᴀ ꜰᴇᴡ ᴍɪɴᴜᴛᴇꜱ ꜱᴘᴇɴᴛ ᴛᴏɢᴇᴛʜᴇʀ ᴡᴏᴜʟᴅ ᴏɴᴇ ᴅᴀʏ ꜰᴇᴇʟ ꜱᴏ ᴠᴀʟᴜᴀʙʟᴇ. ᴛʜᴏꜱᴇ ᴜɴᴘʟᴀɴɴᴇᴅ ᴍᴏᴍᴇɴᴛꜱ ᴀʀᴇ ɴᴏᴡ ᴛʜᴇ ᴏɴᴇꜱ ᴡᴇ ᴡᴏᴜʟᴅ ᴘʀᴏʙᴀʙʟʏ ᴄʜᴏᴏꜱᴇ ᴛᴏ ʟɪᴠᴇ ᴏɴᴇ ᴍᴏʀᴇ ᴛɪᴍᴇ. ᴛʜᴀᴛ ɪꜱ ᴡʜᴀᴛ ᴍᴀᴋᴇꜱ ᴛʜᴇꜱᴇ ᴍᴇᴍᴏʀɪᴇꜱ ꜱᴘᴇᴄɪᴀʟ — ᴛʜᴇʏ ᴡᴇʀᴇ ʀᴇᴀʟ, ᴜɴᴘʟᴀɴɴᴇᴅ ᴀɴᴅ ᴏᴜʀꜱ. ❤️',
'ᴛʜᴇʀᴇ ᴡᴇʀᴇ ᴅᴀʏꜱ ᴡʜᴇɴ ᴛʜᴇ ᴄʟᴀꜱꜱʀᴏᴏᴍ ꜰᴇʟᴛ ᴛᴏᴏ ʟᴏɴɢ, ᴇᴠᴇʀʏᴏɴᴇ ᴡᴀꜱ ᴡᴀɪᴛɪɴɢ ꜰᴏʀ ᴛʜᴇ ʙᴇʟʟ ᴀɴᴅ ᴛʜᴇ ᴅᴀʏ ꜰᴇʟᴛ ʟɪᴋᴇ ɪᴛ ᴡᴏᴜʟᴅ ɴᴇᴠᴇʀ ᴇɴᴅ. ʙᴜᴛ ɴᴏᴡ ᴡᴇ ᴅᴏɴ’ᴛ ʀᴇᴍᴇᴍʙᴇʀ ᴛʜᴏꜱᴇ ʙᴏʀɪɴɢ ᴍɪɴᴜᴛᴇꜱ. ᴡᴇ ʀᴇᴍᴇᴍʙᴇʀ ᴛʜᴇ ꜰʀɪᴇɴᴅꜱ, ᴛʜᴇ ᴊᴏᴋᴇꜱ, ᴛʜᴇ ᴍɪꜱᴄʜɪᴇꜰ, ᴛʜᴇ ꜱɪʟʟʏ ᴅɪᴀʟᴏɢᴜᴇꜱ ᴀɴᴅ ᴛʜᴇ ꜰᴇᴇʟɪɴɢ ᴏꜰ ʙᴇɪɴɢ ᴘᴀʀᴛ ᴏꜰ ꜱᴏᴍᴇᴛʜɪɴɢ ᴛᴏɢᴇᴛʜᴇʀ. ᴍᴀʏʙᴇ ᴛʜᴀᴛ ɪꜱ ᴛʜᴇ ᴍᴀɢɪᴄ ᴏꜰ ꜱᴄʜᴏᴏʟ — ʏᴏᴜ ᴏɴʟʏ ᴜɴᴅᴇʀꜱᴛᴀɴᴅ ʜᴏᴡ ꜱᴘᴇᴄɪᴀʟ ɪᴛ ᴡᴀꜱ ᴡʜᴇɴ ɪᴛ ʙᴇᴄᴏᴍᴇꜱ ᴀ ᴍᴇᴍᴏʀʏ. 👑',
'ᴛʜᴇ ᴋᴜꜱʜɪɴᴀɢᴀʀ ᴛʀɪᴘ ᴡᴀꜱ ɴᴏᴛ ᴊᴜꜱᴛ ᴀʙᴏᴜᴛ ɢᴏɪɴɢ ꜱᴏᴍᴇᴡʜᴇʀᴇ ᴇʟꜱᴇ. ɪᴛ ᴡᴀꜱ ᴀʙᴏᴜᴛ ʙᴇɪɴɢ ᴛᴏɢᴇᴛʜᴇʀ ᴏᴜᴛꜱɪᴅᴇ ᴛʜᴇ ᴜꜱᴜᴀʟ ʀᴏᴜᴛɪɴᴇ, ᴛᴀᴋɪɴɢ ᴘʜᴏᴛᴏꜱ, ʟᴀᴜɢʜɪɴɢ ᴀᴛ ᴛʜɪɴɢꜱ ᴛʜᴀᴛ ᴡᴏᴜʟᴅ ᴏɴʟʏ ᴍᴀᴋᴇ ꜱᴇɴꜱᴇ ᴛᴏ ᴜꜱ ᴀɴᴅ ᴄᴀʀʀʏɪɴɢ ʙᴀᴄᴋ ᴍᴏʀᴇ ᴛʜᴀɴ ᴊᴜꜱᴛ ᴘʜᴏᴛᴏꜱ. ᴛʜᴇ ʙᴇꜱᴛ ᴛʀɪᴘꜱ ᴀʀᴇ ᴏꜰᴛᴇɴ ʀᴇᴍᴇᴍʙᴇʀᴇᴅ ɴᴏᴛ ʙᴇᴄᴀᴜꜱᴇ ᴏꜰ ᴛʜᴇ ᴘʟᴀᴄᴇ, ʙᴜᴛ ʙᴇᴄᴀᴜꜱᴇ ᴏꜰ ᴛʜᴇ ᴘᴇᴏᴘʟᴇ ᴡʜᴏ ᴡᴇʀᴇ ᴛʜᴇʀᴇ. 🚌📸❤️',
'ᴛʜᴇ ᴏɢ ʟᴇɢᴇɴᴅꜱ ᴡᴀꜱ ɴᴇᴠᴇʀ ᴀʙᴏᴜᴛ ʙᴇɪɴɢ ᴘᴇʀꜰᴇᴄᴛ. ɪᴛ ᴡᴀꜱ ᴀʙᴏᴜᴛ ᴅɪꜰꜰᴇʀᴇɴᴛ ᴘᴇʀꜱᴏɴᴀʟɪᴛɪᴇꜱ ꜰɪᴛᴛɪɴɢ ɪɴᴛᴏ ᴏɴᴇ ꜱᴛᴏʀʏ — ᴛʜᴇ ǫᴜɪᴇᴛ ᴏɴᴇꜱ, ᴛʜᴇ ʟᴏᴜᴅ ᴏɴᴇꜱ, ᴛʜᴇ ꜰᴜɴɴʏ ᴏɴᴇꜱ, ᴛʜᴇ ᴍᴏᴏᴅʏ ᴏɴᴇꜱ ᴀɴᴅ ᴛʜᴇ ᴘᴇᴏᴘʟᴇ ᴡʜᴏ ᴄᴏᴜʟᴅ ᴛᴜʀɴ ᴀɴ ᴏʀᴅɪɴᴀʀʏ ᴅᴀʏ ɪɴᴛᴏ ᴀ ꜱᴛᴏʀʏ. ɪɴꜱɪᴅᴇ ᴊᴏᴋᴇꜱ, ʀᴀɴᴅᴏᴍ ᴘʜᴏᴛᴏꜱ ᴀɴᴅ ᴍᴏᴍᴇɴᴛꜱ ᴛʜᴀᴛ ᴏɴʟʏ ᴛʜᴇ ᴘᴇᴏᴘʟᴇ ᴡʜᴏ ᴡᴇʀᴇ ᴛʜᴇʀᴇ ᴄᴀɴ ꜰᴜʟʟʏ ᴜɴᴅᴇʀꜱᴛᴀɴᴅ — ᴛʜᴀᴛ ɪꜱ ᴡʜᴀᴛ ᴍᴀᴅᴇ ɪᴛ ᴏᴜʀꜱ. 👑',
'ᴏɴᴇ ᴅᴀʏ ᴡᴇ ᴡɪʟʟ ᴀʟʟ ʙᴇ ʙᴜꜱʏ ᴡɪᴛʜ ᴅɪꜰꜰᴇʀᴇɴᴛ ᴘʟᴀɴꜱ, ᴅɪꜰꜰᴇʀᴇɴᴛ ᴄɪᴛɪᴇꜱ ᴀɴᴅ ᴅɪꜰꜰᴇʀᴇɴᴛ ᴄʜᴀᴘᴛᴇʀꜱ. ʙᴜᴛ ᴀ ᴘʜᴏᴛᴏ, ᴀ ꜱᴏɴɢ ᴏʀ ᴏɴᴇ ꜰᴀᴍɪʟɪᴀʀ ɴᴀᴍᴇ ᴄᴀɴ ʙʀɪɴɢ ʙᴀᴄᴋ ᴀɴ ᴇɴᴛɪʀᴇ ᴇʀᴀ ɪɴ ᴀ ꜱᴇᴄᴏɴᴅ. ᴛʜᴀᴛ ɪꜱ ᴡʜʏ ᴡᴇ ᴋᴇᴇᴘ ᴛʜᴇꜱᴇ ᴍᴏᴍᴇɴᴛꜱ — ɴᴏᴛ ᴛᴏ ʟɪᴠᴇ ɪɴ ᴛʜᴇ ᴘᴀꜱᴛ, ʙᴜᴛ ᴛᴏ ʀᴇᴍᴇᴍʙᴇʀ ᴀ ᴄʜᴀᴘᴛᴇʀ ᴛʜᴀᴛ ᴍᴀᴅᴇ ᴜꜱ ꜱᴍɪʟᴇ. ɴᴏ ᴍᴀᴛᴛᴇʀ ʜᴏᴡ ꜰᴀʀ ᴇᴠᴇʀʏᴏɴᴇ ɢᴏᴇꜱ, ᴛʜᴇꜱᴇ ᴍᴇᴍᴏʀɪᴇꜱ ᴡɪʟʟ ᴀʟᴡᴀʏꜱ ʙᴇ ᴏɴᴇ ᴘʟᴀᴄᴇ ᴡʜᴇʀᴇ ᴡᴇ ᴀʀᴇ ꜱᴛɪʟʟ ᴛᴏɢᴇᴛʜᴇʀ. ❤️♾️'
];
let randomBatchShown=false;
function resetRandomBatch(){randomBatchShown=false;const host=$('randomBatch');if(host)host.innerHTML='';if($('randomBtn')){$('randomBtn').hidden=false;$('randomBtn').disabled=false}if($('randomBack'))$('randomBack').hidden=true;}
function showFiveMemories(){
  if(randomBatchShown)return;randomBatchShown=true;
  const host=$('randomBatch');host.innerHTML='';
  randomLines.forEach((text,i)=>{const card=document.createElement('article');card.className='random-memory-card';card.innerHTML=`<div class="random-memory-no">ᴍᴇᴍᴏʀʏ ${String(i+1).padStart(2,'0')}</div><p>${text}</p>`;host.appendChild(card)});
  $('randomBtn').hidden=true;$('randomBack').hidden=false;host.scrollIntoView({behavior:'smooth',block:'start'});
}
$('randomBtn').onclick=showFiveMemories;
$('randomBack').onclick=()=>showPage(Math.max(0,currentPage-1));

// Browser Back closes open dialogs first, then moves through website pages.
let internalNav=false;const oldShowPage=showPage;showPage=function(i,push=true){const was=currentPage;oldShowPage(i);if(currentPage===6 && was!==6)resetRandomBatch();if(push&&!internalNav){history.pushState({ogPage:currentPage},'',location.href)}};
window.addEventListener('popstate',()=>{const open=[...document.querySelectorAll('dialog[open]')].pop();if(open){open.close();history.pushState({ogPage:currentPage},'',location.href);return}if(currentPage>0){internalNav=true;oldShowPage(currentPage-1);internalNav=false}else history.pushState({ogPage:0},'',location.href)});
history.replaceState({ogPage:currentPage},'',location.href);
