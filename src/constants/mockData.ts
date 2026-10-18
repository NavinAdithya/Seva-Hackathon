export const MOCK_PHRASES = [
  { id: 1, category: 'medical', subcategory: 'pain', text_en: 'I have stomach pain', text_ta: 'எனக்கு வயிற்று வலி', text_hi: 'मेरे पेट में दर्द है', icon: '🤢', severity: 'high', sort_order: 1 },
  { id: 2, category: 'medical', subcategory: 'pain', text_en: 'I have chest pain', text_ta: 'எனக்கு நெஞ்சு வலி', text_hi: 'मेरे सीने में दर्द है', icon: '💔', severity: 'critical', sort_order: 2 },
  { id: 3, category: 'medical', subcategory: 'pain', text_en: 'I have a headache', text_ta: 'எனக்கு தலைவலி', text_hi: 'मेरे सिर में दर्द है', icon: '🤕', severity: 'medium', sort_order: 3 },
  { id: 4, category: 'medical', subcategory: 'pain', text_en: 'My body is hurting', text_ta: 'என் உடம்பு வலிக்கிறது', text_hi: 'मेरे शरीर में दर्द है', icon: '😣', severity: 'high', sort_order: 4 },
  { id: 5, category: 'medical', subcategory: 'breathing', text_en: 'I cannot breathe properly', text_ta: 'என்னால் சரியாக சுவாசிக்க முடியவில்லை', text_hi: 'मुझे ठीक से साँस नहीं आ रही', icon: '😮‍💨', severity: 'critical', sort_order: 5 },
  { id: 6, category: 'medical', subcategory: 'general', text_en: 'I need medical assistance', text_ta: 'எனக்கு மருத்துவ உதவி தேவை', text_hi: 'मुझे चिकित्सा सहायता चाहिए', icon: '🏥', severity: 'high', sort_order: 6 },
  { id: 7, category: 'medical', subcategory: 'injury', text_en: 'I am bleeding', text_ta: 'எனக்கு ரத்தம் வருகிறது', text_hi: 'मुझे खून बह रहा है', icon: '🩸', severity: 'critical', sort_order: 7 },
  { id: 8, category: 'medical', subcategory: 'general', text_en: 'I feel dizzy and faint', text_ta: 'எனக்கு தலை சுற்றுகிறது', text_hi: 'मुझे चक्कर आ रहे हैं', icon: '💫', severity: 'high', sort_order: 8 },
  { id: 9, category: 'medical', subcategory: 'allergy', text_en: 'I am having an allergic reaction', text_ta: 'எனக்கு ஒவ்வாமை ஏற்பட்டுள்ளது', text_hi: 'मुझे एलर्जी हो रही है', icon: '🤧', severity: 'critical', sort_order: 9 },
  { id: 10, category: 'medical', subcategory: 'fever', text_en: 'I have a high fever', text_ta: 'எனக்கு அதிக காய்ச்சல்', text_hi: 'मुझे तेज़ बुखार है', icon: '🤒', severity: 'high', sort_order: 10 },
  { id: 11, category: 'safety', subcategory: 'threat', text_en: 'I feel unsafe', text_ta: 'நான் பாதுகாப்பற்றதாக உணர்கிறேன்', text_hi: 'मुझे असुरक्षित लग रहा है', icon: '⚠️', severity: 'high', sort_order: 1 },
  { id: 12, category: 'safety', subcategory: 'threat', text_en: 'Someone is following me', text_ta: 'யாரோ என்னைப் பின்தொடர்கிறார்கள்', text_hi: 'कोई मेरा पीछा कर रहा है', icon: '👤', severity: 'critical', sort_order: 2 },
  { id: 13, category: 'safety', subcategory: 'lost', text_en: 'I am lost and need directions', text_ta: 'நான் வழி தெரியாமல் இருக்கிறேன்', text_hi: 'मैं रास्ता भटक गया हूँ', icon: '🗺️', severity: 'medium', sort_order: 3 },
  { id: 14, category: 'safety', subcategory: 'harassment', text_en: 'I am being harassed', text_ta: 'நான் தொல்லைக்கு ஆளாகிறேன்', text_hi: 'मुझे परेशान किया जा रहा है', icon: '🚫', severity: 'critical', sort_order: 4 },
  { id: 15, category: 'fire', subcategory: 'fire', text_en: 'There is a fire', text_ta: 'தீ பிடித்துள்ளது', text_hi: 'आग लगी है', icon: '🔥', severity: 'critical', sort_order: 1 },
  { id: 16, category: 'fire', subcategory: 'smoke', text_en: 'I smell smoke', text_ta: 'புகை வாசனை வருகிறது', text_hi: 'धुआँ आ रहा है', icon: '🌫️', severity: 'high', sort_order: 2 },
  { id: 17, category: 'fire', subcategory: 'trapped', text_en: 'I am trapped and cannot exit', text_ta: 'நான் சிக்கியுள்ளேன், வெளியேற முடியவில்லை', text_hi: 'मैं फँसा हुआ हूँ, बाहर नहीं निकल पा रहा', icon: '🚪', severity: 'critical', sort_order: 3 },
  { id: 18, category: 'natural_disaster', subcategory: 'flood', text_en: 'There is flooding here', text_ta: 'இங்கே வெள்ளம் வந்துள்ளது', text_hi: 'यहाँ बाढ़ आई है', icon: '🌊', severity: 'critical', sort_order: 1 },
  { id: 19, category: 'natural_disaster', subcategory: 'earthquake', text_en: 'There was an earthquake', text_ta: 'நிலநடுக்கம் ஏற்பட்டது', text_hi: 'भूकंप आया है', icon: '🏚️', severity: 'critical', sort_order: 2 },
  { id: 20, category: 'accident', subcategory: 'vehicle', text_en: 'There has been a road accident', text_ta: 'சாலை விபத்து ஏற்பட்டுள்ளது', text_hi: 'सड़क दुर्घटना हुई है', icon: '🚗', severity: 'critical', sort_order: 1 },
  { id: 21, category: 'accident', subcategory: 'fall', text_en: 'Someone has fallen and is injured', text_ta: 'யாரோ விழுந்து காயமடைந்துள்ளார்', text_hi: 'कोई गिर गया है और घायल है', icon: '🤕', severity: 'high', sort_order: 2 },
  { id: 22, category: 'general', subcategory: 'help', text_en: 'I need help urgently', text_ta: 'எனக்கு அவசரமாக உதவி தேவை', text_hi: 'मुझे तुरंत मदद चाहिए', icon: '🆘', severity: 'high', sort_order: 1 },
  { id: 23, category: 'general', subcategory: 'water', text_en: 'I need water', text_ta: 'எனக்கு தண்ணீர் தேவை', text_hi: 'मुझे पानी चाहिए', icon: '💧', severity: 'medium', sort_order: 2 },
  { id: 24, category: 'general', subcategory: 'food', text_en: 'I need food', text_ta: 'எனக்கு உணவு தேவை', text_hi: 'मुझे खाना चाहिए', icon: '🍽️', severity: 'medium', sort_order: 3 },
  { id: 25, category: 'general', subcategory: 'rest', text_en: 'I need to rest', text_ta: 'எனக்கு ஓய்வு தேவை', text_hi: 'मुझे आराम चाहिए', icon: '🛏️', severity: 'low', sort_order: 4 }
];

