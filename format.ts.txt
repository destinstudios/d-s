export const money=(n:number|string=0)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(Number(n)||0);
export const date=(v:any)=>{if(!v)return '—';const d=v?.toDate?v.toDate():new Date(v);return Number.isNaN(d.getTime())?'—':d.toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})};
