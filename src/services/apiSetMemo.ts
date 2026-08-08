import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import type MemoDTO from "@/models/MemoDTO";

export default async function apiSetMemo(id: string, memo: MemoDTO): Promise<void> {
    const ref = doc(db, "memos", id);
    await setDoc(ref, memo);
}