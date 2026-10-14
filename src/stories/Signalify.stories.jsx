import { UPDATE_STORY_ARGS } from "storybook/internal/core-events";
import { expect, fn, waitFor, within } from "storybook/test";
import { Signalify } from "./Signalify.jsx";

/**
 * @import { Meta, StoryObj } from "@storybook/react-vite"
 * @import { Channel } from "storybook/internal/channels"
 */

/** @type {Meta} */
const meta = {
	title: "Examples",
};

export default meta;

/** @type {StoryObj<{
	logRender: (componentName: string) => void;
	text: string;
}>} */
export const SignalifyStory = {
	name: "Signalify",
	args: {
		logRender: fn(),
		text: "Test",
	},
	render: (args) => <Signalify {...args} />,
	play: async ({
		canvasElement,
		args: { logRender },
		context: { id: storyId },
	}) => {
		const canvas = within(canvasElement);

		await expect(canvas.getByTestId("text")).toHaveTextContent("Test");

		expect(logRender).toHaveBeenCalledTimes(3);
		expect(logRender).toHaveBeenNthCalledWith(1, "root");
		expect(logRender).toHaveBeenNthCalledWith(2, "OuterText");
		expect(logRender).toHaveBeenNthCalledWith(3, "InnerText");

		// https://github.com/storybookjs/storybook/issues/17089
		/** @type {Channel} */
		const channel = /** @type {any} */ (window).__STORYBOOK_ADDONS_CHANNEL__;

		channel.emit(UPDATE_STORY_ARGS, {
			storyId,
			updatedArgs: { text: "Test2" },
		});

		await waitFor(() => {
			expect(canvas.getByTestId("text")).toHaveTextContent("Test2");
		});
	},
};
