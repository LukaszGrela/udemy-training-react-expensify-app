import { firebase, googleAuthProvider } from "../firebase/firebase";
export const LOGIN = 'gd:LOGIN';
export const login = (uid) => ({
    type:LOGIN,
    uid
});
export const startLogin = () => {
    return () => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const LOGOUT = 'gd:LOGOUT';
export const logout = () => ({
    type:LOGOUT
});
export const startLogout = () => {
    return () => {
        return firebase.auth().signOut();
    };
};