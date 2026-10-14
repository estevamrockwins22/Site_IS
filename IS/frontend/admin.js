/**
 * Identidade Subestimada — Painel Admin (sem backend)
 * Credenciais e persistência em localStorage
 */

/* =========================
   CREDENCIAIS
========================= */
const CREDENTIALS = {
  login: "Estevam",
  senha: "IS2025"
};

const STORAGE_KEY = "is_site_data";
const SESSION_KEY = "is_admin_session";

/* =========================
   DADOS PADRÃO (espelho do site)
========================= */
const DEFAULT_DATA = {
  historia: `A Identidade Subestimada surgiu em 2025 a partir da
vontade de criar um rock alternativo brasileiro com
identidade própria, sem abrir mão da simplicidade,
da experimentação e da liberdade criativa.

A banda passou por seus primeiros trabalhos e
lançamentos de forma independente, construindo sua
identidade através de composições, gravações caseiras
e colaboração entre os integrantes.

Em 2026, a banda avançou para uma nova fase com
Esquizofrenia Conjunta e Harmonia Invertida,
enquanto começou a se preparar para suas primeiras
apresentações ao vivo.`,

  integrantes: [
    { nome: "Giovanni Estevam", funcao: "Vocal / Guitarra" },
    { nome: "Arthur Carvalho", funcao: "Baixo" },
    { nome: "Natan Moreira", funcao: "Guitarra" },
    { nome: "Guilherme Evangelista", funcao: "Bateria" }
  ],

  redes: [
    { nome: "SPOTIFY", url: "https://open.spotify.com/artist/1HlJ0qpKqEYL7ksTZLVhMr" },
    { nome: "INSTAGRAM", url: "https://www.instagram.com/identidade.subestimada/" },
    { nome: "SOUNDCLOUD", url: "https://soundcloud.com/identidadesubestimada" },
    { nome: "YOUTUBE", url: "https://www.youtube.com/@IdentidadeSubestimada" },
    { nome: "LETRAS.MUS.BR", url: "https://www.letras.mus.br/identidade-subestimada/" }
  ],

  galeria: [
    { imagem: "img/galeria/banda-01.png", legenda: "Identidade Subestimada" },
    { imagem: "img/galeria/banda-02.jpg", legenda: "Identidade Subestimada" },
    { imagem: "img/galeria/banda-03.png", legenda: "Publicidade Ideias Tortas" }
  ],

  albuns: [
    {
      nome: "Arquivos",
      tipo: "EP",
      ano: 2025,
      capa: "img/arquivos.png",
      descricao: "Primeiro registro da Identidade Subestimada.",
      faixas: [
        { nome: "Identidade Subestimada", compositor: "Giovanni Estevam" },
        { nome: "Um Copo, Um Grunge e Um Violão", compositor: "Giovanni Estevam" },
        { nome: "Café", compositor: "Giovanni Estevam" },
        { nome: "Mais do que Apenas Criar", compositor: "Giovanni Estevam" },
        { nome: "Contra o Sistema", compositor: "Giovanni Estevam" }
      ]
    },
    {
      nome: "Ideias Tortas",
      tipo: "Álbum",
      ano: 2026,
      capa: "img/ideias-tortas.jpg",
      descricao: "Um dos primeiros trabalhos da banda, marcado pela produção independente.",
      faixas: [
        { nome: "Intro — Ideias Tortas", compositor: "Giovanni Estevam" },
        { nome: "Café com Leite (Streaming Version)", compositor: "Giovanni Estevam" },
        { nome: "Um Copo, Um Grunge e Um Violão (Remastered)", compositor: "Giovanni Estevam" },
        { nome: "Café", compositor: "Giovanni Estevam" },
        { nome: "Eventualmente", compositor: "Giovanni Estevam" },
        { nome: "Sorria", compositor: "Giovanni Estevam" },
        { nome: "No Vazio", compositor: "Giovanni Estevam" },
        { nome: "Idade Negada", compositor: "Giovanni Estevam" },
        { nome: "Na Cidade", compositor: "Giovanni Estevam" },
        { nome: "Noites Frias, Cobertores Quentes", compositor: "Giovanni Estevam" },
        { nome: "Identidade Subestimada", compositor: "Giovanni Estevam" }
      ]
    },
    {
      nome: "Esquizofrenia Conjunta",
      tipo: "Álbum",
      ano: 2026,
      capa: "img/esquizofrenia-conjunta.jpeg",
      descricao: "Trabalho que representa uma etapa importante na construção da identidade sonora da banda.",
      faixas: [
        { nome: "Intro — Rock na Veia, Funk na Cadeia", compositor: "Giovanni Estevam" },
        { nome: "Esquizofrenia Conjunta", compositor: "Giovanni Estevam" },
        { nome: "Trilha da Realidade", compositor: "Giovanni Estevam" },
        { nome: "Longe Demais", compositor: "Giovanni Estevam" },
        { nome: "Memórias", compositor: "Natan Moreira" },
        { nome: "Não Te Aguento Mais", compositor: "Natan Moreira e Giovanni Estevam" },
        { nome: "Areia no Relógio", compositor: "Arthur Carvalho e Giovanni Estevam" },
        { nome: "Cigarro de Café da Manhã", compositor: "Giovanni Estevam" },
        { nome: "Cê Vai Superar", compositor: "Giovanni Estevam" },
        { nome: "Cuide de Você", compositor: "Giovanni Estevam" },
        { nome: "Loucura/Realidade", compositor: "Giovanni Estevam" },
        { nome: "Espero", compositor: "Giovanni Estevam" }
      ]
    },
    {
      nome: "Harmonia Invertida",
      tipo: "Álbum",
      ano: 2026,
      capa: "img/harmonia-invertida.png",
      descricao: "Um trabalho que reúne diferentes lados da Identidade Subestimada, entre crítica social, relações, cotidiano e experimentação.",
      faixas: [
        { nome: "Intro — A 5km de Lugar Nenhum", compositor: "Giovanni Estevam" },
        { nome: "Harmonia Invertida (Radio Edit)", compositor: "Giovanni Estevam" },
        { nome: "Pão e Circo", compositor: "Giovanni Estevam" },
        { nome: "Já Era o Progresso", compositor: "Giovanni Estevam" },
        { nome: "Feminista", compositor: "Giovanni Estevam" },
        { nome: "Gaiola de Faraday", compositor: "Arthur Carvalho" },
        { nome: "Instabilidade Momentânea", compositor: "Giovanni Estevam" },
        { nome: "Ela Feliz, Eu Bem", compositor: "Giovanni Estevam" },
        { nome: "Veneno Antimonotonia", compositor: "Giovanni Estevam" },
        { nome: "Quase Sem Saber", compositor: "Natan Moreira" },
        { nome: "Dormindo no Ponto", compositor: "Giovanni Estevam" },
        { nome: "Geração dos Betas", compositor: "Giovanni Estevam" }
      ]
    }
  ],

  shows: [],

  avisos: [
    {
      titulo: "Site oficial no ar",
      corpo: "Bem-vindo ao site oficial da Identidade Subestimada. Acompanhe lançamentos, agenda e novidades por aqui.",
      data: "2026-01-01"
    }
  ]
};

