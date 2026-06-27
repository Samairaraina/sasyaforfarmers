const express = require('express');
const router = express.Router();

const mockCropData = {
  wheat: {
    baseYield: 42,
    lossFactors: { drought: 0.3, flood: 0.4, pest: 0.2, disease: 0.15 },
    recommendations: [
      'Apply nitrogen-rich fertilizer at early growth stages',
      'Ensure proper irrigation during grain filling period',
      'Monitor for rust and aphid infestation weekly',
    ],
  },
  rice: {
    baseYield: 45,
    lossFactors: { drought: 0.4, flood: 0.2, pest: 0.25, disease: 0.2 },
    recommendations: [
      'Maintain 5cm water level during vegetative stage',
      'Apply potassium fertilizer for disease resistance',
      'Use certified seeds for better germination',
    ],
  },
  maize: {
    baseYield: 38,
    lossFactors: { drought: 0.35, flood: 0.3, pest: 0.3, disease: 0.2 },
    recommendations: [
      'Ensure adequate nitrogen at knee-height stage',
      'Control weeds within first 6 weeks',
      'Monitor for fall armyworm regularly',
    ],
  },
  mustard: {
    baseYield: 15,
    lossFactors: { drought: 0.25, flood: 0.45, pest: 0.2, disease: 0.25 },
    recommendations: [
      'Provide adequate irrigation at flowering stage',
      'Apply sulfur fertilizer for oil content',
      'Control aphids with neem-based pesticides',
    ],
  },
  sugarcane: {
    baseYield: 70,
    lossFactors: { drought: 0.3, flood: 0.25, pest: 0.2, disease: 0.2 },
    recommendations: [
      'Ensure 8-10 irrigations during growing period',
      'Apply organic manure before planting',
      'Control stem borer with biological agents',
    ],
  },
  cotton: {
    baseYield: 25,
    lossFactors: { drought: 0.35, flood: 0.35, pest: 0.35, disease: 0.25 },
    recommendations: [
      'Monitor pink bollworm with pheromone traps',
      'Apply fertilizer in split doses',
      'Ensure proper drainage during monsoon',
    ],
  },
};

router.post('/predict-loss', (req, res) => {
  const { cropType, temperature, rainfall, humidity } = req.body;

  const crop = mockCropData[cropType];
  if (!crop) {
    return res.status(400).json({ error: 'Invalid crop type' });
  }

  const tempFactor = temperature > 35 ? 0.2 : temperature < 15 ? 0.15 : 0;
  const rainFactor = rainfall > 300 ? 0.25 : rainfall < 50 ? 0.2 : 0;
  const humidityFactor = humidity > 85 ? 0.15 : humidity < 30 ? 0.1 : 0;

  const totalLossFactor = tempFactor + rainFactor + humidityFactor;
  const lossPercentage = Math.min(Math.round(totalLossFactor * 100 + Math.random() * 10), 45);
  const predictedYield = Math.round((crop.baseYield * (1 - lossPercentage / 100)) * 10) / 10;

  let riskLevel = 'Low';
  if (lossPercentage > 30) riskLevel = 'Critical';
  else if (lossPercentage > 20) riskLevel = 'High';
  else if (lossPercentage > 10) riskLevel = 'Moderate';

  setTimeout(() => {
    res.json({
      cropType,
      predictedYield,
      lossPercentage,
      riskLevel,
      recommendations: crop.recommendations,
      details: {
        temperature: { value: temperature, impact: tempFactor > 0 ? 'adverse' : 'favorable' },
        rainfall: { value: rainfall, impact: rainFactor > 0 ? 'adverse' : 'favorable' },
        humidity: { value: humidity, impact: humidityFactor > 0 ? 'adverse' : 'favorable' },
      },
    });
  }, 1500);
});

