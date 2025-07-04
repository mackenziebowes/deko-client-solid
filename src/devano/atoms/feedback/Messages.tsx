import { cn } from "~/devano/utils";
import { JSX, splitProps, Show } from "solid-js";

interface MessageProps extends JSX.HTMLAttributes<HTMLDivElement> {
	when: boolean;
}
/**
 *
 * @props when Required - when to show the message
 * @props children What to show inside the message - use a fragment `<></>` for multiple children
 * @props class Extend/override default styles
 * @returns
 */
export function ErrorMessage(props: MessageProps) {
	const [l, rest] = splitProps(props, ["when", "class", "children"]);
	const errorCn = cn([
		"flex gap-[6px] px-[12px] py-[6px] bg-(--color1) text-(--color7)",
		l?.class,
	]);
	return (
		<Show when={l.when}>
			<div
				class={errorCn}
				{...rest}
			>
				{l.children}
			</div>
		</Show>
	);
}

/**
 *
 * @props when Required - when to show the message
 * @props children What to show inside the message - use a fragment `<></>` for multiple children
 * @props class Extend/override default styles
 * @returns
 */
export function Message(props: MessageProps) {
	const [l, rest] = splitProps(props, ["when", "class", "children"]);
	const errorCn = cn([
		"flex gap-[6px] px-[12px] py-[6px] bg-(--color4) text-(--color7)",
		l?.class,
	]);
	return (
		<Show when={l.when}>
			<div
				class={errorCn}
				{...rest}
			>
				{l.children}
			</div>
		</Show>
	);
}

/**
 *
 * @props when Required - when to show the message
 * @props children What to show inside the message - use a fragment `<></>` for multiple children
 * @props class Extend/override default styles
 * @returns
 */
export function WarningMessage(props: MessageProps) {
	const [l, rest] = splitProps(props, ["when", "class", "children"]);
	const warningCn = cn([
		"flex gap-[6px] px-[12px] py-[6px] bg-(--color3) text-(--color7)",
		l?.class,
	]);
	return (
		<Show when={l.when}>
			<div
				class={warningCn}
				{...rest}
			>
				{l.children}
			</div>
		</Show>
	);
}

/**
 *
 * @props when Required - when to show the message
 * @props children What to show inside the message - use a fragment `<></>` for multiple children
 * @props class Extend/override default styles
 * @returns
 */
export function SuccessMessage(props: MessageProps) {
	const [l, rest] = splitProps(props, ["when", "class", "children"]);
	const warningCn = cn([
		"flex gap-[6px] px-[12px] py-[6px] bg-(--color2) text-(--color7)",
		l?.class,
	]);
	return (
		<Show when={l.when}>
			<div
				class={warningCn}
				{...rest}
			>
				{l.children}
			</div>
		</Show>
	);
}
