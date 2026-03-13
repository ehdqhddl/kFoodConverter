import { useState, useEffect } from 'react';
import i18n from './i18n';
import Header from './components/Header';
import TabNav from './components/TabNav';
import KMeasurement from './components/KMeasurement';
import PortionScaler from './components/PortionScaler';
import UnitConverter from './components/UnitConverter';
import Toast from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState('kmeasure');
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('ko');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-cream dark:bg-gray-900 transition-colors duration-300">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          lang={lang}
          setLang={setLang}
        />
        <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <main>
          {activeTab === 'kmeasure' && <KMeasurement showToast={showToast} />}
          {activeTab === 'portion' && <PortionScaler />}
          {activeTab === 'unit' && <UnitConverter />}
        </main>
        <Toast message={toast} />
      </div>
    </div>
  );
}
