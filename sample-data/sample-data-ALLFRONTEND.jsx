// FULL FRONT END
// NO BACK END SESSION


// Questionnaire -> Request Data Question
// Send Balik ke Back -> Request Halaman Result

// DATA QUESTION & DEFAULT - RECEIVE
const dataquestion = {
  // SECTION OBJECT
  sections: [
    // SECTION OBJECT
    {
      sectionID: '',
      sectionTitle: { en, id },
      sectionType: '', // FUNDAMENTAL, QUESTIONNAIRES
      sectionColour: '',
      sectionCover: {
        ImageLeft,
        ImageRight,
        coverTitle,
        continueButton,
      },
      questions: [
        // [Q1, Q2, Q3]
        // QUESTION OBJECT
        {
          questionID: '',
          question: { en, id }, // THE QUESTION IT SELF
          answerType: '', // SELECTION or MULTIPLE or STRING
          // ADDITIONAL
          questionImage: '', // Default Blank = No Background
          answerDisplayType: '', // TEXT, ICON, IMAGE
          // ANSWER OBJECT
          answers: [
            {
              answerID,
              answer: { en, id }, // THE ANSWER IT SELF
              answerRespond, // DISPLAY on PRE RESULT and WHY THIS
              answerIcon, // optional
              answerImage, // optional
            },
          ],
          inputPlaceholder: '', // FOR STRING
          // RESOLVE SETTING
          resolveSetting: {
            initialState: '', // HIDDEN ATO SHOWN 
            resolveCondition: [ // NEGATE THE INITIAL STATE
              // QA Object
              {
                questionID,
                answerID: [],
              },
            ],
          },
        },
      ],
    },
  ], // ----
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
};

// SET TOKEN POLICY

// DATA ANSWER - RETURN - STORE IN BACK END
const dataanswer = {
  sessionID: 'xx', // AUTO from BACKEND
  sessionDateTime: '',
  browserData: '',
  language: '', // EN or ID
  additionalInformation: {
    // OPTIONAL
    location: '',
  },
  endFormRespond: {
    email: '',
    phoneNumber: '',
  },
  questionnaireRespond: [
    // SECTION OBJECT
    {
      sectionid: '',
      responds: [
        // RESPOND OBJECT
        {
          questionID: '',
          answer: [''], // STRING OR ARRAY OR NULL (FOR QUESTION THAT IS SKIPPED)
          answerID,
          type: '', // SELECT, MULTIPLE, STRING
        },
      ],
    },
  ],
};
