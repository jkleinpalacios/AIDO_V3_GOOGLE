
import React, { useState, useRef, useEffect } from 'react';
import { IconMap } from '../../components/Icons';

interface ActionButton {
    label: string;
    icon: string;
    action: () => void;
}

interface Message {
    id: string;
    role: 'user' | 'ai';
    content: React.ReactNode;
    timestamp: Date;
    actions?: ActionButton[];
}

const DashboardPage: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [scope, setScope] = useState('General');
    const [isScopeOpen, setIsScopeOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    const { 
        SparklesIcon, 
        PaperAirplaneIcon, 
        UserCircleIcon,
        DocumentTextIcon,
        ChevronDownIcon,
        ClockIcon,
        ArrowRightIcon,
        GlobeAltIcon
    } = IconMap;

    // Listen for "new chat" event from Sidebar
    useEffect(() => {
        const handleNewChat = () => {
            setMessages([]);
            setInputValue('');
            setIsTyping(false);
        };
        window.addEventListener('new-chat', handleNewChat);
        return () => window.removeEventListener('new-chat', handleNewChat);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
        }
    }, [inputValue]);

    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);
        if(textareaRef.current) textareaRef.current.style.height = 'auto';

        // Simulate AI Response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: 'ai',
                content: (
                    <div className="space-y-4">
                        <p>He analizado la información oficial reciente sobre <strong>"{text}"</strong>. Aquí tienes los puntos más relevantes:</p>
                        
                        <div>
                            <h4 className="font-bold text-slate-900 mb-2 text-sm">Resumen Normativo</h4>
                            <ul className="list-disc list-inside space-y-2 text-slate-700 marker:text-blue-500">
                                <li>Se publicó la <strong>Ley 21.643</strong> (Ley Karin) que modifica el Código del Trabajo en materia de prevención del acoso.</li>
                                <li>El <strong>Ministerio de Hacienda</strong> emitió un nuevo decreto sobre reajuste del sector público.</li>
                                <li>Existe una circular vigente del SII que aclara la tributación de servicios digitales.</li>
                            </ul>
                        </div>
                        <p>Esta normativa es obligatoria desde su publicación en el Diario Oficial.</p>
                    </div>
                ),
                timestamp: new Date(),
                actions: [
                    { label: 'Ver documentos relacionados', icon: 'DocumentTextIcon', action: () => alert('Ver docs') },
                    { label: 'Ver línea de tiempo', icon: 'ClockIcon', action: () => alert('Ver timeline') },
                    { label: 'Abrir en fuente oficial', icon: 'GlobeAltIcon', action: () => alert('Ir a fuente') },
                ]
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(inputValue);
        }
    };

    const suggestions = [
        "Cambios en subsidios habitacionales",
        "Normativa reciente sobre teletrabajo",
        "Obligaciones tributarias Pymes 2024",
        "Dictámenes que afecten a municipalidades",
        "Ley de Delitos Económicos",
        "Nuevas concesiones mineras"
    ];

    const scopes = ['General', 'Tributario', 'Laboral', 'Municipal', 'Salud', 'Minería'];

    return (
        <div className="flex flex-col h-full relative bg-white">
            
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto w-full">
                <div className="max-w-3xl mx-auto px-4 w-full pb-32 pt-8">
                    
                    {/* INITIAL STATE */}
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-10 animate-fadeIn">
                            <div className="space-y-6 text-center">
                                <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100 mx-auto">
                                    {SparklesIcon && <SparklesIcon className="h-8 w-8" />}
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                                        Hola, soy AIDO.
                                    </h1>
                                    <p className="mt-3 text-lg text-slate-500">
                                        ¿En qué tema del Estado puedo ayudarte hoy?
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                                {suggestions.map((text, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => handleSendMessage(text)}
                                        className="p-4 bg-white border border-slate-200 rounded-xl text-left hover:border-blue-400 hover:shadow-md hover:text-blue-700 transition-all text-sm font-medium text-slate-600"
                                    >
                                        {text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* CONVERSATION STATE */
                        <div className="space-y-8">
                             {messages.map((msg) => (
                                <div 
                                    key={msg.id} 
                                    className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.role === 'ai' && (
                                        <div className="flex-shrink-0 h-8 w-8 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-blue-600 mt-1">
                                            {SparklesIcon && <SparklesIcon className="h-4 w-4" />}
                                        </div>
                                    )}
                                    
                                    <div className={`flex flex-col gap-2 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div 
                                            className={`text-sm leading-relaxed p-4 rounded-2xl ${
                                                msg.role === 'user' 
                                                    ? 'bg-slate-100 text-slate-900 rounded-tr-sm' 
                                                    : 'text-slate-800 px-0 py-1' // AI text blends with background
                                            }`}
                                        >
                                            {msg.content}
                                        </div>
                                        
                                        {/* AI Action Buttons */}
                                        {msg.role === 'ai' && msg.actions && (
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {msg.actions.map((action, idx) => {
                                                    const ActionIcon = IconMap[action.icon];
                                                    return (
                                                        <button 
                                                            key={idx}
                                                            onClick={action.action}
                                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm"
                                                        >
                                                            {ActionIcon && <ActionIcon className="h-3.5 w-3.5" />}
                                                            {action.label}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    {msg.role === 'user' && (
                                        <div className="flex-shrink-0 h-8 w-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 mt-1">
                                            {UserCircleIcon && <UserCircleIcon className="h-5 w-5" />}
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            {isTyping && (
                                 <div className="flex gap-4 justify-start">
                                     <div className="flex-shrink-0 h-8 w-8 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-blue-600 mt-1">
                                        {SparklesIcon && <SparklesIcon className="h-4 w-4" />}
                                    </div>
                                     <div className="flex gap-1 items-center py-2 h-8 px-2">
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                                    </div>
                                 </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>
            </div>

            {/* FIXED INPUT AREA */}
            <div className="absolute bottom-0 left-0 w-full bg-white p-4 pb-6 pt-2">
                <div className="max-w-3xl mx-auto relative">
                    <div className="relative flex items-end gap-2 bg-white rounded-2xl border border-slate-300 shadow-lg focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-500 transition-all p-2">
                        
                        {/* Scope Selector */}
                        <div className="relative flex-shrink-0 pb-1.5 pl-1">
                            <button 
                                onClick={() => setIsScopeOpen(!isScopeOpen)}
                                className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
                            >
                                {scope}
                                {ChevronDownIcon && <ChevronDownIcon className="h-3 w-3 text-slate-500" />}
                            </button>
                            
                            {isScopeOpen && (
                                <div className="absolute bottom-full left-0 mb-2 w-40 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-20">
                                    {scopes.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => { setScope(s); setIsScopeOpen(false); }}
                                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-blue-50 hover:text-blue-600 transition-colors ${scope === s ? 'bg-blue-50 text-blue-600 font-medium' : 'text-slate-700'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Text Area */}
                        <textarea
                            ref={textareaRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Haz una pregunta sobre leyes, resoluciones, dictámenes o información oficial del Estado..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 placeholder-slate-400 resize-none max-h-40 py-2.5 text-sm"
                            rows={1}
                            style={{ minHeight: '44px' }}
                        />
                        
                        {/* Send Button */}
                        <button
                            onClick={() => handleSendMessage(inputValue)}
                            disabled={!inputValue.trim() || isTyping}
                            className={`p-2 rounded-xl flex-shrink-0 mb-1 transition-all duration-200 ${
                                inputValue.trim() && !isTyping 
                                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' 
                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                        >
                            {PaperAirplaneIcon && <PaperAirplaneIcon className="h-5 w-5" />}
                        </button>
                    </div>
                    <div className="text-center mt-2">
                        <p className="text-[10px] text-slate-400">
                            AIDO puede cometer errores. Verifica la información oficial en los documentos adjuntos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
