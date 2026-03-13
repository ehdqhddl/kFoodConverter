import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const OVEN_TEMPS = [
  { c: 160, f: 320 },
  { c: 180, f: 356 },
  { c: 200, f: 392 },
  { c: 220, f: 428 },
];

function ResultDisplay({ value, unit }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={value}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.18 }}
        className="text-4xl font-bold text-primary-600 dark:text-primary-300"
      >
        {value !== '' && !isNaN(Number(value)) ? value : '—'}
        {value !== '' && !isNaN(Number(value)) && <span className="text-xl font-normal text-gray-400 dark:text-gray-500 ml-2">{unit}</span>}
      </motion.div>
    </AnimatePresence>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5 mb-4">
      <h3 className="font-bold text-gray-700 dark:text-gray-200 text-base mb-4">{title}</h3>
      {children}
    </div>
  );
}

function ConvRow({ labelA, valueA, onChangeA, labelB, valueB, onSwap }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{labelA}</p>
        <input
          type="number"
          value={valueA}
          onChange={(e) => onChangeA(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors duration-200"
          step="any"
          placeholder="0"
        />
      </div>
      {onSwap && (
        <button
          onClick={onSwap}
          className="mt-5 w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300 hover:bg-primary-200 transition-colors duration-200 text-lg"
        >
          ⇄
        </button>
      )}
      <div className="flex-1">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{labelB}</p>
        <div className="w-full px-3 py-2 rounded-xl border border-gray-100 dark:border-gray-700 bg-primary-50 dark:bg-primary-900/20 min-h-[44px] flex items-center">
          {valueB !== '' && !isNaN(Number(valueB)) ? (
            <span className="text-lg font-bold text-primary-600 dark:text-primary-300">{valueB}</span>
          ) : (
            <span className="text-gray-300 dark:text-gray-600">—</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function UnitConverter() {
  const { t } = useTranslation();

  // Temperature
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [tempDir, setTempDir] = useState('ctof'); // 'ctof' or 'ftoc'

  const handleCelsius = (val) => {
    setCelsius(val);
    if (val === '' || isNaN(Number(val))) { setFahrenheit(''); return; }
    setFahrenheit((Number(val) * 9 / 5 + 32).toFixed(1));
    setTempDir('ctof');
  };
  const handleFahrenheit = (val) => {
    setFahrenheit(val);
    if (val === '' || isNaN(Number(val))) { setCelsius(''); return; }
    setCelsius(((Number(val) - 32) * 5 / 9).toFixed(1));
    setTempDir('ftoc');
  };

  // Weight: g <-> oz
  const [grams, setGrams] = useState('');
  const [ounces, setOunces] = useState('');
  const [weightGODir, setWeightGODir] = useState('goz');

  const handleGrams = (val) => {
    setGrams(val);
    if (val === '' || isNaN(Number(val))) { setOunces(''); return; }
    setOunces((Number(val) * 0.035274).toFixed(2));
    setWeightGODir('goz');
  };
  const handleOunces = (val) => {
    setOunces(val);
    if (val === '' || isNaN(Number(val))) { setGrams(''); return; }
    setGrams((Number(val) * 28.3495).toFixed(1));
    setWeightGODir('ozg');
  };
  const swapGO = () => {
    if (weightGODir === 'goz') {
      handleOunces(ounces);
    } else {
      handleGrams(grams);
    }
  };

  // Weight: kg <-> lb
  const [kg, setKg] = useState('');
  const [lb, setLb] = useState('');
  const [weightKLDir, setWeightKLDir] = useState('kglb');

  const handleKg = (val) => {
    setKg(val);
    if (val === '' || isNaN(Number(val))) { setLb(''); return; }
    setLb((Number(val) * 2.20462).toFixed(2));
    setWeightKLDir('kglb');
  };
  const handleLb = (val) => {
    setLb(val);
    if (val === '' || isNaN(Number(val))) { setKg(''); return; }
    setKg((Number(val) * 0.453592).toFixed(3));
    setWeightKLDir('lbkg');
  };
  const swapKL = () => {
    if (weightKLDir === 'kglb') {
      handleLb(lb);
    } else {
      handleKg(kg);
    }
  };

  // Volume: ml <-> fl oz
  const [ml, setMl] = useState('');
  const [flOz, setFlOz] = useState('');
  const [volDir, setVolDir] = useState('mlfloz');

  const handleMl = (val) => {
    setMl(val);
    if (val === '' || isNaN(Number(val))) { setFlOz(''); return; }
    setFlOz((Number(val) * 0.033814).toFixed(2));
    setVolDir('mlfloz');
  };
  const handleFlOz = (val) => {
    setFlOz(val);
    if (val === '' || isNaN(Number(val))) { setMl(''); return; }
    setMl((Number(val) * 29.5735).toFixed(1));
    setVolDir('flozml');
  };
  const swapVol = () => {
    if (volDir === 'mlfloz') {
      handleFlOz(flOz);
    } else {
      handleMl(ml);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-5">{t('unit.title')}</h2>

      {/* Temperature */}
      <SectionCard title={t('unit.temperature')}>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('unit.celsius')}</p>
              <input
                type="number"
                value={celsius}
                onChange={(e) => handleCelsius(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors duration-200"
                placeholder="0"
                step="any"
              />
            </div>
            <div className="pb-2 text-gray-400 text-xl">⇄</div>
            <div className="flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t('unit.fahrenheit')}</p>
              <input
                type="number"
                value={fahrenheit}
                onChange={(e) => handleFahrenheit(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors duration-200"
                placeholder="32"
                step="any"
              />
            </div>
          </div>

          {/* Oven temp reference */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-semibold">Common Oven Temps</p>
            <div className="grid grid-cols-4 gap-2">
              {OVEN_TEMPS.map((temp) => (
                <button
                  key={temp.c}
                  onClick={() => handleCelsius(String(temp.c))}
                  className="bg-white dark:bg-gray-700 rounded-lg p-2 text-center hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors duration-200 border border-gray-100 dark:border-gray-600"
                >
                  <p className="text-xs font-bold text-primary-600 dark:text-primary-300">{temp.c}℃</p>
                  <p className="text-xs text-gray-400">{temp.f}℉</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Weight */}
      <SectionCard title={t('unit.weight')}>
        <div className="flex flex-col gap-4">
          <ConvRow
            labelA={t('unit.grams')}
            valueA={grams}
            onChangeA={handleGrams}
            labelB={t('unit.ounces')}
            valueB={ounces}
            onSwap={swapGO}
          />
          <ConvRow
            labelA={t('unit.kilograms')}
            valueA={kg}
            onChangeA={handleKg}
            labelB={t('unit.pounds')}
            valueB={lb}
            onSwap={swapKL}
          />
        </div>
      </SectionCard>

      {/* Volume */}
      <SectionCard title={t('unit.volume')}>
        <ConvRow
          labelA={t('unit.milliliters')}
          valueA={ml}
          onChangeA={handleMl}
          labelB={t('unit.flOunces')}
          valueB={flOz}
          onSwap={swapVol}
        />
      </SectionCard>
    </div>
  );
}
