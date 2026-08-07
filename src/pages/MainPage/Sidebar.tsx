import { useContext } from "react";
import styles from "./MainPage.module.css"
import { UseMainPageContext } from "./MainPage";


export default function Sidebar() {
    const useMainPageReturn = useContext(UseMainPageContext);
    if (!useMainPageReturn) {
        throw new Error("Sidebar must be used within a UseMainPageContext.Provider");
    }
    const { memos, selectedId, setSelectedId, addNewMemo } = useMainPageReturn;

    const handleAdd = () => {
        const newMemo = addNewMemo();
        setSelectedId(newMemo.id);
    };

    const onSelect = (id: string) => {
        setSelectedId(id);
    }

    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <h2>Memos</h2>
                <button className={styles.addBtn} onClick={handleAdd}>+</button>
            </div>

            <ul className={styles.memoList}>
                {memos.map(m => (
                    <li
                        key={m.id}
                        className={m.id === selectedId ? styles.selectedItem : styles.item}
                        onClick={() => onSelect(m.id)}
                    >
                        <div className={styles.itemTitle}>{m.title || "Untitled"}</div>
                        <div className={styles.itemTime}>{m.updatedAt.toLocaleString()}</div>
                    </li>
                ))}
            </ul>
        </aside>
    )
}
