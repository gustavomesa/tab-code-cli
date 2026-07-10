/**
 * 🧠 CEREBRO CENTRAL DE CONFIGURACIÓN - TAB&CODE CLI
 */
export const CONFIG = {
  // URLs de donde el CLI buscará los catálogos (GitHub Raw)
  CATALOG_BASE_URL:
    "https://github.com/gustavomesa/tab-code-cli/tree/main/src/catalog",

  // Puertos por defecto asignados a cada entorno de desarrollo
  PUERTOS: {
    FRONTEND: "5173",
    BACKEND: "8000",
  },

  // Requisitos del sistema que el Guardián verificará al arrancar
  REQUISITOS_SISTEMA: [
    {
      name: "git",
      cmd: "git --version",
      link: "https://git-scm.com/downloads",
    },
    {
      name: "pnpm",
      cmd: "pnpm --version",
      link: "https://pnpm.io/installation",
    },
    {
      name: "python",
      cmd: "python --version",
      link: "https://www.python.org/downloads/",
    },
  ],

  // Enlaces oficiales en caso de instalaciones ausentes
  ENLACES_INSTALACION: {
    git: "https://git-scm.com/downloads",
    pnpm: "https://pnpm.io/installation",
    pipenv: "https://pipenv.pypa.io/en/latest/installation/",
    docker: "https://docs.docker.com/get-docker/",
  },

  // Archivos clave de configuración
  ARCHIVOS: {
    CONFIG_NAME: "tabcode.config.json",
    FRONT_CATALOG: "front.json",
    BACK_CATALOG: "back.json",
  },

  // =========================================================================
  // 🚀 CATÁLOGO DINÁMICO DE TEMPLATES (MERCADO MODULAR)
  // =========================================================================

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