const diseaseDatabase = {
  'Leaf Blight': {
    symptoms: ['Yellow to brown spots on leaves', 'Lesions with dark borders', 'Leaf drying from tips'],
    prevention: ['Use disease-resistant varieties', 'Practice crop rotation', 'Avoid overhead irrigation'],
    treatment: ['Apply fungicide containing Mancozeb', 'Remove and destroy infected leaves', 'Spray at 10-day intervals'],
    fertilizers: ['Potassium-rich fertilizer', 'Foliar spray of micronutrients'],
  },
  'Powdery Mildew': {
    symptoms: ['White powdery coating on leaves', 'Stunted plant growth', 'Yellowing of infected tissue'],
    prevention: ['Ensure proper air circulation', 'Avoid excessive nitrogen', 'Plant resistant varieties'],
    treatment: ['Apply sulfur-based fungicide', 'Use neem oil spray weekly', 'Remove severely infected parts'],
    fertilizers: ['Balanced NPK fertilizer', 'Silicon-based supplements'],
  },
  'Rust': {
    symptoms: ['Rust-colored pustules on leaves', 'Orange to brown spots', 'Premature leaf drop'],
    prevention: ['Use rust-resistant cultivars', 'Avoid dense planting', 'Remove crop residue after harvest'],
    treatment: ['Apply fungicide with Propiconazole', 'Spray at first sign of infection', 'Repeat every 2 weeks'],
    fertilizers: ['Avoid excess nitrogen', 'Apply potash for resistance'],
  },
  'Bacterial Wilt': {
    symptoms: ['Sudden wilting of leaves', 'Vascular tissue discoloration', 'Yellowing and stunting'],
    prevention: ['Use certified disease-free seeds', 'Practice long crop rotation', 'Improve soil drainage'],
    treatment: ['Apply copper-based bactericide', 'Remove and burn infected plants', 'Solarize soil before planting'],
    fertilizers: ['Calcium nitrate application', 'Organic compost for soil health'],
  },
};

router.post('/detect-disease', (req, res) => {
  const diseases = Object.keys(diseaseDatabase);
  const isHealthy = Math.random() < 0.2;
  const confidence = Math.round((85 + Math.random() * 13) * 10) / 10;

  setTimeout(() => {
    if (isHealthy) {
      return res.json({
        healthy: true,
        message: 'Your crop appears healthy with no signs of disease.',
        confidence,
      });
    }

    const diseaseName = diseases[Math.floor(Math.random() * diseases.length)];
    const disease = diseaseDatabase[diseaseName];

    res.json({
      healthy: false,
      diseaseName,
      confidence,
      symptoms: disease.symptoms,
      prevention: disease.prevention,
      treatment: disease.treatment,
      fertilizers: disease.fertilizers,
    });
  }, 2000);
});

router.post('/irrigation-advice', (req, res) => {
  const { soilMoisture, cropStage } = req.body;

  const stageNeeds = {
    vegetative: { minWater: 8, maxWater: 12, freqDays: 3 },
    flowering: { minWater: 12, maxWater: 18, freqDays: 2 },
    fruiting: { minWater: 15, maxWater: 22, freqDays: 2 },
    maturity: { minWater: 5, maxWater: 8, freqDays: 5 },
  };

  const need = stageNeeds[cropStage] || stageNeeds.vegetative;
  const moistureFactor = (100 - soilMoisture) / 100;
  const waterRequired = Math.round((need.minWater + (need.maxWater - need.minWater) * moistureFactor) * 10) / 10;
  const nextIrrigation = Math.max(1, Math.round(need.freqDays * (soilMoisture / 100)));

  let recommendation = 'Your soil has adequate moisture. ';
  if (soilMoisture < 30) {
    recommendation = 'Soil is very dry. Immediate irrigation required. ';
  } else if (soilMoisture < 50) {
    recommendation = 'Soil moisture is low. Schedule irrigation soon. ';
  }

  recommendation += `During ${cropStage} stage, maintain consistent moisture for optimal growth.`;

  const schedule = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  for (let i = 0; i < 7; i++) {
    schedule.push({
      day: days[i],
      amount: i % nextIrrigation === 0 ? `${waterRequired}L/m²` : 'None',
      recommended: i % nextIrrigation === 0,
    });
  }

  const conservationTips = [
    'Use drip irrigation to reduce water usage by up to 40%',
    'Apply mulch around plants to retain soil moisture',
    'Irrigate in early morning or late evening to reduce evaporation',
    'Collect rainwater for supplemental irrigation needs',
  ];

  setTimeout(() => {
    res.json({ waterRequired, nextIrrigation, recommendation, schedule, conservationTips });
  }, 1500);
});

