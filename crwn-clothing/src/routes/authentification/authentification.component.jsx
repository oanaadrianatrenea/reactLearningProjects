// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';
import './authentification.styles.scss';

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

const Authentification = () => {
    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await getRedirectResult(auth);
            
    //         if(response){
    //             const userDocRef = await createUserDocumentFromAuth(response.user);
    //         }
    //     }
    //       fetchData();
    // }, []);



    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />

            {/* <button onClick={signInWithGoogleRedirect}>
                Sign in with google redirect
            </button> */}
        </div>
    );
}

export default Authentification