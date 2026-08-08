import useDebouncer from "@/hooks/useBebouncer";
import type Memo from "@/models/Memo"
import MemoDTOToMemo from "@/models/MemoDTOToMemo";
import MemoNew from "@/models/MemoNew"
import MemoToMemoDTO from "@/models/MemoToMemoDTO";
import apiGetMemoAll from "@/services/apiGetMemoAll";
import apiSetMemo from "@/services/apiSetMemo";
import { useCallback, useEffect, useState } from "react"

export type UseMainPageReturn = ReturnType<typeof useMainPage>

export default function useMainPage() {
    const [ready, setReady] = useState(false);
    const [saving, setSaving] = useState(false);
    const [memos, setMemos] = useState<Memo[]>([]);
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

    useEffect(() => {
        (async () => {
            setMemos((await apiGetMemoAll()).map(MemoDTOToMemo))
            setReady(true)
        })()
    }, []);

    const updateDirtyMemoDebouncer = useDebouncer((memos: Memo[]) => {
        (async () => {
            setSaving(true)
            await Promise.all(
                memos.filter(memo => memo.dirty).map(memo =>
                    apiSetMemo(memo.id, MemoToMemoDTO(memo))
                )
            )
            setMemos(memos.map(memo => memo.dirty ? { ...memo, dirty: false } : memo))
            setSaving(false)
        })()
    }, 1000);

    const addNewMemo = useCallback(() => {
        const newMemo = MemoNew()
        setMemos(prevMemos => [...prevMemos, newMemo])
        return newMemo
    }, []);

    const updateMemo = useCallback((id: string, updatedMemo: Partial<Memo>) => {
        const newMemos = memos.map(memo => memo.id === id ? { ...memo, ...updatedMemo } : memo)
        setMemos(newMemos)
        if (!saving) {
            updateDirtyMemoDebouncer.call(newMemos)
        }
    }, [memos, updateDirtyMemoDebouncer]);

    return { memos, addNewMemo, updateMemo, selectedId, setSelectedId, ready, saving }
}
