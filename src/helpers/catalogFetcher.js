// src/helpers/catalogFetcher.js
const BASE_URL =
  "https://raw.githubusercontent.com/TU_USUARIO/tab-code-cli/main/catalog";

export async function getRemoteCatalog(type) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // Timeout de 3 segundos

    const response = await fetch(`${BASE_URL}/${type}.json`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null; // Si falla, devolveremos null para usar el respaldo local
  }
}
