import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MessageCircle, Send, Mic, Bot, User, Leaf, Brain, Sparkles, ChevronRight, Volume2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const mockResponses = [
  {
    keywords: ['wheat', 'gehu', 'गेहूं', 'rice', 'chawal', 'चावल', 'crop', 'fasal', 'फसल', 'sugarcane', 'ganna', 'गन्ना', 'maize', 'makka', 'मक्का', 'mustard', 'sarson', 'सरसों', 'cotton', 'kapas', 'कपास'],
    getResponse: (query, lang) => {
      if (lang === 'hi') {
        return `${query.includes('गेहूं') || query.toLowerCase().includes('wheat') || query.toLowerCase().includes('gehu') ? 'गेहूं की खेती के लिए अच्छी जल निकासी वाली दोमट मिट्टी सबसे उपयुक्त है। बुवाई से पहले खेत में अच्छी तरह से सड़ी हुई गोबर की खाद डालें। सिंचाई फसल की अवस्था के अनुसार करें।' : query.includes('चावल') || query.toLowerCase().includes('rice') || query.toLowerCase().includes('chawal') ? 'धान की खेती के लिए चिकनी दोमट मिट्टी और गर्म जलवायु उपयुक्त है। खेत में पर्याप्त पानी का ठहराव आवश्यक है। नर्सरी में पौध तैयार करके रोपाई करें।' : query.includes('गन्ना') || query.toLowerCase().includes('sugarcane') || query.toLowerCase().includes('ganna') ? 'गन्ने की खेती के लिए गहरी दोमट मिट्टी और गर्म जलवायु सर्वोत्तम है। बुवाई के समय पर्याप्त नमी होनी चाहिए। फसल को अधिक पानी और खाद की आवश्यकता होती है।' : query.includes('मक्का') || query.toLowerCase().includes('maize') || query.toLowerCase().includes('makka') ? 'मक्का की खेती के लिए बलुई दोमट मिट्टी उपयुक्त है। इसे गर्म मौसम की आवश्यकता होती है। बुवाई से पहले बीज को उपचारित करना लाभकारी होता है।' : query.includes('सरसों') || query.toLowerCase().includes('mustard') || query.toLowerCase().includes('sarson') ? 'सरसों की खेती के लिए दोमट मिट्टी और ठंडी जलवायु उपयुक्त है। कम पानी में भी यह फसल अच्छी होती है। बुवाई के 30-35 दिन बाद पहली सिंचाई करें।' : query.includes('कपास') || query.toLowerCase().includes('cotton') || query.toLowerCase().includes('kapas') ? 'कपास की खेती के लिए काली मिट्टी सबसे उपयुक्त है। गर्म जलवायु और अधिक धूप की आवश्यकता होती है। कीट नियंत्रण पर विशेष ध्यान दें।' : 'इस फसल के लिए उचित मिट्टी की जांच कराएं और स्थानीय कृषि विशेषज्ञ से सलाह लें। फसल चक्र अपनाएं और जैविक खाद का उपयोग करें।'}`
      }
      return `${query.toLowerCase().includes('wheat') ? 'For wheat cultivation, well-drained loamy soil is best. Apply well-decomposed farmyard manure before sowing. Irrigate based on crop stage.' : query.toLowerCase().includes('rice') ? 'Paddy requires clay loam soil and warm climate with standing water. Prepare nursery and transplant seedlings for best results.' : query.toLowerCase().includes('sugarcane') ? 'Sugarcane thrives in deep loamy soil with warm climate. Ensure adequate moisture at planting time. Requires heavy nutrition and irrigation.' : query.toLowerCase().includes('maize') ? 'Maize grows well in sandy loam soil with warm weather. Treat seeds before sowing for better germination and pest resistance.' : query.toLowerCase().includes('mustard') ? 'Mustard suits loamy soil with cool climate. Requires less water than other crops. First irrigation at 30-35 days after sowing.' : query.toLowerCase().includes('cotton') ? 'Cotton grows best in black cotton soil with warm, sunny climate. Pay special attention to pest management throughout the season.' : 'Get your soil tested and consult your local agriculture officer for crop-specific advice. Follow crop rotation and use organic fertilizers.'}`
    }
  },
  {
    keywords: ['disease', 'bimari', 'बीमारी', 'fungus', 'फफूंद', 'pest', 'keet', 'कीट', 'blight', 'झुलसा', 'rust', 'किट्ट', 'mildew', 'leaf', 'patta', 'पत्ता', 'rot', 'sadhan', 'सड़न'],
    getResponse: (query, lang) => {
      if (lang === 'hi') {
        return 'फसलों में रोगों की पहचान के लिए पत्तियों, तनों और जड़ों का निरीक्षण करें। पीले या भूरे धब्बे, मुरझाना, या फफूंद की वृद्धि रोग के लक्षण हो सकते हैं। रोकथाम के लिए प्रतिरोधी किस्मों का चयन करें, फसल चक्र अपनाएं, और आवश्यकतानुसार जैविक या रासायनिक नियंत्रण का उपयोग करें। अधिक जानकारी के लिए कृपया अपने नजदीकी कृषि विज्ञान केंद्र से संपर्क करें।'
      }
      return 'For disease identification, inspect leaves, stems, and roots for yellow or brown spots, wilting, or fungal growth. Preventive measures include using resistant varieties, following crop rotation, ensuring proper spacing, and applying organic or chemical controls as needed. For accurate diagnosis, upload an image to our Disease Detection tool or consult your local agricultural extension officer.'
    }
  },
  {
    keywords: ['weather', 'mausam', 'मौसम', 'rain', 'baarish', 'बारिश', 'temperature', 'taapmaan', 'तापमान', 'climate', 'jalvayu', 'जलवायु', 'drought', 'sukha', 'सूखा', 'flood', 'baadh', 'बाढ़'],
    getResponse: (query, lang) => {
      if (lang === 'hi') {
        return 'मौसम की जानकारी के लिए कृपया अपने क्षेत्र के मौसम पूर्वानुमान की नियमित जांच करें। सामान्य सुझाव: ज्यादा बारिश की संभावना हो तो जल निकासी की व्यवस्था करें; सूखे की स्थिति में ड्रिप सिंचाई का उपयोग करें; तापमान अधिक होने पर फसलों पर हल्की सिंचाई करें; पाले से बचाव के लिए फसलों को ढकें। मौसम के अनुसार फसल योजना बनाना सबसे अच्छा होता है।'
      }
      return 'Based on general weather patterns: monitor local forecasts regularly. In high rainfall areas, ensure proper drainage. During drought, use drip irrigation and mulching to conserve moisture. For heatwaves, provide light irrigation to cool crops. Protect against frost with crop covers. Plan your sowing and harvesting around seasonal weather patterns for best results.'
    }
  },
  {
    keywords: ['scheme', 'yojana', 'योजना', 'subsidy', 'subsidhi', 'सब्सिडी', 'subsid', 'government', 'sarkar', 'सरकार', 'pradhan mantri', 'pm', 'kisan', 'किसान', 'grant', 'financial'],
    getResponse: (query, lang) => {
      if (lang === 'hi') {
        return 'प्रमुख कृषि योजनाओं में प्रधानमंत्री किसान सम्मान निधि (पीएम-किसान), प्रधानमंत्री फसल बीमा योजना, किसान क्रेडिट कार्ड योजना, और मृदा स्वास्थ्य कार्ड योजना शामिल हैं। पात्रता और आवेदन के लिए अपने जिला कृषि कार्यालय से संपर्क करें या हमारे सरकारी योजना पृष्ठ पर जाएं।'
      }
      return 'Key agricultural schemes include PM-KISAN Samman Nidhi (direct income support), Pradhan Mantri Fasal Bima Yojana (crop insurance), Kisan Credit Card (affordable credit), and Soil Health Card Scheme (soil testing). Visit our Government Schemes page for detailed information on eligibility, benefits, and application procedures.'
    }
  }
]

