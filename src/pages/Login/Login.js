import React from 'react';

/* CSS Imports */
import './Login.css';

/* Firebase Imports */
import { signInWithPopup } from 'firebase/auth';
import { firebaseAuth, firebaseAuthProvider } from 'services/Firebase/FirebaseAuth';

function Login() {

    /* Functions */
    const signin = () => {
        signInWithPopup(firebaseAuth, firebaseAuthProvider.google)
            .catch(err => {
                console.log(err.message);
            })
    };

    return (
        <section className='login'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS99EK4TDm1RQDiNDF6O6vClD6kN1-ERH4RdsIjvBxGipdvLFXFYbBgitZVwI5vjLjW0A&usqp=CAU' alt='' />
            <ul className='login_buttons'>
                <li id='google' onClick={() => signin()}>Login with Google</li>
            </ul>
        </section>
    );
}

export default Login;