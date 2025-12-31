import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Mic, Bot, User, Sparkles } from 'lucide-react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ResultProfile } from '../data/quizData';
import { Language } from '../data/translations';

interface ChatWidgetProps {
  quizResult: ResultProfile | null;
  lang: Language;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ quizResult, lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Chat Session
  useEffect(() => {
    const initChat = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        // Context string based on quiz result
        const userContext = quizResult 
          ? `The student has taken a career quiz. They matched as "${quizResult.title}" (${quizResult.id}). Their personality is: "${quizResult.personality}". Recommended careers: ${quizResult.careers.join(', ')}.`
          : "The student has NOT taken the career quiz yet.";

        const systemInstruction = `
          You are "Disha", a friendly and empathetic AI "Didi" (older sister) and career guide for Indian high school students.
          
          CORE RULES:
          1. Your tone is super encouraging, warm, and simple. Like a helpful older sibling.
          2. LANGUAGE: The user has selected '${lang}' as their language.
             - If 'en': Speak simple English.
             - If 'hi': Speak "Hinglish" (Hindi + English mix, written in Roman script or Devanagari based on what the user types, but default to readable English script for Hinglish if not specified). Actually, try to use native Devanagari script for Hindi mixed with English terms (Hinglish) to be friendly.
             - If 'kn': Speak "Kanglish" (Kannada + English mix). Use Kannada script but keep English terms for Career/Technical words.
          3. NEVER ask for a resume or CV.
          4. KEEP ANSWERS SHORT. Max 2-3 sentences.
          5. DIRECT ANSWERS: Answer the specific question the student asks immediately.
          6. RELATED CONTEXT: After answering, briefly mention a related career topic or suggest a related question they might want to ask.
          
          USER CONTEXT:
          ${userContext}
        `;

        const chat = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
          },
        });

        setChatSession(chat);

        // Set initial greeting based on language
        let initialGreeting = "Namaste! I'm Disha, your Career Buddy. How can I help you today?";
        if (lang === 'hi') {
          initialGreeting = "Namaste! Main Disha, tumhari Career Buddy. Aaj main tumhari kaise madad kar sakti hoon?";
        } else if (lang === 'kn') {
          initialGreeting = "Namaskara! Naanu Disha, nimma Career Buddy. Nanu nimage hege sahaya madli?";
        }

        setMessages([
          {
            id: 'init-1',
            text: initialGreeting,
            sender: 'bot',
            timestamp: new Date()
          }
        ]);

      } catch (error) {
        console.error("Failed to init chat", error);
      }
    };

    initChat();
  }, [quizResult, lang]); 

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !chatSession) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const result: GenerateContentResponse = await chatSession.sendMessage({ 
        message: userMsg.text 
      });
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: result.text || "I'm having a little trouble thinking right now. Can you ask again?",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat error", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Oops! My internet is a bit slow. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto bg-white w-[90vw] sm:w-[380px] h-[500px] max-h-[80vh] rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden mb-4 font-sans"
          >
            {/* Header */}
            <div className="bg-blue-700 p-4 flex items-center justify-between text-white shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-blue-700 rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none">Disha</h3>
                  <p className="text-blue-100 text-xs mt-1">Your Career Buddy • Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 bg-[#e5ddd5] p-4 overflow-y-auto relative">
               {/* Background Pattern Overlay */}
               <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] pointer-events-none"></div>
               
               <div className="space-y-4 relative z-10">
                 {messages.map((msg) => (
                   <div 
                     key={msg.id} 
                     className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                   >
                     <div 
                       className={`
                         max-w-[85%] px-4 py-2 rounded-2xl shadow-sm text-sm sm:text-base leading-relaxed
                         ${msg.sender === 'user' 
                           ? 'bg-blue-600 text-white rounded-tr-none' 
                           : 'bg-white text-gray-800 rounded-tl-none'
                         }
                       `}
                     >
                       {msg.text}
                       <div className={`text-[10px] mt-1 opacity-70 text-right ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                         {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </div>
                     </div>
                   </div>
                 ))}
                 
                 {isLoading && (
                   <div className="flex justify-start">
                     <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                       <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                       <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                       <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                     </div>
                   </div>
                 )}
                 <div ref={messagesEndRef} />
               </div>
            </div>

            {/* Input Area */}
            <div className="p-3 bg-gray-50 border-t border-gray-200 flex items-center gap-2">
               {/* Mic Placeholder */}
               <button className="p-2 text-gray-500 hover:bg-gray-200 rounded-full transition-colors" title="Voice Support Coming Soon">
                 <Mic className="w-5 h-5" />
               </button>
               
               <input
                 type="text"
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
                 onKeyDown={handleKeyPress}
                 placeholder="Type your message..."
                 className="flex-1 bg-white border border-gray-300 text-gray-800 text-sm rounded-full px-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
               />
               
               <button 
                 onClick={handleSendMessage}
                 disabled={!inputValue.trim() || isLoading}
                 className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md disabled:opacity-50 disabled:shadow-none transition-all transform active:scale-95"
               >
                 <Send className="w-5 h-5 ml-0.5" />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto group flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg shadow-blue-600/30 transition-all"
      >
        <span className={`font-bold pr-1 ${isOpen ? 'hidden' : 'hidden sm:block'}`}>
          Chat with Disha
        </span>
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-400"></span>
            </span>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default ChatWidget;