import type MemoDTO from "@/models/MemoDTO";
import type { DocumentData, QuerySnapshot } from "firebase/firestore";

export default function apiQueryToMemoDTOList(query:  QuerySnapshot<DocumentData, DocumentData>) {
    return query.docs.map(doc => doc.data() as MemoDTO)
}