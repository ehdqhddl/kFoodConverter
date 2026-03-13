import { useTranslation } from 'react-i18next';

export default function Header({ darkMode, setDarkMode, lang, setLang }) {
  const { t } = useTranslation();

  const toggleLang = () => {
    setLang(lang === 'ko' ? 'en' : 'ko');
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-primary-500 to-primary-600 shadow-md">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍚</span>
          <span className="text-white font-bold text-xl tracking-tight">K-Cook Math</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-semibold text-sm transition-colors duration-200 min-h-[44px]"
            aria-label="Toggle language"
          >
            {lang === 'ko' ? (
              <>🇰🇷 KR</>
            ) : (
              <>🇺🇸 EN</>
            )}
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-11 h-11 flex items-center justify-center rounded-lg bg-white/20 hover:bg-white/30 text-white text-xl transition-colors duration-200"
            aria-label={darkMode ? t('lightMode') : t('darkMode')}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}
