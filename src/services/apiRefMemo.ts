import { doc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export default function apiRefMemo(id: string) {
    return doc(db, "memos", id);
}