export const MOCK_QUESTIONS = [
  // Stomach pain (phrase_id=1)
  { id: 1, phrase_id: 1, question_en: 'How long have you had this pain?', question_ta: 'இந்த வலி எவ்வளவு நேரமாக இருக்கிறது?', question_hi: 'यह दर्द कब से है?', sort_order: 1 },
  { id: 2, phrase_id: 1, question_en: 'Where exactly is the pain?', question_ta: 'வலி சரியாக எங்கே இருக்கிறது?', question_hi: 'दर्द ठीक कहाँ है?', sort_order: 2 },
  { id: 3, phrase_id: 1, question_en: 'How severe is the pain? (0-10)', question_ta: 'வலி எவ்வளவு கடுமையானது? (0-10)', question_hi: 'दर्द कितना तेज़ है? (0-10)', sort_order: 3 },
  { id: 4, phrase_id: 1, question_en: 'Have you vomited?', question_ta: 'நீங்கள் வாந்தி எடுத்தீர்களா?', question_hi: 'क्या आपको उल्टी हुई है?', sort_order: 4 },
  { id: 5, phrase_id: 1, question_en: 'Did you eat anything unusual?', question_ta: 'ஏதாவது வித்தியாசமாக சாப்பிட்டீர்களா?', question_hi: 'क्या आपने कुछ अलग खाया?', sort_order: 5 },

  // Chest pain (phrase_id=2)
  { id: 6, phrase_id: 2, question_en: 'When did the chest pain start?', question_ta: 'நெஞ்சு வலி எப்போது தொடங்கியது?', question_hi: 'सीने का दर्द कब शुरू हुआ?', sort_order: 1 },
  { id: 7, phrase_id: 2, question_en: 'Does the pain spread to your arm or jaw?', question_ta: 'வலி உங்கள் கை அல்லது தாடைக்கு பரவுகிறதா?', question_hi: 'क्या दर्द बांह या जबड़े तक जाता है?', sort_order: 2 },
  { id: 8, phrase_id: 2, question_en: 'Are you feeling shortness of breath?', question_ta: 'மூச்சு திணறல் இருக்கிறதா?', question_hi: 'क्या आपको साँस लेने में कठिनाई है?', sort_order: 3 },
  { id: 9, phrase_id: 2, question_en: 'Do you have any heart conditions?', question_ta: 'உங்களுக்கு ஏதேனும் இதய நோய் உள்ளதா?', question_hi: 'क्या आपको कोई हृदय रोग है?', sort_order: 4 },

  // Headache (phrase_id=3)
  { id: 10, phrase_id: 3, question_en: 'How long have you had this headache?', question_ta: 'இந்த தலைவலி எவ்வளவு நேரமாக இருக்கிறது?', question_hi: 'यह सिरदर्द कब से है?', sort_order: 1 },
  { id: 11, phrase_id: 3, question_en: 'Did you hit your head?', question_ta: 'உங்கள் தலையில் அடிபட்டதா?', question_hi: 'क्या आपके सिर पर चोट लगी?', sort_order: 2 },
  { id: 12, phrase_id: 3, question_en: 'Do you feel nauseous?', question_ta: 'குமட்டல் உணர்வு இருக்கிறதா?', question_hi: 'क्या जी मिचला रहा है?', sort_order: 3 },

  // Breathing difficulty (phrase_id=5)
  { id: 13, phrase_id: 5, question_en: 'Do you have asthma?', question_ta: 'உங்களுக்கு ஆஸ்துமா இருக்கிறதா?', question_hi: 'क्या आपको अस्थमा है?', sort_order: 1 },
  { id: 14, phrase_id: 5, question_en: 'When did breathing become difficult?', question_ta: 'சுவாசிப்பது எப்போது கடினமானது?', question_hi: 'साँस लेना कब मुश्किल हुआ?', sort_order: 2 },
  { id: 15, phrase_id: 5, question_en: 'Are you feeling tightness in your chest?', question_ta: 'நெஞ்சில் இறுக்கம் இருக்கிறதா?', question_hi: 'क्या सीने में जकड़न है?', sort_order: 3 },

  // Bleeding (phrase_id=7)
  { id: 16, phrase_id: 7, question_en: 'Where is the bleeding?', question_ta: 'ரத்தம் எங்கிருந்து வருகிறது?', question_hi: 'खून कहाँ से बह रहा है?', sort_order: 1 },
  { id: 17, phrase_id: 7, question_en: 'How did you get injured?', question_ta: 'எப்படி காயமடைந்தீர்கள்?', question_hi: 'चोट कैसे लगी?', sort_order: 2 },
  { id: 18, phrase_id: 7, question_en: 'Is the bleeding heavy?', question_ta: 'அதிகமாக ரத்தம் வருகிறதா?', question_hi: 'क्या ज़्यादा खून बह रहा है?', sort_order: 3 },

  // General assistance (phrase_id=6, 22)
  { id: 19, phrase_id: 6, question_en: 'Can you describe what happened?', question_ta: 'என்ன நடந்தது என்று சொல்ல முடியுமா?', question_hi: 'क्या हुआ बता सकते हैं?', sort_order: 1 },
  { id: 20, phrase_id: 22, question_en: 'What kind of help do you need?', question_ta: 'உங்களுக்கு என்ன வகையான உதவி தேவை?', question_hi: 'आपको किस तरह की मदद चाहिए?', sort_order: 1 }
];

