import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { buildLegacyTheme } from "sanity";
import { schemaTypes } from "./schemas";
import { projectId, dataset } from "./env";
import { structure } from "./structure";

const scoutGreen = "#2D5A27";
const scoutGreenDark = "#1E3D1A";

const theme = buildLegacyTheme({
  "--black": "#1a1a1a",
  "--white": "#fff",
  "--gray": "#666",
  "--gray-base": "#666",
  "--component-bg": "#fff",
  "--component-text-color": "#1a1a1a",
  "--brand-primary": scoutGreen,
  "--default-button-color": "#666",
  "--default-button-primary-color": scoutGreen,
  "--default-button-success-color": scoutGreen,
  "--main-navigation-color": scoutGreenDark,
  "--main-navigation-color--inverted": "#fff",
  "--focus-color": scoutGreen,
});

export default defineConfig({
  name: "aeig-cau",
  title: "Editor de contingut",
  projectId,
  dataset,
  basePath: "/studio",
  theme,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
  },
});
