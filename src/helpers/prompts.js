import * as p from "@clack/prompts";
import picocolors from "picocolors";
import { CONFIG } from "../config.js";
import { getRemoteCatalog } from "./catalogFetcher.js";

export async function askProjectQuestions() {
  let answers = {};
  let step = "nombre";

  p.note(
    "Presiona " +
      picocolors.bold("Ctrl + C") +
      " para salir en cualquier momento.",
  );

  while (step !== "done") {
    switch (step) {
      case "nombre":
        answers.nombreProyecto = await p.text({
          message: "¿Cómo llamaremos a tu nuevo proyecto?",
          placeholder: "ej: mi-tienda-online",
          validate: (v) =>
            !v ? "Nombre obligatorio" : v.includes(" ") ? "Sin espacios" : null,
        });
        if (p.isCancel(answers.nombreProyecto)) process.exit(0);
        step = "tipo";
        break;

      case "tipo":
        const tipo = await p.select({
          message: "¿Qué arquitectura deseas utilizar?",
          options: [
            {
              value: "front",
              label: "Frontend 🎨",
              hint: "Solo la parte visual. Ideal si ya tienes una API.",
            },
            {
              value: "back",
              label: "Backend ⚙️",
              hint: "Crea la lógica y la API de tu servidor.",
            },
            {
              value: "fullstack",
              label: "Fullstack 📦",
              hint: "La solución completa: Frontend + API integrados.",
            },
            {
              value: "back_menu",
              label: picocolors.yellow("⬅️ Volver al nombre"),
            },
          ],
        });
        if (p.isCancel(tipo)) process.exit(0);
        if (tipo === "back_menu") step = "nombre";
        else {
          answers.tipoProyecto = tipo;
          step = "framework";
        }
        break;

      case "framework":
        const options = await getOptionsForType(answers.tipoProyecto);

        const framework = await p.select({
          message: `Selecciona tu tecnología para ${answers.tipoProyecto.toUpperCase()}:`,
          options: [
            ...options,
            {
              value: "back_menu",
              label: picocolors.yellow("⬅️ Volver a arquitectura"),
            },
          ],
        });

        if (p.isCancel(framework)) process.exit(0);
        if (framework === "back_menu") step = "tipo";
        else {
          answers.framework = framework;
          step = "confirmar";
        }
        break;

      case "confirmar":
        p.log.info(
          picocolors.cyan("Resumen: ") +
            `${answers.nombreProyecto} / ${answers.tipoProyecto} / ${answers.framework}`,
        );
        const ok = await p.confirm({ message: "¿Todo correcto?" });
        if (p.isCancel(ok)) process.exit(0);
        if (ok) step = "done";
        else step = "tipo";
        break;
    }
  }
  return answers;
}

// Función auxiliar que mantiene los hints y descripciones
async function getOptionsForType(tipo) {
  let remote = [];
  if (tipo === "front") remote = await getRemoteCatalog("frontend");
  if (tipo === "back") remote = await getRemoteCatalog("backend");

  const base =
    (tipo === "front" ? CONFIG.OPCIONES_FRONT : CONFIG.OPCIONES_BACK) || [];
  const options = remote || base;

  return options.map((opt) => ({
    ...opt,
    hint: opt.hint || "Tecnología seleccionable para este proyecto.",
  }));
}