const fallbackResponse = (lang) => {
  if (lang === 'hi') {
    return 'धन्यवाद! मैं आपकी मदद करने की कोशिश करूंगा। कृपया अधिक जानकारी दें या फसलों, बीमारियों, मौसम या सरकारी योजनाओं के बारे में पूछें। मैं हिंदी और अंग्रेजी दोनों में सहायता प्रदान कर सकता हूं।'
  }
  return 'Thank you for your question! I\'ll do my best to help. Could you provide more details? You can ask me about crops, diseases, weather, or government schemes. I support both Hindi and English queries!'
}

const getBotResponse = (query, lang) => {
  const lower = query.toLowerCase()
  for (const group of mockResponses) {
    if (group.keywords.some(k => lower.includes(k))) {
      return group.getResponse(query, lang)
    }
  }
  return fallbackResponse(lang)
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const messageVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
}

const capabilityCards = [
  { icon: Leaf, key: 'cropGuidance', color: 'text-[#4D7C0F]', bg: 'bg-[#4D7C0F]/10' },
  { icon: Brain, key: 'diseaseInfo', color: 'text-[#84CC16]', bg: 'bg-[#84CC16]/10' },
  { icon: Sparkles, key: 'weatherAdvice', color: 'text-[#EAB308]', bg: 'bg-[#EAB308]/10' },
  { icon: ChevronRight, key: 'govSchemes', color: 'text-[#1F2937]', bg: 'bg-[#1F2937]/5' },
]

