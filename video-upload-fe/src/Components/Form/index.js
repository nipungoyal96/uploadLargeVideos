import { useHistory, useLocation } from "react-router-dom";
import styles from "./index.module.css";

const Form = ({ title, submitForm, children }) => {
    const history = useHistory();
    const location = useLocation();

    return(<div className={styles.uploadForm}>
    <div className={styles.container}>
        <div className={styles.tabs}>        
            <input className={styles.tabsInput} onChange = {(e) => {e.preventDefault()}} id="tab1" type="radio" name="tabs" checked = {location.pathname === '/' || location.pathname === '/progress'} />
            <label onClick={() => history.push('/')}  className={styles.tabsLabel} >Upload</label>

            <input className={styles.tabsInput} id="tab2" onChange = {(e) => {e.preventDefault()}} type="radio" name="tabs" checked = {location.pathname === '/videos'} />
            <label onClick={() => history.push('/videos')}  className={styles.tabsLabel}>Download</label>
        </div>

        <h3 className={styles.heading}>{title}</h3>
        <form onSubmit={submitForm} action="#">{children}</form>
    </div>
</div>)}

export default Form;