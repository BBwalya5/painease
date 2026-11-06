import { useState } from "react";
import { ShieldAlert, ShieldCheck, RotateCcw } from "lucide-react";
import { assessSafety, blankAnswers, safetyQuestions, type SafetyAnswers, type Urgency } from "@/lib/safety";

const styles: Record<Urgency, { box: string; chip: string }> = {
  urgent: { box: "border-destructive/40 bg-destructive/10", chip: "bg-destructive text-destructive-foreground" },
  prompt: { box: "border-pain-mid/50 bg-pain-mid/10", chip: "bg-pain-mid text-deep" },
  routine: { box: "border-teal/40 bg-accent", chip: "bg-teal text-deep-foreground" },
};

export function SafetyCheck() {
  const [answers, setAnswers] = useState<SafetyAnswers>({ ...blankAnswers });
  const [step, setStep] = useState(0);
  const done = step >= safetyQuestions.length;
  const result = done ? assessSafety(answers) : null;
  const q = safetyQuestions[step];

  const answer = (v: boolean) => {
    if (!q) return;
    setAnswers((a) => ({ ...a, [q.key]: v }));
    setStep((s) => s + 1);
  };
  const reset = () => { setAnswers({ ...blankAnswers }); setStep(0); };

  return (
    <section className="card" aria-label="Safety check">
      <div className="flex items-center gap-2 text-sm font-semibold text-teal">
        <ShieldAlert className="h-4 w-4" /> Ease Safety check
      </div>
      {!result ? (
        <div className="mt-3">
          <p className="text-sm text-muted-foreground">A few quick questions to check whether self-care is right for you today. Question {step + 1} of {safetyQuestions.length}.</p>
          <p className="mt-4 font-display text-lg font-medium text-deep">{q?.text}</p>
          <div className="mt-4 flex gap-3">
            <button className="btn-primary flex-1" onClick={() => answer(true)}>Yes</button>
            <button className="btn-ghost flex-1" onClick={() => answer(false)}>No</button>
          </div>
          {step > 0 && <button onClick={() => setStep((s) => s - 1)} className="mt-3 text-sm text-muted-foreground underline">Back</button>}
        </div>
      ) : (
        <div className={`mt-3 rounded-2xl border p-4 ${styles[result.level].box}`}>
          <div className="flex items-center gap-2">
            {result.level === "routine" ? <ShieldCheck className="h-5 w-5 text-teal" /> : <ShieldAlert className="h-5 w-5 text-destructive" />}
            <h3 className="font-semibold text-deep">{result.title}</h3>
          </div>
          <p className="mt-2 text-sm">{result.message}</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {result.steps.map((s) => <li key={s} className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />{s}</li>)}
          </ul>
          <button onClick={reset} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"><RotateCcw className="h-3.5 w-3.5" /> Start again</button>
        </div>
      )}
    </section>
  );
}
