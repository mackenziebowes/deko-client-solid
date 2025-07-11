import { JSX, splitProps } from "solid-js";
import { cn } from "~/devano/utils";

interface AnchorProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
	outline?: boolean;
	color?: "default" | "ara" | "ene" | "izi";
	label?: string;
	href: string;
	end?: boolean;
	disabled?: boolean;
}
/**
 *
 * An anchor/link that looks like a button.
 * @param props Accepts standard Anchor props, plus custom ones:
 * @param props.href Required! Pass the whole domain.
 * @param props.outline Boolean - make it outline or not
 * @param props.color Optional, defaults to "default". Pass "ara" | "ene" | "izi" for themed colours.
 * @param props.label Optional, use this to pass the text inside the button as a prop rather than a child, mostly for aesthetic coding purposes.
 * @param props.end Meant to be used with SolidStart's router - can change the styling if it matches the current page.
 * @param props.disabled Links traditionally can't be disabled, but this one can be.
 * @param props.class Optional, goes into a cn function so you can override default styles as needed.
 * */
export function ButtonAnchor(props: AnchorProps) {
	const [l, rest] = splitProps(props, [
		"outline",
		"color",
		"label",
		"class",
		"children",
		"disabled",
	]);

	const color = l.color ?? "default";

	let className = cn([
		"select-none px-4 py-1 font-semibold rounded-md border-[2px] hover:cursor-pointer focus:outline-[1px] focus:outline-(--c-a-e)",
		{
			"border-(--fg-e) text-(--fg-e) hover:text-(--fg-i) hover:border-(--fg-i)":
				color == "default" && l?.outline == true,
			"border-(--fg-i) bg-(--fg-i) text-(--bg-e) hover:bg-(--fg-o) hover:text-(--bg-i) hover:border-(--fg-o)":
				color == "default" && l?.outline == undefined,
			"border-(--c-a-e) text-(--c-a-e) hover:text-(--c-a-i) hover:border-(--c-a-i)":
				color == "ara" && l?.outline == true,
			"border-(--c-a-e) text-(--bg-i) bg-(--c-a-e) hover:bg-(--c-a-i) hover:text-(--bg-o) hover:border-(--c-a-i)":
				color == "ara" && l?.outline == undefined,
			"border-(--c-e-e) text-(--c-e-e) hover:text-(--c-e-i) hover:border-(c-e-i)":
				color == "ene" && l?.outline == true,
			"border-(--c-e-e) text-(--bg-i) bg-(--c-e-e) hover:bg-(--c-e-i) hover:text-(--bg-o) hover:border-(--c-e-i)":
				color == "ene" && l?.outline == undefined,
			"border-(--c-i-e) text-(--c-i-e) hover:text-(--c-i-i) hover:border-(c-i-i)":
				color == "izi" && l?.outline == true,
			"border-(--c-i-e) text-(--bg-i) bg-(--c-i-e) hover:bg-(--c-i-i) hover:text-(--bg-o) hover:border-(--c-i-i)":
				color == "izi" && l?.outline == undefined,
		},
		l?.class,
		{ "opacity-50 cursor-not-allowed": l?.disabled },
	]);

	return (
		<a
			class={className}
			{...rest}
			onClick={(e) => {
				if (l?.disabled) {
					e.preventDefault();
					e.stopPropagation();
				} else {
					window.location.href = rest.href;
				}
			}}
		>
			{l?.label ?? l?.children ?? ""}
		</a>
	);
}
