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
- Only role dashboards (/admin, /professional) live under `src/routes/_authenticated/`; Ease Map and Profile are public with guest data in localStorage. Why: guests use core features without an account.
- Body map regions are keyed `part` or `part:left|right` from `src/lib/body-regions.ts`, shared by front/back views. Why: selections survive view switches and sides stay correct.
- Zambia provinces/districts come only from `src/lib/zambia.ts` (tested at 10/116). Why: no invented locations.
- Roles live in `public.user_roles` (admin/professional/user) checked with `has_role()`; admin actions go through SECURITY DEFINER RPCs (`admin_*`) that re-check admin and write `audit_logs`. Why: permissions enforced in the database, not the UI.
- Professional status can only change via `admin_review_professional`; a trigger forces self-edits back to pending. Why: nobody can self-verify.
- Only role dashboards live under _authenticated; each role's pages live in src/modules/<role>/ with a <Role>PageShell for tabs, and shared user pages stay in src/routes. Why: role modules stay self-contained.
