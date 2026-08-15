import type Memo from "@/models/Memo"
import styles from "./Editor.module.css"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import UseMainPageContext from "../UseMainPageContext"
import { debounce, pick } from "lodash";

export default function Editor() {
    const useMainPageReturn = useContext(UseMainPageContext);
    if (!useMainPageReturn) {
        throw new Error("Editor must be used within a UseMainPageContext.Provider");
    }

    const { selectedMemo: loadedMemo, updateMemo } = useMainPageReturn;
    if (!loadedMemo) {
        throw new Error("A memo must be selected to show the Editor.");
    }

    const [memo, setMemo] = useState(loadedMemo)
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMemo(loadedMemo)
    }, [loadedMemo])

    const debouncedUpdateMemo = useMemo(
        () => debounce<typeof updateMemo>((...args) => updateMemo(...args), 1500),
        [updateMemo],
    )
    useEffect(() => {
        return () => {
            debouncedUpdateMemo.flush();
        }
    }, [debouncedUpdateMemo])

    const onChange = (updatedFields: Partial<Memo>) => {
        const newMemo = { ...memo, ...updatedFields }
        setMemo(newMemo)
        debouncedUpdateMemo(loadedMemo.id, pick(newMemo, "title", "content"));
    }

    // Focus handling
    const focusedRef = useRef(false);
    const titleRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (focusedRef.current) return;
        if (memo.title) {
            textareaRef.current?.focus();
        } else {
            titleRef.current?.focus();
        }
        focusedRef.current = true;
    }, [memo.title])

    return (
        <div className={styles.editor}>
            <input
                ref={titleRef}
                className={styles.titleInput}
                value={memo.title}
                placeholder="Title"
                onChange={e => onChange({ title: e.target.value })}
            />

            <textarea
                ref={textareaRef}
                className={styles.contentInput}
                value={memo.content}
                placeholder="Write your memo..."
                onChange={e => onChange({ content: e.target.value })}
            />
        </div>
    )
}
