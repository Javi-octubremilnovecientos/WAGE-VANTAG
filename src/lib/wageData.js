// EU Country wage data (in thousands EUR/month) with statistical distribution
// Source: Eurostat-inspired sample data for demonstration
export const EU_COUNTRIES = [
  "Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
  "Denmark", "Estonia", "Finland", "France", "Germany", "Greece",
  "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg",
  "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia",
  "Slovenia", "Spain", "Sweden", "Switzerland", "Russia"
];

// Box-plot data: { min, q1, median, q3, max } in thousands EUR
export const COUNTRY_WAGE_DATA = {
  "Austria":        { min: 1.8, q1: 2.8, median: 3.4, q3: 4.4, max: 6.2 },
  "Belgium":        { min: 1.9, q1: 2.9, median: 3.5, q3: 4.5, max: 6.5 },
  "Bulgaria":       { min: 0.4, q1: 0.6, median: 0.9, q3: 1.3, max: 2.1 },
  "Croatia":        { min: 0.6, q1: 0.9, median: 1.2, q3: 1.7, max: 2.5 },
  "Cyprus":         { min: 0.9, q1: 1.4, median: 1.8, q3: 2.5, max: 3.8 },
  "Czech Republic": { min: 0.8, q1: 1.2, median: 1.6, q3: 2.2, max: 3.4 },
  "Denmark":        { min: 2.5, q1: 3.8, median: 4.5, q3: 5.5, max: 7.5 },
  "Estonia":        { min: 0.7, q1: 1.1, median: 1.5, q3: 2.1, max: 3.2 },
  "Finland":        { min: 1.8, q1: 2.8, median: 3.4, q3: 4.3, max: 6.0 },
  "France":         { min: 1.5, q1: 2.3, median: 3.0, q3: 4.0, max: 6.0 },
  "Germany":        { min: 1.6, q1: 2.8, median: 3.6, q3: 4.8, max: 7.0 },
  "Greece":         { min: 0.6, q1: 0.9, median: 1.2, q3: 1.8, max: 2.8 },
  "Hungary":        { min: 0.5, q1: 0.8, median: 1.1, q3: 1.6, max: 2.5 },
  "Ireland":        { min: 2.0, q1: 3.0, median: 3.8, q3: 5.0, max: 7.2 },
  "Italy":          { min: 1.2, q1: 1.8, median: 2.4, q3: 3.2, max: 5.0 },
  "Latvia":         { min: 0.5, q1: 0.8, median: 1.1, q3: 1.6, max: 2.5 },
  "Lithuania":      { min: 0.5, q1: 0.9, median: 1.2, q3: 1.7, max: 2.7 },
  "Luxembourg":     { min: 2.5, q1: 4.0, median: 5.0, q3: 6.5, max: 9.0 },
  "Malta":          { min: 0.9, q1: 1.3, median: 1.7, q3: 2.3, max: 3.5 },
  "Netherlands":    { min: 1.8, q1: 2.8, median: 3.5, q3: 4.6, max: 6.8 },
  "Poland":         { min: 0.6, q1: 0.9, median: 1.3, q3: 1.9, max: 3.0 },
  "Portugal":       { min: 0.7, q1: 1.0, median: 1.3, q3: 1.9, max: 3.0 },
  "Romania":        { min: 0.4, q1: 0.7, median: 1.0, q3: 1.5, max: 2.3 },
  "Slovakia":       { min: 0.6, q1: 1.0, median: 1.3, q3: 1.8, max: 2.8 },
  "Slovenia":       { min: 0.9, q1: 1.4, median: 1.9, q3: 2.6, max: 3.8 },
  "Spain":          { min: 0.9, q1: 1.5, median: 2.0, q3: 2.8, max: 4.5 },
  "Sweden":         { min: 2.0, q1: 3.0, median: 3.6, q3: 4.5, max: 6.5 },
  "Switzerland":    { min: 3.5, q1: 5.0, median: 6.2, q3: 7.8, max: 10.5 },
  "Russia":         { min: 0.3, q1: 0.5, median: 0.8, q3: 1.2, max: 2.0 },
};

