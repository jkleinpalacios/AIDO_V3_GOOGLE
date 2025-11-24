
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconMap } from '../components/Icons';
import { supabase } from '../lib/supabaseClient';

const LoginPage: React.FC = () => {
    const { LogoIcon } = IconMap;
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            // Login exitoso
            navigate('/dashboard');
        }
    };

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
                        Accede a información oficial del Estado con tus credenciales de Supabase.
                    </p>
                </div>
                
                {error && (
                    <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-200">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                        >
                            {loading ? 'Cargando...' : 'Ingresar'}
                        </button>
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
