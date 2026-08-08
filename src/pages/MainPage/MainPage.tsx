import useMainPage from "./useMainPage"
import Sidebar from "./Sidebar"
import Editor from "./Editor"
import Loading from "./Loading"
import UseMainPageContext from "./UseMainPageContext"
import styles from "./MainPage.module.css"

export default function MainPage() {
    const useMainPageReturn = useMainPage();
    const { memos, selectedId, ready } = useMainPageReturn;

    if (!ready) return <Loading />

    const selectedMemo = memos.find(m => m.id === selectedId) ?? null

    return (
        <UseMainPageContext.Provider value={useMainPageReturn}>
            <div className={styles.container}>
                <Sidebar />
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