export const ECONOMIC_ACTIVITIES = [
  "Agriculture; forest and field activities",
  "Mining and quarrying",
  "Manufacturing, textil works",
  "Manufacturing, paper and card",
  "Manufacturing, plastic transform",
  "Electricity, gas, steam supply",
  "Water supply; sewerage, waste",
  "Construction",
  "Wholesale and retail trade",
  "Transportation and storage",
  "Accommodation and food service",
  "Information and communication",
  "Financial and insurance activities",
  "Real estate activities",
  "Professional, scientific, technical",
  "Administrative and support services",
  "Public administration and defence",
  "Education",
  "Human health and social work",
  "Arts, entertainment, recreation",
  "Other service activities",
];

export const OCCUPATIONS = [
  "Manager, director",
  "Professional, specialist",
  "Technician, associate professional",
  "Clerical support worker",
  "Service and sales worker",
  "Skilled agricultural worker",
  "Craft and related trades worker",
  "Plant and machine operator",
  "Elementary occupation",
  "Organization, Non Governament",
];

export const POSITIONS = [
  "First operator",
  "Senior specialist",
  "Mid-level employee",
  "Junior employee",
  "Intern / Trainee",
  "Team lead",
  "Department head",
  "Executive / C-level",
];

export const EDUCATION_LEVELS = [
  "Primary education",
  "Lower secondary",
  "Upper secondary",
  "Post-secondary non-tertiary",
  "Short-cycle tertiary",
  "Bachelor's or equivalent",
  "Master's or equivalent",
  "Doctoral or equivalent",
];

export const COMPANY_SIZES = [
  "1-9 employees",
  "10-49 employees",
  "50-249 employees",
  "250-999 employees",
  "1000+ employees",
];

export const EXPERIENCE_RANGES = [
  "Less than 1 year",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10-20 years",
  "20+ years",
];

// Historical wage data for premium charts
export const HISTORICAL_WAGE_DATA = {
  "Spain": [
    { period: "2020 Q1", avg: 1.8, min: 0.8, max: 3.5 },
    { period: "2021 Q2", avg: 1.9, min: 0.9, max: 3.7 },
    { period: "2023 Q3", avg: 2.0, min: 0.9, max: 4.0 },
  ],
  "Portugal": [
    { period: "2020 Q1", avg: 1.1, min: 0.6, max: 2.2 },
    { period: "2021 Q2", avg: 1.2, min: 0.7, max: 2.5 },
    { period: "2023 Q3", avg: 1.3, min: 0.7, max: 2.8 },
  ],
  "Germany": [
    { period: "2020 Q1", avg: 3.3, min: 1.5, max: 6.0 },
    { period: "2021 Q2", avg: 3.5, min: 1.6, max: 6.5 },
    { period: "2023 Q3", avg: 3.6, min: 1.6, max: 7.0 },
  ],
};

// Sector distribution data for pie charts
export const SECTOR_DISTRIBUTION = {
  "Spain": [
    { name: "Services", value: 762 },
    { name: "Industry", value: 658 },
    { name: "Construction", value: 740 },
    { name: "Agriculture", value: 577 },
    { name: "Technology", value: 959 },
    { name: "Public", value: 203 },
    { name: "Other", value: 93 },
    { name: "Finance", value: 315 },
  ],
  "Portugal": [
    { name: "Services", value: 520 },
    { name: "Industry", value: 430 },
    { name: "Construction", value: 380 },
    { name: "Agriculture", value: 290 },
    { name: "Technology", value: 610 },
    { name: "Public", value: 180 },
    { name: "Other", value: 75 },
    { name: "Finance", value: 245 },
  ],
};