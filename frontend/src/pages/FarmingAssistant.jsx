import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { MessageCircle, Send, Mic, Bot, User, Leaf, Brain, Sparkles, ChevronRight, Volume2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const getBotResponse = async (query, lang) => {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: query, language: lang }),
    })
    const data = await res.json()
    return data.response
  } catch {
    return lang === 'hi'
      ? 'क्षमा करें, मैं अभी उत्तर नहीं दे पा रहा हूं। कृपया पुनः प्रयास करें।'
      : 'Sorry, I am unable to respond right now. Please try again.'
  }
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

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isTyping) return

    const userMsg = { id: Date.now().toString(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    const responseText = await getBotResponse(text, language)
    const botMsg = { id: (Date.now() + 1).toString(), role: 'bot', text: responseText }
    setMessages(prev => [...prev, botMsg])
    setIsTyping(false)
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
