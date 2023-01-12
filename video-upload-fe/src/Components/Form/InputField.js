import styles from "./index.module.css";

const InputField = (props) => 
<div className={styles.field}>
      <div className={styles.inputField}>
            {props.children}
      </div>
</div>

export default InputField;