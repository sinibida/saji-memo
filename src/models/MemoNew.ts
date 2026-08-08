import type Memo from "./Memo";

export default function MemoNew(): Memo {
    return {
        id: crypto.randomUUID(),
        title: "",
        content: "",
        createdAt: new Date(),
        updatedAt: new Date(),
        dirty: false,
        deleted: false,
    }
}