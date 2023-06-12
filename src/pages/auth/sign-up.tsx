export {};
// // Configure FirebaseUI.
// import {GoogleAuthProvider, FacebookAuthProvider, EmailAuthProvider,} from "firebase/auth";
// import firebase from "firebase/app";
// import {StyledFirebaseAuth} from "react-firebaseui";
// import {fireAuth} from "@utils/firebase";
// import {useEffect, useState} from "react";
//
//
// const FireUiConfig: firebaseui.auth.Config = {
//     // Popup signin flow rather than redirect flow.
//     signInFlow: 'popup',
//     // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//     signInSuccessUrl: '/auth/sign-in/success',
//     // We will display Google and Facebook as auth providers.
//     signInOptions: [
//         GoogleAuthProvider.PROVIDER_ID,
//         FacebookAuthProvider.PROVIDER_ID,
//         EmailAuthProvider.PROVIDER_ID,
//     ],
// };
//
// export const SignInPage = () => {
//
//     const [uiConfig,setUiConfig]  = useState<any>(null);
//
//     useEffect(() => {
//         const t = setTimeout(()=>setUiConfig(FireUiConfig),3000)
//
//     }, []);
//
//     return (
//
//     )
// }
//
// SignInPage.route = ("/auth/sign-in")
// SignInPage.path = ({params: {}}: any) => SignInPage.route
