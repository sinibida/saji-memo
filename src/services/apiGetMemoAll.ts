import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import type MemoDTO from "@/models/MemoDTO";

export default async function apiGetMemoAll(): Promise<MemoDTO[]> {
    const ref = collection(db, "memos");
    const snapshot = await getDocs(ref);
    return snapshot.docs.map((doc) => doc.data() as MemoDTO);
}