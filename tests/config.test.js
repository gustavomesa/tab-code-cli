import { test } from "node:test";
import assert from "node:assert";
import { CONFIG } from "../src/config.js";

/**
 * 🎯 ¿QUÉ HACE ESTE TEST? (Para Novatos y Expertos)
 *
 * Este archivo es un examen exclusivo para el catálogo de opciones (`src/config.js`).
 * Asegura que cuando tú o cualquier desarrollador agreguen o quiten un framework en el futuro,
 * no cometan un error de escritura (como olvidar la propiedad 'value' o 'label').
 *
 * ¿Por qué es vital?
 * La librería que dibuja los menús interactivos exige que cada opción tenga un 'value' (lo que lee el código)
 * y un 'label' (lo que lee el usuario en pantalla). Si falta alguno, la terminal crasheará en producción.
 */

test("Catálogo Dinámico - Verificar que los listados de frameworks sean válidos para el menú", () => {
  // 1. Validamos que las listas existan y sean arrays de JavaScript
  assert.ok(
    Array.isArray(CONFIG.OPCIONES_FRONT),
    "El listado de Frontend debe ser una lista (Array).",
  );
  assert.ok(
    Array.isArray(CONFIG.OPCIONES_BACK),
    "El listado de Backend debe ser una lista (Array).",
  );
  assert.ok(
    Array.isArray(CONFIG.OPCIONES_FULLSTACK),
    "El listado de Fullstack debe ser una lista (Array).",
  );

  // 2. Examen minucioso a cada opción del Frontend
  CONFIG.OPCIONES_FRONT.forEach((opcion, index) => {
    assert.ok(
      "value" in opcion,
      `La opción de Front en la posición [${index}] necesita la propiedad 'value'.`,
    );
    assert.ok(
      "label" in opcion,
      `La opción de Front en la posición [${index}] necesita la propiedad 'label'.`,
    );
    assert.strictEqual(
      typeof opcion.value,
      "string",
      'El "value" de la opción debe ser texto.',
    );
  });

  // 3. Examen minucioso a cada opción del Backend
  CONFIG.OPCIONES_BACK.forEach((opcion, index) => {
    assert.ok(
      "value" in opcion,
      `La opción de Back en la posición [${index}] necesita la propiedad 'value'.`,
    );
    assert.ok(
      "label" in opcion,
      `La opción de Back en la posición [${index}] necesita la propiedad 'label'.`,
    );
    assert.strictEqual(
      typeof opcion.value,
      "string",
      'El "value" de la opción debe ser texto.',
    );
  });

  // 4. Examen minucioso a cada opción del Fullstack
  CONFIG.OPCIONES_FULLSTACK.forEach((opcion, index) => {
    assert.ok(
      "value" in opcion,
      `La opción de Fullstack en la posición [${index}] necesita la propiedad 'value'.`,
    );
    assert.ok(
      "label" in opcion,
      `La opción de Fullstack en la posición [${index}] necesita la propiedad 'label'.`,
    );
    assert.strictEqual(
      typeof opcion.value,
      "string",
      'El "value" de la opción debe ser texto.',
    );
  });
});