const FarmingAssistant = () => {
  const { t } = useTranslation()
  const { language } = useLanguage()

  const [messages, setMessages] = useState([
    { id: 'welcome', role: 'bot', text: t('assistant.greeting'), capabilities: true },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)

  const chatEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSend = () => {
    const text = input.trim()
    if (!text || isTyping) return

    const userMsg = { id: Date.now().toString(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const responseText = getBotResponse(text, language)
      const botMsg = { id: (Date.now() + 1).toString(), role: 'bot', text: responseText }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleListening = () => {
    setIsListening(prev => !prev)
    if (!isListening) {
      setTimeout(() => setIsListening(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAF5]" dir={language === 'hi' ? 'rtl' : 'ltr'}>
      <div className="mx-auto flex max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8 min-h-[calc(100vh-6rem)]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-1 flex-col gap-6 lg:flex-row"
        >
          <motion.div variants={itemVariants} className="flex flex-1 flex-col lg:w-3/5">
            <div className="mb-4 text-center lg:text-left">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full gradient-primary shadow-lg lg:mx-0">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h1 className="bg-gradient-to-r from-[#4D7C0F] to-[#EAB308] bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                {t('assistant.title')}
              </h1>
              <p className="mt-1 text-sm text-gray-600">{t('assistant.subtitle')}</p>
            </div>

            <div className="card-shadow flex flex-1 flex-col overflow-hidden rounded-2xl bg-white">
              <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6" style={{ maxHeight: 'calc(100vh - 380px)' }}>
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      layout
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex max-w-[85%] items-start gap-2 sm:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                          msg.role === 'user' ? 'bg-[#4D7C0F]/10' : 'bg-[#84CC16]/20'
                        }`}>
                          {msg.role === 'user' ? (
                            <User className="h-4 w-4 text-[#4D7C0F]" />
                          ) : (
                            <Bot className="h-4 w-4 text-[#84CC16]" />
                          )}
                        </div>
                        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'gradient-primary text-white shadow-md'
                            : 'bg-[#F0F7E6] text-gray-800'
                        }`}>
                          <p>{msg.text}</p>
                          {msg.capabilities && (
                            <div className="mt-3 space-y-1.5 border-t border-[#84CC16]/20 pt-3">
                              <p className="text-xs font-medium text-[#4D7C0F]">{t('assistant.capabilities')}</p>
                              {['cropGuidance', 'diseaseInfo', 'weatherAdvice', 'govSchemes'].map((cap) => (
                                <div key={cap} className="flex items-center gap-1.5 text-xs text-gray-600">
                                  <ChevronRight className="h-3 w-3 text-[#84CC16]" />
                                  <span>{t(`assistant.${cap}`)}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex justify-start"
                  >
                    <div className="flex max-w-[85%] items-start gap-2 sm:max-w-[75%]">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#84CC16]/20">
                        <Bot className="h-4 w-4 text-[#84CC16]" />
                      </div>
                      <div className="rounded-2xl bg-[#F0F7E6] px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            <span className="h-2 w-2 animate-bounce rounded-full bg-[#84CC16]" style={{ animationDelay: '0ms' }} />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-[#84CC16]" style={{ animationDelay: '150ms' }} />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-[#84CC16]" style={{ animationDelay: '300ms' }} />
                          </div>
                          <span className="text-xs text-gray-500">{t('assistant.thinking')}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={chatEndRef} />
              </div>

              <div className="border-t border-gray-100 bg-white p-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleListening}
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                      isListening
                        ? 'bg-red-100 text-red-500 shadow-md animate-pulse'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                    title={t('assistant.voice')}
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={t('assistant.placeholder')}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 pr-12 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 focus:border-[#4D7C0F] focus:bg-white focus:ring-2 focus:ring-[#84CC16]/30"
                      disabled={isTyping}
                    />
                  </div>
                  <motion.button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="gradient-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full shadow-lg transition-all duration-200 disabled:opacity-50"
                  >
                    <Send className="h-5 w-5 text-white" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="hidden lg:block lg:w-2/5">
            <div className="sticky top-24 space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-warm">
                  <Sparkles className="h-4 w-4 text-[#1F2937]" />
                </div>
                <h2 className="text-sm font-semibold text-gray-700">{t('assistant.capabilities')}</h2>
              </div>
              {capabilityCards.map((card, idx) => (
                <motion.div
                  key={card.key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="card-shadow card-hover flex items-center gap-4 rounded-xl bg-white p-4"
                >
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${card.bg} ${card.color}`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-gray-700">{t(`assistant.${card.key}`)}</p>
                </motion.div>
              ))}
              <div className="mt-6 rounded-2xl gradient-warm p-4 text-center">
                <Volume2 className="mx-auto mb-2 h-6 w-6 text-[#1F2937]" />
                <p className="text-xs font-medium text-gray-700">{t('assistant.subtitle')}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default FarmingAssistant
