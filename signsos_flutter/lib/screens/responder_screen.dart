import 'package:flutter/material.dart';
import 'package:share_plus/share_plus.dart';
import '../data/mock_data.dart';
import '../models/models.dart';
import '../services/localization_service.dart';
import '../services/tts_service.dart';
import '../theme/app_theme.dart';

class ResponderScreen extends StatefulWidget {
  final EmergencyPhrase? activePhrase;

  const ResponderScreen({super.key, this.activePhrase});

  @override
  State<ResponderScreen> createState() => _ResponderScreenState();
}

class _ResponderScreenState extends State<ResponderScreen> {
  int? _selectedPainScore;
  final List<HandshakeMessage> _messages = [];
  final ScrollController _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    final loc = LocalizationService();
    if (widget.activePhrase != null) {
      final initialText = widget.activePhrase!.getText(loc.currentLanguage);
      _messages.add(
        HandshakeMessage(
          sender: 'patient',
          text: initialText,
          timestamp: DateTime.now(),
        ),
      );
    }
  }

  void _addMessage(String sender, String text) {
    setState(() {
      _messages.add(
        HandshakeMessage(
          sender: sender,
          text: text,
          timestamp: DateTime.now(),
        ),
      );
    });
    // Auto speak
    final loc = LocalizationService();
    TtsService().speak(text, lang: loc.currentLanguage);

    // Scroll to bottom
    Future.delayed(const Duration(milliseconds: 100), () {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }

  void _onPainSelected(PainFace face) {
    setState(() {
      _selectedPainScore = face.score;
    });
    final loc = LocalizationService();
    final painDesc = '${face.emoji} Pain Level: ${face.getLabel(loc.currentLanguage)}';
    _addMessage('patient', painDesc);
  }

  void _exportHandover() {
    final loc = LocalizationService();
    final buffer = StringBuffer();
    buffer.writeln('=== SignSOS EMERGENCY CLINICAL HANDOVER REPORT ===');
    buffer.writeln('Generated: ${DateTime.now().toLocal().toString().split('.')[0]}');
    buffer.writeln('Standard: SEVA First Innovation 2026 • Swasth & Samavesh');
    buffer.writeln('--------------------------------------------------');
    if (widget.activePhrase != null) {
      buffer.writeln('PRIMARY CHIEF COMPLAINT: ${widget.activePhrase!.getText(loc.currentLanguage)} (${widget.activePhrase!.severity.toUpperCase()})');
    }
    if (_selectedPainScore != null) {
      buffer.writeln('WONG-BAKER PAIN SCORE: $_selectedPainScore / 10');
    }
    buffer.writeln('\n--- CLINICAL DIALOGUE & TRIAGE LOG ---');
    for (final m in _messages) {
      final who = m.sender == 'patient' ? '[PATIENT]' : '[RESPONDER/EMT]';
      buffer.writeln('${m.timestamp.hour.toString().padLeft(2, '0')}:${m.timestamp.minute.toString().padLeft(2, '0')} $who: ${m.text}');
    }
    buffer.writeln('==================================================');

    final report = buffer.toString();
    SharePlus.instance.share(
      ShareParams(text: report, subject: 'SignSOS Clinical Handover Report'),
    );

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: AppColors.emergencyStable,
        content: Text(
          loc.tr('handover_exported'),
          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final loc = LocalizationService();
    final phraseId = widget.activePhrase?.id ?? 1;

    // Filter relevant OPQRST questions
    final questions = allQuestions.where((q) => q.phraseId == phraseId).toList();

    return Scaffold(
      backgroundColor: AppColors.canvas,
      appBar: AppBar(
        title: Text(loc.tr('responder_mode_nav')),
        actions: [
          IconButton(
            tooltip: loc.tr('export_handover'),
            icon: const Icon(Icons.share_rounded, color: AppColors.accentHighVis),
            onPressed: _exportHandover,
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Active Symptom Banner
            if (widget.activePhrase != null)
              Container(
                margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: AppColors.surfaceElevated,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: AppColors.hairlineHighlight, width: 1.5),
                ),
                child: Row(
                  children: [
                    Text(
                      widget.activePhrase!.icon,
                      style: const TextStyle(fontSize: 32),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '${loc.tr("severity_critical")}: ${widget.activePhrase!.severity.toUpperCase()}',
                            style: const TextStyle(
                              color: AppColors.accentHighVis,
                              fontWeight: FontWeight.w800,
                              fontSize: 12,
                            ),
                          ),
                          Text(
                            widget.activePhrase!.getText(loc.currentLanguage),
                            style: const TextStyle(
                              color: AppColors.textPrimary,
                              fontSize: 17,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.volume_up_rounded, color: AppColors.accentHighVis),
                      onPressed: () {
                        TtsService().speak(
                          widget.activePhrase!.getText(loc.currentLanguage),
                          lang: loc.currentLanguage,
                        );
                      },
                    ),
                  ],
                ),
              ),

            // Wong-Baker FACES® Interactive Pain Scale
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: AppColors.surface,
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: AppColors.hairline),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    loc.tr('pain_scale_title'),
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w700,
                      color: AppColors.accentHighVis,
                    ),
                  ),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: painFaces.map((face) {
                      final isSelected = _selectedPainScore == face.score;
                      Color haloColor = Colors.transparent;
                      if (face.score <= 2) {
                        haloColor = AppColors.emergencyStable;
                      } else if (face.score <= 6) {
                        haloColor = AppColors.emergencyHigh;
                      } else {
                        haloColor = AppColors.emergencyCritical;
                      }

                      return InkWell(
                        onTap: () => _onPainSelected(face),
                        borderRadius: BorderRadius.circular(12),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 6),
                          decoration: BoxDecoration(
                            color: isSelected
                                ? haloColor.withValues(alpha: 0.25)
                                : AppColors.surfaceElevated,
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(
                              color: isSelected ? haloColor : AppColors.hairline,
                              width: isSelected ? 2.5 : 1,
                            ),
                          ),
                          child: Column(
                            children: [
                              Text(face.emoji, style: const TextStyle(fontSize: 26)),
                              const SizedBox(height: 4),
                              Text(
                                '${face.score}',
                                style: TextStyle(
                                  color: isSelected ? haloColor : AppColors.textPrimary,
                                  fontWeight: FontWeight.w900,
                                  fontSize: 14,
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                ],
              ),
            ),

            // Live Clinical Dialogue Transcript
            Expanded(
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppColors.canvasRaised,
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
                          loc.tr('handover_log'),
                          style: const TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.bold,
                            color: AppColors.textSecondary,
                          ),
                        ),
                        Text(
                          '${_messages.length} events',
                          style: const TextStyle(
                            fontSize: 12,
                            color: AppColors.textMuted,
                          ),
                        ),
                      ],
                    ),
                    const Divider(color: AppColors.hairline, height: 16),
                    Expanded(
                      child: _messages.isEmpty
                          ? Center(
                              child: Text(
                                'No clinical entries yet',
                                style: TextStyle(color: AppColors.textMuted),
                              ),
                            )
                          : ListView.builder(
                              controller: _scrollController,
                              itemCount: _messages.length,
                              itemBuilder: (ctx, idx) {
                                final msg = _messages[idx];
                                final isPatient = msg.sender == 'patient';
                                return Align(
                                  alignment: isPatient
                                      ? Alignment.centerLeft
                                      : Alignment.centerRight,
                                  child: Container(
                                    margin: const EdgeInsets.only(bottom: 8),
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 14, vertical: 10),
                                    decoration: BoxDecoration(
                                      color: isPatient
                                          ? AppColors.surfaceInteractive
                                          : AppColors.accentHighVis,
                                      borderRadius: BorderRadius.circular(14),
                                      border: Border.all(
                                        color: isPatient
                                            ? AppColors.hairlineStrong
                                            : Colors.transparent,
                                      ),
                                    ),
                                    child: Column(
                                      crossAxisAlignment: isPatient
                                          ? CrossAxisAlignment.start
                                          : CrossAxisAlignment.end,
                                      children: [
                                        Text(
                                          isPatient ? 'PATIENT' : 'RESPONDER',
                                          style: TextStyle(
                                            fontSize: 10,
                                            fontWeight: FontWeight.w900,
                                            color: isPatient
                                                ? AppColors.accentHighVis
                                                : AppColors.accentOnHighVis,
                                          ),
                                        ),
                                        const SizedBox(height: 2),
                                        Text(
                                          msg.text,
                                          style: TextStyle(
                                            fontSize: 15,
                                            fontWeight: FontWeight.w600,
                                            color: isPatient
                                                ? AppColors.textPrimary
                                                : AppColors.accentOnHighVis,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                );
                              },
                            ),
                    ),
                  ],
                ),
              ),
            ),

            // OPQRST Clinical Triage Interactive Options Tray
            if (questions.isNotEmpty)
              Container(
                height: 150,
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                decoration: const BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(20),
                    topRight: Radius.circular(20),
                  ),
                ),
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: questions.length,
                  itemBuilder: (ctx, qIdx) {
                    final q = questions[qIdx];
                    final qText = q.getQuestion(loc.currentLanguage);
                    final qOpts = allOptions.where((o) => o.questionId == q.id).toList();

                    return Container(
                      width: 270,
                      margin: const EdgeInsets.only(right: 12),
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: AppColors.surfaceElevated,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: AppColors.hairline),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Expanded(
                                child: Text(
                                  qText,
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(
                                    fontSize: 13,
                                    fontWeight: FontWeight.bold,
                                    color: AppColors.categoryMedical,
                                  ),
                                ),
                              ),
                              IconButton(
                                iconSize: 20,
                                icon: const Icon(Icons.volume_up_rounded,
                                    color: AppColors.categoryMedical),
                                onPressed: () {
                                  _addMessage('responder', qText);
                                },
                              ),
                            ],
                          ),
                          const SizedBox(height: 6),
                          Expanded(
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: Row(
                                children: qOpts.map((opt) {
                                  final optText = opt.getOption(loc.currentLanguage);
                                  return Padding(
                                    padding: const EdgeInsets.only(right: 6.0),
                                    child: ActionChip(
                                      backgroundColor: AppColors.surfaceInteractive,
                                      side: const BorderSide(
                                          color: AppColors.hairlineStrong),
                                      label: Text(
                                        optText,
                                        style: const TextStyle(
                                          color: AppColors.textPrimary,
                                          fontWeight: FontWeight.w600,
                                          fontSize: 12,
                                        ),
                                      ),
                                      onPressed: () {
                                        _addMessage('patient', optText);
                                      },
                                    ),
                                  );
                                }).toList(),
                              ),
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ),

            // Export Clinical Handover Button
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppColors.accentHighVis,
                  foregroundColor: AppColors.accentOnHighVis,
                  minimumSize: const Size(double.infinity, 54),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
                icon: const Icon(Icons.share_rounded, size: 22),
                label: Text(
                  loc.tr('export_handover'),
                  style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
                ),
                onPressed: _exportHandover,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
