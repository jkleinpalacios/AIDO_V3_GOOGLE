
import React from 'react';
import { Link } from 'react-router-dom';
import { IconMap } from '../components/Icons';

const SignupPage: React.FC = () => {
    const { LogoIcon } = IconMap;
    
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4">
             <div className="mb-8 text-center">
                 <Link to="/" className="flex items-center justify-center gap-2 text-3xl font-bold text-slate-800">
                    {LogoIcon && <LogoIcon className="h-9 w-9 text-blue-600" />}
                    <span>AIDO</span>
                </Link>
            </div>
            <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-xl shadow-lg border border-slate-200">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900">Crea tu cuenta en AIDO</h1>
                    <p className="mt-2 text-slate-600">
                        Personaliza tu experiencia, guarda documentos y sigue temas relevantes.
                    </p>
                </div>
                <form className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">Correo electrónico</label>
                        <input id="email" name="email" type="email" required className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                     <div>
                        <label htmlFor="password"className="block text-sm font-medium text-slate-700">Contraseña</label>
                        <input id="password" name="password" type="password" required className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                     <div>
                        <label htmlFor="confirm-password"className="block text-sm font-medium text-slate-700">Confirmar contraseña</label>
                        <input id="confirm-password" name="confirm-password" type="password" required className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                     <div>
                        <label htmlFor="user-type" className="block text-sm font-medium text-slate-700">Tipo de usuario</label>
                        <select id="user-type" name="user-type" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                            <option>Ciudadano</option>
                            <option>Empresa</option>
                            <option>Profesional</option>
                            <option>Municipalidad</option>
                        </select>
                    </div>
                    <div>
                         <Link
                            to="/dashboard"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Crear cuenta
                        </Link>
                    </div>
                </form>
                 <p className="mt-6 text-center text-sm text-slate-500">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Inicia sesión
                    </Link>
                </p>
                <p className="mt-6 text-center text-xs text-slate-400">
                    AIDO interpreta información del Diario Oficial. No es un medio oficial.
                </p>
            </div>
        </div>
    );
};

export default SignupPage;