/* =========================
   HELPERS
========================= */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function esc(s = "") {
  return String(s).replace(/[&<>"']/g, (m) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m])
  );
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...JSON.parse(JSON.stringify(DEFAULT_DATA)), ...parsed };
    }
  } catch (e) {
    console.warn("Erro ao ler localStorage", e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function flashBtn(btn, text = "SALVO") {
  const original = btn.textContent;
  btn.textContent = text;
  btn.classList.add("saved-flash");
  setTimeout(() => {
    btn.textContent = original;
    btn.classList.remove("saved-flash");
  }, 1400);
}

/* =========================
   AUTH
========================= */
function isLoggedIn() {
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

function setLoggedIn(v) {
  if (v) sessionStorage.setItem(SESSION_KEY, "1");
  else sessionStorage.removeItem(SESSION_KEY);
}

function showDashboard() {
  $("#loginView").hidden = true;
  $("#dashboard").hidden = false;
  $("#logoutBtn").hidden = false;
  renderAll();
}

function showLogin() {
  $("#loginView").hidden = false;
  $("#dashboard").hidden = true;
  $("#logoutBtn").hidden = true;
}

function handleLogin() {
  const user = ($("#loginUser").value || "").trim();
  const pass = $("#loginPass").value || "";
  const status = $("#loginStatus");

  if (user === CREDENTIALS.login && pass === CREDENTIALS.senha) {
    setLoggedIn(true);
    status.textContent = "";
    status.classList.remove("error");
    showDashboard();
  } else {
    status.textContent = "Login ou senha incorretos.";
    status.classList.add("error");
  }
}

/* =========================
   TABS
========================= */
function initTabs() {
  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".tab").forEach((t) => t.classList.remove("active"));
      $$(".tab-panel").forEach((p) => p.classList.remove("active"));
      tab.classList.add("active");
      const panel = $(`#panel-${tab.dataset.tab}`);
      if (panel) panel.classList.add("active");
    });
  });
}

