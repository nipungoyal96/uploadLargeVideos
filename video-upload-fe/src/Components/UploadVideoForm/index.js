import { useState } from "react";
import { useDispatch } from 'react-redux';

import UploadFile from "../UploadFIle";
import styles from "./index.module.css";
import { createSession } from '../../store/actions/uploadFIles';
import { setFormValuesAction } from "../../store/actions/form";
import Form from "../Form/index.js";
import InputField from "../Form/InputField"
import { useHistory } from "react-router-dom";



const UploadVideoForm = () => {
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrrorMessage] = useState('')
    const [formValues, setFormValues] = useState({
        loginId: '',
        email: '',
        phoneNo: '',
        files: []
    })
    const history = useHistory();
    
    const redirectToProgress = () => {
        history.push('/progress')
    }


    const dispatch = useDispatch();

    const setFormField = (value, type) => {
        if(isError) {
            setErrrorMessage('');
            setIsError(false);
        }
        const newFormValues = {...formValues};
        newFormValues[type] = value;
        setFormValues(newFormValues);
    }

    const submitForm = (e) => {
        e.preventDefault();
        let isError = false;
        let errorMessage = ''
        if(formValues.loginId === '') {
            isError = true;
            errorMessage = "Please enter valid loginId";
        } else if (!(formValues.email.includes('@') && formValues.email.includes('.'))) {
            isError = true;
            errorMessage = "Please enter valid email";
        } else if(formValues.phoneNo.length !== 10 ) {
            isError = true;
            errorMessage = "Please enter valid phone No";
        } else if(formValues.files.length === 0 ) {
            isError = true;
            errorMessage = "Please select Files";
        }

        setErrrorMessage(errorMessage);
        setIsError(isError);
        if(!isError){
             dispatch(setFormValuesAction(formValues))
             dispatch(createSession(redirectToProgress))
        }
    }

    return (
        <Form title="Upload Videos" submitForm={submitForm}>
                    <InputField >
                        <input type="number" onChange={(e) => setFormField(e.target.value, 'loginId')} value={formValues.loginId} placeholder="Enter login id" className={styles.input} />
                    </InputField>
                    <InputField >
                        <input type="email" onChange={(e) => setFormField(e.target.value, 'email')} value={formValues.email} placeholder="Enter email id" className={styles.input} />
                    </InputField>
                    <InputField >
                        <input type="phoneNo" onChange={(e) => setFormField(e.target.value, 'phoneNo')}  value={formValues.phoneNo} placeholder="Enter Phone NO" className={styles.input} />
                    </InputField>
                    <InputField>
                        <UploadFile isMultiple setFormField = {setFormField}/>
                    </InputField>
                    {isError && <InputField>
                    <span className={styles.error}>
                        <p className="error-text">{errorMessage}</p>
                        </span>
                    </InputField>}
                    <InputField>
                        <button onClick={submitForm}  className={`${styles.inputField} ${styles.submitBtn}`} type="submit"> Submit </button>
                    </InputField>

            </Form>
    )
} 

export default UploadVideoForm;