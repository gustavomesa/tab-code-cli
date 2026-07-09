const BASE_URL =
  "https://raw.githubusercontent.com/gustavomesa/tab-code-cli/main/catalog";

export async function getRemoteCatalog(type) {
  const url = `${BASE_URL}/${type}.json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.log(
        `⚠️  No se pudo acceder al catálogo de ${type} (Status: ${response.status})`,
      );
      return null;
    }

    const data = await response.json();

    // Verificación: ¿Es un array y tiene elementos?
    if (!Array.isArray(data) || data.length === 0) {
      console.log(
        `\n📢 AVISO: El catálogo de ${type} no tiene frameworks disponibles por el momento.`,
      );
      return null;
    }

    return data;
  } catch (error) {
    console.log(`\n❌ Error técnico al cargar ${type}: ${error.message}`);
    return null;
  }
}