/* =========================
   RENDER
========================= */
let data = loadData();

function renderAll() {
  data = loadData();
  $("#historyText").value = data.historia || "";
  renderMembers();
  renderAlbums();
  renderGallery();
  renderShows();
  renderNotices();
  renderLinks();
}

function renderMembers() {
  const box = $("#membersAdmin");
  if (!data.integrantes.length) {
    box.innerHTML = '<p class="empty-state">Nenhum integrante cadastrado.</p>';
    return;
  }
  box.innerHTML = data.integrantes
    .map(
      (m, i) => `
    <div class="admin-item" data-index="${i}">
      <div class="field-row">
        <div>
          <label>NOME</label>
          <input data-field="nome" value="${esc(m.nome)}" placeholder="Nome">
        </div>
        <div>
          <label>FUNÇÃO</label>
          <input data-field="funcao" value="${esc(m.funcao)}" placeholder="Função">
        </div>
      </div>
      <div class="admin-actions">
        <button class="btn save-item" type="button">SALVAR</button>
        <button class="btn btn-danger delete-item" type="button">EXCLUIR</button>
      </div>
    </div>`
    )
    .join("");

  box.querySelectorAll(".save-item").forEach((btn) => {
    btn.onclick = () => {
      const item = btn.closest(".admin-item");
      const i = +item.dataset.index;
      item.querySelectorAll("[data-field]").forEach((inp) => {
        data.integrantes[i][inp.dataset.field] = inp.value;
      });
      saveData(data);
      flashBtn(btn);
    };
  });
  box.querySelectorAll(".delete-item").forEach((btn) => {
    btn.onclick = () => {
      if (!confirm("Excluir este integrante?")) return;
      const i = +btn.closest(".admin-item").dataset.index;
      data.integrantes.splice(i, 1);
      saveData(data);
      renderMembers();
    };
  });
}

