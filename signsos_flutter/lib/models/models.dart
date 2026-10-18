class EmergencyPhrase {
  final int id;
  final String category;
  final String subcategory;
  final String textEn;
  final String textTa;
  final String textHi;
  final String icon;
  final String severity; // critical, high, medium, low
  final int sortOrder;

  const EmergencyPhrase({
    required this.id,
    required this.category,
    required this.subcategory,
    required this.textEn,
    required this.textTa,
    required this.textHi,
    required this.icon,
    required this.severity,
    required this.sortOrder,
  });

  String getText(String lang) {
    switch (lang) {
      case 'ta':
        return textTa.isNotEmpty ? textTa : textEn;
      case 'hi':
        return textHi.isNotEmpty ? textHi : textEn;
      default:
        return textEn;
    }
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'category': category,
      'subcategory': subcategory,
      'text_en': textEn,
      'text_ta': textTa,
      'text_hi': textHi,
      'icon': icon,
      'severity': severity,
      'sort_order': sortOrder,
    };
  }

  factory EmergencyPhrase.fromMap(Map<String, dynamic> map) {
    return EmergencyPhrase(
      id: map['id'] as int,
      category: map['category'] as String,
      subcategory: map['subcategory'] as String? ?? '',
      textEn: map['text_en'] as String,
      textTa: map['text_ta'] as String,
      textHi: map['text_hi'] as String,
      icon: map['icon'] as String? ?? '⚠️',
      severity: map['severity'] as String? ?? 'medium',
      sortOrder: map['sort_order'] as int? ?? 0,
    );
  }
}

class ResponderQuestion {
  final int id;
  final int phraseId;
  final String questionEn;
  final String questionTa;
  final String questionHi;
  final int sortOrder;

  const ResponderQuestion({
    required this.id,
    required this.phraseId,
    required this.questionEn,
    required this.questionTa,
    required this.questionHi,
    required this.sortOrder,
  });

  String getQuestion(String lang) {
    switch (lang) {
      case 'ta':
        return questionTa.isNotEmpty ? questionTa : questionEn;
      case 'hi':
        return questionHi.isNotEmpty ? questionHi : questionEn;
      default:
        return questionEn;
    }
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'phrase_id': phraseId,
      'question_en': questionEn,
      'question_ta': questionTa,
      'question_hi': questionHi,
      'sort_order': sortOrder,
    };
  }

  factory ResponderQuestion.fromMap(Map<String, dynamic> map) {
    return ResponderQuestion(
      id: map['id'] as int,
      phraseId: map['phrase_id'] as int,
      questionEn: map['question_en'] as String,
      questionTa: map['question_ta'] as String,
      questionHi: map['question_hi'] as String,
      sortOrder: map['sort_order'] as int? ?? 0,
    );
  }
}

class QuestionOption {
  final int id;
  final int questionId;
  final String optionEn;
  final String optionTa;
  final String optionHi;
  final int sortOrder;

  const QuestionOption({
    required this.id,
    required this.questionId,
    required this.optionEn,
    required this.optionTa,
    required this.optionHi,
    required this.sortOrder,
  });

  String getOption(String lang) {
    switch (lang) {
      case 'ta':
        return optionTa.isNotEmpty ? optionTa : optionEn;
      case 'hi':
        return optionHi.isNotEmpty ? optionHi : optionEn;
      default:
        return optionEn;
    }
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'question_id': questionId,
      'option_en': optionEn,
      'option_ta': optionTa,
      'option_hi': optionHi,
      'sort_order': sortOrder,
    };
  }

  factory QuestionOption.fromMap(Map<String, dynamic> map) {
    return QuestionOption(
      id: map['id'] as int,
      questionId: map['question_id'] as int,
      optionEn: map['option_en'] as String,
      optionTa: map['option_ta'] as String,
      optionHi: map['option_hi'] as String,
      sortOrder: map['sort_order'] as int? ?? 0,
    );
  }
}

class EmergencyContact {
  final String name;
  final String phone;
  final String relationship;

  const EmergencyContact({
    required this.name,
    required this.phone,
    required this.relationship,
  });

  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'phone': phone,
      'relationship': relationship,
    };
  }

  factory EmergencyContact.fromMap(Map<String, dynamic> map) {
    return EmergencyContact(
      name: map['name'] as String? ?? '',
      phone: map['phone'] as String? ?? '',
      relationship: map['relationship'] as String? ?? '',
    );
  }
}

class EmergencyCard {
  final String name;
  final int? age;
  final String bloodGroup;
  final String allergies;
  final String medications;
  final String conditions;
  final String language;
  final List<String> communicationPreferences;
  final List<EmergencyContact> emergencyContacts;

  const EmergencyCard({
    required this.name,
    this.age,
    required this.bloodGroup,
    required this.allergies,
    required this.medications,
    required this.conditions,
    required this.language,
    required this.communicationPreferences,
    required this.emergencyContacts,
  });

  EmergencyCard copyWith({
    String? name,
    int? age,
    String? bloodGroup,
    String? allergies,
    String? medications,
    String? conditions,
    String? language,
    List<String>? communicationPreferences,
    List<EmergencyContact>? emergencyContacts,
  }) {
    return EmergencyCard(
      name: name ?? this.name,
      age: age ?? this.age,
      bloodGroup: bloodGroup ?? this.bloodGroup,
      allergies: allergies ?? this.allergies,
      medications: medications ?? this.medications,
      conditions: conditions ?? this.conditions,
      language: language ?? this.language,
      communicationPreferences:
          communicationPreferences ?? this.communicationPreferences,
      emergencyContacts: emergencyContacts ?? this.emergencyContacts,
    );
  }
}

class HandshakeMessage {
  final String sender; // 'patient' or 'responder'
  final String text;
  final DateTime timestamp;

  const HandshakeMessage({
    required this.sender,
    required this.text,
    required this.timestamp,
  });
}

class PainFace {
  final int score;
  final String emoji;
  final String labelEn;
  final String labelTa;
  final String labelHi;

  const PainFace({
    required this.score,
    required this.emoji,
    required this.labelEn,
    required this.labelTa,
    required this.labelHi,
  });

  String getLabel(String lang) {
    switch (lang) {
      case 'ta':
        return labelTa;
      case 'hi':
        return labelHi;
      default:
        return labelEn;
    }
  }
}
