const API=window.API_BASE;
let session=null;
const supabaseUrl="COLOQUE_SUPABASE_URL_AQUI";
const supabaseAnon="COLOQUE_SUPABASE_ANON_KEY_AQUI";
let sb=null;
if(window.supabase && !supabaseUrl.includes("COLOQUE")) sb=window.supabase.createClient(supabaseUrl,supabaseAnon);

const $=s=>document.querySelector(s);
function esc(s=""){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}

async function api(path, options={}){
  const headers={"Content-Type":"application/json",...(options.headers||{})};
  if(session?.access_token) headers.Authorization=`Bearer ${session.access_token}`;
  const r=await fetch(`${API}/${path}`,{...options,headers});
  if(!r.ok) throw new Error(await r.text());
  return r.status===204?null:r.json();
}

function renderList(container, items, fields, resource){
  $(container).innerHTML=items.map(item=>`<div class="admin-item" data-id="${item.id}">
    ${fields.map(f=>`<input data-field="${f}" value="${esc(item[f]??"")}" placeholder="${f}">`).join("")}
    <div class="admin-actions"><button class="btn save-item">SALVAR</button><button class="btn btn-ghost delete-item">EXCLUIR</button></div>
  </div>`).join("");
  document.querySelectorAll(`${container} .save-item`).forEach(btn=>btn.onclick=async()=>{
    const box=btn.closest(".admin-item"); const body={};
    box.querySelectorAll("[data-field]").forEach(i=>body[i.dataset.field]=i.value);
    await api(`${resource}/${box.dataset.id}`,{method:"PATCH",body:JSON.stringify(body)}); btn.textContent="SALVO";
  });
  document.querySelectorAll(`${container} .delete-item`).forEach(btn=>btn.onclick=async()=>{
    if(!confirm("Excluir este item?"))return;
    const box=btn.closest(".admin-item"); await api(`${resource}/${box.dataset.id}`,{method:"DELETE"}); box.remove();
  });
}

async function refresh(){
  const [band,members,albums,shows,notices,links]=await Promise.all([api("banda"),api("integrantes"),api("albuns"),api("shows"),api("avisos"),api("links")]);
  $("#history").value=band[0]?.history||"";
  renderList("#membersAdmin",members,["name","role","photo_url","bio","sort_order"],"integrantes");
  renderList("#albumsAdmin",albums,["title","release_type","release_year","track_count","description","cover_url","spotify_url","soundcloud_url","youtube_url","sort_order"],"albuns");
  renderList("#showsAdmin",shows,["date","time","event_name","venue","city","address","ticket_url","status"],"shows");
  renderList("#noticesAdmin",notices,["title","body","image_url","author"],"avisos");
  renderList("#linksAdmin",links,["label","url","sort_order"],"links");
}
async function login(){
  if(!sb){$("#loginStatus").textContent="Configure SUPABASE_URL e SUPABASE_ANON_KEY em admin.js.";return;}
  const {data,error}=await sb.auth.signInWithPassword({email:$("#email").value,password:$("#password").value});
  if(error){$("#loginStatus").textContent=error.message;return;}
  session=data.session; $("#loginView").hidden=true; $("#dashboard").hidden=false; refresh();
}
$("#login").onclick=login;
$("#logout").onclick=async()=>{if(sb)await sb.auth.signOut();location.reload()};
$("#saveHistory").onclick=async()=>{const b=await api("banda");await api(`banda/${b[0].id}`,{method:"PATCH",body:JSON.stringify({history:$("#history").value})});$("#saveHistory").textContent="SALVO"};
$("#addMember").onclick=async()=>{await api("integrantes",{method:"POST",body:JSON.stringify({name:"Novo integrante",role:"Função",sort_order:99})});refresh()};
$("#addAlbum").onclick=async()=>{await api("albuns",{method:"POST",body:JSON.stringify({title:"Novo lançamento",release_type:"Álbum",description:"Edite esta descrição.",sort_order:99})});refresh()};
$("#addShow").onclick=async()=>{await api("shows",{method:"POST",body:JSON.stringify({date:new Date().toISOString().slice(0,10),event_name:"Novo show",status:"upcoming"})});refresh()};
$("#addNotice").onclick=async()=>{await api("avisos",{method:"POST",body:JSON.stringify({title:"Novo aviso",body:"Edite este aviso."})});refresh()};
$("#addLink").onclick=async()=>{await api("links",{method:"POST",body:JSON.stringify({label:"Nova rede",url:"https://",sort_order:99})});refresh()};
