import { expect, fn, within } from "storybook/test";
import { Signalify } from "./Signalify.jsx";

/**
 * @import { Meta, StoryObj } from "@storybook/react-vite"
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
	play: async ({ canvasElement, args: { logRender } }) => {
		const canvas = within(canvasElement);

		await expect(canvas.getByTestId("text")).toHaveTextContent("Test");

		expect(logRender).toHaveBeenCalledTimes(3);
		expect(logRender).toHaveBeenNthCalledWith(1, "root");
		expect(logRender).toHaveBeenNthCalledWith(2, "OuterText");
		expect(logRender).toHaveBeenNthCalledWith(3, "InnerText");
	},
};
