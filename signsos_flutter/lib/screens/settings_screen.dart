import 'package:flutter/material.dart';
import '../services/localization_service.dart';
import '../services/storage_service.dart';
import '../services/tts_service.dart';
import '../theme/app_theme.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool _vision = true;
  bool _hearing = true;
  bool _speech = true;
  double _speechRate = 0.5;
  double _pitch = 1.0;

  @override
  void initState() {
    super.initState();
    _loadSettings();
  }

  Future<void> _loadSettings() async {
    final v = await StorageService().getVisionAssist();
    final h = await StorageService().getHearingAssist();
    final s = await StorageService().getSpeechAssist();
    setState(() {
      _vision = v;
      _hearing = h;
      _speech = s;
      _speechRate = TtsService().speechRate;
      _pitch = TtsService().pitch;
    });
  }

  @override
  Widget build(BuildContext context) {
    final loc = LocalizationService();

    return Scaffold(
      backgroundColor: AppColors.canvas,
      appBar: AppBar(
        title: Text(loc.tr('settings_nav')),
      ),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(16.0),
          children: [
            // Trilingual Language Selector Card
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: AppColors.hairlineHighlight, width: 1.5),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Text('🌐', style: TextStyle(fontSize: 22)),
                      const SizedBox(width: 10),
                      Text(
                        loc.tr('lang_switch'),
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w800,
                          color: AppColors.accentHighVis,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),
                  Row(
                    children: [
                      _buildLangChip('en', 'English'),
                      const SizedBox(width: 8),
                      _buildLangChip('ta', 'தமிழ்'),
                      const SizedBox(width: 8),
                      _buildLangChip('hi', 'हिंदी'),
                    ],
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // Assistance Modes Section
            Text(
              loc.tr('assistance_mode'),
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w800,
                color: AppColors.textSecondary,
              ),
            ),
            const SizedBox(height: 10),

            _buildSwitchTile(
              '👁️',
              'Vision Assistance',
              'High-contrast palette (18:1 ratio), 1.5m billboard display, daytime invert',
              _vision,
              (v) {
                setState(() => _vision = v);
                StorageService().saveVisionAssist(v);
              },
            ),
            _buildSwitchTile(
              '🦻',
              'Hearing Assistance',
              'Strobe visual emergency beacon, haptic pulses on critical SOS alerts',
              _hearing,
              (v) {
                setState(() => _hearing = v);
                StorageService().saveHearingAssist(v);
              },
            ),
            _buildSwitchTile(
              '🗣️',
              'Speech Assistance (AAC)',
              'Two-way clinician handshake, interactive Wong-Baker FACES®, offline voice synthesizer',
              _speech,
              (v) {
                setState(() => _speech = v);
                StorageService().saveSpeechAssist(v);
              },
            ),

            const SizedBox(height: 20),

            // Voice Synthesizer Controls
            Text(
              'TTS Voice Configuration',
              style: const TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.w800,
                color: AppColors.textSecondary,
              ),
            ),
            const SizedBox(height: 10),

            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.hairline),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        loc.tr('tts_speed'),
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                          color: AppColors.textPrimary,
                        ),
                      ),
                      Text(
                        '${(_speechRate * 100).toInt()}%',
                        style: const TextStyle(
                          color: AppColors.accentHighVis,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                  Slider(
                    value: _speechRate,
                    min: 0.2,
                    max: 1.0,
                    divisions: 8,
                    activeColor: AppColors.accentHighVis,
                    inactiveColor: AppColors.surfaceInteractive,
                    onChanged: (val) {
                      setState(() => _speechRate = val);
                      TtsService().speechRate = val;
                    },
                  ),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        loc.tr('tts_pitch'),
                        style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                          color: AppColors.textPrimary,
                        ),
                      ),
                      Text(
                        '${(_pitch * 100).toInt()}%',
                        style: const TextStyle(
                          color: AppColors.accentHighVis,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                  Slider(
                    value: _pitch,
                    min: 0.5,
                    max: 1.5,
                    divisions: 10,
                    activeColor: AppColors.accentHighVis,
                    inactiveColor: AppColors.surfaceInteractive,
                    onChanged: (val) {
                      setState(() => _pitch = val);
                      TtsService().pitch = val;
                    },
                  ),
                  const SizedBox(height: 6),
                  ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.surfaceElevated,
                      foregroundColor: AppColors.accentHighVis,
                      minimumSize: const Size(double.infinity, 44),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                        side: const BorderSide(color: AppColors.hairline),
                      ),
                    ),
                    icon: const Icon(Icons.volume_up_rounded, size: 20),
                    label: const Text('Test Voice Output'),
                    onPressed: () {
                      final testMsg = loc.currentLanguage == 'ta'
                          ? 'இது SignSOS குரல் பரிசோதனை ஆகும்.'
                          : loc.currentLanguage == 'hi'
                              ? 'यह SignSOS वॉयस टेस्ट है।'
                              : 'This is a SignSOS voice test.';
                      TtsService().speak(testMsg, lang: loc.currentLanguage);
                    },
                  ),
                ],
              ),
            ),

            const SizedBox(height: 20),

            // SEVA First 2026 Innovation Badge
            Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: AppColors.surfaceElevated,
                borderRadius: BorderRadius.circular(18),
                border: Border.all(color: AppColors.hairline),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Swasth & Samavesh Bharat',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w900,
                      color: AppColors.accentHighVis,
                    ),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'SEVA First Innovation Challenge 2026 • Track A: Product / Technology',
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textSecondary,
                    ),
                  ),
                  const SizedBox(height: 10),
                  const Text(
                    '• WCAG 2.1 AAA Compliant high-contrast palette\n• 100% Offline-first (No external cloud / tracker calls)\n• DPDP Act 2023 Compliant on-device privacy guarantee\n• Wong-Baker FACES® & OPQRST Clinical Emergency Protocols',
                    style: TextStyle(
                      fontSize: 12,
                      color: AppColors.textMuted,
                      height: 1.5,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  Widget _buildLangChip(String code, String label) {
    final loc = LocalizationService();
    final isSelected = loc.currentLanguage == code;

    return Expanded(
      child: InkWell(
        onTap: () {
          loc.setLanguage(code);
          StorageService().saveLanguage(code);
          setState(() {});
        },
        borderRadius: BorderRadius.circular(12),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          alignment: Alignment.center,
          decoration: BoxDecoration(
            color: isSelected ? AppColors.accentHighVis : AppColors.surfaceInteractive,
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: isSelected ? AppColors.accentHighVis : AppColors.hairline,
              width: isSelected ? 2 : 1,
            ),
          ),
          child: Text(
            label,
            style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w800,
              color: isSelected ? AppColors.accentOnHighVis : AppColors.textPrimary,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSwitchTile(
      String icon, String title, String subtitle, bool val, ValueChanged<bool> onChanged) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: AppColors.hairline),
      ),
      child: Row(
        children: [
          Text(icon, style: const TextStyle(fontSize: 24)),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.bold,
                    color: AppColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  style: const TextStyle(
                    fontSize: 12,
                    color: AppColors.textSecondary,
                    height: 1.3,
                  ),
                ),
              ],
            ),
          ),
          Switch(
            value: val,
            activeThumbColor: AppColors.accentHighVis,
            activeTrackColor: AppColors.accentHighVis.withValues(alpha: 0.4),
            inactiveThumbColor: AppColors.textMuted,
            inactiveTrackColor: AppColors.surfaceInteractive,
            onChanged: onChanged,
          ),
        ],
      ),
    );
  }
}