router.post('/recommend-crops', (req, res) => {
  const { soilType, location, rainfall, season } = req.body;

  const cropDatabase = {
    kharif: {
      loamy: [
        { name: 'Rice', yield: 45, profit: 4, water: 'High', period: 120, description: 'Staple food crop suitable for rainy season' },
        { name: 'Maize', yield: 38, profit: 3, water: 'Medium', period: 90, description: 'Versatile cereal with good market demand' },
        { name: 'Sugarcane', yield: 70, profit: 4, water: 'High', period: 365, description: 'High-value cash crop' },
      ],
      clay: [
        { name: 'Rice', yield: 48, profit: 4, water: 'High', period: 120, description: 'Thrives in water-retentive clay soil' },
        { name: 'Cotton', yield: 22, profit: 4, water: 'Medium', period: 180, description: 'Important fiber crop' },
      ],
      sandy: [
        { name: 'Maize', yield: 32, profit: 3, water: 'Medium', period: 90, description: 'Tolerant to sandy soil conditions' },
        { name: 'Groundnut', yield: 18, profit: 4, water: 'Low', period: 110, description: 'Oilseed crop good for sandy soil' },
      ],
      silty: [
        { name: 'Rice', yield: 44, profit: 4, water: 'High', period: 120, description: 'Excellent for silt-rich soil' },
        { name: 'Sugarcane', yield: 65, profit: 4, water: 'High', period: 365, description: 'Good yield in silty soil' },
      ],
      peaty: [
        { name: 'Rice', yield: 40, profit: 3, water: 'High', period: 120, description: 'Acid-tolerant varieties recommended' },
        { name: 'Vegetables', yield: 30, profit: 4, water: 'Medium', period: 60, description: 'Organic vegetables thrive' },
      ],
    },
    rabi: {
      loamy: [
        { name: 'Wheat', yield: 42, profit: 4, water: 'Medium', period: 120, description: 'Premium staple crop' },
        { name: 'Mustard', yield: 15, profit: 3, water: 'Low', period: 110, description: 'Oilseed with stable prices' },
        { name: 'Barley', yield: 30, profit: 3, water: 'Medium', period: 100, description: 'Good for animal feed' },
      ],
      clay: [
        { name: 'Wheat', yield: 44, profit: 4, water: 'Medium', period: 120, description: 'Excellent yield in clay soil' },
        { name: 'Chickpea', yield: 18, profit: 4, water: 'Low', period: 100, description: 'High-protein pulse crop' },
      ],
      sandy: [
        { name: 'Mustard', yield: 14, profit: 3, water: 'Low', period: 110, description: 'Drought-tolerant oilseed' },
        { name: 'Potato', yield: 28, profit: 4, water: 'Medium', period: 90, description: 'High-value vegetable crop' },
      ],
      silty: [
        { name: 'Wheat', yield: 40, profit: 4, water: 'Medium', period: 120, description: 'Good moisture retention' },
        { name: 'Peas', yield: 12, profit: 3, water: 'Low', period: 90, description: 'Green vegetable with demand' },
      ],
      peaty: [
        { name: 'Potato', yield: 25, profit: 3, water: 'Medium', period: 90, description: 'Acidic soil tolerant' },
        { name: 'Barley', yield: 28, profit: 3, water: 'Medium', period: 100, description: 'Good fodder crop' },
      ],
    },
    zaid: {
      loamy: [
        { name: 'Watermelon', yield: 35, profit: 4, water: 'Medium', period: 80, description: 'Summer fruit with high demand' },
        { name: 'Cucumber', yield: 20, profit: 3, water: 'Medium', period: 60, description: 'Quick-growing summer vegetable' },
      ],
      clay: [
        { name: 'Moong Dal', yield: 12, profit: 3, water: 'Low', period: 70, description: 'Short-duration pulse crop' },
      ],
      sandy: [
        { name: 'Watermelon', yield: 38, profit: 4, water: 'Medium', period: 80, description: 'Thrives in well-drained sandy soil' },
        { name: 'Muskmelon', yield: 30, profit: 4, water: 'Medium', period: 75, description: 'Profitable summer crop' },
      ],
      silty: [
        { name: 'Cucumber', yield: 22, profit: 3, water: 'Medium', period: 60, description: 'Good for silty river beds' },
        { name: 'Pumpkin', yield: 28, profit: 3, water: 'Medium', period: 90, description: 'Storage-friendly vegetable' },
      ],
      peaty: [
        { name: 'Moong Dal', yield: 10, profit: 3, water: 'Low', period: 70, description: 'Soil-enriching pulse crop' },
      ],
    },
  };

  const seasonData = cropDatabase[season];
  if (!seasonData) return res.status(400).json({ error: 'Invalid season' });

  const soilData = seasonData[soilType];
  if (!soilData) {
    const fallback = seasonData['loamy'] || [];
    return res.json({ crops: fallback });
  }

  setTimeout(() => {
    res.json({ crops: soilData });
  }, 1500);
});

