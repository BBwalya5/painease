import { api, USE_MOCKS } from "@/lib/api";
import type { Announcement, FAQ } from "@/types";
const delay=()=>new Promise((resolve)=>setTimeout(resolve,250));
export async function getFAQs():Promise<FAQ[]> {
  if(!USE_MOCKS)return api.get("/faqs"); // TODO: GET /faqs
  await delay();return [{id:"faq-1",question:"How often can I use my device?",answer:"Use the preset guidance and stop if skin discomfort develops.",category:"device",published:true},{id:"faq-2",question:"When should I seek care?",answer:"Seek urgent medical help for severe, sudden, or worsening symptoms.",category:"safety",published:true},{id:"faq-3",question:"Who can see my records?",answer:"You control which practitioners can view each data category.",category:"privacy",published:true}];
}
export async function getAnnouncements():Promise<Announcement[]> {
  if(!USE_MOCKS)return api.get("/announcements"); // TODO: GET /announcements
  await delay();return [{id:"announcement-1",title:"New safety reminder",body:"Check skin comfort after every session.",audience:"all",published:true,createdAt:"2026-11-01T08:00:00.000Z"}];
}
