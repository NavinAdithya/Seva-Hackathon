import 'package:flutter/material.dart';

class AppColors {
  // Deep obsidian canvas (conserves battery in disasters, WCAG AAA compliant)
  static const Color canvas = Color(0xFF0B0F19);
  static const Color canvasRaised = Color(0xFF111726);
  static const Color surface = Color(0xFF1A2133);
  static const Color surfaceElevated = Color(0xFF232D42);
  static const Color surfaceInteractive = Color(0xFF2C3852);

  // Structural lines and focus indicators
  static const Color hairline = Color(0xFF2A364F);
  static const Color hairlineStrong = Color(0xFF3B4D70);
  static const Color hairlineHighlight = Color(0xFFFEF08A);

  // High contrast typography
  static const Color textPrimary = Color(0xFFF8FAFC);
  static const Color textSecondary = Color(0xFF94A3B8);
  static const Color textMuted = Color(0xFF64748B);

  // 1.5m High-Visibility Emergency Yellow
  static const Color accentHighVis = Color(0xFFFEF08A);
  static const Color accentHighVisPressed = Color(0xFFEAB308);
  static const Color accentOnHighVis = Color(0xFF0B0F19);

  // Urgency & Triage status
  static const Color emergencyCritical = Color(0xFFEF4444);
  static const Color emergencyCriticalBg = Color(0x24EF4444);
  static const Color emergencyHigh = Color(0xFFF59E0B);
  static const Color emergencyHighBg = Color(0x24F59E0B);
  static const Color emergencyStable = Color(0xFF10B981);
  static const Color emergencyStableBg = Color(0x2410B981);

  // Category specific accents
  static const Color categoryMedical = Color(0xFF38BDF8);
  static const Color categorySafety = Color(0xFFA855F7);
  static const Color categoryFire = Color(0xFFF97316);
  static const Color categoryDisaster = Color(0xFF06B6D4);
  static const Color categoryAccident = Color(0xFFEF4444);
  static const Color categoryGeneral = Color(0xFFEAB308);
}

class AppTheme {
  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: AppColors.canvas,
      primaryColor: AppColors.accentHighVis,
      cardColor: AppColors.surface,
      dividerColor: AppColors.hairline,
      fontFamily: 'Roboto',
      appBarTheme: const AppBarTheme(
        backgroundColor: AppColors.canvas,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: TextStyle(
          color: AppColors.textPrimary,
          fontSize: 22,
          fontWeight: FontWeight.w800,
          letterSpacing: -0.3,
        ),
        iconTheme: IconThemeData(color: AppColors.textPrimary, size: 28),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.accentHighVis,
          foregroundColor: AppColors.accentOnHighVis,
          minimumSize: const Size(double.infinity, 56),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          textStyle: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.w800,
            letterSpacing: 0.2,
          ),
        ),
      ),
      textTheme: const TextTheme(
        displayLarge: TextStyle(
          fontSize: 48,
          fontWeight: FontWeight.w900,
          color: AppColors.textPrimary,
          letterSpacing: -0.5,
          height: 1.15,
        ),
        headlineLarge: TextStyle(
          fontSize: 28,
          fontWeight: FontWeight.w800,
          color: AppColors.textPrimary,
          letterSpacing: -0.3,
        ),
        headlineMedium: TextStyle(
          fontSize: 22,
          fontWeight: FontWeight.w700,
          color: AppColors.textPrimary,
        ),
        titleLarge: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimary,
        ),
        bodyLarge: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w500,
          color: AppColors.textPrimary,
          height: 1.4,
        ),
        bodyMedium: TextStyle(
          fontSize: 14,
          fontWeight: FontWeight.w500,
          color: AppColors.textSecondary,
        ),
      ),
      colorScheme: const ColorScheme.dark(
        primary: AppColors.accentHighVis,
        onPrimary: AppColors.accentOnHighVis,
        surface: AppColors.surface,
        onSurface: AppColors.textPrimary,
        error: AppColors.emergencyCritical,
        onError: Colors.white,
      ),
    );
  }
}
