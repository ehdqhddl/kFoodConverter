import { useTranslation } from 'react-i18next';

const TABS = ['kmeasure', 'portion', 'unit'];

export default function TabNav({ activeTab, setActiveTab }) {
  const { t } = useTranslation();

  return (
    <nav className="sticky top-[60px] z-30 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-2xl mx-auto flex">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 px-2 text-sm font-semibold transition-colors duration-200 border-b-2 min-h-[44px] ${
              activeTab === tab
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {t(`tabs.${tab}`)}
          </button>
        ))}
      </div>
    </nav>
  );
}
