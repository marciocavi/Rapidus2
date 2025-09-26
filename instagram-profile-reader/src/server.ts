import "dotenv/config";
import express from "express";
import cors from "cors";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
// Importaremos nossa lógica principal aqui depois de refatorá-la
import { analyzeProfile } from "./index.js";
import { readdir } from "node:fs/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

// Endpoint para análise do perfil
app.post("/analyze", async (req, res) => {
  const { username, apiKey } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    console.log(`Analyzing ${username} with key: ${apiKey ? "provided" : "not provided"}`);
    const result = await analyzeProfile(username, { apiKey });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to analyze profile" });
  }
});

// Endpoint para listar os perfis de fixture disponíveis
app.get("/profiles", async (req, res) => {
  try {
    const files = await readdir(join(__dirname, "./ingest/fixtures"));
    const profiles = files.filter(f => f.endsWith(".json")).map(f => f.replace(".json", ""));
    res.json({ profiles });
  } catch (error) {
    res.status(500).json({ error: "Failed to read profiles" });
  }
});

// Endpoint para buscar o conteúdo do prompt
app.get("/prompt", async (req, res) => {
  try {
    const promptContent = await readFile(join(__dirname, "../prompts/profile-summary.md"), "utf-8");
    res.json({ prompt: promptContent });
  } catch (error) {
    res.status(500).json({ error: "Failed to read prompt file" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
