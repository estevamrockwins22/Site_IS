import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const adminSupabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN?.split(",") || "*",
  credentials: false
}));
app.use(express.json({ limit: "2mb" }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false
});

async function requireAdmin(req, res, next) {
  try {
    const auth = req.headers.authorization || "";
    if (!auth.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Não autenticado." });
    }

    const token = auth.slice(7);
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
      return res.status(401).json({ error: "Sessão inválida." });
    }

    const { data: profile, error: profileError } = await adminSupabase
      .from("admin_profiles")
      .select("user_id, role")
      .eq("user_id", data.user.id)
      .single();

    if (profileError || !profile || profile.role !== "admin") {
      return res.status(403).json({ error: "Acesso administrativo negado." });
    }

    req.user = data.user;
    next();
  } catch {
    res.status(500).json({ error: "Erro ao validar administrador." });
  }
}

const publicTables = {
  banda: "band_info",
  integrantes: "members",
  albuns: "albums",
  faixas: "tracks",
  galeria: "gallery",
  shows: "shows",
  avisos: "notices",
  links: "social_links"
};

app.get("/api/:resource", async (req, res) => {
  const table = publicTables[req.params.resource];
  if (!table) return res.status(404).json({ error: "Recurso não encontrado." });

  let query = adminSupabase.from(table).select("*");

  if (table === "members") query = query.order("sort_order", { ascending: true });
  if (table === "albums") query = query.order("release_year", { ascending: false }).order("sort_order");
  if (table === "tracks") query = query.order("album_id").order("track_number");
  if (table === "gallery") query = query.order("sort_order");
  if (table === "shows") query = query.order("date", { ascending: true });
  if (table === "notices") query = query.order("published_at", { ascending: false });
  if (table === "social_links") query = query.order("sort_order");

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get("/api/albuns/:id", async (req, res) => {
  const { data: album, error } = await adminSupabase
    .from("albums").select("*").eq("id", req.params.id).single();

  if (error) return res.status(404).json({ error: "Álbum não encontrado." });

  const { data: tracks, error: trackError } = await adminSupabase
    .from("tracks").select("*").eq("album_id", req.params.id)
    .order("track_number");

  if (trackError) return res.status(500).json({ error: trackError.message });
  res.json({ album, tracks });
});

const adminResources = {
  banda: "band_info",
  integrantes: "members",
  albuns: "albums",
  faixas: "tracks",
  galeria: "gallery",
  shows: "shows",
  avisos: "notices",
  links: "social_links"
};

app.post("/api/:resource", requireAdmin, async (req, res) => {
  const table = adminResources[req.params.resource];
  if (!table) return res.status(404).json({ error: "Recurso não encontrado." });

  const { data, error } = await adminSupabase.from(table).insert(req.body).select().single();
  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
});

app.patch("/api/:resource/:id", requireAdmin, async (req, res) => {
  const table = adminResources[req.params.resource];
  if (!table) return res.status(404).json({ error: "Recurso não encontrado." });

  const { data, error } = await adminSupabase
    .from(table).update(req.body).eq("id", req.params.id).select().single();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.delete("/api/:resource/:id", requireAdmin, async (req, res) => {
  const table = adminResources[req.params.resource];
  if (!table) return res.status(404).json({ error: "Recurso não encontrado." });

  const { error } = await adminSupabase.from(table).delete().eq("id", req.params.id);
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).end();
});

app.post("/api/contato", contactLimiter, async (req, res) => {
  const { name, email, subject, message, website } = req.body;

  if (website) return res.status(200).json({ ok: true });
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Preencha nome, e-mail e mensagem." });
  }

  const { error } = await adminSupabase.from("contact_messages").insert({
    name, email, subject: subject || null, message
  });

  if (error) return res.status(500).json({ error: "Não foi possível enviar a mensagem." });
  res.status(201).json({ ok: true });
});

app.listen(port, () => {
  console.log(`Identidade Subestimada API em http://localhost:${port}`);
});
