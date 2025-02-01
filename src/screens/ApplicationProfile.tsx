import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform , TouchableOpacity, Image} from 'react-native';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { baseUrl, token } from '../constant';
import axios from 'axios';
import { setGlobalUserID, getGlobalUserID } from '../api/global';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'; // For formatting
import { getCity,getState } from '../api/auth';
interface StateType {
 Id: string;
 Name: string;
}
interface CityType {
  Id: string;
  Name: string;
}

const ApplicationProfile = () => {
  const [currentSection, setCurrentSection] = useState('personalSection');
  const [gender, setGender] = useState('');
  const [MobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [dietPreference, setDietPreference] = useState(''); // Added state for diet preference
  const [drinking, setDrinking] = useState(''); // Added state for drinking
  const [smoking, setSmoking] = useState(''); // Added state for smoking
  const [familyType, setFamilyType] = useState<'Nuclear' | 'Joint' | null>(null);
  const [familyValues, setFamilyValues] = useState<string[]>([]);
  const [mangalik, setMangalik] = useState(''); // State for Mangalik
  const [selectedImage, setSelectedImage] = useState<string[]>([]);
  const [propic, setPropic] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastname,setLastname]= useState('');
  const [dob,setDOB]= useState('');
  const [age,setAge]= useState('');
  const [height,setHeight]= useState('');
  const [weight,setWeight]= useState('');
  const [bloodgroup,setBloodGroup]= useState('');
  const [mothertongue,setMotherTongue]= useState('');
  const [religion,setReligion]= useState('');
  const [casteorcommunity,setCasteOrCommunity]= useState('');
  const [subcaste,setSubcaste]= useState('');
  const [gotra,setGotra]= useState('');
  const [placeofbirth,setPlaceOfBirth]= useState('');
  const [timeofbirth,setTimeOfBirth]= useState('');
  const [birthstar,setBirthStar]= useState('');
  const [rashi,setRashi]= useState('');
  const [occupation,setOccupation]= useState('');
  const [joblocation,setJobLocation]= useState('');
  const [company,setCompany]= useState('');
  const [workexperience,setWorkExperience]= useState('');
  const [fathersoccupation,setFathersOccupation]= useState('');
  const [motheroccupation,setMothersOccupation]= useState('');
  const [siblings,setSiblings]= useState('');
  const [hobbiesandinterests,setHobbiesAndInterests]= useState('');
  const [sportsactivities,setSportsActivities]= useState('');
  const [preferredmarriagelocation,setPreferredMarriageLocation]= useState('');
  const [highestqualification,setHighestQualification]= useState('');
  const [instituteoruniversity,setnIstituteOrUniversity]= useState('');
  const [additionalqualifications,setAdditionalQualifications]= useState('');
  const [languagesknown,setLanguagesKnown]= useState('');
  const [address,setAddress]= useState('');
  const [city,setCity]= useState('');
  //const [selectedstate,setSelectedstate]= useState('');
  const [yearOfgraduation,setYearOfGraduation]= useState('');
  const [pincode,setPincode]= useState('');
  const [preferredreligioncaste,setPreferredReligionCaste]= useState('');
  const [preferrededucation,setPreferredEducation]= useState('');
  const [preferredoccupationincome,setPreferredOccupationIncome]= useState('');
  const [preferredlocation,setPreferredLocation]= useState('');
  const [preferredothers,setPreferredOthers]= useState('');
  const [preferredmanglik,setPreferredManglik]= useState('');
  const [preferredheight,setPreferredHeight]= useState('');
  const [preferredagerange,setPreferredAgeRange]= useState('');
  const [annualincome,setAnnualIncome]= useState('');
  const [userID, setUserID]=useState('');
  const [maritalstatus, setMaritalStatus]=useState('');
  const [states, setStates] = useState<{ Id: string; Name: string }[]>([]);
  const [cities, setCities] = useState<{ Id: string; Name: string }[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const showDatePicker = () => {
    setIsPickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsPickerVisible(false);
  };

  const handleConfirm = (time: Date) => {
    const formattedTime = moment(time).format('hh:mm A'); // Format the time to HH:MM AM/PM
    setTimeOfBirth(formattedTime); // Set the time picked from the picker
    hideDatePicker(); // Hide the picker after confirming the time
  };

  const handleInputChange = (text: string) => {
    setTimeOfBirth(text); // Update state with manual input from the user
  };
  
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await getState();
        //console.log("States API Response:", JSON.stringify(response, null, 2));
        const states = response?.data?.data ?? [];
       // if (Array.isArray(states)) {
          setStates(states);
       // } else {
       //   console.error("States response is not an array:", states);
         // setStates([]);  // Default to empty array if not an array
       // }
      } catch (error) {
        console.error("Error fetching states:", error);
        setStates([]);
      }
    };
    fetchStates();
  }, []);
  
  useEffect(() => {
    if (selectedState) {
      console.log("Selected State:", selectedState);
      const fetchCities = async () => {
        try {
          const response = await getCity(selectedState);
         // console.log("Cities API Response:", JSON.stringify(response, null, 2));
          const cities = response?.data?.data ?? [];    
          console.log("Cities:", cities);  
          if (Array.isArray(cities)) {
            setCities(cities);
          } else {
            console.error("Cities response is not an array:", cities);
            setCities([]); 
          }
        } catch (error) {
          console.error("Error fetching cities:", error);
          setCities([]);
        }
      };
      fetchCities();
    } else {
      setCities([]);
    }
  }, [selectedState]);
  // console.log("Cities:", cities);
  
  const handleSave = async () => {
    try {
      const data = {
        UserID : getGlobalUserID(),
        
        FirstName: firstName || "",
        LastName: lastname || "",
        DOB: dob || "",
        Age: age == null ? 0 : parseInt(age),
        Height: height == null ? 0 : parseInt(height),
        Weight: weight == null ? 0 : parseInt(weight),
        BloodGroup: bloodgroup || "",
        Gender: gender || "",
        MotherTongue: mothertongue || "",
        Religion: religion || "",
        CasteOrCommunity: casteorcommunity || "",
        SubCaste: subcaste || "",
        Gotra: gotra || "",
        ManglikStatus: mangalik == null ? "0" : mangalik,
        PlaceOfBirth: placeofbirth || "",
        TimeOfBirth: timeofbirth || "",
        BirthStar: birthstar || "",
        Rashi: rashi || "",
        Profile_Image: propic || "",
        MaritalStatus: maritalstatus || "",
        Occupation: occupation || "",
        Company: company || "",
        AnnualIncome: annualincome == null ? 0 : parseInt(annualincome),
        JobLocation: joblocation || "",
        WorkExperience: workexperience || "",
        FathersOccupation: fathersoccupation || "",
        MothersOccupation: motheroccupation || "",
        Siblings: siblings || "",
        FamilyType: familyType || "",
        FamilyValues: familyValues || "",
        DietPreference: dietPreference || "",
        Drinking: drinking || "",
        Smoking: smoking || "",
        HobbiesAndInterests: hobbiesandinterests || "",
        SportsActivities: sportsactivities || "",
        PreferredMarriageLocation: preferredmarriagelocation || "",
        HighestQualification: highestqualification || "",
        InstituteOrUniversity: instituteoruniversity || "",
        YearOfGraduation: yearOfgraduation || "",
        AdditionalQualifications: additionalqualifications || "",
        LanguagesKnown: languagesknown || "",
        MobileNo: MobileNo || "",
        EmailID: email || "",
        Address: address || "",
        City: city == null ? 0 : parseInt(city),
        State: selectedState == null ? 0 : parseInt(selectedState),
        Pincode: pincode || "",
        PreferredAgeRange: preferredagerange || "",
        PreferredHeight: preferredheight || "",
        PreferredReligionCaste: preferredreligioncaste || "",
        PreferredEducation: preferrededucation || "",
        PreferredOccupationIncome: preferredoccupationincome || "",
        PreferredLocation: preferredlocation || "",
        PreferredOthers: preferredothers || "",
        PreferredManglik: preferredmanglik || "",
        Base64Images: selectedImage || [],
        CreatedBy: userID == null ? 0 : userID,
    };
    console.log("Data to be sent:", data);
    const response = await axios.post(`${baseUrl}/Profile/SaveProfileDetails`,data);
      
    console.log('Data saved successfully!', response.data);
      // Optionally, you can display a success message to the user
    } catch (error:any) {
  console.error('Error saving profile:', error);
  if (error.response) {
    console.error("Server responded with:", error.response.status, error.response.data);
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Axios error:", error.message);
  }
}
  };
  

  const handleFamilyValueChange = (value: string) => {
    setFamilyValues(prevValues => 
      prevValues.includes(value) 
        ? prevValues.filter(item => item !== value) 
        : [...prevValues, value]
    );
  };

