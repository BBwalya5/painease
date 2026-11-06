import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { n as useSessionUser, t as SignOutButton } from "./SignOutButton-DZMCaJSo.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-CREoi6Ey.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
/** Roles are read from the database (RLS: own rows only). UI hints only — every write is enforced server-side. */
function useRoles() {
	const { user, ready } = useSessionUser();
	const roles = user?.role ? [user.role] : [];
	return {
		user,
		ready,
		roles,
		isAdmin: roles.includes("admin"),
		isProfessional: roles.includes("professional")
	};
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetClose = DialogClose;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
var main = [
	{
		to: "/",
		label: "Home",
		icon: import_lucide_react.Home
	},
	{
		to: "/track",
		label: "Ease Map",
		icon: import_lucide_react.Activity
	},
	{
		to: "/guide",
		label: "Ease Guide",
		icon: import_lucide_react.Sparkles
	},
	{
		to: "/journey",
		label: "Ease Journey",
		icon: import_lucide_react.Route
	},
	{
		to: "/profile",
		label: "Profile",
		icon: import_lucide_react.User
	}
];
var more = [
	{
		to: "/relief",
		label: "Ease Routines",
		icon: import_lucide_react.Sparkles
	},
	{
		to: "/insights",
		label: "Ease Insights",
		icon: import_lucide_react.Brain
	},
	{
		to: "/library",
		label: "Ease Library",
		icon: import_lucide_react.BookOpen
	},
	{
		to: "/conditions",
		label: "Conditions",
		icon: import_lucide_react.BookOpen
	},
	{
		to: "/womens",
		label: "Women's Ease",
		icon: import_lucide_react.Flower2
	},
	{
		to: "/provider",
		label: "Ease Support",
		icon: import_lucide_react.Stethoscope
	}
];
var professionalNavigation = [
	{
		to: "/professional",
		label: "Overview",
		icon: import_lucide_react.LayoutDashboard
	},
	{
		to: "/professional/requests",
		label: "Requests",
		icon: import_lucide_react.Stethoscope
	},
	{
		to: "/professional/patients",
		label: "Patients",
		icon: import_lucide_react.Users
	},
	{
		to: "/professional/follow-ups",
		label: "Follow-ups",
		icon: import_lucide_react.ClipboardCheck
	},
	{
		to: "/professional/profile",
		label: "My profile",
		icon: import_lucide_react.UserCog
	}
];
var adminNavigation = [
	{
		to: "/admin",
		label: "Overview",
		icon: import_lucide_react.LayoutDashboard
	},
	{
		to: "/admin/users",
		label: "Users",
		icon: import_lucide_react.Users
	},
	{
		to: "/admin/professionals",
		label: "Professionals",
		icon: import_lucide_react.ClipboardCheck
	},
	{
		to: "/admin/library",
		label: "Ease Library",
		icon: import_lucide_react.Library
	},
	{
		to: "/admin/facilities",
		label: "Facilities",
		icon: import_lucide_react.Building2
	},
	{
		to: "/admin/audit",
		label: "Audit log",
		icon: import_lucide_react.FileText
	}
];
var professionalBottomNavigation = [
	{
		to: "/professional",
		label: "Overview",
		icon: import_lucide_react.LayoutDashboard
	},
	{
		to: "/professional/requests",
		label: "Requests",
		icon: import_lucide_react.Stethoscope
	},
	{
		to: "/professional/patients",
		label: "Patients",
		icon: import_lucide_react.Users
	},
	{
		to: "/professional/follow-ups",
		label: "Follow-ups",
		icon: import_lucide_react.ClipboardCheck
	},
	{
		to: "/professional/profile",
		label: "Profile",
		icon: import_lucide_react.UserCog
	}
];
var adminBottomNavigation = [
	{
		to: "/admin",
		label: "Overview",
		icon: import_lucide_react.LayoutDashboard
	},
	{
		to: "/admin/users",
		label: "Users",
		icon: import_lucide_react.Users
	},
	{
		to: "/admin/professionals",
		label: "Reviews",
		icon: import_lucide_react.ClipboardCheck
	},
	{
		to: "/admin/library",
		label: "Library",
		icon: import_lucide_react.Library
	},
	{
		to: "/admin/audit",
		label: "Audit",
		icon: import_lucide_react.FileText
	}
];
function Logo() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		className: "flex items-center gap-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/painease-logo.png",
			alt: "PainEase",
			className: "h-9 w-auto max-w-[150px] object-contain lg:max-w-[220px]"
		})
	});
}
function AppShell({ children }) {
	const { isAdmin, isProfessional } = useRoles();
	const roleNavigation = isAdmin ? adminNavigation : isProfessional ? professionalNavigation : null;
	const primaryNavigation = roleNavigation ?? main;
	const secondaryNavigation = roleNavigation ? [] : more;
	const bottomNavigation = isAdmin ? adminBottomNavigation : isProfessional ? professionalBottomNavigation : main;
	const bottomGridClass = isAdmin ? "grid-cols-5" : isProfessional ? "grid-cols-5" : "grid-cols-5";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen lg:grid lg:grid-cols-[260px_1fr]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "sticky top-0 hidden h-screen flex-col gap-8 border-r bg-card p-6 lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex flex-col gap-1",
						children: [
							primaryNavigation.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideLink, { ...n }, n.to)),
							secondaryNavigation.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Explore"
							}),
							secondaryNavigation.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SideLink, { ...n }, n.to))
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountLink, {}),
					!roleNavigation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto rounded-2xl bg-soft p-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-deep",
							children: "Track → Understand → Manage"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-muted-foreground",
							children: "Record → Learn → Improve"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 flex items-center justify-between border-b bg-background/85 px-5 py-3 backdrop-blur lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileMenu, {})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto max-w-5xl px-5 pt-6 pb-32 lg:px-10 lg:pt-10 lg:pb-16",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: `fixed inset-x-3 bottom-3 z-30 grid ${bottomGridClass} rounded-3xl border bg-card/95 p-1.5 shadow-float backdrop-blur lg:hidden`,
				children: bottomNavigation.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: n.to,
					className: "flex flex-col items-center gap-0.5 rounded-2xl py-2 text-[11px] font-medium text-muted-foreground",
					activeProps: { className: "bg-secondary text-primary" },
					activeOptions: { exact: n.to === "/" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "h-5 w-5" }), n.label]
				}, n.to))
			})
		]
	});
}
function MobileMenu() {
	const { isAdmin, isProfessional } = useRoles();
	const { user } = useSessionUser();
	const userNavigation = [
		...main,
		...more.filter((item) => item.to !== "/womens"),
		...user?.painType === "reproductive" || user?.painType === "both" ? more.filter((item) => item.to === "/womens") : []
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Open navigation menu",
			className: "grid h-10 w-10 place-items-center rounded-full text-deep hover:bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MoreVertical, { className: "h-5 w-5" })
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
		side: "right",
		className: "w-[min(85vw,320px)] overflow-y-auto p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
				className: "pr-8 text-left",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Navigation" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "mt-5 flex flex-col gap-1",
				children: (isAdmin ? adminNavigation : isProfessional ? professionalNavigation : userNavigation).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetClose, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted",
						activeProps: { className: "bg-secondary text-primary" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-5 w-5" }), item.label]
					})
				}, item.to))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 border-t pt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetClose, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountLink, {})
				})
			})
		]
	})] });
}
function AccountLink({ compact = false }) {
	const { user, ready } = useSessionUser();
	if (!ready) return null;
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/auth",
		search: {},
		className: compact ? "rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground" : "btn-primary",
		children: "Sign in"
	});
	const profileTo = user.role === "professional" ? "/professional/profile" : user.role === "admin" ? "/admin" : "/profile";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: compact ? "flex items-center gap-2" : "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: profileTo,
			className: compact ? "grid h-9 w-9 place-items-center rounded-full bg-secondary text-xs font-bold text-primary" : "block rounded-xl border px-3 py-2 text-sm text-muted-foreground",
			children: compact ? (user.email?.[0] ?? "U").toUpperCase() : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Signed in as ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium text-foreground",
				children: user.email
			})] })
		}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignOutButton, {})]
	});
}
function SideLink({ to, label, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted",
		activeProps: { className: "bg-secondary text-primary" },
		activeOptions: { exact: to === "/" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4.5 w-4.5" }),
			" ",
			label
		]
	});
}
function PageHeader({ eyebrow, title, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 animate-rise",
		children: [
			eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold text-teal",
				children: eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl font-bold text-deep lg:text-4xl",
				children: title
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-muted-foreground",
				children: sub
			})
		]
	});
}
function Disclaimer({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-xl bg-muted px-4 py-3 text-xs text-muted-foreground",
		children
	});
}
//#endregion
export { useRoles as i, Disclaimer as n, PageHeader as r, AppShell as t };