const marketPrices = [
  { commodity: 'Wheat', price: 2150, change: 2.5, trend: 'up' },
  { commodity: 'Rice', price: 1950, change: -1.2, trend: 'down' },
  { commodity: 'Maize', price: 1820, change: 0.8, trend: 'up' },
  { commodity: 'Mustard', price: 4250, change: 3.1, trend: 'up' },
  { commodity: 'Vegetables', price: 1500, change: -0.5, trend: 'down' },
];

router.get('/market-prices', (req, res) => {
  res.json({ prices: marketPrices });
});

router.post('/predict-price', (req, res) => {
  const { commodity } = req.body;
  const current = marketPrices.find((p) => p.commodity.toLowerCase() === commodity?.toLowerCase());

  if (!current) return res.status(400).json({ error: 'Invalid commodity' });

  const variance = (Math.random() - 0.5) * 400;
  const predictedPrice = Math.round(current.price + variance);
  const trend = variance > 50 ? 'up' : variance < -50 ? 'down' : 'stable';

  let recommendation = 'Hold inventory';
  if (trend === 'up') recommendation = 'Hold for better price';
  else if (trend === 'down') recommendation = 'Sell now to avoid loss';

  setTimeout(() => {
    res.json({
      commodity: current.commodity,
      currentPrice: current.price,
      predictedPrice,
      trend,
      recommendation,
      expectedPrice: predictedPrice,
    });
  }, 1000);
});

router.post('/chat', (req, res) => {
  const { message, language } = req.body;
  const msg = message.toLowerCase();

  let response = '';

  if (language === 'hi') {
    if (msg.includes('गेहूं') || msg.includes('फसल')) {
      response = 'गेहूं की खेती के लिए अच्छी जल निकासी वाली दोमट मिट्टी सबसे उपयुक्त है। बुवाई से पहले खेत में पर्याप्त मात्रा में जैविक खाद डालें। सिंचाई फसल की अवस्था के अनुसार करें।';
    } else if (msg.includes('रोग') || msg.includes('बीमारी')) {
      response = 'फसलों में रोगों की रोकथाम के लिए उन्नत प्रतिरोधी किस्मों का उपयोग करें, फसल चक्र अपनाएं, और समय-समय पर निगरानी रखें। रोग लगने पर उपयुक्त फफूंदनाशक का छिड़काव करें।';
    } else if (msg.includes('मौसम')) {
      response = 'आपके क्षेत्र के मौसम पूर्वानुमान के अनुसार, अगले कुछ दिनों में हल्की बारिश की संभावना है। फसल की कटाई की योजना मौसम साफ होने पर बनाएं।';
    } else if (msg.includes('सरकारी') || msg.includes('योजना')) {
      response = 'प्रधानमंत्री किसान सम्मान निधि (PM-KISAN) के तहत पात्र किसानों को सालाना ₹6000 मिलते हैं। आवेदन के लिए अपने नजदीकी कृषि सेवा केंद्र पर संपर्क करें।';
    } else {
      response = 'नमस्ते! मैं आपका AI कृषि सहायक हूं। कृपया फसलों, बीमारियों, मौसम, या सरकारी योजनाओं के बारे में पूछें।';
    }
  } else {
    if (msg.includes('wheat') || msg.includes('crop')) {
      response = 'For wheat cultivation, well-drained loamy soil is best. Apply adequate organic manure before sowing and ensure proper irrigation during the grain-filling stage for optimal yield.';
    } else if (msg.includes('disease') || msg.includes('pest')) {
      response = 'To prevent crop diseases, use resistant varieties, practice crop rotation, and maintain regular field monitoring. If infection occurs, apply appropriate fungicides or bactericides as recommended.';
    } else if (msg.includes('weather') || msg.includes('rain')) {
      response = 'Based on weather forecasts, light rainfall is expected in your region over the next few days. Plan harvesting activities accordingly during clear weather windows.';
    } else if (msg.includes('scheme') || msg.includes('government') || msg.includes('pm')) {
      response = 'Under PM-KISAN scheme, eligible farmers receive ₹6,000 annually. Apply at your nearest agriculture service center or through the official PM-KISAN portal with your Aadhaar and land documents.';
    } else {
      response = 'Namaste! I am your AI farming assistant. Ask me about crops, diseases, weather, government schemes, or any farming-related questions!';
    }
  }

  setTimeout(() => {
    res.json({ response });
  }, 1500);
});

