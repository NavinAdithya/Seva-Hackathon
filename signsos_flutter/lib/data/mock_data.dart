import '../models/models.dart';

const List<EmergencyPhrase> allPhrases = [
  // Medical
  EmergencyPhrase(id: 1, category: 'medical', subcategory: 'pain', textEn: 'I have stomach pain', textTa: 'எனக்கு வயிற்று வலி', textHi: 'मेरे पेट में दर्द है', icon: '🤢', severity: 'high', sortOrder: 1),
  EmergencyPhrase(id: 2, category: 'medical', subcategory: 'pain', textEn: 'I have chest pain', textTa: 'எனக்கு நெஞ்சு வலி', textHi: 'मेरे सीने में दर्द है', icon: '💔', severity: 'critical', sortOrder: 2),
  EmergencyPhrase(id: 3, category: 'medical', subcategory: 'pain', textEn: 'I have a headache', textTa: 'எனக்கு தலைவலி', textHi: 'मेरे सिर में दर्द है', icon: '🤕', severity: 'medium', sortOrder: 3),
  EmergencyPhrase(id: 4, category: 'medical', subcategory: 'pain', textEn: 'My body is hurting', textTa: 'என் உடம்பு வலிக்கிறது', textHi: 'मेरे शरीर में दर्द है', icon: '😣', severity: 'high', sortOrder: 4),
  EmergencyPhrase(id: 5, category: 'medical', subcategory: 'breathing', textEn: 'I cannot breathe properly', textTa: 'என்னால் சரியாக சுவாசிக்க முடியவில்லை', textHi: 'मुझे ठीक से साँस नहीं आ रही', icon: '😮‍💨', severity: 'critical', sortOrder: 5),
  EmergencyPhrase(id: 6, category: 'medical', subcategory: 'general', textEn: 'I need medical assistance', textTa: 'எனக்கு மருத்துவ உதவி தேவை', textHi: 'मुझे चिकित्सा सहायता चाहिए', icon: '🏥', severity: 'high', sortOrder: 6),
  EmergencyPhrase(id: 7, category: 'medical', subcategory: 'injury', textEn: 'I am bleeding', textTa: 'எனக்கு ரத்தம் வருகிறது', textHi: 'मुझे खून बह रहा है', icon: '🩸', severity: 'critical', sortOrder: 7),
  EmergencyPhrase(id: 8, category: 'medical', subcategory: 'general', textEn: 'I feel dizzy and faint', textTa: 'எனக்கு தலை சுற்றுகிறது', textHi: 'मुझे चक्कर आ रहे हैं', icon: '💫', severity: 'high', sortOrder: 8),
  EmergencyPhrase(id: 9, category: 'medical', subcategory: 'allergy', textEn: 'I am having an allergic reaction', textTa: 'எனக்கு ஒவ்வாமை ஏற்பட்டுள்ளது', textHi: 'मुझे एलर्जी हो रही है', icon: '🤧', severity: 'critical', sortOrder: 9),
  EmergencyPhrase(id: 10, category: 'medical', subcategory: 'fever', textEn: 'I have a high fever', textTa: 'எனக்கு அதிக காய்ச்சல்', textHi: 'मुझे तेज़ बुखार है', icon: '🤒', severity: 'high', sortOrder: 10),

  // Safety
  EmergencyPhrase(id: 11, category: 'safety', subcategory: 'threat', textEn: 'I feel unsafe', textTa: 'நான் பாதுகாப்பற்றதாக உணர்கிறேன்', textHi: 'मुझे असुरक्षित लग रहा है', icon: '⚠️', severity: 'high', sortOrder: 1),
  EmergencyPhrase(id: 12, category: 'safety', subcategory: 'threat', textEn: 'Someone is following me', textTa: 'யாரோ என்னைப் பின்தொடர்கிறார்கள்', textHi: 'कोई मेरा पीछा कर रहा है', icon: '👤', severity: 'critical', sortOrder: 2),
  EmergencyPhrase(id: 13, category: 'safety', subcategory: 'lost', textEn: 'I am lost and need directions', textTa: 'நான் வழி தெரியாமல் இருக்கிறேன்', textHi: 'मैं रास्ता भटक गया हूँ', icon: '🗺️', severity: 'medium', sortOrder: 3),
  EmergencyPhrase(id: 14, category: 'safety', subcategory: 'harassment', textEn: 'I am being harassed', textTa: 'நான் தொல்லைக்கு ஆளாகிறேன்', textHi: 'मुझे परेशान किया जा रहा है', icon: '🚫', severity: 'critical', sortOrder: 4),

  // Fire
  EmergencyPhrase(id: 15, category: 'fire', subcategory: 'fire', textEn: 'There is a fire', textTa: 'தீ பிடித்துள்ளது', textHi: 'आग लगी है', icon: '🔥', severity: 'critical', sortOrder: 1),
  EmergencyPhrase(id: 16, category: 'fire', subcategory: 'smoke', textEn: 'I smell smoke', textTa: 'புகை வாசனை வருகிறது', textHi: 'धुआँ आ रहा है', icon: '🌫️', severity: 'high', sortOrder: 2),
  EmergencyPhrase(id: 17, category: 'fire', subcategory: 'trapped', textEn: 'I am trapped and cannot exit', textTa: 'நான் சிக்கியுள்ளேன், வெளியேற முடியவில்லை', textHi: 'मैं फँसा हुआ हूँ, बाहर नहीं निकल पा रहा', icon: '🚪', severity: 'critical', sortOrder: 3),

  // Disaster
  EmergencyPhrase(id: 18, category: 'disaster', subcategory: 'flood', textEn: 'There is flooding here', textTa: 'இங்கே வெள்ளம் வந்துள்ளது', textHi: 'यहाँ बाढ़ आई है', icon: '🌊', severity: 'critical', sortOrder: 1),
  EmergencyPhrase(id: 19, category: 'disaster', subcategory: 'earthquake', textEn: 'There was an earthquake', textTa: 'நிலநடுக்கம் ஏற்பட்டது', textHi: 'भूकंप आया है', icon: '🏚️', severity: 'critical', sortOrder: 2),

  // Accident
  EmergencyPhrase(id: 20, category: 'accident', subcategory: 'vehicle', textEn: 'There has been a road accident', textTa: 'சாலை விபத்து ஏற்பட்டுள்ளது', textHi: 'सड़क दुर्घटना हुई है', icon: '🚗', severity: 'critical', sortOrder: 1),
  EmergencyPhrase(id: 21, category: 'accident', subcategory: 'fall', textEn: 'Someone has fallen and is injured', textTa: 'யாரோ விழுந்து காயமடைந்துள்ளார்', textHi: 'कोई गिर गया है और घायल है', icon: '🤕', severity: 'high', sortOrder: 2),

  // General
  EmergencyPhrase(id: 22, category: 'general', subcategory: 'help', textEn: 'I need help urgently', textTa: 'எனக்கு அவசரமாக உதவி தேவை', textHi: 'मुझे तुरंत मदद चाहिए', icon: '🆘', severity: 'high', sortOrder: 1),
  EmergencyPhrase(id: 23, category: 'general', subcategory: 'water', textEn: 'I need water', textTa: 'எனக்கு தண்ணீர் தேவை', textHi: 'मुझे पानी चाहिए', icon: '💧', severity: 'medium', sortOrder: 2),
  EmergencyPhrase(id: 24, category: 'general', subcategory: 'food', textEn: 'I need food', textTa: 'எனக்கு உணவு தேவை', textHi: 'मुझे खाना चाहिए', icon: '🍽️', severity: 'medium', sortOrder: 3),
  EmergencyPhrase(id: 25, category: 'general', subcategory: 'rest', textEn: 'I need to rest', textTa: 'எனக்கு ஓய்வு தேவை', textHi: 'मुझे आराम चाहिए', icon: '🛏️', severity: 'low', sortOrder: 4),
];

