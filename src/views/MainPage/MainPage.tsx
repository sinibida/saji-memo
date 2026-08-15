import useMainPage from "./useMainPage"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Loading from "./components/Loading"
import UseMainPageContext from "./UseMainPageContext"
import styles from "./MainPage.module.css"

export default function MainPage() {
    const useMainPageReturn = useMainPage();
    const { selectedMemo, ready } = useMainPageReturn;

    if (!ready) return <Loading />

    return (
        <UseMainPageContext.Provider value={useMainPageReturn}>
            <div className={styles.container}>
                <Sidebar />
                <main className={styles.editorArea}>
                    {selectedMemo ? (
                        <Editor key={selectedMemo.id}/>
                    ) : (
                        <div className={styles.empty}>메모를 선택하거나 생성하세요</div>
                    )}
                </main>
            </div>
        </UseMainPageContext.Provider>
    )
}