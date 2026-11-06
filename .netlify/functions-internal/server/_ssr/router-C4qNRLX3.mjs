import { t as getCurrentSession } from "./authService-BHEc1Daz.mjs";
import { K as redirect, S as useRouter, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as useMatchRoute, m as createRouter, v as createFileRoute, y as createRootRouteWithContext } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as AppShell } from "./AppShell-CREoi6Ey.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Route$26 } from "./conditions._slug-BPgNAUeL.mjs";
import { t as Route$27 } from "./professional.patients._patientId-ULeAo9IA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C4qNRLX3.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BbU5sSwB.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$25 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "PainEase — Understand your body. Find your comfort. Discover your Ease." },
			{
				name: "description",
				content: "PainEase helps girls and women in Zambia understand their symptoms, find safe comfort and know when to seek care."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$25.useRouteContext();
	const matchRoute = useMatchRoute();
	const authOnly = matchRoute({ to: "/auth" }) || matchRoute({ to: "/reset-password" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: authOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter$24 = () => import("./routes-DBKbprKz.mjs");
var Route$24 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$24, "component") });
var $$splitComponentImporter$23 = () => import("./route-Di7iQBCH.mjs");
var Route$23 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async ({ location }) => {
		let session;
		try {
			session = await getCurrentSession();
		} catch {
			throw redirect({
				to: "/auth",
				search: { redirect: location.pathname }
			});
		}
		if (!session?.user) throw redirect({
			to: "/auth",
			search: { redirect: location.pathname }
		});
		if (location.pathname === "/admin" || location.pathname.startsWith("/admin/")) {
			if (session.user.role !== "admin") throw redirect({ to: "/track" });
		}
		if (location.pathname === "/professional" || location.pathname.startsWith("/professional/")) {
			if (session.user.role !== "professional") throw redirect({ to: "/track" });
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./auth-bnHs-e-J.mjs");
var Route$22 = createFileRoute("/auth")({ component: lazyRouteComponent($$splitComponentImporter$22, "component") });
var $$splitComponentImporter$21 = () => import("./guide-CeBG4cJj.mjs");
var Route$21 = createFileRoute("/guide")({
	head: () => ({ meta: [
		{ title: "Ease Guide — PainEase" },
		{
			name: "description",
			content: "Understand what your body is telling you: a safety check, plain-language guides and reviewed comfort resources."
		},
		{
			property: "og:title",
			content: "Ease Guide — PainEase"
		},
		{
			property: "og:description",
			content: "Understand what your body is telling you, with safety guidance first."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./insights-BVx1ILyo.mjs");
var Route$20 = createFileRoute("/insights")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
var $$splitComponentImporter$19 = () => import("./journey-DHosghQ7.mjs");
var Route$19 = createFileRoute("/journey")({
	head: () => ({ meta: [
		{ title: "Ease Journey — PainEase" },
		{
			name: "description",
			content: "Sessions completed, days tracked, trends and progress over time."
		},
		{
			property: "og:title",
			content: "Ease Journey — PainEase"
		},
		{
			property: "og:description",
			content: "A visual timeline of your pain management journey."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./library-BeZNpEC-.mjs");
var Route$18 = createFileRoute("/library")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./profile-BDkYsnHk.mjs");
var Route$17 = createFileRoute("/profile")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./provider-B5M8pUm-.mjs");
var Route$16 = createFileRoute("/provider")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./relief-Bwo2XCHu.mjs");
var Route$15 = createFileRoute("/relief")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./reset-password-Lu27rE_t.mjs");
var Route$14 = createFileRoute("/reset-password")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./track-BdOX7FKA.mjs");
var Route$13 = createFileRoute("/track")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./womens-DygtsdHp.mjs");
var Route$12 = createFileRoute("/womens")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./conditions.index-qacrH_Yb.mjs");
var Route$11 = createFileRoute("/conditions/")({
	head: () => ({ meta: [
		{ title: "Conditions — PainEase" },
		{
			name: "description",
			content: "Plain-language guides to menstrual pain, fibroids, endometriosis, PCOS, back pain and more."
		},
		{
			property: "og:title",
			content: "Conditions — PainEase"
		},
		{
			property: "og:description",
			content: "Understand your pain condition and what can help."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./admin.index-CKVig-31.mjs");
var Route$10 = createFileRoute("/_authenticated/admin/")({
	head: () => ({ meta: [
		{ title: "Admin Dashboard — PainEase" },
		{
			name: "description",
			content: "Manage PainEase users, Ease Library content, verified facilities and professionals."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./admin.audit-UheZlWWb.mjs");
var Route$9 = createFileRoute("/_authenticated/admin/audit")({
	head: () => ({ meta: [{ title: "Admin Audit Log — PainEase" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./admin.facilities-Bla5gEzc.mjs");
var Route$8 = createFileRoute("/_authenticated/admin/facilities")({
	head: () => ({ meta: [{ title: "Admin Facilities — PainEase" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./admin.library-BYJWJV11.mjs");
var Route$7 = createFileRoute("/_authenticated/admin/library")({
	head: () => ({ meta: [{ title: "Admin Library — PainEase" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./admin.professionals-C1o4Q1xh.mjs");
var Route$6 = createFileRoute("/_authenticated/admin/professionals")({
	head: () => ({ meta: [{ title: "Admin Professionals — PainEase" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./admin.users-DQIE5rhI.mjs");
var Route$5 = createFileRoute("/_authenticated/admin/users")({
	head: () => ({ meta: [{ title: "Admin Users — PainEase" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./professional.index-DRty_uAf.mjs");
var Route$4 = createFileRoute("/_authenticated/professional/")({
	head: () => ({ meta: [
		{ title: "Professional Dashboard — PainEase" },
		{
			name: "description",
			content: "Healthcare professionals manage their PainEase profile, credentials and services."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./professional.follow-ups-8ExyCiLh.mjs");
var Route$3 = createFileRoute("/_authenticated/professional/follow-ups")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./professional.patients-T6qHBTIc.mjs");
var Route$2 = createFileRoute("/_authenticated/professional/patients")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./professional.profile-C_3uZwbW.mjs");
var Route$1 = createFileRoute("/_authenticated/professional/profile")({
	head: () => ({ meta: [
		{ title: "My Professional Profile — PainEase" },
		{
			name: "description",
			content: "Edit your licence details, facility and services on PainEase."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./professional.requests-CJeVWJRA.mjs");
var Route = createFileRoute("/_authenticated/professional/requests")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$24.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$25
});
var AuthenticatedRouteRoute = Route$23.update({
	id: "/_authenticated",
	getParentRoute: () => Route$25
});
var AuthRoute = Route$22.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$25
});
var GuideRoute = Route$21.update({
	id: "/guide",
	path: "/guide",
	getParentRoute: () => Route$25
});
var InsightsRoute = Route$20.update({
	id: "/insights",
	path: "/insights",
	getParentRoute: () => Route$25
});
var JourneyRoute = Route$19.update({
	id: "/journey",
	path: "/journey",
	getParentRoute: () => Route$25
});
var LibraryRoute = Route$18.update({
	id: "/library",
	path: "/library",
	getParentRoute: () => Route$25
});
var ProfileRoute = Route$17.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$25
});
var ProviderRoute = Route$16.update({
	id: "/provider",
	path: "/provider",
	getParentRoute: () => Route$25
});
var ReliefRoute = Route$15.update({
	id: "/relief",
	path: "/relief",
	getParentRoute: () => Route$25
});
var ResetPasswordRoute = Route$14.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$25
});
var TrackRoute = Route$13.update({
	id: "/track",
	path: "/track",
	getParentRoute: () => Route$25
});
var WomensRoute = Route$12.update({
	id: "/womens",
	path: "/womens",
	getParentRoute: () => Route$25
});
var ConditionsIndexRoute = Route$11.update({
	id: "/conditions/",
	path: "/conditions/",
	getParentRoute: () => Route$25
});
var ConditionsSlugRoute = Route$26.update({
	id: "/conditions/$slug",
	path: "/conditions/$slug",
	getParentRoute: () => Route$25
});
var AuthenticatedAdminIndexRoute = Route$10.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminAuditRoute = Route$9.update({
	id: "/admin/audit",
	path: "/admin/audit",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminFacilitiesRoute = Route$8.update({
	id: "/admin/facilities",
	path: "/admin/facilities",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminLibraryRoute = Route$7.update({
	id: "/admin/library",
	path: "/admin/library",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminProfessionalsRoute = Route$6.update({
	id: "/admin/professionals",
	path: "/admin/professionals",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminUsersRoute = Route$5.update({
	id: "/admin/users",
	path: "/admin/users",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfessionalIndexRoute = Route$4.update({
	id: "/professional/",
	path: "/professional/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfessionalFollowUpsRoute = Route$3.update({
	id: "/professional/follow-ups",
	path: "/professional/follow-ups",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfessionalPatientsRoute = Route$2.update({
	id: "/professional/patients",
	path: "/professional/patients",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfessionalProfileRoute = Route$1.update({
	id: "/professional/profile",
	path: "/professional/profile",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfessionalRequestsRoute = Route.update({
	id: "/professional/requests",
	path: "/professional/requests",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfessionalPatientsRouteChildren = { AuthenticatedProfessionalPatientsPatientIdRoute: Route$27.update({
	id: "/$patientId",
	path: "/$patientId",
	getParentRoute: () => AuthenticatedProfessionalPatientsRoute
}) };
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAdminAuditRoute,
	AuthenticatedAdminFacilitiesRoute,
	AuthenticatedAdminLibraryRoute,
	AuthenticatedAdminProfessionalsRoute,
	AuthenticatedAdminUsersRoute,
	AuthenticatedProfessionalFollowUpsRoute,
	AuthenticatedProfessionalPatientsRoute: AuthenticatedProfessionalPatientsRoute._addFileChildren(AuthenticatedProfessionalPatientsRouteChildren),
	AuthenticatedProfessionalProfileRoute,
	AuthenticatedProfessionalRequestsRoute,
	AuthenticatedAdminIndexRoute,
	AuthenticatedProfessionalIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute,
	GuideRoute,
	InsightsRoute,
	JourneyRoute,
	LibraryRoute,
	ProfileRoute,
	ProviderRoute,
	ReliefRoute,
	ResetPasswordRoute,
	TrackRoute,
	WomensRoute,
	ConditionsSlugRoute,
	ConditionsIndexRoute
};
var routeTree = Route$25._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
