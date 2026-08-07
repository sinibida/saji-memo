import type Memo from "@/models/Memo"
import styles from "./MainPage.module.css"
import { useContext } from "react"
import { UseMainPageContext } from "./MainPage"

export default function Editor() {
    const useMainPageReturn = useContext(UseMainPageContext);
    if (!useMainPageReturn) {
        throw new Error("Sidebar must be used within a UseMainPageContext.Provider");
    }

    const { memos, selectedId, updateMemo } = useMainPageReturn;
    const memo = memos.find(m => m.id === selectedId) as Memo;

    const onChange = (updatedFields: Partial<Memo>) => {
        updateMemo({ ...updatedFields, id: memo.id });
    }
    
    return (
        <div className={styles.editor}>
            <input
                className={styles.titleInput}
                value={memo.title}
                placeholder="Title"
                onChange={e => onChange({ title: e.target.value, updatedAt: new Date() })}
            />

            <textarea
                className={styles.contentInput}
                value={memo.content}
                placeholder="Write your memo..."
                onChange={e => onChange({ content: e.target.value, updatedAt: new Date() })}
            />
        </div>
    )
}
