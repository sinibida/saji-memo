import type Memo from "@/models/Memo"
import MemoDTOToMemo from "@/models/MemoDTOToMemo";
import MemoNew from "@/models/MemoNew"
import { useCallback, useEffect, useState } from "react"
import { deleteDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import apiRefMemos from "@/services/apiRefMemos";
import apiQueryToMemoDTOList from "@/services/apiQueryToMemoDTOList";
import MemoToMemoDTO from "@/models/MemoToMemoDTO";
import apiRefMemo from "@/services/apiRefMemo";
import MemoToMemoDTOPartial from "@/models/MemoToMemoDTOPartial";

export type UseMainPageReturn = ReturnType<typeof useMainPage>

export default function useMainPage() {
    const [ready, setReady] = useState(false);
    const [memos, setMemos] = useState<Memo[]>([]); // Updated by onSnapshot
    const [saving, setSaving] = useState<boolean>(false); // Updated by onSnapshot
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

    // memos
    useEffect(() => {
        return onSnapshot(apiRefMemos(), (collection) => {
            // LEFTOFF textbox keeps on reseting when editing
            setMemos(apiQueryToMemoDTOList(collection).map(MemoDTOToMemo))
            setReady(true)
        })
    }, []);

    // saving
    useEffect(() => {
        return onSnapshot(apiRefMemos(), { includeMetadataChanges: true }, (collection) => {
            setSaving(collection.docs.some(doc => doc.metadata.hasPendingWrites))
        })
    }, []);

    const addNewMemo = useCallback(() => {
        const newMemo = MemoNew()
        setDoc(apiRefMemo(newMemo.id), MemoToMemoDTO(newMemo))
        return newMemo
    }, []);

    const updateMemo = useCallback((id: string, updatedData: Partial<Memo>) => {
        const updatedMemo = {
            ...updatedData,
            updatedAt: new Date(),
        }
        updateDoc(apiRefMemo(id), MemoToMemoDTOPartial(updatedMemo))
    }, []);

    const deleteMemo = useCallback((id: string) => {
        deleteDoc(apiRefMemo(id))
    }, []);

    return {
        memos, addNewMemo, updateMemo, deleteMemo, selectedId, setSelectedId, ready, saving
    }
}
