import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import type MemoDTO from "@/models/MemoDTO";

export default async function apiUpdateMemo(id: string, memo: Partial<MemoDTO>): Promise<void> {
    const ref = doc(db, "memos", id);
    await updateDoc(ref, memo);
}