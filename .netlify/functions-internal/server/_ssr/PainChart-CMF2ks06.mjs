import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as ResponsiveContainer, i as Area, n as YAxis, o as Tooltip, r as XAxis, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PainChart-CMF2ks06.js
var import_jsx_runtime = require_jsx_runtime();
function PainChart({ data, height = 200 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { height },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data,
				margin: {
					left: -24,
					right: 8,
					top: 8
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "painFill",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "var(--teal)",
							stopOpacity: .35
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "var(--teal)",
							stopOpacity: 0
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "day",
						tickLine: false,
						axisLine: false,
						tick: {
							fontSize: 11,
							fill: "var(--muted-foreground)"
						},
						minTickGap: 24
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						domain: [0, 10],
						tickLine: false,
						axisLine: false,
						tick: {
							fontSize: 11,
							fill: "var(--muted-foreground)"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
						borderRadius: 12,
						border: "1px solid var(--border)",
						fontSize: 12
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "pain",
						stroke: "var(--teal)",
						strokeWidth: 2.5,
						fill: "url(#painFill)"
					})
				]
			})
		})
	});
}
//#endregion
export { PainChart as t };
