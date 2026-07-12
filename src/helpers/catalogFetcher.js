import picocolors from "picocolors";
import { CONFIG } from "../config.js";

/**
 * --- CATÁLOGO REMOTO ---
 * Intenta cargar las opciones desde GitHub.
 * Si tiene éxito, muestra el mensaje definido en el JSON.
 * Si falla, avisa y utiliza las opciones locales de respaldo.
 */
export async function getRemoteCatalog(type) {
  // DIRECTO: Si type es 'frontend', buscará 'frontend.json'. Sin parches intermedios.
  const url = `${CONFIG.CATALOG_BASE_URL}/${type}.json`;

  // Añade un timeout de 4 segundos para que el CLI no se quede colgado si el internet falla
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId); // Limpia el temporizador si responde a tiempo

    if (!response.ok) {
      throw new Error(`Archivo no encontrado (Status: ${response.status})`);
    }

    const data = await response.json();

    // Muestra el mensaje dinámico que viene dentro del archivo JSON remoto
    if (data.metadata && data.metadata.message) {
      console.log(picocolors.green(`\n📬 ${data.metadata.message}`));
    }

    // Retorna las opciones contenidas en el JSON si vienen en el formato correcto
    return Array.isArray(data.options) && data.options.length > 0
      ? data.options
      : null;
  } catch (error) {
    clearTimeout(timeoutId);

    // Muestra la alerta informativa estilizada avisando que se usará el respaldo local
    console.log(
      "\n" +
        picocolors.yellow("⚠️  Nota: ") +
        picocolors.white("No se pudo conectar al catálogo remoto de ") +
        picocolors.bold(picocolors.cyan(type)) +
        picocolors.white(". Usando configuración local por el momento."),
    );

    return null;
  }
}
