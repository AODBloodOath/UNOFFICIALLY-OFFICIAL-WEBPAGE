const $=q=>document.querySelector(q);
async function loadJSON(p){const r=await fetch(p);return r.ok?r.json():null}

async function loadServers(){
  const d=await loadJSON("data/servers.json");if(!d)return;
  $("#serverGrid").innerHTML=d.servers.map(s=>`<div class="card"><h3>${s.name}</h3><p>${s.map} • ${s.slots} slots</p></div>`).join("");
}
async function loadGallery(){
  const d=await loadJSON("data/gallery.json");if(!d)return;
  $("#galleryGrid").innerHTML=d.images.map(i=>`<div class="g-item"><img src="${i.src}"/></div>`).join("");
}
async function loadSupporters(){
  const d=await loadJSON("data/supporters.json");if(!d)return;
  $("#supporterGrid").innerHTML=d.supporters.map(s=>`<div class="supporter"><strong>${s.name}</strong><br>${s.tier}</div>`).join("");
}

function initMusic(){
  const audio=$("#menuMusic");
  const btn=$("#musicToggle");
  if(!audio||!btn)return;

  const saved=localStorage.getItem("musicOn")==="true";
  audio.volume=0.35;

  if(saved){
    audio.play().catch(()=>{});
    btn.classList.add("music-on");
  }

  btn.addEventListener("click",()=>{
    if(audio.paused){
      audio.play().catch(()=>{});
      btn.classList.add("music-on");
      localStorage.setItem("musicOn","true");
    }else{
      audio.pause();
      btn.classList.remove("music-on");
      localStorage.setItem("musicOn","false");
    }
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  loadServers();loadGallery();loadSupporters();initMusic();
});
