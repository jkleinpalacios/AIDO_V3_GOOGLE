
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import PrivateLayout from './layouts/PrivateLayout';

// Public Pages
import HomePage from './pages/HomePage';
import DocumentPage from './pages/DocumentPage';
import AboutPage from './pages/AboutPage';
import SearchPage from './pages/SearchPage';
import TopicPage from './pages/TopicPage';
import SectionsPage from './pages/SectionsPage';
import MiningGazettePage from './pages/MiningGazettePage';
import DailySummaryPage from './pages/DailySummaryPage';

// Auth Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Dashboard Pages (New SaaS Structure)
import DashboardPage from './pages/dashboard/DashboardPage';
import DashboardDailySummaryPage from './pages/dashboard/DashboardDailySummaryPage';
import DashboardLegislationPage from './pages/dashboard/DashboardLegislationPage';
import DashboardSearchPage from './pages/dashboard/DashboardSearchPage';
import DashboardTopicsPage from './pages/dashboard/DashboardTopicsPage';
import DashboardTopicDetailPage from './pages/dashboard/DashboardTopicDetailPage';
import DashboardSubtopicDetailPage from './pages/dashboard/DashboardSubtopicDetailPage';
import DashboardEntityDetailPage from './pages/dashboard/DashboardEntityDetailPage';
import SavedDocumentsPage from './pages/SavedDocumentsPage';
import TopicsManagementPage from './pages/TopicsManagementPage';
import AlertsPage from './pages/AlertsPage';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <HashRouter>
                <Routes>
                    {/* Public Routes */}
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/document/:id" element={<DocumentPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/topic/:topic" element={<TopicPage />} />
                        <Route path="/secciones" element={<SectionsPage />} />
                        <Route path="/boletin-minero" element={<MiningGazettePage />} />
                        <Route path="/summary" element={<DailySummaryPage />} />
                    </Route>

                    {/* Auth Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />

                    {/* Private / Dashboard Routes */}
                    <Route path="/dashboard" element={<PrivateLayout />}>
                        <Route index element={<DashboardPage />} />
                        <Route path="resumen-diario" element={<DashboardDailySummaryPage />} />
                        <Route path="legislacion" element={<DashboardLegislationPage />} />
                        <Route path="busqueda" element={<DashboardSearchPage />} />
                        <Route path="temas" element={<DashboardTopicsPage />} />
                        <Route path="temas/:slug" element={<DashboardTopicDetailPage />} />
                        <Route path="temas/:topicSlug/subtemas/:subtopicSlug" element={<DashboardSubtopicDetailPage />} />
                        <Route path="entidades/:entityType/:entitySlug" element={<DashboardEntityDetailPage />} />
                        <Route path="mis-temas" element={<TopicsManagementPage />} />
                        <Route path="documentos" element={<SavedDocumentsPage />} />
                        <Route path="documentos/:id" element={<DocumentPage />} />
                        <Route path="alertas" element={<AlertsPage />} />
                        <Route path="historial" element={<div className="p-8 text-center text-slate-500">Historial de consultas (Próximamente)</div>} />
                        <Route path="configuracion" element={<div className="p-8 text-center text-slate-500">Configuración (Próximamente)</div>} />
                    </Route>
                </Routes>
            </HashRouter>
        </AuthProvider>
    );
};

export default App;
