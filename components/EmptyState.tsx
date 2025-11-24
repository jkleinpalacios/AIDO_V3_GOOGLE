import React from 'react';
// FIX: Removed direct import of InboxIcon and will rely on IconMap.
import { IconMap } from './Icons';

interface EmptyStateProps {
    title: string;
    message: string;
    icon?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message, icon = 'InboxIcon' }) => {
    // FIX: Get IconComponent from IconMap, with a fallback to the default icon from the map itself.
    const IconComponent = IconMap[icon] || IconMap['InboxIcon'];
    return (
        <div className="text-center bg-white p-12 rounded-lg border-2 border-dashed border-slate-200">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <IconComponent className="h-6 w-6 text-slate-400" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm text-slate-500">{message}</p>
        </div>
    );
};

export default EmptyState;