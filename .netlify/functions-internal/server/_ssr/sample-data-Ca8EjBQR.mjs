//#region node_modules/.nitro/vite/services/ssr/assets/sample-data-Ca8EjBQR.js
function series(days, start, end) {
	return Array.from({ length: days }, (_, i) => {
		const t = i / Math.max(1, days - 1);
		const base = start + (end - start) * t;
		const wobble = Math.sin(i * 1.7) * .9 + Math.cos(i * .6) * .5;
		const d = new Date(2026, 9, 8);
		d.setDate(d.getDate() - (days - 1 - i));
		return {
			day: d.toLocaleDateString("en-GB", {
				day: "numeric",
				month: "short"
			}),
			pain: Math.max(1, Math.min(10, Math.round((base + wobble) * 10) / 10)),
			sleep: Math.round((6.4 + Math.sin(i) * .9) * 10) / 10
		};
	});
}
var history = {
	7: series(7, 5.6, 5),
	30: series(30, 6.3, 5),
	90: series(90, 6.6, 4.8)
};
var sessions = [
	{
		date: "Today, 08:10",
		routine: "Morning back release",
		mins: 20,
		before: 6,
		after: 4,
		therapy: "Heat + Stretching"
	},
	{
		date: "Yesterday",
		routine: "Desk-break mobility",
		mins: 10,
		before: 5,
		after: 4,
		therapy: "Mobility"
	},
	{
		date: "6 Oct",
		routine: "Evening wind-down",
		mins: 25,
		before: 7,
		after: 5,
		therapy: "Red light + Breathing"
	},
	{
		date: "5 Oct",
		routine: "Cycle comfort",
		mins: 30,
		before: 7,
		after: 4,
		therapy: "Heat + Vibration"
	}
];
var painColor = (v) => v <= 3 ? "var(--pain-low)" : v <= 6 ? "var(--pain-mid)" : "var(--pain-high)";
//#endregion
export { painColor as n, sessions as r, history as t };