// Function to handle multiple image upload
const handleImagePicker = () => {
  launchImageLibrary(
    { mediaType: 'photo', selectionLimit: 5 },
    (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length >= 1) {
        const imageUris: string[] = response.assets.map((asset) => asset.uri as string);
 
        // Ensure total selected images do not exceed 5
        setSelectedImage((prevImages) => {
          if (prevImages.length >= 5) {
            console.log('You have already selected the maximum of 5 photos.');
            return prevImages; // Prevent adding any more images
          }
          const remainingSlots = 5 - prevImages.length; // Calculate how many images can still be added
          const imagesToAdd = imageUris.slice(0, remainingSlots); // Limit to the remaining slots
          return [...prevImages, ...imagesToAdd]; // Update state with allowed images
        });
      } else {
        console.log('No image selected');
      }
    }
  );
};
// Function to delete an image
const handleDeleteImage = (index: number) => {
  // Filter out the image at the specified index without affecting the other images
  const updatedImages = selectedImage.filter((_, i) => i !== index);
  setSelectedImage(updatedImages); // Update the state with the remaining images
};
  
  // Function to handle navigation between sections
  const nextSection = (next: string) => {
    setCurrentSection(next);
    // Validate phone number
    if (currentSection === 'contactSection') {
      if (!validateMobileNo(MobileNo)) {
        setPhoneError('Please enter a valid 10-digit phone number.');
        return; // Stop execution if validation fails
      } else {
        setPhoneError('');
      }
      // Validate email address
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address.');
        return; // Stop execution if validation fails
      } else {
        setEmailError('');
      }
    }
    
    // If all validations pass, update the section
    setCurrentSection(next);
  };
  
  const previousSection = (previous: string) => {
    setCurrentSection(previous);
  };

  // Email validation function
  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };
  // Phone number validation function
  const validateMobileNo = (MobileNo: string) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(MobileNo);
  };

