import { useAuthView, AuthPages } from "../Context";
import AuthCard from "../components/AuthCard";
import { Button, TextInput, PasswordInput, Stack } from "~/devano/atoms";
import { auth } from "../api";
import { z } from "zod";

const emailSchema = z.object({
	email: z.string().email(),
});

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export default function LogIn() {
	const { state } = useAuthView();
	async function handleLogin() {
		const email = state.email.get();
		const password = state.password.get();
		const parsedData = loginSchema.safeParse({
			email,
			password,
		});
		console.log({ email, password });
		if (!parsedData.success) {
			state.err.set(
				parsedData.error.errors.map((err) => err.message).join(",\n") || ""
			);
			return;
		}
		const res = await auth.login({
			email,
			password,
		});
		console.log({ res });
		if (res.ok) {
			state.view.set(AuthPages.Null);
		} else {
			state.err.set(res.err || "");
		}
	}

	async function requestMagicLink() {
		const email = state.email.get();
		const parsedData = emailSchema.safeParse({
			email,
		});
		if (!parsedData.success) {
			state.err.set(
				parsedData.error.errors.map((err) => err.message).join(",\n") || ""
			);
			return;
		}
		const res = await auth.requestMagicLink(email);
		if (res.ok) {
			state.msg.set(res.msg);
		} else {
			state.err.set(res.err || "");
		}
	}

	return (
		<AuthCard title="Log In">
			<TextInput
				label="Email"
				get={state.email.get}
				set={state.email.set}
				validationSchema={emailSchema}
				onValidationError={state.err.set}
			/>
			<PasswordInput
				label="Password"
				get={state.password.get}
				set={state.password.set}
			/>
			<Stack direction="row">
				<Button onclick={handleLogin}>Log In</Button>
				<Button
					onclick={requestMagicLink}
					outline
				>
					Magic Link
				</Button>
			</Stack>
		</AuthCard>
	);
}
