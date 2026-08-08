import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export default async function apiDeleteMemo(id: string): Promise<void> {
    const ref = doc(db, "memos", id);
    await deleteDoc(ref);
}