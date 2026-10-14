/**
 * @import { Preview } from "@storybook/react-vite"
 */

/** @type {Preview} */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
