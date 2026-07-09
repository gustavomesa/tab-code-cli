import { execa } from "execa";
import picocolors from "picocolors";
import { CONFIG } from "../config.js"; // Importamos el almacén centralizado de datos

/**
 * Comprueba de forma silenciosa si un comando básico existe en el sistema.
 *
 * @param {string} command - Comando a evaluar (ej. 'git', 'pnpm')
 * @returns {Promise<boolean>} - True si existe y responde, False si no.
 */
async function checkCommand(command) {
  try {
    await execa(command, ["--version"]);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Comprueba de forma especializada si Docker está encendido y escuchando peticiones.
 *
 * @returns {Promise<boolean>} - True si el servicio de Docker está activo.
 */
async function checkDocker() {
  try {
    await execa("docker", ["info"]);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Guardián Elástico del Sistema: Escanea el PC del usuario.
 * - Bloquea el flujo SÓLO si faltan los gestores de paquetes críticos (pnpm, pipenv).
 * - Informa amigablemente si las herramientas opcionales (git, docker) están ausentes,
 *   ofreciendo sus enlaces oficiales de descarga en caso de que decida utilizarlas.
 *
 * @returns {Promise<{ success: boolean, features: { git: boolean, docker: boolean } }>}
 * Retorna un objeto con el estado de la validación y el mapa de características disponibles.
 */
export async function checkSystemRequirements() {
  // 1. Escaneo simultáneo en paralelo de todo el entorno del desarrollador
  const [hasGit, hasPnpm, hasPipenv, hasDocker] = await Promise.all([
    checkCommand("git"),
    checkCommand("pnpm"),
    checkCommand("pipenv"),
    checkDocker(),
  ]);

  // 2. FILTRO 1: Candado de Seguridad para Herramientas Críticas Obligatorias
  if (!hasPnpm || !hasPipenv) {
    console.log(
      "\n" +
        picocolors.red(
          "🛑 [ERROR CRÍTICO] Tu máquina no tiene los gestores base indispensables:",
        ),
    );
    console.log(
      picocolors.yellow(
        "─────────────────────────────────────────────────────────────────────────────",
      ),
    );

    if (!hasPnpm) {
      console.log(
        ` • ${picocolors.bold("pnpm")}: ${picocolors.red("Falta.")} Es obligatorio para empaquetar el Front con Vite.`,
      );
      console.log(
        `   👉 Instrucciones: ${picocolors.cyan(CONFIG.ENLACES_INSTALACION.pnpm)}\n`,
      );
    }

    if (!hasPipenv) {
      console.log(
        ` • ${picocolors.bold("pipenv")}: ${picocolors.red("Falta.")} Es obligatorio para aislar el entorno Python del Back.`,
      );
      console.log(
        `   👉 Guía de instalación: ${picocolors.cyan(CONFIG.ENLACES_INSTALACION.pipenv)}\n`,
      );
    }

    console.log(
      picocolors.yellow(
        "─────────────────────────────────────────────────────────────────────────────",
      ),
    );
    console.log(
      picocolors.italic(
        "El CLI no puede construir proyectos sin estas herramientas. Instálalas e intenta de nuevo.\n",
      ),
    );

    return { success: false, features: { git: hasGit, docker: hasDocker } };
  }

  // 3. FILTRO 2: Avisos Dinámicos para Herramientas Opcionales Ausentes
  if (!hasGit || !hasDocker) {
    console.log(
      "\n" +
        picocolors.blue(
          "ℹ️  [AVISO DE ENTORNO] Herramientas opcionales ausentes detectadas:",
        ),
    );
    console.log(
      picocolors.blue(
        "⚠️  Si tienes planeado utilizarlas en este u otros proyectos, recuerda instalarlas:",
      ),
    );
    console.log(
      picocolors.gray(
        "─────────────────────────────────────────────────────────────────────────────",
      ),
    );

    if (!hasGit) {
      console.log(
        ` • ${picocolors.bold("Git")}: ${picocolors.yellow("No detectado.")} El CLI saltará la inicialización automática del repositorio.`,
      );
      console.log(
        `   👉 Descarga oficial: ${picocolors.cyan(CONFIG.ENLACES_INSTALACION.git)}\n`,
      );
    }

    if (!hasDocker) {
      console.log(
        ` • ${picocolors.bold("Docker")}: ${picocolors.yellow("Apagado o ausente.")} Las opciones de bases de datos automatizadas en contenedores no estarán disponibles.`,
      );
      console.log(
        `   👉 Descarga oficial: ${picocolors.cyan(CONFIG.ENLACES_INSTALACION.docker)}\n`,
      );
    }
    console.log(
      picocolors.gray(
        "─────────────────────────────────────────────────────────────────────────────\n",
      ),
    );
  }

  // 4. Retornamos luz verde junto con el reporte de qué funciones opcionales podemos usar
  return {
    success: true,
    features: {
      git: hasGit,
      docker: hasDocker,
    },
  };
}
