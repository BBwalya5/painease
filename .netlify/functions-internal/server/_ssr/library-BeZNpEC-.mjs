import { n as api, t as USE_MOCKS } from "./api-aVES2gL9.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-BeZNpEC-.js
var import_jsx_runtime = require_jsx_runtime();
var delay = () => new Promise((resolve) => setTimeout(resolve, 250));
async function getFAQs() {
	if (!USE_MOCKS) return api.get("/faqs");
	await delay();
	return [
		{
			id: "faq-1",
			question: "How often can I use my device?",
			answer: "Use the preset guidance and stop if skin discomfort develops.",
			category: "device",
			published: true
		},
		{
			id: "faq-2",
			question: "When should I seek care?",
			answer: "Seek urgent medical help for severe, sudden, or worsening symptoms.",
			category: "safety",
			published: true
		},
		{
			id: "faq-3",
			question: "Who can see my records?",
			answer: "You control which practitioners can view each data category.",
			category: "privacy",
			published: true
		}
	];
}
function Library() {
	const q = useQuery({
		queryKey: ["faqs"],
		queryFn: getFAQs
	});
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "card text-muted-foreground",
		children: "Loading FAQs…"
	});
	if (q.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		className: "card text-destructive",
		children: "Couldn't load help content."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold text-teal",
			children: "Help"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-5 text-3xl font-bold text-deep",
			children: "Frequently asked questions"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: q.data?.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold text-deep",
					children: item.question
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: item.answer
				})]
			}, item.id))
		})
	] });
}
//#endregion
export { Library as component };
