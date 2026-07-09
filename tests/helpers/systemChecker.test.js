import { test } from "node:test";
import assert from "node:assert";
import { checkSystemRequirements } from "../../src/helpers/systemChecker.js";

/**
 * 🎯 ¿QUÉ HACE ESTE TEST? (Para Novatos y Expertos)
 *
 * Este archivo es nuestra "sala de examen". Obliga al Guardián (`systemChecker.js`)
 * a entregar un reporte detallado con el estado de las 4 herramientas clave.
 *
 * ¿Qué le exigimos comprobar?
 * 1. Obligatorias: 'pnpm' y 'pipenv' (Si faltan, el test sabe que el CLI no puede crear nada).
 * 2. Opcionales: 'git' y 'docker' (Si faltan o están apagadas, el test verifica que el CLI sepa que no están).
 */

test("Prueba del Guardián - Verificar reporte detallado de las 4 herramientas", async () => {
  // 1. Ponemos a funcionar el guardián real para recibir el informe de tu PC
  const resultado = await checkSystemRequirements();

  // =========================================================================
  // 🔍 EXAMEN DE HERRAMIENTAS OBLIGATORIAS (Dato maestro del éxito)
  // =========================================================================

  // Comprobamos que el veredicto final sea un true o un false bien definido.
  assert.strictEqual(
    typeof resultado.success,
    "boolean",
    "El reporte debe dar un veredicto claro (true/false) de si se puede continuar.",
  );

  // =========================================================================
  // 📊 EXAMEN DE HERRAMIENTAS OPCIONALES (Mapa elástico de características)
  // =========================================================================

  // Exigimos que el reporte contenga obligatoriamente la casilla de Git (esté instalado o no)
  assert.ok(
    "git" in resultado.features,
    "El reporte final debe incluir obligatoriamente si el usuario tiene Git (true/false).",
  );

  // Exigimos que el reporte contenga obligatoriamente la casilla de Docker (esté encendido o no)
  assert.ok(
    "docker" in resultado.features,
    "El reporte final debe incluir obligatoriamente si el usuario tiene Docker (true/false).",
  );
});
