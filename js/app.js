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
const NORMAL_LAST_PAGE=pageEls.findIndex(p=>p.id==='finalPage');
pageEls.slice(0,NORMAL_LAST_PAGE+1).forEach((_,i)=>{const d=document.createElement('span');d.onclick=()=>showPage(i);dots.appendChild(d)});
function showPage(i){
  currentPage=Math.max(0,Math.min(i,pageEls.length-1));
  pageEls.forEach((p,idx)=>p.classList.toggle('active',idx===currentPage));
  [...dots.children].forEach((d,idx)=>d.classList.toggle('active',idx===currentPage));
  $('prevBtn').disabled=currentPage===0 || currentPage>NORMAL_LAST_PAGE;
  $('nextBtn').disabled=currentPage>=NORMAL_LAST_PAGE;
  const active=pageEls[currentPage]; if(active) active.scrollTop=0;
}
$('prevBtn').onclick=()=>{if(currentPage<=NORMAL_LAST_PAGE)showPage(Math.max(0,currentPage-1))};
$('nextBtn').onclick=()=>{if(currentPage<NORMAL_LAST_PAGE)showPage(currentPage+1)};
if($('homeBtn'))$('homeBtn').onclick=()=>showPage(0);
document.querySelectorAll('.jump-btn').forEach(b=>b.onclick=()=>showPage(+b.dataset.target));
showPage(0);

// Music is defined before unlock/openSite so remembered unlock can never break.
const bgMusic=$('bgMusic');
let musicOn=false;
// User preference is separate from temporary pauses caused by reels/app background.
let musicWanted=localStorage.getItem('og_music_wanted')!=='0';
function setMusicButton(){if($('musicBtn'))$('musicBtn').textContent=(musicWanted&&musicOn)?'⏸️':'🎵'}
function pauseBackgroundMusic(){
  try{bgMusic.pause()}catch{}
  musicOn=false;setMusicButton();
}
async function tryPlayMusic(){
  // Never allow background song to overlap with reels or while app/tab is hidden.
  if(!musicWanted || document.hidden || document.body.classList.contains('reels-mode')){pauseBackgroundMusic();return}
  try{if(bgMusic.readyState===0)bgMusic.load();await bgMusic.play();musicOn=!bgMusic.paused;setMusicButton()}
  catch{musicOn=false;setMusicButton()}
}
$('musicBtn').onclick=async()=>{
  if(musicWanted && !bgMusic.paused){
    musicWanted=false;localStorage.setItem('og_music_wanted','0');pauseBackgroundMusic();
  }else{
    musicWanted=true;localStorage.setItem('og_music_wanted','1');await tryPlayMusic();
  }
};
// Pause only the actual audio on app/background changes; do NOT forget the user's choice.
function pauseMusicForExit(){pauseBackgroundMusic()}
function pauseAllForegroundVideo(){
  document.querySelectorAll('#reelsFeed video,#viewerStage video').forEach(v=>{try{v.pause()}catch{}});
}
function resumeActiveReel(){
  if(!document.body.classList.contains('reels-mode') || document.hidden)return;
  pauseBackgroundMusic();
  const cards=[...document.querySelectorAll('#reelsFeed .reel-card')];
  let best=null,bestRatio=0;
  cards.forEach(c=>{const r=c.getBoundingClientRect();const vis=Math.max(0,Math.min(r.bottom,innerHeight)-Math.max(r.top,0));const ratio=r.height?vis/r.height:0;if(ratio>bestRatio){bestRatio=ratio;best=c}});
  const active=best?.querySelector('video');
  document.querySelectorAll('#reelsFeed video').forEach(v=>{if(v!==active){try{v.pause()}catch{}}});
  active?.play().catch(()=>{});
}
window.addEventListener('pagehide',()=>{pauseBackgroundMusic();pauseAllForegroundVideo()});
window.addEventListener('beforeunload',()=>{pauseBackgroundMusic();pauseAllForegroundVideo()});
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){pauseBackgroundMusic();pauseAllForegroundVideo();return;}
  const unlocked=$('siteShell') && !$('siteShell').hidden && $('siteShell').style.display!=='none';
  if(!unlocked)return;
  if(document.body.classList.contains('reels-mode')) resumeActiveReel();
  else tryPlayMusic();
});

