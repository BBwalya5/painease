import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getFAQs } from "@/services/helpService";
export const Route=createFileRoute("/library")({component:Library});
function Library(){const q=useQuery({queryKey:["faqs"],queryFn:getFAQs});if(q.isLoading)return <p className="card text-muted-foreground">Loading FAQs…</p>;if(q.isError)return <p role="alert" className="card text-destructive">Couldn't load help content.</p>;return <div><p className="text-sm font-semibold text-teal">Help</p><h1 className="mb-5 text-3xl font-bold text-deep">Frequently asked questions</h1><div className="space-y-3">{q.data?.map((item)=><section key={item.id} className="card"><p className="font-semibold text-deep">{item.question}</p><p className="mt-2 text-sm text-muted-foreground">{item.answer}</p></section>)}</div></div>}
