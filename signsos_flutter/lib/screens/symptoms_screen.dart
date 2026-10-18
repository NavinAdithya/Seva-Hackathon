import 'package:flutter/material.dart';
import '../data/mock_data.dart';
import '../models/models.dart';
import '../services/localization_service.dart';
import '../services/tts_service.dart';
import '../theme/app_theme.dart';
import 'billboard_screen.dart';
import 'responder_screen.dart';

class SymptomsScreen extends StatefulWidget {
  final String category;
  final String categoryTitle;
  final Color categoryColor;

  const SymptomsScreen({
    super.key,
    required this.category,
    required this.categoryTitle,
    required this.categoryColor,
  });

  @override
  State<SymptomsScreen> createState() => _SymptomsScreenState();
}

class _SymptomsScreenState extends State<SymptomsScreen> {
  final TextEditingController _customCtrl = TextEditingController();

  @override
  void dispose() {
    _customCtrl.dispose();
    super.dispose();
  }

  void _onPhraseSelected(EmergencyPhrase phrase) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (ctx) => BillboardScreen(phrase: phrase),
      ),
    );
  }

  void _onSpeakPhrase(EmergencyPhrase phrase) {
    final loc = LocalizationService();
    final text = phrase.getText(loc.currentLanguage);
    TtsService().speak(text, lang: loc.currentLanguage);
  }

  void _onCustomSubmit() {
    final text = _customCtrl.text.trim();
    if (text.isEmpty) return;
    final customPhrase = EmergencyPhrase(
      id: 999,
      category: widget.category,
      subcategory: 'custom',
      textEn: text,
      textTa: text,
      textHi: text,
      icon: '💬',
      severity: 'high',
      sortOrder: 99,
    );
    _customCtrl.clear();
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (ctx) => BillboardScreen(phrase: customPhrase),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final loc = LocalizationService();
    final phrases = allPhrases
        .where((p) => p.category == widget.category)
        .toList();

    return Scaffold(
      backgroundColor: AppColors.canvas,
      appBar: AppBar(
        title: Text(widget.categoryTitle),
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Category Alert Banner
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: widget.categoryColor.withValues(alpha: 0.12),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: widget.categoryColor.withValues(alpha: 0.4)),
              ),
              child: Row(
                children: [
                  Container(
                    width: 12,
                    height: 12,
                    decoration: BoxDecoration(
                      color: widget.categoryColor,
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      '${phrases.length} ${loc.tr("categories_title")} • Tap to enlarge or speak',
                      style: TextStyle(
                        color: widget.categoryColor,
                        fontWeight: FontWeight.bold,
                        fontSize: 13,
                      ),
                    ),
                  ),
                ],
              ),
            ),

            // Phrase cards list
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                itemCount: phrases.length,
                itemBuilder: (ctx, index) {
                  final phrase = phrases[index];
                  final phraseText = phrase.getText(loc.currentLanguage);
                  final isCritical = phrase.severity == 'critical';

                  Color badgeColor;
                  if (phrase.severity == 'critical') {
                    badgeColor = AppColors.emergencyCritical;
                  } else if (phrase.severity == 'high') {
                    badgeColor = AppColors.emergencyHigh;
                  } else {
                    badgeColor = AppColors.emergencyStable;
                  }

                  return Container(
                    margin: const EdgeInsets.only(bottom: 12),
                    decoration: BoxDecoration(
                      color: AppColors.surface,
                      borderRadius: BorderRadius.circular(18),
                      border: Border.all(
                        color: isCritical
                            ? AppColors.emergencyCritical.withValues(alpha: 0.6)
                            : AppColors.hairline,
                        width: isCritical ? 2 : 1,
                      ),
                    ),
                    child: Material(
                      color: Colors.transparent,
                      borderRadius: BorderRadius.circular(18),
                      child: InkWell(
                        borderRadius: BorderRadius.circular(18),
                        onTap: () => _onPhraseSelected(phrase),
                        child: Padding(
                          padding: const EdgeInsets.all(16),
                          child: Row(
                            children: [
                              Text(phrase.icon, style: const TextStyle(fontSize: 32)),
                              const SizedBox(width: 14),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                      children: [
                                        Container(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 8, vertical: 2),
                                          decoration: BoxDecoration(
                                            color: badgeColor.withValues(alpha: 0.2),
                                            borderRadius: BorderRadius.circular(6),
                                            border: Border.all(color: badgeColor, width: 1),
                                          ),
                                          child: Text(
                                            phrase.severity.toUpperCase(),
                                            style: TextStyle(
                                              fontSize: 10,
                                              fontWeight: FontWeight.w900,
                                              color: badgeColor,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 6),
                                    Text(
                                      phraseText,
                                      style: const TextStyle(
                                        fontSize: 18,
                                        fontWeight: FontWeight.w800,
                                        color: AppColors.textPrimary,
                                        height: 1.25,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              const SizedBox(width: 8),
                              // Inline TTS Button
                              IconButton(
                                iconSize: 28,
                                icon: const Icon(Icons.volume_up_rounded,
                                    color: AppColors.accentHighVis),
                                onPressed: () => _onSpeakPhrase(phrase),
                              ),
                              // Handshake icon
                              IconButton(
                                iconSize: 24,
                                icon: const Icon(Icons.handshake_rounded,
                                    color: AppColors.textSecondary),
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (ctx) =>
                                          ResponderScreen(activePhrase: phrase),
                                    ),
                                  );
                                },
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),

            // Custom Message Entry Bar
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: const BoxDecoration(
                color: AppColors.canvasRaised,
                border: Border(top: BorderSide(color: AppColors.hairline)),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: TextField(
                      controller: _customCtrl,
                      style: const TextStyle(color: AppColors.textPrimary),
                      decoration: InputDecoration(
                        hintText: loc.tr('custom_phrase_hint'),
                        hintStyle: const TextStyle(color: AppColors.textMuted, fontSize: 14),
                        filled: true,
                        fillColor: AppColors.surface,
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(14),
                          borderSide: const BorderSide(color: AppColors.hairline),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(14),
                          borderSide: const BorderSide(
                              color: AppColors.accentHighVis, width: 2),
                        ),
                      ),
                      onSubmitted: (_) => _onCustomSubmit(),
                    ),
                  ),
                  const SizedBox(width: 10),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.accentHighVis,
                      foregroundColor: AppColors.accentOnHighVis,
                      minimumSize: const Size(60, 48),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(14),
                      ),
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                    ),
                    onPressed: _onCustomSubmit,
                    child: const Icon(Icons.send_rounded, size: 22),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
