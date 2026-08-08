import type Memo from "./Memo";
import type MemoDTO from "./MemoDTO";

export default function MemoDTOToMemo(memoDTO: MemoDTO): Memo {
    return {
        id: memoDTO.id,
        title: memoDTO.title,
        content: memoDTO.content,
        createdAt: memoDTO.createdAt.toDate(),
        updatedAt: memoDTO.updatedAt.toDate(),
        dirty: false,
    }
}