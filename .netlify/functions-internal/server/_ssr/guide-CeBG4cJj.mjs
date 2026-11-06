import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { n as Disclaimer, r as PageHeader } from "./AppShell-CREoi6Ey.mjs";
import { n as conditions } from "./conditions-Dtcf8RFg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guide-CeBG4cJj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
var answers = ["Comfort measures can help, but seek care if symptoms are severe, sudden, or persist.", "Track the pattern, note your warning signs, and share relevant history with your clinician."];
function GuideChat() {
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [text, setText] = (0, import_react.useState)("");
	const send = (value) => {
		if (!value.trim()) return;
		setMessages((old) => [
			...old,
			value,
			answers[old.length % answers.length]
		]);
		setText("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-40 flex-col justify-center rounded-2xl border bg-card px-4 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Leaf, { className: "mx-auto h-6 w-6 text-teal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "General comfort guidance only. This preview does not diagnose."
				})]
			}),
			messages.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `rounded-xl px-3 py-2 text-sm ${index % 2 === 0 ? "ml-auto max-w-[80%] bg-primary text-primary-foreground" : "max-w-[80%] bg-muted"}`,
				children: item
			}, index)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "min-w-0 flex-1 rounded-xl border px-3 py-2",
					value: text,
					onChange: (e) => setText(e.target.value),
					placeholder: "Ask a general question"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "rounded-xl bg-primary px-3 text-primary-foreground",
					onClick: () => send(text),
					"aria-label": "Send",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Send, { className: "h-4 w-4" })
				})]
			})
		]
	});
}
var blankAnswers = {
	suddenSevere: false,
	faintFeverVomit: false,
	possiblyPregnant: false,
	nerveWarnings: false,
	chestOrBreathing: false,
	jointWarnings: false,
	persistent: false
};
var safetyQuestions = [
	{
		key: "chestOrBreathing",
		text: "Do you have chest discomfort, or are you finding it hard to breathe?"
	},
	{
		key: "nerveWarnings",
		text: "Do you have numbness around your groin or bottom, trouble controlling your bladder or bowels, or new weakness in a leg or arm?"
	},
	{
		key: "suddenSevere",
		text: "Did the discomfort start suddenly and feel very strong?"
	},
	{
		key: "faintFeverVomit",
		text: "Do you also have fainting or dizziness, a fever, or vomiting?"
	},
	{
		key: "possiblyPregnant",
		text: "Are you pregnant now, or is there a chance you could be?"
	},
	{
		key: "jointWarnings",
		text: "Do you have a joint that is hot, red and very swollen, or are you unable to put weight on it?"
	},
	{
		key: "persistent",
		text: "Is this symptom new, getting worse, or has it lasted more than two weeks?"
	}
];
var urgent = (message, steps) => ({
	level: "urgent",
	title: "Seek urgent medical care now",
	message,
	steps
});
function assessSafety(a) {
	if (a.chestOrBreathing) return urgent("Chest discomfort or trouble breathing can be serious. Please get medical help straight away — do not wait to see if it passes.", [
		"Go to the nearest emergency unit or clinic now, or ask someone to take you.",
		"If you are alone, call someone you trust to stay with you.",
		"Do not drive yourself if you feel unwell."
	]);
	if (a.nerveWarnings) return urgent("Numbness around the groin, loss of bladder or bowel control, or new weakness can be a sign that nerves are under pressure. This needs same-day assessment.", [
		"Go to a hospital or clinic today.",
		"Avoid heavy lifting or straining on the way.",
		"Tell the health worker exactly when these changes started."
	]);
	if (a.suddenSevere && (a.faintFeverVomit || a.possiblyPregnant)) return urgent("Sudden, severe discomfort together with fainting, fever, vomiting or a possible pregnancy can be a sign of something that needs urgent care — for example an ectopic pregnancy or appendicitis.", [
		"Go to the nearest emergency unit or clinic now.",
		"Do not eat or drink much until you have been assessed, in case a procedure is needed.",
		"Take someone with you if you can."
	]);
	if (a.jointWarnings) return {
		level: "prompt",
		title: "See a health worker within the next day or two",
		message: "A hot, red, very swollen joint — or not being able to put weight on it — can be a sign of infection or injury that should be checked soon.",
		steps: [
			"Visit a clinic or health centre within the next day or two.",
			"Rest the joint and avoid putting weight on it until then.",
			"If you develop a fever or feel very unwell, seek care immediately."
		]
	};
	if (a.suddenSevere || a.faintFeverVomit) return {
		level: "prompt",
		title: "See a health worker soon",
		message: "Your answers suggest this should be checked by a health worker rather than managed at home, even if it starts to settle.",
		steps: [
			"Arrange to see a nurse, clinical officer or doctor within the next few days.",
			"Note when it started, how strong it is, and anything that makes it better or worse.",
			"If it becomes much worse, or you feel faint or feverish, seek urgent care."
		]
	};
	if (a.persistent) return {
		level: "prompt",
		title: "Arrange a routine assessment",
		message: "Symptoms that are new, getting worse, or lasting more than two weeks deserve a proper assessment — not to frighten you, but so you get clear answers.",
		steps: [
			"Book a visit with a nurse, clinical officer or doctor.",
			"Bring your PainEase records — they help the health worker see the pattern.",
			"If things change suddenly or become severe, seek care sooner."
		]
	};
	return {
		level: "routine",
		title: "Self-care is reasonable for now",
		message: "Nothing in your answers points to something urgent. Comfort measures and gentle routines are reasonable, while you keep an eye on how things change.",
		steps: [
			"Try the comfort suggestions and routines in PainEase.",
			"Stop any routine that makes your symptoms worse.",
			"Seek care if symptoms become severe, new symptoms appear, or things don't improve."
		]
	};
}
var styles = {
	urgent: {
		box: "border-destructive/40 bg-destructive/10",
		chip: "bg-destructive text-destructive-foreground"
	},
	prompt: {
		box: "border-pain-mid/50 bg-pain-mid/10",
		chip: "bg-pain-mid text-deep"
	},
	routine: {
		box: "border-teal/40 bg-accent",
		chip: "bg-teal text-deep-foreground"
	}
};
function SafetyCheck() {
	const [answers, setAnswers] = (0, import_react.useState)({ ...blankAnswers });
	const [step, setStep] = (0, import_react.useState)(0);
	const result = step >= safetyQuestions.length ? assessSafety(answers) : null;
	const q = safetyQuestions[step];
	const answer = (v) => {
		if (!q) return;
		setAnswers((a) => ({
			...a,
			[q.key]: v
		}));
		setStep((s) => s + 1);
	};
	const reset = () => {
		setAnswers({ ...blankAnswers });
		setStep(0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card",
		"aria-label": "Safety check",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-sm font-semibold text-teal",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ShieldAlert, { className: "h-4 w-4" }), " Ease Safety check"]
		}), !result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						"A few quick questions to check whether self-care is right for you today. Question ",
						step + 1,
						" of ",
						safetyQuestions.length,
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-display text-lg font-medium text-deep",
					children: q?.text
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-primary flex-1",
						onClick: () => answer(true),
						children: "Yes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-ghost flex-1",
						onClick: () => answer(false),
						children: "No"
					})]
				}),
				step > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setStep((s) => s - 1),
					className: "mt-3 text-sm text-muted-foreground underline",
					children: "Back"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `mt-3 rounded-2xl border p-4 ${styles[result.level].box}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [result.level === "routine" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ShieldCheck, { className: "h-5 w-5 text-teal" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ShieldAlert, { className: "h-5 w-5 text-destructive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-deep",
						children: result.title
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm",
					children: result.message
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-1.5 text-sm",
					children: result.steps.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current" }), s]
					}, s))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: reset,
					className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.RotateCcw, { className: "h-3.5 w-3.5" }), " Start again"]
				})
			]
		})]
	});
}
function Guide() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Ease Guide",
			title: "Let's understand what your body is telling you",
			sub: "Start with a short safety check, then explore plain-language guides. This is general information, not a diagnosis."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafetyCheck, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card mt-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm font-semibold text-teal",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Leaf, { className: "h-4 w-4" }), " Ask Ease Guide"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 mb-3 text-xs text-muted-foreground",
					children: "AI-powered general information. It cannot diagnose. In an emergency, go to the nearest clinic or hospital."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuideChat, {})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold text-deep",
				children: "Browse the guides"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid gap-3 sm:grid-cols-2",
				children: conditions.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/conditions/$slug",
					params: { slug: c.slug },
					className: "card flex items-start gap-3 transition hover:-translate-y-0.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.BookOpen, { className: "mt-0.5 h-4 w-4 shrink-0 text-teal" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-deep",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: c.summary
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronRight, { className: "mt-1 h-4 w-4 text-teal" })
					]
				}, c.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Disclaimer, { children: "PainEase offers general health information and comfort support. It cannot diagnose a condition or identify which organ is affected. If your symptoms are severe, sudden or worrying, please see a nurse, clinical officer or doctor." })
		})
	] });
}
//#endregion
export { Guide as component };
