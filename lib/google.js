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

    const userDoc = await firestore().collection('users').doc(user.uid).get();

    if (!userDoc.exists) {
      // User does not exist, create a new user object in Firestore
      await firestore().collection('users').doc(user.uid).set({
        uid: user.uid,
        email: user.email,
        // Add any additional user data here
      });
      await firestore()
        .collection('profiledetails')
        .doc(user.uid)
        .set({
          uid: user.uid,
          name: user.displayName || '', // Use the displayName or an empty string as fallback
          photoURL: user.photoURL || '', // Use the photoURL or an empty string as fallback
          // Add any additional profile data here
        });
      console.log('New user created in Firestore');
    } else {
      const profileDoc = await firestore()
        .collection('profiledetails')
        .doc(user.uid)
        .get();
      if (!profileDoc.data().photoURL) {
        await firestore()
          .collection('profiledetails')
          .doc(user.uid)
          .update({
            photoURL: user.photoURL || '', // Use the photoURL or an empty string as fallback
          });
        console.log('Profile details updated with photoURL in Firestore');
      }
      if (!profileDoc.data().name) {
        await firestore()
          .collection('profiledetails')
          .doc(user.uid)
          .update({
            name: user.displayName || '', // Use the photoURL or an empty string as fallback
          });
        console.log('Profile details updated with photoURL in Firestore');
      }
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
