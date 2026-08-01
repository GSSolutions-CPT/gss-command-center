import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        console: "readonly",
        setTimeout: "readonly",
        event: "readonly",
        HTMLElement: "readonly",
        Event: "readonly",
        process: "readonly",
        // Firebase Globals
        firebase: "readonly",
        db: "readonly",
        auth: "readonly",
        // Shared & Agent Globals
        AGENT_SLUG: "readonly",
        initPage: "writable",
        seedDatabaseIfEmpty: "writable",
        formatRelativeTime: "readonly",
        showToast: "readonly",
        renderLayout: "readonly",
        toggleAgentsMenu: "readonly",
        openSidebar: "readonly",
        closeSidebar: "readonly",
        formatDate: "readonly",
        toggleTheme: "readonly",
        handleSearch: "readonly",
        toggleNotificationsDropdown: "readonly",
        toggleUserDropdown: "readonly",
        toggleAgentStatus: "readonly",
        openTaskModal: "readonly",
        submitTask: "readonly",
        // Browser Globals
        fetch: "readonly",
        alert: "readonly",
        prompt: "readonly",
        confirm: "readonly",
        // Page-specific Globals
        exportAuditPack: "readonly",
        handleForgotPassword: "readonly",
        closeTaskModal: "readonly",
        renderAgentPage: "readonly",
        AGENT_DETAILS: "readonly"
      }
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "warn",
      "no-redeclare": "off"
    }
  }
];
