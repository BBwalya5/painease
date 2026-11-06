export type Condition = {
  slug: string;
  name: string;
  summary: string;
  symptoms: string[];
  selfCare: string[];
  therapies: string[];
  seeHelp: string[];
};

export const conditions: Condition[] = [
  { slug: "menstrual-pain", name: "Menstrual pain", summary: "Cramping in the lower belly, back or thighs before or during a period. Very common, and often eased with heat and gentle movement.",
    symptoms: ["Cramps in the lower belly", "Lower back ache", "Pain spreading to thighs", "Nausea or tiredness"],
    selfCare: ["Warmth on the lower belly", "Gentle walking or stretching", "Rest and enough water", "Track pain across your cycle"],
    therapies: ["Heat", "Gentle vibration", "Breathing"],
    seeHelp: ["Pain stops you doing normal activities", "Very heavy bleeding or bleeding between periods", "Pain gets worse over months"] },
  { slug: "fibroids", name: "Fibroids", summary: "Non-cancerous growths in the womb. Many cause no symptoms; others cause heavy periods, pelvic pressure or pain.",
    symptoms: ["Heavy or long periods", "Pelvic pressure or fullness", "Lower back pain", "Needing to pass urine often"],
    selfCare: ["Note bleeding and pain in your tracker", "Warmth for cramping", "Iron-rich food if periods are heavy"],
    therapies: ["Heat", "Breathing", "Stretching"],
    seeHelp: ["Soaking through pads hourly", "Feeling dizzy or very tired", "Sudden severe pelvic pain"] },
  { slug: "ovarian-cysts", name: "Ovarian cysts", summary: "Fluid-filled sacs on an ovary. Most are harmless and go away on their own, but some cause pelvic pain.",
    symptoms: ["Dull ache on one side of the pelvis", "Bloating", "Pain during sex", "Feeling full quickly"],
    selfCare: ["Warmth for dull aches", "Rest when pain flares", "Record which side hurts and when"],
    therapies: ["Heat", "Breathing"],
    seeHelp: ["Sudden, sharp pelvic pain", "Pain with fever or vomiting", "Feeling faint"] },
  { slug: "endometriosis", name: "Endometriosis", summary: "Tissue like the womb lining grows outside the womb, causing long-term pelvic pain that is often worse around periods.",
    symptoms: ["Painful periods", "Pelvic pain between periods", "Pain during sex or bowel movements", "Tiredness"],
    selfCare: ["Keep a detailed pain diary to share with a doctor", "Heat and gentle movement", "Pace activities on bad days"],
    therapies: ["Heat", "Red light", "Breathing", "Stretching"],
    seeHelp: ["Pain affects work, school or relationships", "Trouble getting pregnant", "Pain not helped by usual relief"] },
  { slug: "pcos", name: "PCOS", summary: "Polycystic ovary syndrome affects hormones, periods and sometimes pelvic comfort.",
    symptoms: ["Irregular or missed periods", "Pelvic discomfort", "Acne or extra hair growth", "Weight changes"],
    selfCare: ["Track your cycle", "Regular activity you enjoy", "Balanced meals and good sleep"],
    therapies: ["Mobility", "Breathing", "Heat"],
    seeHelp: ["No period for 3 months or more", "Trouble getting pregnant", "Low mood"] },
  { slug: "chronic-pain", name: "Chronic pain", summary: "Pain lasting more than three months. It can affect sleep, mood and daily life, and is best managed with a mix of approaches.",
    symptoms: ["Ongoing aching or burning", "Stiffness", "Poor sleep", "Low energy or mood"],
    selfCare: ["Pace activity: little and often", "Relaxation and breathing", "Track what helps and what flares it"],
    therapies: ["Heat", "Vibration", "Red light", "Breathing", "Mobility"],
    seeHelp: ["New numbness or weakness", "Pain with weight loss or fever", "Feeling hopeless"] },
  { slug: "back-and-neck-pain", name: "Back and neck pain", summary: "Very common pain often linked to posture, strain or long sitting. Most improves within weeks with movement.",
    symptoms: ["Stiffness", "Aching or sharp pain", "Pain spreading to arm or leg", "Muscle tightness"],
    selfCare: ["Keep gently moving", "Take breaks from sitting", "Warmth on tight muscles"],
    therapies: ["Heat", "Vibration", "Stretching", "Mobility"],
    seeHelp: ["Numbness around the groin or bottom", "Loss of bladder or bowel control", "Weakness in legs or arms", "Pain after a fall or injury"] },
  { slug: "muscle-and-joint-pain", name: "Muscle and joint pain", summary: "Aches, stiffness or swelling in muscles and joints from overuse, strain or long-term conditions.",
    symptoms: ["Stiffness, often in the morning", "Swelling", "Aching with movement", "Reduced range of movement"],
    selfCare: ["Gentle range-of-motion exercises", "Warmth for stiffness", "Rest from activities that strain the area"],
    therapies: ["Heat", "Red light", "Vibration", "Mobility"],
    seeHelp: ["Hot, red, very swollen joint", "Can't bear weight", "Pain with fever"] },
];

export const conditionBySlug = (slug: string) => conditions.find((c) => c.slug === slug);
