/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../theme/colors';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchProfileDetails,
  saveProfileDetails,
} from '../redux/slices/profileDetails';
import {launchImageLibrary} from 'react-native-image-picker';

const {width: screenWidth} = Dimensions.get('window');
import {Tab, TabView} from '@rneui/themed';
import {setIsAuthenticated, updateProfileImage} from '../redux/slices/user';
import {
  days,
  educationLevels,
  experienceOptions,
  learningStyles,
  qualificationsOptions,
  subjectsOptions,
  tutoringGoals,
} from '../data/Constants';
const UserOnboarding = () => {
  const [subjectsOfInterest, setSubjectsOfInterest] = useState('');
  const [currentEducationLevel, setCurrentEducationLevel] = useState('');
  const [goalsForTutoring, setGoalsForTutoring] = useState('');
  const [preferredLearningStyle, setPreferredLearningStyle] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [teachingExperience, setTeachingExperience] = useState('');
  const [teachingQualifications, setTeachingQualifications] = useState('');
  const [location, setLocation] = useState('');
  const [name, setName] = useState('');
  const [index, setIndex] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [classPreferences, setClassPreferences] = useState([]);
  const [isSubjectModalVisible, setIsSubjectModalVisible] = useState(false);
  const [isClassModalVisible, setIsClassModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    data: profileDetails,
    status,
    error,
  } = useSelector(state => state.profileDetails);
  // Function to handle form submission

  useEffect(() => {
    // Check if profileDetails is not null or undefined
    if (profileDetails) {
      console.log('Profile details available', profileDetails);
      setName(profileDetails.name || '');
      setProfileImage(profileDetails.photoURL || null);
      setLocation(profileDetails.location || '');
      setTeachingExperience(profileDetails.teachingExperience || '');
      setTeachingQualifications(profileDetails.teachingQualifications || '');
      setSelectedSubjects(profileDetails.subjectsTaught || []);
      setClassPreferences(profileDetails.classPreferences || []);
      setSubjectsOfInterest(profileDetails.subjectsOfInterest || '');
      setCurrentEducationLevel(profileDetails.currentEducationLevel || '');
      setGoalsForTutoring(profileDetails.goalsForTutoring || '');
      setPreferredLearningStyle(profileDetails.preferredLearningStyle || '');
      setSelectedDays(profileDetails.availability?.days || []);
    } else {
      console.log('Fetching profile info');
      dispatch(fetchProfileDetails());
    }
  }, [dispatch, profileDetails]);
  const handleSubmit = () => {
    // Determine the role based on the index
    const role = index === 0 ? 'teacher' : 'student';

    // Create the profile data object with common fields
    let profileData = {
      name: name,
      role, // Add the role to the profile data
      location,
      photoURL: profileImage, // Include the profile image URL
    };

    // Include additional fields based on the role
    if (role === 'teacher') {
      profileData = {
        ...profileData,
        teachingExperience,
        teachingQualifications,
        subjectsTaught: selectedSubjects,
        classPreferences,
      };
    } else {
      profileData = {
        ...profileData,
        subjectsOfInterest,
        currentEducationLevel,
        goalsForTutoring,
        preferredLearningStyle,
        availability: {
          days: selectedDays,
        },
      };
    }
    console.log(profileData, 'updating this');
    // Dispatch the saveProfileDetails action with the profile data
    dispatch(saveProfileDetails(profileData))
      .then(() => {
        // Set authentication state and fetch profile details only after saving is successful
        dispatch(setIsAuthenticated(true));
        dispatch(fetchProfileDetails());
        // Navigate to the 'Home' screen
        navigation.navigate('Home');
      })
      .catch(error => {
        console.error('Failed to save profile details:', error);
        // Handle any errors here, such as displaying an error message to the user
      });
  };
  const handleSelectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = {uri: response.assets[0].uri};

        setProfileImage(source.uri);

        // Dispatch the action to update the profile image
        dispatch(updateProfileImage({imageUri: source.uri}));
      }
    });
  };

  const toggleDay = day => {
    setSelectedDays(prevDays =>
      prevDays.includes(day)
        ? prevDays.filter(d => d !== day)
        : [...prevDays, day],
    );
  };

  const handleSubjectSelection = value => {
    setSelectedSubjects(prevSubjects =>
      prevSubjects.includes(value)
        ? prevSubjects.filter(subject => subject !== value)
        : [...prevSubjects, value],
    );
  };

  const handleClassPreferenceSelection = value => {
    setClassPreferences(prevPreferences =>
      prevPreferences.includes(value)
        ? prevPreferences.filter(pref => pref !== value)
        : [...prevPreferences, value],
    );
  };
  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{backgroundColor: colors.bg}}>
      <View className="flex-row justify-start">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-3 left-2 z-10 bg-yellow-400 p-2 rounded-bl-2xl">
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View className=" bg-white">
          <Tab
            value={index}
            onChange={e => setIndex(e)}
            // eslint-disable-next-line react-native/no-inline-styles
            indicatorStyle={{
              backgroundColor: 'black',
              height: 5,
            }}
            className=""
            variant="primary">
            <Tab.Item
              title="Teacher"
              icon={{name: 'school', type: 'ionicon', color: 'white'}}
            />
            <Tab.Item
              title="Student"
              icon={{name: 'book', type: 'ionicon', color: 'white'}}
            />
          </Tab>
        </View>

        <View className="flex-1 bg-white px-8">
          <TabView value={index} onChange={setIndex} dense>
            <TabView.Item style={{width: '100%'}}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps="handled">
                <View className="form space-y-2 pb-6 pt-3">
                  <View className="flex items-center justify-center mt-4">
                    <TouchableOpacity
                      className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center"
                      onPress={handleSelectImage} // Function to handle image selection
                    >
                      {profileImage ? (
                        <Image
                          source={{uri: profileImage}}
                          className="w-full h-full rounded-full"
                        />
                      ) : (
                        <Text className="text-gray-700 text-xl">+</Text>
                      )}
                    </TouchableOpacity>
                    <Text className="text-gray-700 mt-2">
                      Tap to Change Profile Picture
                    </Text>
                  </View>
                  <Text className="text-gray-700 ml-4">Name</Text>
                  <TextInput
                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-5"
                    placeholder="Enter your Name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#4B5563"
                  />
                  <Text className="text-gray-700 ml-4">
                    Teaching Experience
                  </Text>
                  <View className="bg-gray-100 rounded-2xl mb-3">
                    <Picker
                      selectedValue={teachingExperience}
                      onValueChange={itemValue =>
                        setTeachingExperience(itemValue)
                      }
                      dropdownIconColor="#4B5563">
                      {experienceOptions.map((option, index) => (
                        <Picker.Item
                          key={index}
                          label={option.label}
                          value={option.value}
                          color="black"
                        />
                      ))}
                    </Picker>
                  </View>

                  <Text className="text-gray-700 ml-4">
                    Preferred Subjects for Teaching.
                  </Text>
                  <TouchableOpacity
                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                    onPress={() => setIsSubjectModalVisible(true)} // Open the subjects modal
                  >
                    <Text className="text-gray-700">
                      {selectedSubjects.length > 0
                        ? selectedSubjects.join(', ')
                        : 'Select Subjects'}
                    </Text>
                  </TouchableOpacity>

                  <Text className="text-gray-700 ml-4">Class Preferences</Text>
                  <TouchableOpacity
                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                    onPress={() => setIsClassModalVisible(true)} // Open the class preferences modal
                  >
                    <Text className="text-gray-700">
                      {classPreferences.length > 0
                        ? classPreferences.join(', ')
                        : 'Select Class Preferences'}
                    </Text>
                  </TouchableOpacity>

                  <Text className="text-gray-700 ml-4">
                    Teaching Qualifications
                  </Text>
                  <View className="bg-gray-100 rounded-2xl mb-3">
                    <Picker
                      selectedValue={teachingQualifications}
                      onValueChange={itemValue =>
                        setTeachingQualifications(itemValue)
                      }
                      dropdownIconColor="#4B5563">
                      {qualificationsOptions.map((option, index) => (
                        <Picker.Item
                          key={index}
                          label={option.label}
                          value={option.value}
                          color="black"
                        />
                      ))}
                    </Picker>
                  </View>

                  <Text className="text-gray-700 ml-4">
                    Preferred Days for Teaching.
                  </Text>
                  <TouchableOpacity
                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                    onPress={() => setModalVisible(true)}>
                    <Text className="text-gray-700">
                      {selectedDays.length > 0
                        ? selectedDays.join(', ')
                        : 'Select Days'}
                    </Text>
                  </TouchableOpacity>

                  <Text className="text-gray-700 ml-4">Location</Text>
                  <TextInput
                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-5"
                    placeholder="Enter your Location"
                    value={location}
                    onChangeText={setLocation}
                    placeholderTextColor="#4B5563"
                  />

                  <TouchableOpacity
                    className="py-3 bg-yellow-400 rounded-xl"
                    onPress={handleSubmit}>
                    <Text className="font-xl font-bold text-center text-gray-700">
                      Save Profile
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </TabView.Item>
            <TabView.Item style={{width: '100%', paddingHorizontal: 15}}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps="handled">
                <View className="form space-y-2 pb-6 pt-3">
                  <View className="flex items-center justify-center mt-4">
                    <TouchableOpacity
                      className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center"
                      onPress={handleSelectImage} // Function to handle image selection
                    >
                      {profileImage ? (
                        <Image
                          source={{uri: profileImage}}
                          className="w-full h-full rounded-full"
                        />
                      ) : (
                        <Text className="text-gray-700 text-xl">+</Text>
                      )}
                    </TouchableOpacity>
                    <Text className="text-gray-700 mt-2">
                      Tap to Change Profile Picture
                    </Text>
                  </View>
                  <Text className="text-gray-700 ml-4">Name</Text>
                  <TextInput
                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-5"
                    placeholder="Enter your Name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor="#4B5563"
                  />
                  <Text className="text-gray-700 ml-4 pt-3 ">
                    Current Education Level
                  </Text>
                  <View className="bg-gray-100 rounded-2xl mb-3">
                    <Picker
                      selectedValue={currentEducationLevel}
                      onValueChange={(itemValue, itemIndex) =>
                        setCurrentEducationLevel(itemValue)
                      }
                      dropdownIconColor="#4B5563"
                      itemStyle={{backgroundColor: colors.bg, color: 'white'}} // This sets the color for each item
                    >
                      {educationLevels.map((level, index) => (
                        <Picker.Item
                          key={index}
                          label={level.label}
                          value={level.value}
                          color="black"
                        />
                      ))}
                    </Picker>
                  </View>

                  <Text className="text-gray-700 ml-4">Goals for Tutoring</Text>
                  <View className="bg-gray-100 rounded-2xl mb-3">
                    <Picker
                      selectedValue={goalsForTutoring}
                      onValueChange={(itemValue, itemIndex) =>
                        setGoalsForTutoring(itemValue)
                      }
                      dropdownIconColor="#4B5563"
                      //   itemStyle={{ backgroundColor: colors.bg, color: "white" }} // This sets the color for each item
                    >
                      {tutoringGoals.map((level, index) => (
                        <Picker.Item
                          key={index}
                          label={level.label}
                          value={level.value}
                          color="black"
                        />
                      ))}
                    </Picker>
                  </View>
                  <Text className="text-gray-700 ml-4">
                    Preferred Learning Style
                  </Text>
                  <View className="bg-gray-100 rounded-2xl mb-3">
                    <Picker
                      selectedValue={preferredLearningStyle}
                      onValueChange={(itemValue, itemIndex) =>
                        setPreferredLearningStyle(itemValue)
                      }
                      dropdownIconColor="#4B5563"
                      //   itemStyle={{ backgroundColor: colors.bg, color: "white" }} // This sets the color for each item
                    >
                      {learningStyles.map((level, index) => (
                        <Picker.Item
                          key={index}
                          label={level.label}
                          value={level.value}
                          color="black"
                        />
                      ))}
                    </Picker>
                  </View>
                  <Text className="text-gray-700 ml-4">
                    Preferred Days for learning.
                  </Text>
                  <TouchableOpacity
                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                    onPress={() => setModalVisible(true)}>
                    <Text className="text-gray-700">
                      {selectedDays.length > 0
                        ? selectedDays.join(', ')
                        : 'Select Days'}
                    </Text>
                  </TouchableOpacity>
                  <Text className="text-gray-700 ml-4">
                    Subjects of Interest
                  </Text>
                  <TextInput
                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                    placeholder="Enter subjects"
                    value={subjectsOfInterest}
                    onChangeText={setSubjectsOfInterest}
                    placeholderTextColor="#4B5563"
                  />
                  <Text className="text-gray-700 ml-4">Location</Text>
                  <TextInput
                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-5"
                    placeholder="Enter your Location"
                    value={location}
                    onChangeText={setLocation}
                    placeholderTextColor="#4B5563"
                  />

                  <TouchableOpacity
                    className="py-3 bg-yellow-400 rounded-xl"
                    onPress={handleSubmit}>
                    <Text className="font-xl font-bold text-center text-gray-700">
                      Save Profile
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </TabView.Item>
          </TabView>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View className="flex-1 justify-center items-center px-4">
          <View className="bg-white rounded-2xl p-6 w-full max-w-md">
            <Text className="text-gray-700 text-lg font-semibold mb-4">
              Select Preferred Days
            </Text>
            {days.map((day, index) => (
              <TouchableOpacity
                key={index}
                className={`p-2 my-1 ${
                  selectedDays.includes(day) ? 'bg-yellow-400' : 'bg-gray-100'
                } rounded-xl`}
                onPress={() => toggleDay(day)}>
                <Text className="text-gray-700">
                  {selectedDays.includes(day) ? '✓ ' : ''}
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              className="bg-yellow-400 mt-4 rounded-xl py-2"
              onPress={() => setModalVisible(!modalVisible)}>
              <Text className="text-center text-gray-700 font-semibold">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSubjectModalVisible}
        onRequestClose={() => setIsSubjectModalVisible(false)}>
        <View className="flex-1 justify-center items-center px-4">
          <View className="bg-white rounded-2xl p-6 w-full max-w-md">
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              keyboardShouldPersistTaps="handled">
              <Text className="text-gray-700 text-lg font-semibold mb-4">
                Select Subjects Taught
              </Text>
              {subjectsOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  className={`p-2 my-1 ${
                    selectedSubjects.includes(option.value)
                      ? 'bg-yellow-400'
                      : 'bg-gray-100'
                  } rounded-xl`}
                  onPress={() => handleSubjectSelection(option.value)}>
                  <Text className="text-gray-700">
                    {selectedSubjects.includes(option.value) ? '✓ ' : ''}
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                className="bg-yellow-400 mt-4 rounded-xl py-2"
                onPress={() => setIsSubjectModalVisible(false)}>
                <Text className="text-center text-gray-700 font-semibold">
                  Close
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal for selecting class preferences */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isClassModalVisible}
        onRequestClose={() => setIsClassModalVisible(false)}>
        <View className="flex-1 justify-center items-center px-4">
          <View className="bg-white rounded-2xl p-6 w-full max-w-md">
            <Text className="text-gray-700 text-lg font-semibold mb-4">
              Select Class Preferences
            </Text>
            {educationLevels.map((classRange, index) => (
              <TouchableOpacity
                key={index}
                className={`p-2 my-1 ${
                  classPreferences.includes(classRange.value)
                    ? 'bg-yellow-400'
                    : 'bg-gray-100'
                } rounded-xl`}
                onPress={() =>
                  handleClassPreferenceSelection(classRange.value)
                }>
                <Text className="text-gray-700">
                  {classPreferences.includes(classRange.value) ? '✓ ' : ''}
                  {classRange.label}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              className="bg-yellow-400 mt-4 rounded-xl py-2"
              onPress={() => setIsClassModalVisible(false)}>
              <Text className="text-center text-gray-700 font-semibold">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default UserOnboarding;
