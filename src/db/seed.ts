import { getDatabase } from './schema';

export async function seedDatabase(): Promise<void> {
  const db = await getDatabase();
  
  // Check if already seeded
  const result = await db.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM emergency_phrases'
  );
  
  if (result && result.count > 0) return;
  
  await db.execAsync('BEGIN TRANSACTION');
  
  try {
    // ===== MEDICAL PHRASES =====
    await db.runAsync(
      `INSERT INTO emergency_phrases (id, category, subcategory, text_en, text_ta, text_hi, icon, severity, sort_order) VALUES
      (1, 'medical', 'pain', 'I have stomach pain', 'எனக்கு வயிற்று வலி', 'मेरे पेट में दर्द है', '🤢', 'high', 1),
      (2, 'medical', 'pain', 'I have chest pain', 'எனக்கு நெஞ்சு வலி', 'मेरे सीने में दर्द है', '💔', 'critical', 2),
      (3, 'medical', 'pain', 'I have a headache', 'எனக்கு தலைவலி', 'मेरे सिर में दर्द है', '🤕', 'medium', 3),
      (4, 'medical', 'pain', 'My body is hurting', 'என் உடம்பு வலிக்கிறது', 'मेरे शरीर में दर्द है', '😣', 'high', 4),
      (5, 'medical', 'breathing', 'I cannot breathe properly', 'என்னால் சரியாக சுவாசிக்க முடியவில்லை', 'मुझे ठीक से साँस नहीं आ रही', '😮‍💨', 'critical', 5),
      (6, 'medical', 'general', 'I need medical assistance', 'எனக்கு மருத்துவ உதவி தேவை', 'मुझे चिकित्सा सहायता चाहिए', '🏥', 'high', 6),
      (7, 'medical', 'injury', 'I am bleeding', 'எனக்கு ரத்தம் வருகிறது', 'मुझे खून बह रहा है', '🩸', 'critical', 7),
      (8, 'medical', 'general', 'I feel dizzy and faint', 'எனக்கு தலை சுற்றுகிறது', 'मुझे चक्कर आ रहे हैं', '💫', 'high', 8),
      (9, 'medical', 'allergy', 'I am having an allergic reaction', 'எனக்கு ஒவ்வாமை ஏற்பட்டுள்ளது', 'मुझे एलर्जी हो रही है', '🤧', 'critical', 9),
      (10, 'medical', 'fever', 'I have a high fever', 'எனக்கு அதிக காய்ச்சல்', 'मुझे तेज़ बुखार है', '🤒', 'high', 10)`
    );

    // ===== SAFETY PHRASES =====
    await db.runAsync(
      `INSERT INTO emergency_phrases (id, category, subcategory, text_en, text_ta, text_hi, icon, severity, sort_order) VALUES
      (11, 'safety', 'threat', 'I feel unsafe', 'நான் பாதுகாப்பற்றதாக உணர்கிறேன்', 'मुझे असुरक्षित लग रहा है', '⚠️', 'high', 1),
      (12, 'safety', 'threat', 'Someone is following me', 'யாரோ என்னைப் பின்தொடர்கிறார்கள்', 'कोई मेरा पीछा कर रहा है', '👤', 'critical', 2),
      (13, 'safety', 'lost', 'I am lost and need directions', 'நான் வழி தெரியாமல் இருக்கிறேன்', 'मैं रास्ता भटक गया हूँ', '🗺️', 'medium', 3),
      (14, 'safety', 'harassment', 'I am being harassed', 'நான் தொல்லைக்கு ஆளாகிறேன்', 'मुझे परेशान किया जा रहा है', '🚫', 'critical', 4)`
    );

    // ===== FIRE PHRASES =====
    await db.runAsync(
      `INSERT INTO emergency_phrases (id, category, subcategory, text_en, text_ta, text_hi, icon, severity, sort_order) VALUES
      (15, 'fire', 'fire', 'There is a fire', 'தீ பிடித்துள்ளது', 'आग लगी है', '🔥', 'critical', 1),
      (16, 'fire', 'smoke', 'I smell smoke', 'புகை வாசனை வருகிறது', 'धुआँ आ रहा है', '🌫️', 'high', 2),
      (17, 'fire', 'trapped', 'I am trapped and cannot exit', 'நான் சிக்கியுள்ளேன், வெளியேற முடியவில்லை', 'मैं फँसा हुआ हूँ, बाहर नहीं निकल पा रहा', '🚪', 'critical', 3)`
    );

    // ===== NATURAL DISASTER =====
    await db.runAsync(
      `INSERT INTO emergency_phrases (id, category, subcategory, text_en, text_ta, text_hi, icon, severity, sort_order) VALUES
      (18, 'natural_disaster', 'flood', 'There is flooding here', 'இங்கே வெள்ளம் வந்துள்ளது', 'यहाँ बाढ़ आई है', '🌊', 'critical', 1),
      (19, 'natural_disaster', 'earthquake', 'There was an earthquake', 'நிலநடுக்கம் ஏற்பட்டது', 'भूकंप आया है', '🏚️', 'critical', 2)`
    );

    // ===== ACCIDENT =====
    await db.runAsync(
      `INSERT INTO emergency_phrases (id, category, subcategory, text_en, text_ta, text_hi, icon, severity, sort_order) VALUES
      (20, 'accident', 'vehicle', 'There has been a road accident', 'சாலை விபத்து ஏற்பட்டுள்ளது', 'सड़क दुर्घटना हुई है', '🚗', 'critical', 1),
      (21, 'accident', 'fall', 'Someone has fallen and is injured', 'யாரோ விழுந்து காயமடைந்துள்ளார்', 'कोई गिर गया है और घायल है', '🤕', 'high', 2)`
    );

    // ===== GENERAL HELP =====
    await db.runAsync(
      `INSERT INTO emergency_phrases (id, category, subcategory, text_en, text_ta, text_hi, icon, severity, sort_order) VALUES
      (22, 'general', 'help', 'I need help urgently', 'எனக்கு அவசரமாக உதவி தேவை', 'मुझे तुरंत मदद चाहिए', '🆘', 'high', 1),
      (23, 'general', 'water', 'I need water', 'எனக்கு தண்ணீர் தேவை', 'मुझे पानी चाहिए', '💧', 'medium', 2),
      (24, 'general', 'food', 'I need food', 'எனக்கு உணவு தேவை', 'मुझे खाना चाहिए', '🍽️', 'medium', 3),
      (25, 'general', 'rest', 'I need to rest', 'எனக்கு ஓய்வு தேவை', 'मुझे आराम चाहिए', '🛏️', 'low', 4)`
    );

    // ===== RESPONDER QUESTIONS (OPQRST for medical) =====
    
    // For stomach pain (phrase_id=1)
    await db.runAsync(
      `INSERT INTO responder_questions (id, phrase_id, question_en, question_ta, question_hi, sort_order) VALUES
      (1, 1, 'How long have you had this pain?', 'இந்த வலி எவ்வளவு நேரமாக இருக்கிறது?', 'यह दर्द कब से है?', 1),
      (2, 1, 'Where exactly is the pain?', 'வலி சரியாக எங்கே இருக்கிறது?', 'दर्द ठीक कहाँ है?', 2),
      (3, 1, 'How severe is the pain? (0-10)', 'வலி எவ்வளவு கடுமையானது? (0-10)', 'दर्द कितना तेज़ है? (0-10)', 3),
      (4, 1, 'Have you vomited?', 'நீங்கள் வாந்தி எடுத்தீர்களா?', 'क्या आपको उल्टी हुई है?', 4),
      (5, 1, 'Did you eat anything unusual?', 'ஏதாவது வித்தியாசமாக சாப்பிட்டீர்களா?', 'क्या आपने कुछ अलग खाया?', 5)`
    );

    // For chest pain (phrase_id=2)
    await db.runAsync(
      `INSERT INTO responder_questions (id, phrase_id, question_en, question_ta, question_hi, sort_order) VALUES
      (6, 2, 'When did the chest pain start?', 'நெஞ்சு வலி எப்போது தொடங்கியது?', 'सीने का दर्द कब शुरू हुआ?', 1),
      (7, 2, 'Does the pain spread to your arm or jaw?', 'வலி உங்கள் கை அல்லது தாடைக்கு பரவுகிறதா?', 'क्या दर्द बांह या जबड़े तक जाता है?', 2),
      (8, 2, 'Are you feeling shortness of breath?', 'மூச்சு திணறல் இருக்கிறதா?', 'क्या आपको साँस लेने में कठिनाई है?', 3),
      (9, 2, 'Do you have any heart conditions?', 'உங்களுக்கு ஏதேனும் இதய நோய் உள்ளதா?', 'क्या आपको कोई हृदय रोग है?', 4)`
    );

    // For headache (phrase_id=3)
    await db.runAsync(
      `INSERT INTO responder_questions (id, phrase_id, question_en, question_ta, question_hi, sort_order) VALUES
      (10, 3, 'How long have you had this headache?', 'இந்த தலைவலி எவ்வளவு நேரமாக இருக்கிறது?', 'यह सिरदर्द कब से है?', 1),
      (11, 3, 'Did you hit your head?', 'உங்கள் தலையில் அடிபட்டதா?', 'क्या आपके सिर पर चोट लगी?', 2),
      (12, 3, 'Do you feel nauseous?', 'குமட்டல் உணர்வு இருக்கிறதா?', 'क्या जी मिचला रहा है?', 3)`
    );

    // For breathing difficulty (phrase_id=5)
    await db.runAsync(
      `INSERT INTO responder_questions (id, phrase_id, question_en, question_ta, question_hi, sort_order) VALUES
      (13, 5, 'Do you have asthma?', 'உங்களுக்கு ஆஸ்துமா இருக்கிறதா?', 'क्या आपको अस्थमा है?', 1),
      (14, 5, 'When did breathing become difficult?', 'சுவாசிப்பது எப்போது கடினமானது?', 'साँस लेना कब मुश्किल हुआ?', 2),
      (15, 5, 'Are you feeling tightness in your chest?', 'நெஞ்சில் இறுக்கம் இருக்கிறதா?', 'क्या सीने में जकड़न है?', 3)`
    );
    
    // For bleeding (phrase_id=7)
    await db.runAsync(
      `INSERT INTO responder_questions (id, phrase_id, question_en, question_ta, question_hi, sort_order) VALUES
      (16, 7, 'Where is the bleeding?', 'ரத்தம் எங்கிருந்து வருகிறது?', 'खून कहाँ से बह रहा है?', 1),
      (17, 7, 'How did you get injured?', 'எப்படி காயமடைந்தீர்கள்?', 'चोट कैसे लगी?', 2),
      (18, 7, 'Is the bleeding heavy?', 'அதிகமாக ரத்தம் வருகிறதா?', 'क्या ज़्यादा खून बह रहा है?', 3)`
    );

    // General question for any emergency (phrase_id=6 and 22)
    await db.runAsync(
      `INSERT INTO responder_questions (id, phrase_id, question_en, question_ta, question_hi, sort_order) VALUES
      (19, 6, 'Can you describe what happened?', 'என்ன நடந்தது என்று சொல்ல முடியுமா?', 'क्या हुआ बता सकते हैं?', 1),
      (20, 22, 'What kind of help do you need?', 'உங்களுக்கு என்ன வகையான உதவி தேவை?', 'आपको किस तरह की मदद चाहिए?', 1)`
    );

    // ===== QUESTION OPTIONS =====

    // Options for "How long have you had this pain?" (question_id=1)
    await db.runAsync(
      `INSERT INTO question_options (id, question_id, option_en, option_ta, option_hi, sort_order) VALUES
      (1, 1, 'Less than 1 hour', '1 மணி நேரத்திற்கும் குறைவாக', '1 घंटे से कम', 1),
      (2, 1, '1-3 hours', '1-3 மணி நேரம்', '1-3 घंटे', 2),
      (3, 1, '3-12 hours', '3-12 மணி நேரம்', '3-12 घंटे', 3),
      (4, 1, 'More than 12 hours', '12 மணி நேரத்திற்கும் மேல்', '12 घंटे से ज़्यादा', 4),
      (5, 1, 'More than 1 day', '1 நாளுக்கும் மேல்', '1 दिन से ज़्यादा', 5)`
    );

    // Options for "Where exactly is the pain?" (question_id=2)
    await db.runAsync(
      `INSERT INTO question_options (id, question_id, option_en, option_ta, option_hi, sort_order) VALUES
      (6, 2, 'Upper abdomen', 'மேல் வயிறு', 'ऊपरी पेट', 1),
      (7, 2, 'Lower abdomen', 'கீழ் வயிறு', 'निचला पेट', 2),
      (8, 2, 'Left side', 'இடது பக்கம்', 'बाईं तरफ़', 3),
      (9, 2, 'Right side', 'வலது பக்கம்', 'दाईं तरफ़', 4),
      (10, 2, 'All over', 'முழு வயிறும்', 'पूरे पेट में', 5)`
    );

    // Options for "Have you vomited?" (question_id=4)
    await db.runAsync(
      `INSERT INTO question_options (id, question_id, option_en, option_ta, option_hi, sort_order) VALUES
      (11, 4, 'Yes', 'ஆம்', 'हाँ', 1),
      (12, 4, 'No', 'இல்லை', 'नहीं', 2),
      (13, 4, 'Feeling nauseous', 'குமட்டல் இருக்கிறது', 'जी मिचला रहा है', 3)`
    );

    // Options for "Did you eat anything unusual?" (question_id=5)
    await db.runAsync(
      `INSERT INTO question_options (id, question_id, option_en, option_ta, option_hi, sort_order) VALUES
      (14, 5, 'Yes', 'ஆம்', 'हाँ', 1),
      (15, 5, 'No', 'இல்லை', 'नहीं', 2),
      (16, 5, 'Not sure', 'தெரியவில்லை', 'पता नहीं', 3)`
    );

    // Options for chest pain timing (question_id=6)
    await db.runAsync(
      `INSERT INTO question_options (id, question_id, option_en, option_ta, option_hi, sort_order) VALUES
      (17, 6, 'Just now', 'இப்போது தான்', 'अभी-अभी', 1),
      (18, 6, 'A few minutes ago', 'சில நிமிடங்களுக்கு முன்', 'कुछ मिनट पहले', 2),
      (19, 6, 'More than 30 minutes', '30 நிமிடங்களுக்கு மேல்', '30 मिनट से ज़्यादा', 3),
      (20, 6, 'On and off today', 'இன்று இடையிடையே', 'आज आता-जाता रहा', 4)`
    );

    // Options for arm/jaw spread (question_id=7)
    await db.runAsync(
      `INSERT INTO question_options (id, question_id, option_en, option_ta, option_hi, sort_order) VALUES
      (21, 7, 'Yes, to my left arm', 'ஆம், இடது கைக்கு', 'हाँ, बाएँ हाथ तक', 1),
      (22, 7, 'Yes, to my jaw', 'ஆம், தாடைக்கு', 'हाँ, जबड़े तक', 2),
      (23, 7, 'No', 'இல்லை', 'नहीं', 3)`
    );

    // Yes/No/Not sure for common questions (question_ids 8,9,11,12,13,14,15)
    for (const qid of [8, 9, 11, 12, 13, 14, 15]) {
      await db.runAsync(
        `INSERT INTO question_options (question_id, option_en, option_ta, option_hi, sort_order) VALUES
        (?, 'Yes', 'ஆம்', 'हाँ', 1),
        (?, 'No', 'இல்லை', 'नहीं', 2),
        (?, 'Not sure', 'தெரியவில்லை', 'पता नहीं', 3)`,
        qid, qid, qid
      );
    }

    // Options for headache duration (question_id=10)
    await db.runAsync(
      `INSERT INTO question_options (question_id, option_en, option_ta, option_hi, sort_order) VALUES
      (10, 'Less than 1 hour', '1 மணி நேரத்திற்கும் குறைவாக', '1 घंटे से कम', 1),
      (10, '1-6 hours', '1-6 மணி நேரம்', '1-6 घंटे', 2),
      (10, 'Since yesterday', 'நேற்றிலிருந்து', 'कल से', 3),
      (10, 'Multiple days', 'பல நாட்கள்', 'कई दिनों से', 4)`
    );

    // Options for "Where is the bleeding?" (question_id=16)
    await db.runAsync(
      `INSERT INTO question_options (question_id, option_en, option_ta, option_hi, sort_order) VALUES
      (16, 'Head', 'தலை', 'सिर', 1),
      (16, 'Arm/Hand', 'கை', 'हाथ/बांह', 2),
      (16, 'Leg/Foot', 'கால்', 'पैर', 3),
      (16, 'Abdomen', 'வயிறு', 'पेट', 4),
      (16, 'Other', 'மற்றவை', 'अन्य', 5)`
    );

    // Options for "How did you get injured?" (question_id=17)
    await db.runAsync(
      `INSERT INTO question_options (question_id, option_en, option_ta, option_hi, sort_order) VALUES
      (17, 'Fall', 'விழுந்தேன்', 'गिर गया', 1),
      (17, 'Cut', 'வெட்டு', 'कट गया', 2),
      (17, 'Accident', 'விபத்து', 'दुर्घटना', 3),
      (17, 'Do not know', 'தெரியவில்லை', 'पता नहीं', 4)`
    );

    // Options for "Is the bleeding heavy?" (question_id=18)
    await db.runAsync(
      `INSERT INTO question_options (question_id, option_en, option_ta, option_hi, sort_order) VALUES
      (18, 'Yes, a lot', 'ஆம், நிறைய', 'हाँ, बहुत', 1),
      (18, 'A little', 'கொஞ்சம்', 'थोड़ा', 2),
      (18, 'It has stopped', 'நிறுத்தியுள்ளது', 'रुक गया है', 3)`
    );

    // Options for "What kind of help?" (question_id=19, 20)
    await db.runAsync(
      `INSERT INTO question_options (question_id, option_en, option_ta, option_hi, sort_order) VALUES
      (19, 'I fell down', 'நான் விழுந்துவிட்டேன்', 'मैं गिर गया', 1),
      (19, 'I feel very sick', 'மிகவும் உடல்நிலை சரியில்லை', 'तबीयत बहुत ख़राब है', 2),
      (19, 'Someone hurt me', 'யாரோ என்னை காயப்படுத்தினார்', 'किसी ने मुझे चोट पहुँचाई', 3),
      (20, 'Medical help', 'மருத்துவ உதவி', 'चिकित्सा सहायता', 1),
      (20, 'Police help', 'காவல்துறை உதவி', 'पुलिस सहायता', 2),
      (20, 'Someone to talk to', 'யாரிடமாவது பேச', 'किसी से बात करनी है', 3),
      (20, 'I need to go home', 'வீட்டுக்கு போக வேண்டும்', 'घर जाना है', 4)`
    );

    await db.execAsync('COMMIT');
  } catch (error) {
    await db.execAsync('ROLLBACK');
    throw error;
  }
}