const List<ResponderQuestion> allQuestions = [
  // Stomach pain (phrase_id=1)
  ResponderQuestion(id: 1, phraseId: 1, questionEn: 'How long have you had this pain?', questionTa: 'இந்த வலி எவ்வளவு நேரமாக இருக்கிறது?', questionHi: 'यह दर्द कब से है?', sortOrder: 1),
  ResponderQuestion(id: 2, phraseId: 1, questionEn: 'Where exactly is the pain?', questionTa: 'வலி சரியாக எங்கே இருக்கிறது?', questionHi: 'दर्द ठीक कहाँ है?', sortOrder: 2),
  ResponderQuestion(id: 3, phraseId: 1, questionEn: 'How severe is the pain? (0-10)', questionTa: 'வலி எவ்வளவு கடுமையானது? (0-10)', questionHi: 'दर्द कितना तेज़ है? (0-10)', sortOrder: 3),
  ResponderQuestion(id: 4, phraseId: 1, questionEn: 'Have you vomited?', questionTa: 'நீங்கள் வாந்தி எடுத்தீர்களா?', questionHi: 'क्या आपको उल्टी हुई है?', sortOrder: 4),
  ResponderQuestion(id: 5, phraseId: 1, questionEn: 'Did you eat anything unusual?', questionTa: 'ஏதாவது வித்தியாசமாக சாப்பிட்டீர்களா?', questionHi: 'क्या आपने कुछ अलग खाया?', sortOrder: 5),

  // Chest pain (phrase_id=2)
  ResponderQuestion(id: 6, phraseId: 2, questionEn: 'When did the chest pain start?', questionTa: 'நெஞ்சு வலி எப்போது தொடங்கியது?', questionHi: 'सीने का दर्द कब शुरू हुआ?', sortOrder: 1),
  ResponderQuestion(id: 7, phraseId: 2, questionEn: 'Does the pain spread to your arm or jaw?', questionTa: 'வலி உங்கள் கை அல்லது தாடைக்கு பரவுகிறதா?', questionHi: 'क्या दर्द बांह या जबड़े तक जाता है?', sortOrder: 2),
  ResponderQuestion(id: 8, phraseId: 2, questionEn: 'Are you feeling shortness of breath?', questionTa: 'மூச்சு திணறல் இருக்கிறதா?', questionHi: 'क्या आपको साँस लेने में कठिनाई है?', sortOrder: 3),
  ResponderQuestion(id: 9, phraseId: 2, questionEn: 'Do you have any heart conditions?', questionTa: 'உங்களுக்கு ஏதேனும் இதய நோய் உள்ளதா?', questionHi: 'क्या आपको कोई हृदय रोग है?', sortOrder: 4),

  // Headache (phrase_id=3)
  ResponderQuestion(id: 10, phraseId: 3, questionEn: 'How long have you had this headache?', questionTa: 'இந்த தலைவலி எவ்வளவு நேரமாக இருக்கிறது?', questionHi: 'यह सिरदर्द कब से है?', sortOrder: 1),
  ResponderQuestion(id: 11, phraseId: 3, questionEn: 'Did you hit your head?', questionTa: 'உங்கள் தலையில் அடிபட்டதா?', questionHi: 'क्या आपके सिर पर चोट लगी?', sortOrder: 2),
  ResponderQuestion(id: 12, phraseId: 3, questionEn: 'Do you feel nauseous?', questionTa: 'குமட்டல் உணர்வு இருக்கிறதா?', questionHi: 'क्या जी मिचला रहा है?', sortOrder: 3),

  // Breathing (phrase_id=5)
  ResponderQuestion(id: 13, phraseId: 5, questionEn: 'Do you have asthma?', questionTa: 'உங்களுக்கு ஆஸ்துமா இருக்கிறதா?', questionHi: 'क्या आपको अस्थमा है?', sortOrder: 1),
  ResponderQuestion(id: 14, phraseId: 5, questionEn: 'When did breathing become difficult?', questionTa: 'சுவாசிப்பது எப்போது கடினமானது?', questionHi: 'साँस लेना कब मुश्किल हुआ?', sortOrder: 2),
  ResponderQuestion(id: 15, phraseId: 5, questionEn: 'Are you feeling tightness in your chest?', questionTa: 'நெஞ்சில் இறுக்கம் இருக்கிறதா?', questionHi: 'क्या सीने में जकड़न है?', sortOrder: 3),

  // Bleeding (phrase_id=7)
  ResponderQuestion(id: 16, phraseId: 7, questionEn: 'Where is the bleeding?', questionTa: 'ரத்தம் எங்கிருந்து வருகிறது?', questionHi: 'खून कहाँ से बह रहा है?', sortOrder: 1),
  ResponderQuestion(id: 17, phraseId: 7, questionEn: 'How did you get injured?', questionTa: 'எப்படி காயமடைந்தீர்கள்?', questionHi: 'चोट कैसे लगी?', sortOrder: 2),
  ResponderQuestion(id: 18, phraseId: 7, questionEn: 'Is the bleeding heavy?', questionTa: 'அதிகமாக ரத்தம் வருகிறதா?', questionHi: 'क्या ज़्यादा खून बह रहा है?', sortOrder: 3),

  // General assistance (phrase_id=6, 22)
  ResponderQuestion(id: 19, phraseId: 6, questionEn: 'Can you describe what happened?', questionTa: 'என்ன நடந்தது என்று சொல்ல முடியுமா?', questionHi: 'क्या हुआ बता सकते हैं?', sortOrder: 1),
  ResponderQuestion(id: 20, phraseId: 22, questionEn: 'What kind of help do you need?', questionTa: 'உங்களுக்கு என்ன வகையான உதவி தேவை?', questionHi: 'आपको किस तरह की मदद चाहिए?', sortOrder: 1),
];

