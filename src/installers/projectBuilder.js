import fs from "fs-extra";
import path from "path";
import pc from "picocolors";
import * as p from "@clack/prompts";

/**
 * ¿Qué hace este código?:
 * Es el constructor físico del proyecto. Toma las decisiones del usuario y
 * crea las carpetas, copia los archivos de plantillas y prepara el entorno.
 *
 * @param {Object} answers - Respuestas del usuario (nombre, tipo, frameworks).
 * @param {Object} features - Estado de herramientas (git, docker).
 */
export async function buildProject(answers, features) {
  const projectPath = path.join(process.cwd(), answers.nombreProyecto);
  const spinner = p.spinner();

  spinner.start(`Construyendo ${answers.nombreProyecto}...`);

  try {
    // 1. Verificación de seguridad: ¿La carpeta ya existe?
    if (fs.existsSync(projectPath)) {
      spinner.stop(pc.red("Error"));
      console.log(
        pc.red(`❌ La carpeta '${answers.nombreProyecto}' ya existe.`),
      );
      return;
    }

    // 2. Creación de estructura básica
    await fs.mkdir(projectPath);

    // Aquí es donde en el futuro llamarás a tus funciones de copia de archivos
    // Ejemplo: await copyTemplate(answers.frameworkFront, projectPath);

    // 3. Simulación de trabajo (Aquí construirás tus archivos)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    spinner.stop(pc.green("Éxito"));
    console.log(pc.blue(`✅ Proyecto creado en: ${projectPath}`));

    // 4. Lógica condicionada por las herramientas (features)
    if (features.git) {
      console.log(pc.yellow("⚙️  Inicializando repositorio Git..."));
      // Aquí ejecutarías execa('git', ['init'], { cwd: projectPath });
    }

    if (features.docker) {
      console.log(
        pc.blue("🐳 Docker detectado: Preparando archivos de contenedores..."),
      );
    }
  } catch (error) {
    spinner.stop(pc.red("Error"));
    console.error(
      pc.red("❌ Ocurrió un error al construir el proyecto:"),
      error,
    );
  }
}
