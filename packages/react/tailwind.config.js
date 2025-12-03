/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "../../apps/docs/src/**/*.{ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      // [TODO] Define design tokens for Inertia Prime components
    }
  },
  plugins: []
};
