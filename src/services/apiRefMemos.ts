import { collection, orderBy, query } from "firebase/firestore";
import { db } from "./firebaseConfig";

export default function apiRefMemos() {
    return query(collection(db, "memos"), orderBy("createdAt", "desc"));
}