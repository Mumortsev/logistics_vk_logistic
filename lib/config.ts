export const company = {name:'ВК-Логистик',phone:'',email:'',address:'',requisites:''};
export const tariffs = {
  minimum: 7500,
  vehicles: {
    van: {label:'Малотоннажный · до 1,5 т', rate:34, maxWeight:1500, maxVolume:12},
    medium: {label:'Среднетоннажный · до 5 т', rate:58, maxWeight:5000, maxVolume:35},
    truck: {label:'Еврофура · до 20 т', rate:95, maxWeight:20000, maxVolume:90},
  },
  urgency: {standard:1,express:1.3},
  cargo: {general:1,fragile:1.15,oversized:1.35},
  extras: {loading:3500,unloading:3500,insurance:2500},
};
export type Vehicle = keyof typeof tariffs.vehicles;
export type Urgency = keyof typeof tariffs.urgency;
export type Cargo = keyof typeof tariffs.cargo;
export type Extra = keyof typeof tariffs.extras;
export function calculate(distance:number,vehicle:Vehicle,weight:number,volume:number,urgency:Urgency,cargo:Cargo,extras:Extra[]) {
  if (!Number.isFinite(distance)||distance<=0) throw new Error('Некорректное расстояние');
  const v=tariffs.vehicles[vehicle];
  if(!v || weight<=0 || volume<=0 || weight>v.maxWeight || volume>v.maxVolume) throw new Error('Параметры груза не подходят выбранному транспорту');
  const base=Math.max(tariffs.minimum,Math.round(distance*v.rate));
  const adjusted=Math.round(base*tariffs.urgency[urgency]*tariffs.cargo[cargo]);
  const additional=extras.reduce((s,k)=>s+tariffs.extras[k],0);
  return {base,adjusted,additional,total:adjusted+additional,rate:v.rate};
}
