import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Effect } from "./Effect";
import { SignalComputed } from "./SignalComputed";
import { SignalState } from "./SignalState";
import { Signalify } from "./Signalify";
import { WatchGlobalSignal } from "./WatchGlobalSignal";

const meta = {
	title: "Examples",
} satisfies Meta;

export default meta;

export const SignalStateStory: StoryObj<{
	logRender: (componentName: string) => void;
}> = {
	name: "State signal",
	args: {
		logRender: fn(),
	},
	render: (args) => <SignalState {...args} />,
};

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
};

export const WatchGlobalSignalStory: StoryObj = {
	name: "Watch global signal",
	render: () => <WatchGlobalSignal />,
};

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
};

export const SignalComputedStory: StoryObj<{
	logRender: (componentName: string) => void;
}> = {
	name: "Computed signal",
	args: {
		logRender: fn(),
	},
	render: (args) => <SignalComputed {...args} />,
};
