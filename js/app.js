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
  if(currentPage<=NORMAL_LAST_PAGE){
    localStorage.setItem('og_last_view','page');
    localStorage.setItem('og_last_page',String(currentPage));
  }
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
function pauseAllForegroundVideo(resetReels=false){
  document.querySelectorAll('#reelsFeed video,#viewerStage video,.chat-media').forEach(v=>{
    if(v.tagName!=='VIDEO')return;
    try{v.pause();if(resetReels&&v.closest('#reelsFeed'))v.currentTime=0}catch{}
  });
}
function stopAllReels(){
  document.querySelectorAll('#reelsFeed video').forEach(v=>{try{v.pause();v.currentTime=0;v.muted=false}catch{}});
}
function reelOverlayOpen(){return !!document.querySelector('#commentsDialog[open],#messagesDialog[open],#userProfileDialog[open],#createReelDialog[open],#editUserDialog[open]')}
function canResumeReel(){return document.body.classList.contains('reels-mode')&&!document.hidden&&!reelOverlayOpen()}
function resumeActiveReel(){
  if(!canResumeReel())return;
  pauseBackgroundMusic();
  const cards=[...document.querySelectorAll('#reelsFeed .reel-card')];
  let best=null,bestRatio=0;
  cards.forEach(c=>{const r=c.getBoundingClientRect();const vis=Math.max(0,Math.min(r.bottom,innerHeight)-Math.max(r.top,0));const ratio=r.height?vis/r.height:0;if(ratio>bestRatio){bestRatio=ratio;best=c}});
  const active=best?.querySelector('video');
  document.querySelectorAll('#reelsFeed video').forEach(v=>{if(v!==active){try{v.pause();v.currentTime=0}catch{}}});
  if(active){pauseBackgroundMusic();active.muted=false;active.play().catch(()=>{})}
}
window.addEventListener('pagehide',()=>{pauseBackgroundMusic();pauseAllForegroundVideo()});
window.addEventListener('beforeunload',()=>{pauseBackgroundMusic();pauseAllForegroundVideo()});
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){pauseBackgroundMusic();pauseAllForegroundVideo(false);return;}
  const unlocked=$('siteShell') && !$('siteShell').hidden && $('siteShell').style.display!=='none';
  if(!unlocked)return;
  if(canResumeReel()) resumeActiveReel();
  else if(!document.body.classList.contains('reels-mode')) tryPlayMusic();
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
const PIN_TAB_KEY='og_pin_unlocked_tab';
function unlock(){
  const pin=$('pinInput').value.trim();
  if(pin!==SITE_PIN){
    $('pinError').textContent='❌ ᴡʀᴏɴɢ ᴘɪɴ';
    const card=document.querySelector('.lock-card');
    card.classList.remove('shake');void card.offsetWidth;card.classList.add('shake');return;
  }
  // sessionStorage survives refresh in this tab, but a new tab must enter the PIN again.
  sessionStorage.setItem(PIN_TAB_KEY,'1');
  openSite();
}
function lockSite(){
  sessionStorage.removeItem(PIN_TAB_KEY);
  stopAllReels?.();pauseAllForegroundVideo();pauseBackgroundMusic();
  $('siteShell').hidden=true;$('siteShell').style.display='none';
  $('lockScreen').hidden=false;$('lockScreen').style.display='grid';
  $('pinInput').value='';$('pinError').textContent='';
}
$('unlockBtn').onclick=unlock;
$('pinInput').addEventListener('keydown',e=>{if(e.key==='Enter')unlock()});
$('pinInput').addEventListener('input',()=>{$('pinError').textContent=''});
$('togglePin').onclick=()=>{const i=$('pinInput');i.type=i.type==='password'?'text':'password'};
$('pinInput').type='password';
$('lockBtn').onclick=lockSite;
if(sessionStorage.getItem(PIN_TAB_KEY)==='1') openSite();

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
const req=indexedDB.open('ogLegendsMemories',14);
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
  if(!db.objectStoreNames.contains('messages'))db.createObjectStore('messages',{keyPath:'id'});
  if(!db.objectStoreNames.contains('comments'))db.createObjectStore('comments',{keyPath:'id'});
  if(!db.objectStoreNames.contains('activity'))db.createObjectStore('activity',{keyPath:'id'});
  if(!db.objectStoreNames.contains('groups'))db.createObjectStore('groups',{keyPath:'id'});
  if(!db.objectStoreNames.contains('groupMessages'))db.createObjectStore('groupMessages',{keyPath:'id'});
  if(!db.objectStoreNames.contains('channels'))db.createObjectStore('channels',{keyPath:'id'});
  if(!db.objectStoreNames.contains('channelPosts'))db.createObjectStore('channelPosts',{keyPath:'id'});
  if(!db.objectStoreNames.contains('follows'))db.createObjectStore('follows',{keyPath:'id'});
  if(!db.objectStoreNames.contains('postComments'))db.createObjectStore('postComments',{keyPath:'id'});
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
const V7_STORES=['profiles','folders','media','journeys','hiddenMedia','favorites','mediaMeta','letters','recycle','reels','reelProfile','users','posts','messages','comments','activity','groups','groupMessages','channels','channelPosts'];

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
const SESSION_USER_KEY='og_current_user';
async function restoreLastView(){
  const view=localStorage.getItem('og_last_view')||'page';
  if(view==='messages'){setTimeout(()=>openMessages(),80);return}
  if(view==='reels'){setTimeout(()=>openReelsPage(),80);return}
  if(view.startsWith('profile:')){const u=view.slice(8);setTimeout(()=>openSocialProfile(u),80);return}
  const p=parseInt(localStorage.getItem('og_last_page')||'0',10);showPage(Number.isFinite(p)?p:0);
}
async function askUser(){
  await waitDB();
  const saved=localStorage.getItem(SESSION_USER_KEY);
  if(saved){
    const u=(await getAll('users')).find(x=>x.username===saved);
    if(u){currentLocalUser=u;updateAccountUI();gate(false);await restoreLastView();return}
    localStorage.removeItem(SESSION_USER_KEY);
  }
  currentLocalUser=null;updateAccountUI();gate(true)
}
const openSiteBeforeUser=openSite;openSite=function(){openSiteBeforeUser();setTimeout(askUser,120)};
if(sessionStorage.getItem(PIN_TAB_KEY)==='1')setTimeout(askUser,200);
$('showLogin').onclick=()=>{$('localLoginForm').hidden=false;$('localRegisterForm').hidden=true;$('userGateError').textContent=''};
$('showRegister').onclick=()=>{$('localLoginForm').hidden=true;$('localRegisterForm').hidden=false;$('userGateError').textContent=''};
$('localRegisterForm').onsubmit=async e=>{e.preventDefault();const err=$('userGateError');err.textContent='';try{await waitDB();if(!DB.objectStoreNames.contains('users'))throw new Error('users store missing');let username=normUser($('registerUsername').value),pw=$('registerPassword').value,name=$('registerName').value.trim();if(!name)return err.textContent='❌ ᴅɪꜱᴘʟᴀʏ ɴᴀᴍᴇ ʀᴇQᴜɪʀᴇᴅ';if(username.length<3)return err.textContent='❌ ᴜꜱᴇʀɴᴀᴍᴇ ᴛᴏᴏ ꜱʜᴏʀᴛ';if(pw.length<4)return err.textContent='❌ ᴘᴀꜱꜱᴡᴏʀᴅ ᴍɪɴɪᴍᴜᴍ 4 ᴄʜᴀʀᴀᴄᴛᴇʀꜱ';if(pw!==$('registerConfirm').value)return err.textContent='❌ ᴘᴀꜱꜱᴡᴏʀᴅꜱ ᴅᴏ ɴᴏᴛ ᴍᴀᴛᴄʜ';const existingUsers=await getAll('users');if(existingUsers.some(u=>u.username===username))return err.textContent='❌ @ᴜꜱᴇʀɴᴀᴍᴇ ᴀʟʀᴇᴀᴅʏ ᴇxɪꜱᴛꜱ';if(username==='valorrehan')return err.textContent='🛡️ @ᴠᴀʟᴏʀʀᴇʜᴀɴ ɪꜱ ʀᴇꜱᴇʀᴠᴇᴅ ꜰᴏʀ ᴛʜᴇ ᴀᴅᴍɪɴ';const dpFile=$('registerDp').files[0]||null;currentLocalUser={username,userId:'OG'+Date.now().toString(36).toUpperCase(),name,passwordHash:await hashPw(pw),dpData:await fileToDataURL(dpFile),created:Date.now()};await put('users',currentLocalUser);localStorage.setItem(SESSION_USER_KEY,currentLocalUser.username);updateAccountUI();gate(false);e.target.reset();showPage(0)}catch(ex){console.error('Create user failed:',ex);err.textContent='❌ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴄʀᴇᴀᴛᴇ ᴜꜱᴇʀ • ʀᴇʟᴏᴀᴅ ᴀɴᴅ ᴛʀʏ ᴀɢᴀɪɴ'}};
$('localLoginForm').onsubmit=async e=>{e.preventDefault();const err=$('userGateError');err.textContent='';try{await waitDB();if(!DB.objectStoreNames.contains('users'))throw new Error('users store missing');let username=normUser($('loginUsername').value),u=(await getAll('users')).find(x=>x.username===username);if(!u||u.passwordHash!==await hashPw($('loginPassword').value))return err.textContent='❌ ᴡʀᴏɴɢ ᴜꜱᴇʀɴᴀᴍᴇ ᴏʀ ᴘᴀꜱꜱᴡᴏʀᴅ';currentLocalUser=u;localStorage.setItem(SESSION_USER_KEY,u.username);updateAccountUI();gate(false);e.target.reset();showPage(0)}catch(ex){console.error('Login failed:',ex);err.textContent='❌ ʟᴏɢɪɴ ꜱʏꜱᴛᴇᴍ ᴇʀʀᴏʀ • ʀᴇʟᴏᴀᴅ ᴀɴᴅ ᴛʀʏ ᴀɢᴀɪɴ'}};
function fileToDataURL(file){return new Promise((resolve,reject)=>{if(!file)return resolve('');const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(file)})}
function dpUrl(u){return u?.dpData||(u?.dpBlob?URL.createObjectURL(u.dpBlob):'assets/common.jpg')}
function updateAccountUI(){
  const b=$('profileNavBtn'); if(!b)return;
  if(currentLocalUser){b.innerHTML=`<img class="nav-profile-dp" src="${dpUrl(currentLocalUser)}" alt="DP"><span>ᴘʀᴏꜰɪʟᴇ</span>`; b.title='@'+currentLocalUser.username;}
  else b.innerHTML='👤 <span>ᴘʀᴏꜰɪʟᴇ</span>';
}
async function openReelsPage(focus){
  if(!currentLocalUser)return gate(true);
  localStorage.setItem('og_last_view','reels');
  pauseBackgroundMusic();
  document.body.classList.add('reels-mode');
  pageEls.forEach(p=>p.classList.toggle('active',p.id==='reelsPage'));
  currentPage=pageEls.findIndex(p=>p.id==='reelsPage');
  [...dots.children].forEach(d=>d.classList.remove('active'));
  $('prevBtn').disabled=true;$('nextBtn').disabled=true;
  await renderSocialReels(focus);
}
function leaveReelsMode(){
  stopAllReels();
  if(!document.body.classList.contains('reels-mode'))return;
  document.body.classList.remove('reels-mode');
  if(!document.hidden)tryPlayMusic();
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
    localStorage.setItem('og_last_view','profile:'+u.username);
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
    b.querySelector('.profile-back').onclick=()=>{localStorage.setItem('og_last_view','page');dlg.close()};
    b.querySelectorAll('.social-tabs button').forEach(btn=>btn.onclick=()=>{b.querySelectorAll('.social-tabs button').forEach(x=>x.classList.toggle('active',x===btn));b.querySelector('.reels-panel').hidden=btn.dataset.tab!=='reels';b.querySelector('.posts-panel').hidden=btn.dataset.tab!=='posts'});
    b.querySelectorAll('[data-r]').forEach(x=>x.onclick=()=>{dlg.close();openReelsPage(x.dataset.r)});
    b.querySelector('.profile-edit-btn')?.addEventListener('click',()=>openEditUserProfile());
    if(dlg.open)dlg.close(); dlg.showModal();
  }catch(ex){console.error('Profile open failed:',ex);alert('❌ ᴘʀᴏꜰɪʟᴇ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴏᴘᴇɴ')}
}
$('profileNavBtn')?.addEventListener('click',()=>{if(!currentLocalUser)return gate(true);openSocialProfile(currentLocalUser.username)});
function userBtn(u){let b=document.createElement('button');b.className='search-result user-search-result';b.innerHTML=`<img src="${dpUrl(u)}"><span><b>@${escapeHtml(u.username)}</b><small>${escapeHtml(u.name||'')} • ${escapeHtml(u.userId)}</small></span>`;b.onclick=()=>{$('searchDialog').close();openSocialProfile(u.username)};return b}
async function recentUsers(){let h=$('recentUsers');h.innerHTML='';let users=await getAll('users');JSON.parse(localStorage.getItem('og_recent_users')||'[]').map(id=>users.find(u=>u.username===id)).filter(Boolean).forEach(u=>h.appendChild(userBtn(u)))}
$('searchBtn').onclick=()=>{$('searchInput').value='';$('searchResults').innerHTML='';recentUsers();$('searchDialog').showModal()};
$('searchInput').oninput=async()=>{let raw=$('searchInput').value.trim().toLowerCase(),q=normUser(raw),h=$('searchResults');h.innerHTML='';if(!raw)return;(await getAll('users')).filter(u=>u.username.includes(q)||(u.userId||'').toLowerCase().includes(raw)).forEach(u=>h.appendChild(userBtn(u)));if(!h.children.length)h.innerHTML='<div class="empty-state">ɴᴏ ᴜꜱᴇʀ ꜰᴏᴜɴᴅ</div>'};

