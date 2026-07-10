import picocolors from "picocolors";
import { CONFIG } from "../config.js";

/**
 * --- CATÁLOGO REMOTO ---
 * Intenta cargar las opciones desde GitHub. Si falla, avisa al usuario
 * y utiliza las opciones locales de respaldo.
 */
export async function getRemoteCatalog(type) {
  const url = `${CONFIG.BASE_URL}/${type}.json`;

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("Archivo no encontrado");

    const data = await response.json();
    return Array.isArray(data) && data.length > 0 ? data : null;
  } catch (error) {
    // Si falla, mostramos una alerta informativa muy sutil
    console.log(
      picocolors.yellow(
        " ⚠️  Nota: No se pudo conectar al catálogo remoto de ",
      ) +
        picocolors.bold(type) +
        picocolors.yellow(". Usando configuración local por el momento."),
    );

    return null; // El prompt.js detectará el null y usará CONFIG.OPCIONES
  }
}