export const MOCK_OPTIONS = [
  // Options for question 1 (Stomach pain duration)
  { id: 1, question_id: 1, option_en: 'Less than 1 hour', option_ta: '1 மணி நேரத்திற்கும் குறைவாக', option_hi: '1 घंटे से कम', sort_order: 1 },
  { id: 2, question_id: 1, option_en: '1-3 hours', option_ta: '1-3 மணி நேரம்', option_hi: '1-3 घंटे', sort_order: 2 },
  { id: 3, question_id: 1, option_en: '3-12 hours', option_ta: '3-12 மணி நேரம்', option_hi: '3-12 घंटे', sort_order: 3 },
  { id: 4, question_id: 1, option_en: 'More than 12 hours', option_ta: '12 மணி நேரத்திற்கும் மேல்', option_hi: '12 घंटे से ज़्यादा', sort_order: 4 },
  { id: 5, question_id: 1, option_en: 'More than 1 day', option_ta: '1 நாளுக்கும் மேல்', option_hi: '1 दिन से ज़्यादा', sort_order: 5 },

  // Options for question 2 (Stomach pain location)
  { id: 6, question_id: 2, option_en: 'Upper abdomen', option_ta: 'மேல் வயிறு', option_hi: 'ऊपरी पेट', sort_order: 1 },
  { id: 7, question_id: 2, option_en: 'Lower abdomen', option_ta: 'கீழ் வயிறு', option_hi: 'निचला पेट', sort_order: 2 },
  { id: 8, question_id: 2, option_en: 'Left side', option_ta: 'இடது பக்கம்', option_hi: 'बाईं तरफ़', sort_order: 3 },
  { id: 9, question_id: 2, option_en: 'Right side', option_ta: 'வலது பக்கம்', option_hi: 'दाईं तरफ़', sort_order: 4 },
  { id: 10, question_id: 2, option_en: 'All over', option_ta: 'முழு வயிறும்', option_hi: 'पूरे पेट में', sort_order: 5 },

  // Options for question 4 (Vomiting)
  { id: 11, question_id: 4, option_en: 'Yes', option_ta: 'ஆம்', option_hi: 'हाँ', sort_order: 1 },
  { id: 12, question_id: 4, option_en: 'No', option_ta: 'இல்லை', option_hi: 'नहीं', sort_order: 2 },
  { id: 13, question_id: 4, option_en: 'Feeling nauseous', option_ta: 'குமட்டல் இருக்கிறது', option_hi: 'जी मिचला रहा है', sort_order: 3 },

  // Options for question 5 (Unusual food)
  { id: 14, question_id: 5, option_en: 'Yes', option_ta: 'ஆம்', option_hi: 'हाँ', sort_order: 1 },
  { id: 15, question_id: 5, option_en: 'No', option_ta: 'இல்லை', option_hi: 'नहीं', sort_order: 2 },
  { id: 16, question_id: 5, option_en: 'Not sure', option_ta: 'தெரியவில்லை', option_hi: 'पता नहीं', sort_order: 3 },

  // Options for question 6 (Chest pain start)
  { id: 17, question_id: 6, option_en: 'Just now', option_ta: 'இப்போது தான்', option_hi: 'अभी-अभी', sort_order: 1 },
  { id: 18, question_id: 6, option_en: 'A few minutes ago', option_ta: 'சில நிமிடங்களுக்கு முன்', option_hi: 'कुछ मिनट पहले', sort_order: 2 },
  { id: 19, question_id: 6, option_en: 'More than 30 minutes', option_ta: '30 நிமிடங்களுக்கு மேல்', option_hi: '30 मिनट से ज़्यादा', sort_order: 3 },
  { id: 20, question_id: 6, option_en: 'On and off today', option_ta: 'இன்று இடையிடையே', option_hi: 'आज आता-जाता रहा', sort_order: 4 },

  // Options for question 7 (Spread to arm/jaw)
  { id: 21, question_id: 7, option_en: 'Yes, to my left arm', option_ta: 'ஆம், இடது கைக்கு', option_hi: 'हाँ, बाएँ हाथ तक', sort_order: 1 },
  { id: 22, question_id: 7, option_en: 'Yes, to my jaw', option_ta: 'ஆம், தாடைக்கு', option_hi: 'हाँ, जबड़े तक', sort_order: 2 },
  { id: 23, question_id: 7, option_en: 'No', option_ta: 'இல்லை', option_hi: 'नहीं', sort_order: 3 },

  // Options for question 8 (Shortness of breath)
  { id: 24, question_id: 8, option_en: 'Yes', option_ta: 'ஆம்', option_hi: 'हाँ', sort_order: 1 },
  { id: 25, question_id: 8, option_en: 'No', option_ta: 'இல்லை', option_hi: 'नहीं', sort_order: 2 },
  { id: 26, question_id: 8, option_en: 'Not sure', option_ta: 'தெரியவில்லை', option_hi: 'पता नहीं', sort_order: 3 },

  // Options for question 9 (Heart conditions)
  { id: 27, question_id: 9, option_en: 'Yes', option_ta: 'ஆம்', option_hi: 'हाँ', sort_order: 1 },
  { id: 28, question_id: 9, option_en: 'No', option_ta: 'இல்லை', option_hi: 'नहीं', sort_order: 2 },
  { id: 29, question_id: 9, option_en: 'Not sure', option_ta: 'தெரியவில்லை', option_hi: 'पता नहीं', sort_order: 3 },

  // Options for question 10 (Headache duration)
  { id: 30, question_id: 10, option_en: 'Less than 1 hour', option_ta: '1 மணி நேரத்திற்கும் குறைவாக', option_hi: '1 घंटे से कम', sort_order: 1 },
  { id: 31, question_id: 10, option_en: '1-6 hours', option_ta: '1-6 மணி நேரம்', option_hi: '1-6 घंटे', sort_order: 2 },
  { id: 32, question_id: 10, option_en: 'Since yesterday', option_ta: 'நேற்றிலிருந்து', option_hi: 'कल से', sort_order: 3 },
  { id: 33, question_id: 10, option_en: 'Multiple days', option_ta: 'பல நாட்கள்', option_hi: 'कई दिनों से', sort_order: 4 },

  // Options for question 11 (Hit head)
  { id: 34, question_id: 11, option_en: 'Yes', option_ta: 'ஆம்', option_hi: 'हाँ', sort_order: 1 },
  { id: 35, question_id: 11, option_en: 'No', option_ta: 'இல்லை', option_hi: 'नहीं', sort_order: 2 },
  { id: 36, question_id: 11, option_en: 'Not sure', option_ta: 'தெரியவில்லை', option_hi: 'पता नहीं', sort_order: 3 },

  // Options for question 12 (Nauseous with headache)
  { id: 37, question_id: 12, option_en: 'Yes', option_ta: 'ஆம்', option_hi: 'हाँ', sort_order: 1 },
  { id: 38, question_id: 12, option_en: 'No', option_ta: 'இல்லை', option_hi: 'नहीं', sort_order: 2 },
  { id: 39, question_id: 12, option_en: 'Not sure', option_ta: 'தெரியவில்லை', option_hi: 'पता नहीं', sort_order: 3 },

  // Options for question 13 (Asthma)
  { id: 40, question_id: 13, option_en: 'Yes', option_ta: 'ஆம்', option_hi: 'हाँ', sort_order: 1 },
  { id: 41, question_id: 13, option_en: 'No', option_ta: 'இல்லை', option_hi: 'नहीं', sort_order: 2 },
  { id: 42, question_id: 13, option_en: 'Not sure', option_ta: 'தெரியவில்லை', option_hi: 'पता नहीं', sort_order: 3 },

  // Options for question 14 (Difficulty breathing when)
  { id: 43, question_id: 14, option_en: 'Just now', option_ta: 'இப்போது தான்', option_hi: 'अभी-अभी', sort_order: 1 },
  { id: 44, question_id: 14, option_en: 'Today', option_ta: 'இன்று', option_hi: 'आज', sort_order: 2 },
  { id: 45, question_id: 14, option_en: 'A few days ago', option_ta: 'சில நாட்களுக்கு முன்', option_hi: 'कुछ दिनों पहले', sort_order: 3 },

  // Options for question 15 (Tightness in chest)
  { id: 46, question_id: 15, option_en: 'Yes', option_ta: 'ஆம்', option_hi: 'हाँ', sort_order: 1 },
  { id: 47, question_id: 15, option_en: 'No', option_ta: 'இல்லை', option_hi: 'नहीं', sort_order: 2 },
  { id: 48, question_id: 15, option_en: 'Not sure', option_ta: 'தெரியவில்லை', option_hi: 'पता नहीं', sort_order: 3 },

  // Options for question 16 (Where is bleeding)
  { id: 49, question_id: 16, option_en: 'Head', option_ta: 'தலை', option_hi: 'सिर', sort_order: 1 },
  { id: 50, question_id: 16, option_en: 'Arm/Hand', option_ta: 'கை', option_hi: 'हाथ/बांह', sort_order: 2 },
  { id: 51, question_id: 16, option_en: 'Leg/Foot', option_ta: 'கால்', option_hi: 'पैर', sort_order: 3 },
  { id: 52, question_id: 16, option_en: 'Abdomen', option_ta: 'வயிறு', option_hi: 'पेट', sort_order: 4 },
  { id: 53, question_id: 16, option_en: 'Other', option_ta: 'மற்றவை', option_hi: 'अन्य', sort_order: 5 },

  // Options for question 17 (How injured)
  { id: 54, question_id: 17, option_en: 'Fall', option_ta: 'விழுந்தேன்', option_hi: 'गिर गया', sort_order: 1 },
  { id: 55, question_id: 17, option_en: 'Cut', option_ta: 'வெட்டு', option_hi: 'कट गया', sort_order: 2 },
  { id: 56, question_id: 17, option_en: 'Accident', option_ta: 'விபத்து', option_hi: 'दुर्घटना', sort_order: 3 },
  { id: 57, question_id: 17, option_en: 'Do not know', option_ta: 'தெரியவில்லை', option_hi: 'पता नहीं', sort_order: 4 },

  // Options for question 18 (Bleeding heavy)
  { id: 58, question_id: 18, option_en: 'Yes, a lot', option_ta: 'ஆம், நிறைய', option_hi: 'हाँ, बहुत', sort_order: 1 },
  { id: 59, question_id: 18, option_en: 'A little', option_ta: 'கொஞ்சம்', option_hi: 'थोड़ा', sort_order: 2 },
  { id: 60, question_id: 18, option_en: 'It has stopped', option_ta: 'நிறுத்தியுள்ளது', option_hi: 'रुक गया है', sort_order: 3 },

  // Options for question 19 (What happened)
  { id: 61, question_id: 19, option_en: 'I fell down', option_ta: 'நான் விழுந்துவிட்டேன்', option_hi: 'मैं गिर गया', sort_order: 1 },
  { id: 62, question_id: 19, option_en: 'I feel very sick', option_ta: 'மிகவும் உடல்நிலை சரியில்லை', option_hi: 'तबीयत बहुत ख़राब है', sort_order: 2 },
  { id: 63, question_id: 19, option_en: 'Someone hurt me', option_ta: 'யாரோ என்னை காயப்படுத்தினார்', option_hi: 'किसी ने मुझे चोट पहुँचाई', sort_order: 3 },

  // Options for question 20 (Kind of help)
  { id: 64, question_id: 20, option_en: 'Medical help', option_ta: 'மருத்துவ உதவி', option_hi: 'चिकित्सा सहायता', sort_order: 1 },
  { id: 65, question_id: 20, option_en: 'Police help', option_ta: 'காவல்துறை உதவி', option_hi: 'पुलिस सहायता', sort_order: 2 },
  { id: 66, question_id: 20, option_en: 'Someone to talk to', option_ta: 'யாரிடமாவது பேச', option_hi: 'किसी से बात करनी है', sort_order: 3 },
  { id: 67, question_id: 20, option_en: 'I need to go home', option_ta: 'வீட்டுக்கு போக வேண்டும்', option_hi: 'घर जाना है', sort_order: 4 }
];
