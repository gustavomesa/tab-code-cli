#!/usr/bin/env node
import { askProjectQuestions } from "./src/helpers/prompts.js";
import * as p from "@clack/prompts";
import picocolors from "picocolors";

async function main() {
  try {
    const rawData = await askProjectQuestions();

    // Limpieza de datos (quitamos nulos o 'salir')
    const datosFinales = Object.fromEntries(
      Object.entries(rawData).filter(
        ([_, v]) => v !== undefined && v !== "salir",
      ),
    );

    console.log("\n📦 " + picocolors.cyan("Datos capturados:"), datosFinales);
  } catch (error) {
    p.log.error("Error al ejecutar el CLI");
  }
}

main();
