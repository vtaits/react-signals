import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { SignalComputed } from "./SignalComputed";

const meta = {
	title: "Examples",
} satisfies Meta;

export default meta;

export const SignalComputedStory: StoryObj<{
	logRender: (componentName: string) => void;
}> = {
	name: "Computed signal",
	args: {
		logRender: fn(),
	},
	render: (args) => <SignalComputed {...args} />,
	play: async ({ canvasElement, args: { logRender } }) => {
		const canvas = within(canvasElement);

		await expect(canvas.getByTestId("counter")).toHaveTextContent("0");

		await expect(logRender).toHaveBeenCalledTimes(3);
		await expect(logRender).toHaveBeenNthCalledWith(1, "root");
		await expect(logRender).toHaveBeenNthCalledWith(2, "Text");
		await expect(logRender).toHaveBeenNthCalledWith(3, "Button");

		await userEvent.click(canvas.getByRole("button"));

		await expect(logRender).toHaveBeenCalledTimes(3);

		await userEvent.click(canvas.getByRole("button"));

		await expect(logRender).toHaveBeenCalledTimes(3);

		await userEvent.click(canvas.getByRole("button"));

		await expect(canvas.getByTestId("counter")).toHaveTextContent("1");

		await expect(logRender).toHaveBeenCalledTimes(4);
		await expect(logRender).toHaveBeenNthCalledWith(4, "Text");
	},
};
