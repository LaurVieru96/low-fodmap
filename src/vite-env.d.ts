/// <reference types="vite/client" />

// @fontsource packages ship CSS with no type declarations; these imports are
// side-effect only (they register @font-face rules).
declare module '@fontsource-variable/*'
