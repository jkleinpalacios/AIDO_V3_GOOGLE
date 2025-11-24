
import React from 'react';
import { Link } from 'react-router-dom';
import { IconMap } from '../components/Icons';

const LoginPage: React.FC = () => {
    const { LogoIcon } = IconMap;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4">
             <div className="mb-8 text-center">
                 <Link to="/" className="flex items-center justify-center gap-2 text-3xl font-bold text-slate-800">
                    {LogoIcon && <LogoIcon className="h-9 w-9 text-blue-600" />}
                    <span>AIDO</span>
                </Link>
            </div>
            <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-xl shadow-lg border border-slate-200">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900">Inicia sesión en AIDO</h1>
                    <p className="mt-2 text-slate-600">
                        Accede a tu panel personalizado para explorar información oficial del Estado según tus intereses.
                    </p>
                </div>
                <form className="mt-8 space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                            Correo electrónico
                        </label>
                        <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                         <div className="flex items-center justify-between">
                            <label htmlFor="password"className="block text-sm font-medium text-slate-700">
                                Contraseña
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                        </div>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <Link
                            to="/dashboard"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Ingresar
                        </Link>
                    </div>
                </form>
                <p className="mt-6 text-center text-sm text-slate-500">
                    ¿No tienes cuenta?{' '}
                    <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                        Crear cuenta
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;