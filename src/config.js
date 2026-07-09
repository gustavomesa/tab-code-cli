/**
 * 🧠 CEREBRO CENTRAL DE CONFIGURACIÓN - TAB&CODE CLI
 *
 * Este archivo centraliza todos los datos estáticos del CLI.
 * Si deseas añadir nuevos frameworks, cambiar puertos o actualizar enlaces,
 * ESTE es el único lugar donde debes tocar.
 */
export const CONFIG = {
  // Puertos por defecto asignados a cada entorno de desarrollo
  PUERTOS: {
    FRONTEND: "5173",
    BACKEND: "8000",
  },

  // Enlaces oficiales utilizados por el Guardián en caso de instalaciones ausentes
  ENLACES_INSTALACION: {
    git: "https://git-scm.com/downloads",
    pnpm: "https://pnpm.io/installation",
    pipenv: "https://pipenv.pypa.io/en/latest/installation/",
    docker: "https://docs.docker.com/get-docker/",
  },

  // Archivos clave de configuración que el CLI generará automáticamente
  ARCHIVOS: {
    CONFIG_NAME: "tabcode.config.json",
  },

  // =========================================================================
  // 🚀 CATÁLOGO DINÁMICO DE TEMPLATES (MERCADO MODULAR)
  // =========================================================================
  // Cada objeto representa una opción en el menú interactivo de la terminal.
  // Si en el futuro quieres añadir un framework (ej. Next.js o NestJS),
  // simplemente agrega un nuevo objeto al array correspondiente aquí abajo.

  OPCIONES_FRONT: [
    {
      value: "react-vite",
      label: "React + Vite ⚡",
      hint: "La opción estándar, rápida y moderna",
    },
    {
      value: "vue-vite",
      label: "Vue + Vite 🟢",
      hint: "Ecosistema intuitivo y de alto rendimiento",
    },
    {
      value: "vanilla",
      label: "Vanilla JS 📄",
      hint: "JavaScript puro sin frameworks",
    },
  ],

  OPCIONES_BACK: [
    {
      value: "fastapi",
      label: "FastAPI ⚡",
      hint: "Python de alta velocidad con documentación automática",
    },
    {
      value: "flask",
      label: "Flask 🌶️",
      hint: "Python microframework, ligero y flexible",
    },
    {
      value: "django",
      label: "Django 🎸",
      hint: "Python con baterías incluidas (Admin, ORM, Auth)",
    },
  ],

  OPCIONES_FULLSTACK: [
    {
      value: "monorepo-pnpm",
      label: "Modular Monorepo (pnpm workspaces) 📦",
      hint: "React + FastAPI gestionados en paralelo",
    },
  ],
};
