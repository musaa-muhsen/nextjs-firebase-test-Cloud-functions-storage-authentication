//this is going to wrap everything in our app in an auth context and use that to handle all authentication throughout the whole entire app 
import React, {useState, useEffect, useContext, createContext} from 'react';
import nookies from 'nookies';
import firebaseClient from './firebaseClient';
import firebase from 'firebase/app';
import 'firebase/auth';


const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    firebaseClient();
    const [user, setUser] = useState(null);

    // useEffect is going to handle the actual part where we check to if the id toek has changed  
    useEffect(() => {
        return firebase.auth().onIdTokenChanged(async (user) => {
            //if there isnt a user 
            if(!user) {
                setUser(null);
                nookies.set(undefined, "token",  "", {}) 
                return;
            }
            const token = await user.getIdToken();
            setUser(user);
            nookies.set(undefined, "token" , token, {});
        }) 
    }, []);

    return (
    <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>
    );
    
}

export const useAuth = () => useContext(AuthContext);