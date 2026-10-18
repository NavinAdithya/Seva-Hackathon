import { CategoryConfig } from '../types';

export const CATEGORIES: CategoryConfig[] = [
  {
    id: 'medical',
    label_en: 'Medical Help',
    label_ta: 'மருத்துவ உதவி',
    label_hi: 'चिकित्सा सहायता',
    icon: '🏥',
    color: '#3B82F6',
    bgColor: '#1E3A5F',
  },
  {
    id: 'safety',
    label_en: 'Safety Threat',
    label_ta: 'பாதுகாப்பு அச்சுறுத்தல்',
    label_hi: 'सुरक्षा खतरा',
    icon: '🛡️',
    color: '#A855F7',
    bgColor: '#3B1F5E',
  },
  {
    id: 'fire',
    label_en: 'Fire Emergency',
    label_ta: 'தீ அவசரநிலை',
    label_hi: 'आग आपातकाल',
    icon: '🔥',
    color: '#EF4444',
    bgColor: '#5F1E1E',
  },
  {
    id: 'natural_disaster',
    label_en: 'Natural Disaster',
    label_ta: 'இயற்கை பேரழிவு',
    label_hi: 'प्राकृतिक आपदा',
    icon: '🌊',
    color: '#F59E0B',
    bgColor: '#5F4B1E',
  },
  {
    id: 'accident',
    label_en: 'Accident',
    label_ta: 'விபத்து',
    label_hi: 'दुर्घटना',
    icon: '🚨',
    color: '#EF4444',
    bgColor: '#5F1E2E',
  },
  {
    id: 'general',
    label_en: 'Need Help',
    label_ta: 'உதவி தேவை',
    label_hi: 'मदद चाहिए',
    icon: '🆘',
    color: '#22C55E',
    bgColor: '#1E5F3A',
  },
];

export const PAIN_SCALE = [
  { value: 0, label_en: 'No Pain', label_ta: 'வலி இல்லை', label_hi: 'दर्द नहीं', emoji: '😊' },
  { value: 2, label_en: 'Mild', label_ta: 'லேசான', label_hi: 'हल्का', emoji: '🙂' },
  { value: 4, label_en: 'Moderate', label_ta: 'மிதமான', label_hi: 'मध्यम', emoji: '😐' },
  { value: 6, label_en: 'Severe', label_ta: 'கடுமையான', label_hi: 'गंभीर', emoji: '😣' },
  { value: 8, label_en: 'Very Severe', label_ta: 'மிகக் கடுமையான', label_hi: 'बहुत गंभीर', emoji: '😫' },
  { value: 10, label_en: 'Worst Pain', label_ta: 'மோசமான வலி', label_hi: 'सबसे तेज़ दर्द', emoji: '😭' },
];
