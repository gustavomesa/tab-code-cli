import * as p from "@clack/prompts";
import picocolors from "picocolors";
import { CONFIG } from "../config.js";
import { getRemoteCatalog } from "./catalogFetcher.js";

export async function askProjectQuestions() {
  console.clear();
  p.intro(
    picocolors.bgCyan(
      picocolors.black(" 🚀 FACTORÍA DE PROYECTOS - TAB&CODE CLI "),
    ),
  );

  const respuestas = await p.group(
    {
      nombreProyecto: () =>
        p.text({
          message: "¿Nombre del proyecto?",
          placeholder: "mi-proyecto",
        }),

      tipoProyecto: () =>
        p.select({
          message: "¿Qué tipo de proyecto?",
          options: [
            { value: "front", label: "Sólo Frontend 🎨" },
            { value: "back", label: "Sólo Backend ⚙️" },
            { value: "fullstack", label: "Fullstack Monorepo 📦" },
            { value: "salir", label: picocolors.red("❌ Salir") },
          ],
        }),

      frameworkFront: async ({ results }) => {
        if (results.tipoProyecto === "back" || results.tipoProyecto === "salir")
          return;

        // Intentar traer remoto, si no, usar local
        const remote = await getRemoteCatalog("frontend");
        const options = remote || CONFIG.OPCIONES_FRONT;

        return p.select({ message: "Selecciona Frontend:", options });
      },

      frameworkBack: async ({ results }) => {
        if (
          results.tipoProyecto === "front" ||
          results.tipoProyecto === "salir"
        )
          return;

        const remote = await getRemoteCatalog("backend");
        const options = remote || CONFIG.OPCIONES_BACK;

        return p.select({ message: "Selecciona Backend:", options });
      },
    },
    { onCancel: () => process.exit(0) },
  );

  return respuestas;
}
