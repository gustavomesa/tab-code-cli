import picocolors from "picocolors";
import { CONFIG } from "../config.js";

/**
 * --- CATÁLOGO REMOTO ---
 * Obtiene las opciones de configuración directamente desde su URL absoluta.
 */
export async function getRemoteCatalog(type) {
  // Extrae la URL directa mapeada en el config.js ('frontend' o 'backend')
  const url = CONFIG.CATALOGOS_REMOTOS[type];

  // Si no existe una URL mapeada para ese tipo, abortamos inmediatamente usando el fallback
  if (!url) {
    return null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Archivo no encontrado (Status: ${response.status})`);
    }

    const data = await response.json();

    if (data.metadata && data.metadata.message) {
      console.log(picocolors.green(`\n📬 ${data.metadata.message}`));
    }

    return Array.isArray(data.options) && data.options.length > 0
      ? data.options
      : null;
  } catch (error) {
    clearTimeout(timeoutId);

    // Rastreo de diagnóstico detallado por si acaso
    console.log(picocolors.red(`\n🔍 Fallo en consulta -> URL: ${url}`));
    console.log(picocolors.red(`   Error: ${error.message || error}`));

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
