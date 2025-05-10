import '@testing-library/jest-dom';
(global as any).importMeta = {
  env: {
    VITE_API_URL: "http://localhost:3000", // Replace with your actual environment variables
    VITE_GOOGLE_MAPS_API_KEY: "mock-google-maps-api-key",
  },
};
