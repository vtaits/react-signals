import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { WatchGlobalSignal } from "./WatchGlobalSignal";

const meta = {
	title: "Examples",
} satisfies Meta;

export default meta;

export const WatchGlobalSignalStory: StoryObj = {
	name: "Watch global signal",
	render: () => <WatchGlobalSignal />,
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		await expect(canvas.getByTestId("time")).toHaveTextContent(
			new Intl.DateTimeFormat("en-US", {
				dateStyle: undefined,
				timeStyle: "medium",
				hour12: false,
			}).format(new Date()),
		);

		await new Promise<void>((resolve) => {
			setTimeout(() => {
				resolve();
			}, 2500);
		});

		await expect(canvas.getByTestId("time")).toHaveTextContent(
			new Intl.DateTimeFormat("en-US", {
				dateStyle: undefined,
				timeStyle: "medium",
				hour12: false,
			}).format(new Date()),
		);
	},
};
