// TODO: Este archivo será reemplazado por supabaseClient.js
// Exportación temporal vacía para evitar errores de importación

export const base44 = {
  auth: {
    me: async () => null,
    isAuthenticated: async () => false,
    logout: () => {},
    redirectToLogin: () => {},
    updateMe: async () => {},
  },
  entities: {
    FormTemplate: {
      list: async () => [],
      create: async () => {},
      delete: async () => {},
    },
    WageComparison: {
      list: async () => [],
      create: async () => {},
      delete: async () => {},
    },
  },
  integrations: {
    Core: {
      UploadFile: async () => ({ file_url: "" }),
    },
  },
};
