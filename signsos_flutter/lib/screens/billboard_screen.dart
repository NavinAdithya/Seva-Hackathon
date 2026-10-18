import 'dart:async';
import 'package:flutter/material.dart';
import '../models/models.dart';
import '../services/localization_service.dart';
import '../services/tts_service.dart';
import '../theme/app_theme.dart';
import 'responder_screen.dart';

class BillboardScreen extends StatefulWidget {
  final EmergencyPhrase phrase;

  const BillboardScreen({super.key, required this.phrase});

  @override
  State<BillboardScreen> createState() => _BillboardScreenState();
}

class _BillboardScreenState extends State<BillboardScreen> {
  bool _isDaytimeInvert = false;
  bool _isBeaconActive = false;
  bool _beaconFlashOn = false;
  Timer? _beaconTimer;

  @override
  void initState() {
    super.initState();
    // Auto speak phrase upon opening Billboard
    final loc = LocalizationService();
    final text = widget.phrase.getText(loc.currentLanguage);
    TtsService().speak(text, lang: loc.currentLanguage);
  }

  @override
  void dispose() {
    _beaconTimer?.cancel();
    super.dispose();
  }

  void _toggleBeacon() {
    setState(() {
      _isBeaconActive = !_isBeaconActive;
      if (_isBeaconActive) {
        _beaconTimer = Timer.periodic(const Duration(milliseconds: 400), (t) {
          if (mounted) {
            setState(() {
              _beaconFlashOn = !_beaconFlashOn;
            });
          }
        });
      } else {
        _beaconTimer?.cancel();
        _beaconFlashOn = false;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final loc = LocalizationService();
    final phraseText = widget.phrase.getText(loc.currentLanguage);

    Color bg;
    Color fg;
    Color subtextCol;

    if (_isBeaconActive && _beaconFlashOn) {
      bg = AppColors.emergencyCritical;
      fg = Colors.white;
      subtextCol = Colors.white70;
    } else if (_isDaytimeInvert) {
      bg = AppColors.accentHighVis;
      fg = AppColors.accentOnHighVis;
      subtextCol = const Color(0xFF334155);
    } else {
      bg = AppColors.canvas;
      fg = AppColors.textPrimary;
      subtextCol = AppColors.textSecondary;
    }

    return Scaffold(
      backgroundColor: bg,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: Icon(Icons.arrow_back_ios_new_rounded, color: fg, size: 28),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          loc.tr('billboard_title'),
          style: TextStyle(
            color: fg,
            fontSize: 16,
            fontWeight: FontWeight.w700,
          ),
        ),
        actions: [
          IconButton(
            tooltip: loc.tr('beacon_toggle'),
            icon: Icon(
              _isBeaconActive ? Icons.flash_on_rounded : Icons.flash_off_rounded,
              color: _isBeaconActive ? AppColors.emergencyCritical : fg,
              size: 28,
            ),
            onPressed: _toggleBeacon,
          ),
          IconButton(
            tooltip: loc.tr('invert_toggle'),
            icon: Icon(
              _isDaytimeInvert ? Icons.light_mode_rounded : Icons.dark_mode_rounded,
              color: fg,
              size: 28,
            ),
            onPressed: () {
              setState(() {
                _isDaytimeInvert = !_isDaytimeInvert;
              });
            },
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0, vertical: 16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Icon & Severity pill
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    widget.phrase.icon,
                    style: const TextStyle(fontSize: 54),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(
                      color: widget.phrase.severity == 'critical'
                          ? AppColors.emergencyCritical
                          : AppColors.emergencyHigh,
                      borderRadius: BorderRadius.circular(30),
                    ),
                    child: Text(
                      widget.phrase.severity.toUpperCase(),
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w900,
                        fontSize: 14,
                        letterSpacing: 1.0,
                      ),
                    ),
                  ),
                ],
              ),
              const Spacer(flex: 1),

              // Giant 1.5m Billboard Display
              InkWell(
                onTap: () {
                  TtsService().speak(phraseText, lang: loc.currentLanguage);
                },
                borderRadius: BorderRadius.circular(24),
                child: Container(
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: _isDaytimeInvert
                        ? Colors.white.withValues(alpha: 0.5)
                        : AppColors.surface,
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(
                      color: _isDaytimeInvert
                          ? Colors.black26
                          : AppColors.hairlineHighlight,
                      width: 2.5,
                    ),
                  ),
                  child: Column(
                    children: [
                      Text(
                        phraseText,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 42,
                          fontWeight: FontWeight.w900,
                          color: fg,
                          height: 1.2,
                          letterSpacing: -0.5,
                        ),
                      ),
                      const SizedBox(height: 20),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.volume_up_rounded, color: subtextCol, size: 26),
                          const SizedBox(width: 8),
                          Text(
                            loc.tr('tap_to_speak'),
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w600,
                              color: subtextCol,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),

              const Spacer(flex: 2),

              // Direct Handshake Button for clinicians & first responders
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: _isDaytimeInvert
                      ? AppColors.canvas
                      : AppColors.accentHighVis,
                  foregroundColor: _isDaytimeInvert
                      ? AppColors.textPrimary
                      : AppColors.accentOnHighVis,
                  minimumSize: const Size(double.infinity, 64),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  elevation: 4,
                ),
                icon: const Icon(Icons.handshake_rounded, size: 28),
                label: Text(
                  loc.tr('open_handshake'),
                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900),
                ),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (ctx) => ResponderScreen(activePhrase: widget.phrase),
                    ),
                  );
                },
              ),
              const SizedBox(height: 12),
            ],
          ),
        ),
      ),
    );
  }
}
