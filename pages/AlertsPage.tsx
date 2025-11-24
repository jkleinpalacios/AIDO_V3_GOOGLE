
import React, { useState } from 'react';
import { IconMap } from '../components/Icons';
import EmptyState from '../components/EmptyState';

const mockAlerts = [
    { id: 1, type: 'Tema', description: 'Nuevas publicaciones sobre "Vivienda y Urbanismo"', recentActivity: '2 publicaciones hoy', active: true },
    { id: 2, type: 'Norma', description: 'Cambios en "Ley General de Urbanismo y Construcciones"', recentActivity: 'Sin actividad reciente', active: true },
    { id: 3, type: 'Organismo', description: 'Publicaciones del "Ministerio de Vivienda y Urbanismo"', recentActivity: '1 publicación hoy', active: false },
];

const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void }> = ({ checked, onChange }) => (
    <button
        type="button"
        className={`${
            checked ? 'bg-blue-600' : 'bg-slate-200'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2`}
        role="switch"
        aria-checked={checked}
        onClick={onChange}
    >
        <span
            aria-hidden="true"
            className={`${
                checked ? 'translate-x-5' : 'translate-x-0'
            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
    </button>
);


const CreateAlertModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { XMarkIcon } = IconMap;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg m-4">
                <div className="p-6 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Crear nueva alerta</h2>
                     <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100">
                        {XMarkIcon && <XMarkIcon className="h-6 w-6 text-slate-500" />}
                    </button>
                </div>
                <form className="space-y-6 p-6">
                     <div>
                        <label htmlFor="alert-type" className="block text-sm font-medium text-slate-700">Tipo de alerta</label>
                        <select id="alert-type" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2">
                            <option>Seguir un Tema</option>
                            <option>Seguir una Norma</option>
                            <option>Seguir un Organismo</option>
                            <option>Seguir una Sección del DO</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="alert-description" className="block text-sm font-medium text-slate-700">Descripción</label>
                        <input type="text" id="alert-description" placeholder="Ej: Vivienda y Urbanismo" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2" />
                    </div>
                </form>
                <div className="p-6 bg-slate-50 border-t rounded-b-xl flex justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50">
                        Cancelar
                    </button>
                    <button onClick={onClose} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                        Crear Alerta
                    </button>
                </div>
            </div>
        </div>
    );
};


const AlertsPage: React.FC = () => {
    const [alerts, setAlerts] = useState(mockAlerts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { PlusCircleIcon, TrashIcon } = IconMap;
    
    const toggleAlert = (id: number) => {
        setAlerts(alerts.map(a => a.id === id ? { ...a, active: !a.active } : a));
    };

    return (
        <div className="space-y-8">
            {isModalOpen && <CreateAlertModal onClose={() => setIsModalOpen(false)} />}

            {/* Header */}
            <div className="flex flex-wrap justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Alertas y Seguimiento</h1>
                    <p className="mt-1 text-slate-600">Configura alertas para recibir avisos cuando haya actividad relevante en el Diario Oficial.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                    {PlusCircleIcon && <PlusCircleIcon className="h-5 w-5" />}
                    Crear alerta
                </button>
            </div>
            
             {/* Alerts List */}
            {alerts.length > 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <ul className="divide-y divide-slate-200">
                        {alerts.map(alert => (
                            <li key={alert.id} className="p-6">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">{alert.type}</span>
                                        <p className="font-semibold text-slate-800 mt-2">{alert.description}</p>
                                        <p className="text-sm text-green-700 font-medium">{alert.recentActivity}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <ToggleSwitch checked={alert.active} onChange={() => toggleAlert(alert.id)} />
                                        <button className="p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors">
                                            {TrashIcon && <TrashIcon className="h-5 w-5" />}
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                 <EmptyState
                    title="Aún no tienes alertas configuradas"
                    message="Crea una alerta para comenzar a recibir notificaciones sobre los temas, normas u organismos que te interesan."
                    icon="BellIcon"
                />
            )}
        </div>
    );
};

export default AlertsPage;