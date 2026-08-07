import type Memo from "@/models/Memo"
import MemoNew from "@/models/MemoNew"
import { useState } from "react"

export type UseMainPageReturn = ReturnType<typeof useMainPage> 

export default function useMainPage() {
    const [memos, setMemos] = useState<Memo[]>([]);
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

    const addNewMemo = () => {
        const newMemo = MemoNew()
        setMemos(prevMemos => [...prevMemos, newMemo])
        return newMemo
    }

    const updateMemo = (updatedMemo: Partial<Memo>) => {
        setMemos(prevMemos => prevMemos.map(memo => memo.id === updatedMemo.id ? { ...memo, ...updatedMemo } : memo))
    }

    return { memos, addNewMemo, updateMemo, selectedId, setSelectedId }
}