// Simple local PIN gate. This is privacy for a static site, not server-side authentication.
const SITE_PIN='14022026';
function openSite(){
  $('lockScreen').hidden=true;
  $('lockScreen').style.display='none';
  $('siteShell').hidden=false;
  $('siteShell').style.display='grid';
  $('pinError').textContent='';
  showPage(0);
  tryPlayMusic();
  showUnlockIntro();
  setTimeout(()=>updateV7Home(),80);
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
  if(typeof updateV7Home==='function')updateV7Home();
}
function openProfile(i){
  const p=activeProfiles[i];if(!p)return;
  $('profileDialogBody').innerHTML=`<div class="profile-top"><div class="profile-img-wrap"><img src="${profileImageSrc(p)}" alt="${p.n}"></div><div class="profile-info"><div class="eyebrow">👤 ${p.n}</div><h3>${p.title}</h3><div class="profile-details"><p>ɴɪᴄᴋɴᴀᴍᴇ — ${p.nick}</p><p>ɴᴀᴛᴜʀᴇ — ${p.nature}</p><p>ᴋʜᴀᴀꜱ ʙᴀᴀᴛ — ${p.special}</p></div><button class="mini-btn" id="openLetterBtn">💌 ᴏᴘᴇɴ ʟᴇᴛᴛᴇʀ</button> <button class="mini-btn" id="changeProfileImageBtn">🖼️ ᴄʜᴀɴɢᴇ ᴘʀᴏꜰɪʟᴇ ɪᴍᴀɢᴇ</button> <button class="mini-btn danger" id="deleteProfileBtn">🗑️ ᴅᴇʟᴇᴛᴇ ᴘʀᴏꜰɪʟᴇ</button></div></div><div class="memory-box">💭 <b>ᴍᴇᴍᴏʀʏ</b><br><br>${p.memory}</div>`;
  $('profileDialog').showModal();
  $('openLetterBtn').onclick=()=>openFriendLetter(p);
  $('changeProfileImageBtn').onclick=async()=>{
    const [file]=await filePicker('image/*',false);if(!file)return;
    p.imageBlob=file;await put('profiles',p);$('profileDialog').close();await renderPeople();openProfile(activeProfiles.findIndex(x=>x.id===p.id));
  };
  const delBtn=$('deleteProfileBtn');if(delBtn)delBtn.onclick=async()=>{if(!confirm('Delete this profile?'))return;await recycleItem('profile',p.id,p);await del('profiles',p.id);if(p.builtin)localStorage.setItem('deleted_'+p.id,'1');$('profileDialog').close();renderPeople()};
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
const req=indexedDB.open('ogLegendsMemories',9);
req.onupgradeneeded=e=>{
  const db=e.target.result;
  if(!db.objectStoreNames.contains('folders'))db.createObjectStore('folders',{keyPath:'id'});
  if(!db.objectStoreNames.contains('media')){const s=db.createObjectStore('media',{keyPath:'id'});s.createIndex('folderId','folderId',{unique:false})}
  if(!db.objectStoreNames.contains('profiles'))db.createObjectStore('profiles',{keyPath:'id'});
  if(!db.objectStoreNames.contains('journeys'))db.createObjectStore('journeys',{keyPath:'id'});
  if(!db.objectStoreNames.contains('hiddenMedia'))db.createObjectStore('hiddenMedia',{keyPath:'id'});
  if(!db.objectStoreNames.contains('favorites'))db.createObjectStore('favorites',{keyPath:'id'});
  if(!db.objectStoreNames.contains('mediaMeta'))db.createObjectStore('mediaMeta',{keyPath:'id'});
  if(!db.objectStoreNames.contains('letters'))db.createObjectStore('letters',{keyPath:'id'});
  if(!db.objectStoreNames.contains('recycle'))db.createObjectStore('recycle',{keyPath:'id'});
  if(!db.objectStoreNames.contains('reels'))db.createObjectStore('reels',{keyPath:'id'});
  if(!db.objectStoreNames.contains('reelProfile'))db.createObjectStore('reelProfile',{keyPath:'id'});
  if(!db.objectStoreNames.contains('users'))db.createObjectStore('users',{keyPath:'username'});
  if(!db.objectStoreNames.contains('posts'))db.createObjectStore('posts',{keyPath:'id'});
};
req.onsuccess=async e=>{DB=e.target.result;await hydrateBuiltins();await seedBuiltins();await seedProfiles();await seedJourneys();await renderPeople();await renderFolders();await renderJourney();await initV7()};
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
  for(const m of await mediaForFolder(f.id)){await recycleItem('media',m.id,m);await del('media',m.id)}
  await recycleItem('folder',f.id,f);
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
    pauseBackgroundMusic();
    const v=document.createElement('video');v.src=src;v.controls=true;v.playsInline=true;v.autoplay=true;v.className='viewer-video';v.id='viewerActiveMedia';stage.appendChild(v);
  }
  $('viewerPrev').disabled=currentViewerItems.length<2;$('viewerNext').disabled=currentViewerItems.length<2;
  $('viewerZoomOut').disabled=currentViewerType!=='photo';$('viewerZoomIn').disabled=currentViewerType!=='photo';$('viewerReset').disabled=currentViewerType!=='photo';
  $('viewerSlideshow').hidden=currentViewerType!=='photo';
  refreshViewerV7();
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
$('mediaViewerDialog').addEventListener('close',()=>{$('viewerStage').querySelector('video')?.pause();$('viewerStage').innerHTML='';viewerScale=1;if(!document.body.classList.contains('reels-mode'))tryPlayMusic()});

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
  body.innerHTML=`<div class="folder-view-head"><img src="${cover}"><div><div class="eyebrow">${f.type==='photo'?'📸':'🎬'} ${f.name}</div><h3>${items.length} ɪᴛᴇᴍꜱ</h3></div></div><div class="folder-view-actions"><button class="mini-btn" id="addMediaBtn">＋ ᴀᴅᴅ ${f.type==='photo'?'ᴘʜᴏᴛᴏꜱ':'ᴠɪᴅᴇᴏꜱ'}</button>${f.type==='photo'?'<button class="mini-btn" id="startSlideshowBtn">🎞️ ꜱʟɪᴅᴇꜱʜᴏᴡ</button>':''}${f.builtin?'<span class="badge">ʙʀᴏᴡꜱᴇʀ ᴀᴅᴅ • ʟᴏᴄᴀʟʟʏ ꜱᴀᴠᴇᴅ</span>':'<button class="mini-btn" id="changeCoverInside">🖼️ ᴄʜᴀɴɢᴇ ᴅᴘ</button>'}<button class="mini-btn danger" id="deleteFolderBtn">🗑️ ᴅᴇʟᴇᴛᴇ ꜰᴏʟᴅᴇʀ</button></div><div id="folderMediaGrid" class="media-grid"></div>`;
  const grid=body.querySelector('#folderMediaGrid');
  if(items.length===0)grid.innerHTML='<div class="empty-state">ɴᴏ ᴍᴇᴅɪᴀ ʏᴇᴛ.<br><small>ᴄᴏᴘʏ ꜰɪʟᴇꜱ ᴛᴏ ᴍᴇᴅɪᴀ ꜰᴏʟᴅᴇʀ + ʀᴜɴ refresh_media.sh</small></div>';
  else items.forEach((item,index)=>{
    const tile=document.createElement('div');tile.className='media-tile';const src=item.builtin?item.src:URL.createObjectURL(item.blob);
    if(f.type==='photo')tile.innerHTML=`<img src="${src}" alt="${item.name||'photo'}" loading="lazy"><button class="remove-media">🗑</button>`;
    else tile.innerHTML=`<video src="${src}" muted playsinline preload="metadata"></video><span class="play-badge">▶</span><button class="remove-media">🗑</button>`;
    tile.querySelector(f.type==='photo'?'img':'video').onclick=()=>openViewer(items,index,f.type);
    tile.querySelector('.remove-media').onclick=async e=>{e.stopPropagation();if(!confirm('Delete this '+f.type+' from this gallery?'))return;if(item.builtin){await recycleItem('hiddenMedia',item.id,item);await put('hiddenMedia',{id:item.id})}else{await recycleItem('media',item.id,item);await del('media',item.id)};dialog.close();openFolder(id);renderFolders()};
    grid.appendChild(tile);
  });
  body.querySelector('#addMediaBtn').onclick=()=>addMedia(id,f.type);
  if(f.type==='photo'&&body.querySelector('#startSlideshowBtn'))body.querySelector('#startSlideshowBtn').onclick=()=>{dialog.close();startSlideshow(items)};
  if(!f.builtin)body.querySelector('#changeCoverInside').onclick=()=>chooseCover(id,()=>{dialog.close();openFolder(id)});
  body.querySelector('#deleteFolderBtn').onclick=()=>deleteFolder(f);
  dialog.showModal();
}
function filePicker(accept,multiple=false){return new Promise(res=>{const i=document.createElement('input');i.type='file';i.accept=accept;i.multiple=multiple;i.onchange=()=>res([...i.files]);i.click()})}
async function addMedia(folderId,type){
  const files=await filePicker(type==='photo'?'image/*':'video/*',true);
  for(const file of files)await put('media',{id:'m-'+Date.now()+'-'+Math.random().toString(36).slice(2),folderId,type,name:file.name,blob:file,created:Date.now()});
  $('folderDialog').close();await openFolder(folderId);renderFolders();if(typeof updateV7Home==='function')updateV7Home();
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
async function renderJourney(){if(!DB)return;const host=$('journeyTimeline');if(!host)return;const list=(await getAll('journeys')).sort((a,b)=>(a.order||999)-(b.order||999));host.innerHTML='';for(const j of list){const c=document.createElement('div');c.className='timeline-card journey-card glass';c.dataset.journeyId=j.id;let media='';if(j.mediaBlob){const u=URL.createObjectURL(j.mediaBlob);media=j.mediaType?.startsWith('video')?`<video src="${u}" controls playsinline></video>`:`<img src="${u}" alt="journey">`}c.innerHTML=`<div class="journey-icon">✦</div><div><b>${j.date}</b><h3>${j.title}</h3>${media}<p>${j.message}</p><button class="mini-btn danger journey-delete">🗑️ ᴅᴇʟᴇᴛᴇ ᴍᴇᴍᴏʀʏ</button></div>`;c.querySelector('.journey-delete').onclick=async()=>{if(!confirm('Delete this journey memory?'))return;await recycleItem('journey',j.id,j);await del('journeys',j.id);if(j.builtin)localStorage.setItem('deleted_'+j.id,'1');renderJourney()};host.appendChild(c)}if(typeof updateV7Home==='function')updateV7Home()}
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


// ==================== V7 PREMIUM MEMORY LAYER ====================
let slideshowTimer=null, activeLetterProfile=null, memoryDayItems=[];
const V7_STORES=['profiles','folders','media','journeys','hiddenMedia','favorites','mediaMeta','letters','recycle','reels','reelProfile'];

function showUnlockIntro(){
  const el=$('unlockIntro');if(!el)return;el.hidden=false;el.classList.remove('intro-out');
  clearTimeout(showUnlockIntro.t);showUnlockIntro.t=setTimeout(()=>{el.classList.add('intro-out');setTimeout(()=>el.hidden=true,420)},1750);
}

async function recycleItem(kind,id,data){
  if(!DB||!DB.objectStoreNames.contains('recycle'))return;
  try{await put('recycle',{id:`${kind}:${id}`,kind,originalId:id,data,deletedAt:Date.now()})}catch{}
}

async function getMemoryDayPool(){
  const builtin=(window.BUILTIN_MEDIA.photos||[]).map((src,i)=>({id:'builtin-photos-b'+i,src,builtin:true,type:'photo',name:decodeURIComponent(src.split('/').pop())}));
  let local=[];
  try{local=(await getAll('media')).filter(x=>x.type==='photo').map(x=>({...x,src:x.blob?URL.createObjectURL(x.blob):x.src,builtin:false,type:'photo'}))}catch{}
  return [...builtin,...local];
}
function memoryDaySavedIds(){try{return JSON.parse(localStorage.getItem('og-memory-day-items')||'[]')}catch{return []}}
function saveMemoryDayIds(ids){localStorage.setItem('og-memory-day-items',JSON.stringify([...new Set(ids)]))}
function dailyDefaultIds(all){
  if(!all.length)return [];
  const d=new Date(),dayKey=Number(`${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`),count=Math.min(5,all.length),start=dayKey%all.length;
  let step=(dayKey%Math.max(1,all.length-1))+1;while(all.length>1&&gcd(step,all.length)!==1)step++;
  const ids=[],used=new Set();for(let n=0;n<count;n++){let idx=(start+n*step)%all.length;while(used.has(idx))idx=(idx+1)%all.length;used.add(idx);ids.push(all[idx].id)}return ids;
}
async function renderMemoryDay(){
  const host=$('memoryDayGrid');if(!host)return;
  const all=await getMemoryDayPool();let ids=memoryDaySavedIds();
  if(!ids.length){ids=dailyDefaultIds(all);saveMemoryDayIds(ids)}
  memoryDayItems=ids.map(id=>all.find(x=>x.id===id)).filter(Boolean);
  host.innerHTML='';
  if(!memoryDayItems.length){host.innerHTML='<div class="memory-day-loading">ɴᴏ ᴍᴇᴍᴏʀɪᴇꜱ ʏᴇᴛ — ᴛᴀᴘ ＋ ᴀᴅᴅ.</div>';return}
  memoryDayItems.forEach((item,index)=>{
    const wrap=document.createElement('div');wrap.className='memory-day-item';
    const b=document.createElement('button');b.type='button';b.className='memory-day-photo';b.setAttribute('aria-label',`ᴏᴘᴇɴ ᴍᴇᴍᴏʀʏ ${index+1}`);b.innerHTML=`<img src="${item.src}" alt="ᴍᴇᴍᴏʀʏ ${index+1}" loading="lazy">`;b.onclick=()=>openViewer(memoryDayItems,index,'photo');
    const del=document.createElement('button');del.type='button';del.className='memory-day-remove';del.title='Remove from Memories of the Day';del.textContent='✕';del.onclick=async e=>{e.stopPropagation();saveMemoryDayIds(memoryDaySavedIds().filter(id=>id!==item.id));await renderMemoryDay()};
    wrap.append(b,del);host.appendChild(wrap);
  });
}
async function openMemoryDayPicker(){
  const grid=$('memoryDayPickerGrid'),dlg=$('memoryDayPicker');if(!grid||!dlg)return;const all=await getMemoryDayPool(),selected=new Set(memoryDaySavedIds());grid.innerHTML='';
  all.forEach(item=>{const b=document.createElement('button');b.type='button';b.className='memory-day-pick'+(selected.has(item.id)?' selected':'');b.innerHTML=`<img src="${item.src}" alt="photo" loading="lazy"><span>${selected.has(item.id)?'✓ ᴀᴅᴅᴇᴅ':'＋ ᴀᴅᴅ'}</span>`;b.onclick=async()=>{const ids=memoryDaySavedIds();if(!ids.includes(item.id)){ids.push(item.id);saveMemoryDayIds(ids)}await renderMemoryDay();dlg.close()};grid.appendChild(b)});dlg.showModal();
}
async function randomizeMemoryDay(){const all=await getMemoryDayPool();const shuffled=[...all].sort(()=>Math.random()-.5).slice(0,Math.min(5,all.length));saveMemoryDayIds(shuffled.map(x=>x.id));await renderMemoryDay()}
async function updateV7Home(){
  if(!DB)return;
  const p=(window.BUILTIN_MEDIA.photos||[]).length, v=(window.BUILTIN_MEDIA.videos||[]).length;
  const local=await getAll('media'), profiles=await getAll('profiles'), journeys=await getAll('journeys'), favs=await getAll('favorites');
  const lp=local.filter(x=>x.type==='photo').length, lv=local.filter(x=>x.type==='video').length;
  if($('memoryStats'))$('memoryStats').innerHTML=`<span>📸 <b>${p+lp}</b> ᴘʜᴏᴛᴏꜱ</span><span>🎬 <b>${v+lv}</b> ᴠɪᴅᴇᴏꜱ</span><span>👥 <b>${profiles.length}</b> ᴘʀᴏꜰɪʟᴇꜱ</span><span>📖 <b>${journeys.length}</b> ᴊᴏᴜʀɴᴇʏꜱ</span><span>❤️ <b>${favs.length}</b> ꜰᴀᴠꜱ</span>`;
  await renderMemoryDay();
}
function gcd(a,b){while(b){const t=b;b=a%b;a=t}return Math.abs(a)||1}

async function getMeta(id){if(!DB)return null;try{return (await getAll('mediaMeta')).find(x=>x.id===id)||null}catch{return null}}
async function refreshViewerV7(){
  const item=currentViewerItems[currentViewerIndex];if(!item||!DB)return;
  const meta=await getMeta(item.id);const favs=await getAll('favorites');const isFav=favs.some(x=>x.id===item.id);
  if($('viewerFavourite'))$('viewerFavourite').textContent=isFav?'♥':'♡';
  if($('viewerMetaLine'))$('viewerMetaLine').textContent=[meta?.date,meta?.caption].filter(Boolean).join(' • ');
}
$('viewerFavourite').onclick=async()=>{const item=currentViewerItems[currentViewerIndex];if(!item)return;const favs=await getAll('favorites');if(favs.some(x=>x.id===item.id))await del('favorites',item.id);else await put('favorites',{id:item.id,type:currentViewerType,name:item.name||'',src:item.builtin?item.src:null,folderId:item.folderId||null,builtin:!!item.builtin,created:Date.now()});await refreshViewerV7();await updateV7Home()};
$('viewerInfo').onclick=async()=>{const item=currentViewerItems[currentViewerIndex];if(!item)return;const m=await getMeta(item.id);$('metaDate').value=m?.date||'';$('metaCaption').value=m?.caption||'';$('metaDialog').dataset.mediaId=item.id;$('metaDialog').showModal()};
$('metaForm').onsubmit=async e=>{e.preventDefault();const id=$('metaDialog').dataset.mediaId;if(!id)return;await put('mediaMeta',{id,date:$('metaDate').value.trim(),caption:$('metaCaption').value.trim(),updated:Date.now()});$('metaDialog').close();await refreshViewerV7();await updateV7Home()};
$('viewerShare').onclick=async()=>{const item=currentViewerItems[currentViewerIndex];if(!item)return;const meta=await getMeta(item.id);const title=meta?.caption||item.name||'ᴏᴜʀ ᴍᴇᴍᴏʀʏ';try{if(navigator.share){let file=null;try{const blob=item.builtin?await (await fetch(item.src)).blob():item.blob;if(blob)file=new File([blob],item.name||`memory.${currentViewerType==='photo'?'jpg':'mp4'}`,{type:blob.type})}catch{}const data={title,text:title};if(file&&navigator.canShare?.({files:[file]}))data.files=[file];else if(item.builtin)data.url=new URL(item.src,location.href).href;await navigator.share(data)}else{await navigator.clipboard.writeText(item.builtin?new URL(item.src,location.href).href:title);alert('✅ ʟɪɴᴋ / ᴛᴇxᴛ ᴄᴏᴘɪᴇᴅ')}}catch{}}

function stopSlideshow(){if(slideshowTimer){clearInterval(slideshowTimer);slideshowTimer=null}if($('viewerSlideshow'))$('viewerSlideshow').textContent='🎞️'}
function startSlideshow(items){if(!items?.length)return;stopSlideshow();openViewer(items,0,'photo');$('viewerSlideshow').textContent='⏹';slideshowTimer=setInterval(()=>{if(!$('mediaViewerDialog').open){stopSlideshow();return}currentViewerIndex=(currentViewerIndex+1)%currentViewerItems.length;renderViewer()},4000)}
$('viewerSlideshow').onclick=()=>{if(slideshowTimer)stopSlideshow();else if(currentViewerType==='photo'&&currentViewerItems.length)startSlideshow(currentViewerItems)};
$('mediaViewerDialog').addEventListener('close',stopSlideshow);

function defaultLetter(p){return `${p.n},\n\nᴛʜᴇʀᴇ ᴀʀᴇ ꜱᴏᴍᴇ ᴘᴇᴏᴘʟᴇ ᴡʜᴏ ʙᴇᴄᴏᴍᴇ ᴀ ᴘᴀʀᴛ ᴏꜰ ᴀ ᴄʜᴀᴘᴛᴇʀ ᴡɪᴛʜᴏᴜᴛ ᴀɴʏᴏɴᴇ ᴘʟᴀɴɴɪɴɢ ɪᴛ. ᴛʜᴇ ᴊᴏᴋᴇꜱ, ᴄʟᴀꜱꜱʀᴏᴏᴍ ᴍᴏᴍᴇɴᴛꜱ, ʀᴀɴᴅᴏᴍ ᴘʜᴏᴛᴏꜱ ᴀɴᴅ ᴛʜᴏꜱᴇ ꜱᴍᴀʟʟ ᴍᴏᴍᴇɴᴛꜱ ᴍᴀᴅᴇ ᴛʜᴇ ᴊᴏᴜʀɴᴇʏ ᴡʜᴀᴛ ɪᴛ ᴡᴀꜱ. ᴛɪᴍᴇ ᴍᴀʏ ᴄʜᴀɴɢᴇ ᴏᴜʀ ʀᴏᴜᴛɪɴᴇꜱ, ʙᴜᴛ ᴛʜᴇ ᴍᴇᴍᴏʀɪᴇꜱ ᴡᴇ ᴍᴀᴅᴇ ᴛᴏɢᴇᴛʜᴇʀ ᴡɪʟʟ ᴀʟᴡᴀʏꜱ ʙᴇ ᴘᴀʀᴛ ᴏꜰ ᴛʜᴇ ᴏɢ ʟᴇɢᴇɴᴅꜱ. ❤️`}
async function openFriendLetter(p){activeLetterProfile=p;const all=await getAll('letters');const l=all.find(x=>x.id===p.id);$('letterTitle').textContent=`💌 ${p.n}`;$('letterText').value=l?.text||defaultLetter(p);$('letterDialog').showModal()}
$('saveLetterBtn').onclick=async()=>{if(!activeLetterProfile)return;await put('letters',{id:activeLetterProfile.id,text:$('letterText').value,updated:Date.now()});$('letterDialog').close()};

async function resolveMedia(id){
  if(id?.startsWith('builtin-photos-b')){const i=+id.split('-b').pop(),src=window.BUILTIN_MEDIA.photos?.[i];if(src)return {id,src,builtin:true,type:'photo',name:decodeURIComponent(src.split('/').pop())}}
  if(id?.startsWith('builtin-videos-b')){const i=+id.split('-b').pop(),src=window.BUILTIN_MEDIA.videos?.[i];if(src)return {id,src,builtin:true,type:'video',name:decodeURIComponent(src.split('/').pop())}}
  const media=await getAll('media');return media.find(x=>x.id===id)||null;
}

$('searchBtn').onclick_old=()=>{$('searchInput').value='';$('searchResults').innerHTML='<div class="empty-state">🔎 ᴛʏᴘᴇ ᴛᴏ ꜱᴇᴀʀᴄʜ ᴏᴜʀ ᴍᴇᴍᴏʀɪᴇꜱ</div>';$('searchDialog').showModal();setTimeout(()=>$('searchInput').focus(),80)};
$('searchInput').addEventListener('oldinput',async()=>{const q=$('searchInput').value.trim().toLowerCase(),host=$('searchResults');if(q.length<2){host.innerHTML='<div class="empty-state">ᴛʏᴘᴇ ᴀᴛ ʟᴇᴀꜱᴛ 2 ʟᴇᴛᴛᴇʀꜱ</div>';return}const profiles=await getAll('profiles'),journeys=await getAll('journeys'),metas=await getAll('mediaMeta');let out=[];profiles.forEach(p=>{if([p.n,p.nick,p.title,p.nature,p.special,p.memory].join(' ').toLowerCase().includes(q))out.push({kind:'profile',title:`👤 ${p.n}`,sub:p.title,id:p.id})});journeys.forEach(j=>{if([j.date,j.title,j.message].join(' ').toLowerCase().includes(q))out.push({kind:'journey',title:`📖 ${j.title}`,sub:j.date,id:j.id})});for(const type of ['photos','videos'])for(let i=0;i<(window.BUILTIN_MEDIA[type]||[]).length;i++){const src=window.BUILTIN_MEDIA[type][i],id=`builtin-${type}-b${i}`,m=metas.find(x=>x.id===id),text=[src,m?.date,m?.caption].join(' ').toLowerCase();if(text.includes(q))out.push({kind:type==='photos'?'photo':'video',title:`${type==='photos'?'📸':'🎬'} ${m?.caption||decodeURIComponent(src.split('/').pop())}`,sub:m?.date||'ᴍᴇᴅɪᴀ',id})}host.innerHTML='';if(!out.length){host.innerHTML='<div class="empty-state">ɴᴏ ᴍᴀᴛᴄʜɪɴɢ ᴍᴇᴍᴏʀɪᴇꜱ</div>';return}out.slice(0,80).forEach(r=>{const b=document.createElement('button');b.className='search-result';b.innerHTML=`<b>${r.title}</b><small>${r.sub||''}</small>`;b.onclick=async()=>{$('searchDialog').close();if(r.kind==='profile'){const arr=await getAll('profiles');activeProfiles=arr.sort((a,b)=>(a.order??9999)-(b.order??9999));openProfile(activeProfiles.findIndex(x=>x.id===r.id))}else if(r.kind==='journey'){showPage(2);setTimeout(()=>document.querySelector(`[data-journey-id="${r.id}"]`)?.scrollIntoView({behavior:'smooth'}),100)}else{const item=await resolveMedia(r.id);if(item)openViewer([item],0,item.type)}};host.appendChild(b)})});

$('favBtn').onclick=async()=>{await renderFavourites();$('favouritesDialog').showModal()};
async function renderFavourites(){const host=$('favouritesGrid'),favs=await getAll('favorites');host.innerHTML='';if(!favs.length){host.innerHTML='<div class="empty-state">♡ ɴᴏ ꜰᴀᴠᴏᴜʀɪᴛᴇꜱ ʏᴇᴛ</div>';return}for(const f of favs){const item=await resolveMedia(f.id);if(!item){await del('favorites',f.id);continue}const card=document.createElement('button');card.className='fav-card';const src=getViewerSrc(item);card.innerHTML=item.type==='photo'?`<img src="${src}" alt="${item.name||''}"><span>❤️ ${item.name||'ᴍᴇᴍᴏʀʏ'}</span>`:`<video src="${src}" muted preload="metadata"></video><span>❤️ ${item.name||'ᴠɪᴅᴇᴏ'}</span>`;card.onclick=()=>{$('favouritesDialog').close();openViewer([item],0,item.type)};host.appendChild(card)}}

$('toolsBtn').onclick=()=>{$('restoreList').hidden=true;$('toolsDialog').showModal()};
$('restoreBtn').onclick=renderRestoreCenter;
async function renderRestoreCenter(){const host=$('restoreList');host.hidden=false;host.innerHTML='';const rec=await getAll('recycle'),hidden=await getAll('hiddenMedia');const deletedKeys=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k?.startsWith('deleted_'))deletedKeys.push(k)};if(!rec.length&&!hidden.length&&!deletedKeys.length){host.innerHTML='<div class="empty-state">✅ ɴᴏᴛʜɪɴɢ ᴛᴏ ʀᴇꜱᴛᴏʀᴇ</div>';return}for(const r of rec){const row=document.createElement('div');row.className='restore-row';row.innerHTML=`<span>♻️ ${r.kind} • ${r.data?.name||r.data?.n||r.data?.title||r.originalId}</span><button class="mini-btn">ʀᴇꜱᴛᴏʀᴇ</button>`;row.querySelector('button').onclick=async()=>{if(r.kind==='profile')await put('profiles',r.data);else if(r.kind==='folder')await put('folders',r.data);else if(r.kind==='journey')await put('journeys',r.data);else if(r.kind==='media')await put('media',r.data);else if(r.kind==='hiddenMedia')await del('hiddenMedia',r.originalId);localStorage.removeItem('deleted_'+r.originalId);await del('recycle',r.id);await seedProfiles();await seedBuiltins();await seedJourneys();await renderPeople();await renderFolders();await renderJourney();await renderRestoreCenter();await updateV7Home()};host.appendChild(row)}for(const h of hidden){if(rec.some(r=>r.originalId===h.id))continue;const row=document.createElement('div');row.className='restore-row';row.innerHTML=`<span>🖼️ ʜɪᴅᴅᴇɴ ᴍᴇᴅɪᴀ • ${h.id}</span><button class="mini-btn">ʀᴇꜱᴛᴏʀᴇ</button>`;row.querySelector('button').onclick=async()=>{await del('hiddenMedia',h.id);renderRestoreCenter();renderFolders()};host.appendChild(row)}if(deletedKeys.length){const row=document.createElement('div');row.className='restore-row';row.innerHTML=`<span>🔄 ${deletedKeys.length} ʜɪᴅᴅᴇɴ ʙᴜɪʟᴛ-ɪɴ ɪᴛᴇᴍꜱ</span><button class="mini-btn">ʀᴇꜱᴛᴏʀᴇ ᴀʟʟ</button>`;row.querySelector('button').onclick=async()=>{deletedKeys.forEach(k=>localStorage.removeItem(k));await seedProfiles();await seedBuiltins();await seedJourneys();await renderPeople();await renderFolders();await renderJourney();renderRestoreCenter();updateV7Home()};host.appendChild(row)}}

