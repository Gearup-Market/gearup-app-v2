import styles from "./ChartLoader.module.scss"
const ChartLoader = () => {
  return (
    <div className={styles.preloader}>
        <div className={styles.loader}></div>
    </div>
  )
}

export default ChartLoader