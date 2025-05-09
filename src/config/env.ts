interface EnvConfig {
  apiUrl: string;
  appName: string;
  appDescription: string;
  appVersion: string;
  enableAnalytics: boolean;
  enableDarkMode: boolean;
}

const env: EnvConfig = {
  apiUrl: import.meta.env.VITE_API_URL || 'https://ai-health-guard-backend.onrender.com',
  appName: import.meta.env.VITE_APP_NAME || 'AI Health Guard',
  appDescription: import.meta.env.VITE_APP_DESCRIPTION || 'Your Personal Health Assistant',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  enableDarkMode: import.meta.env.VITE_ENABLE_DARK_MODE !== 'true',
};

export default env; 