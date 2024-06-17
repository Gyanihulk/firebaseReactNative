/* eslint-disable prettier/prettier */
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
async function onGoogleButtonPress() {
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userCredential = await auth().signInWithCredential(googleCredential);

    // Get the user data from the userCredential object
    const user = userCredential.user;

    // Log the user's details
    console.log('User details:', user);
    const userDoc = await firestore().collection('users').doc(user.uid).get();

    if (!userDoc.exists) {
      // User does not exist, create a new user object in Firestore
      await firestore().collection('users').doc(user.uid).set({
        uid: user.uid,
        email: user.email,
        // Add any additional user data here
      });
      console.log('New user created in Firestore');
    } else {
      console.log('User already exists in Firestore');
    }

    // Return the user data
    return user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error; // You can throw the error to handle it in the calling function
  }
}
export default onGoogleButtonPress;
