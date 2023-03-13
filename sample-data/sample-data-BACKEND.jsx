// MIX FRONT END & BACKEND
// SESSION EXPIRY POLICY IS IN THE FRONT END

// STATIC
// EN ID mau di pisah ato ga bebas
const initialData = {
  // ----
  coverPage: {
    title: { en, id },
    coverImage: { en, id },
    description: { en, id },
    buttontext: { en, id },
  },
  beforeResult: {
    title: { en, id },
    description: { en, id },
    coverImage,
    formTitle: { en, id },
    emailPlaceholder: { en, id },
    phonePlaceholder: { en, id },
    buttontext: { en, id },
  },
  seoData: {
    en: {
      title,
      keyword,
      image,
    },
    id: {
      title,
      keyword,
      image,
    },
  },
  footerData: {
    creditText: { en, id },
    whatsappNumber,
  },
  headerData: {
    title: { en, id },
    backButton: { en, id },
  },
  defaultData: {
    continueButtonText: { en, id },
    fundamentalQuestionTitle: { en, id }, // Let's get to know you
  },
  sections: {
    sectionTitle: { en, id },
    totalQuestions,
    sectionColour,
  },
};

// SERVER ANSWER - SEND
const sendData = {
  // requestType: '', // FUNDAMENTAL, QUESTIONS, PRE-RESULT ?
  sectionID: '', // CURRENT SECTION ID
  questionID: '',
  answer: [''], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
  answerID,
  sessionID,
};

// SERVER INITIAL
const initialRequest = {
  sessionID,
  // INITIAL DATA
  browserData: '',
  language: '', // EN or ID
  additionalInformation: {
    // OPTIONAL
    location: '',
  },
};

// SERVER END FORM
const preResultSubmit = {
  email: '',
  phoneNumber: '',
};

// SERVER QUESTION - RECEIVE
const receiveData = {
  respondStatus: '',
  respondType: '', // FUNDAMENTAL, SECTION-COVER, QUESTIONS, PRE-RESULT
  sectionID: '',
  // QUESTION
  questionID: '',
  question: { en, id }, // THE QUESTION IT SELF
  answerType: '', // SELECTION or MULTIPLE or STRING
  // ANSWER OBJECT
  answers: [
    {
      answerID,
      answer: { en, id }, // THE ANSWER IT SELF
      answerIcon, // optional
      answerImage, // optional
    },
  ],
  inputPlaceholder: '', // FOR STRING
  // ADDITIONAL
  questionImage: '', // Default Blank = No Background
  answerDisplayType: '', // TEXT, ICON, IMAGE
  progressPerSection, // OR QUESTION NUMBER
  // PRE RESULT RECEIVE
  preResultDisplay: [
    {
      summaryTitle,
      summaryContent,
    },
  ],
  // SECTION COVER
  sectionCover: {
    ImageLeft,
    ImageRight,
    coverTitle,
    continueButton,
  },
};
