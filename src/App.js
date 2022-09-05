import React, { useEffect } from 'react';

/* CSS Imports */
import './App.css';

/* Component Imports */
import Sidebar from 'components/Sidebar/Sidebar';
import Chat from 'components/Chat/Chat';

/* Page Imports */
import Login from 'pages/Login/Login';

/* Redux Imports */
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'app/slices/userSlice';
import { login, logout } from 'app/slices/userSlice';

/* Firebase Imports */
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from 'services/Firebase/FirebaseAuth';

function App() {

    /* Redux */
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    /* useEffect */
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (auth) => {
            if (auth) {
                dispatch(
                    login({
                        accessToken: auth.accessToken,
                        uid: auth.uid,
                        displayName: auth.displayName,
                        email: auth.email,
                        photoURL: auth.photoURL
                    })
                );
            } else {
                dispatch(logout());
            }
        });
    }, [dispatch]);

    return (
        <main className='app'>
            {user ? (
                <>
                    <Sidebar />
                    <Chat />
                </>
            ) : (
                <Login />
            )
            }
        </main>
    );
}

export default App;