function renderAlbums() {
  const box = $("#albumsAdmin");
  if (!data.albuns.length) {
    box.innerHTML = '<p class="empty-state">Nenhum álbum cadastrado.</p>';
    return;
  }
  box.innerHTML = data.albuns
    .map((a, i) => {
      const faixas = (a.faixas || [])
        .map(
          (f, fi) => `
        <div class="track-row" data-fi="${fi}">
          <input data-tf="nome" value="${esc(f.nome)}" placeholder="Nome da faixa">
          <input data-tf="compositor" value="${esc(f.compositor || "")}" placeholder="Compositor">
          <button class="btn btn-ghost del-track" type="button">×</button>
        </div>`
        )
        .join("");
      return `
    <div class="admin-item" data-index="${i}">
      <div class="field-row">
        <div>
          <label>NOME</label>
          <input data-field="nome" value="${esc(a.nome)}" placeholder="Nome do álbum">
        </div>
        <div>
          <label>TIPO</label>
          <input data-field="tipo" value="${esc(a.tipo || "")}" placeholder="EP / Álbum">
        </div>
      </div>
      <div class="field-row">
        <div>
          <label>ANO</label>
          <input data-field="ano" value="${esc(a.ano || "")}" placeholder="2026">
        </div>
        <div>
          <label>CAPA (URL ou caminho)</label>
          <input data-field="capa" value="${esc(a.capa || "")}" placeholder="img/capa.jpg">
        </div>
      </div>
      <div class="field-full">
        <label>DESCRIÇÃO</label>
        <textarea data-field="descricao" rows="3">${esc(a.descricao || "")}</textarea>
      </div>
      <div class="tracks-box">
        <h4>FAIXAS</h4>
        <div class="tracks-list">${faixas || '<p class="empty-state">Nenhuma faixa.</p>'}</div>
        <button class="btn btn-ghost add-track" type="button" style="margin-top:8px">+ FAIXA</button>
      </div>
      <div class="admin-actions">
        <button class="btn save-item" type="button">SALVAR ÁLBUM</button>
        <button class="btn btn-danger delete-item" type="button">EXCLUIR ÁLBUM</button>
      </div>
    </div>`;
    })
    .join("");

  box.querySelectorAll(".save-item").forEach((btn) => {
    btn.onclick = () => {
      const item = btn.closest(".admin-item");
      const i = +item.dataset.index;
      item.querySelectorAll("[data-field]").forEach((inp) => {
        let v = inp.value;
        if (inp.dataset.field === "ano") v = parseInt(v, 10) || v;
        data.albuns[i][inp.dataset.field] = v;
      });
      const tracks = [];
      item.querySelectorAll(".track-row").forEach((row) => {
        tracks.push({
          nome: row.querySelector('[data-tf="nome"]').value,
          compositor: row.querySelector('[data-tf="compositor"]').value
        });
      });
      data.albuns[i].faixas = tracks;
      saveData(data);
      flashBtn(btn);
    };
  });

  box.querySelectorAll(".delete-item").forEach((btn) => {
    btn.onclick = () => {
      if (!confirm("Excluir este álbum?")) return;
      const i = +btn.closest(".admin-item").dataset.index;
      data.albuns.splice(i, 1);
      saveData(data);
      renderAlbums();
    };
  });

  box.querySelectorAll(".add-track").forEach((btn) => {
    btn.onclick = () => {
      const item = btn.closest(".admin-item");
      const i = +item.dataset.index;
      if (!data.albuns[i].faixas) data.albuns[i].faixas = [];
      data.albuns[i].faixas.push({ nome: "Nova faixa", compositor: "" });
      saveData(data);
      renderAlbums();
    };
  });

  box.querySelectorAll(".del-track").forEach((btn) => {
    btn.onclick = () => {
      const item = btn.closest(".admin-item");
      const i = +item.dataset.index;
      const fi = +btn.closest(".track-row").dataset.fi;
      data.albuns[i].faixas.splice(fi, 1);
      saveData(data);
      renderAlbums();
    };
  });
}

function renderGallery() {
  const box = $("#galleryAdmin");
  if (!data.galeria.length) {
    box.innerHTML = '<p class="empty-state">Nenhuma imagem na galeria.</p>';
    return;
  }
  box.innerHTML = data.galeria
    .map(
      (g, i) => `
    <div class="admin-item" data-index="${i}">
      <div class="field-row">
        <div>
          <label>IMAGEM (URL ou caminho)</label>
          <input data-field="imagem" value="${esc(g.imagem)}" placeholder="img/galeria/foto.jpg">
        </div>
        <div>
          <label>LEGENDA</label>
          <input data-field="legenda" value="${esc(g.legenda || "")}" placeholder="Legenda">
        </div>
      </div>
      <div class="admin-actions">
        <button class="btn save-item" type="button">SALVAR</button>
        <button class="btn btn-danger delete-item" type="button">EXCLUIR</button>
      </div>
    </div>`
    )
    .join("");

  box.querySelectorAll(".save-item").forEach((btn) => {
    btn.onclick = () => {
      const item = btn.closest(".admin-item");
      const i = +item.dataset.index;
      item.querySelectorAll("[data-field]").forEach((inp) => {
        data.galeria[i][inp.dataset.field] = inp.value;
      });
      saveData(data);
      flashBtn(btn);
    };
  });
  box.querySelectorAll(".delete-item").forEach((btn) => {
    btn.onclick = () => {
      if (!confirm("Excluir esta imagem?")) return;
      const i = +btn.closest(".admin-item").dataset.index;
      data.galeria.splice(i, 1);
      saveData(data);
      renderGallery();
    };
  });
}

