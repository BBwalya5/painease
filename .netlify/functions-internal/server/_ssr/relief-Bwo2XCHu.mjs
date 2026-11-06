import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { r as getRoutines } from "./routineService-Mbz5OF1Y.mjs";
import { r as logSession, t as getMyDevices } from "./deviceService-DvuOW0Y_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/relief-Bwo2XCHu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
/** Safe operating limits for PainEase wearables. Levels are 0–5. */
var DEVICE_LIMITS = {
	maxLevel: 5,
	/** Heat above this level is not allowed. */
	maxHeat: 4,
	maxDurationMin: 30,
	/** When heat is at or above this level, sessions are capped shorter. */
	highHeatLevel: 3,
	highHeatMaxDurationMin: 20,
	minDurationMin: 5
};
var SAFETY_NOTICE = "Keep heat at a comfortable warmth and never sleep with the device on. Stop if your skin becomes red, painful or numb. Do not use over broken skin, during pregnancy without medical advice, or if you have reduced feeling in the area.";
function maxDurationFor(heat) {
	return heat >= DEVICE_LIMITS.highHeatLevel ? DEVICE_LIMITS.highHeatMaxDurationMin : DEVICE_LIMITS.maxDurationMin;
}
function Relief() {
	const devices = useQuery({
		queryKey: ["my-devices"],
		queryFn: getMyDevices
	});
	const routines = useQuery({
		queryKey: ["routines"],
		queryFn: getRoutines
	});
	const [routineId, setRoutineId] = (0, import_react.useState)("routine-1");
	const [heat, setHeat] = (0, import_react.useState)(2);
	const [vibration, setVibration] = (0, import_react.useState)(2);
	const [redLight, setRedLight] = (0, import_react.useState)(1);
	const [duration, setDuration] = (0, import_react.useState)(15);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [seconds, setSeconds] = (0, import_react.useState)(duration * 60);
	(0, import_react.useEffect)(() => {
		if (!running) return;
		const timer = setInterval(() => setSeconds((value) => {
			if (value <= 1) {
				setRunning(false);
				return 0;
			}
			return value - 1;
		}), 1e3);
		return () => clearInterval(timer);
	}, [running]);
	const log = useMutation({ mutationFn: () => logSession({
		deviceId: devices.data?.[0]?.id ?? "device-1",
		routineId,
		startedAt: (/* @__PURE__ */ new Date()).toISOString(),
		heat,
		vibration,
		redLight,
		durationMin: duration,
		actualMin: Math.max(1, Math.round((duration * 60 - seconds) / 60)),
		painBefore: null,
		painAfter: null
	}) });
	const choose = (id) => {
		const routine = routines.data?.find((item) => item.id === id);
		if (routine) {
			setRoutineId(id);
			setHeat(routine.heat);
			setVibration(routine.vibration);
			setRedLight(routine.redLight);
			setDuration(routine.durationMin);
			setSeconds(routine.durationMin * 60);
		}
	};
	if (devices.isLoading || routines.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "card text-muted-foreground",
		children: "Loading your device…"
	});
	if (devices.isError || routines.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		className: "card text-destructive",
		children: "Couldn't load device controls."
	});
	if (!devices.data?.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-xl font-bold text-deep",
			children: "Add your device"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Enter a serial number to pair your wearable."
		})]
	});
	const max = maxDurationFor(heat);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold text-teal",
			children: "My Device"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-5 text-3xl font-bold text-deep",
			children: "Therapy controls"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold text-deep",
					children: "Preset routine"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-2",
					children: routines.data?.filter((item) => item.isPreset).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => choose(item.id),
						className: `rounded-xl border p-3 text-left ${routineId === item.id ? "border-primary bg-secondary" : "bg-white"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-semibold text-deep",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: item.description
						})]
					}, item.id))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-deep",
						children: "Intensity levels"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-5",
						children: [
							[
								"Heat",
								heat,
								setHeat,
								import_lucide_react.Flame
							],
							[
								"Vibration",
								vibration,
								setVibration,
								import_lucide_react.Waves
							],
							[
								"Red light",
								redLight,
								setRedLight,
								import_lucide_react.Sun
							]
						].map(([label, value, setter, Icon]) => {
							const IconType = Icon;
							const setValue = setter;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2 text-sm font-medium",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconType, { className: "h-4 w-4 text-teal" }),
										String(label),
										": ",
										Number(value),
										"/5"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "mt-2 w-full",
									type: "range",
									min: 0,
									max: 5,
									value: Number(value),
									onChange: (e) => {
										const next = +e.target.value;
										if (label === "Heat") setValue(Math.min(next, max));
										else setValue(next);
									}
								})]
							}, String(label));
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-5 block text-sm font-medium",
						children: [
							"Session duration: ",
							duration,
							" min",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "mt-2 w-full",
								type: "range",
								min: 5,
								max: Math.min(30, max),
								step: 5,
								value: duration,
								onChange: (e) => {
									const next = +e.target.value;
									setDuration(next);
									setSeconds(next * 60);
								}
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 rounded-xl bg-muted px-3 py-2 text-xs text-muted-foreground",
						children: SAFETY_NOTICE
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 card flex flex-wrap items-center justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Session timer"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-4xl font-bold text-deep",
				children: [
					String(Math.floor(seconds / 60)).padStart(2, "0"),
					":",
					String(seconds % 60).padStart(2, "0")
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "btn-secondary",
					onClick: () => setRunning(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Square, { className: "h-4 w-4" }), "Stop"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "btn-primary",
					onClick: () => {
						setSeconds(duration * 60);
						setRunning(true);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Play, { className: "h-4 w-4" }), "Start"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn-secondary",
					disabled: running || log.isPending,
					onClick: () => log.mutate(),
					children: "Log session"
				})]
			})]
		}),
		log.isSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 rounded-xl bg-secondary px-3 py-2 text-sm text-primary",
			children: "Session logged."
		})
	] });
}
//#endregion
export { Relief as component };
