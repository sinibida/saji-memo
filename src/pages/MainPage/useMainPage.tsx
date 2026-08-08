import type Memo from "@/models/Memo"
import MemoDTOToMemo from "@/models/MemoDTOToMemo";
import MemoNew from "@/models/MemoNew"
import apiGetMemoAll from "@/services/apiGetMemoAll";
import { useEffect, useState } from "react"

export type UseMainPageReturn = ReturnType<typeof useMainPage>

export default function useMainPage() {
    const [ready, setReady] = useState(false);
    const [memos, setMemos] = useState<Memo[]>([]);
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

    useEffect(() => {
        (async () => {
            setMemos((await apiGetMemoAll()).map(MemoDTOToMemo))
            setReady(true)
        })()
    }, []);

    const addNewMemo = () => {
        const newMemo = MemoNew()
        setMemos(prevMemos => [...prevMemos, newMemo])
        return newMemo
    }

    const updateMemo = (updatedMemo: Partial<Memo>) => {
        setMemos(prevMemos => prevMemos.map(memo => memo.id === updatedMemo.id ? { ...memo, ...updatedMemo } : memo))
    }

    return { memos, addNewMemo, updateMemo, selectedId, setSelectedId, ready }
}
