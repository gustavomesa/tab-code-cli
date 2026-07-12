/**
 * 🧠 CEREBRO CENTRAL DE CONFIGURACIÓN - TAB&CODE CLI
 */
export const CONFIG = {
  // Configuración de rutas absolutas para cada catálogo remoto
  CATALOGOS_REMOTOS: {
    frontend:
      "https://raw.githubusercontent.com/gustavomesa/tab-code-cli/main/src/catalog/frontend.json",
    backend:
      "https://raw.githubusercontent.com/gustavomesa/tab-code-cli/main/src/catalog/backend.json",
  },

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
  },

  // =========================================================================
  // 🚀 CATÁLOGO DINÁMICO DE TEMPLATES (FALLBACKS LOCALES)
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
