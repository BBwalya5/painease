import { Y as notFound, _ as lazyRouteComponent, v as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as conditionBySlug } from "./conditions-Dtcf8RFg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/conditions._slug-BPgNAUeL.js
var $$splitComponentImporter = () => import("./conditions._slug-BQXBXGiw.mjs");
var $$splitNotFoundComponentImporter = () => import("./conditions._slug-DUBrAVLc.mjs");
var Route = createFileRoute("/conditions/$slug")({
	loader: ({ params }) => {
		const c = conditionBySlug(params.slug);
		if (!c) throw notFound();
		return c;
	},
	head: ({ loaderData }) => ({ meta: loaderData ? [
		{ title: `${loaderData.name} — PainEase` },
		{
			name: "description",
			content: loaderData.summary
		},
		{
			property: "og:title",
			content: `${loaderData.name} — PainEase`
		},
		{
			property: "og:description",
			content: loaderData.summary
		},
		{
			property: "og:type",
			content: "article"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] : [{ title: "Condition not found — PainEase" }, {
		name: "robots",
		content: "noindex"
	}] }),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
