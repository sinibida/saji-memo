import { collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

export default function apiRefMemos() {
    return collection(db, "memos");
}