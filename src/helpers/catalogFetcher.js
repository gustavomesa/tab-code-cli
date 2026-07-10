import picocolors from "picocolors";
import { CONFIG } from "../config.js";

/**
 * --- CATÁLOGO REMOTO ---
 * Intenta cargar las opciones desde GitHub.
 * Si tiene éxito, muestra el mensaje definido en el JSON.
 * Si falla, avisa y utiliza las opciones locales de respaldo.
 */
export async function getRemoteCatalog(type) {
  // Asegúrate de que type sea 'front' o 'back' para coincidir con tus archivos
  const url = `${CONFIG.BASE_URL}/${type}.json`;

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("Archivo no encontrado");

    const data = await response.json();

    // Muestra el mensaje que viene dentro del archivo JSON
    if (data.metadata && data.metadata.message) {
      console.log(picocolors.green(data.metadata.message));
    }

    // Retorna las opciones contenidas en el JSON
    return Array.isArray(data.options) && data.options.length > 0
      ? data.options
      : null;
  } catch (error) {
    // Si falla, mostramos una alerta informativa y retornamos null para usar el local
    console.log(
      picocolors.yellow(
        " ⚠️  Nota: No se pudo conectar al catálogo remoto de ",
      ) +
        picocolors.bold(type) +
        picocolors.yellow(". Usando configuración local por el momento."),
    );

    return null;
  }
}
