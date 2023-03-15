import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useDispatch } from "react-redux";
import './sign-in-form.styles.scss';
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";


const defaultFormFields ={
    email: '',
    password:'',
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    };

    const logGoogleUser = async () => {
        dispatch(googleSignInStart());
    }

    const resetFormField = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            dispatch(emailSignInStart(email, password))
            resetFormField();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password': 
                    alert('Incorrect pass for email!');  
                    break;
                case 'auth/user-not-found': 
                    alert('User not found!');  
                    break;
                default: 
                    console.log(error.code);
            }

        }
    }

    return (
        <div className="sign-up-container">
            <h1>I alredy have an account</h1>
            <h2>Sign in with your email and password</h2>
            
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" type="email" onChange={handleChange} name='email' value={email} required />
                <FormInput label="Password" type="password" onChange={handleChange} name='password' value={password} required />

                <div className="buttons-container">
                    <Button type="submit">Sign in</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={logGoogleUser}>
                        GOOGLE SIGN IN
                    </Button>
                </div>
                
            </form>


        </div>
    )
}

export default SignInForm