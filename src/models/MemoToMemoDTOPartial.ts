import { Timestamp } from "firebase/firestore";
import type Memo from "./Memo";
import type MemoDTO from "./MemoDTO";
import { omitBy, isUndefined } from "lodash";

export default function MemoToMemoDTOPartial(memo: Partial<Memo>): Partial<MemoDTO> {
    return omitBy( {
        id: memo.id,
        title: memo.title,
        content: memo.content,
        createdAt: memo.createdAt ? Timestamp.fromDate(memo.createdAt) : undefined,
        updatedAt: memo.updatedAt ? Timestamp.fromDate(memo.updatedAt) : undefined,
    }, isUndefined)
}