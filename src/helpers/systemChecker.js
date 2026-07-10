import { execa } from "execa";
import picocolors from "picocolors";
import * as p from "@clack/prompts";
import { CONFIG } from "../config.js";

/**
 * --- PASO 1: LA HERRAMIENTA DE BÚSQUEDA ---
 * Esta función comprueba si un programa está instalado en el sistema.
 */
async function checkCommand(command) {
  try {
    await execa(command, ["--version"]);
    return true;
  } catch {
    return false;
  }
}

/**
 * --- PASO 2: DIAGNÓSTICO DE DOCKER ---
 * Docker no solo debe estar instalado, sino también "encendido" (corriendo).
 */
async function checkDockerStatus() {
  const isInstalled = await checkCommand("docker");
  if (!isInstalled) return "missing";

  try {
    await execa("docker", ["info"]);
    return "installed";
  } catch {
    return "off";
  }
}

/**
 * --- PASO 3: EL GUARDIÁN DEL PROYECTO ---
 * Revisa el estado del entorno y guía al usuario paso a paso.
 */
export async function checkSystemRequirements() {
  const s = p.spinner();
  s.start("Revisando que tu computadora tenga todo lo necesario...");

  const [hasGit, hasPnpm, hasPipenv, dockerStatus] = await Promise.all([
    checkCommand("git"),
    checkCommand("pnpm"),
    checkCommand("pipenv"),
    checkDockerStatus(),
  ]);

  s.stop("Revisión finalizada.");

  // 1. FILTRO: Software Obligatorio
  if (!hasPnpm || !hasPipenv) {
    console.log(
      "\n" +
        picocolors.bgRed(
          picocolors.white(" 🛑 ERROR CRÍTICO: FALTA SOFTWARE BASE "),
        ),
    );
    console.log(
      picocolors.red(
        "Para construir el proyecto, necesitamos que instales esto:\n",
      ),
    );

    if (!hasPnpm)
      console.log(
        ` • ${picocolors.bold("pnpm")}: Obligatorio para el Frontend. 👉 ${picocolors.cyan(CONFIG.ENLACES_INSTALACION.pnpm)}`,
      );
    if (!hasPipenv)
      console.log(
        ` • ${picocolors.bold("pipenv")}: Obligatorio para el Backend. 👉 ${picocolors.cyan(CONFIG.ENLACES_INSTALACION.pipenv)}`,
      );

    return {
      success: false,
      features: { git: hasGit, docker: dockerStatus === "installed" },
    };
  }

  // 2. FILTRO: Herramientas Opcionales (Reporte)
  const missing = [];
  if (!hasGit)
    missing.push({ name: "Git", link: CONFIG.ENLACES_INSTALACION.git });
  if (dockerStatus !== "installed")
    missing.push({ name: "Docker", link: CONFIG.ENLACES_INSTALACION.docker });

  if (missing.length === 0) {
    console.log(
      "\n" + picocolors.bgGreen(picocolors.black(" ✅ ¡TODO LISTO! ")),
    );
    console.log(
      picocolors.green("Tu equipo está perfecto para empezar a programar."),
    );
  } else {
    console.log(
      "\n" + picocolors.bgBlue(picocolors.white(" 💡 ESTADO DEL ENTORNO ")),
    );
    console.log(
      picocolors.blue(
        "Todo está listo, pero te informamos de algunos detalles:",
      ),
    );
    console.log(
      picocolors.gray(
        "─────────────────────────────────────────────────────────────────────────────",
      ),
    );

    missing.forEach((item) => {
      console.log(
        `${picocolors.yellow("• " + item.name + ":")} Es posible que no esté instalado o que no esté encendido.`,
      );
      console.log(
        `  👉 Puedes descargarlo o revisar su estado aquí: ${picocolors.cyan(item.link)}`,
      );
    });

    console.log(
      picocolors.gray(
        "─────────────────────────────────────────────────────────────────────────────",
      ),
    );

    // EXPLICACIÓN CLARA: Qué pierde el usuario si no tiene estas herramientas
    if (!hasGit)
      console.log(
        picocolors.italic(
          "⚠️  Sin Git: El CLI no podrá crear el repositorio ni realizar el primer 'commit'.",
        ),
      );
    if (dockerStatus !== "installed")
      console.log(
        picocolors.italic(
          "⚠️  Sin Docker: Las funciones de bases de datos automatizadas estarán desactivadas.",
        ),
      );

    console.log(
      picocolors.italic(
        "\n💡 Puedes continuar, pero estas funciones automáticas no estarán disponibles.",
      ),
    );
  }

  return {
    success: true,
    features: {
      git: hasGit,
      docker: dockerStatus === "installed",
    },
  };
}
