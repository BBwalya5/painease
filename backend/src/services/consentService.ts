import { api, USE_MOCKS } from "@/lib/api";
import type { ConsentLink, ConsentPermissions } from "@/types";
import { mockConsentLinks } from "@/mocks/data";
const delay=()=>new Promise((resolve)=>setTimeout(resolve,250));
export async function getConsentLinks():Promise<ConsentLink[]> {
  if(!USE_MOCKS)return api.get("/me/consents"); // TODO: GET /me/consents
  await delay();return mockConsentLinks;
}
export async function requestConsent(codeOrEmail:string):Promise<ConsentLink> {
  if(!USE_MOCKS)return api.post("/consents",{codeOrEmail}); // TODO: POST /consents
  await delay();return {...mockConsentLinks[1],id:`consent-${Date.now()}`,practitionerId:`code:${codeOrEmail}`};
}
export async function updateConsent(id:string,permissions:ConsentPermissions):Promise<ConsentLink> {
  if(!USE_MOCKS)return api.patch(`/consents/${id}`,{permissions}); // TODO: PATCH /consents/:id
  await delay();return {...mockConsentLinks.find((item)=>item.id===id)!,permissions,updatedAt:new Date().toISOString()};
}
export async function revokeConsent(id:string):Promise<ConsentLink> {
  if(!USE_MOCKS)return api.post(`/consents/${id}/revoke`); // TODO: POST /consents/:id/revoke
  await delay();return {...mockConsentLinks.find((item)=>item.id===id)!,status:"revoked"};
}
