
import React, { useState, useEffect, useRef } from 'react';
import { IconMap } from '../Icons';

interface Message {
    id: string;
    role: 'user' | 'ai';
    content: string;
    timestamp: Date;
}

const CopilotWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const { 
        SparklesIcon, 
        XMarkIcon, 
        PaperAirplaneIcon, 
        CpuChipIcon, 
        ChatBubbleBottomCenterTextIcon 
    } = IconMap;

    const suggestedPrompts = [
        "Resumir lo más importante de hoy",
        "¿Hubo cambios en la Ley de Urbanismo?",
        "Buscar licitaciones del MOP",
        "¿Qué es la Ley Karin?"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI latency
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: generateMockResponse(text),
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const generateMockResponse = (input: string): string => {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('resumir') || lowerInput.includes('hoy')) {
            return "Hoy destaca la publicación de la Ley 21.643 (Ley Karin) que modifica el Código del Trabajo, además de alta actividad en el sector minero con nuevas sentencias de exploración en Atacama.";
        }
        if (lowerInput.includes('urbanismo') || lowerInput.includes('vivienda')) {
            return "En temas de Vivienda, el MINVU ha publicado el llamado a postulación para el subsidio DS49 y se registraron modificaciones a planes reguladores en dos comunas de la RM.";
        }
        if (lowerInput.includes('mineria') || lowerInput.includes('minería')) {
            return "El Boletín Oficial de Minería registra hoy 34 documentos. Destacan sentencias de exploración y la nómina de concesiones para remate en la zona norte.";
        }
        return "Entendido. Estoy analizando la base de datos oficial para responder a tu consulta sobre \"" + input + "\". Recuerda que mi función es interpretar la información del Diario Oficial para facilitarte el trabajo.";
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(inputValue);
        }
    };

    return (
        <>
            {/* Toggle Button (FAB) */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200 flex items-center gap-2 group"
                    aria-label="Abrir AIDO Copilot"
                >
                    {SparklesIcon && <SparklesIcon className="h-6 w-6" />}
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-medium">
                        Asistente IA
                    </span>
                </button>
            )}

            {/* Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Slide-over Panel */}
            <div 
                className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-white">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            {CpuChipIcon && <CpuChipIcon className="h-5 w-5" />}
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-800">AIDO Copilot</h2>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                En línea
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        {XMarkIcon && <XMarkIcon className="h-6 w-6" />}
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-6">
                    {messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-0 animate-fadeIn" style={{ animationFillMode: 'forwards' }}>
                            <div className="p-4 bg-white rounded-full shadow-sm mb-2">
                                {SparklesIcon && <SparklesIcon className="h-8 w-8 text-blue-500" />}
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">¿En qué puedo ayudarte hoy?</h3>
                                <p className="text-sm text-slate-500 mt-1 max-w-[260px] mx-auto">
                                    Soy tu asistente jurídico IA. Pregúntame sobre leyes, decretos o resúmenes del día.
                                </p>
                            </div>
                            <div className="grid gap-2 w-full">
                                {suggestedPrompts.map((prompt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSendMessage(prompt)}
                                        className="text-sm text-left px-4 py-3 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:shadow-sm rounded-lg transition-all"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {messages.map((msg) => (
                                <div 
                                    key={msg.id} 
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div 
                                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                                            msg.role === 'user' 
                                                ? 'bg-blue-600 text-white rounded-br-none' 
                                                : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                                        }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex gap-1">
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-100">
                    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Escribe tu consulta..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-800 placeholder-slate-400 resize-none max-h-32 py-2"
                            rows={1}
                            style={{ minHeight: '40px' }}
                        />
                        <button
                            onClick={() => handleSendMessage(inputValue)}
                            disabled={!inputValue.trim() || isTyping}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {PaperAirplaneIcon && <PaperAirplaneIcon className="h-4 w-4" />}
                        </button>
                    </div>
                    <p className="text-[10px] text-slate-400 text-center mt-2">
                        AIDO puede cometer errores. Verifica la información oficial.
                    </p>
                </div>
            </div>
        </>
    );
};

export default CopilotWidget;
