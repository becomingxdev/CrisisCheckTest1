export type Language = "en" | "hi" | "ta"

export interface Translations {
  // Navigation
  nav: {
    dashboard: string
    factCheck: string
    resources: string
    about: string
    admin: string
    signIn: string
    signOut: string
  }
  // Common
  common: {
    loading: string
    submit: string
    cancel: string
    save: string
    delete: string
    edit: string
    search: string
    filter: string
    emergency: string
    verified: string
    unverified: string
    critical: string
    high: string
    medium: string
    low: string
    name: string
    email: string
    phone: string
    location: string
    status: string
    actions: string
  }
  // Home page
  home: {
    title: string
    subtitle: string
    viewDashboard: string
    checkInformation: string
    emergencyNotice: string
    emergencyDescription: string
    callEmergency: string
    crisisGuide: string
  }
  // Dashboard
  dashboard: {
    title: string
    subtitle: string
    activeIncidents: string
    peopleAffected: string
    reliefCenters: string
    responseRate: string
    liveMap: string
    liveUpdates: string
    resourceTracker: string
  }
  // Fact Check
  factCheck: {
    title: string
    subtitle: string
    chatPlaceholder: string
    mythVsReality: string
    verificationTips: string
  }
  // Resources
  resources: {
    title: string
    subtitle: string
    reportForm: string
    communityForum: string
    volunteerRegistration: string
  }
  // Crisis Guide
  crisisGuide: {
    title: string
    emergencyHelp: string
    earthquakeSafety: string
    floodSafety: string
    cycloneSafety: string
    fireSafety: string
    medicalEmergency: string
    generalSafety: string
  }
  // About page
  about: {
    title: string
    subtitle: string
    mission: string
    missionDescription: string
    features: string
    featuresDescription: string
    technology: string
    technologyDescription: string
    getInvolved: string
    getInvolvedDescription: string
    volunteer: string
    report: string
    verify: string
  }
  // Admin
  admin: {
    dashboard: string
    volunteerManagement: string
    crisisReports: string
    siteSettings: string
    totalVolunteers: string
    activeReports: string
    verifiedFacts: string
    systemStatus: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      dashboard: "Dashboard",
      factCheck: "Fact Check",
      resources: "Resources",
      about: "About",
      admin: "Admin",
      signIn: "Sign In",
      signOut: "Sign Out",
    },
    common: {
      loading: "Loading...",
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      search: "Search",
      filter: "Filter",
      emergency: "Emergency",
      verified: "Verified",
      unverified: "Unverified",
      critical: "Critical",
      high: "High",
      medium: "Medium",
      low: "Low",
      name: "Name",
      email: "Email",
      phone: "Phone",
      location: "Location",
      status: "Status",
      actions: "Actions",
    },
    home: {
      title: "Your Trusted Source for Crisis Information",
      subtitle:
        "Real-time updates, verified facts, and essential resources to keep you safe and informed during emergencies.",
      viewDashboard: "View Live Dashboard",
      checkInformation: "Check Information",
      emergencyNotice: "Emergency Situation?",
      emergencyDescription: "For immediate assistance, contact emergency services or use our crisis guide.",
      callEmergency: "Call Emergency: 112",
      crisisGuide: "Crisis Guide",
    },
    dashboard: {
      title: "Crisis Management Dashboard",
      subtitle: "Real-time monitoring of crisis situations and emergency response operations",
      activeIncidents: "Active Incidents",
      peopleAffected: "People Affected",
      reliefCenters: "Relief Centers",
      responseRate: "Response Rate",
      liveMap: "Live Crisis Map",
      liveUpdates: "Live Updates",
      resourceTracker: "Resource Tracker",
    },
    factCheck: {
      title: "Fact Check & Information Verification",
      subtitle: "Combat misinformation with AI-powered fact-checking and verified information sources",
      chatPlaceholder: "Type your question, paste a link, or upload an image...",
      mythVsReality: "Myth vs. Reality",
      verificationTips: "How to Verify Information",
    },
    resources: {
      title: "Community Resources & Engagement",
      subtitle: "Report incidents, connect with your community, and volunteer to help during crisis situations",
      reportForm: "Report Crisis or Disinformation",
      communityForum: "Community Forum",
      volunteerRegistration: "Volunteer Registration",
    },
    crisisGuide: {
      title: "Crisis Guide",
      emergencyHelp: "Quick Emergency Help:",
      earthquakeSafety: "Earthquake Safety",
      floodSafety: "Flood Emergency",
      cycloneSafety: "Cyclone Preparation",
      fireSafety: "Fire Emergency",
      medicalEmergency: "Medical Emergency",
      generalSafety: "General Safety",
    },
    about: {
      title: "Protecting Communities Through Information",
      subtitle:
        "CrisisGuard is a comprehensive crisis management and information warfare counter-response platform designed to keep communities safe, informed, and connected during emergencies.",
      mission: "Our Mission",
      missionDescription:
        "To provide a single, authoritative source of truth during crisis situations, combating misinformation while delivering real-time, verified information and coordinating community response efforts.",
      features: "Platform Features",
      featuresDescription:
        "Comprehensive tools and features designed to address the critical gaps in crisis communication and response.",
      technology: "Built for Reliability",
      technologyDescription:
        "Our platform leverages cutting-edge technology to ensure information accuracy and system reliability during critical situations.",
      getInvolved: "Get Involved",
      getInvolvedDescription:
        "Join our mission to create safer, more informed communities. Every contribution makes a difference.",
      volunteer: "Volunteer",
      report: "Report",
      verify: "Verify",
    },
    admin: {
      dashboard: "Admin Dashboard",
      volunteerManagement: "Volunteer Management",
      crisisReports: "Crisis Reports",
      siteSettings: "Site Settings",
      totalVolunteers: "Total Volunteers",
      activeReports: "Active Reports",
      verifiedFacts: "Verified Facts",
      systemStatus: "System Status",
    },
  },
  hi: {
    nav: {
      dashboard: "डैशबोर्ड",
      factCheck: "तथ्य जांच",
      resources: "संसाधन",
      about: "के बारे में",
      admin: "एडमिन",
      signIn: "साइन इन",
      signOut: "साइन आउट",
    },
    common: {
      loading: "लोड हो रहा है...",
      submit: "जमा करें",
      cancel: "रद्द करें",
      save: "सेव करें",
      delete: "हटाएं",
      edit: "संपादित करें",
      search: "खोजें",
      filter: "फिल्टर",
      emergency: "आपातकाल",
      verified: "सत्यापित",
      unverified: "असत्यापित",
      critical: "गंभीर",
      high: "उच्च",
      medium: "मध्यम",
      low: "कम",
      name: "नाम",
      email: "ईमेल",
      phone: "फोन",
      location: "स्थान",
      status: "स्थिति",
      actions: "कार्य",
    },
    home: {
      title: "संकट की जानकारी के लिए आपका विश्वसनीय स्रोत",
      subtitle: "आपातकाल के दौरान आपको सुरक्षित और सूचित रखने के लिए रीयल-टाइम अपडेट, सत्यापित तथ्य और आवश्यक संसाधन।",
      viewDashboard: "लाइव डैशबोर्ड देखें",
      checkInformation: "जानकारी जांचें",
      emergencyNotice: "आपातकालीन स्थिति?",
      emergencyDescription: "तत्काल सहायता के लिए, आपातकालीन सेवाओं से संपर्क करें या हमारे संकट गाइड का उपयोग करें।",
      callEmergency: "आपातकाल कॉल करें: 112",
      crisisGuide: "संकट गाइड",
    },
    dashboard: {
      title: "संकट प्रबंधन डैशबोर्ड",
      subtitle: "संकट स्थितियों और आपातकालीन प्रतिक्रिया संचालन की रीयल-टाइम निगरानी",
      activeIncidents: "सक्रिय घटनाएं",
      peopleAffected: "प्रभावित लोग",
      reliefCenters: "राहत केंद्र",
      responseRate: "प्रतिक्रिया दर",
      liveMap: "लाइव संकट मानचित्र",
      liveUpdates: "लाइव अपडेट",
      resourceTracker: "संसाधन ट्रैकर",
    },
    factCheck: {
      title: "तथ्य जांच और सूचना सत्यापन",
      subtitle: "AI-संचालित तथ्य-जांच और सत्यापित सूचना स्रोतों के साथ गलत सूचना का मुकाबला करें",
      chatPlaceholder: "अपना प्रश्न टाइप करें, लिंक पेस्ट करें, या छवि अपलोड करें...",
      mythVsReality: "मिथक बनाम वास्तविकता",
      verificationTips: "जानकारी कैसे सत्यापित करें",
    },
    resources: {
      title: "सामुदायिक संसाधन और सहभागिता",
      subtitle: "घटनाओं की रिपोर्ट करें, अपने समुदाय से जुड़ें, और संकट स्थितियों में मदद के लिए स्वयंसेवक बनें",
      reportForm: "संकट या गलत सूचना की रिपोर्ट करें",
      communityForum: "सामुदायिक मंच",
      volunteerRegistration: "स्वयंसेवक पंजीकरण",
    },
    crisisGuide: {
      title: "संकट गाइड",
      emergencyHelp: "त्वरित आपातकालीन सहायता:",
      earthquakeSafety: "भूकंप सुरक्षा",
      floodSafety: "बाढ़ आपातकाल",
      cycloneSafety: "चक्रवात तैयारी",
      fireSafety: "आग आपातकाल",
      medicalEmergency: "चिकित्सा आपातकाल",
      generalSafety: "सामान्य सुरक्षा",
    },
    about: {
      title: "सूचना के माध्यम से समुदायों की सुरक्षा",
      subtitle:
        "CrisisGuard एक व्यापक संकट प्रबंधन और सूचना युद्ध प्रति-प्रतिक्रिया प्लेटफॉर्म है जो आपातकाल के दौरान समुदायों को सुरक्षित, सूचित और जुड़े रखने के लिए डिज़ाइन किया गया है।",
      mission: "हमारा मिशन",
      missionDescription:
        "संकट स्थितियों के दौरान सत्य का एक एकल, आधिकारिक स्रोत प्रदान करना, गलत सूचना का मुकाबला करते हुए रीयल-टाइम, सत्यापित जानकारी प्रदान करना और सामुदायिक प्रतिक्रिया प्रयासों का समन्वय करना।",
      features: "प्लेटफॉर्म सुविधाएं",
      featuresDescription:
        "संकट संचार और प्रतिक्रिया में महत्वपूर्ण अंतराल को संबोधित करने के लिए डिज़ाइन किए गए व्यापक उपकरण और सुविधाएं।",
      technology: "विश्वसनीयता के लिए निर्मित",
      technologyDescription:
        "हमारा प्लेटफॉर्म महत्वपूर्ण स्थितियों के दौरान जानकारी की सटीकता और सिस्टम विश्वसनीयता सुनिश्चित करने के लिए अत्याधुनिक तकनीक का लाभ उठाता है।",
      getInvolved: "शामिल हों",
      getInvolvedDescription: "सुरक्षित, अधिक सूचित समुदाय बनाने के हमारे मिशन में शामिल हों। हर योगदान मायने रखता है।",
      volunteer: "स्वयंसेवक",
      report: "रिपोर्ट",
      verify: "सत्यापित करें",
    },
    admin: {
      dashboard: "एडमिन डैशबोर्ड",
      volunteerManagement: "स्वयंसेवक प्रबंधन",
      crisisReports: "संकट रिपोर्ट",
      siteSettings: "साइट सेटिंग्स",
      totalVolunteers: "कुल स्वयंसेवक",
      activeReports: "सक्रिय रिपोर्ट",
      verifiedFacts: "सत्यापित तथ्य",
      systemStatus: "सिस्टम स्थिति",
    },
  },
  ta: {
    nav: {
      dashboard: "டாஷ்போர்டு",
      factCheck: "உண்மை சரிபார்ப்பு",
      resources: "வளங்கள்",
      about: "பற்றி",
      admin: "நிர்வாகி",
      signIn: "உள்நுழைய",
      signOut: "வெளியேறு",
    },
    common: {
      loading: "ஏற்றுகிறது...",
      submit: "சமர்ப்பிக்கவும்",
      cancel: "ரத்து செய்",
      save: "சேமிக்கவும்",
      delete: "நீக்கு",
      edit: "திருத்து",
      search: "தேடு",
      filter: "வடிகட்டி",
      emergency: "அவசரநிலை",
      verified: "சரிபார்க்கப்பட்டது",
      unverified: "சரிபார்க்கப்படாதது",
      critical: "முக்கியமான",
      high: "உயர்",
      medium: "நடுத்தர",
      low: "குறைந்த",
      name: "பெயர்",
      email: "மின்னஞ்சல்",
      phone: "தொலைபேசி",
      location: "இடம்",
      status: "நிலை",
      actions: "செயல்கள்",
    },
    home: {
      title: "நெருக்கடி தகவலுக்கான உங்கள் நம்பகமான ஆதாரம்",
      subtitle:
        "அவசரநிலைகளின் போது உங்களை பாதுகாப்பாகவும் தகவலறிந்தவராகவும் வைத்திருக்க நிகழ்நேர புதுப்பிப்புகள், சரிபார்க்கப்பட்ட உண்மைகள் மற்றும் அத்தியாவசிய வளங்கள்.",
      viewDashboard: "நேரடி டாஷ்போர்டைப் பார்க்கவும்",
      checkInformation: "தகவலைச் சரிபார்க்கவும்",
      emergencyNotice: "அவசரநிலை?",
      emergencyDescription: "உடனடி உதவிக்கு, அவசரகால சேவைகளைத் தொடர்பு கொள்ளவும் அல்லது எங்கள் நெருக்கடி வழிகாட்டியைப் பயன்படுத்தவும்.",
      callEmergency: "அவசரநிலை அழைப்பு: 112",
      crisisGuide: "நெருக்கடி வழிகாட்டி",
    },
    dashboard: {
      title: "நெருக்கடி மேலாண்மை டாஷ்போர்டு",
      subtitle: "நெருக்கடி சூழ்நிலைகள் மற்றும் அவசரகால மறுமொழி நடவடிக்கைகளின் நிகழ்நேர கண்காணிப்பு",
      activeIncidents: "செயலில் உள்ள சம்பவங்கள்",
      peopleAffected: "பாதிக்கப்பட்ட மக்கள்",
      reliefCenters: "நிவாரண மையங்கள்",
      responseRate: "மறுமொழி விகிதம்",
      liveMap: "நேரடி நெருக்கடி வரைபடம்",
      liveUpdates: "நேரடி புதுப்பிப்புகள்",
      resourceTracker: "வள கண்காணிப்பாளர்",
    },
    factCheck: {
      title: "உண்மை சரிபார்ப்பு மற்றும் தகவல் சரிபார்ப்பு",
      subtitle: "AI-இயங்கும் உண்மை-சரிபார்ப்பு மற்றும் சரிபார்க்கப்பட்ட தகவல் ஆதாரங்களுடன் தவறான தகவலை எதிர்த்துப் போராடுங்கள்",
      chatPlaceholder: "உங்கள் கேள்வியை தட்டச்சு செய்யவும், இணைப்பை ஒட்டவும் அல்லது படத்தை பதிவேற்றவும்...",
      mythVsReality: "கட்டுக்கதை vs உண்மை",
      verificationTips: "தகவலை எவ்வாறு சரிபார்ப்பது",
    },
    resources: {
      title: "சமூக வளங்கள் மற்றும் ஈடுபாடு",
      subtitle: "சம்பவங்களைப் புகாரளிக்கவும், உங்கள் சமூகத்துடன் இணைக்கவும், நெருக்கடி சூழ்நிலைகளில் உதவ தன்னார்வலராக இருங்கள்",
      reportForm: "நெருக்கடி அல்லது தவறான தகவலைப் புகாரளிக்கவும்",
      communityForum: "சமூக மன்றம்",
      volunteerRegistration: "தன்னார்வலர் பதிவு",
    },
    crisisGuide: {
      title: "நெருக்கடி வழிகாட்டி",
      emergencyHelp: "விரைவான அவசரகால உதவி:",
      earthquakeSafety: "பூகம்ப பாதுகாப்பு",
      floodSafety: "வெள்ள அவசரநிலை",
      cycloneSafety: "சூறாவளி தயாரிப்பு",
      fireSafety: "தீ அவசரநிலை",
      medicalEmergency: "மருத்துவ அவசரநிலை",
      generalSafety: "பொது பாதுகாப்பு",
    },
    about: {
      title: "தகவல் மூலம் சமூகங்களைப் பாதுகாத்தல்",
      subtitle:
        "CrisisGuard என்பது ஒரு விரிவான நெருக்கடி மேலாண்மை மற்றும் தகவல் போர் எதிர்-மறுமொழி தளமாகும், இது அவசரநிலைகளின் போது சமூகங்களை பாதுகாப்பாகவும், தகவலறிந்தவராகவும், இணைக்கப்பட்டதாகவும் வைத்திருக்க வடிவமைக்கப்பட்டுள்ளது.",
      mission: "எங்கள் நோக்கம்",
      missionDescription:
        "நெருக்கடி சூழ்நிலைகளின் போது உண்மையின் ஒற்றை, அதிகாரபூர்வ ஆதாரத்தை வழங்குவது, தவறான தகவலை எதிர்த்துப் போராடுவது, நிகழ்நேர, சரிபார்க்கப்பட்ட தகவலை வழங்குவது மற்றும் சமூக மறுமொழி முயற்சிகளை ஒருங்கிணைப்பது.",
      features: "தள அம்சங்கள்",
      featuresDescription:
        "நெருக்கடி தொடர்பு மற்றும் மறுமொழியில் உள்ள முக்கியமான இடைவெளிகளை நிவர்த்தி செய்ய வடிவமைக்கப்பட்ட விரிவான கருவிகள் மற்றும் அம்சங்கள்.",
      technology: "நம்பகத்தன்மைக்காக கட்டமைக்கப்பட்டது",
      technologyDescription:
        "முக்கியமான சூழ்நிலைகளின் போது தகவல் துல்லியம் மற்றும் கணினி நம்பகத்தன்மையை உறுதி செய்ய எங்கள் தளம் அதிநவீன தொழில்நுட்பத்தை பயன்படுத்துகிறது.",
      getInvolved: "ஈடுபடுங்கள்",
      getInvolvedDescription:
        "பாதுகாப்பான, அதிக தகவலறிந்த சமூகங்களை உருவாக்கும் எங்கள் நோக்கத்தில் சேருங்கள். ஒவ்வொரு பங்களிப்பும் வித்தியாசத்தை ஏற்படுத்துகிறது.",
      volunteer: "தன்னார்வலர்",
      report: "புகாரளிக்கவும்",
      verify: "சரிபார்க்கவும்",
    },
    admin: {
      dashboard: "நிர்வாக டாஷ்போர்டு",
      volunteerManagement: "தன்னார்வலர் மேலாண்மை",
      crisisReports: "நெருக்கடி அறிக்கைகள்",
      siteSettings: "தள அமைப்புகள்",
      totalVolunteers: "மொத்த தன்னார்வலர்கள்",
      activeReports: "செயலில் உள்ள அறிக்கைகள்",
      verifiedFacts: "சரிபார்க்கப்பட்ட உண்மைகள்",
      systemStatus: "கணினி நிலை",
    },
  },
}

export function getTranslation(language: Language): Translations {
  return translations[language] || translations.en
}
