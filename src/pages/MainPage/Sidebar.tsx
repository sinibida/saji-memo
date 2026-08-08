import { useContext } from "react";
import styles from "./Sidebar.module.css"
import UseMainPageContext from "./UseMainPageContext";


export default function Sidebar() {
    const useMainPageReturn = useContext(UseMainPageContext);
    if (!useMainPageReturn) {
        throw new Error("Sidebar must be used within a UseMainPageContext.Provider");
    }
    const { memos, selectedId, setSelectedId, addNewMemo, deleteMemo, saving } = useMainPageReturn;

    const handleAdd = () => {
        const newMemo = addNewMemo();
        setSelectedId(newMemo.id);
    };
    const handleDelete = () => {
        deleteMemo(selectedId!)
    };

    const onSelect = (id: string) => {
        setSelectedId(id);
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles.header}>
                <div>
                    <h2 className={styles.title}>📝 싸지 메모</h2>
                    <div className={styles.subtitle}>{saving ? `저장 중...` : `모든 메모 (${memos.length})`}</div>
                </div>
                <div className={styles.headerBtnRow}> 
                    <button className={styles.addBtn} onClick={handleAdd}>+</button>
                    <button disabled={!selectedId} className={styles.deleteBtn} onClick={handleDelete}>x</button>
                </div>
            </div>

            <ul className={styles.memoList}>
                {memos.map(m => (
                    <li
                        key={m.id}
                        className={m.id === selectedId ? styles.selectedItem : styles.item}
                        onClick={() => onSelect(m.id)}
                    >
                        <div className={styles.itemTitle}>{m.title || "제목 없음"}</div>
                        <div className={styles.itemTime}>{m.updatedAt.toLocaleString()}</div>
                    </li>
                ))}
            </ul>
        </aside>
    )
}