function renderShows() {
  const box = $("#showsAdmin");
  if (!data.shows.length) {
    box.innerHTML = '<p class="empty-state">Nenhum show cadastrado.</p>';
    return;
  }
  box.innerHTML = data.shows
    .map(
      (s, i) => `
    <div class="admin-item" data-index="${i}">
      <div class="field-row">
        <div>
          <label>DATA (AAAA-MM-DD)</label>
          <input data-field="data" value="${esc(s.data || "")}" placeholder="2026-06-15">
        </div>
        <div>
          <label>HORÁRIO</label>
          <input data-field="horario" value="${esc(s.horario || "")}" placeholder="21:00">
        </div>
      </div>
      <div class="field-row">
        <div>
          <label>EVENTO</label>
          <input data-field="evento" value="${esc(s.evento || "")}" placeholder="Nome do evento">
        </div>
        <div>
          <label>LOCAL</label>
          <input data-field="local" value="${esc(s.local || "")}" placeholder="Venue">
        </div>
      </div>
      <div class="field-row">
        <div>
          <label>CIDADE</label>
          <input data-field="cidade" value="${esc(s.cidade || "")}" placeholder="Cidade">
        </div>
        <div>
          <label>ENDEREÇO</label>
          <input data-field="endereco" value="${esc(s.endereco || "")}" placeholder="Endereço">
        </div>
      </div>
      <div class="field-row">
        <div>
          <label>LINK INGRESSOS</label>
          <input data-field="ingressos" value="${esc(s.ingressos || "")}" placeholder="https://...">
        </div>
        <div>
          <label>STATUS</label>
          <input data-field="status" value="${esc(s.status || "upcoming")}" placeholder="upcoming / completed / cancelled">
        </div>
      </div>
      <div class="admin-actions">
        <button class="btn save-item" type="button">SALVAR</button>
        <button class="btn btn-danger delete-item" type="button">EXCLUIR</button>
      </div>
    </div>`
    )
    .join("");

  box.querySelectorAll(".save-item").forEach((btn) => {
    btn.onclick = () => {
      const item = btn.closest(".admin-item");
      const i = +item.dataset.index;
      item.querySelectorAll("[data-field]").forEach((inp) => {
        data.shows[i][inp.dataset.field] = inp.value;
      });
      saveData(data);
      flashBtn(btn);
    };
  });
  box.querySelectorAll(".delete-item").forEach((btn) => {
    btn.onclick = () => {
      if (!confirm("Excluir este show?")) return;
      const i = +btn.closest(".admin-item").dataset.index;
      data.shows.splice(i, 1);
      saveData(data);
      renderShows();
    };
  });
}

function renderNotices() {
  const box = $("#noticesAdmin");
  if (!data.avisos.length) {
    box.innerHTML = '<p class="empty-state">Nenhum aviso publicado.</p>';
    return;
  }
  box.innerHTML = data.avisos
    .map(
      (n, i) => `
    <div class="admin-item" data-index="${i}">
      <div class="field-row">
        <div>
          <label>TÍTULO</label>
          <input data-field="titulo" value="${esc(n.titulo || "")}" placeholder="Título">
        </div>
        <div>
          <label>DATA (AAAA-MM-DD)</label>
          <input data-field="data" value="${esc(n.data || "")}" placeholder="2026-01-01">
        </div>
      </div>
      <div class="field-full">
        <label>TEXTO</label>
        <textarea data-field="corpo" rows="4">${esc(n.corpo || "")}</textarea>
      </div>
      <div class="admin-actions">
        <button class="btn save-item" type="button">SALVAR</button>
        <button class="btn btn-danger delete-item" type="button">EXCLUIR</button>
      </div>
    </div>`
    )
    .join("");

  box.querySelectorAll(".save-item").forEach((btn) => {
    btn.onclick = () => {
      const item = btn.closest(".admin-item");
      const i = +item.dataset.index;
      item.querySelectorAll("[data-field]").forEach((inp) => {
        data.avisos[i][inp.dataset.field] = inp.value;
      });
      saveData(data);
      flashBtn(btn);
    };
  });
  box.querySelectorAll(".delete-item").forEach((btn) => {
    btn.onclick = () => {
      if (!confirm("Excluir este aviso?")) return;
      const i = +btn.closest(".admin-item").dataset.index;
      data.avisos.splice(i, 1);
      saveData(data);
      renderNotices();
    };
  });
}

