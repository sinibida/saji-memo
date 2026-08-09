import useDebouncer from "@/hooks/useDebouncer";
import type Memo from "@/models/Memo"
import MemoDTOToMemo from "@/models/MemoDTOToMemo";
import MemoNew from "@/models/MemoNew"
import MemoToMemoDTO from "@/models/MemoToMemoDTO";
import apiDeleteMemo from "@/services/apiDeleteMemo";
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
                memos.map(memo =>
                    memo.dirty ? apiSetMemo(memo.id, MemoToMemoDTO(memo)) :
                    memo.deleted ? apiDeleteMemo(memo.id) :
                    undefined
                ).filter(x => !!x)
            )
            setMemos(memos.map(
                memo => memo.dirty ? { ...memo, dirty: false } : memo
            ).filter(memo => !memo.deleted))
            setSaving(false)
        })()
    }, 1000);

    const addNewMemo = useCallback(() => {
        const newMemo = MemoNew()
        setMemos(prevMemos => [newMemo, ...prevMemos])
        return newMemo
    }, []);

    const updateMemo = useCallback((id: string, updatedMemo: Partial<Memo>) => {
        const newMemos = memos.map(memo => memo.id === id ? {
            ...memo,
            ...updatedMemo,
            updatedAt: new Date(),
            dirty: true
        } : memo)
        setMemos(newMemos)
        updateDirtyMemoDebouncer.call(newMemos)
    }, [memos, updateDirtyMemoDebouncer]);

    const deleteMemo = useCallback((id: string) => {
        const newMemos = memos.map(memo => memo.id === id ? {
            ...memo,
            deleted: true
        } : memo)
        setMemos(newMemos)
        updateDirtyMemoDebouncer.callImmediately(newMemos)
    }, [memos, updateDirtyMemoDebouncer]);

    return { memos, addNewMemo, updateMemo, deleteMemo, selectedId, setSelectedId, ready, saving }
}
