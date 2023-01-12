import styles from './index.module.css'
import { useSelector } from 'react-redux';

const Loader = () => {
    const isLoading =  useSelector((state) => state.genral?.isLoading);

    return <>{isLoading && <div className={styles.loaderContainer}>
        <div className={styles.loader}>
        </div>
    </div>}</>
}

export default Loader;