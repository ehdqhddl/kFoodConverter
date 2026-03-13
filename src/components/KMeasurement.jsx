import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const MEASURES = [
  {
    key: 'paperCup',
    type: 'volume',
    ml: 180,
    flOz: 6.09,
    icon: '🥤',
  },
  {
    key: 'tablespoon',
    type: 'volume',
    ml: 15,
    flOz: 0.51,
    icon: '🥄',
  },
  {
    key: 'teaspoon',
    type: 'volume',
    ml: 5,
    flOz: 0.17,
    icon: '🫙',
  },
  {
    key: 'meatGeun',
    type: 'weight',
    g: 600,
    oz: 21.16,
    lb: 1.3,
    icon: '🥩',
  },
  {
    key: 'vegGeun',
    type: 'weight',
    g: 400,
    oz: 14.11,
    lb: 0.9,
    icon: '🥬',
  },
  {
    key: 'pinch',
    type: 'weight',
    g: 1,
    oz: 0.04,
    extra: '≈ 1/8 tsp',
    icon: '🤏',
  },
  {
    key: 'handful',
    type: 'weight',
    g: 50,
    oz: 1.76,
    icon: '✊',
  },
];

function getResultText(measure) {
  if (measure.type === 'volume') {
    return `${measure.ml} ml  /  ${measure.flOz} fl oz`;
  }
  if (measure.lb !== undefined) {
    return `${measure.g} g  /  ${measure.oz} oz  /  ≈ ${measure.lb} lb`;
  }
  if (measure.extra) {
    return `${measure.g} g  /  ${measure.oz} oz  (${measure.extra})`;
  }
  return `${measure.g} g  /  ${measure.oz} oz`;
}

export default function KMeasurement({ showToast }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (measure) => {
    const text = getResultText(measure);
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(measure.key);
      showToast(t('kmeasure.copied'));
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">{t('kmeasure.title')}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{t('kmeasure.subtitle')}</p>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {MEASURES.map((measure) => {
          const isActive = selected?.key === measure.key;
          return (
            <button
              key={measure.key}
              onClick={() => setSelected(isActive ? null : measure)}
              className={`rounded-2xl p-4 text-left shadow-md transition-all duration-200 min-h-[80px] border-2 ${
                isActive
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                  : 'border-transparent bg-white dark:bg-gray-800 hover:border-primary-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{measure.icon}</span>
                <span className={`font-bold text-sm ${isActive ? 'text-primary-700 dark:text-primary-300' : 'text-gray-800 dark:text-gray-100'}`}>
                  {t(`kmeasure.${measure.key}`)}
                </span>
              </div>
              <p className={`text-xs ${isActive ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`}>
                {t(`kmeasure.${measure.key}Sub`)}
              </p>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-3xl">{selected.icon}</span>
                <div>
                  <p className="font-bold text-lg text-gray-800 dark:text-gray-100">{t(`kmeasure.${selected.key}`)}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{t(`kmeasure.${selected.key}Sub`)}</p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(selected)}
                className="px-4 py-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-colors duration-200 min-h-[44px]"
              >
                {copiedKey === selected.key ? t('kmeasure.copied') : t('kmeasure.copy')}
              </button>
            </div>
            {selected.type === 'volume' ? (
              <div className="flex gap-6">
                <div className="flex-1 bg-primary-50 dark:bg-primary-900/30 rounded-xl p-4 text-center">
                  <p className="text-4xl font-bold text-primary-600 dark:text-primary-300">{selected.ml}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">ml</p>
                </div>
                <div className="flex-1 bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center">
                  <p className="text-4xl font-bold text-orange-500 dark:text-orange-300">{selected.flOz}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">fl oz</p>
                </div>
              </div>
            ) : (
              <div className="flex gap-3 flex-wrap">
                <div className="flex-1 min-w-[80px] bg-primary-50 dark:bg-primary-900/30 rounded-xl p-4 text-center">
                  <p className="text-4xl font-bold text-primary-600 dark:text-primary-300">{selected.g}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">g</p>
                </div>
                <div className="flex-1 min-w-[80px] bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 text-center">
                  <p className="text-4xl font-bold text-orange-500 dark:text-orange-300">{selected.oz}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">oz</p>
                </div>
                {selected.lb !== undefined && (
                  <div className="flex-1 min-w-[80px] bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 text-center">
                    <p className="text-4xl font-bold text-amber-600 dark:text-amber-300">≈{selected.lb}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">lb</p>
                  </div>
                )}
                {selected.extra && (
                  <div className="w-full bg-gray-50 dark:bg-gray-700 rounded-xl p-3 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{selected.extra}</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-2xl p-4 text-sm text-amber-800 dark:text-amber-200">
        {t('kmeasure.note')}
      </div>
    </div>
  );
}
