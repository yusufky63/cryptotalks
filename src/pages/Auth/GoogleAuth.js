import React from "react";
import auth from "@react-native-firebase/auth";
import {GoogleSignin} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "32804738865-flocrkct11b8c5oebkuk4t7rc0bsce4u.apps.googleusercontent.com",
});

export const GoogleAuth = async () => {
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  const {idToken} = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  return auth().signInWithCredential(googleCredential);
};
