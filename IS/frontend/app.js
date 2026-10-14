const API = window.API_BASE || "/api";
const fallbackGallery = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=75",
  "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=900&q=75",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=75",
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=75",
  "https://images.unsplash.com/photo-1521337581100-8ca9a73a5f79?auto=format&fit=crop&w=900&q=75",
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=75"
];

async function get(resource) {
  const res = await fetch(`${API}/${resource}`);
  if (!res.ok) throw new Error("API");
  return res.json();
}

function esc(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}

async function load() {
  try {
    const [band,members,albums,gallery,shows,notices,links] = await Promise.all([
      get("banda"), get("integrantes"), get("albuns"), get("galeria"), get("shows"), get("avisos"), get("links")
    ]);
    document.querySelector("#historyText").textContent = band[0]?.history || "História da banda ainda não cadastrada.";
    document.querySelector("#members").innerHTML = members.map(m=>`<div class="member"><strong>${esc(m.name)}</strong><span>${esc(m.role)}</span></div>`).join("");
    document.querySelector("#albums").innerHTML = albums.map(a=>`
      <article class="album-card" data-id="${a.id}">
        <div class="album-cover">${a.cover_url?`<img src="${esc(a.cover_url)}" alt="Capa de ${esc(a.title)}">`:`<div class="placeholder-cover">IS.</div>`}</div>
        <div class="album-info"><h3>${esc(a.title)}</h3><p>${esc(a.release_type||"LANÇAMENTO")} · ${a.release_year||"ANO A DEFINIR"}</p></div>
      </article>`).join("");
    document.querySelectorAll(".album-card").forEach(c=>c.onclick=()=>openAlbum(c.dataset.id));
    document.querySelector("#gallery").innerHTML = (gallery.length?gallery:fallbackGallery.map((x,i)=>({image_url:x,caption:"Imagem demonstrativa — substitua no ADM",id:"f"+i}))).map(g=>`
      <div class="gallery-item" data-src="${esc(g.image_url)}" data-caption="${esc(g.caption||"")}">
        <img src="${esc(g.image_url)}" alt="${esc(g.caption||"Galeria da banda")}" loading="lazy"><span>${esc(g.caption||"")}</span>
      </div>`).join("");
    document.querySelectorAll(".gallery-item").forEach(g=>g.onclick=()=>openImage(g.dataset.src,g.dataset.caption));
    const upcoming=shows.filter(s=>s.status!=="completed"&&s.status!=="cancelled");
    document.querySelector("#showsList").innerHTML = upcoming.length ? upcoming.map(showHTML).join("") : `<p class="small">Nenhum show publicado no momento. A agenda pode ser atualizada pelo ADM.</p>`;
    document.querySelector("#notices").innerHTML = notices.length ? notices.map(n=>`<article class="notice"><time>${new Date(n.published_at).toLocaleDateString("pt-BR")}</time><h3>${esc(n.title)}</h3><p>${esc(n.body)}</p></article>`).join("") : `<p class="small">Nenhum aviso publicado.</p>`;
    document.querySelector("#socialLinks").innerHTML = links.map(l=>`<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} ↗</a>`).join("");
  } catch(e) {
    document.querySelector("#historyText").textContent = "Conecte o backend ao Supabase para carregar o conteúdo oficial.";
    document.querySelector("#albums").innerHTML = `<p class="small">API não conectada. O projeto está preparado para receber os dados do painel ADM.</p>`;
    document.querySelector("#gallery").innerHTML = fallbackGallery.map((x,i)=>`<div class="gallery-item"><img src="${x}" alt="Imagem demonstrativa"></div>`).join("");
  }
}

function showHTML(s){
  const d=new Date(s.date+"T00:00:00");
  return `<article class="show"><div class="show-date"><strong>${String(d.getDate()).padStart(2,"0")}</strong><span>${d.toLocaleDateString("pt-BR",{month:"short"}).toUpperCase()}</span></div><div><h3>${esc(s.event_name)}</h3><p>${esc(s.venue||"Local a confirmar")} — ${esc(s.city||"Cidade a confirmar")}</p><p>${esc(s.address||"Endereço a confirmar")}${s.time?" · "+esc(s.time.slice(0,5)):""}</p></div>${s.ticket_url?`<a class="btn btn-ghost" href="${esc(s.ticket_url)}" target="_blank" rel="noopener">INGRESSOS</a>`:""}</article>`;
}

async function openAlbum(id){
  const d=await fetch(`${API}/albuns/${id}`).then(r=>r.json());
  document.querySelector("#albumDetail").innerHTML=`<div class="album-detail"><div>${d.album.cover_url?`<img src="${esc(d.album.cover_url)}" alt="">`:`<div class="album-cover"><div class="placeholder-cover">IS.</div></div>`}</div><div><p class="eyebrow">${esc(d.album.release_type||"LANÇAMENTO")} / ${d.album.release_year||"ANO A DEFINIR"}</p><h2>${esc(d.album.title)}</h2><p>${esc(d.album.description||"")}</p><div>${d.tracks.map((t,i)=>`<div class="track"><span>${String(i+1).padStart(2,"0")}</span><span>${esc(t.title)}<br><small>${esc(t.composers||"Compositor não informado")}</small></span>${t.spotify_url?`<a href="${esc(t.spotify_url)}" target="_blank">OUVIR</a>`:""}</div>`).join("")}</div></div></div>`;
  document.querySelector("#albumModal").showModal();
}
function openImage(src,caption){document.querySelector("#imagePreview").src=src;document.querySelector("#imageCaption").textContent=caption;document.querySelector("#imageModal").showModal();}
document.querySelectorAll(".modal-close").forEach(b=>b.onclick=()=>b.closest("dialog").close());
document.querySelector(".menu-toggle").onclick=()=>document.querySelector("#nav").classList.toggle("open");
document.querySelectorAll("#nav a").forEach(a=>a.onclick=()=>document.querySelector("#nav").classList.remove("open"));
document.querySelector("#contactForm").onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target);const status=document.querySelector("#contactStatus");try{const r=await fetch(`${API}/contato`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(f))});if(!r.ok)throw new Error();status.textContent="Mensagem enviada.";e.target.reset()}catch{status.textContent="Não foi possível enviar. Verifique a conexão."}};
load();
