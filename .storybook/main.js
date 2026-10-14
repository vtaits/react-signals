/**
 * @import { StorybookConfig } from "@storybook/react-vite"
 */

/** @type {StorybookConfig} */
const config = {
 stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
 framework: "@storybook/react-vite",
 addons: ["@storybook/addon-vitest"]
};

export default config;
