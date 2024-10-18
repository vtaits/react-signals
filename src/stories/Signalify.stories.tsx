import type { Channel } from "@storybook/channels";
import { UPDATE_STORY_ARGS } from "@storybook/core-events";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, fn, waitFor, within } from "@storybook/test";
import { Signalify } from "./Signalify";

const meta = {
	title: "Examples",
} satisfies Meta;

export default meta;

export const SignalifyStory: StoryObj<{
	logRender: (componentName: string) => void;
	text: string;
}> = {
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
		const channel = (
			window as unknown as {
				__STORYBOOK_ADDONS_CHANNEL__: Channel;
			}
		).__STORYBOOK_ADDONS_CHANNEL__;

		channel.emit(UPDATE_STORY_ARGS, {
			storyId,
			updatedArgs: { text: "Test2" },
		});

		await waitFor(() => {
			expect(canvas.getByTestId("text")).toHaveTextContent("Test2");
		});
	},
};
