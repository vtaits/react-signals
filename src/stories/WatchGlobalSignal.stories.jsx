import { expect, within } from "storybook/test";
import { WatchGlobalSignal } from "./WatchGlobalSignal.jsx";

/**
 * @import { Meta, StoryObj } from "@storybook/react-vite"
 */

/** @type {Meta} */
const meta = {
	title: "Examples",
};

export default meta;

/** @type {StoryObj} */
export const WatchGlobalSignalStory = {
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

		await /** @type {Promise<void>} */ (
			new Promise((resolve) => {
				setTimeout(() => {
					resolve();
				}, 2500);
			})
		);

		await expect(canvas.getByTestId("time")).toHaveTextContent(
			new Intl.DateTimeFormat("en-US", {
				dateStyle: undefined,
				timeStyle: "medium",
				hour12: false,
			}).format(new Date()),
		);
	},
};
