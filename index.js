import { select, intro, outro, spinner } from "@clack/prompts";
import { getRemoteCatalog } from "./src/helpers/catalogFetcher.js";
import pc from "picocolors";

async function run() {
  intro(pc.cyan("🚀 Iniciando Tab-Code-CLI..."));

  const s = spinner();
  s.start("Verificando catálogos...");

  const frontData = await getRemoteCatalog("front");
  const backData = await getRemoteCatalog("back");

  s.stop("Verificación finalizada.");

  // Si alguno de los dos falla, el CLI se detiene con un mensaje claro
  if (!frontData || !backData) {
    outro(pc.red("❌ El proceso no puede continuar porque faltan catálogos."));
    process.exit(1);
  }

  // Si llegamos aquí, es que hay datos. Mostramos los selects:
  const frontend = await select({
    message: "¿Qué tecnología frontend quieres usar?",
    options: frontData.map((item) => ({ label: item.name, value: item.value })),
  });

  const backend = await select({
    message: "¿Qué tecnología backend quieres usar?",
    options: backData.map((item) => ({ label: item.name, value: item.value })),
  });

  outro(pc.green(`✅ Has seleccionado: ${frontend} y ${backend}`));
}

run();
