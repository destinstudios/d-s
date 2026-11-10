import {collection,addDoc,updateDoc,deleteDoc,doc,onSnapshot,query,orderBy,serverTimestamp,where,getDocs} from 'firebase/firestore';import {db} from './firebase';
export type Row={id:string;[key:string]:any};
export function subscribeRows<T extends Row>(name:string,cb:(rows:T[])=>void,clientId?:string){if(!db){cb([]);return()=>{};}let q:any=collection(db,name);if(clientId)q=query(q,where('clientId','==',clientId));else q=query(q,orderBy('createdAt','desc'));return onSnapshot(q,s=>cb(s.docs.map(d=>({id:d.id,...d.data()} as T))),()=>cb([]));}
export async function addRow(name:string,data:Record<string,any>){if(!db)throw new Error('Firebase not configured');return addDoc(collection(db,name),{...data,createdAt:serverTimestamp(),updatedAt:serverTimestamp()});}
export async function editRow(name:string,id:string,data:Record<string,any>){if(!db)throw new Error('Firebase not configured');return updateDoc(doc(db,name,id),{...data,updatedAt:serverTimestamp()});}
export async function removeRow(name:string,id:string){if(!db)throw new Error('Firebase not configured');return deleteDoc(doc(db,name,id));}
export async function getRows(name:string){if(!db)return[];const s=await getDocs(collection(db,name));return s.docs.map(d=>({id:d.id,...d.data()}));}