const List<QuestionOption> allOptions = [
  // For Q1 (Stomach pain duration)
  QuestionOption(id: 1, questionId: 1, optionEn: 'Less than 1 hour', optionTa: '1 மணி நேரத்திற்கும் குறைவாக', optionHi: '1 घंटे से कम', sortOrder: 1),
  QuestionOption(id: 2, questionId: 1, optionEn: '1-3 hours', optionTa: '1-3 மணி நேரம்', optionHi: '1-3 घंटे', sortOrder: 2),
  QuestionOption(id: 3, questionId: 1, optionEn: '3-12 hours', optionTa: '3-12 மணி நேரம்', optionHi: '3-12 घंटे', sortOrder: 3),
  QuestionOption(id: 4, questionId: 1, optionEn: 'More than 12 hours', optionTa: '12 மணி நேரத்திற்கும் மேல்', optionHi: '12 घंटे से ज़्यादा', sortOrder: 4),

  // For Q2 (Stomach pain location)
  QuestionOption(id: 6, questionId: 2, optionEn: 'Upper abdomen', optionTa: 'மேல் வயிறு', optionHi: 'ऊपरी पेट', sortOrder: 1),
  QuestionOption(id: 7, questionId: 2, optionEn: 'Lower abdomen', optionTa: 'கீழ் வயிறு', optionHi: 'निचला पेट', sortOrder: 2),
  QuestionOption(id: 8, questionId: 2, optionEn: 'Left side', optionTa: 'இடது பக்கம்', optionHi: 'बाईं तरफ़', sortOrder: 3),
  QuestionOption(id: 9, questionId: 2, optionEn: 'Right side', optionTa: 'வலது பக்கம்', optionHi: 'दाईं तरफ़', sortOrder: 4),
  QuestionOption(id: 10, questionId: 2, optionEn: 'All over', optionTa: 'முழு வயிறும்', optionHi: 'पूरे पेट में', sortOrder: 5),

  // For Q3 (0-10 severity)
  QuestionOption(id: 111, questionId: 3, optionEn: 'Mild (1-3)', optionTa: 'லேசானது (1-3)', optionHi: 'हल्का (1-3)', sortOrder: 1),
  QuestionOption(id: 112, questionId: 3, optionEn: 'Moderate (4-6)', optionTa: 'மிதமானது (4-6)', optionHi: 'मध्यम (4-6)', sortOrder: 2),
  QuestionOption(id: 113, questionId: 3, optionEn: 'Severe (7-10)', optionTa: 'கடுமையானது (7-10)', optionHi: 'गंभीर (7-10)', sortOrder: 3),

  // For Q4 (Vomiting)
  QuestionOption(id: 11, questionId: 4, optionEn: 'Yes', optionTa: 'ஆம்', optionHi: 'हाँ', sortOrder: 1),
  QuestionOption(id: 12, questionId: 4, optionEn: 'No', optionTa: 'இல்லை', optionHi: 'नहीं', sortOrder: 2),
  QuestionOption(id: 13, questionId: 4, optionEn: 'Feeling nauseous', optionTa: 'குமட்டல் இருக்கிறது', optionHi: 'जी मिचला रहा है', sortOrder: 3),

  // For Q5 (Unusual food)
  QuestionOption(id: 14, questionId: 5, optionEn: 'Yes', optionTa: 'ஆம்', optionHi: 'हाँ', sortOrder: 1),
  QuestionOption(id: 15, questionId: 5, optionEn: 'No', optionTa: 'இல்லை', optionHi: 'नहीं', sortOrder: 2),
  QuestionOption(id: 16, questionId: 5, optionEn: 'Not sure', optionTa: 'தெரியவில்லை', optionHi: 'पता नहीं', sortOrder: 3),

  // For Q6 (Chest pain start)
  QuestionOption(id: 17, questionId: 6, optionEn: 'Just now', optionTa: 'இப்போது தான்', optionHi: 'अभी-अभी', sortOrder: 1),
  QuestionOption(id: 18, questionId: 6, optionEn: 'A few minutes ago', optionTa: 'சில நிமிடங்களுக்கு முன்', optionHi: 'कुछ मिनट पहले', sortOrder: 2),
  QuestionOption(id: 19, questionId: 6, optionEn: 'More than 30 mins', optionTa: '30 நிமிடங்களுக்கு மேல்', optionHi: '30 मिनट से ज़्यादा', sortOrder: 3),

  // For Q7 (Arm/jaw radiation)
  QuestionOption(id: 21, questionId: 7, optionEn: 'Yes, left arm', optionTa: 'ஆம், இடது கைக்கு', optionHi: 'हाँ, बाएँ हाथ तक', sortOrder: 1),
  QuestionOption(id: 22, questionId: 7, optionEn: 'Yes, to jaw', optionTa: 'ஆம், தாடைக்கு', optionHi: 'हाँ, जबड़े तक', sortOrder: 2),
  QuestionOption(id: 23, questionId: 7, optionEn: 'No', optionTa: 'இல்லை', optionHi: 'नहीं', sortOrder: 3),

  // For Q8 (Shortness of breath)
  QuestionOption(id: 24, questionId: 8, optionEn: 'Yes', optionTa: 'ஆம்', optionHi: 'हाँ', sortOrder: 1),
  QuestionOption(id: 25, questionId: 8, optionEn: 'No', optionTa: 'இல்லை', optionHi: 'नहीं', sortOrder: 2),

  // For Q9 (Heart conditions)
  QuestionOption(id: 27, questionId: 9, optionEn: 'Yes (Cardiac history)', optionTa: 'ஆம் (இதய நோய் வரலாறு)', optionHi: 'हाँ (हृदय रोग इतिहास)', sortOrder: 1),
  QuestionOption(id: 28, questionId: 9, optionEn: 'No', optionTa: 'இல்லை', optionHi: 'नहीं', sortOrder: 2),

  // For Q10 (Headache duration)
  QuestionOption(id: 30, questionId: 10, optionEn: 'Less than 1 hour', optionTa: '1 மணி நேரத்திற்கும் குறைவாக', optionHi: '1 घंटे से कम', sortOrder: 1),
  QuestionOption(id: 31, questionId: 10, optionEn: '1-6 hours', optionTa: '1-6 மணி நேரம்', optionHi: '1-6 घंटे', sortOrder: 2),
  QuestionOption(id: 32, questionId: 10, optionEn: 'Since yesterday', optionTa: 'நேற்றிலிருந்து', optionHi: 'कल से', sortOrder: 3),

  // For Q11 (Hit head)
  QuestionOption(id: 34, questionId: 11, optionEn: 'Yes, head injury', optionTa: 'ஆம், தலையில் காயம்', optionHi: 'हाँ, सिर में चोट', sortOrder: 1),
  QuestionOption(id: 35, questionId: 11, optionEn: 'No', optionTa: 'இல்லை', optionHi: 'नहीं', sortOrder: 2),

  // For Q12 (Nausea)
  QuestionOption(id: 37, questionId: 12, optionEn: 'Yes', optionTa: 'ஆம்', optionHi: 'हाँ', sortOrder: 1),
  QuestionOption(id: 38, questionId: 12, optionEn: 'No', optionTa: 'இல்லை', optionHi: 'नहीं', sortOrder: 2),

  // For Q13 (Asthma)
  QuestionOption(id: 40, questionId: 13, optionEn: 'Yes, have asthma', optionTa: 'ஆம், ஆஸ்துமா உள்ளது', optionHi: 'हाँ, अस्थमा है', sortOrder: 1),
  QuestionOption(id: 41, questionId: 13, optionEn: 'No', optionTa: 'இல்லை', optionHi: 'नहीं', sortOrder: 2),

  // For Q16 (Where is bleeding)
  QuestionOption(id: 49, questionId: 16, optionEn: 'Head', optionTa: 'தலை', optionHi: 'सिर', sortOrder: 1),
  QuestionOption(id: 50, questionId: 16, optionEn: 'Arm / Hand', optionTa: 'கை', optionHi: 'हाथ / बांह', sortOrder: 2),
  QuestionOption(id: 51, questionId: 16, optionEn: 'Leg / Foot', optionTa: 'கால்', optionHi: 'पैर', sortOrder: 3),
  QuestionOption(id: 52, questionId: 16, optionEn: 'Abdomen', optionTa: 'வயிறு', optionHi: 'पेट', sortOrder: 4),

  // For Q18 (Bleeding heavy)
  QuestionOption(id: 58, questionId: 18, optionEn: 'Yes, severe bleeding', optionTa: 'ஆம், தீவிர ரத்தப்போக்கு', optionHi: 'हाँ, गंभीर रक्तस्राव', sortOrder: 1),
  QuestionOption(id: 59, questionId: 18, optionEn: 'Minor oozing', optionTa: 'சிறிய கசிவு', optionHi: 'हल्का बह रहा है', sortOrder: 2),
  QuestionOption(id: 60, questionId: 18, optionEn: 'Stopped now', optionTa: 'நின்றுவிட்டது', optionHi: 'रुक गया है', sortOrder: 3),

  // For Q20 (Help kind)
  QuestionOption(id: 64, questionId: 20, optionEn: 'Ambulance / Medical', optionTa: 'ஆம்புலன்ஸ் / மருத்துவம்', optionHi: 'एम्बुलेंस / चिकित्सा', sortOrder: 1),
  QuestionOption(id: 65, questionId: 20, optionEn: 'Police assistance', optionTa: 'காவல்துறை உதவி', optionHi: 'पुलिस सहायता', sortOrder: 2),
  QuestionOption(id: 66, questionId: 20, optionEn: 'Family / Relative call', optionTa: 'குடும்பம் / உறவினர் அழைப்பு', optionHi: 'परिवार / रिश्तेदार को कॉल', sortOrder: 3),
];