function blobToDataURL(blob){return new Promise((res,rej)=>{const fr=new FileReader();fr.onload=()=>res(fr.result);fr.onerror=rej;fr.readAsDataURL(blob)})}
async function encodeValue(v){if(v instanceof Blob)return {__blob:true,type:v.type,data:await blobToDataURL(v)};if(Array.isArray(v))return Promise.all(v.map(encodeValue));if(v&&typeof v==='object'){const o={};for(const [k,val] of Object.entries(v))o[k]=await encodeValue(val);return o}return v}
function dataURLToBlob(s,type){const [head,b64]=s.split(','),bin=atob(b64),arr=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)arr[i]=bin.charCodeAt(i);return new Blob([arr],{type:type||head.match(/data:(.*?);/)?.[1]||''})}
async function decodeValue(v){if(v?.__blob)return dataURLToBlob(v.data,v.type);if(Array.isArray(v))return Promise.all(v.map(decodeValue));if(v&&typeof v==='object'){const o={};for(const [k,val] of Object.entries(v))o[k]=await decodeValue(val);return o}return v}
$('exportBtn').onclick=async()=>{const data={version:8,created:new Date().toISOString(),localStorage:{}};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k?.startsWith('deleted_')||k==='og_unlocked')data.localStorage[k]=localStorage.getItem(k)}for(const s of V7_STORES){if(DB.objectStoreNames.contains(s))data[s]=await encodeValue(await getAll(s))}const blob=new Blob([JSON.stringify(data)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='OG-Legends-Memories-Backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1500)};
$('importInput').onchange=async e=>{const file=e.target.files[0];if(!file)return;try{const data=JSON.parse(await file.text());for(const s of V7_STORES){if(!DB.objectStoreNames.contains(s)||!Array.isArray(data[s]))continue;const rows=await decodeValue(data[s]);const tx=DB.transaction(s,'readwrite'),st=tx.objectStore(s);st.clear();for(const row of rows)st.put(row);await new Promise(r=>{tx.oncomplete=r;tx.onerror=r;tx.onabort=r})}Object.entries(data.localStorage||{}).forEach(([k,v])=>localStorage.setItem(k,v));await seedProfiles();await seedBuiltins();await seedJourneys();await renderPeople();await renderFolders();await renderJourney();await updateV7Home();alert('✅ ʙᴀᴄᴋᴜᴘ ɪᴍᴘᴏʀᴛᴇᴅ')}catch{alert('❌ ɪɴᴠᴀʟɪᴅ ʙᴀᴄᴋᴜᴘ ꜰɪʟᴇ')}e.target.value=''};

async function initV7(){await updateV7Home();await renderReels();}

if($('memoryDayAdd'))$('memoryDayAdd').onclick=openMemoryDayPicker;
if($('memoryDayRandom'))$('memoryDayRandom').onclick=randomizeMemoryDay;

// V7.5 — message button is UI-only for now; chat wiring will be added later.
$('messageBtn')?.addEventListener('click',()=>{});

// V7.7 — unified mobile + desktop navigation and local Reels creator.
$('mobileHomeBtn')?.addEventListener('click',()=>showPage(0));
$('mobileSearchBtn')?.addEventListener('click',()=>$('searchBtn')?.click());
// favourites moved to settings
$('mobileSettingsBtn')?.addEventListener('click',()=>$('toolsBtn')?.click());
// Reels routing is attached in the social section below.
$('reelsCreateTop')?.addEventListener('click',openReelCreator);
// V7.8 create below

async function getReelProfile(){
  if(!DB?.objectStoreNames.contains('reelProfile'))return null;
  const rows=await getAll('reelProfile');return rows.find(x=>x.id==='default')||null;
}
async function openReelCreator(){
  const profile=await getReelProfile();
  $('reelUsername').value=profile?.username||localStorage.getItem('og_reel_username')||'';
  $('reelDpInput').value='';$('reelVideoInput').value='';$('reelCaption').value='';
  $('reelProfileHint').textContent=profile?.dpBlob?'✅ ʏᴏᴜʀ ꜱᴀᴠᴇᴅ ᴅᴘ ᴡɪʟʟ ʙᴇ ᴜꜱᴇᴅ ɪꜰ ʏᴏᴜ ᴅᴏ ɴᴏᴛ ᴄʜᴏᴏꜱᴇ ᴀ ɴᴇᴡ ᴏɴᴇ.':'ᴜꜱᴇʀɴᴀᴍᴇ + ᴅᴘ ᴡɪʟʟ ʙᴇ ʀᴇᴍᴇᴍʙᴇʀᴇᴅ ᴏɴ ᴛʜɪꜱ ᴅᴇᴠɪᴄᴇ.';
  $('createReelDialog').showModal();
}
$('createReelForm')?.addEventListener('submit',async e=>{
  e.preventDefault();
  const username=$('reelUsername').value.trim().replace(/^@+/,'');
  const video=$('reelVideoInput').files[0];
  const newDp=$('reelDpInput').files[0]||null;
  if(!username||!video)return;
  const old=await getReelProfile();
  const dpBlob=newDp||old?.dpBlob||null;
  await put('reelProfile',{id:'default',username,dpBlob,updated:Date.now()});
  localStorage.setItem('og_reel_username',username);
  await put('reels',{id:'reel-'+Date.now()+'-'+Math.random().toString(36).slice(2),username,caption:$('reelCaption').value.trim(),videoBlob:video,dpBlob,created:Date.now(),liked:false});
  e.target.reset();$('createReelDialog').close();
  showPage(pageEls.findIndex(p=>p.id==='reelsPage'));await renderReels();
});

async function renderReels(){
  if(!DB?.objectStoreNames.contains('reels')||!$('reelsFeed'))return;
  const host=$('reelsFeed'),rows=(await getAll('reels')).sort((a,b)=>(b.created||0)-(a.created||0));
  host.innerHTML='';
  if(!rows.length){host.innerHTML='<div class="empty-state reel-empty">🎬 ɴᴏ ʀᴇᴇʟꜱ ʏᴇᴛ<br><small>ᴛᴀᴘ ＋ ᴄʀᴇᴀᴛᴇ ᴛᴏ ᴘᴏꜱᴛ ʏᴏᴜʀ ꜰɪʀꜱᴛ ʀᴇᴇʟ.</small></div>';return}
  rows.forEach(r=>{
    const card=document.createElement('article');card.className='reel-card glass';
    const videoUrl=URL.createObjectURL(r.videoBlob),dpUrl=r.dpBlob?URL.createObjectURL(r.dpBlob):'assets/common.jpg';
    const safeUser=String(r.username||'oglegend').replace(/[<>]/g,'');
    const safeCaption=String(r.caption||'').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    card.innerHTML=`<div class="reel-video-wrap"><video src="${videoUrl}" controls playsinline loop preload="metadata"></video><div class="reel-actions"><button class="reel-like" type="button">${r.liked?'♥':'♡'}</button><button class="reel-share" type="button">📤</button></div><div class="reel-owner"><img src="${dpUrl}" alt="DP"><div><b>@${safeUser}</b>${safeCaption?`<p>${safeCaption}</p>`:''}</div></div></div>`;
    card.querySelector('.reel-like').onclick=async()=>{r.liked=!r.liked;await put('reels',r);card.querySelector('.reel-like').textContent=r.liked?'♥':'♡'};
    card.querySelector('.reel-share').onclick=async()=>{try{if(navigator.share){const file=new File([r.videoBlob],`reel-${r.id}.mp4`,{type:r.videoBlob.type||'video/mp4'});const data={title:`@${safeUser}`,text:r.caption||'ᴏᴜʀ ʀᴇᴇʟ'};if(navigator.canShare?.({files:[file]}))data.files=[file];await navigator.share(data)}}catch{}};
    host.appendChild(card);
  });
}

// V7.8 — local user access + social reels/posts
let currentLocalUser=null,createKind='reel',createFile=null,reelObserver=null;
const normUser=s=>(s||'').trim().toLowerCase().replace(/^@+/,'').replace(/[^a-z0-9._]/g,'');
function escapeHtml(v){return String(v??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;').replace(/'/g,'&#039;')}

async function hashPw(s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
function waitDB(){return new Promise(r=>{let t=setInterval(()=>{if(DB){clearInterval(t);r()}},50)})}
function gate(show=true){const g=$('userGate');if(!g)return;g.hidden=!show;g.style.display=show?'grid':'none';$('siteShell').classList.toggle('auth-blur',show);if(show)pauseMusicForExit();else tryPlayMusic()}
async function askUser(){await waitDB();currentLocalUser=null;updateAccountUI();gate(true)}
const openSiteBeforeUser=openSite;openSite=function(){openSiteBeforeUser();setTimeout(askUser,120)};
if(localStorage.getItem('og_unlocked')==='1')setTimeout(askUser,200);
$('showLogin').onclick=()=>{$('localLoginForm').hidden=false;$('localRegisterForm').hidden=true;$('userGateError').textContent=''};
$('showRegister').onclick=()=>{$('localLoginForm').hidden=true;$('localRegisterForm').hidden=false;$('userGateError').textContent=''};
$('localRegisterForm').onsubmit=async e=>{e.preventDefault();const err=$('userGateError');err.textContent='';try{await waitDB();if(!DB.objectStoreNames.contains('users'))throw new Error('users store missing');let username=normUser($('registerUsername').value),pw=$('registerPassword').value,name=$('registerName').value.trim();if(!name)return err.textContent='❌ ᴅɪꜱᴘʟᴀʏ ɴᴀᴍᴇ ʀᴇQᴜɪʀᴇᴅ';if(username.length<3)return err.textContent='❌ ᴜꜱᴇʀɴᴀᴍᴇ ᴛᴏᴏ ꜱʜᴏʀᴛ';if(pw.length<4)return err.textContent='❌ ᴘᴀꜱꜱᴡᴏʀᴅ ᴍɪɴɪᴍᴜᴍ 4 ᴄʜᴀʀᴀᴄᴛᴇʀꜱ';if(pw!==$('registerConfirm').value)return err.textContent='❌ ᴘᴀꜱꜱᴡᴏʀᴅꜱ ᴅᴏ ɴᴏᴛ ᴍᴀᴛᴄʜ';if((await getAll('users')).some(u=>u.username===username))return err.textContent='❌ @ᴜꜱᴇʀɴᴀᴍᴇ ᴀʟʀᴇᴀᴅʏ ᴇxɪꜱᴛꜱ';const dpFile=$('registerDp').files[0]||null;currentLocalUser={username,userId:'OG'+Date.now().toString(36).toUpperCase(),name,passwordHash:await hashPw(pw),dpData:await fileToDataURL(dpFile),created:Date.now()};await put('users',currentLocalUser);updateAccountUI();gate(false);e.target.reset();showPage(0)}catch(ex){console.error('Create user failed:',ex);err.textContent='❌ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴄʀᴇᴀᴛᴇ ᴜꜱᴇʀ • ʀᴇʟᴏᴀᴅ ᴀɴᴅ ᴛʀʏ ᴀɢᴀɪɴ'}};
$('localLoginForm').onsubmit=async e=>{e.preventDefault();const err=$('userGateError');err.textContent='';try{await waitDB();if(!DB.objectStoreNames.contains('users'))throw new Error('users store missing');let username=normUser($('loginUsername').value),u=(await getAll('users')).find(x=>x.username===username);if(!u||u.passwordHash!==await hashPw($('loginPassword').value))return err.textContent='❌ ᴡʀᴏɴɢ ᴜꜱᴇʀɴᴀᴍᴇ ᴏʀ ᴘᴀꜱꜱᴡᴏʀᴅ';currentLocalUser=u;updateAccountUI();gate(false);e.target.reset();showPage(0)}catch(ex){console.error('Login failed:',ex);err.textContent='❌ ʟᴏɢɪɴ ꜱʏꜱᴛᴇᴍ ᴇʀʀᴏʀ • ʀᴇʟᴏᴀᴅ ᴀɴᴅ ᴛʀʏ ᴀɢᴀɪɴ'}};
function fileToDataURL(file){return new Promise((resolve,reject)=>{if(!file)return resolve('');const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(file)})}
function dpUrl(u){return u?.dpData||(u?.dpBlob?URL.createObjectURL(u.dpBlob):'assets/common.jpg')}
function updateAccountUI(){
  const b=$('profileNavBtn'); if(!b)return;
  if(currentLocalUser){b.innerHTML=`<img class="nav-profile-dp" src="${dpUrl(currentLocalUser)}" alt="DP"><span>ᴘʀᴏꜰɪʟᴇ</span>`; b.title='@'+currentLocalUser.username;}
  else b.innerHTML='👤 <span>ᴘʀᴏꜰɪʟᴇ</span>';
}
async function openReelsPage(focus){
  if(!currentLocalUser)return gate(true);
  pauseBackgroundMusic();
  document.body.classList.add('reels-mode');
  pageEls.forEach(p=>p.classList.toggle('active',p.id==='reelsPage'));
  currentPage=pageEls.findIndex(p=>p.id==='reelsPage');
  [...dots.children].forEach(d=>d.classList.remove('active'));
  $('prevBtn').disabled=true;$('nextBtn').disabled=true;
  await renderSocialReels(focus);
}
function stopAllReels(){
  document.querySelectorAll('#reelsFeed video').forEach(v=>{try{v.pause();v.currentTime=0}catch{}});
}
function leaveReelsMode(){
  if(!document.body.classList.contains('reels-mode'))return;
  stopAllReels();document.body.classList.remove('reels-mode');
  tryPlayMusic();
}
function rememberUser(id){let a=JSON.parse(localStorage.getItem('og_recent_users')||'[]').filter(x=>x!==id);a.unshift(id);localStorage.setItem('og_recent_users',JSON.stringify(a.slice(0,8)))}
async function openSocialProfile(name){
  try{
    // Profile is a normal social screen, not a reel player: stop reel audio first.
    leaveReelsMode();
    await waitDB();
    const u=(await getAll('users')).find(x=>x.username===normUser(name));
    if(!u){alert('❌ ᴜꜱᴇʀ ᴘʀᴏꜰɪʟᴇ ɴᴏᴛ ꜰᴏᴜɴᴅ');return}
    rememberUser(u.username);
    const reels=(await getAll('reels')).filter(x=>x.username===u.username).sort((a,b)=>(b.created||0)-(a.created||0));
    const posts=(await getAll('posts')).filter(x=>x.username===u.username).sort((a,b)=>(b.created||0)-(a.created||0));
    const own=currentLocalUser?.username===u.username;
    const dlg=$('userProfileDialog'), b=$('userProfileBody');
    b.innerHTML=`<div class="social-profile-page">
      <div class="social-profile-topbar"><button class="profile-back" type="button">←</button><b>@${escapeHtml(u.username)}</b><span></span></div>
      <div class="social-profile-head"><img src="${dpUrl(u)}" alt="${escapeHtml(u.name||u.username)} DP"><div><h2>${escapeHtml(u.name||u.username)}</h2><b>@${escapeHtml(u.username)}</b><small>ɪᴅ • ${escapeHtml(u.userId||'LOCAL')}</small></div></div>
      <div class="social-counts"><span><b>${posts.length}</b><small>ᴘᴏꜱᴛꜱ</small></span><span><b>${reels.length}</b><small>ʀᴇᴇʟꜱ</small></span></div>
      ${own?'<button class="mini-btn profile-edit-btn" type="button">✏️ ᴇᴅɪᴛ ᴘʀᴏꜰɪʟᴇ</button>':''}
      <div class="social-tabs"><button class="active" data-tab="reels">🎬 ʀᴇᴇʟꜱ</button><button data-tab="posts">🖼️ ᴘᴏꜱᴛꜱ</button></div>
      <div class="social-tab-panel reels-panel"><div class="profile-reel-grid">${reels.map(r=>`<button data-r="${r.id}" title="Open reel"><span>▶</span></button>`).join('')||'<small>ɴᴏ ʀᴇᴇʟꜱ ʏᴇᴛ</small>'}</div></div>
      <div class="social-tab-panel posts-panel" hidden><div class="profile-post-grid"></div></div>
    </div>`;
    const pg=b.querySelector('.profile-post-grid');
    posts.forEach(p=>{const im=document.createElement('img');im.src=URL.createObjectURL(p.mediaBlob);im.alt=p.caption||'post';im.onclick=()=>openViewer([{id:p.id,src:im.src,builtin:true,type:'photo',name:p.caption||'post'}],0,'photo');pg.appendChild(im)});
    b.querySelector('.profile-back').onclick=()=>dlg.close();
    b.querySelectorAll('.social-tabs button').forEach(btn=>btn.onclick=()=>{b.querySelectorAll('.social-tabs button').forEach(x=>x.classList.toggle('active',x===btn));b.querySelector('.reels-panel').hidden=btn.dataset.tab!=='reels';b.querySelector('.posts-panel').hidden=btn.dataset.tab!=='posts'});
    b.querySelectorAll('[data-r]').forEach(x=>x.onclick=()=>{dlg.close();openReelsPage(x.dataset.r)});
    b.querySelector('.profile-edit-btn')?.addEventListener('click',()=>alert('✏️ ᴇᴅɪᴛ ᴘʀᴏꜰɪʟᴇ ᴡɪʟʟ ʙᴇ ᴀᴅᴅᴇᴅ ɴᴇxᴛ'));
    if(dlg.open)dlg.close(); dlg.showModal();
  }catch(ex){console.error('Profile open failed:',ex);alert('❌ ᴘʀᴏꜰɪʟᴇ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴏᴘᴇɴ')}
}
$('profileNavBtn')?.addEventListener('click',()=>{if(!currentLocalUser)return gate(true);openSocialProfile(currentLocalUser.username)});
function userBtn(u){let b=document.createElement('button');b.className='search-result user-search-result';b.innerHTML=`<img src="${dpUrl(u)}"><span><b>@${escapeHtml(u.username)}</b><small>${escapeHtml(u.name||'')} • ${escapeHtml(u.userId)}</small></span>`;b.onclick=()=>{$('searchDialog').close();openSocialProfile(u.username)};return b}
async function recentUsers(){let h=$('recentUsers');h.innerHTML='';let users=await getAll('users');JSON.parse(localStorage.getItem('og_recent_users')||'[]').map(id=>users.find(u=>u.username===id)).filter(Boolean).forEach(u=>h.appendChild(userBtn(u)))}
$('searchBtn').onclick=()=>{$('searchInput').value='';$('searchResults').innerHTML='';recentUsers();$('searchDialog').showModal()};
$('searchInput').oninput=async()=>{let raw=$('searchInput').value.trim().toLowerCase(),q=normUser(raw),h=$('searchResults');h.innerHTML='';if(!raw)return;(await getAll('users')).filter(u=>u.username.includes(q)||(u.userId||'').toLowerCase().includes(raw)).forEach(u=>h.appendChild(userBtn(u)));if(!h.children.length)h.innerHTML='<div class="empty-state">ɴᴏ ᴜꜱᴇʀ ꜰᴏᴜɴᴅ</div>'};
// favourites in settings; profile takes bottom slot
$('toolsBtn').onclick=()=>{$('toolsDialog').showModal();if(!$('v78FavInTools')){let b=document.createElement('button');b.id='v78FavInTools';b.className='tool-card';b.innerHTML='❤️<b>ꜰᴀᴠᴏᴜʀɪᴛᴇꜱ</b><small>ᴏᴘᴇɴ ꜱᴀᴠᴇᴅ ᴍᴇᴍᴏʀɪᴇꜱ</small>';b.onclick=()=>{$('toolsDialog').close();$('favBtn').click()};$('toolsDialog').querySelector('.tool-grid').prepend(b)}};
// Create: choose media first -> preview -> optional caption -> post
function resetCreate(){createFile=null;$('createStep1').hidden=false;$('createStep2').hidden=true;$('createStep3').hidden=true;$('createPreview').innerHTML='';$('createCaption').value=''}
$('createReelBtn')?.addEventListener('click',()=>{if(!currentLocalUser)return gate(true);resetCreate();$('createReelDialog').showModal()});
function choose(kind){createKind=kind;$('createStep1').hidden=true;$('createStep2').hidden=false;let i=$('createMediaInput');i.accept=kind==='reel'?'video/*':'image/*';i.value='';i.click()}
$('chooseReelBtn').onclick=()=>choose('reel');$('choosePostBtn').onclick=()=>choose('post');
$('createMediaInput').onchange=()=>{createFile=$('createMediaInput').files[0]||null;let h=$('createPreview');h.innerHTML='';if(!createFile)return;let u=URL.createObjectURL(createFile);h.innerHTML=createKind==='reel'?`<video src="${u}" controls playsinline></video>`:`<img src="${u}">`};
$('createMediaNext').onclick=()=>{if(!createFile)return $('createMediaInput').click();$('createStep2').hidden=true;$('createStep3').hidden=false};
$('publishCreate').onclick=async()=>{if(!createFile||!currentLocalUser)return;let x={id:(createKind==='reel'?'reel-':'post-')+Date.now(),username:currentLocalUser.username,caption:$('createCaption').value.trim(),created:Date.now(),liked:false};if(createKind==='reel'){x.videoBlob=createFile;await put('reels',x)}else{x.mediaBlob=createFile;await put('posts',x)}$('createReelDialog').close();if(createKind==='reel'){openReelsPage()}else openSocialProfile(currentLocalUser.username)};
async function dl(blob,name){let a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1200)}
async function renderSocialReels(focus){
  const h=$('reelsFeed'),rows=(await getAll('reels')).sort((a,b)=>(b.created||0)-(a.created||0)),users=await getAll('users');
  h.innerHTML='';
  if(!rows.length){h.innerHTML='<div class="empty-state reel-empty-full">🎬 ɴᴏ ʀᴇᴇʟꜱ ʏᴇᴛ<br><small>＋ ᴄʀᴇᴀᴛᴇ ꜰʀᴏᴍ ᴛʜᴇ ʙᴏᴛᴛᴏᴍ ʙᴀʀ</small></div>';return}
  rows.forEach(r=>{
    const u=users.find(x=>x.username===r.username)||{username:r.username,name:r.username};
    const own=currentLocalUser?.username===r.username;
    const c=document.createElement('article');c.className='reel-card reel-full';c.dataset.id=r.id;
    c.innerHTML=`<div class="reel-video-wrap"><video src="${URL.createObjectURL(r.videoBlob)}" playsinline loop preload="metadata"></video>
      <div class="reel-actions"><button class="like" type="button">${r.liked?'♥':'♡'}</button><button class="comment" type="button">💬</button><button class="share" type="button">📤</button><button class="down" type="button">⬇</button><button class="more" type="button">⋮</button></div>
      <button class="reel-owner" type="button"><img src="${dpUrl(u)}"><div><b>@${escapeHtml(u.username)}</b>${r.caption?`<p>${escapeHtml(r.caption)}</p>`:''}</div></button>
      <div class="reel-more-menu" hidden>${own?'<button class="delete-reel" type="button">🗑️ ᴅᴇʟᴇᴛᴇ ʀᴇᴇʟ</button>':''}<button class="cancel-more" type="button">✕ ᴄʟᴏꜱᴇ</button></div>
    </div>`;
    c.querySelector('.reel-owner').onclick=()=>openSocialProfile(u.username);
    c.querySelector('.like').onclick=async()=>{r.liked=!r.liked;await put('reels',r);c.querySelector('.like').textContent=r.liked?'♥':'♡'};
    c.querySelector('.comment').onclick=()=>alert('💬 ᴄᴏᴍᴍᴇɴᴛꜱ ᴡɪʟʟ ʙᴇ ᴀᴅᴅᴇᴅ ᴡɪᴛʜ ᴍᴇꜱꜱᴀɢɪɴɢ');
    c.querySelector('.down').onclick=()=>dl(r.videoBlob,`@${u.username}-reel.mp4`);
    c.querySelector('.share').onclick=async()=>{try{if(navigator.share){const f=new File([r.videoBlob],`@${u.username}-reel.mp4`,{type:r.videoBlob.type||'video/mp4'});const data={title:`@${u.username}`,text:r.caption||''};if(navigator.canShare?.({files:[f]}))data.files=[f];await navigator.share(data)}}catch{}};
    const menu=c.querySelector('.reel-more-menu');c.querySelector('.more').onclick=()=>menu.hidden=!menu.hidden;c.querySelector('.cancel-more').onclick=()=>menu.hidden=true;
    c.querySelector('.delete-reel')?.addEventListener('click',async()=>{if(!confirm('Delete this reel?'))return;await del('reels',r.id);await renderSocialReels();});
    h.appendChild(c);
  });
  reelObserver?.disconnect();
  reelObserver=new IntersectionObserver(entries=>entries.forEach(e=>{const v=e.target.querySelector('video');if(e.isIntersecting&&e.intersectionRatio>=.72){pauseBackgroundMusic();h.querySelectorAll('video').forEach(o=>{if(o!==v){o.pause();o.currentTime=0}});if(v.paused){v.currentTime=0;v.play().catch(()=>{})}}else{v.pause();if(e.intersectionRatio<.2)v.currentTime=0}}),{root:h,threshold:[0,.2,.72,1]});
  h.querySelectorAll('.reel-card').forEach(c=>reelObserver.observe(c));
  if(focus)setTimeout(()=>h.querySelector(`[data-id="${focus}"]`)?.scrollIntoView({block:'start'}),80);
}
// Reels are intentionally outside the normal PREV/NEXT page sequence.
$('reelsBtn')?.addEventListener('click',()=>openReelsPage());
// slideshow remains in folder header only, not viewer
if($('viewerSlideshow'))$('viewerSlideshow').style.display='none';

// V7.8.3 social screen routing
['mobileHomeBtn','mobileSearchBtn','createReelBtn','profileNavBtn'].forEach(id=>{const el=$(id);if(!el)return;el.addEventListener('click',()=>{if(id!=='profileNavBtn')leaveReelsMode()},{capture:true})});
const _showPageSocial=showPage;showPage=function(i){leaveReelsMode();return _showPageSocial(i)};
