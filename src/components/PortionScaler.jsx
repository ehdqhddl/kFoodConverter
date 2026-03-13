import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

function Stepper({ value, onChange, min = 1, max = 20 }) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-12 h-12 rounded-full bg-primary-500 text-white text-2xl font-bold flex items-center justify-center active:scale-95 transition-transform hover:bg-primary-600"
      >
        -
      </button>
      <span className="text-3xl font-bold w-8 text-center text-gray-800 dark:text-gray-100">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-12 h-12 rounded-full bg-primary-500 text-white text-2xl font-bold flex items-center justify-center active:scale-95 transition-transform hover:bg-primary-600"
      >
        +
      </button>
    </div>
  );
}

const UNITS = [
  { label: '── 한국 계량 ──', options: ['종이컵', '큰술', '작은술', '한 근', '꼬집', '줌'] },
  { label: '── 무게 ──',      options: ['g', 'kg', 'oz', 'lb'] },
  { label: '── 부피 ──',      options: ['ml', 'L', 'fl oz', 'tsp', 'tbsp', 'cup'] },
  { label: '── 개수 ──',      options: ['개', '장', '봉지', '캔', '팩', '줄기', '알'] },
];

function formatAmount(num) {
  if (num === 0) return '0';
  return Number.isInteger(num) ? String(num) : num.toFixed(1);
}

let nextId = 1;

export default function PortionScaler() {
  const { t } = useTranslation();
  const [fromServings, setFromServings] = useState(2);
  const [toServings, setToServings] = useState(4);
  const [ingredients, setIngredients] = useState([]);

  const addIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      { id: nextId++, name: '', amount: '', unit: '' },
    ]);
  };

  const updateIngredient = (id, field, value) => {
    setIngredients((prev) =>
      prev.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing))
    );
  };

  const removeIngredient = (id) => {
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));
  };

  const scaledIngredients = ingredients
    .filter((ing) => ing.name.trim() && ing.amount !== '' && !isNaN(Number(ing.amount)))
    .map((ing) => ({
      ...ing,
      scaledAmount: formatAmount((toServings / fromServings) * Number(ing.amount)),
    }));

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">{t('portion.title')}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{t('portion.subtitle')}</p>

      {/* Stepper Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 mb-4 grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">{t('portion.from')}</p>
          <Stepper value={fromServings} onChange={setFromServings} />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-semibold text-primary-600 dark:text-primary-300">{t('portion.to')}</p>
          <Stepper value={toServings} onChange={setToServings} />
        </div>
      </div>

      {/* Ingredients Input */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 mb-4">
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {ingredients.map((ing) => (
              <motion.div
                key={ing.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex gap-2 items-center"
              >
                {/* 재료 이름 - 작게 고정 */}
                <input
                  type="text"
                  value={ing.name}
                  onChange={(e) => updateIngredient(ing.id, 'name', e.target.value)}
                  placeholder={t('portion.ingredientName')}
                  className="w-24 flex-shrink-0 px-2 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors duration-200"
                />
                {/* 용량 - 넓게 */}
                <input
                  type="number"
                  value={ing.amount}
                  onChange={(e) => updateIngredient(ing.id, 'amount', e.target.value)}
                  placeholder={t('portion.amount')}
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors duration-200"
                  min="0"
                  step="any"
                />
                {/* 단위 셀렉트 */}
                <select
                  value={ing.unit}
                  onChange={(e) => updateIngredient(ing.id, 'unit', e.target.value)}
                  className="w-24 flex-shrink-0 px-2 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors duration-200 cursor-pointer"
                >
                  <option value="">{t('portion.unit')}</option>
                  {UNITS.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.options.map((u) => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <button
                  onClick={() => removeIngredient(ing.id)}
                  className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30 text-red-500 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors duration-200 text-lg font-bold flex-shrink-0"
                  aria-label={t('portion.remove')}
                >
                  ×
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <button
          onClick={addIngredient}
          className="mt-4 w-full py-3 rounded-xl border-2 border-dashed border-primary-300 dark:border-primary-700 text-primary-600 dark:text-primary-400 font-semibold text-sm hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200 min-h-[44px]"
        >
          {t('portion.addIngredient')}
        </button>
      </div>

      {/* Scaled Results */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
        <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-3 text-base">{t('portion.result')}</h3>
        <AnimatePresence mode="popLayout">
          {scaledIngredients.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-400 dark:text-gray-500 text-sm text-center py-4"
            >
              {t('portion.noIngredients')}
            </motion.p>
          ) : (
            scaledIngredients.map((ing) => (
              <motion.div
                key={ing.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
              >
                <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">{ing.name}</span>
                <span className="text-primary-600 dark:text-primary-300 font-bold text-lg">
                  {ing.scaledAmount} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{ing.unit}</span>
                </span>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
