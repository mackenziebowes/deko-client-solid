import {
	Stack,
	Card,
	Heading,
	Button,
	ErrorMessage,
	WarningMessage,
	CheckboxInput,
} from "~/devano/atoms";
import { useOnboarding } from "../Context";
import { createSignal, createEffect } from "solid-js";
import { onboarding } from "../api";

export default function AgreeTerms() {
	const { state, goToNextStep } = useOnboarding();
	const errLM = () => state.err.get().length > 0;
	createEffect(() => {
		if (state.agreedToTerms.get()) {
			state.err.set("");
		}
	});
	async function goNext() {
		if (!state.agreedToTerms.get()) {
			state.err.set("You must agree to our terms before continuing.");
			return;
		}
		const res = await onboarding.agreeToTerms();
		if (res.ok) {
			goToNextStep();
		} else {
			state.err.set(res.err);
		}
	}
	return (
		<Stack direction="col">
			<Card>
				<Heading as="h2">Before you finish...</Heading>
				<p>You must agree to our Terms of Service before continuing.</p>
				<CheckboxInput
					label="I agree to the Terms of Service of this website."
					get={state.agreedToTerms.get}
					set={state.agreedToTerms.set}
				/>
				<ErrorMessage when={errLM()}>{state.err.get()}</ErrorMessage>
				<Button
					disabled={!state.agreedToTerms.get()}
					onClick={goNext}
				>
					Next
				</Button>
			</Card>
		</Stack>
	);
}