const List<PainFace> painFaces = [
  PainFace(score: 0, emoji: '😊', labelEn: 'No Hurt (0)', labelTa: 'வலி இல்லை (0)', labelHi: 'कोई दर्द नहीं (0)'),
  PainFace(score: 2, emoji: '🙂', labelEn: 'Hurts Little (2)', labelTa: 'சிறிய வலி (2)', labelHi: 'हल्का दर्द (2)'),
  PainFace(score: 4, emoji: '😐', labelEn: 'Hurts More (4)', labelTa: 'அதிக வலி (4)', labelHi: 'ज़्यादा दर्द (4)'),
  PainFace(score: 6, emoji: '🙁', labelEn: 'Hurts Even More (6)', labelTa: 'கடுமையான வலி (6)', labelHi: 'और ज़्यादा दर्द (6)'),
  PainFace(score: 8, emoji: '😣', labelEn: 'Hurts Whole Lot (8)', labelTa: 'மிகக் கடுமையான வலி (8)', labelHi: 'बहुत तेज़ दर्द (8)'),
  PainFace(score: 10, emoji: '😭', labelEn: 'Hurts Worst (10)', labelTa: 'தாங்க முடியாத வலி (10)', labelHi: 'असहनीय दर्द (10)'),
];

const EmergencyCard defaultEmergencyCard = EmergencyCard(
  name: 'Ananya Sharma',
  age: 26,
  bloodGroup: 'O+ Positive',
  allergies: 'Penicillin, Shellfish, Dust mites',
  medications: 'Salbutamol Inhaler (PRN), Cetirizine 10mg',
  conditions: 'Mild Asthma, Non-verbal during sensory overload',
  language: 'ta',
  communicationPreferences: ['Visual Cards / AAC', 'Text-to-Speech', 'Gestures'],
  emergencyContacts: [
    EmergencyContact(name: 'Rajesh Sharma (Father)', phone: '+919876543210', relationship: 'Father / Primary Contact'),
    EmergencyContact(name: 'Priya Sharma (Sister)', phone: '+919876543211', relationship: 'Sister / Emergency Contact'),
  ],
);
