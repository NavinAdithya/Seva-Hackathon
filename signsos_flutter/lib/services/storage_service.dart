import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/models.dart';
import '../data/mock_data.dart';

class StorageService {
  static final StorageService _instance = StorageService._internal();
  factory StorageService() => _instance;
  StorageService._internal();

  static const String _keyCard = 'signsos_emergency_card_v1';
  static const String _keyLanguage = 'signsos_language';
  static const String _keyVision = 'signsos_assist_vision';
  static const String _keyHearing = 'signsos_assist_hearing';
  static const String _keySpeech = 'signsos_assist_speech';

  Future<EmergencyCard> getEmergencyCard() async {
    final prefs = await SharedPreferences.getInstance();
    final data = prefs.getString(_keyCard);
    if (data == null) {
      return defaultEmergencyCard;
    }
    try {
      final map = jsonDecode(data) as Map<String, dynamic>;
      final contactsRaw = (map['emergency_contacts'] as List<dynamic>?) ?? [];
      final contacts = contactsRaw
          .map((c) => EmergencyContact.fromMap(Map<String, dynamic>.from(c as Map)))
          .toList();

      final prefsList = (map['communication_preferences'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          ['Visual Cards / AAC', 'Text-to-Speech'];

      return EmergencyCard(
        name: map['name'] as String? ?? 'Ananya Sharma',
        age: map['age'] as int? ?? 26,
        bloodGroup: map['blood_group'] as String? ?? 'O+ Positive',
        allergies: map['allergies'] as String? ?? 'Penicillin, Shellfish',
        medications: map['medications'] as String? ?? 'Salbutamol Inhaler',
        conditions: map['conditions'] as String? ?? 'Mild Asthma',
        language: map['language'] as String? ?? 'en',
        communicationPreferences: prefsList,
        emergencyContacts: contacts.isNotEmpty
            ? contacts
            : defaultEmergencyCard.emergencyContacts,
      );
    } catch (e) {
      return defaultEmergencyCard;
    }
  }

  Future<void> saveEmergencyCard(EmergencyCard card) async {
    final prefs = await SharedPreferences.getInstance();
    final map = {
      'name': card.name,
      'age': card.age,
      'blood_group': card.bloodGroup,
      'allergies': card.allergies,
      'medications': card.medications,
      'conditions': card.conditions,
      'language': card.language,
      'communication_preferences': card.communicationPreferences,
      'emergency_contacts': card.emergencyContacts.map((c) => c.toMap()).toList(),
    };
    await prefs.setString(_keyCard, jsonEncode(map));
  }

  Future<String> getLanguage() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_keyLanguage) ?? 'en';
  }

  Future<void> saveLanguage(String lang) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_keyLanguage, lang);
  }

  Future<bool> getVisionAssist() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool(_keyVision) ?? true;
  }

  Future<void> saveVisionAssist(bool val) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_keyVision, val);
  }

  Future<bool> getHearingAssist() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool(_keyHearing) ?? true;
  }

  Future<void> saveHearingAssist(bool val) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_keyHearing, val);
  }

  Future<bool> getSpeechAssist() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool(_keySpeech) ?? true;
  }

  Future<void> saveSpeechAssist(bool val) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_keySpeech, val);
  }
}
