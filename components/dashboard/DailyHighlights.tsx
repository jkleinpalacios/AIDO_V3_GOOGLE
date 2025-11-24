
import React from 'react';
import { Link } from 'react-router-dom';
import { IconMap } from '../Icons';

interface HighlightCardProps {
    title: string;
    subtitle: string;
    description: string;
    link: string;
    type: 'news' | 'trend' | 'impact';
}

const HighlightCard: React.FC<HighlightCardProps> = ({ title, subtitle, description, link, type }) => {
    const { NewspaperIcon, FireIcon, UserGroupIcon, ArrowRightIcon } = IconMap;

    const styles = {
        news: {
            bg: 'bg-white',
            border: 'border-slate-200',
            iconBg: 'bg-blue-50',
            iconColor: 'text-blue-600',
            icon: NewspaperIcon,
            titleColor: 'text-slate-900'
        },
        trend: {
            bg: 'bg-white',
            border: 'border-slate-200',
            iconBg: 'bg-orange-50',
            iconColor: 'text-orange-600',
            icon: FireIcon,
            titleColor: 'text-slate-900'
        },
        impact: {
            bg: 'bg-white',
            border: 'border-slate-200',
            iconBg: 'bg-emerald-50',
            iconColor: 'text-emerald-600',
            icon: UserGroupIcon,
            titleColor: 'text-slate-900'
        }
    };

    const style = styles[type];
    const Icon = style.icon;

    return (
        <Link to={link} className={`group block p-5 rounded-xl border ${style.border} ${style.bg} shadow-sm hover:shadow-md hover:border-blue-300 transition-all`}>
            <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 p-3 rounded-lg ${style.iconBg} ${style.iconColor}`}>
                    {Icon && <Icon className="h-6 w-6" />}
                </div>
                <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">{subtitle}</p>
                    <h3 className={`text-lg font-bold ${style.titleColor} leading-snug group-hover:text-blue-700 transition-colors`}>{title}</h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">{description}</p>
                </div>
                <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity text-blue-500">
                    {ArrowRightIcon && <ArrowRightIcon className="h-5 w-5" />}
                </div>
            </div>
        </Link>
    );
};

const DailyHighlights: React.FC = () => {
    return (
        <div className="grid md:grid-cols-3 gap-6">
            <HighlightCard 
                type="news"
                subtitle="Noticia Principal"
                title="Ley N° 21.643 Publicada"
                description="Modifica el Código del Trabajo. Nuevas obligaciones preventivas contra el acoso laboral entran en vigencia."
                link="/dashboard/documentos/123"
            />
            <HighlightCard 
                type="trend"
                subtitle="Tendencia del Día"
                title="Alta Actividad en Minería"
                description="Se registra un aumento del 40% en sentencias de exploración respecto al promedio mensual."
                link="/dashboard/temas/mineria"
            />
            <HighlightCard 
                type="impact"
                subtitle="Impacto Directo"
                title="Atención Pymes y Salud"
                description="Nuevos reglamentos sanitarios afectan a farmacias independientes y pequeños prestadores."
                link="/dashboard/temas/salud"
            />
        </div>
    );
};

export default DailyHighlights;
