import styles from './CreativeHiring.module.scss'
import { GetHiredAlert } from './components'

interface Props {
    onClose: () => void
}

const CreativeHiring = ({ onClose }: Props) => {

    return (
        <div className={styles.container}>
            <GetHiredAlert onCloseAlert={onClose} />
        </div>
    )
}

export default CreativeHiring