const governmentSchemes = [
  {
    id: 1,
    name: 'PM-KISAN',
    description: 'Income support of ₹6,000 per year to all landholding farmers',
    ministry: 'Ministry of Agriculture',
    state: 'All India',
    benefit: '₹6,000/year',
    eligibility: ['All landholding farmers', 'Families with cultivable land'],
    benefits: ['Direct cash transfer of ₹2,000 every 4 months', 'No middlemen involved', 'Aadhaar-based verification'],
    howToApply: ['Visit PM-KISAN portal', 'Provide Aadhaar and land documents', 'Register through local agriculture office'],
    website: 'https://pmkisan.gov.in',
  },
  {
    id: 2,
    name: 'PMFBY (Crop Insurance)',
    description: 'Comprehensive crop insurance covering all stages of farming',
    ministry: 'Ministry of Agriculture',
    state: 'All India',
    benefit: 'Insurance coverage',
    eligibility: ['All farmers growing notified crops', 'Loanee farmers are covered automatically'],
    benefits: ['Coverage for all stages of crop', 'Low premium rates (2% Kharif, 1.5% Rabi)', 'Timely claim settlement'],
    howToApply: ['Contact nearest bank branch', 'Fill proposal form', 'Pay premium share'],
    website: 'https://pmfby.gov.in',
  },
  {
    id: 3,
    name: 'Soil Health Card Scheme',
    description: 'Soil testing and health card distribution for balanced fertilizer use',
    ministry: 'Ministry of Agriculture',
    state: 'All India',
    benefit: 'Free soil testing',
    eligibility: ['All farmers with agricultural land'],
    benefits: ['Free soil testing every 3 years', 'Customized fertilizer recommendations', 'Improved crop yield'],
    howToApply: ['Visit nearest agriculture office', 'Provide land details', 'Soil sample collected by officials'],
    website: 'https://soilhealth.dac.gov.in',
  },
  {
    id: 4,
    name: 'PMKSY (Watershed)',
    description: 'Water conservation and watershed management for sustainable farming',
    ministry: 'Ministry of Agriculture',
    state: 'All India',
    benefit: 'Watershed development',
    eligibility: ['Farmers in watershed project areas'],
    benefits: ['Water harvesting structures', 'Improved groundwater levels', 'Reduced soil erosion'],
    howToApply: ['Apply through local watershed committee', 'Participate in village meetings'],
    website: 'https://pmksy.gov.in',
  },
  {
    id: 5,
    name: 'Kisan Credit Card',
    description: 'Affordable credit for farmers with flexible repayment options',
    ministry: 'Ministry of Finance',
    state: 'All India',
    benefit: 'Credit up to ₹3 lakh',
    eligibility: ['All farmers, sharecroppers, and tenant farmers'],
    benefits: ['Short-term loans for agriculture', 'Flexible repayment up to 5 years', 'Personal accident insurance'],
    howToApply: ['Visit any commercial bank', 'Fill KCC application form', 'Submit land records'],
    website: 'https://www.nabard.org',
  },
  {
    id: 6,
    name: 'e-NAM',
    description: 'National Agriculture Market for transparent price discovery',
    ministry: 'Ministry of Agriculture',
    state: 'All India',
    benefit: 'Better market access',
    eligibility: ['All farmers with registered produce'],
    benefits: ['Online trading platform', 'Transparent price discovery', 'Single license for multiple mandis'],
    howToApply: ['Register at nearest e-NAM mandi', 'Get biometric ID card', 'Start online trading'],
    website: 'https://www.enam.gov.in',
  },
  {
    id: 7,
    name: 'Uttar Pradesh Kisan Pension',
    description: 'Pension scheme for small and marginal farmers in UP',
    ministry: 'UP State Government',
    state: 'Uttar Pradesh',
    benefit: '₹3,000/month pension',
    eligibility: ['Small and marginal farmers in UP', 'Age 60+', 'Landholding up to 2 hectares'],
    benefits: ['Monthly pension of ₹3,000', 'Life insurance coverage'],
    howToApply: ['Apply at local agriculture department', 'Submit age and land documents'],
    website: 'https://upagriculture.com',
  },
  {
    id: 8,
    name: 'Maharashtra Fasal Sahayya',
    description: 'Crop assistance scheme for Maharashtra farmers',
    ministry: 'Maharashtra State Government',
    state: 'Maharashtra',
    benefit: '₹10,000/acre relief',
    eligibility: ['Farmers in Maharashtra with crop loss >33%'],
    benefits: ['Financial assistance for crop loss', 'Free seeds for next season'],
    howToApply: ['Report crop loss to gram panchayat', 'Get damage assessment done'],
    website: 'https://maharashtra.gov.in',
  },
  {
    id: 9,
    name: 'Punjab Kisan Insurance',
    description: 'Special insurance coverage for Punjab farmers',
    ministry: 'Punjab State Government',
    state: 'Punjab',
    benefit: '₹5 lakh coverage',
    eligibility: ['All farmers in Punjab'],
    benefits: ['Comprehensive crop insurance', 'Accidental death coverage', 'Hospitalization benefit'],
    howToApply: ['Apply through cooperative societies', 'Register at nearest bank'],
    website: 'https://punjab.gov.in',
  },
];

