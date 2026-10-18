# SignSOS 🚨
> **Multimodal Inclusive Emergency Communication & Assistance Mobile App**
> *"Because Everyone Deserves to Be Heard."*

---

## 🏆 Competition Context
- **Event:** SEVA First Innovation Challenge 2026
- **Theme:** Swasth & Samavesh Bharat
- **Track:** Track A — Product / Technology

---

## 💡 What is SignSOS?
**SignSOS** is an Android-first, 100% offline-first, multilingual Augmentative and Alternative Communication (AAC) mobile application designed for people with visual, hearing, and speech disabilities. In emergency situations (accidents, acute illnesses, harassment, natural disasters), individuals often struggle to communicate critical needs with responders, nurses, or bystanders.

SignSOS eliminates this barrier through:
1. **Trilingual Offline Support**: Pre-rendered and reviewed phrases in **Tamil (தமிழ்)**, **Hindi (हिंदी)**, and **English**.
2. **Tactile Emergency Gateway**: Extra-large touch targets ($\ge 64\times64\,\text{dp}$) with instant vibrational haptic feedback.
3. **1.5-Meter High-Visibility Billboard Mode**: Inverted, ultra-high-contrast (`#0B0F19` canvas / `#FEF08A` yellow) billboard display readable by responders from 1.5 meters away without touching the patient's device.
4. **Two-Way Clinician Handshake**: A structured, clinical communication protocol based on emergency medicine's **OPQRST** methodology (Onset, Provocation, Quality, Radiation, Severity, Timing) and the **Wong-Baker FACES® Pain Rating Scale** (0–10).
5. **Encrypted On-Device Emergency Medical Card**: Local SQLite storage for blood group, allergies, conditions, and emergency contacts with 1-tap calling.
6. **Zero Runtime Cloud Dependency**: Fully operational in **Airplane Mode** with zero telemetry or network calls, ensuring absolute user privacy under the Digital Personal Data Protection (DPDP) Act.

---

## 📱 Architecture & Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | React Native + Expo (SDK 58) | Android-first cross-platform native app |
| **Routing** | Expo Router | File-based accessible screen navigation |
| **Language** | TypeScript (Strict) | End-to-end type safety |
| **State** | Zustand | Reactive emergency state & user preferences |
| **Local Database** | Expo SQLite (WAL mode) | 100% offline database for 25+ phrases & Q&A |
| **Audio / Speech** | Expo Speech | Native multilingual text-to-speech engine |
| **Haptics** | Expo Haptics | Tactical vibrational feedback on selections |
| **Localization** | i18next + react-i18next | Instant switching between Tamil, Hindi, and English |
| **Styling** | Native / Flexbox Design System | WCAG 2.1 AAA high-contrast theme |

---

## 🚀 Key Screens

1. **`app/index.tsx` (Emergency Gateway)**
   - Trilingual quick switcher bar: `English | தமிழ் | हिंदी`
   - Multi-select assistance modes: Vision 👁️, Hearing 🦻, Speech 🗣️
   - Tactile emergency tiles: Medical Help, Safety Threat, Fire, Natural Disaster, Accident, General Help
   - Quick access to Emergency Card and Clinician Handshake

2. **`app/symptoms/[categoryId].tsx` (Symptom Drilldown)**
   - Pre-loaded emergency complaints from local SQLite
   - Inline audio speaker buttons for quick verbal playback
   - Severity tags (Critical, High, Medium, Low)

3. **`app/billboard.tsx` (1.5-Meter Responder Billboard)**
   - High-contrast visual billboard designed to be held out to responders
   - Shows primary selected language plus English & multilingual sub-captions
   - Instant speech playback & "Respond to this" button

4. **`app/responder.tsx` (Two-Way Clinician Handshake)**
   - Live transcript of patient-responder exchange
   - Interactive Wong-Baker FACES® pain scale (0–10)
   - OPQRST follow-up clinical questions with single-tap answers

5. **`app/emergency-card.tsx` (Emergency Medical Card)**
   - Critical medical parameters (Blood group, allergies, medications, chronic illnesses)
   - Emergency contacts with direct 1-tap phone dialer
   - Stored securely on-device with zero cloud exposure

6. **`app/settings.tsx` (Accessibility & Preferences)**
   - Language selection, haptic toggles, auto-speak preferences
   - High-contrast and extra-large text settings
   - SEVA First 2026 challenge disclosures and AAC scope statements

---

## 🛠️ How to Run the App

### Prerequisites
- Node.js (v18+)
- Android Studio / Android Emulator OR Expo Go app on a physical device

### Quick Start
```bash
# 1. Install dependencies (if not already installed)
npm install --legacy-peer-deps

# 2. Verify TypeScript type safety (0 errors)
npx tsc --noEmit

# 3. Verify Expo Doctor (20/20 checks passed)
npx expo-doctor

# 4. Start the Expo development server
npx expo start
```

### Running on Android
Press `a` in the terminal to launch on a connected Android device or emulator:
```bash
npm run android
```

### Running on Web Preview
Press `w` in the terminal or run:
```bash
npm run web
```

---

## ⚖️ Ethical & AAC Scope Boundary
SignSOS is an **Augmentative and Alternative Communication (AAC) tool**. It facilitates communication between patients with disabilities and emergency personnel. SignSOS **does not diagnose medical conditions, provide clinical advice, or automatically dispatch emergency services**.
