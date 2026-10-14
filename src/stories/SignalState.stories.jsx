import { expect, fn, userEvent, within } from "storybook/test";
import { SignalState } from "./SignalState.jsx";

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
}>} */
export const SignalStateStory = {
	name: "State signal",
	args: {
		logRender: fn(),
	},
	render: (args) => <SignalState {...args} />,
	play: async ({ canvasElement, args: { logRender } }) => {
		const canvas = within(canvasElement);

		await expect(canvas.getByTestId("counter")).toHaveTextContent("0");

		await expect(logRender).toHaveBeenCalledTimes(3);
		await expect(logRender).toHaveBeenNthCalledWith(1, "root");
		await expect(logRender).toHaveBeenNthCalledWith(2, "Text");
		await expect(logRender).toHaveBeenNthCalledWith(3, "Button");

		await userEvent.click(canvas.getByRole("button"));

		await expect(canvas.getByTestId("counter")).toHaveTextContent("1");

		await expect(logRender).toHaveBeenCalledTimes(4);
		await expect(logRender).toHaveBeenNthCalledWith(4, "Text");
	},
};
