
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconMap } from '../components/Icons';
import EmptyState from '../components/EmptyState';

const mockTopics = [
    { name: 'Vivienda y Urbanismo', slug: 'vivienda-y-urbanismo', icon: '🏘️', newDocs: 3 },
    { name: 'Minería', slug: 'mineria', icon: '⛏️', newDocs: 8 },
    { name: 'Medio Ambiente', slug: 'medio-ambiente', icon: '🌱', newDocs: 1 },
];

const suggestedTopics = ['Justicia', 'Empresas', 'Subsidios', 'Salud Pública', 'Educación', 'Obras Públicas', 'Derechos Humanos'];

const AddTopicModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { XMarkIcon } = IconMap;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg m-4">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Agregar Temas</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100">
                        {XMarkIcon && <XMarkIcon className="h-6 w-6 text-slate-500" />}
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-slate-600 mb-4">Selecciona los temas que deseas seguir para personalizar tu experiencia en AIDO.</p>
                    <div className="flex flex-wrap gap-3">
                        {suggestedTopics.map(topic => (
                             <button key={topic} className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-200 transition-colors">
                                + {topic}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="p-6 bg-slate-50 border-t rounded-b-xl flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50">
                        Cancelar
                    </button>
                    <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                        Guardar Temas
                    </button>
                </div>
            </div>
        </div>
    );
};


const TopicsManagementPage: React.FC = () => {
    const [topics, setTopics] = useState(mockTopics);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { PlusCircleIcon, TrashIcon } = IconMap;

    const removeTopic = (topicName: string) => {
        setTopics(topics.filter(t => t.name !== topicName));
    };

    return (
        <div className="space-y-8">
            {isModalOpen && <AddTopicModal onClose={() => setIsModalOpen(false)} />}
            
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Mis Temas</h1>
                    <p className="mt-1 text-slate-600">AIDO utiliza estos temas para personalizar resúmenes, resultados y alertas.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                    {PlusCircleIcon && <PlusCircleIcon className="h-5 w-5" />}
                    Agregar tema
                </button>
            </div>

            {/* Topics Grid */}
            {topics.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topics.map(topic => (
                        <div key={topic.name} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col">
                            <div className="flex items-start gap-4">
                                <div className="text-3xl mt-1">{topic.icon}</div>
                                <div className="flex-1">
                                    <h2 className="font-bold text-lg text-slate-900">{topic.name}</h2>
                                    <p className="text-sm text-slate-600">{topic.newDocs} documentos hoy</p>
                                </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
                                <Link to={`/dashboard/temas/${topic.slug}`} className="w-full text-center px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-md hover:bg-slate-200 transition-colors">
                                    Ver tema
                                </Link>
                                <button onClick={() => removeTopic(topic.name)} className="p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors">
                                    {TrashIcon && <TrashIcon className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <EmptyState 
                    title="Aún no sigues ningún tema"
                    message="Agrega un tema para comenzar a recibir contenido personalizado y alertas relevantes para ti."
                    icon="TagIcon"
                />
            )}
        </div>
    );
};

export default TopicsManagementPage;
