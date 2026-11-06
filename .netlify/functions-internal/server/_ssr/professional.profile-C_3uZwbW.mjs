import { i as __toESM } from "../_runtime.mjs";
import { n as api, t as USE_MOCKS } from "./api-aVES2gL9.mjs";
import { c as mockPractitioners } from "./data-B2J0LzkN.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as useMyProProfile, t as ProfessionalPageShell } from "./ProfessionalShell-DY1WATXn.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/professional.profile-C_3uZwbW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var zambiaDistricts = {
	Central: [
		"Chibombo",
		"Chisamba",
		"Chitambo",
		"Itezhi-Tezhi",
		"Kabwe",
		"Kapiri Mposhi",
		"Luano",
		"Mkushi",
		"Mumbwa",
		"Ngabwe",
		"Serenje",
		"Shibuyunji"
	],
	Copperbelt: [
		"Chililabombwe",
		"Chingola",
		"Kalulushi",
		"Kitwe",
		"Luanshya",
		"Lufwanyama",
		"Masaiti",
		"Mpongwe",
		"Mufulira",
		"Ndola"
	],
	Eastern: [
		"Chadiza",
		"Chasefu",
		"Chipangali",
		"Chipata",
		"Kasenengwa",
		"Katete",
		"Lumezi",
		"Lundazi",
		"Lusangazi",
		"Mambwe",
		"Nyimba",
		"Petauke",
		"Sinda",
		"Vubwi"
	],
	Luapula: [
		"Chembe",
		"Chiengi",
		"Chifunabuli",
		"Chipili",
		"Kawambwa",
		"Lunga",
		"Mansa",
		"Milenge",
		"Mwansabombwe",
		"Mwense",
		"Nchelenge",
		"Samfya"
	],
	Lusaka: [
		"Chilanga",
		"Chongwe",
		"Kafue",
		"Luangwa",
		"Lusaka",
		"Rufunsa"
	],
	Muchinga: [
		"Chama",
		"Chinsali",
		"Isoka",
		"Kanchibiya",
		"Lavushimanda",
		"Mafinga",
		"Mpika",
		"Nakonde",
		"Shiwang'andu"
	],
	Northern: [
		"Chilubi",
		"Kaputa",
		"Kasama",
		"Lunte",
		"Lupososhi",
		"Luwingu",
		"Mbala",
		"Mporokoso",
		"Mpulungu",
		"Mungwi",
		"Nsama",
		"Senga Hill"
	],
	"North-Western": [
		"Chavuma",
		"Ikelenge",
		"Kabompo",
		"Kalumbila",
		"Kasempa",
		"Manyinga",
		"Mufumbwe",
		"Mushindamo",
		"Mwinilunga",
		"Solwezi",
		"Zambezi"
	],
	Southern: [
		"Chikankata",
		"Chirundu",
		"Choma",
		"Gwembe",
		"Kalomo",
		"Kazungula",
		"Livingstone",
		"Mazabuka",
		"Monze",
		"Namwala",
		"Pemba",
		"Siavonga",
		"Sinazongwe",
		"Zimba"
	],
	Western: [
		"Kalabo",
		"Kaoma",
		"Limulunga",
		"Luampa",
		"Lukulu",
		"Mitete",
		"Mongu",
		"Mulobezi",
		"Mwandi",
		"Nalolo",
		"Nkeyema",
		"Senanga",
		"Sesheke",
		"Shang'ombo",
		"Sikongo",
		"Sioma"
	]
};
var zambiaProvinces = Object.keys(zambiaDistricts);
var delay = () => new Promise((resolve) => setTimeout(resolve, 250));
async function registerProfessional(input) {
	if (!USE_MOCKS) return api.post("/auth/register-professional", input);
	await delay();
	return {
		...mockPractitioners[1],
		...input,
		status: "pending"
	};
}
var professions = [
	"Nurse",
	"Midwife",
	"Clinical officer",
	"Medical doctor",
	"Physiotherapist",
	"Pharmacist",
	"Other"
];
var serviceList = [
	"Women's health",
	"Menstrual health",
	"Physiotherapy",
	"Chronic condition support",
	"Family planning",
	"Counselling",
	"General consultation"
];
var schema = objectType({
	full_name: stringType().trim().min(2, "Enter your full name").max(120),
	profession: stringType().min(1, "Choose your profession"),
	license_number: stringType().trim().min(3, "Enter your licence or registration number").max(60),
	licensing_body: stringType().trim().max(120),
	facility: stringType().trim().max(160),
	bio: stringType().trim().max(800)
});
var empty = {
	full_name: "",
	profession: "",
	license_number: "",
	licensing_body: "",
	facility: "",
	province: "",
	district: "",
	services: [],
	bio: ""
};
function ProfessionalProfile() {
	const qc = useQueryClient();
	const app = useMyProProfile();
	const [f, setF] = (0, import_react.useState)(null);
	const [msg, setMsg] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (app.isSuccess && !f) {
			const d = app.data;
			setF(d ? {
				full_name: d.full_name,
				profession: d.profession,
				license_number: d.license_number,
				licensing_body: d.licensing_body ?? "",
				facility: d.facility ?? "",
				province: d.province ?? "",
				district: d.district ?? "",
				services: d.services,
				bio: d.bio ?? ""
			} : empty);
		}
	}, [
		app.isSuccess,
		app.data,
		f
	]);
	const save = useMutation({
		mutationFn: async () => {
			const parsed = schema.safeParse(f);
			if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Please check the form");
			await registerProfessional({
				name: f.full_name,
				profession: f.profession,
				licenseNumber: f.license_number,
				clinic: f.facility
			});
		},
		onSuccess: () => {
			setMsg("Saved.");
			qc.invalidateQueries({ queryKey: ["my-pro"] });
			qc.invalidateQueries({ queryKey: ["my-roles"] });
		}
	});
	const input = "w-full rounded-xl border bg-card px-3 py-2 text-sm";
	const set = (p) => {
		if (f) {
			setF({
				...f,
				...p
			});
			setMsg("");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfessionalPageShell, {
		title: "My profile",
		sub: "Your licence details and the services you offer.",
		children: !f ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Loading…"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card grid gap-3 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm",
					children: ["Full name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: input,
						value: f.full_name,
						maxLength: 120,
						onChange: (e) => set({ full_name: e.target.value })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm",
					children: ["Profession", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: input,
						value: f.profession,
						onChange: (e) => set({ profession: e.target.value }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Choose…"
						}), professions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: p }, p))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm",
					children: ["Licence / registration number", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: input,
						value: f.license_number,
						maxLength: 60,
						onChange: (e) => set({ license_number: e.target.value })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm",
					children: ["Licensing body", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: input,
						placeholder: "e.g. Health Professions Council of Zambia",
						value: f.licensing_body,
						maxLength: 120,
						onChange: (e) => set({ licensing_body: e.target.value })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm",
					children: ["Facility where you work", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: input,
						value: f.facility,
						maxLength: 160,
						onChange: (e) => set({ facility: e.target.value })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm",
					children: ["Province", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: input,
						value: f.province,
						onChange: (e) => set({
							province: e.target.value,
							district: ""
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Choose…"
						}), zambiaProvinces.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: p }, p))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm",
					children: ["District", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: input,
						value: f.district,
						disabled: !f.province,
						onChange: (e) => set({ district: e.target.value }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Choose…"
						}), (zambiaDistricts[f.province] ?? []).map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: d }, d))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sm:col-span-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2",
						children: "Services you offer"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: serviceList.map((s) => {
							const on = f.services.includes(s);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: `chip ${on ? "chip-on" : ""}`,
								onClick: () => set({ services: on ? f.services.filter((x) => x !== s) : [...f.services, s] }),
								children: s
							}, s);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm sm:col-span-2",
					children: ["Short introduction", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: input,
						rows: 3,
						maxLength: 800,
						value: f.bio,
						onChange: (e) => set({ bio: e.target.value })
					})]
				}),
				save.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "alert",
					className: "sm:col-span-2 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive",
					children: save.error instanceof Error ? save.error.message : "Couldn't save"
				}),
				msg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "sm:col-span-2 text-sm text-teal",
					children: msg
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "sm:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-primary",
						disabled: save.isPending,
						onClick: () => save.mutate(),
						children: app.data ? "Save changes" : "Submit application"
					})
				})
			]
		})
	});
}
var SplitComponent = ProfessionalProfile;
//#endregion
export { SplitComponent as component };