const handlePro = () => {
  launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, (response) => {
    if (response.didCancel) {
      console.log('User canceled image picker');
    } else if (response.errorCode) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const imageUri = response.assets[0].uri;
      console.log('Selected Image URI:', imageUri);
      setPropic(imageUri);
    } else {
      console.log('No image selected');
    }
  });
};

const handleDeletePro = () => {
  setPropic(null);
};
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          {currentSection === 'personalSection' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Personal Details</Text>

              {/* Picture Upload Button */}
              <View style={styles.uploadContainer}>
                <Text style={styles.label}>Upload a Picture:</Text>
                <TouchableOpacity style={styles.uploadButton} onPress={handlePro}>
                  <Text style={styles.uploadButtonText}>Choose File</Text>
                </TouchableOpacity>
              </View>

              {/* Display the selected image if it exists */}
              {propic && (
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: propic }} style={styles.imagePreview} />
                  <TouchableOpacity style={styles.closeButton} onPress={handleDeletePro}>
                    <Text style={styles.closeButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              )}

              <Text style={styles.label}>First Name:</Text>
              <TextInput style={styles.input} placeholder="Enter your First Name" value={firstName}
                onChangeText={(value) => setFirstName(value)} />
              <Text style={styles.label}>Last Name:</Text>
              <TextInput style={styles.input} placeholder="Enter your Last Name" value={lastname}
                onChangeText={(value) => setLastname(value)} />
              <Text style={styles.label}>Date of Birth(YYYY-MM-DD):</Text>
              <TextInput style={styles.input} placeholder="Date of Birth (YYYY-MM-DD)" value={dob}
                onChangeText={(value) => setDOB(value)} />
              <Text style={styles.label}>Age:</Text>
              <TextInput style={styles.input} placeholder="Age" value={age}
                onChangeText={(value) => setAge(value)} />
              <Text style={styles.label}>Height:</Text>
              <TextInput style={styles.input} placeholder="Height" value={height}
                onChangeText={(value) => setHeight(value)} />
              <Text style={styles.label}>Weight:</Text>
              <TextInput style={styles.input} placeholder="Weight" value={weight}
                onChangeText={(value) => setWeight(value)} />
              <Text style={styles.label}>Blood group:</Text>
              <TextInput style={styles.input} placeholder="Blood Group" value={bloodgroup}
                onChangeText={(value) => setBloodGroup(value)} />
              <Text style={styles.label}>Marital Status :</Text>
              <TextInput style={styles.input} placeholder="Marital Status"value={maritalstatus}
                onChangeText={(value) => setMaritalStatus(value)} />

              <View style={styles.section}>
                <Text style={styles.label}>Gender:</Text>
              <View style={styles.radioGroup}>
              <TouchableOpacity
                style={[styles.radioButton, gender === 'Male' && styles.radioSelected]}
                onPress={() => setGender('Male')}
              >
              <Text style={styles.radioText}>Male</Text>
               </TouchableOpacity>
               <TouchableOpacity
               style={[styles.radioButton, gender === 'Female' && styles.radioSelected]}
                 onPress={() => setGender('Female')}
                >
             <Text style={styles.radioText}>Female</Text>
                  </TouchableOpacity>
                <TouchableOpacity
                style={[styles.radioButton, gender === 'Other' && styles.radioSelected]}
                onPress={() => setGender('Other')}
                >
                <Text style={styles.radioText}>Other</Text>
                </TouchableOpacity>
              </View>
            </View>

              <Text style={styles.label}>Mother Tongue:</Text>
              <TextInput style={styles.input} placeholder="Mother Tongue" value={mothertongue}
                onChangeText={(value) => setMotherTongue(value)} />
              <Text style={styles.label}>Religion:</Text>
              <TextInput style={styles.input} placeholder="Religion" value={religion}
                onChangeText={(value) => setReligion(value)} />
              <Text style={styles.label}>Caste/Community:</Text>
              <TextInput style={styles.input} placeholder="Caste/Community" value={casteorcommunity}
                onChangeText={(value) => setCasteOrCommunity(value)} />
              <Text style={styles.label}>Sub-Caste:</Text>
              <TextInput style={styles.input} placeholder="Sub-Caste" value={subcaste}
                onChangeText={(value) => setSubcaste(value)} />
              <Text style={styles.label}>Gotra:</Text>
              <TextInput style={styles.input} placeholder="Gotra"value={gotra}
                onChangeText={(value) => setGotra(value)} />

            {/* Kuja Dosha Selection */}
            <View style={styles.section}>
                <Text style={styles.label}>Kuja Dosha:</Text>
                <View style={styles.radioGroup}>
                  <TouchableOpacity
                  style={[styles.radioButton, mangalik === 'Yes' && styles.radioSelected]}
                  onPress={() => setMangalik('Yes')}
                  >
                <Text style={styles.radioText}>Yes</Text>
                 </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.radioButton, mangalik === 'No' && styles.radioSelected]}
                  onPress={() => setMangalik('No')}
                >
                <Text style={styles.radioText}>No</Text>
                </TouchableOpacity>
             </View>
            </View>

              <Text style={styles.label}>Place of Birth:</Text>
              <TextInput style={styles.input} placeholder="Place of Birth" value={placeofbirth}
                onChangeText={(value) => setPlaceOfBirth(value)} />

        <View>
              <Text style={styles.label}>Time of Birth:</Text>
              <TextInput
                style={styles.input}
                placeholder="Time of Birth"
                value={timeofbirth}
                editable={true}       
                onChangeText={handleInputChange}      
                onFocus={showDatePicker}  // Trigger the datepicker when the field is focused
              />
              <DateTimePickerModal
                isVisible={isPickerVisible}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>

              <Text style={styles.label}>Birth Star (Nakshatra):</Text>
              <TextInput style={styles.input} placeholder="Birth Star (Nakshatra)" value={birthstar}
                onChangeText={(value) => setBirthStar(value)} />
                 <Text style={styles.label}>Rashi:</Text>
              <TextInput style={styles.input} placeholder="Rashi" value={rashi}
                onChangeText={(value) => setRashi(value)} />
              <TouchableOpacity style={styles.button} onPress={() => nextSection('contactSection')}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}

          {currentSection === 'contactSection' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              <Text style={styles.label}>Address:</Text>
              <TextInput style={styles.input} placeholder="Address" value={address}
                onChangeText={(value) => setAddress(value)} />
              <View style={styles.container}>
                <Text style={styles.label}>Select State:</Text>
                <Picker selectedValue={selectedState} onValueChange={(value) => setSelectedState(value)} style={styles.picker}>
                  <Picker.Item label="-- Select a State --" value=" " />
                  {states.map((state) => (
                    <Picker.Item key={state.Id} 
                                  label={state.Name} 
                                  value={state.Id} />
                  ))}
                </Picker>
                  <>
                    <Text style={styles.label}>Select City:</Text>
                    <Picker selectedValue={selectedCity} onValueChange={(value) => setSelectedCity(value)} style={styles.picker}>
                      <Picker.Item label="-- Select a City --" value="" />
                      {cities.map((city) => (
                        <Picker.Item key={city.Id} 
                                    label={city.Name} 
                                    value={city.Id} />
                      ))}
                    </Picker>
                  </>    
              </View>
              <Text style={styles.label}>Pin Code:</Text>
              <TextInput style={styles.input} placeholder="Pin Code"value={pincode}
                onChangeText={(value) => setPincode(value)} />
              <Text style={styles.label}>Phone Number:</Text>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="numeric"
                maxLength={10}
                value={MobileNo}
                onChangeText={(value) => setMobileNo(value)}
              />
              {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

              <Text style={styles.label}>Email Address:</Text>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
                value={email}
                onChangeText={(value) => setEmail(value)}
              />
              {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              <TouchableOpacity style={styles.button} onPress={() => previousSection('personalSection')}>
                <Text style={styles.buttonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => nextSection('educationSection')}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}

          {currentSection === 'educationSection' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              <Text style={styles.label}>Highest Qualification:</Text>
              <TextInput style={styles.input} placeholder="Highest Qualification" value={highestqualification}
                onChangeText={(value) => setHighestQualification(value)} />
              <Text style={styles.label}>Institution/University:</Text>
              <TextInput style={styles.input} placeholder="Institution/University" value={instituteoruniversity}
                onChangeText={(value) => setnIstituteOrUniversity(value)} />
              <Text style={styles.label}>Year of Graduation:</Text>
              <TextInput style={styles.input} placeholder="Year of Graduation" value={yearOfgraduation}
                onChangeText={(value) => setYearOfGraduation(value)} />
              <Text style={styles.label}>Additional Qualifications (if any):</Text>
              <TextInput style={styles.input} placeholder="Additional Qualifications (if any)" value={additionalqualifications}
                onChangeText={(value) => setAdditionalQualifications(value)} />
              <Text style={styles.label}>Languages Known:</Text>
              <TextInput style={styles.input} placeholder="Languages Known" value={languagesknown}
                onChangeText={(value) => setLanguagesKnown(value)} />
              <TouchableOpacity style={styles.button} onPress={() => previousSection('contactSection')}>
                <Text style={styles.buttonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => nextSection('professionalSection')}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}

          {currentSection === 'professionalSection' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Details</Text>
              <Text style={styles.label}>Occupation/Job title:</Text>
              <TextInput style={styles.input} placeholder="Occupation/Job title" value={occupation}
                onChangeText={(value) => setOccupation(value)} />
              <Text style={styles.label}>Company/Organization:</Text>
              <TextInput style={styles.input} placeholder="Company/Organization" value={company}
                onChangeText={(value) => setCompany(value)} />
              <Text style={styles.label}>Annual Income:</Text>
              <TextInput style={styles.input} placeholder="Annual Income" value={annualincome}
                onChangeText={(value) => setAnnualIncome(value)} />
              <Text style={styles.label}>Job Location (City/Country):</Text>
              <TextInput style={styles.input} placeholder="Job Location (City/Country)" value={joblocation}
                onChangeText={(value) => setJobLocation(value)} />
              <Text style={styles.label}>Work Experience (in years):</Text>
              <TextInput style={styles.input} placeholder="Work Experience (in years)" value={workexperience}
                onChangeText={(value) => setWorkExperience(value)} />
              <TouchableOpacity style={styles.button} onPress={() => previousSection('educationSection')}>
                <Text style={styles.buttonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => nextSection('familySection')}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}

          {currentSection === 'familySection' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Family Details</Text>
            <Text style={styles.label}>Father's Occupation:</Text>
            <TextInput style={styles.input} placeholder="Father's Occupation" value={fathersoccupation}
                onChangeText={(value) => setFathersOccupation(value)} />
            <Text style={styles.label}>Mother's Occupation:</Text>
            <TextInput style={styles.input} placeholder="Mother's Occupation" value={motheroccupation}
                onChangeText={(value) => setMothersOccupation(value)} />
            <Text style={styles.label}>Siblings(Numbers, Age, Occupation):</Text>
             <TextInput style={styles.input} placeholder="Siblings(Numbers, Age, Occupation)" value={siblings}
                onChangeText={(value) => setSiblings(value)} />
            {/* Family Type Radio Buttons */}
          <Text style={styles.label}>Family Type:</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
               style={[styles.radioButton, familyType === 'Nuclear' && styles.radioSelected]}
              onPress={() => setFamilyType('Nuclear')}
            >
            <Text style={styles.radioText}>Nuclear</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={[styles.radioButton, familyType === 'Joint' && styles.radioSelected]}
            onPress={() => setFamilyType('Joint')}
            >
            <Text style={styles.radioText}>Joint</Text>
            </TouchableOpacity>
        </View>

      {/* Family Values Checkboxes */}
    <Text style={styles.label}>Family Values:</Text>
      <View style={styles.checkboxGroup}>
        <TouchableOpacity
          style={[styles.checkbox, familyValues.includes('Traditional') && styles.checkboxSelected]}
          onPress={() => handleFamilyValueChange('Traditional')}
        >
          <Text style={styles.checkboxText}>Traditional</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.checkbox, familyValues.includes('Moderate') && styles.checkboxSelected]}
          onPress={() => handleFamilyValueChange('Moderate')}
        >
          <Text style={styles.checkboxText}>Moderate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.checkbox, familyValues.includes('Modern') && styles.checkboxSelected]}
          onPress={() => handleFamilyValueChange('Modern')}
        >
          <Text style={styles.checkboxText}>Modern</Text>
        </TouchableOpacity>
      </View>

          {/* Navigation Buttons */}
          <TouchableOpacity style={styles.button} onPress={() => previousSection('professionalSection')}>
            <Text style={styles.buttonText}>Previous</Text>
           </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => nextSection('lifestyleSection')}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
       </View>
          )}

          {currentSection === 'lifestyleSection' && (
                <View style={styles.section}>
                <Text style={styles.sectionTitle}>Lifestyle Details</Text>         
                {/* Diet Preferences */}
                <Text style={styles.label}>Diet Preferences:</Text>
                <View style={styles.radioGroup}>
                  <TouchableOpacity
                    style={[styles.radioButton, dietPreference === 'Vegetarian' && styles.radioSelected]}
                    onPress={() => setDietPreference('Vegetarian')}
                  >
                    <Text style={styles.radioText}>Vegetarian</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.radioButton, dietPreference === 'Non-vegetarian' && styles.radioSelected]}
                    onPress={() => setDietPreference('Non-vegetarian')}
                  >
                    <Text style={styles.radioText}>Non-vegetarian</Text>
                  </TouchableOpacity>
                </View>          
                {/* Drinking */}
                <Text style={styles.label}>Drinking:</Text>
                <View style={styles.radioGroup}>
                  <TouchableOpacity
                    style={[styles.radioButton, drinking === 'Yes' && styles.radioSelected]}
                    onPress={() => setDrinking('Yes')}
                  >
                    <Text style={styles.radioText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.radioButton, drinking === 'No' && styles.radioSelected]}
                    onPress={() => setDrinking('No')}
                  >
                    <Text style={styles.radioText}>No</Text>
                  </TouchableOpacity>
                </View>         
                {/* Smoking */}
                <Text style={styles.label}>Smoking:</Text>
                <View style={styles.radioGroup}>
                  <TouchableOpacity
                    style={[styles.radioButton, smoking === 'Yes' && styles.radioSelected]}
                    onPress={() => setSmoking('Yes')}
                  >
                    <Text style={styles.radioText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.radioButton, smoking === 'No' && styles.radioSelected]}
                    onPress={() => setSmoking('No')}
                  >
                    <Text style={styles.radioText}>No</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.label}>Hobbies and Interests:</Text>
                <TextInput style={styles.input} placeholder="Hobbies and Interests" value={hobbiesandinterests}
                onChangeText={(value) => setHobbiesAndInterests(value)} />
                <Text style={styles.label}>Sports/Activities:</Text>
                <TextInput style={styles.input} placeholder="Sports/Activities" value={sportsactivities}
                onChangeText={(value) => setSportsActivities(value)} />
                <Text style={styles.label}>Preferred Marriage Location:</Text>
                <TextInput style={styles.input} placeholder="Preferred Marriage Location (City/State/Country)" value={preferredmarriagelocation}
                onChangeText={(value) => setPreferredMarriageLocation(value)} />
              <TouchableOpacity style={styles.button} onPress={() => previousSection('familySection')}>
                <Text style={styles.buttonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => nextSection('partnerPreferencesSection')}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}

          {currentSection === 'partnerPreferencesSection' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Partner Preferences</Text>
              <Text style={styles.label}>Age Range:</Text>
              <TextInput style={styles.input} placeholder="Age Range" value={preferredagerange}
                onChangeText={(value) => setPreferredAgeRange(value)} />
              <Text style={styles.label}>Height Range:</Text>
              <TextInput style={styles.input} placeholder="Height Range" value={preferredheight}
                onChangeText={(value) => setPreferredHeight(value)} />
              <Text style={styles.label}>Preferred Religion/Caste:</Text>
              <TextInput style={styles.input} placeholder="Preferred Religion/Caste" value={preferredreligioncaste}
                onChangeText={(value) => setPreferredReligionCaste(value)} />
              <Text style={styles.label}>Education Qualifications:</Text>
              <TextInput style={styles.input} placeholder="Education Qualifications" value={preferrededucation}
                onChangeText={(value) => setPreferredEducation(value)} />
              <Text style={styles.label}>Occupation/Income Preferences:</Text>
              <TextInput style={styles.input} placeholder="Occupation/Income Preferences" value={preferredoccupationincome}
                onChangeText={(value) => setPreferredOccupationIncome(value)} />
              
              {/* Mangalik Radio Buttons */}
              <Text style={styles.label}>Mangalik(Kuja Dosha):</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity
                  style={[styles.radioButton, preferredmanglik === 'Yes' && styles.radioSelected]}
                  onPress={() => setPreferredManglik('Yes')}
                >
                  <Text style={styles.radioText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.radioButton, preferredmanglik === 'No' && styles.radioSelected]}
                  onPress={() => setPreferredManglik('No')}
                >
                  <Text style={styles.radioText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.radioButton, preferredmanglik === 'Doesn\'t Matter' && styles.radioSelected]}
                  onPress={() => setPreferredManglik('Doesn\'t Matter')}
                >
                  <Text style={styles.radioText}>Doesn't Matter</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.label}>Preferred Location:</Text>
              <TextInput style={styles.input} placeholder="Preferred Location(same city/country or open to relocation" value={preferredlocation}
                onChangeText={(value) => setPreferredLocation(value)} />
              <Text style={styles.label}>Other preferences:</Text>
              <TextInput style={styles.input} placeholder="Other preferences(Personality traits, values, etc.," value={preferredothers}
                onChangeText={(value) => setPreferredOthers(value)} />

              <TouchableOpacity style={styles.button} onPress={() => previousSection('lifestyleSection')}>
                <Text style={styles.buttonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => nextSection('uploadImages')}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            </View>
          )}

        {currentSection === 'uploadImages' && (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upload your photos:</Text>
      {/* Picture Upload Button */}
      <View style={styles.uploadContainer}>
        <Text style={styles.label}>Upload a Picture:</Text>
        <TouchableOpacity style={styles.uploadButton} onPress={handleImagePicker}>
          <Text style={styles.uploadButtonText}>Choose File</Text>
        </TouchableOpacity>
      </View>

      {/* Display Selected Images */}
      <View style={styles.imageContainer}>
        {selectedImage.length > 0 ? (
          selectedImage.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.imagePreview} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => handleDeleteImage(index)}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noImageText}>No image selected</Text>
        )}
      </View>

          <TouchableOpacity 
             style={styles.button} 
            onPress={() => {
            console.log("Save button clicked!");  // Debugging log
            handleSave();
          }}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>


    </View>
        )}
         </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#f8f8f8",
  },
  text: {
    fontFamily: 'Calibri', // Apply Calibri font
    fontSize: 16,          // Adjust font size as needed
    color: '#000',         // Optional: Adjust text color
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: 'bold',  
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    fontSize: 10
  },
  button: {
    bottom:0,
    left: 30,
    backgroundColor: '#000080', // Button color
    padding: 5, // Padding inside the button
    borderRadius: 5, // Rounded corners
    margin: 5, // Space between buttons
    width: '80%', // Button width
    alignItems: 'center', // Center text horizontally
  },
  buttonText: {
    color: '#FFFFFF',// Text color
    fontSize: 16, // Text size
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  radioButton: {
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  radioSelected: {
    backgroundColor: '#808080',  
  },
  radioText: {
    color: '#000',
  },
  checkboxGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  checkbox: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#808080', 
  },
  checkboxText: {
    color: '#000',
  },
  uploadContainer: {
    marginVertical: 15,
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#000080',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagePreview: {
    marginTop: 10,
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 10,
    marginRight: 10,
  },
  imageContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 2,
    padding: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  noImageText: {
    color: '#777',
    fontSize: 14,
    marginTop: 10,
  },
});

export default ApplicationProfile;
