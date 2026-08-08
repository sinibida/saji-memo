import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebaseConfig";
import type MemoDTO from "@/models/MemoDTO";

export default async function apiGetMemoAll(): Promise<MemoDTO[]> {
    const ref = collection(db, "memos");
    const q = query(ref, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as MemoDTO);
}