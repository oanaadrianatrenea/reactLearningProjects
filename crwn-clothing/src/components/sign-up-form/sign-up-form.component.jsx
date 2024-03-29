import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from "../form-input/form-input.component";
import './sign-up-form.styles.scss';
import Button from "../button/button.component";
import { signUpStart } from "../../store/user/user.action";

const defaultFormFields ={
    displayName: '',
    email: '',
    password:'',
    confirmPassword: ''
}

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    // const { setCurrentUser } = useContext(UserContext);

    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formFields.password !== formFields.confirmPassword ){
           alert("passwords do not match!");
           return;
        }

        try{
            dispatch(signUpStart(email, password, displayName));
            resetFormField();

        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Cannot create user. Email already in use');
            }else{
                console.log('user creation encountered an error', error);
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email or password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display name" type="text" onChange={handleChange} name='displayName' value={displayName} required />

                <FormInput label="Email" type="email" onChange={handleChange} name='email' value={email} required />

                <FormInput label="Password" type="password" onChange={handleChange} name='password' value={password} required />

                <FormInput label="Confirm password" type="password" onChange={handleChange} name='confirmPassword' value={confirmPassword} required />

                <Button type="submit">Sign up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;