function renderLinks() {
  const box = $("#linksAdmin");
  if (!data.redes.length) {
    box.innerHTML = '<p class="empty-state">Nenhum link cadastrado.</p>';
    return;
  }
  box.innerHTML = data.redes
    .map(
      (l, i) => `
    <div class="admin-item" data-index="${i}">
      <div class="field-row">
        <div>
          <label>NOME</label>
          <input data-field="nome" value="${esc(l.nome)}" placeholder="SPOTIFY">
        </div>
        <div>
          <label>URL</label>
          <input data-field="url" value="${esc(l.url)}" placeholder="https://...">
        </div>
      </div>
      <div class="admin-actions">
        <button class="btn save-item" type="button">SALVAR</button>
        <button class="btn btn-danger delete-item" type="button">EXCLUIR</button>
      </div>
    </div>`
    )
    .join("");

  box.querySelectorAll(".save-item").forEach((btn) => {
    btn.onclick = () => {
      const item = btn.closest(".admin-item");
      const i = +item.dataset.index;
      item.querySelectorAll("[data-field]").forEach((inp) => {
        data.redes[i][inp.dataset.field] = inp.value;
      });
      saveData(data);
      flashBtn(btn);
    };
  });
  box.querySelectorAll(".delete-item").forEach((btn) => {
    btn.onclick = () => {
      if (!confirm("Excluir este link?")) return;
      const i = +btn.closest(".admin-item").dataset.index;
      data.redes.splice(i, 1);
      saveData(data);
      renderLinks();
    };
  });
}

/* =========================
   ADD / RESET
========================= */
function bindActions() {
  $("#saveHistory").onclick = () => {
    data.historia = $("#historyText").value;
    saveData(data);
    flashBtn($("#saveHistory"));
  };

  $("#addMember").onclick = () => {
    data.integrantes.push({ nome: "Novo integrante", funcao: "Função" });
    saveData(data);
    renderMembers();
  };

  $("#addAlbum").onclick = () => {
    data.albuns.push({
      nome: "Novo lançamento",
      tipo: "Álbum",
      ano: new Date().getFullYear(),
      capa: "",
      descricao: "Edite esta descrição.",
      faixas: []
    });
    saveData(data);
    renderAlbums();
  };

  $("#addGallery").onclick = () => {
    data.galeria.push({ imagem: "img/galeria/", legenda: "Nova imagem" });
    saveData(data);
    renderGallery();
  };

  $("#addShow").onclick = () => {
    data.shows.push({
      data: new Date().toISOString().slice(0, 10),
      horario: "",
      evento: "Novo show",
      local: "",
      cidade: "",
      endereco: "",
      ingressos: "",
      status: "upcoming"
    });
    saveData(data);
    renderShows();
  };

  $("#addNotice").onclick = () => {
    data.avisos.push({
      titulo: "Novo aviso",
      corpo: "Edite este aviso.",
      data: new Date().toISOString().slice(0, 10)
    });
    saveData(data);
    renderNotices();
  };

  $("#addLink").onclick = () => {
    data.redes.push({ nome: "NOVA REDE", url: "https://" });
    saveData(data);
    renderLinks();
  };

  $("#resetDataBtn").onclick = () => {
    if (!confirm("Restaurar todos os dados para o padrão original? Isso apaga as edições salvas neste navegador.")) return;
    localStorage.removeItem(STORAGE_KEY);
    data = loadData();
    renderAll();
  };

  $("#loginBtn").onclick = handleLogin;
  $("#loginPass").addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleLogin();
  });
  $("#loginUser").addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleLogin();
  });

  $("#logoutBtn").onclick = () => {
    setLoggedIn(false);
    showLogin();
  };
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  bindActions();
  if (isLoggedIn()) showDashboard();
  else showLogin();
});
