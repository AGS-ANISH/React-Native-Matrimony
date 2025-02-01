import axiosInstance from './axiosInstance';

// Login API call
export const login = async (userName: string, password: string) => {
  try {
    let data={
        userName:userName,
        password:password,
    };
    const response = await axiosInstance.post('/Auth/Login', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Something went wrong';
  }
};


//Quick Registration API
export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  MobileNo: string,
  relativeStatus: string,
) => {
  try {
    // Step 1: Register the user by sending the initial data (without OTP and password)
    let data = {
      FirstName:firstName,
      LastName:lastName,
      EmailID: email,
      MobileNo: MobileNo,
      Relativestatus: relativeStatus,
    };
    // Make the initial registration API call
    const registerResponse = await axiosInstance.post('/User/QuickRegistration', data);

    
    if (registerResponse.data.success) {
      
      return registerResponse.data;
    } else {
      throw new Error('Registration failed, please try again.');
    }
  } catch (error: any) {
    throw error.response?.data?.message || 'Something went wrong during registration';
  }
};
// OTP Validation function
export const validateOTP = async (email: string, otp: string) => {
  try {
    let data = {
      EmailID: email,
      OTP: otp,
    };
    const response = await axiosInstance.post('/User/ValidateOTP', data); 
    if (response.data.success) {
      return response.data; // OTP validated successfully
    } else {
      throw new Error('OTP validation failed');
    }
  } catch (error: any) {
    throw error.response?.data?.message || 'Something went wrong during OTP validation';
  }
};
// Set Password function after OTP validation
export const setPassword = async (email: string, MobileNo: string, password: string, confirmPassword: string) => {
  try {
    let data ={
      EmailID:email,
      MobileNo: MobileNo,
      Password: password,
      ConfirmPassword: confirmPassword, 
    };
    const response = await axiosInstance.post('/User/SetPassword', data); 
    if (response.data.success) {
      return response.data; // Password successfully set
    } else {
      throw new Error('Failed to set password');
    }
  } catch (error: any) {
    throw error.response?.data?.message || 'Something went wrong while setting password';
  }
};



// Forgot Password API calls
// Send OTP (either via email or phone number)
export const sendOtp = async (isEmail: boolean, email: string, MobileNo: string) => {
  try {
    let data  ={
      EmailID:email,
      MobileNo: MobileNo,
    };
    const fpw = isEmail ? { EmailID: email } : { MobileNo: MobileNo };
    const response = await axiosInstance.post('/User/ValidateEmailOrMobile', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Something went wrong while sending OTP';
  }
};
// Verify OTP
export const verifyOtp = async (emailID: string, otp: string) => {
  try {
    let data = { EmailID: emailID, OTP: otp };
    const response = await axiosInstance.post('/User/ValidateOTP', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Invalid OTP or something went wrong';
  }
};


// Reset password
export const resetPassword = async (emailOrMobile: string, newPassword: string, confirmPassword: string) => {
  try {
    let data = { 
      EmailID: emailOrMobile,
      MobileNo: emailOrMobile, // Since it could be either email or mobile, you can use whichever is passed
      Password: newPassword,
      ConfirmPassword: confirmPassword
    };
    const response = await axiosInstance.post('/User/SetPassword', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Failed to reset password';
  }
};


//Full Registration API calls
export const saveProfileDetails = async (  userID: number,
  firstName: string,
  lastname: string,
  dob: string,
  age: string,
  height: string,
  weight: string,
  bloodgroup: string,
  gender: string,
  mothertongue: string,
  religion: string,
  casteorcommunity: string,
  subcaste: string,
  gotra: string,
  manglikstatus: string,
  placeofbirth: string,
  timeofbirth: string,
  birthstar: string,
  rashi: string,
  occupation: string,
  company: string,
  annualincome: string,
  joblocation: string,
  workexperience: number,
  fathersoccupation: string,
  motheroccupation: string,
  siblings: number,
  familyType: string,
  familyValues: string,
  dietPreference: string,
  drinking: string,
  smoking: string,
  hobbiesandinterests: string,
  sportsactivities: string,
  preferredmarriagelocation: string,
  highestqualification: string,
  instituteoruniversity: string,
  yearOfgraduation: number,
  additionalqualifications: string,
  languagesknown: string,
  MobileNo: string,
  email: string,
  address: string,
  city: string ,
  state: string,
  pincode: string,
  preferredagerange: string,
  preferredheight: string,
  preferredreligioncaste: string,
  preferrededucation: string,
  preferredoccupationincome: string,
  preferredlocation: string,
  preferredothers: string,
  preferredmanglik: string,
  selectedImage: string
) => {
  try {
    let data = { 
      UserID: userID,
      FirstName: firstName,
      Lastname: lastname,
      DOB : dob,
      Age :parseInt(age),
      Height:parseInt(height),
      Weight:parseInt(weight) ,
      BloodGroup: bloodgroup,
      Gender:gender ,
      MotherTongue:mothertongue ,
      Religion: religion,
      CasteOrCommunity:casteorcommunity ,
      SubCaste:subcaste ,
      Gotra:gotra,
      ManglikStatus: manglikstatus,
      PlaceOfBirth: placeofbirth,
      TimeOfBirth:timeofbirth,
      BirthStar: birthstar,
      Rashi:rashi,
      Occupation: occupation,
      Company:company ,
      AnnualIncome: parseInt(annualincome),
      JobLocation: joblocation,
      WorkExperience:workexperience ,
      FathersOccupation: fathersoccupation,
      MothersOccupation:motheroccupation,
      Siblings: siblings,
      FamilyType:familyType,
      FamilyValues:familyValues ,
      DietPreference:dietPreference,
      Drinking:drinking ,
      Smoking:smoking ,
      HobbiesAndInterests: hobbiesandinterests,
      SportsActivities:sportsactivities ,
      PreferredMarriageLocation: preferredmarriagelocation,
      HighestQualification:highestqualification ,
      InstituteOrUniversity:instituteoruniversity ,
      YearOfGraduation:yearOfgraduation,
      AdditionalQualifications: additionalqualifications,
      LanguagesKnown: languagesknown,
      MobileNo: MobileNo,
      EmailID:email ,
      Address:address ,
      City:parseInt(city) ,
      State: parseInt(state),
      Pincode:pincode,
      PreferredAgeRange: preferredagerange,
      PreferredHeight:preferredheight,
      PreferredReligionCaste: preferredreligioncaste,
      PreferredEducation: preferrededucation,
      PreferredOccupationIncome: preferredoccupationincome,
      PreferredLocation: preferredlocation,
      PreferredOthers:preferredothers ,
      PreferredManglik:preferredmanglik,
      Base64Images:selectedImage,
    };
    console.log("Sending data to API...");
    const response = await axiosInstance.post('/Profile/SaveProfileDetails', data);
    console.log("API response received:", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Something went wrong while saving profile details';
  }
};


// State API call
export const getState = async () => {
  try {
    let data = {};
    const response = await axiosInstance.post('/Master/GetStates');
    console.log('States response:', response); // Log response for debugging
    return response.data;
  } catch (error: any) {
    console.error('Error fetching states:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to update State';
  }
};

// City API call
export const getCity = async (stateID: string) => {
  try {
    let data = {
      StateID: stateID
    }
    const response = await axiosInstance.post('/Master/GetDistrict', data);
    console.log('City response:', response); // Log response for debugging
    return response.data;
  } catch (error: any) {
    console.error('Error fetching cities:', error.response?.data || error.message);
    throw error.response?.data?.message || 'Failed to update City';
  }
};

