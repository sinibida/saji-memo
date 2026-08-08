import styles from "./MainPage.module.css"

export default function Loading() {
    return (
        <div className={styles.loading}>
            <div className={styles.loadingBox}>
                <div className={styles.spinner} />
                <div>Loading...</div>
            </div>
        </div>
    )
}
