import type Memo from "@/models/Memo"
import MemoDTOToMemo from "@/models/MemoDTOToMemo";
import MemoNew from "@/models/MemoNew"
import apiGetMemoAll from "@/services/apiGetMemoAll";
import { useCallback, useEffect, useState } from "react"
import useMemoCommandHandler from "./useMemoCommandHandler";

export type UseMainPageReturn = ReturnType<typeof useMainPage>

export default function useMainPage() {
    const [ready, setReady] = useState(false);
    const [memos, setMemos] = useState<Memo[]>([]);
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

    const cmdHandler = useMemoCommandHandler();

    useEffect(() => {
        (async () => {
            setMemos((await apiGetMemoAll()).map(MemoDTOToMemo))
            setReady(true)
        })()
    }, []);

    const addNewMemo = useCallback(() => {
        const newMemo = MemoNew()
        setMemos(prevMemos => [newMemo, ...prevMemos])
        cmdHandler.pushCommand({
            type: "create",
            id: newMemo.id,
            data: newMemo,
        })
        return newMemo
    }, [cmdHandler]);

    const updateMemo = useCallback((id: string, updatedData: Partial<Memo>) => {
        const updatedMemo = {
            ...updatedData,
            updatedAt: new Date(),
        }
        setMemos(memos => memos.map(memo => memo.id === id ? {
            ...memo,
            ...updatedMemo,
        } : memo))
        cmdHandler.pushCommand({
            type: "update",
            id,
            data: updatedMemo,
        })
    }, [cmdHandler]);

    const deleteMemo = useCallback((id: string) => {
        const newMemos = memos.filter(memo => memo.id != id)
        setMemos(newMemos)
        cmdHandler.pushCommand({
            type: "delete",
            id,
        })
    }, [cmdHandler, memos]);

    return {
        memos, addNewMemo, updateMemo, deleteMemo, selectedId, setSelectedId, ready, saving: cmdHandler.flushing
    }
}
