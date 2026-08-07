import { createContext } from "react"
import useMainPage, { type UseMainPageReturn } from "./useMainPage"
import Sidebar from "./Sidebar"
import Editor from "./Editor"
import styles from "./MainPage.module.css"

// LEFTOFF main service

export const UseMainPageContext = createContext<UseMainPageReturn | null>(null)

export default function MainPage() {
    const useMainPageReturn = useMainPage();
    const {memos, selectedId} = useMainPageReturn;
    const selectedMemo = memos.find(m => m.id === selectedId) ?? null

    return (
        <UseMainPageContext.Provider value={useMainPageReturn}>
            <div className={styles.container}>
                <Sidebar/>
                <main className={styles.editorArea}>
                    {selectedMemo ? (
                        <Editor />
                    ) : (
                        <div className={styles.empty}>Select or create a memo</div>
                    )}
                </main>
            </div>
        </UseMainPageContext.Provider>
    )
}