router.get('/schemes', (req, res) => {
  const { state } = req.query;
  let filtered = governmentSchemes;
  if (state && state !== 'All States' && state !== 'सभी राज्य') {
    filtered = governmentSchemes.filter((s) => s.state === state || s.state === 'All India');
  }
  res.json({ schemes: filtered });
});

router.get('/analytics', (req, res) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const cropPerformance = months.map((month, i) => ({
    month,
    currentYear: Math.round(30 + Math.sin(i / 2) * 15 + Math.random() * 5),
    previousYear: Math.round(28 + Math.sin(i / 2) * 12 + Math.random() * 5),
  }));

  const baseRainfall = [30, 25, 20, 15, 50, 120, 250, 280, 180, 80, 40, 20];
  const avgRainfall = Math.round(baseRainfall.reduce((a, b) => a + b, 0) / baseRainfall.length);
  const rainfallData = months.map((month, i) => ({
    month,
    rainfall: Math.round(baseRainfall[i] + Math.random() * 20),
    average: avgRainfall,
  }));

  const yieldForecast = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => ({
    month,
    yield: Math.round(35 + Math.sin(i / 2) * 10 + Math.random() * 5),
  }));

  const diseaseStats = [
    { name: 'Leaf Blight', value: 35 },
    { name: 'Powdery Mildew', value: 25 },
    { name: 'Rust', value: 20 },
    { name: 'Bacterial Wilt', value: 12 },
    { name: 'Other', value: 8 },
  ];

  const soilHealth = [
    { parameter: 'pH Level', value: 6.8, max: 14 },
    { parameter: 'Nitrogen', value: 72, max: 100 },
    { parameter: 'Phosphorus', value: 65, max: 100 },
    { parameter: 'Potassium', value: 80, max: 100 },
    { parameter: 'Organic Carbon', value: 0.6, max: 1 },
    { parameter: 'Moisture', value: 45, max: 100 },
  ];

  const marketPrices = [
    { month: 'Jan', wheat: 2050, rice: 1850, maize: 1720 },
    { month: 'Feb', wheat: 2080, rice: 1880, maize: 1740 },
    { month: 'Mar', wheat: 2100, rice: 1900, maize: 1760 },
    { month: 'Apr', wheat: 2120, rice: 1920, maize: 1780 },
    { month: 'May', wheat: 2150, rice: 1950, maize: 1800 },
    { month: 'Jun', wheat: 2130, rice: 1940, maize: 1810 },
    { month: 'Jul', wheat: 2110, rice: 1930, maize: 1820 },
    { month: 'Aug', wheat: 2140, rice: 1960, maize: 1830 },
    { month: 'Sep', wheat: 2160, rice: 1980, maize: 1850 },
    { month: 'Oct', wheat: 2180, rice: 2000, maize: 1840 },
    { month: 'Nov', wheat: 2200, rice: 2020, maize: 1860 },
    { month: 'Dec', wheat: 2220, rice: 2040, maize: 1880 },
  ];

  res.json({
    cropPerformance,
    rainfallData,
    yieldForecast,
    diseaseStats,
    soilHealth,
    marketPrices,
    summary: {
      avgYield: 42.5,
      totalRainfall: 780,
      cropHealth: 78,
      marketPriceIndex: 2450,
    },
  });
});

router.get('/weather/:location', async (req, res) => {
  try {
    const { location } = req.params;
    const apiKey = process.env.OWM_API_KEY || 'YOUR_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod !== 200) return res.status(404).json({ error: 'Location not found' });
    res.json({
      temperature: data.main.temp,
      humidity: data.main.humidity,
      rainfall: data.rain?.['1h'] || data.rain?.['3h'] || 0,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

module.exports = router;
