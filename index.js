#!/usr/bin/env node
import { intro, outro } from "@clack/prompts";
import pc from "picocolors";
import { checkSystemRequirements } from "./src/helpers/systemChecker.js";

/**
 * ¿Qué hace este código?:
 * Es el orquestador maestro del CLI. Sigue un flujo secuencial estricto:
 * 1. Diagnóstico del sistema (El Guardián).
 * 2. Recopilación de deseos del usuario (Prompts).
 * 3. Ejecución de la construcción (Constructor).
 */

async function run() {
  // 1. Bienvenida inicial
  intro(pc.bgCyan(pc.black(" 🚀 TAB&CODE FACTORY ")));

  // 2. Verificación del entorno
  // Si el Guardián encuentra fallos, detiene la ejecución inmediatamente
  const systemStatus = await checkSystemRequirements();

  if (!systemStatus.success) {
    outro(
      pc.red(
        "❌ El proceso ha sido cancelado por falta de dependencias obligatorias.",
      ),
    );
    process.exit(1);
  }

  // 3. Cargamos los módulos pesados solo cuando sabemos que todo está bien.
  // Esto evita errores de "Módulo no encontrado" durante el diagnóstico.
  const { askProjectQuestions } = await import("./src/helpers/prompts.js");
  const { buildProject } = await import("./src/installers/projectBuilder.js");

  // 4. Interacción con el usuario
  const answers = await askProjectQuestions();

  // 5. Salida temprana si el usuario decide abortar
  if (answers.tipoProyecto === "salir") {
    outro("👋 ¡Hasta la próxima!");
    process.exit(0);
  }

  // 6. Construcción física del proyecto
  // Pasamos 'answers' (lo que quiere) y 'systemStatus.features' (lo que tiene instalado)
  await buildProject(answers, systemStatus.features);

  outro(pc.green("✅ ¡Proyecto generado exitosamente!"));
}

// Ejecución con protección global de errores
run().catch((err) => {
  console.error(pc.red("❌ Error crítico durante la ejecución:"), err);
  process.exit(1);
});
