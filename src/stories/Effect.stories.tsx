import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { Effect } from "./Effect";

const meta = {
	title: "Examples",
} satisfies Meta;

export default meta;

export const EffectStory: StoryObj<{
	logCounter: (action: string, value: number) => void;
	logRender: (componentName: string) => void;
}> = {
	name: "Effect",
	args: {
		logCounter: fn(),
		logRender: fn(),
	},
	render: (args) => <Effect {...args} />,
	play: async ({ canvasElement, args: { logCounter } }) => {
		const canvas = within(canvasElement);

		await waitFor(() => {
			expect(logCounter).toHaveBeenCalledTimes(1);
		});
		await expect(logCounter).toHaveBeenNthCalledWith(1, "init", 0);

		await userEvent.click(canvas.getByRole("button"));

		await waitFor(() => {
			expect(logCounter).toHaveBeenCalledTimes(3);
		});

		await expect(logCounter).toHaveBeenNthCalledWith(2, "destroy", 0);
		await expect(logCounter).toHaveBeenNthCalledWith(3, "init", 1);

		await userEvent.click(canvas.getByRole("button"));

		await waitFor(() => {
			expect(logCounter).toHaveBeenCalledTimes(5);
		});

		await expect(logCounter).toHaveBeenNthCalledWith(4, "destroy", 1);
		await expect(logCounter).toHaveBeenNthCalledWith(5, "init", 2);
	},
};
