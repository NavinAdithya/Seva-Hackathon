import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:url_launcher/url_launcher.dart';
import '../services/localization_service.dart';
import '../services/storage_service.dart';
import '../theme/app_theme.dart';
import 'emergency_card_screen.dart';
import 'responder_screen.dart';
import 'settings_screen.dart';
import 'symptoms_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final LocalizationService _loc = LocalizationService();

  @override
  void initState() {
    super.initState();
    _loc.addListener(_onLocaleChange);
    _loadInitialLanguage();
  }

  @override
  void dispose() {
    _loc.removeListener(_onLocaleChange);
    super.dispose();
  }

  void _onLocaleChange() {
    if (mounted) setState(() {});
  }

  Future<void> _loadInitialLanguage() async {
    final lang = await StorageService().getLanguage();
    _loc.setLanguage(lang);
  }

  Future<void> _call112() async {
    HapticFeedback.heavyImpact();
    showDialog(
      context: context,
      builder: (ctx) {
        return AlertDialog(
          backgroundColor: AppColors.canvasRaised,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
          title: Row(
            children: [
              const Icon(Icons.warning_amber_rounded,
                  color: AppColors.emergencyCritical, size: 30),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  _loc.tr('sos_confirm_title'),
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w900,
                    color: AppColors.textPrimary,
                  ),
                ),
              ),
            ],
          ),
          content: Text(
            _loc.tr('sos_confirm_body'),
            style: const TextStyle(
              fontSize: 15,
              color: AppColors.textSecondary,
              height: 1.4,
            ),
          ),
          actionsPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(ctx),
              child: Text(
                _loc.tr('cancel'),
                style: const TextStyle(
                  color: AppColors.textSecondary,
                  fontWeight: FontWeight.bold,
                  fontSize: 16,
                ),
              ),
            ),
            ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.emergencyCritical,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(14),
                ),
              ),
              icon: const Icon(Icons.phone_in_talk_rounded, size: 20),
              label: Text(
                _loc.tr('dial'),
                style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
              ),
              onPressed: () async {
                Navigator.pop(ctx);
                final uri = Uri.parse('tel:112');
                if (await canLaunchUrl(uri)) {
                  await launchUrl(uri);
                }
              },
            ),
          ],
        );
      },
    );
  }

  void _navigateToCategory(String category, String title, Color color) {
    HapticFeedback.selectionClick();
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (ctx) => SymptomsScreen(
          category: category,
          categoryTitle: title,
          categoryColor: color,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.canvas,
      body: SafeArea(
        child: Column(
          children: [
            // Top Bar: Branding, Language Switcher, Settings
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
              child: Row(
                children: [
                  // App Brand Logo & Name
                  Expanded(
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(
                            color: AppColors.accentHighVis,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Text('⚡', style: TextStyle(fontSize: 18)),
                        ),
                        const SizedBox(width: 8),
                        Flexible(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'SignSOS',
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.w900,
                                  letterSpacing: -0.5,
                                  color: AppColors.textPrimary,
                                ),
                              ),
                              Text(
                                _loc.tr('challenge_badge'),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(
                                  fontSize: 10,
                                  fontWeight: FontWeight.bold,
                                  color: AppColors.accentHighVis,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 6),

                  // Trilingual Language Toggle Buttons
                  Container(
                    decoration: BoxDecoration(
                      color: AppColors.surface,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: AppColors.hairline),
                    ),
                    padding: const EdgeInsets.symmetric(horizontal: 2, vertical: 2),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        _buildLangBtn('en', 'EN'),
                        _buildLangBtn('ta', 'தமிழ்'),
                        _buildLangBtn('hi', 'हिंदी'),
                      ],
                    ),
                  ),
                  const SizedBox(width: 4),

                  // Settings Icon Button
                  IconButton(
                    padding: EdgeInsets.zero,
                    constraints: const BoxConstraints(minWidth: 36, minHeight: 36),
                    icon: const Icon(Icons.settings_rounded,
                        color: AppColors.textPrimary, size: 24),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (ctx) => const SettingsScreen()),
                      );
                    },
                  ),
                ],
              ),
            ),

            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 4.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    // 112 National Emergency SOS Hero Banner
                    InkWell(
                      borderRadius: BorderRadius.circular(22),
                      onTap: _call112,
                      child: Container(
                        padding: const EdgeInsets.all(18),
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            colors: [Color(0xFFDC2626), Color(0xFF991B1B)],
                            begin: Alignment.topLeft,
                            end: Alignment.bottomRight,
                          ),
                          borderRadius: BorderRadius.circular(22),
                          boxShadow: [
                            BoxShadow(
                              color: AppColors.emergencyCritical.withValues(alpha: 0.35),
                              blurRadius: 16,
                              offset: const Offset(0, 6),
                            ),
                          ],
                        ),
                        child: Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(14),
                              decoration: BoxDecoration(
                                color: Colors.white.withValues(alpha: 0.15),
                                shape: BoxShape.circle,
                              ),
                              child: const Icon(Icons.phone_in_talk_rounded,
                                  color: Colors.white, size: 34),
                            ),
                            const SizedBox(width: 16),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    _loc.tr('sos_banner_title'),
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 19,
                                      fontWeight: FontWeight.w900,
                                      letterSpacing: -0.3,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    _loc.tr('sos_banner_desc'),
                                    style: TextStyle(
                                      color: Colors.white.withValues(alpha: 0.9),
                                      fontSize: 13,
                                      fontWeight: FontWeight.w500,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            const Icon(Icons.arrow_forward_ios_rounded,
                                color: Colors.white, size: 20),
                          ],
                        ),
                      ),
                    ),

                    const SizedBox(height: 18),

                    // Category Section Title
                    Text(
                      _loc.tr('categories_title'),
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w800,
                        color: AppColors.textSecondary,
                        letterSpacing: -0.2,
                      ),
                    ),
                    const SizedBox(height: 12),

                    // Tactile 6-Category Emergency Grid (WCAG AAA >= 64dp targets)
                    GridView.count(
                      crossAxisCount: 2,
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      crossAxisSpacing: 12,
                      mainAxisSpacing: 12,
                      childAspectRatio: 1.15,
                      children: [
                        _buildCategoryCard(
                          icon: '🩺',
                          title: _loc.tr('cat_medical'),
                          desc: _loc.tr('cat_medical_desc'),
                          color: AppColors.categoryMedical,
                          onTap: () => _navigateToCategory(
                              'medical', _loc.tr('cat_medical'), AppColors.categoryMedical),
                        ),
                        _buildCategoryCard(
                          icon: '🛡️',
                          title: _loc.tr('cat_safety'),
                          desc: _loc.tr('cat_safety_desc'),
                          color: AppColors.categorySafety,
                          onTap: () => _navigateToCategory(
                              'safety', _loc.tr('cat_safety'), AppColors.categorySafety),
                        ),
                        _buildCategoryCard(
                          icon: '🔥',
                          title: _loc.tr('cat_fire'),
                          desc: _loc.tr('cat_fire_desc'),
                          color: AppColors.categoryFire,
                          onTap: () => _navigateToCategory(
                              'fire', _loc.tr('cat_fire'), AppColors.categoryFire),
                        ),
                        _buildCategoryCard(
                          icon: '🌊',
                          title: _loc.tr('cat_disaster'),
                          desc: _loc.tr('cat_disaster_desc'),
                          color: AppColors.categoryDisaster,
                          onTap: () => _navigateToCategory(
                              'disaster', _loc.tr('cat_disaster'), AppColors.categoryDisaster),
                        ),
                        _buildCategoryCard(
                          icon: '🚗',
                          title: _loc.tr('cat_accident'),
                          desc: _loc.tr('cat_accident_desc'),
                          color: AppColors.categoryAccident,
                          onTap: () => _navigateToCategory(
                              'accident', _loc.tr('cat_accident'), AppColors.categoryAccident),
                        ),
                        _buildCategoryCard(
                          icon: '🆘',
                          title: _loc.tr('cat_general'),
                          desc: _loc.tr('cat_general_desc'),
                          color: AppColors.categoryGeneral,
                          onTap: () => _navigateToCategory(
                              'general', _loc.tr('cat_general'), AppColors.categoryGeneral),
                        ),
                      ],
                    ),

                    const SizedBox(height: 18),

                    // Quick Emergency Tools Row (Medical Card & Clinician Handshake)
                    Row(
                      children: [
                        Expanded(
                          child: InkWell(
                            borderRadius: BorderRadius.circular(18),
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (ctx) => const EmergencyCardScreen()),
                              );
                            },
                            child: Container(
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                color: AppColors.surface,
                                borderRadius: BorderRadius.circular(18),
                                border: Border.all(color: AppColors.hairlineHighlight),
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text('🪪', style: TextStyle(fontSize: 26)),
                                  const SizedBox(height: 8),
                                  Text(
                                    _loc.tr('emergency_card_nav'),
                                    style: const TextStyle(
                                      fontWeight: FontWeight.w900,
                                      fontSize: 15,
                                      color: AppColors.textPrimary,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    _loc.tr('emergency_card_desc'),
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                    style: const TextStyle(
                                      fontSize: 12,
                                      color: AppColors.textSecondary,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: InkWell(
                            borderRadius: BorderRadius.circular(18),
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (ctx) => const ResponderScreen()),
                              );
                            },
                            child: Container(
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                color: AppColors.surface,
                                borderRadius: BorderRadius.circular(18),
                                border: Border.all(color: AppColors.categoryMedical),
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text('🤝', style: TextStyle(fontSize: 26)),
                                  const SizedBox(height: 8),
                                  Text(
                                    _loc.tr('responder_mode_nav'),
                                    style: const TextStyle(
                                      fontWeight: FontWeight.w900,
                                      fontSize: 15,
                                      color: AppColors.textPrimary,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    _loc.tr('responder_mode_desc'),
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                    style: const TextStyle(
                                      fontSize: 12,
                                      color: AppColors.textSecondary,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLangBtn(String code, String label) {
    final isSelected = _loc.currentLanguage == code;
    return InkWell(
      onTap: () {
        _loc.setLanguage(code);
        StorageService().saveLanguage(code);
      },
      borderRadius: BorderRadius.circular(12),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 5),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.accentHighVis : Colors.transparent,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w900,
            color: isSelected ? AppColors.accentOnHighVis : AppColors.textSecondary,
          ),
        ),
      ),
    );
  }

  Widget _buildCategoryCard({
    required String icon,
    required String title,
    required String desc,
    required Color color,
    required VoidCallback onTap,
  }) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withValues(alpha: 0.6), width: 1.5),
      ),
      child: Material(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(20),
        child: InkWell(
          borderRadius: BorderRadius.circular(20),
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.all(14.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(icon, style: const TextStyle(fontSize: 28)),
                    Container(
                      width: 8,
                      height: 8,
                      decoration: BoxDecoration(
                        color: color,
                        shape: BoxShape.circle,
                      ),
                    ),
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w900,
                        color: AppColors.textPrimary,
                        letterSpacing: -0.2,
                      ),
                    ),
                    const SizedBox(height: 3),
                    Text(
                      desc,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w500,
                        color: AppColors.textSecondary,
                        height: 1.2,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