$('toolsBtn')?.addEventListener('click',()=>{if(document.body.classList.contains('reels-mode')){pauseAllForegroundVideo(false);pauseBackgroundMusic()}},{capture:true});

// favourites in settings; profile takes bottom slot
$('toolsBtn').onclick=()=>{$('toolsDialog').showModal();};
$('logoutUserBtn')?.addEventListener('click',()=>{if(!currentLocalUser)return gate(true);if(!confirm('Logout @'+currentLocalUser.username+'?'))return;localStorage.removeItem(SESSION_USER_KEY);localStorage.setItem('og_last_view','page');localStorage.setItem('og_last_page','0');currentLocalUser=null;stopAllReels();pauseAllForegroundVideo();$('toolsDialog').close();updateAccountUI();gate(true)});
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
      <div class="reel-actions"><button class="like" type="button">${r.liked?'♥':'♡'}</button><button class="comment" type="button">💬<small class="comment-count">0</small></button><button class="share" type="button">📤</button><button class="down" type="button">⬇</button><button class="more" type="button">⋮</button></div>
      <button class="reel-owner" type="button"><img src="${dpUrl(u)}"><div><b>@${escapeHtml(u.username)}</b>${r.caption?`<p>${escapeHtml(r.caption)}</p>`:''}</div></button>
      <div class="reel-more-menu" hidden>${own?'<button class="delete-reel" type="button">🗑️ ᴅᴇʟᴇᴛᴇ ʀᴇᴇʟ</button>':''}<button class="cancel-more" type="button">✕ ᴄʟᴏꜱᴇ</button></div>
    </div>`;
    c.querySelector('.reel-owner').onclick=()=>openSocialProfile(u.username);
    c.querySelector('.like').onclick=async()=>{r.liked=!r.liked;await put('reels',r);c.querySelector('.like').textContent=r.liked?'♥':'♡'};
    const commentBtn=c.querySelector('.comment');commentBtn.onclick=()=>openReelComments(r,c);updateReelCommentCount(r.id,commentBtn);
    c.querySelector('.down').onclick=()=>dl(r.videoBlob,`@${u.username}-reel.mp4`);
    c.querySelector('.share').onclick=async()=>{try{if(navigator.share){const f=new File([r.videoBlob],`@${u.username}-reel.mp4`,{type:r.videoBlob.type||'video/mp4'});const data={title:`@${u.username}`,text:r.caption||''};if(navigator.canShare?.({files:[f]}))data.files=[f];await navigator.share(data)}}catch{}};
    const menu=c.querySelector('.reel-more-menu');c.querySelector('.more').onclick=()=>menu.hidden=!menu.hidden;c.querySelector('.cancel-more').onclick=()=>menu.hidden=true;
    c.querySelector('.delete-reel')?.addEventListener('click',async()=>{if(!confirm('Delete this reel?'))return;stopAllReels();if(DB.objectStoreNames.contains('comments'))for(const cm of await commentsForReel(r.id))await del('comments',cm.id);await del('reels',r.id);await renderSocialReels();});
    h.appendChild(c);
  });
  reelObserver?.disconnect();
  reelObserver=new IntersectionObserver(entries=>entries.forEach(e=>{const v=e.target.querySelector('video');if(e.isIntersecting&&e.intersectionRatio>=.72&&canResumeReel()){pauseBackgroundMusic();h.querySelectorAll('video').forEach(o=>{if(o!==v){o.pause();o.currentTime=0}});if(v.paused){v.currentTime=0;v.muted=false;v.play().catch(()=>{})}}else{v.pause();if(e.intersectionRatio<.2)v.currentTime=0}}),{root:h,threshold:[0,.2,.72,1]});
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


// V7.8.5 — Edit Profile + local Messages
let activeChatUser=null;

function openEditUserProfile(){
  if(!currentLocalUser)return gate(true);
  $('editDisplayName').value=currentLocalUser.name||'';
  $('editUsername').value=currentLocalUser.username||'';$('editBio').value=currentLocalUser.bio||'';
  $('editCurrentPassword').value='';$('editNewPassword').value='';$('editConfirmPassword').value='';$('editUserError').textContent='';
  $('editDpInput').value='';$('editDpPreview').src=dpUrl(currentLocalUser);
  $('editUserDialog').showModal();
}
$('editDpInput')?.addEventListener('change',async()=>{const f=$('editDpInput').files[0];if(f)$('editDpPreview').src=await fileToDataURL(f)});
$('editUserForm')?.addEventListener('submit',async e=>{
  e.preventDefault();const err=$('editUserError');err.textContent='';if(!currentLocalUser)return;
  try{
    const old={...currentLocalUser},oldName=old.username;
    if(await hashPw($('editCurrentPassword').value)!==old.passwordHash)return err.textContent='❌ ᴄᴜʀʀᴇɴᴛ ᴘᴀꜱꜱᴡᴏʀᴅ ɪꜱ ᴡʀᴏɴɢ';
    const username=normUser($('editUsername').value),name=$('editDisplayName').value.trim();
    if(!name)return err.textContent='❌ ᴅɪꜱᴘʟᴀʏ ɴᴀᴍᴇ ʀᴇQᴜɪʀᴇᴅ';
    if(username.length<3)return err.textContent='❌ ᴜꜱᴇʀɴᴀᴍᴇ ᴛᴏᴏ ꜱʜᴏʀᴛ';
    const users=await getAll('users');if(username!==oldName&&users.some(u=>u.username===username))return err.textContent='❌ @ᴜꜱᴇʀɴᴀᴍᴇ ᴀʟʀᴇᴀᴅʏ ᴇxɪꜱᴛꜱ';
    const np=$('editNewPassword').value,cp=$('editConfirmPassword').value;if(np&&np.length<4)return err.textContent='❌ ɴᴇᴡ ᴘᴀꜱꜱᴡᴏʀᴅ ᴍɪɴɪᴍᴜᴍ 4';if(np!==cp)return err.textContent='❌ ɴᴇᴡ ᴘᴀꜱꜱᴡᴏʀᴅꜱ ᴅᴏ ɴᴏᴛ ᴍᴀᴛᴄʜ';
    let updated={...old,username,name,bio:$('editBio').value.trim(),passwordHash:np?await hashPw(np):old.passwordHash};const f=$('editDpInput').files[0];if(f)updated.dpData=await fileToDataURL(f);
    if(username!==oldName){
      for(const r of await getAll('reels'))if(r.username===oldName){r.username=username;await put('reels',r)}
      for(const p of await getAll('posts'))if(p.username===oldName){p.username=username;await put('posts',p)}
      for(const m of await getAll('messages')){let c=false;if(m.from===oldName){m.from=username;c=true}if(m.to===oldName){m.to=username;c=true}if(c)await put('messages',m)}
      if(DB.objectStoreNames.contains('comments'))for(const cm of await getAll('comments'))if(cm.username===oldName){cm.username=username;await put('comments',cm)}
      if(DB.objectStoreNames.contains('follows'))for(const f of await getAll('follows')){let c=false;if(f.follower===oldName){f.follower=username;c=true}if(f.following===oldName){f.following=username;c=true}if(c){await del('follows',f.id);f.id=f.follower+'->'+f.following;await put('follows',f)}}
      if(DB.objectStoreNames.contains('postComments'))for(const cm of await getAll('postComments'))if(cm.username===oldName){cm.username=username;await put('postComments',cm)}
      if(DB.objectStoreNames.contains('activity'))for(const a of await getAll('activity')){let c=false;if(a.actor===oldName){a.actor=username;c=true}if(a.target===oldName){a.target=username;c=true}if(c)await put('activity',a)}
      let recent=JSON.parse(localStorage.getItem('og_recent_users')||'[]').map(x=>x===oldName?username:x);localStorage.setItem('og_recent_users',JSON.stringify(recent));
      await del('users',oldName);
    }
    await put('users',updated);currentLocalUser=updated;updateAccountUI();$('editUserDialog').close();$('userProfileDialog').close();openSocialProfile(updated.username);updateMessageBadge();
  }catch(ex){console.error('Edit profile failed',ex);err.textContent='❌ ᴄᴏᴜʟᴅ ɴᴏᴛ ꜱᴀᴠᴇ ᴘʀᴏꜰɪʟᴇ'}
});

function fmtMsgTime(t){try{return new Date(t).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}catch{return ''}}
function chatPair(m,u){return currentLocalUser&&(m.from===currentLocalUser.username&&m.to===u.username||m.to===currentLocalUser.username&&m.from===u.username)}
async function updateMessageBadge(){
  if(!currentLocalUser||!DB?.objectStoreNames.contains('messages'))return;
  const n=(await getAll('messages')).filter(m=>m.to===currentLocalUser.username&&!m.read).length;
  const b=$('messageBtn');if(!b)return;b.dataset.unread=n?String(n):'';b.classList.toggle('has-unread',n>0);
}
async function openMessages(){
  if(!currentLocalUser)return gate(true);
  localStorage.setItem('og_last_view','messages');
  try{
    await waitDB();
    if(!DB.objectStoreNames.contains('messages'))throw new Error('messages store missing');
    leaveReelsMode();pauseAllForegroundVideo();if(!document.hidden)tryPlayMusic();
    activeChatUser=null;activeGroup=null;activeChannel=null;
    $('messagesListView').hidden=false;$('chatView').hidden=true;$('groupChatView').hidden=true;$('channelView').hidden=true;
    $('messageUserSearch').value='';$('messageSearchResults').innerHTML='';
    switchMessageTab('chats');
    await renderRecentChats();await renderGroupsList();await renderChannelsList();
    const dlg=$('messagesDialog');if(dlg.open)dlg.close();dlg.showModal();
    updateMessageBadge();
  }catch(ex){
    console.error('Messages open failed:',ex);
    alert('❌ ᴍᴇꜱꜱᴀɢᴇꜱ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴏᴘᴇɴ • ʀᴇʟᴏᴀᴅ ᴏɴᴄᴇ');
  }
}
$('messageBtn')?.addEventListener('click',openMessages);
$('messagesClose')?.addEventListener('click',()=>{localStorage.setItem('og_last_view','page');$('messagesDialog').close();tryPlayMusic()});
$('messagesDialog')?.addEventListener('close',()=>{activeChatUser=null;tryPlayMusic()});

async function renderRecentChats(){
  const host=$('recentChats');host.innerHTML='';if(!currentLocalUser)return;
  const users=await getAll('users'),msgs=await getAll('messages'),map=new Map();
  msgs.filter(m=>m.from===currentLocalUser.username||m.to===currentLocalUser.username).sort((a,b)=>b.created-a.created).forEach(m=>{const other=m.from===currentLocalUser.username?m.to:m.from;if(!map.has(other))map.set(other,m)});
  for(const [name,last] of map){const u=users.find(x=>x.username===name);if(!u)continue;const row=document.createElement('button');row.className='chat-row';const unread=msgs.filter(m=>m.from===name&&m.to===currentLocalUser.username&&!m.read).length;row.innerHTML=`<img src="${dpUrl(u)}"><span><b>@${escapeHtml(u.username)}</b><small>${last.text?escapeHtml(last.text.slice(0,42)):(last.blob?'📎 ᴍᴇᴅɪᴀ':'ᴍᴇꜱꜱᴀɢᴇ')}</small></span><em>${fmtMsgTime(last.created)}${unread?`<i>${unread}</i>`:''}</em>`;row.onclick=()=>openChat(u);host.appendChild(row)}
  if(!host.children.length)host.innerHTML='<div class="empty-state">💬 ɴᴏ ᴄʜᴀᴛꜱ ʏᴇᴛ<br><small>ꜱᴇᴀʀᴄʜ ᴀ ᴜꜱᴇʀ ᴛᴏ ꜱᴛᴀʀᴛ.</small></div>';
}
$('messageUserSearch')?.addEventListener('input',async()=>{
  const raw=$('messageUserSearch').value.trim().toLowerCase(),q=normUser(raw),host=$('messageSearchResults');host.innerHTML='';if(!raw)return;
  (await getAll('users')).filter(u=>u.username!==currentLocalUser?.username&&(u.username.includes(q)||(u.userId||'').toLowerCase().includes(raw))).forEach(u=>{const b=document.createElement('button');b.className='chat-row';b.innerHTML=`<img src="${dpUrl(u)}"><span><b>@${escapeHtml(u.username)}</b><small>${escapeHtml(u.name||'')} • ${escapeHtml(u.userId||'')}</small></span><em>›</em>`;b.onclick=()=>openChat(u);host.appendChild(b)});if(!host.children.length)host.innerHTML='<div class="empty-state">ɴᴏ ᴜꜱᴇʀ ꜰᴏᴜɴᴅ</div>';
});
async function openChat(u){
  activeChatUser=u;$('messagesListView').hidden=true;$('chatView').hidden=false;$('chatUserDp').src=dpUrl(u);$('chatUsername').textContent='@'+u.username;$('chatUserId').textContent=(u.name||'')+' • '+(u.userId||'');$('chatText').value='';await renderChat();
}
$('chatBackBtn')?.addEventListener('click',async()=>{activeChatUser=null;$('chatView').hidden=true;$('messagesListView').hidden=false;await renderRecentChats();updateMessageBadge()});
$('chatUserHead')?.addEventListener('click',()=>{if(activeChatUser){$('messagesDialog').close();openSocialProfile(activeChatUser.username)}});
async function renderChat(){
  const host=$('chatMessages');host.innerHTML='';if(!currentLocalUser||!activeChatUser)return;let msgs=(await getAll('messages')).filter(m=>chatPair(m,activeChatUser)).sort((a,b)=>a.created-b.created);
  for(const m of msgs){if(m.to===currentLocalUser.username&&!m.read){m.read=true;await put('messages',m)}const mine=m.from===currentLocalUser.username,row=document.createElement('div');row.className='message-line '+(mine?'mine':'theirs');let media='';if(m.blob){const url=URL.createObjectURL(m.blob);if((m.type||'').startsWith('image/'))media=`<img class="chat-media" src="${url}">`;else if((m.type||'').startsWith('video/'))media=`<video class="chat-media" src="${url}" controls playsinline data-chat-video></video>`;media+=`<a class="chat-download" href="${url}" download="${escapeHtml(m.name||'attachment')}">⬇</a>`}row.innerHTML=`<div class="message-bubble">${media}${m.text?`<p>${escapeHtml(m.text)}</p>`:''}<small>${fmtMsgTime(m.created)}</small>${mine?'<button class="delete-message" type="button">🗑</button>':''}</div>`;row.querySelector('.delete-message')?.addEventListener('click',async()=>{await del('messages',m.id);renderChat();renderRecentChats()});host.appendChild(row)}host.scrollTop=host.scrollHeight;updateMessageBadge();
}
async function sendMessage(blob=null){
  if(!currentLocalUser||!activeChatUser)return;const text=$('chatText').value.trim();if(!text&&!blob)return;await put('messages',{id:'msg-'+Date.now()+'-'+Math.random().toString(36).slice(2),from:currentLocalUser.username,to:activeChatUser.username,text,blob:blob||null,type:blob?.type||'',name:blob?.name||'',created:Date.now(),read:false});$('chatText').value='';await renderChat();
}
$('chatSendBtn')?.addEventListener('click',()=>sendMessage());
$('chatText')?.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage()}});
$('chatAttachBtn')?.addEventListener('click',()=>$('chatAttachInput').click());
$('chatAttachInput')?.addEventListener('change',async()=>{const f=$('chatAttachInput').files[0];if(f){await sendMessage(f);$('chatAttachInput').value=''}});
$('clearChatBtn')?.addEventListener('click',async()=>{if(!activeChatUser||!confirm('Clear this chat on this device?'))return;for(const m of await getAll('messages'))if(chatPair(m,activeChatUser))await del('messages',m.id);await renderChat();await renderRecentChats()});


// V7.9 FINAL — local reel comments + single-audio arbiter + tab PIN.
let activeCommentReel=null;
function activeReelVideo(){
  const cards=[...document.querySelectorAll('#reelsFeed .reel-card')];let best=null,bestRatio=0;
  for(const c of cards){const r=c.getBoundingClientRect(),vis=Math.max(0,Math.min(r.bottom,innerHeight)-Math.max(r.top,0)),ratio=r.height?vis/r.height:0;if(ratio>bestRatio){bestRatio=ratio;best=c}}
  return best?.querySelector('video')||null;
}
async function commentsForReel(reelId){if(!DB?.objectStoreNames.contains('comments'))return [];return (await getAll('comments')).filter(x=>x.reelId===reelId).sort((a,b)=>a.created-b.created)}
async function updateReelCommentCount(reelId,btn=null){const n=(await commentsForReel(reelId)).length;const target=btn||[...document.querySelectorAll('.reel-card')].find(x=>x.dataset.id===reelId)?.querySelector('.comment');const count=target?.querySelector('.comment-count');if(count)count.textContent=n?String(n):''}
async function openReelComments(reel,card){
  if(!currentLocalUser)return gate(true);
  activeCommentReel=reel;const v=card?.querySelector('video')||activeReelVideo();try{v?.pause()}catch{};pauseBackgroundMusic();
  $('commentsReelUser').textContent='@'+(reel.username||'user');$('commentText').value='';
  await renderReelComments();const dlg=$('commentsDialog');if(dlg.open)dlg.close();dlg.showModal();
}
async function renderReelComments(){
  const host=$('commentsList');host.innerHTML='';if(!activeCommentReel)return;
  const rows=await commentsForReel(activeCommentReel.id),users=await getAll('users');
  for(const cm of rows){const u=users.find(x=>x.username===cm.username),own=cm.username===currentLocalUser?.username,row=document.createElement('div');row.className='comment-row';row.innerHTML=`<button class="comment-user" type="button"><img src="${dpUrl(u)}"><span><b>@${escapeHtml(cm.username)}</b><p>${escapeHtml(cm.text)}</p><small>${fmtMsgTime(cm.created)}</small></span></button>${own?'<button class="comment-delete" type="button">🗑</button>':''}`;row.querySelector('.comment-user').onclick=()=>{$('commentsDialog').close();openSocialProfile(cm.username)};row.querySelector('.comment-delete')?.addEventListener('click',async()=>{if(!confirm('Delete this comment?'))return;await del('comments',cm.id);await renderReelComments();updateReelCommentCount(activeCommentReel.id)});host.appendChild(row)}
  if(!host.children.length)host.innerHTML='<div class="empty-state">💬 ɴᴏ ᴄᴏᴍᴍᴇɴᴛꜱ ʏᴇᴛ<br><small>ʙᴇ ᴛʜᴇ ꜰɪʀꜱᴛ ᴛᴏ ᴄᴏᴍᴍᴇɴᴛ.</small></div>';host.scrollTop=host.scrollHeight;
}
async function sendReelComment(){const text=$('commentText').value.trim();if(!text||!activeCommentReel||!currentLocalUser)return;await put('comments',{id:'comment-'+Date.now()+'-'+Math.random().toString(36).slice(2),reelId:activeCommentReel.id,username:currentLocalUser.username,text,created:Date.now()});$('commentText').value='';await renderReelComments();updateReelCommentCount(activeCommentReel.id)}
// V8 overrides comment send/reply handlers below.

$('commentsDialog')?.addEventListener('close',()=>{const wasReel=document.body.classList.contains('reels-mode');activeCommentReel=null;if(wasReel)resumeActiveReel();else tryPlayMusic()});

// Any foreground video owns audio while it is playing. Background music never overlaps.
document.addEventListener('play',e=>{
  const v=e.target;if(!(v instanceof HTMLVideoElement))return;
  pauseBackgroundMusic();
  document.querySelectorAll('video').forEach(other=>{if(other!==v&&!other.paused){try{other.pause();if(other.closest('#reelsFeed'))other.currentTime=0}catch{}}});
},true);
document.addEventListener('pause',e=>{
  const v=e.target;if(!(v instanceof HTMLVideoElement)||document.hidden)return;
  setTimeout(()=>{const anyPlaying=[...document.querySelectorAll('video')].some(x=>!x.paused&&!x.ended);if(anyPlaying)return;if(canResumeReel())resumeActiveReel();else if(!document.body.classList.contains('reels-mode'))tryPlayMusic()},80);
},true);
document.addEventListener('ended',e=>{if(e.target instanceof HTMLVideoElement&&!document.body.classList.contains('reels-mode'))tryPlayMusic()},true);

// Close/leave every reel-adjacent surface with reel audio stopped unless Reels is still the active screen.
for(const id of ['userProfileDialog','messagesDialog','createReelDialog','editUserDialog','searchDialog','toolsDialog']){
  const d=$(id);if(!d)continue;d.addEventListener('close',()=>{if(document.body.classList.contains('reels-mode')&&!reelOverlayOpen())resumeActiveReel();else if(!document.body.classList.contains('reels-mode'))tryPlayMusic()});
}



// V8.0 LOCAL SOCIAL + ADMIN — final pre-backend permissions, activity, seen-feed.
const ADMIN_USERNAME='valorrehan';
function isAdminUser(u=currentLocalUser){return !!u && (u.role==='admin'||u.username===ADMIN_USERNAME)}
function adminOnly(){if(isAdminUser())return true;alert('🛡️ ᴀᴅᴍɪɴ ᴏɴʟʏ • @ᴠᴀʟᴏʀʀᴇʜᴀɴ');return false}
async function promoteLocalAdmin(){
  if(!DB?.objectStoreNames.contains('users'))return;
  const users=await getAll('users'),u=users.find(x=>x.username===ADMIN_USERNAME);
  if(u&&u.role!=='admin'){u.role='admin';await put('users',u);if(currentLocalUser?.username===ADMIN_USERNAME)currentLocalUser=u}
}
function activityBadgeEl(){let b=$('activityBadge');if(!b&&$('toolsBtn')){b=document.createElement('span');b.id='activityBadge';b.className='activity-badge';$('toolsBtn').appendChild(b)}return b}
async function addActivity(target,type,actor,extra={}){
  if(!target||!actor||target===actor||!DB?.objectStoreNames.contains('activity'))return;
  await put('activity',{id:'act-'+Date.now()+'-'+Math.random().toString(36).slice(2),target,type,actor,created:Date.now(),read:false,...extra});
  if(currentLocalUser?.username===target)updateActivityBadge();
}
async function updateActivityBadge(){
  if(!currentLocalUser||!DB?.objectStoreNames.contains('activity'))return;
  const n=(await getAll('activity')).filter(a=>a.target===currentLocalUser.username&&!a.read).length,b=activityBadgeEl();if(!b)return;b.textContent=n?String(Math.min(n,99)):'';b.hidden=!n;
}
async function renderActivity(){
  const host=$('activityList');if(!host||!currentLocalUser)return;host.innerHTML='';
  const rows=(await getAll('activity')).filter(a=>a.target===currentLocalUser.username).sort((a,b)=>b.created-a.created),users=await getAll('users');
  for(const a of rows){const actor=users.find(u=>u.username===a.actor)||{username:a.actor};const row=document.createElement('button');row.className='activity-row';
    const label=a.type==='reel-like'?'❤️ ʟɪᴋᴇᴅ ʏᴏᴜʀ ʀᴇᴇʟ':a.type==='comment'?'💬 ᴄᴏᴍᴍᴇɴᴛᴇᴅ ᴏɴ ʏᴏᴜʀ ʀᴇᴇʟ':a.type==='reply'?'↩️ ʀᴇᴘʟɪᴇᴅ ᴛᴏ ʏᴏᴜʀ ᴄᴏᴍᴍᴇɴᴛ':a.type==='comment-like'?'❤️ ʟɪᴋᴇᴅ ʏᴏᴜʀ ᴄᴏᴍᴍᴇɴᴛ':'🔔 ᴀᴄᴛɪᴠɪᴛʏ';
    row.innerHTML=`<img src="${dpUrl(actor)}"><span><b>@${escapeHtml(actor.username)}</b><small>${label}${a.text?` • ${escapeHtml(a.text.slice(0,55))}`:''}</small></span><em>${fmtMsgTime(a.created)}</em>`;
    row.onclick=async()=>{a.read=true;await put('activity',a);updateActivityBadge();$('activityDialog').close();if(a.reelId)openReelsPage(a.reelId);else openSocialProfile(a.actor)};host.appendChild(row)
  }
  if(!host.children.length)host.innerHTML='<div class="empty-state">🔔 ɴᴏ ᴀᴄᴛɪᴠɪᴛʏ ʏᴇᴛ</div>';
}
async function openActivity(){if(!currentLocalUser)return gate(true);await renderActivity();const d=$('activityDialog');if(!d.open)d.showModal();for(const a of (await getAll('activity')).filter(x=>x.target===currentLocalUser.username&&!x.read)){a.read=true;await put('activity',a)}updateActivityBadge()}
$('activityOpenBtn')?.addEventListener('click',()=>{$('toolsDialog').close();openActivity()});
$('activityClearBtn')?.addEventListener('click',async()=>{if(!currentLocalUser||!confirm('Clear activity on this device?'))return;for(const a of await getAll('activity'))if(a.target===currentLocalUser.username)await del('activity',a.id);renderActivity();updateActivityBadge()});

function seenKey(){return 'og_seen_reels_'+(currentLocalUser?.username||'guest')}
function getSeenReels(){try{return new Set(JSON.parse(localStorage.getItem(seenKey())||'[]'))}catch{return new Set()}}
function markReelSeen(id){if(!currentLocalUser||!id)return;const s=getSeenReels();s.add(id);localStorage.setItem(seenKey(),JSON.stringify([...s].slice(-3000)))}
function resetSeenReels(){if(currentLocalUser)localStorage.removeItem(seenKey())}

function applyAdminUI(){
  const admin=isAdminUser();
  ['addProfileBtn','addJourneyBtn','memoryDayAdd','memoryDayRandom','exportBtn','importInput','restoreBtn'].forEach(id=>{const e=$(id);if(e){const box=e.closest('label.tool-card');(box||e).hidden=!admin}});
  document.querySelectorAll('[data-new-folder]').forEach(e=>e.hidden=!admin);
  document.querySelectorAll('.journey-delete,.delete-folder-card,.change-cover,.memory-day-remove').forEach(e=>e.hidden=!admin);
  const t=$('toolsDialog');if(t)t.classList.toggle('admin-tools',admin);
  const tag=$('adminStatus');if(tag){tag.hidden=!admin;tag.textContent='🛡️ ᴀᴅᴍɪɴ • @ᴠᴀʟᴏʀʀᴇʜᴀɴ'}
}
const _updateAccountUI=updateAccountUI;updateAccountUI=function(){_updateAccountUI();applyAdminUI();updateActivityBadge();if(isAdminUser()&&$('profileNavBtn'))$('profileNavBtn').classList.add('admin-account');else $('profileNavBtn')?.classList.remove('admin-account')};
const _askUser=askUser;askUser=async function(){await promoteLocalAdmin();await _askUser();if(currentLocalUser?.username===ADMIN_USERNAME&&currentLocalUser.role!=='admin'){currentLocalUser.role='admin';await put('users',currentLocalUser)}applyAdminUI();updateActivityBadge()};
const _openSocialProfileAdmin=openSocialProfile;openSocialProfile=async function(name){await _openSocialProfileAdmin(name);const u=(await getAll('users')).find(x=>x.username===normUser(name));if(u&&isAdminUser(u)){const h=$('userProfileBody')?.querySelector('.social-profile-head>div');if(h&&!h.querySelector('.admin-profile-badge')){const b=document.createElement('span');b.className='admin-profile-badge';b.textContent='🛡️ ᴀᴅᴍɪɴ';h.appendChild(b)}}};

// Hard permission guards for Memories administration. Hiding buttons is not the only protection.
document.addEventListener('click',e=>{
  const target=e.target.closest('#addProfileBtn,#addJourneyBtn,[data-new-folder],#memoryDayAdd,#memoryDayRandom,.journey-delete,.delete-folder-card,.change-cover,.memory-day-remove,#restoreBtn,#exportBtn');
  if(target&&!isAdminUser()){e.preventDefault();e.stopImmediatePropagation();adminOnly()}
},true);
document.addEventListener('submit',e=>{if(e.target.matches('#newProfileForm,#newJourneyForm,#newFolderForm')&&!isAdminUser()){e.preventDefault();e.stopImmediatePropagation();adminOnly()}},true);
const _addMediaAdmin=addMedia;addMedia=async function(folderId,type){if(!adminOnly())return;return _addMediaAdmin(folderId,type)};
const _deleteFolderAdmin=deleteFolder;deleteFolder=async function(f){if(!adminOnly())return;return _deleteFolderAdmin(f)};
const _chooseCoverAdmin=chooseCover;chooseCover=async function(folderId,after){if(!adminOnly())return;return _chooseCoverAdmin(folderId,after)};
const _openProfileAdmin=openProfile;openProfile=function(i){_openProfileAdmin(i);setTimeout(()=>{const admin=isAdminUser();['changeProfileImageBtn','deleteProfileBtn'].forEach(id=>{const e=$(id);if(e)e.hidden=!admin})},0)};
const _renderFoldersAdmin=renderFolders;renderFolders=async function(){await _renderFoldersAdmin();applyAdminUI()};
const _openFolderAdmin=openFolder;openFolder=async function(id){await _openFolderAdmin(id);if(!isAdminUser()){['addMediaBtn','changeCoverInside','deleteFolderBtn'].forEach(x=>{const e=$(x);if(e)e.hidden=true});document.querySelectorAll('#folderDialog .remove-media').forEach(e=>e.hidden=true)}};
const _renderJourneyAdmin=renderJourney;renderJourney=async function(){await _renderJourneyAdmin();applyAdminUI()};
const _renderMemoryDayAdmin=renderMemoryDay;renderMemoryDay=async function(){await _renderMemoryDayAdmin();applyAdminUI()};

// Reels: unseen-only feed. Seen reels remain accessible from Search/Profile and direct activity links.
renderSocialReels=async function(focus){
  const h=$('reelsFeed'),all=(await getAll('reels')).sort((a,b)=>(b.created||0)-(a.created||0)),users=await getAll('users'),seen=getSeenReels();
  const rows=focus?all:all.filter(r=>!seen.has(r.id));h.innerHTML='';
  if(!rows.length){h.innerHTML='<div class="empty-state reel-empty-full">✅ ɴᴏ ɴᴇᴡ ʀᴇᴇʟꜱ<br><small>ꜱᴇᴇɴ ʀᴇᴇʟꜱ ᴀʀᴇ ꜱᴛɪʟʟ ᴀᴠᴀɪʟᴀʙʟᴇ ꜰʀᴏᴍ ꜱᴇᴀʀᴄʜ ᴀɴᴅ ᴜꜱᴇʀ ᴘʀᴏꜰɪʟᴇꜱ.</small></div>';return}
  rows.forEach(r=>{
    r.likedBy=Array.isArray(r.likedBy)?r.likedBy:[];const u=users.find(x=>x.username===r.username)||{username:r.username,name:r.username},own=currentLocalUser?.username===r.username,canModerate=own||isAdminUser();
    const liked=!!currentLocalUser&&r.likedBy.includes(currentLocalUser.username),c=document.createElement('article');c.className='reel-card reel-full';c.dataset.id=r.id;
    c.innerHTML=`<div class="reel-video-wrap"><video src="${URL.createObjectURL(r.videoBlob)}" playsinline loop preload="metadata"></video>
      <div class="reel-actions"><button class="like" type="button">${liked?'♥':'♡'}<small class="like-count">${r.likedBy.length||''}</small></button><button class="comment" type="button">💬<small class="comment-count">0</small></button><button class="share" type="button">📤</button><button class="down" type="button">⬇</button><button class="more" type="button">⋮</button></div>
      <button class="reel-owner" type="button"><img src="${dpUrl(u)}"><div><b>@${escapeHtml(u.username)}${isAdminUser(u)?' 🛡️':''}</b>${r.caption?`<p>${escapeHtml(r.caption)}</p>`:''}</div></button>
      <div class="reel-more-menu" hidden>${canModerate?'<button class="delete-reel" type="button">🗑️ ᴅᴇʟᴇᴛᴇ ʀᴇᴇʟ</button>':''}<button class="cancel-more" type="button">✕ ᴄʟᴏꜱᴇ</button></div></div>`;
    c.querySelector('.reel-owner').onclick=()=>openSocialProfile(u.username);
    c.querySelector('.like').onclick=async()=>{if(!currentLocalUser)return gate(true);const me=currentLocalUser.username,i=r.likedBy.indexOf(me);if(i>=0)r.likedBy.splice(i,1);else{r.likedBy.push(me);await addActivity(r.username,'reel-like',me,{reelId:r.id})}await put('reels',r);c.querySelector('.like').childNodes[0].textContent=i>=0?'♡':'♥';c.querySelector('.like-count').textContent=r.likedBy.length||''};
    const commentBtn=c.querySelector('.comment');commentBtn.onclick=()=>openReelComments(r,c);updateReelCommentCount(r.id,commentBtn);
    c.querySelector('.down').onclick=()=>dl(r.videoBlob,`@${u.username}-reel.mp4`);
    c.querySelector('.share').onclick=async()=>{try{if(navigator.share){const f=new File([r.videoBlob],`@${u.username}-reel.mp4`,{type:r.videoBlob.type||'video/mp4'}),data={title:`@${u.username}`,text:r.caption||''};if(navigator.canShare?.({files:[f]}))data.files=[f];await navigator.share(data)}}catch{}};
    const menu=c.querySelector('.reel-more-menu');c.querySelector('.more').onclick=()=>menu.hidden=!menu.hidden;c.querySelector('.cancel-more').onclick=()=>menu.hidden=true;
    c.querySelector('.delete-reel')?.addEventListener('click',async()=>{if(!confirm(isAdminUser()&&!own?'Admin: delete this user reel?':'Delete this reel?'))return;stopAllReels();for(const cm of await commentsForReel(r.id))await del('comments',cm.id);for(const a of await getAll('activity'))if(a.reelId===r.id)await del('activity',a.id);await del('reels',r.id);await renderSocialReels()});h.appendChild(c)
  });
  reelObserver?.disconnect();const timers=new Map();
  reelObserver=new IntersectionObserver(entries=>entries.forEach(e=>{const v=e.target.querySelector('video'),id=e.target.dataset.id;if(e.isIntersecting&&e.intersectionRatio>=.72&&canResumeReel()){pauseBackgroundMusic();h.querySelectorAll('video').forEach(o=>{if(o!==v){o.pause();o.currentTime=0}});if(v.paused){v.currentTime=0;v.muted=false;v.play().catch(()=>{})}clearTimeout(timers.get(id));timers.set(id,setTimeout(()=>{if(e.target.getBoundingClientRect().height)markReelSeen(id)},900))}else{clearTimeout(timers.get(id));v.pause();if(e.intersectionRatio<.2)v.currentTime=0}}),{root:h,threshold:[0,.2,.72,1]});
  h.querySelectorAll('.reel-card').forEach(c=>reelObserver.observe(c));if(focus)setTimeout(()=>h.querySelector(`[data-id="${focus}"]`)?.scrollIntoView({block:'start'}),80)
};

let replyToComment=null;
async function renderReelComments(){
  const host=$('commentsList');host.innerHTML='';if(!activeCommentReel)return;const rows=await commentsForReel(activeCommentReel.id),users=await getAll('users');
  for(const cm of rows){cm.likedBy=Array.isArray(cm.likedBy)?cm.likedBy:[];const u=users.find(x=>x.username===cm.username),own=cm.username===currentLocalUser?.username,canDelete=own||isAdminUser(),liked=currentLocalUser&&cm.likedBy.includes(currentLocalUser.username),row=document.createElement('div');row.className='comment-row'+(cm.parentId?' comment-reply-row':'');
    row.innerHTML=`<button class="comment-user" type="button"><img src="${dpUrl(u)}"><span><b>@${escapeHtml(cm.username)}${isAdminUser(u)?' 🛡️':''}</b><p>${cm.parentId?'↩️ ':''}${escapeHtml(cm.text)}</p><small>${fmtMsgTime(cm.created)}</small></span></button><div class="comment-actions-mini"><button class="comment-like" type="button">${liked?'♥':'♡'} <small>${cm.likedBy.length||''}</small></button><button class="comment-reply" type="button">↩️</button>${canDelete?'<button class="comment-delete" type="button">🗑</button>':''}</div>`;
    row.querySelector('.comment-user').onclick=()=>{$('commentsDialog').close();openSocialProfile(cm.username)};
    row.querySelector('.comment-like').onclick=async()=>{if(!currentLocalUser)return gate(true);const me=currentLocalUser.username,i=cm.likedBy.indexOf(me);if(i>=0)cm.likedBy.splice(i,1);else{cm.likedBy.push(me);await addActivity(cm.username,'comment-like',me,{reelId:cm.reelId,commentId:cm.id,text:cm.text})}await put('comments',cm);renderReelComments()};
    row.querySelector('.comment-reply').onclick=()=>{replyToComment=cm;$('commentText').placeholder='↩️ ʀᴇᴘʟʏ ᴛᴏ @'+cm.username+'...';$('commentText').focus()};
    row.querySelector('.comment-delete')?.addEventListener('click',async()=>{if(!confirm(isAdminUser()&&!own?'Admin: delete this comment?':'Delete this comment?'))return;await del('comments',cm.id);for(const child of await commentsForReel(cm.reelId))if(child.parentId===cm.id)await del('comments',child.id);await renderReelComments();updateReelCommentCount(activeCommentReel.id)});host.appendChild(row)
  }
  if(!host.children.length)host.innerHTML='<div class="empty-state">💬 ɴᴏ ᴄᴏᴍᴍᴇɴᴛꜱ ʏᴇᴛ<br><small>ʙᴇ ᴛʜᴇ ꜰɪʀꜱᴛ ᴛᴏ ᴄᴏᴍᴍᴇɴᴛ.</small></div>';host.scrollTop=host.scrollHeight
}
sendReelComment=async function(){const text=$('commentText').value.trim();if(!text||!activeCommentReel||!currentLocalUser)return;const parent=replyToComment,cm={id:'comment-'+Date.now()+'-'+Math.random().toString(36).slice(2),reelId:activeCommentReel.id,username:currentLocalUser.username,text,created:Date.now(),parentId:parent?.id||null,likedBy:[]};await put('comments',cm);if(parent)await addActivity(parent.username,'reply',currentLocalUser.username,{reelId:activeCommentReel.id,commentId:cm.id,text});else await addActivity(activeCommentReel.username,'comment',currentLocalUser.username,{reelId:activeCommentReel.id,commentId:cm.id,text});replyToComment=null;$('commentText').value='';$('commentText').placeholder='ᴀᴅᴅ ᴀ ᴄᴏᴍᴍᴇɴᴛ...';await renderReelComments();updateReelCommentCount(activeCommentReel.id)};
$('commentSendBtn').onclick=sendReelComment;
$('commentText').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendReelComment()}};
$('commentsDialog')?.addEventListener('close',()=>{replyToComment=null;if($('commentText'))$('commentText').placeholder='ᴀᴅᴅ ᴀ ᴄᴏᴍᴍᴇɴᴛ...'});



// V8.1 — Local Groups + Admin Channels (pre-backend)
let activeGroup=null,activeChannel=null;
function switchMessageTab(tab){
  document.querySelectorAll('.messages-tab').forEach(b=>b.classList.toggle('active',b.dataset.messageTab===tab));
  const map={chats:'messagesChatsPanel',groups:'messagesGroupsPanel',channels:'messagesChannelsPanel'};
  for(const [k,id] of Object.entries(map)){const el=$(id);if(el){el.hidden=k!==tab;el.classList.toggle('active',k===tab)}}
  if(tab==='groups')renderGroupsList();if(tab==='channels')renderChannelsList();
}
document.querySelectorAll('.messages-tab').forEach(b=>b.addEventListener('click',()=>switchMessageTab(b.dataset.messageTab)));
function groupCanManage(g){return !!currentLocalUser&&(isAdminUser()||g.createdBy===currentLocalUser.username||(g.admins||[]).includes(currentLocalUser.username))}
function parseMemberNames(raw){return [...new Set(String(raw||'').split(/[\s,]+/).map(normUser).filter(Boolean))]}
async function renderGroupsList(){
  const host=$('groupsList');if(!host||!currentLocalUser||!DB?.objectStoreNames.contains('groups'))return;host.innerHTML='';
  const groups=(await getAll('groups')).filter(g=>isAdminUser()||(g.members||[]).includes(currentLocalUser.username)).sort((a,b)=>b.created-a.created);
  for(const g of groups){const row=document.createElement('button');row.className='chat-row social-row';row.innerHTML=`<img src="${g.dpData||'assets/common.jpg'}"><span><b>${escapeHtml(g.name)}</b><small>${(g.members||[]).length} ᴍᴇᴍʙᴇʀꜱ • @${escapeHtml(g.createdBy||'')}</small></span><em>›</em>`;row.onclick=()=>openGroupChat(g);host.appendChild(row)}
  if(!host.children.length)host.innerHTML='<div class="empty-state">👥 ɴᴏ ɢʀᴏᴜᴘꜱ ʏᴇᴛ</div>';
}
$('createGroupBtn')?.addEventListener('click',()=>{if(!currentLocalUser)return gate(true);$('createGroupDialog').showModal()});
$('createGroupForm')?.addEventListener('submit',async e=>{e.preventDefault();if(!currentLocalUser)return;const users=await getAll('users'),all=new Set(users.map(u=>u.username));let members=parseMemberNames($('groupMembersInput').value).filter(x=>all.has(x));if(!members.includes(currentLocalUser.username))members.unshift(currentLocalUser.username);const g={id:'grp-'+Date.now()+'-'+Math.random().toString(36).slice(2),name:$('groupNameInput').value.trim()||'ɢʀᴏᴜᴘ',dpData:await fileToDataURL($('groupDpInput').files[0]||null),createdBy:currentLocalUser.username,admins:[currentLocalUser.username],members,created:Date.now()};await put('groups',g);e.target.reset();$('createGroupDialog').close();switchMessageTab('groups');await renderGroupsList()});
async function openGroupChat(g){activeGroup=(await getAll('groups')).find(x=>x.id===g.id)||g;$('messagesListView').hidden=true;$('chatView').hidden=true;$('channelView').hidden=true;$('groupChatView').hidden=false;$('groupChatDp').src=activeGroup.dpData||'assets/common.jpg';$('groupChatName').textContent=activeGroup.name;$('groupChatMeta').textContent=`${(activeGroup.members||[]).length} ᴍᴇᴍʙᴇʀꜱ`;$('groupText').value='';await renderGroupMessages()}
$('groupBackBtn')?.addEventListener('click',()=>{activeGroup=null;$('groupChatView').hidden=true;$('messagesListView').hidden=false;switchMessageTab('groups')});
async function renderGroupMessages(){const host=$('groupMessages');if(!host||!activeGroup)return;host.innerHTML='';const users=await getAll('users'),rows=(await getAll('groupMessages')).filter(m=>m.groupId===activeGroup.id).sort((a,b)=>a.created-b.created);for(const m of rows){const u=users.find(x=>x.username===m.from),mine=m.from===currentLocalUser?.username,row=document.createElement('div');row.className='message-line '+(mine?'mine':'theirs');let media='';if(m.blob){const url=URL.createObjectURL(m.blob);if((m.type||'').startsWith('image/'))media=`<img class="chat-media" src="${url}">`;else if((m.type||'').startsWith('video/'))media=`<video class="chat-media" src="${url}" controls playsinline></video>`;media+=`<a class="chat-download" href="${url}" download="${escapeHtml(m.name||'attachment')}">⬇</a>`}const canDelete=mine||groupCanManage(activeGroup);row.innerHTML=`<div class="message-bubble">${!mine?`<b class="bubble-user">@${escapeHtml(m.from)}${isAdminUser(u)?' 🛡️':''}</b>`:''}${media}${m.text?`<p>${escapeHtml(m.text)}</p>`:''}<small>${fmtMsgTime(m.created)}</small>${canDelete?'<button class="delete-message" type="button">🗑</button>':''}</div>`;row.querySelector('.delete-message')?.addEventListener('click',async()=>{await del('groupMessages',m.id);renderGroupMessages()});host.appendChild(row)}host.scrollTop=host.scrollHeight}
async function sendGroupMessage(blob=null){if(!currentLocalUser||!activeGroup)return;const text=$('groupText').value.trim();if(!text&&!blob)return;await put('groupMessages',{id:'gmsg-'+Date.now()+'-'+Math.random().toString(36).slice(2),groupId:activeGroup.id,from:currentLocalUser.username,text,blob:blob||null,type:blob?.type||'',name:blob?.name||'',created:Date.now()});$('groupText').value='';await renderGroupMessages()}
$('groupSendBtn')?.addEventListener('click',()=>sendGroupMessage());$('groupText')?.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendGroupMessage()}});$('groupAttachBtn')?.addEventListener('click',()=>$('groupAttachInput').click());$('groupAttachInput')?.addEventListener('change',async()=>{const f=$('groupAttachInput').files[0];if(f){await sendGroupMessage(f);$('groupAttachInput').value=''}});
$('groupMoreBtn')?.addEventListener('click',async()=>{if(!activeGroup||!currentLocalUser)return;const canManage=groupCanManage(activeGroup);if(canManage){if(confirm('Delete this group? Cancel = keep group')){for(const m of await getAll('groupMessages'))if(m.groupId===activeGroup.id)await del('groupMessages',m.id);await del('groups',activeGroup.id);activeGroup=null;$('groupChatView').hidden=true;$('messagesListView').hidden=false;switchMessageTab('groups');return}}if(activeGroup.createdBy===currentLocalUser.username){alert('👑 ɢʀᴏᴜᴘ ᴄʀᴇᴀᴛᴏʀ • ᴅᴇʟᴇᴛᴇ ɢʀᴏᴜᴘ ᴛᴏ ʟᴇᴀᴠᴇ');return}if(confirm('Leave this group?')){activeGroup.members=(activeGroup.members||[]).filter(x=>x!==currentLocalUser.username);activeGroup.admins=(activeGroup.admins||[]).filter(x=>x!==currentLocalUser.username);await put('groups',activeGroup);activeGroup=null;$('groupChatView').hidden=true;$('messagesListView').hidden=false;switchMessageTab('groups')}});

async function renderChannelsList(){const host=$('channelsList');if(!host||!currentLocalUser||!DB?.objectStoreNames.contains('channels'))return;host.innerHTML='';const channels=(await getAll('channels')).sort((a,b)=>b.created-a.created);$('createChannelBtn').hidden=!isAdminUser();for(const c of channels){const following=(c.followers||[]).includes(currentLocalUser.username),row=document.createElement('button');row.className='chat-row social-row';row.innerHTML=`<img src="${c.dpData||'assets/common.jpg'}"><span><b>📢 ${escapeHtml(c.name)}</b><small>${escapeHtml(c.description||'')} • ${(c.followers||[]).length} ꜰᴏʟʟᴏᴡᴇʀꜱ</small></span><em>${following?'✓':'›'}</em>`;row.onclick=()=>openChannel(c);host.appendChild(row)}if(!host.children.length)host.innerHTML='<div class="empty-state">📢 ɴᴏ ᴄʜᴀɴɴᴇʟꜱ ʏᴇᴛ</div>'}
$('createChannelBtn')?.addEventListener('click',()=>{if(!adminOnly())return;$('createChannelDialog').showModal()});
$('createChannelForm')?.addEventListener('submit',async e=>{e.preventDefault();if(!adminOnly())return;const c={id:'chn-'+Date.now()+'-'+Math.random().toString(36).slice(2),name:$('channelNameInput').value.trim()||'ᴄʜᴀɴɴᴇʟ',description:$('channelDescInput').value.trim(),dpData:await fileToDataURL($('channelDpInput').files[0]||null),createdBy:currentLocalUser.username,followers:[currentLocalUser.username],created:Date.now()};await put('channels',c);e.target.reset();$('createChannelDialog').close();switchMessageTab('channels');await renderChannelsList()});
async function openChannel(c){activeChannel=(await getAll('channels')).find(x=>x.id===c.id)||c;$('messagesListView').hidden=true;$('chatView').hidden=true;$('groupChatView').hidden=true;$('channelView').hidden=false;$('channelDp').src=activeChannel.dpData||'assets/common.jpg';$('channelName').textContent=activeChannel.name;updateChannelHeader();await renderChannelPosts()}
function updateChannelHeader(){if(!activeChannel||!currentLocalUser)return;const following=(activeChannel.followers||[]).includes(currentLocalUser.username);$('channelMeta').textContent=`${(activeChannel.followers||[]).length} ꜰᴏʟʟᴏᴡᴇʀꜱ${activeChannel.description?' • '+activeChannel.description:''}`;$('channelFollowBtn').textContent=isAdminUser()?'⋮':(following?'✓':'＋');$('channelCompose').hidden=!isAdminUser()}
$('channelBackBtn')?.addEventListener('click',()=>{activeChannel=null;$('channelView').hidden=true;$('messagesListView').hidden=false;switchMessageTab('channels')});
$('channelFollowBtn')?.addEventListener('click',async()=>{if(!activeChannel||!currentLocalUser)return;if(isAdminUser()){if(confirm('Admin: delete this channel?')){for(const p of await getAll('channelPosts'))if(p.channelId===activeChannel.id)await del('channelPosts',p.id);await del('channels',activeChannel.id);activeChannel=null;$('channelView').hidden=true;$('messagesListView').hidden=false;switchMessageTab('channels')}return}activeChannel.followers=activeChannel.followers||[];const i=activeChannel.followers.indexOf(currentLocalUser.username);if(i>=0)activeChannel.followers.splice(i,1);else activeChannel.followers.push(currentLocalUser.username);await put('channels',activeChannel);updateChannelHeader();renderChannelsList()});
async function renderChannelPosts(){const host=$('channelPosts');if(!host||!activeChannel)return;host.innerHTML='';const rows=(await getAll('channelPosts')).filter(p=>p.channelId===activeChannel.id).sort((a,b)=>b.created-a.created);for(const p of rows){const card=document.createElement('article');card.className='channel-post';let media='';if(p.blob){const url=URL.createObjectURL(p.blob);if((p.type||'').startsWith('image/'))media=`<img src="${url}">`;else if((p.type||'').startsWith('video/'))media=`<video src="${url}" controls playsinline></video>`;media+=`<a class="channel-download" href="${url}" download="${escapeHtml(p.name||'channel-media')}">⬇</a>`}card.innerHTML=`<div class="channel-post-head"><img src="${activeChannel.dpData||'assets/common.jpg'}"><span><b>${escapeHtml(activeChannel.name)}</b><small>${fmtMsgTime(p.created)}</small></span>${isAdminUser()?'<button class="channel-delete">🗑</button>':''}</div>${media}${p.text?`<p>${escapeHtml(p.text)}</p>`:''}`;card.querySelector('.channel-delete')?.addEventListener('click',async()=>{if(confirm('Delete channel post?')){await del('channelPosts',p.id);renderChannelPosts()}});host.appendChild(card)}if(!host.children.length)host.innerHTML='<div class="empty-state">📢 ɴᴏ ᴘᴏꜱᴛꜱ ʏᴇᴛ</div>'}
async function sendChannelPost(blob=null){if(!activeChannel||!adminOnly())return;const text=$('channelText').value.trim();if(!text&&!blob)return;await put('channelPosts',{id:'cpost-'+Date.now()+'-'+Math.random().toString(36).slice(2),channelId:activeChannel.id,author:currentLocalUser.username,text,blob:blob||null,type:blob?.type||'',name:blob?.name||'',created:Date.now()});$('channelText').value='';await renderChannelPosts()}
$('channelSendBtn')?.addEventListener('click',()=>sendChannelPost());$('channelText')?.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendChannelPost()}});$('channelAttachBtn')?.addEventListener('click',()=>$('channelAttachInput').click());$('channelAttachInput')?.addEventListener('change',async()=>{const f=$('channelAttachInput').files[0];if(f){await sendChannelPost(f);$('channelAttachInput').value=''}});
setTimeout(async()=>{await promoteLocalAdmin();if(currentLocalUser?.username===ADMIN_USERNAME){currentLocalUser.role='admin';await put('users',currentLocalUser)}applyAdminUI();updateAccountUI();updateActivityBadge()},900);

setTimeout(updateMessageBadge,700);


// ============================================================
// V8.2 — Instagram-style profiles, follows and dedicated posts
// ============================================================
let activePost=null, activePostList=[], activePostIndex=0, activePostReply=null;

function followId(a,b){return `${a}->${b}`}
async function followStats(username){
  if(!DB?.objectStoreNames.contains('follows'))return {followers:[],following:[]};
  const all=await getAll('follows');
  return {followers:all.filter(f=>f.following===username).map(f=>f.follower),following:all.filter(f=>f.follower===username).map(f=>f.following)};
}
async function isFollowing(username){if(!currentLocalUser||!DB?.objectStoreNames.contains('follows'))return false;return !!(await new Promise(res=>{const r=store('follows').get(followId(currentLocalUser.username,username));r.onsuccess=()=>res(r.result);r.onerror=()=>res(null)}))}
async function toggleFollowUser(username){
  if(!currentLocalUser||username===currentLocalUser.username)return false;
  const id=followId(currentLocalUser.username,username),yes=await isFollowing(username);
  if(yes)await del('follows',id);else{await put('follows',{id,follower:currentLocalUser.username,following:username,created:Date.now()});await addActivity(username,'follow',currentLocalUser.username,{})}
  return !yes;
}
async function openFollowList(username,kind){
  const st=await followStats(username),names=kind==='followers'?st.followers:st.following,users=await getAll('users'),host=$('followListBody');
  $('followListTitle').textContent=kind==='followers'?'👥 ꜰᴏʟʟᴏᴡᴇʀꜱ':'👥 ꜰᴏʟʟᴏᴡɪɴɢ';host.innerHTML='';
  names.map(n=>users.find(u=>u.username===n)).filter(Boolean).forEach(u=>{const row=userBtn(u);row.onclick=()=>{$('followListDialog').close();openSocialProfile(u.username)};host.appendChild(row)});
  if(!host.children.length)host.innerHTML='<div class="empty-state">ɴᴏ ᴜꜱᴇʀꜱ ʏᴇᴛ</div>';
  if(!$('followListDialog').open)$('followListDialog').showModal();
}
async function shareProfile(u){
  const text=`${u.name||u.username} • @${u.username}`;
  try{if(navigator.share)await navigator.share({title:'@'+u.username,text});else{await navigator.clipboard?.writeText(text);alert('✅ ᴘʀᴏꜰɪʟᴇ ᴄᴏᴘɪᴇᴅ')}}catch{}
}

// Final profile implementation: no local ID line, Instagram-like order.
openSocialProfile=async function(name){
  try{
    leaveReelsMode();pauseAllForegroundVideo(false);await waitDB();
    const u=(await getAll('users')).find(x=>x.username===normUser(name));if(!u){alert('❌ ᴜꜱᴇʀ ɴᴏᴛ ꜰᴏᴜɴᴅ');return}
    rememberUser(u.username);localStorage.setItem('og_last_view','profile:'+u.username);
    const reels=(await getAll('reels')).filter(x=>x.username===u.username).sort((a,b)=>(b.created||0)-(a.created||0));
    const posts=(await getAll('posts')).filter(x=>x.username===u.username).sort((a,b)=>(b.created||0)-(a.created||0));
    const own=currentLocalUser?.username===u.username, st=await followStats(u.username), following=own?false:await isFollowing(u.username), admin=isAdminUser(u);
    const dlg=$('userProfileDialog'),b=$('userProfileBody');
    b.innerHTML=`<div class="social-profile-page ig-profile-page">
      <div class="social-profile-topbar"><button class="profile-back" type="button">←</button><b>@${escapeHtml(u.username)}</b><button class="profile-more" type="button">⋮</button></div>
      <section class="ig-profile-main">
        <div class="ig-profile-row">
          <img class="ig-profile-dp" src="${dpUrl(u)}" alt="${escapeHtml(u.name||u.username)} DP">
          <div class="ig-profile-right">
            <div class="ig-name-row"><h2>${escapeHtml(u.name||u.username)}</h2>${admin?'<span class="ig-admin-badge">🛡️ ᴀᴅᴍɪɴ</span>':''}</div>
            <div class="ig-stats">
              <button data-stat="posts"><b>${posts.length}</b><small>ᴘᴏꜱᴛꜱ</small></button>
              <button data-stat="followers"><b>${st.followers.length}</b><small>ꜰᴏʟʟᴏᴡᴇʀꜱ</small></button>
              <button data-stat="following"><b>${st.following.length}</b><small>ꜰᴏʟʟᴏᴡɪɴɢ</small></button>
              <button data-stat="reels"><b>${reels.length}</b><small>ʀᴇᴇʟꜱ</small></button>
            </div>
          </div>
        </div>
        <div class="ig-bio">${u.bio?escapeHtml(u.bio).replace(/\n/g,'<br>'):'<span>ɴᴏ ʙɪᴏ ʏᴇᴛ</span>'}</div>
        <div class="ig-profile-actions">
          ${own?'<button class="mini-btn profile-edit-btn" type="button">✏️ ᴇᴅɪᴛ ᴘʀᴏꜰɪʟᴇ</button>':`<button class="primary-btn profile-follow-btn" type="button">${following?'✓ ꜰᴏʟʟᴏᴡɪɴɢ':'＋ ꜰᴏʟʟᴏᴡ'}</button>`}
          <button class="mini-btn profile-share-btn" type="button">📤 ꜱʜᴀʀᴇ ᴘʀᴏꜰɪʟᴇ</button>
        </div>
      </section>
      <div class="social-tabs"><button class="active" data-tab="posts">🖼️ ᴘᴏꜱᴛꜱ</button><button data-tab="reels">🎬 ʀᴇᴇʟꜱ</button></div>
      <div class="social-tab-panel posts-panel"><div class="profile-post-grid"></div></div>
      <div class="social-tab-panel reels-panel" hidden><div class="profile-reel-grid">${reels.map(r=>`<button data-r="${r.id}" title="Open reel"><span>▶</span></button>`).join('')||'<small>ɴᴏ ʀᴇᴇʟꜱ ʏᴇᴛ</small>'}</div></div>
    </div>`;
    const pg=b.querySelector('.profile-post-grid');
    posts.forEach((p,i)=>{const cell=document.createElement('button');cell.className='profile-post-cell';const url=URL.createObjectURL(p.mediaBlob);if((p.mediaBlob?.type||'').startsWith('video/'))cell.innerHTML=`<video src="${url}" muted playsinline preload="metadata"></video><span>▶</span>`;else cell.innerHTML=`<img src="${url}" alt="${escapeHtml(p.caption||'post')}">`;cell.onclick=()=>openPostViewer(posts,i);pg.appendChild(cell)});
    b.querySelector('.profile-back').onclick=()=>{localStorage.setItem('og_last_view','page');dlg.close();tryPlayMusic()};
    b.querySelector('.profile-more').onclick=()=>shareProfile(u);
    b.querySelector('[data-stat="followers"]').onclick=()=>openFollowList(u.username,'followers');
    b.querySelector('[data-stat="following"]').onclick=()=>openFollowList(u.username,'following');
    b.querySelector('[data-stat="posts"]').onclick=()=>b.querySelector('[data-tab="posts"]').click();
    b.querySelector('[data-stat="reels"]').onclick=()=>b.querySelector('[data-tab="reels"]').click();
    b.querySelectorAll('.social-tabs button').forEach(btn=>btn.onclick=()=>{b.querySelectorAll('.social-tabs button').forEach(x=>x.classList.toggle('active',x===btn));b.querySelector('.reels-panel').hidden=btn.dataset.tab!=='reels';b.querySelector('.posts-panel').hidden=btn.dataset.tab!=='posts'});
    b.querySelectorAll('[data-r]').forEach(x=>x.onclick=()=>{dlg.close();openReelsPage(x.dataset.r)});
    b.querySelector('.profile-edit-btn')?.addEventListener('click',()=>openEditUserProfile());
    b.querySelector('.profile-share-btn').onclick=()=>shareProfile(u);
    b.querySelector('.profile-follow-btn')?.addEventListener('click',async e=>{const yes=await toggleFollowUser(u.username);const st2=await followStats(u.username);e.currentTarget.textContent=yes?'✓ ꜰᴏʟʟᴏᴡɪɴɢ':'＋ ꜰᴏʟʟᴏᴡ';b.querySelector('[data-stat="followers"] b').textContent=st2.followers.length});
    if(dlg.open)dlg.close();dlg.showModal();
  }catch(ex){console.error('Profile open failed:',ex);alert('❌ ᴘʀᴏꜰɪʟᴇ ᴄᴏᴜʟᴅ ɴᴏᴛ ᴏᴘᴇɴ')}
};

async function postCommentRows(postId){return DB?.objectStoreNames.contains('postComments')?(await getAll('postComments')).filter(c=>c.postId===postId).sort((a,b)=>a.created-b.created):[]}
async function postCounts(post){return {likes:(post.likedBy||[]).length,comments:(await postCommentRows(post.id)).length}}
function closePostViewer(){pauseAllForegroundVideo(false);$('postViewerDialog')?.close();activePost=null;activePostList=[];activePostReply=null;if(!document.hidden)tryPlayMusic()}
async function openPostViewer(posts,index=0){
  await waitDB();activePostList=posts||[];activePostIndex=Math.max(0,Math.min(index,activePostList.length-1));activePost=activePostList[activePostIndex];if(!activePost)return;
  pauseBackgroundMusic();pauseAllForegroundVideo(false);await renderPostViewer();if(!$('postViewerDialog').open)$('postViewerDialog').showModal();
}
async function renderPostViewer(){
  const p=activePost;if(!p)return;const users=await getAll('users'),u=users.find(x=>x.username===p.username)||{username:p.username,name:p.username};p.likedBy=p.likedBy||[];const liked=currentLocalUser&&p.likedBy.includes(currentLocalUser.username),cnt=await postCounts(p),own=currentLocalUser?.username===p.username,canDelete=own||isAdminUser();
  $('postViewerUserDp').src=dpUrl(u);$('postViewerUsername').textContent='@'+u.username;$('postViewerIndex').textContent=`${activePostIndex+1} / ${activePostList.length}`;$('postViewerCaption').textContent=p.caption||'';$('postViewerTime').textContent=new Date(p.created||Date.now()).toLocaleString();$('postLikeCount').textContent=cnt.likes;$('postCommentCount').textContent=cnt.comments;$('postLikeBtn').textContent=liked?'♥':'♡';$('postDeleteBtn').hidden=!canDelete;
  const stage=$('postViewerStage');stage.innerHTML='';const url=URL.createObjectURL(p.mediaBlob);if((p.mediaBlob?.type||'').startsWith('video/')){const v=document.createElement('video');v.src=url;v.controls=true;v.playsInline=true;v.autoplay=true;v.addEventListener('play',pauseBackgroundMusic);v.addEventListener('pause',()=>{});stage.appendChild(v)}else{const im=document.createElement('img');im.src=url;im.alt=p.caption||'post';stage.appendChild(im)}
  $('postPrevBtn').disabled=activePostIndex<=0;$('postNextBtn').disabled=activePostIndex>=activePostList.length-1;
}
$('postViewerClose')?.addEventListener('click',closePostViewer);$('postPrevBtn')?.addEventListener('click',async()=>{if(activePostIndex>0){pauseAllForegroundVideo(false);activePost=activePostList[--activePostIndex];await renderPostViewer()}});$('postNextBtn')?.addEventListener('click',async()=>{if(activePostIndex<activePostList.length-1){pauseAllForegroundVideo(false);activePost=activePostList[++activePostIndex];await renderPostViewer()}});
$('postViewerUser')?.addEventListener('click',()=>{const u=activePost?.username;closePostViewer();if(u)openSocialProfile(u)});
$('postLikeBtn')?.addEventListener('click',async()=>{if(!currentLocalUser||!activePost)return gate(true);activePost.likedBy=activePost.likedBy||[];const me=currentLocalUser.username,i=activePost.likedBy.indexOf(me);if(i>=0)activePost.likedBy.splice(i,1);else{activePost.likedBy.push(me);await addActivity(activePost.username,'post-like',me,{postId:activePost.id})}await put('posts',activePost);await renderPostViewer()});
$('postShareBtn')?.addEventListener('click',async()=>{if(!activePost)return;try{const f=new File([activePost.mediaBlob],`@${activePost.username}-post`,{type:activePost.mediaBlob.type||'image/jpeg'});if(navigator.share){const d={title:'@'+activePost.username,text:activePost.caption||''};if(navigator.canShare?.({files:[f]}))d.files=[f];await navigator.share(d)}}catch{}});
$('postDownloadBtn')?.addEventListener('click',()=>activePost&&dl(activePost.mediaBlob,`@${activePost.username}-post.${(activePost.mediaBlob.type||'image/jpeg').includes('video')?'mp4':'jpg'}`));
$('postDeleteBtn')?.addEventListener('click',async()=>{if(!activePost||!(currentLocalUser?.username===activePost.username||isAdminUser())||!confirm('Delete this post?'))return;const id=activePost.id;for(const c of await postCommentRows(id))await del('postComments',c.id);await del('posts',id);activePostList=activePostList.filter(x=>x.id!==id);if(!activePostList.length){closePostViewer();openSocialProfile(activePost?.username||currentLocalUser.username);return}activePostIndex=Math.min(activePostIndex,activePostList.length-1);activePost=activePostList[activePostIndex];await renderPostViewer()});

async function renderPostComments(){
  if(!activePost)return;const rows=await postCommentRows(activePost.id),users=await getAll('users'),host=$('postCommentsList');host.innerHTML='';
  for(const cm of rows){cm.likedBy=cm.likedBy||[];const u=users.find(x=>x.username===cm.username),own=cm.username===currentLocalUser?.username,admin=isAdminUser(),row=document.createElement('div');row.className='comment-row '+(cm.parentId?'comment-reply-row':'');row.innerHTML=`<button class="comment-user"><img src="${dpUrl(u)}"><span><b>@${escapeHtml(cm.username)}</b><p>${escapeHtml(cm.text)}</p><small>${fmtMsgTime(cm.created)}</small><div class="comment-actions-mini"><button class="post-comment-like">${currentLocalUser&&cm.likedBy.includes(currentLocalUser.username)?'♥':'♡'} ${cm.likedBy.length||''}</button><button class="post-comment-reply">↩ ʀᴇᴘʟʏ</button></div></span></button>${(own||admin)?'<button class="comment-delete">🗑</button>':''}`;row.querySelector('.comment-user').onclick=e=>{if(e.target.closest('.comment-actions-mini'))return;$('postCommentsDialog').close();closePostViewer();openSocialProfile(cm.username)};row.querySelector('.post-comment-like').onclick=async e=>{e.stopPropagation();if(!currentLocalUser)return gate(true);const me=currentLocalUser.username,i=cm.likedBy.indexOf(me);if(i>=0)cm.likedBy.splice(i,1);else{cm.likedBy.push(me);await addActivity(cm.username,'post-comment-like',me,{postId:activePost.id,commentId:cm.id})}await put('postComments',cm);renderPostComments()};row.querySelector('.post-comment-reply').onclick=e=>{e.stopPropagation();activePostReply=cm;$('postCommentText').placeholder='↩ @'+cm.username+'...';$('postCommentText').focus()};row.querySelector('.comment-delete')?.addEventListener('click',async()=>{await del('postComments',cm.id);for(const x of await postCommentRows(activePost.id))if(x.parentId===cm.id)await del('postComments',x.id);renderPostComments();renderPostViewer()});host.appendChild(row)}
  if(!host.children.length)host.innerHTML='<div class="empty-state">💬 ɴᴏ ᴄᴏᴍᴍᴇɴᴛꜱ ʏᴇᴛ</div>';
}
$('postCommentBtn')?.addEventListener('click',async()=>{if(!activePost)return;await renderPostComments();$('postCommentsDialog').showModal()});$('postCommentsClose')?.addEventListener('click',()=>{$('postCommentsDialog').close();activePostReply=null});
async function sendPostComment(){const text=$('postCommentText').value.trim();if(!text||!activePost||!currentLocalUser)return;const cm={id:'pc-'+Date.now()+'-'+Math.random().toString(36).slice(2),postId:activePost.id,username:currentLocalUser.username,text,created:Date.now(),parentId:activePostReply?.id||null,likedBy:[]};await put('postComments',cm);if(activePostReply)await addActivity(activePostReply.username,'post-reply',currentLocalUser.username,{postId:activePost.id,commentId:cm.id});else await addActivity(activePost.username,'post-comment',currentLocalUser.username,{postId:activePost.id,commentId:cm.id});$('postCommentText').value='';$('postCommentText').placeholder='ᴀᴅᴅ ᴀ ᴄᴏᴍᴍᴇɴᴛ...';activePostReply=null;await renderPostComments();await renderPostViewer()}
$('postCommentSend')?.addEventListener('click',sendPostComment);$('postCommentText')?.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendPostComment()}});

// Extend activity rendering labels and destinations for follow/post events.
const _renderActivityV82=renderActivity;
renderActivity=async function(){
  await _renderActivityV82();const host=$('activityList');if(!host||!currentLocalUser)return;
  const activities=(await getAll('activity')).filter(a=>a.target===currentLocalUser.username).sort((a,b)=>b.created-a.created),users=await getAll('users');host.innerHTML='';
  for(const a of activities){const u=users.find(x=>x.username===a.actor),row=document.createElement('button');row.className='activity-row';const map={follow:'ꜱᴛᴀʀᴛᴇᴅ ꜰᴏʟʟᴏᴡɪɴɢ ʏᴏᴜ','reel-like':'ʟɪᴋᴇᴅ ʏᴏᴜʀ ʀᴇᴇʟ',comment:'ᴄᴏᴍᴍᴇɴᴛᴇᴅ ᴏɴ ʏᴏᴜʀ ʀᴇᴇʟ',reply:'ʀᴇᴘʟɪᴇᴅ ᴛᴏ ʏᴏᴜʀ ᴄᴏᴍᴍᴇɴᴛ','comment-like':'ʟɪᴋᴇᴅ ʏᴏᴜʀ ᴄᴏᴍᴍᴇɴᴛ','post-like':'ʟɪᴋᴇᴅ ʏᴏᴜʀ ᴘᴏꜱᴛ','post-comment':'ᴄᴏᴍᴍᴇɴᴛᴇᴅ ᴏɴ ʏᴏᴜʀ ᴘᴏꜱᴛ','post-reply':'ʀᴇᴘʟɪᴇᴅ ᴛᴏ ʏᴏᴜʀ ᴘᴏꜱᴛ ᴄᴏᴍᴍᴇɴᴛ','post-comment-like':'ʟɪᴋᴇᴅ ʏᴏᴜʀ ᴘᴏꜱᴛ ᴄᴏᴍᴍᴇɴᴛ'};row.innerHTML=`<img src="${dpUrl(u)}"><span><b>@${escapeHtml(a.actor)}</b><small>${map[a.type]||a.type}</small></span><em>${fmtMsgTime(a.created)}</em>`;row.onclick=async()=>{a.read=true;await put('activity',a);updateActivityBadge();$('activityDialog').close();if(a.reelId)openReelsPage(a.reelId);else if(a.postId){const posts=(await getAll('posts')).filter(p=>p.username===a.target).sort((x,y)=>(y.created||0)-(x.created||0));const i=Math.max(0,posts.findIndex(p=>p.id===a.postId));openPostViewer(posts,i)}else openSocialProfile(a.actor)};host.appendChild(row)}
  if(!host.children.length)host.innerHTML='<div class="empty-state">🔔 ɴᴏ ᴀᴄᴛɪᴠɪᴛʏ ʏᴇᴛ</div>';
};
$('postCommentsCountBtn')?.addEventListener('click',async()=>{if(!activePost)return;await renderPostComments();if(!$('postCommentsDialog').open)$('postCommentsDialog').showModal()});
