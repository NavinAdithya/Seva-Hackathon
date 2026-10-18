import 'package:flutter/material.dart';
import 'package:share_plus/share_plus.dart';
import 'package:url_launcher/url_launcher.dart';
import '../data/mock_data.dart';
import '../models/models.dart';
import '../services/localization_service.dart';
import '../services/storage_service.dart';
import '../theme/app_theme.dart';

class EmergencyCardScreen extends StatefulWidget {
  const EmergencyCardScreen({super.key});

  @override
  State<EmergencyCardScreen> createState() => _EmergencyCardScreenState();
}

class _EmergencyCardScreenState extends State<EmergencyCardScreen> {
  EmergencyCard? _card;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadCard();
  }

  Future<void> _loadCard() async {
    final card = await StorageService().getEmergencyCard();
    setState(() {
      _card = card;
      _isLoading = false;
    });
  }

  Future<void> _makeCall(String phoneNumber) async {
    final cleanPhone = phoneNumber.replaceAll(RegExp(r'\s+'), '');
    final uri = Uri.parse('tel:$cleanPhone');
    if (await canLaunchUrl(uri)) {
      await launchUrl(uri);
    }
  }

  void _shareProfile() {
    if (_card == null) return;
    final buffer = StringBuffer();
    buffer.writeln('=== EMERGENCY MEDICAL CARD (SignSOS) ===');
    buffer.writeln('Patient: ${_card!.name} (${_card!.age ?? "N/A"} yrs)');
    buffer.writeln('Blood Group: ${_card!.bloodGroup}');
    buffer.writeln('Allergies: ${_card!.allergies}');
    buffer.writeln('Medications: ${_card!.medications}');
    buffer.writeln('Conditions: ${_card!.conditions}');
    buffer.writeln('Communication: ${_card!.communicationPreferences.join(", ")}');
    buffer.writeln('--- EMERGENCY CONTACTS ---');
    for (final c in _card!.emergencyContacts) {
      buffer.writeln('${c.name}: ${c.phone} (${c.relationship})');
    }
    buffer.writeln('========================================');
    SharePlus.instance.share(
      ShareParams(text: buffer.toString(), subject: 'Emergency Medical Card'),
    );
  }

  void _editCardDialog() {
    if (_card == null) return;
    final nameCtrl = TextEditingController(text: _card!.name);
    final ageCtrl = TextEditingController(text: _card!.age?.toString() ?? '');
    final bloodCtrl = TextEditingController(text: _card!.bloodGroup);
    final allergiesCtrl = TextEditingController(text: _card!.allergies);
    final medsCtrl = TextEditingController(text: _card!.medications);
    final condsCtrl = TextEditingController(text: _card!.conditions);

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.canvasRaised,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) {
        return Padding(
          padding: EdgeInsets.only(
            left: 20,
            right: 20,
            top: 20,
            bottom: MediaQuery.of(ctx).viewInsets.bottom + 24,
          ),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text(
                      'Edit Emergency Card',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w800,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close_rounded, color: AppColors.textSecondary),
                      onPressed: () => Navigator.pop(ctx),
                    ),
                  ],
                ),
                const SizedBox(height: 14),
                _buildTextField('Full Name', nameCtrl),
                const SizedBox(height: 10),
                _buildTextField('Age', ageCtrl, keyboardType: TextInputType.number),
                const SizedBox(height: 10),
                _buildTextField('Blood Group (e.g. O+, A-, B+)', bloodCtrl),
                const SizedBox(height: 10),
                _buildTextField('Severe Allergies', allergiesCtrl),
                const SizedBox(height: 10),
                _buildTextField('Current Medications', medsCtrl),
                const SizedBox(height: 10),
                _buildTextField('Chronic Medical Conditions', condsCtrl),
                const SizedBox(height: 20),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.accentHighVis,
                    foregroundColor: AppColors.accentOnHighVis,
                    minimumSize: const Size(double.infinity, 56),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(16),
                    ),
                  ),
                  child: const Text('Save Profile (100% Private)',
                      style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16)),
                  onPressed: () async {
                    final updated = _card!.copyWith(
                      name: nameCtrl.text.trim(),
                      age: int.tryParse(ageCtrl.text.trim()) ?? _card!.age,
                      bloodGroup: bloodCtrl.text.trim(),
                      allergies: allergiesCtrl.text.trim(),
                      medications: medsCtrl.text.trim(),
                      conditions: condsCtrl.text.trim(),
                    );
                    await StorageService().saveEmergencyCard(updated);
                    setState(() {
                      _card = updated;
                    });
                    if (ctx.mounted) Navigator.pop(ctx);
                  },
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildTextField(String label, TextEditingController ctrl,
      {TextInputType keyboardType = TextInputType.text}) {
    return TextField(
      controller: ctrl,
      keyboardType: keyboardType,
      style: const TextStyle(color: AppColors.textPrimary),
      decoration: InputDecoration(
        labelText: label,
        labelStyle: const TextStyle(color: AppColors.textSecondary, fontSize: 13),
        filled: true,
        fillColor: AppColors.surface,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.hairline),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: AppColors.accentHighVis, width: 2),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final loc = LocalizationService();

    if (_isLoading) {
      return const Scaffold(
        backgroundColor: AppColors.canvas,
        body: Center(child: CircularProgressIndicator(color: AppColors.accentHighVis)),
      );
    }

    final card = _card ?? defaultEmergencyCard;

    return Scaffold(
      backgroundColor: AppColors.canvas,
      appBar: AppBar(
        title: Text(loc.tr('emergency_card_nav')),
        actions: [
          IconButton(
            tooltip: loc.tr('share_profile'),
            icon: const Icon(Icons.share_rounded, color: AppColors.accentHighVis),
            onPressed: _shareProfile,
          ),
          IconButton(
            tooltip: loc.tr('edit_card'),
            icon: const Icon(Icons.edit_rounded, color: AppColors.textPrimary),
            onPressed: _editCardDialog,
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // DPDP Act 2023 Badge
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                decoration: BoxDecoration(
                  color: AppColors.emergencyStableBg,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: AppColors.emergencyStable.withValues(alpha: 0.4)),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.shield_rounded, color: AppColors.emergencyStable, size: 20),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        loc.tr('dpdp_badge'),
                        style: const TextStyle(
                          color: AppColors.emergencyStable,
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),

              // Patient Header Card
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: AppColors.surface,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: AppColors.hairlineHighlight, width: 2),
                ),
                child: Row(
                  children: [
                    CircleAvatar(
                      radius: 34,
                      backgroundColor: AppColors.surfaceInteractive,
                      child: const Text('🪪', style: TextStyle(fontSize: 34)),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            card.name,
                            style: const TextStyle(
                              fontSize: 22,
                              fontWeight: FontWeight.w900,
                              color: AppColors.textPrimary,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            '${card.age ?? "N/A"} years old',
                            style: const TextStyle(
                              fontSize: 15,
                              color: AppColors.textSecondary,
                            ),
                          ),
                          const SizedBox(height: 8),
                          // Blood group highlight pill
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: AppColors.emergencyCriticalBg,
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(color: AppColors.emergencyCritical),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                const Text('🩸 ', style: TextStyle(fontSize: 12)),
                                Text(
                                  card.bloodGroup,
                                  style: const TextStyle(
                                    color: AppColors.emergencyCritical,
                                    fontWeight: FontWeight.w900,
                                    fontSize: 13,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 16),

              // Clinical Vitals & Alert Details
              _buildInfoTile('⚠️', loc.tr('allergies'), card.allergies,
                  accent: AppColors.emergencyCritical),
              _buildInfoTile('💊', loc.tr('medications'), card.medications,
                  accent: AppColors.categoryMedical),
              _buildInfoTile('🩺', loc.tr('conditions'), card.conditions,
                  accent: AppColors.emergencyHigh),
              _buildInfoTile('🗣️', 'Communication Mode',
                  card.communicationPreferences.join(' • '),
                  accent: AppColors.categorySafety),

              const SizedBox(height: 20),

              // Emergency Contacts Header
              Text(
                loc.tr('contacts'),
                style: const TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.w800,
                  color: AppColors.accentHighVis,
                ),
              ),
              const SizedBox(height: 10),

              // Emergency Contacts List
              ...card.emergencyContacts.map((contact) {
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
                      CircleAvatar(
                        backgroundColor: AppColors.surfaceElevated,
                        child: const Icon(Icons.person_rounded,
                            color: AppColors.accentHighVis),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              contact.name,
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                                color: AppColors.textPrimary,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              contact.phone,
                              style: const TextStyle(
                                fontSize: 14,
                                color: AppColors.textSecondary,
                              ),
                            ),
                          ],
                        ),
                      ),
                      ElevatedButton.icon(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: AppColors.emergencyStable,
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(
                              horizontal: 14, vertical: 10),
                          minimumSize: const Size(80, 44),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                        ),
                        icon: const Icon(Icons.phone_rounded, size: 18),
                        label: Text(
                          loc.tr('call_contact'),
                          style: const TextStyle(fontWeight: FontWeight.w800),
                        ),
                        onPressed: () => _makeCall(contact.phone),
                      ),
                    ],
                  ),
                );
              }),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildInfoTile(String icon, String label, String value,
      {Color accent = AppColors.accentHighVis}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
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
            children: [
              Text(icon, style: const TextStyle(fontSize: 16)),
              const SizedBox(width: 8),
              Text(
                label.toUpperCase(),
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w800,
                  color: accent,
                  letterSpacing: 0.5,
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            value.isNotEmpty ? value : 'None recorded',
            style: const TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: AppColors.textPrimary,
              height: 1.3,
            ),
          ),
        ],
      ),
    );
  }
}
