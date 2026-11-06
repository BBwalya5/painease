import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as getCheckIns, t as createCheckIn } from "./checkInService-72wfdMQr.mjs";
import { n as painColor } from "./sample-data-Ca8EjBQR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/track-BdOX7FKA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
var regionParts = [
	{
		part: "head",
		label: "Head",
		sided: false,
		views: ["front", "back"]
	},
	{
		part: "face",
		label: "Face",
		sided: false,
		views: ["front"]
	},
	{
		part: "neck",
		label: "Neck",
		sided: false,
		views: ["front", "back"]
	},
	{
		part: "shoulder",
		label: "Shoulder",
		sided: true,
		views: ["front", "back"]
	},
	{
		part: "chest",
		label: "Chest",
		sided: false,
		views: ["front"]
	},
	{
		part: "breast",
		label: "Breast",
		sided: true,
		views: ["front"]
	},
	{
		part: "ribs",
		label: "Ribs",
		sided: true,
		views: ["front"]
	},
	{
		part: "abdomen",
		label: "Abdomen",
		sided: false,
		views: ["front"]
	},
	{
		part: "pelvis",
		label: "Pelvis",
		sided: false,
		views: ["front"]
	},
	{
		part: "groin",
		label: "Groin",
		sided: false,
		views: ["front"]
	},
	{
		part: "upper-back",
		label: "Upper back",
		sided: false,
		views: ["back"]
	},
	{
		part: "lower-back",
		label: "Lower back",
		sided: false,
		views: ["back"]
	},
	{
		part: "hip",
		label: "Hip",
		sided: true,
		views: ["front", "back"]
	},
	{
		part: "arm",
		label: "Upper arm",
		sided: true,
		views: ["front", "back"]
	},
	{
		part: "elbow",
		label: "Elbow",
		sided: true,
		views: ["front", "back"]
	},
	{
		part: "wrist",
		label: "Wrist",
		sided: true,
		views: ["front", "back"]
	},
	{
		part: "hand",
		label: "Hand",
		sided: true,
		views: ["front", "back"]
	},
	{
		part: "thigh",
		label: "Thigh",
		sided: true,
		views: ["front", "back"]
	},
	{
		part: "knee",
		label: "Knee",
		sided: true,
		views: ["front", "back"]
	},
	{
		part: "calf",
		label: "Calf / lower leg",
		sided: true,
		views: ["front", "back"]
	},
	{
		part: "ankle",
		label: "Ankle",
		sided: true,
		views: ["front", "back"]
	},
	{
		part: "foot",
		label: "Foot",
		sided: true,
		views: ["front", "back"]
	}
];
var allRegionKeys = regionParts.flatMap((p) => p.sided ? [`${p.part}:left`, `${p.part}:right`] : [p.part]);
function regionLabel(key) {
	const [part, side] = key.split(":");
	const base = regionParts.find((r) => r.part === part)?.label ?? part ?? key;
	return side ? `${side === "left" ? "Left" : "Right"} ${base.toLowerCase()}` : base;
}
var defs = [
	{
		part: "head",
		view: "front",
		shape: {
			kind: "ellipse",
			cx: 60,
			cy: 11,
			rx: 11,
			ry: 8
		}
	},
	{
		part: "face",
		view: "front",
		shape: {
			kind: "ellipse",
			cx: 60,
			cy: 25,
			rx: 10,
			ry: 7
		}
	},
	{
		part: "head",
		view: "back",
		shape: {
			kind: "ellipse",
			cx: 60,
			cy: 18,
			rx: 12,
			ry: 15
		}
	},
	{
		part: "neck",
		view: "both",
		shape: {
			kind: "rect",
			x: 54,
			y: 34,
			w: 12,
			h: 9
		}
	},
	{
		part: "shoulder",
		view: "both",
		mirror: true,
		shape: {
			kind: "ellipse",
			cx: 39,
			cy: 49,
			rx: 9,
			ry: 6
		}
	},
	{
		part: "chest",
		view: "front",
		shape: {
			kind: "rect",
			x: 47,
			y: 45,
			w: 26,
			h: 9
		}
	},
	{
		part: "breast",
		view: "front",
		mirror: true,
		shape: {
			kind: "ellipse",
			cx: 52,
			cy: 61,
			rx: 7,
			ry: 6
		}
	},
	{
		part: "ribs",
		view: "front",
		mirror: true,
		shape: {
			kind: "rect",
			x: 38,
			y: 58,
			w: 7,
			h: 20
		}
	},
	{
		part: "abdomen",
		view: "front",
		shape: {
			kind: "rect",
			x: 47,
			y: 69,
			w: 26,
			h: 18
		}
	},
	{
		part: "pelvis",
		view: "front",
		shape: {
			kind: "rect",
			x: 46,
			y: 89,
			w: 28,
			h: 10
		}
	},
	{
		part: "groin",
		view: "front",
		shape: {
			kind: "rect",
			x: 53,
			y: 101,
			w: 14,
			h: 8
		}
	},
	{
		part: "upper-back",
		view: "back",
		shape: {
			kind: "rect",
			x: 42,
			y: 46,
			w: 36,
			h: 26
		}
	},
	{
		part: "lower-back",
		view: "back",
		shape: {
			kind: "rect",
			x: 44,
			y: 74,
			w: 32,
			h: 18
		}
	},
	{
		part: "hip",
		view: "both",
		mirror: true,
		shape: {
			kind: "ellipse",
			cx: 41,
			cy: 99,
			rx: 6,
			ry: 8
		}
	},
	{
		part: "arm",
		view: "both",
		mirror: true,
		shape: {
			kind: "rect",
			x: 24,
			y: 56,
			w: 10,
			h: 27
		}
	},
	{
		part: "elbow",
		view: "both",
		mirror: true,
		shape: {
			kind: "ellipse",
			cx: 28,
			cy: 88,
			rx: 5,
			ry: 4
		}
	},
	{
		part: "wrist",
		view: "both",
		mirror: true,
		shape: {
			kind: "ellipse",
			cx: 25,
			cy: 112,
			rx: 4,
			ry: 3
		}
	},
	{
		part: "hand",
		view: "both",
		mirror: true,
		shape: {
			kind: "ellipse",
			cx: 24,
			cy: 123,
			rx: 5,
			ry: 7
		}
	},
	{
		part: "thigh",
		view: "both",
		mirror: true,
		shape: {
			kind: "rect",
			x: 45,
			y: 112,
			w: 13,
			h: 33
		}
	},
	{
		part: "knee",
		view: "both",
		mirror: true,
		shape: {
			kind: "ellipse",
			cx: 51.5,
			cy: 151,
			rx: 7,
			ry: 5.5
		}
	},
	{
		part: "calf",
		view: "both",
		mirror: true,
		shape: {
			kind: "rect",
			x: 46,
			y: 159,
			w: 11,
			h: 34
		}
	},
	{
		part: "ankle",
		view: "both",
		mirror: true,
		shape: {
			kind: "ellipse",
			cx: 51.5,
			cy: 198,
			rx: 4.5,
			ry: 3.5
		}
	},
	{
		part: "foot",
		view: "both",
		mirror: true,
		shape: {
			kind: "ellipse",
			cx: 51,
			cy: 210,
			rx: 7,
			ry: 5
		}
	}
];
function mirrorShape(s) {
	return s.kind === "ellipse" ? {
		...s,
		cx: 120 - s.cx
	} : {
		...s,
		x: 120 - s.x - s.w
	};
}
function regionsForView(view) {
	const out = [];
	for (const d of defs) {
		if (d.view !== "both" && d.view !== view) continue;
		if (!d.mirror) {
			out.push({
				key: d.part,
				shape: d.shape
			});
			continue;
		}
		const viewerLeft = view === "front" ? "right" : "left";
		const viewerRight = viewerLeft === "right" ? "left" : "right";
		out.push({
			key: `${d.part}:${viewerLeft}`,
			shape: d.shape
		});
		out.push({
			key: `${d.part}:${viewerRight}`,
			shape: mirrorShape(d.shape)
		});
	}
	return out;
}
var fillerShapes = [{
	kind: "rect",
	x: 23,
	y: 92,
	w: 8,
	h: 17
}, {
	kind: "rect",
	x: 89,
	y: 92,
	w: 8,
	h: 17
}];
function BodyAvatar({ selected, intensity = {}, onToggle }) {
	const [view, setView] = (0, import_react.useState)("front");
	const [mode, setMode] = (0, import_react.useState)("map");
	const [q, setQ] = (0, import_react.useState)("");
	const regions = (0, import_react.useMemo)(() => regionsForView(view), [view]);
	const filtered = allRegionKeys.filter((k) => regionLabel(k).toLowerCase().includes(q.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-1 rounded-full bg-muted p-1",
				role: "tablist",
				"aria-label": "Body view",
				children: [["front", "back"].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": mode === "map" && view === v,
					onClick: () => {
						setMode("map");
						setView(v);
					},
					className: `rounded-full px-4 py-1.5 text-sm font-medium capitalize ${mode === "map" && view === v ? "bg-card text-primary shadow-soft" : "text-muted-foreground"}`,
					children: v
				}, v)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": mode === "list",
					onClick: () => setMode("list"),
					className: `rounded-full px-4 py-1.5 text-sm font-medium ${mode === "list" ? "bg-card text-primary shadow-soft" : "text-muted-foreground"}`,
					children: "List"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-xs text-muted-foreground",
				children: [selected.length, " selected"]
			})]
		}),
		mode === "map" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				viewBox: "0 0 120 225",
				className: "mx-auto h-80 w-auto",
				"aria-label": `Body ${view} view`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: `body-surface-${view}`,
						x1: "0",
						y1: "0",
						x2: "1",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "var(--secondary)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "var(--muted)"
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						fill: `url(#body-surface-${view})`,
						stroke: "var(--sky)",
						strokeWidth: "0.7",
						className: "pointer-events-none",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
								cx: "60",
								cy: view === "front" ? 18 : 20,
								rx: "12",
								ry: view === "front" ? 14 : 16
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M54 31 Q60 35 66 31 L67 43 L53 43 Z" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M38 43 Q48 38 54 43 L66 43 Q72 38 82 43 L87 52 Q82 62 73 68 L47 68 Q38 62 33 52 Z" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M33 49 Q27 51 23 58 L18 92 Q17 102 24 104 Q29 103 31 94 L36 61 Q37 52 33 49Z" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M87 49 Q93 51 97 58 L102 92 Q103 102 96 104 Q91 103 89 94 L84 61 Q83 52 87 49Z" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M47 65 Q60 69 73 65 L72 96 Q60 103 48 96Z" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M48 96 Q60 101 72 96 L75 112 Q60 118 45 112Z" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M45 111 Q51 114 57 112 L54 149 Q51 156 44 153 Q40 146 42 125Z" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M63 112 Q69 114 75 111 L78 125 Q80 146 76 153 Q69 156 66 149Z" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M44 152 Q51 155 54 151 L53 194 Q51 201 45 199 Q42 194 43 160Z" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M66 151 Q69 155 76 152 L77 160 Q78 194 75 199 Q69 201 67 194Z" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
								cx: "50",
								cy: "210",
								rx: "9",
								ry: "5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
								cx: "70",
								cy: "210",
								rx: "9",
								ry: "5"
							})
						]
					}),
					view === "back" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						fill: "none",
						stroke: "var(--sky)",
						strokeWidth: "0.55",
						className: "pointer-events-none opacity-70",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M60 43 Q58 75 60 112" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M60 112 Q57 130 60 151" })]
					}),
					view === "front" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						fill: "none",
						stroke: "var(--sky)",
						strokeWidth: "0.55",
						className: "pointer-events-none opacity-70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M60 43 Q58 75 60 96" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M60 66 Q50 68 47 74" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M60 66 Q70 68 73 74" })
						]
					}),
					fillerShapes.map((s, i) => s.kind === "rect" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: s.x,
						y: s.y,
						width: s.w,
						height: s.h,
						rx: 3,
						fill: "var(--muted)"
					}, i) : null),
					regions.map(({ key, shape }) => {
						const on = selected.includes(key);
						const common = {
							fill: on ? painColor(intensity[key] ?? 5) : "var(--muted)",
							stroke: on ? "var(--deep)" : "var(--border)",
							strokeWidth: on ? 1 : .6,
							className: "cursor-pointer transition-colors hover:opacity-80 focus:outline-none",
							role: "button",
							tabIndex: 0,
							"aria-pressed": on,
							"aria-label": regionLabel(key),
							onClick: () => onToggle(key),
							onKeyDown: (e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									onToggle(key);
								}
							}
						};
						return shape.kind === "ellipse" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: shape.cx,
							cy: shape.cy,
							rx: shape.rx,
							ry: shape.ry,
							...common,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: regionLabel(key) })
						}, key) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: shape.x,
							y: shape.y,
							width: shape.w,
							height: shape.h,
							rx: 3,
							...common,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: regionLabel(key) })
						}, key);
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-x-0 top-1/2 flex justify-between px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: view === "front" ? "Right" : "Left" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: view === "front" ? "Left" : "Right" })]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 rounded-xl border bg-card px-3 py-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Search, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search body areas",
					className: "w-full bg-transparent text-sm outline-none"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 max-h-72 overflow-y-auto rounded-xl border",
				children: [filtered.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex cursor-pointer items-center gap-3 border-b px-3 py-2 text-sm last:border-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: selected.includes(k),
						onChange: () => onToggle(k)
					}), regionLabel(k)]
				}, k)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-3 text-sm text-muted-foreground",
					children: "No matching areas."
				})]
			})]
		}),
		selected.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex flex-wrap gap-2",
			children: selected.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onToggle(k),
				className: "chip chip-on",
				"aria-label": `Remove ${regionLabel(k)}`,
				children: [
					regionLabel(k),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.X, { className: "h-3 w-3" })
				]
			}, k))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xs text-muted-foreground",
			children: "The map records where you feel pain. It doesn't diagnose a condition or organ."
		})
	] });
}
function Track() {
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["checkins"],
		queryFn: getCheckIns
	});
	const [pain, setPain] = (0, import_react.useState)(5);
	const [areas, setAreas] = (0, import_react.useState)([]);
	const [frequency, setFrequency] = (0, import_react.useState)("on_and_off");
	const [mood, setMood] = (0, import_react.useState)(3);
	const [sleep, setSleep] = (0, import_react.useState)(3);
	const [comfort, setComfort] = (0, import_react.useState)(3);
	const [activity, setActivity] = (0, import_react.useState)(3);
	const [notes, setNotes] = (0, import_react.useState)("");
	const save = useMutation({
		mutationFn: (input) => createCheckIn(input),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["checkins"] });
			setNotes("");
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold text-teal",
			children: "Daily check-in"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-5 font-display text-3xl font-bold text-deep",
			children: "How are you feeling?"
		}),
		q.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "card text-muted-foreground",
			children: "Loading check-ins…"
		}) : q.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			role: "alert",
			className: "card text-destructive",
			children: "Couldn't load check-ins."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "font-semibold",
						children: [
							"Pain level: ",
							pain,
							"/10"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "mt-4 w-full",
						type: "range",
						min: 0,
						max: 10,
						value: pain,
						onChange: (e) => setPain(+e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 mb-2 font-semibold",
						children: "Pain locations"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BodyAvatar, {
						selected: areas,
						intensity: Object.fromEntries(areas.map((key) => [key, pain])),
						onToggle: (key) => setAreas((old) => old.includes(key) ? old.filter((item) => item !== key) : [...old, key])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: areas.map((area) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "chip chip-on",
							children: regionLabel(area)
						}, area))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Frequency", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "mt-1 w-full rounded-xl border px-3 py-2",
							value: frequency,
							onChange: (e) => setFrequency(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "once",
									children: "Once"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "on_and_off",
									children: "On and off"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "constant",
									children: "Constant"
								})
							]
						})]
					}),
					[
						[
							"Mood",
							mood,
							setMood
						],
						[
							"Sleep quality",
							sleep,
							setSleep
						],
						[
							"Comfort",
							comfort,
							setComfort
						],
						[
							"Activity",
							activity,
							setActivity
						]
					].map(([label, value, setter]) => {
						const setValue = setter;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm font-medium",
							children: [
								String(label),
								": ",
								String(value),
								"/5",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "w-full",
									type: "range",
									min: 1,
									max: 5,
									value: Number(value),
									onChange: (e) => setValue(+e.target.value)
								})
							]
						}, String(label));
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-medium",
						children: ["Notes", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "mt-1 w-full rounded-xl border px-3 py-2",
							rows: 3,
							value: notes,
							onChange: (e) => setNotes(e.target.value)
						})]
					}),
					save.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "text-sm text-destructive",
						children: "Couldn't save this check-in."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-primary w-full",
						disabled: save.isPending || areas.length === 0,
						onClick: () => save.mutate({
							date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
							painLevel: pain,
							bodyAreas: areas,
							frequency,
							mood,
							sleepQuality: sleep,
							comfort,
							activity,
							notes
						}),
						children: save.isPending ? "Saving…" : "Save check-in"
					})
				]
			})]
		})
	] });
}
//#endregion
export { Track as component };
