import 'package:flutter/foundation.dart';
import 'package:flutter_tts/flutter_tts.dart';

class TtsService {
  static final TtsService _instance = TtsService._internal();
  factory TtsService() => _instance;
  TtsService._internal();

  final FlutterTts _flutterTts = FlutterTts();
  bool _isInitialized = false;
  double speechRate = 0.5;
  double pitch = 1.0;

  Future<void> init() async {
    if (_isInitialized) return;
    try {
      await _flutterTts.setSpeechRate(speechRate);
      await _flutterTts.setPitch(pitch);
      await _flutterTts.setVolume(1.0);
      _isInitialized = true;
    } catch (e) {
      debugPrint('TtsService init warning: $e');
    }
  }

  Future<void> speak(String text, {String lang = 'en'}) async {
    try {
      await init();
      String localeCode = 'en-IN';
      if (lang == 'ta') {
        localeCode = 'ta-IN';
      } else if (lang == 'hi') {
        localeCode = 'hi-IN';
      }

      await _flutterTts.setLanguage(localeCode);
      await _flutterTts.setSpeechRate(speechRate);
      await _flutterTts.setPitch(pitch);
      await _flutterTts.speak(text);
    } catch (e) {
      debugPrint('TTS speak error: $e');
    }
  }

  Future<void> stop() async {
    try {
      await _flutterTts.stop();
    } catch (e) {
      debugPrint('TTS stop error: $e');
    }
  }
}
