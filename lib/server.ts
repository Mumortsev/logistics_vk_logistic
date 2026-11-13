export const geocoder=process.env.PHOTON_URL||'https://photon.komoot.io';
export const router=process.env.OSRM_URL||'https://router.project-osrm.org';
export async function upstream(url:string){const c=new AbortController();const timer=setTimeout(()=>c.abort(),9500);try{const r=await fetch(url,{signal:c.signal,headers:{'User-Agent':'VKLogisticPrototype/1.0'},next:{revalidate:300}});if(!r.ok)throw new Error(`API ${r.status}`);return await r.json()}finally{clearTimeout(timer)}}
