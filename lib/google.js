/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(googleCredential);
      
      // Get the user data from the userCredential object
      const user = userCredential.user;
      
      // Log the user's details
      console.log('User details:', user);
      
      // Return the user data
      return user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error; // You can throw the error to handle it in the calling function
    }
  }
export default onGoogleButtonPress;
