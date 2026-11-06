<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- The root route disables SSR and checks the mock/API session before all page loads; only sign-in and account recovery are accessible signed out. Why: browser-stored preview sessions must be checked before any module renders.
- Body map regions are keyed `part` or `part:left|right` from `src/lib/body-regions.ts`, shared by front/back views. Why: selections survive view switches and sides stay correct.
- Zambia provinces/districts come only from `src/lib/zambia.ts` (tested at 10/116). Why: no invented locations.
- Route access uses the session role to isolate user, professional and admin pages; real API endpoints must independently authorize requests. Why: mock role guards are preview isolation, not a security boundary.
- Professional status can only change via `admin_review_professional`; a trigger forces self-edits back to pending. Why: nobody can self-verify.
- Only role dashboards live under _authenticated; each role's pages live in src/modules/<role>/ with a <Role>PageShell for tabs, and shared user pages stay in src/routes. Why: role modules stay self-contained.
