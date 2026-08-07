import { Timestamp } from "firebase/firestore";
import type Memo from "./Memo";
import type MemoDTO from "./MemoDTO";

export default function MemoToMemoDTO(memo: Memo): MemoDTO {
    return {
        id: memo.id,
        title: memo.title,
        content: memo.content,
        createdAt: Timestamp.fromDate(memo.createdAt),
        updatedAt: Timestamp.fromDate(memo.updatedAt),
    }
}