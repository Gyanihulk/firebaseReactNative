/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
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
import {useDispatch} from 'react-redux';
import {saveProfileDetails} from '../redux/slices/profileDetails';
const {width: screenWidth} = Dimensions.get('window');
import {Tab, TabView} from '@rneui/themed';
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
  const [index, setIndex] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [classPreferences, setClassPreferences] = useState([]);
  const [isSubjectModalVisible, setIsSubjectModalVisible] = useState(false);
  const [isClassModalVisible, setIsClassModalVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Function to handle form submission
  const handleSubmit = () => {
    // Determine the role based on the index
    const role = index === 0 ? 'teacher' : 'student';

    // Create the profile data object
    let profileData = {
      role, // Add the role to the profile data
      location,
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

    // Dispatch the saveProfileDetails action with the profile data
    dispatch(saveProfileDetails(profileData));
  };
  const educationLevels = [
    {label: '1st - 5th Standard', value: '1-5'},
    {label: '6th - 8th Standard', value: '6-8'},
    {label: '9th - 10th Standard', value: '9-10'},
    {label: '11th - 12th Standard', value: '11-12'},
    {label: 'Graduation', value: 'graduation'},
    {label: 'Post Graduation', value: 'post-graduation'},
    // Add more options as needed
  ];

  const tutoringGoals = [
    {label: 'Improve Grades', value: 'improve-grades'},
    {label: 'Prepare for Exams', value: 'prepare-exams'},
    {label: 'Understand Subject Matter', value: 'understand-subject'},
    {label: 'Homework Assistance', value: 'homework-assistance'},
    {label: 'Competitive Exam Preparation', value: 'competitive-exam'},
    // Add more options as needed
  ];
  const learningStyles = [
    {label: 'Visual (Spatial)', value: 'visual'},
    {label: 'Auditory (Aural)', value: 'auditory'},
    {label: 'Kinesthetic (Physical)', value: 'kinesthetic'},
    {label: 'Verbal (Linguistic)', value: 'verbal'},
    {label: 'Logical (Mathematical)', value: 'logical'},
    // Add more options as needed
  ];

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const toggleDay = day => {
    setSelectedDays(prevDays =>
      prevDays.includes(day)
        ? prevDays.filter(d => d !== day)
        : [...prevDays, day],
    );
  };
  const experienceOptions = [
    {label: 'Less than 1 year', value: 'less_than_1'},
    {label: '1-3 years', value: '1-3_years'},
    {label: '3-5 years', value: '3-5_years'},
    {label: '5-10 years', value: '5-10_years'},
    {label: 'More than 10 years', value: 'more_than_10'},
  ];
  const qualificationsOptions = [
    {label: 'B.Ed (Bachelor of Education)', value: 'bed'},
    {label: 'M.Ed (Master of Education)', value: 'med'},
    {label: 'Ph.D. in Education', value: 'phd_education'},
    {
      label: 'Subject-specific degree (e.g., BSc, BA)',
      value: 'subject_specific_degree',
    },
    {label: 'Teaching certification', value: 'teaching_certification'},
    {label: 'B.Tech (Bachelor of Technology)', value: 'btech'},
    {label: 'M.Tech (Master of Technology)', value: 'mtech'},
    {label: 'MSc (Master of Science)', value: 'msc'},
    {label: 'MA (Master of Arts)', value: 'ma'},
    {label: 'Diploma in Education', value: 'diploma_education'},
    // Add other qualifications as needed
  ];

  const subjectsOptions = [
    {label: 'Mathematics', value: 'mathematics'},
    {label: 'Physics', value: 'physics'},
    {label: 'Chemistry', value: 'chemistry'},
    {label: 'Biology', value: 'biology'},
    {label: 'Science', value: 'general_science'},
    {label: 'Social Studies', value: 'social_studies'},
    {label: 'History', value: 'history'},
    {label: 'Geography', value: 'geography'},
    {label: 'Political Science', value: 'political_science'},
    {label: 'Economics', value: 'economics'},
    {label: 'Languages (e.g., English, Hindi, etc.)', value: 'languages'},
    {label: 'Computer Science', value: 'computer_science'},
    {label: 'Information Technology', value: 'information_technology'},
    {label: 'Mechanical Engineering', value: 'mechanical_engineering'},
    {label: 'Electrical Engineering', value: 'electrical_engineering'},
    {label: 'Civil Engineering', value: 'civil_engineering'},
    {
      label: 'Electronics and Communication',
      value: 'electronics_communication',
    },
    {label: 'Physical Education', value: 'physical_education'},
    {label: 'Arts', value: 'arts'},
    {label: 'Music', value: 'music'},
    // Add other subjects as needed
  ];

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
                <View className="form space-y-2 pb-6">
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
