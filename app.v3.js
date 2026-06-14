(() => {
'use strict';

/* ====================== DATA ====================== */

const SURAH_NAMES = [
  {ar:'الفاتحة',bn:'আল-ফাতিহা',en:'Al-Fatiha',type:'Meccan',ayas:7},
  {ar:'البقرة',bn:'আল-বাকারা',en:'Al-Baqarah',type:'Medinan',ayas:286},
  {ar:'آل عمران',bn:'আলে-ইমরান',en:'Aal-e-Imran',type:'Medinan',ayas:200},
  {ar:'النساء',bn:'আন-নিসা',en:'An-Nisa',type:'Medinan',ayas:176},
  {ar:'المائدة',bn:'আল-মায়িদাহ',en:'Al-Maidah',type:'Medinan',ayas:120},
  {ar:'الأنعام',bn:'আল-আনআম',en:'Al-Anam',type:'Meccan',ayas:165},
  {ar:'الأعراف',bn:'আল-আরাফ',en:'Al-Araf',type:'Meccan',ayas:206},
  {ar:'الأنفال',bn:'আল-আনফাল',en:'Al-Anfal',type:'Medinan',ayas:75},
  {ar:'التوبة',bn:'আত-তাওবাহ্',en:'At-Tawbah',type:'Medinan',ayas:129},
  {ar:'يونس',bn:'ইউনুস',en:'Yunus',type:'Meccan',ayas:109},
  {ar:'هود',bn:'হুদ',en:'Hud',type:'Meccan',ayas:123},
  {ar:'يوسف',bn:'ইউসুফ',en:'Yusuf',type:'Meccan',ayas:111},
  {ar:'الرعد',bn:'আর-রাদ',en:'Ar-Rad',type:'Medinan',ayas:43},
  {ar:'إبراهيم',bn:'ইব্রাহীম',en:'Ibrahim',type:'Meccan',ayas:52},
  {ar:'الحجر',bn:'আল-হিজর',en:'Al-Hijr',type:'Meccan',ayas:99},
  {ar:'النحل',bn:'আন-নাহল',en:'An-Nahl',type:'Meccan',ayas:128},
  {ar:'الإسراء',bn:'বনী-ইসরাঈল',en:'Al-Isra',type:'Meccan',ayas:111},
  {ar:'الكهف',bn:'আল-কাহফ',en:'Al-Kahf',type:'Meccan',ayas:110},
  {ar:'مريم',bn:'মারিয়াম',en:'Maryam',type:'Meccan',ayas:98},
  {ar:'طه',bn:'ত্বোয়া-হা',en:'Ta-Ha',type:'Meccan',ayas:135},
  {ar:'الأنبياء',bn:'আল-আম্বিয়া',en:'Al-Anbiya',type:'Meccan',ayas:112},
  {ar:'الحج',bn:'আল-হাজ্জ্ব',en:'Al-Hajj',type:'Medinan',ayas:78},
  {ar:'المؤمنون',bn:'আল-মুমিনুন',en:'Al-Muminun',type:'Meccan',ayas:118},
  {ar:'النور',bn:'আন-নূর',en:'An-Nur',type:'Medinan',ayas:64},
  {ar:'الفرقان',bn:'আল-ফুরকান',en:'Al-Furqan',type:'Meccan',ayas:77},
  {ar:'الشعراء',bn:'আশ-শুআরা',en:'Ash-Shuara',type:'Meccan',ayas:227},
  {ar:'النمل',bn:'আন-নামল',en:'An-Naml',type:'Meccan',ayas:93},
  {ar:'القصص',bn:'আল-কাসাস',en:'Al-Qasas',type:'Meccan',ayas:88},
  {ar:'العنكبوت',bn:'আল-আনকাবুত',en:'Al-Ankabut',type:'Meccan',ayas:69},
  {ar:'الروم',bn:'আর-রুম',en:'Ar-Rum',type:'Meccan',ayas:60},
  {ar:'لقمان',bn:'লুকমান',en:'Luqman',type:'Meccan',ayas:34},
  {ar:'السجدة',bn:'আস-সাজদাহ',en:'As-Sajdah',type:'Meccan',ayas:30},
  {ar:'الأحزاب',bn:'আল-আহযাব',en:'Al-Ahzab',type:'Medinan',ayas:73},
  {ar:'سبإ',bn:'সাবা',en:'Saba',type:'Meccan',ayas:54},
  {ar:'فاطر',bn:'ফাতির',en:'Fatir',type:'Meccan',ayas:45},
  {ar:'يس',bn:'ইয়াসীন',en:'Ya-Sin',type:'Meccan',ayas:83},
  {ar:'الصافات',bn:'আস-সাফফাত',en:'As-Saffat',type:'Meccan',ayas:182},
  {ar:'ص',bn:'সোয়াদ',en:'Sad',type:'Meccan',ayas:88},
  {ar:'الزمر',bn:'আয-যুমার',en:'Az-Zumar',type:'Meccan',ayas:75},
  {ar:'غافر',bn:'আল-মুমিন',en:'Ghafir',type:'Meccan',ayas:85},
  {ar:'فصلت',bn:'হা-মীম সাজদাহ',en:'Fussilat',type:'Meccan',ayas:54},
  {ar:'الشورى',bn:'আশ-শূরা',en:'Ash-Shura',type:'Meccan',ayas:53},
  {ar:'الزخرف',bn:'আয-যুখরুফ',en:'Az-Zukhruf',type:'Meccan',ayas:89},
  {ar:'الدخان',bn:'আদ-দোখান',en:'Ad-Dukhan',type:'Meccan',ayas:59},
  {ar:'الجاثية',bn:'আল-জাসিয়াহ',en:'Al-Jathiyah',type:'Meccan',ayas:37},
  {ar:'الأحقاف',bn:'আল-আহকাফ',en:'Al-Ahqaf',type:'Meccan',ayas:35},
  {ar:'محمد',bn:'মুহাম্মাদ',en:'Muhammad',type:'Medinan',ayas:38},
  {ar:'الفتح',bn:'আল-ফাতহ',en:'Al-Fath',type:'Medinan',ayas:29},
  {ar:'الحجرات',bn:'আল-হুজুরাত',en:'Al-Hujurat',type:'Medinan',ayas:18},
  {ar:'ق',bn:'ক্বাফ',en:'Qaf',type:'Meccan',ayas:45},
  {ar:'الذاريات',bn:'আয-যারিয়াত',en:'Adh-Dhariyat',type:'Meccan',ayas:60},
  {ar:'الطور',bn:'আত-তূর',en:'At-Tur',type:'Meccan',ayas:49},
  {ar:'النجم',bn:'আন-নাজম',en:'An-Najm',type:'Meccan',ayas:62},
  {ar:'القمر',bn:'আল-ক্বামার',en:'Al-Qamar',type:'Meccan',ayas:55},
  {ar:'الرحمن',bn:'আর-রহমান',en:'Ar-Rahman',type:'Medinan',ayas:78},
  {ar:'الواقعة',bn:'আল-ওয়াকিআহ',en:'Al-Waqiah',type:'Meccan',ayas:96},
  {ar:'الحديد',bn:'আল-হাদীদ',en:'Al-Hadid',type:'Medinan',ayas:29},
  {ar:'المجادلة',bn:'আল-মুজাদালাহ',en:'Al-Mujadilah',type:'Medinan',ayas:22},
  {ar:'الحشر',bn:'আল-হাশর',en:'Al-Hashr',type:'Medinan',ayas:24},
  {ar:'الممتحنة',bn:'আল-মুমতাহানা',en:'Al-Mumtahanah',type:'Medinan',ayas:13},
  {ar:'الصف',bn:'আস-সফ',en:'As-Saf',type:'Medinan',ayas:14},
  {ar:'الجمعة',bn:'আল-জুমুআ',en:'Al-Jumuah',type:'Medinan',ayas:11},
  {ar:'المنافقون',bn:'আল-মুনাফিকুন',en:'Al-Munafiqun',type:'Medinan',ayas:11},
  {ar:'التغابن',bn:'আত-তাগাবুন',en:'At-Taghabun',type:'Medinan',ayas:18},
  {ar:'الطلاق',bn:'আত-তালাক',en:'At-Talaq',type:'Medinan',ayas:12},
  {ar:'التحريم',bn:'আত-তাহরীম',en:'At-Tahrim',type:'Medinan',ayas:12},
  {ar:'الملك',bn:'আল-মুলক',en:'Al-Mulk',type:'Meccan',ayas:30},
  {ar:'القلم',bn:'আল-কালাম',en:'Al-Qalam',type:'Meccan',ayas:52},
  {ar:'الحاقة',bn:'আল-হাক্কাহ',en:'Al-Haqqah',type:'Meccan',ayas:52},
  {ar:'المعارج',bn:'আল-মাআরিজ',en:'Al-Maarij',type:'Meccan',ayas:44},
  {ar:'نوح',bn:'নূহ',en:'Nuh',type:'Meccan',ayas:28},
  {ar:'الجن',bn:'আল-জিন',en:'Al-Jinn',type:'Meccan',ayas:28},
  {ar:'المزمل',bn:'আল-মুজাম্মিল',en:'Al-Muzzammil',type:'Meccan',ayas:20},
  {ar:'المدثر',bn:'আল-মুদ্দাসসির',en:'Al-Muddaththir',type:'Meccan',ayas:56},
  {ar:'القيامة',bn:'আল-কিয়ামাহ',en:'Al-Qiyamah',type:'Meccan',ayas:40},
  {ar:'الإنسان',bn:'আদ-দাহর',en:'Al-Insan',type:'Medinan',ayas:31},
  {ar:'المرسلات',bn:'আল-মুরসালাত',en:'Al-Mursalat',type:'Meccan',ayas:50},
  {ar:'النبإ',bn:'আন-নাবা',en:'An-Naba',type:'Meccan',ayas:40},
  {ar:'النازعات',bn:'আন-নাযিআত',en:'An-Naziat',type:'Meccan',ayas:46},
  {ar:'عبس',bn:'আবাসা',en:'Abasa',type:'Meccan',ayas:42},
  {ar:'التكوير',bn:'আত-তাকভীর',en:'At-Takwir',type:'Meccan',ayas:29},
  {ar:'الإنفطار',bn:'আল-ইনফিতার',en:'Al-Infitar',type:'Meccan',ayas:19},
  {ar:'المطففين',bn:'আল-মুতাফফিফীন',en:'Al-Mutaffifin',type:'Meccan',ayas:36},
  {ar:'الإنشقاق',bn:'আল-ইনশিকাক',en:'Al-Inshiqaq',type:'Meccan',ayas:25},
  {ar:'البروج',bn:'আল-বুরুজ',en:'Al-Buruj',type:'Meccan',ayas:22},
  {ar:'الطارق',bn:'আত-তারিক্ব',en:'At-Tariq',type:'Meccan',ayas:17},
  {ar:'الأعلى',bn:'আল-আলা',en:'Al-Ala',type:'Meccan',ayas:19},
  {ar:'الغاشية',bn:'আল-গাশিয়াহ',en:'Al-Ghashiyah',type:'Meccan',ayas:26},
  {ar:'الفجر',bn:'আল-ফাজর',en:'Al-Fajr',type:'Meccan',ayas:30},
  {ar:'البلد',bn:'আল-বালাদ',en:'Al-Balad',type:'Meccan',ayas:20},
  {ar:'الشمس',bn:'আশ-শামস',en:'Ash-Shams',type:'Meccan',ayas:15},
  {ar:'الليل',bn:'আল-লাইল',en:'Al-Layl',type:'Meccan',ayas:21},
  {ar:'الضحى',bn:'আদ-দুহা',en:'Ad-Duha',type:'Meccan',ayas:11},
  {ar:'الشرح',bn:'আল-ইনশিরাহ',en:'Ash-Sharh',type:'Meccan',ayas:8},
  {ar:'التين',bn:'আত-তীন',en:'At-Tin',type:'Meccan',ayas:8},
  {ar:'العلق',bn:'আল-আলাক্ব',en:'Al-Alaq',type:'Meccan',ayas:19},
  {ar:'القدر',bn:'আল-ক্বাদর',en:'Al-Qadr',type:'Meccan',ayas:5},
  {ar:'البينة',bn:'আল-বাইয়্যিনাহ',en:'Al-Bayyinah',type:'Medinan',ayas:8},
  {ar:'الزلزلة',bn:'আয-যালযালাহ',en:'Az-Zalzalah',type:'Medinan',ayas:8},
  {ar:'العاديات',bn:'আল-আদিয়াত',en:'Al-Adiyat',type:'Meccan',ayas:11},
  {ar:'القارعة',bn:'আল-কারিয়াহ',en:'Al-Qariah',type:'Meccan',ayas:11},
  {ar:'التكاثر',bn:'আত-তাকাসুর',en:'At-Takathur',type:'Meccan',ayas:8},
  {ar:'العصر',bn:'আল-আসর',en:'Al-Asr',type:'Meccan',ayas:3},
  {ar:'الهمزة',bn:'আল-হুমাযাহ',en:'Al-Humazah',type:'Meccan',ayas:9},
  {ar:'الفيل',bn:'আল-ফীল',en:'Al-Fil',type:'Meccan',ayas:5},
  {ar:'قريش',bn:'কুরাইশ',en:'Quraysh',type:'Meccan',ayas:4},
  {ar:'الماعون',bn:'আল-মাউন',en:'Al-Maun',type:'Meccan',ayas:7},
  {ar:'الكوثر',bn:'আল-কাওসার',en:'Al-Kawthar',type:'Meccan',ayas:3},
  {ar:'الكافرون',bn:'আল-কাফিরুন',en:'Al-Kafirun',type:'Meccan',ayas:6},
  {ar:'النصر',bn:'আন-নাসর',en:'An-Nasr',type:'Medinan',ayas:3},
  {ar:'المسد',bn:'আল-মাসাদ',en:'Al-Masad',type:'Meccan',ayas:5},
  {ar:'الإخلاص',bn:'আল-ইখলাস',en:'Al-Ikhlas',type:'Meccan',ayas:4},
  {ar:'الفلق',bn:'আল-ফালাক্ব',en:'Al-Falaq',type:'Meccan',ayas:5},
  {ar:'الناس',bn:'আন-নাস',en:'An-Nas',type:'Meccan',ayas:6}
];

const RECITERS = [
  {id:'Mishari-Rashid',name:'Mishari Rashid Al-Afasy',bn:'মিশারি রশিদ'},
];

/* ====================== INDEXEDDB CACHE ====================== */
const DB_NAME = 'QuranAppDB';
const DB_VERSION = 1;
const STORE_NAME_SURAHS = 'surahs';
const STORE_NAME_JUZ = 'juz';

let dbInstance = null;

function initDB() {
  if (dbInstance) return Promise.resolve(dbInstance);
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME_SURAHS)) {
        db.createObjectStore(STORE_NAME_SURAHS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_NAME_JUZ)) {
        db.createObjectStore(STORE_NAME_JUZ, { keyPath: 'id' });
      }
    };
  });
}

function getCache(storeName, id) {
  return initDB().then(db => {
    return new Promise((resolve) => {
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);
      request.onerror = () => resolve(null);
      request.onsuccess = () => {
        if (request.result) {
          resolve(request.result.data);
        } else {
          resolve(null);
        }
      };
    });
  }).catch(() => null);
}

function setCache(storeName, id, data) {
  return initDB().then(db => {
    return new Promise((resolve) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put({ id, data, timestamp: Date.now() });
      request.onerror = () => resolve();
      request.onsuccess = () => resolve();
    });
  }).catch(() => {});
}

/* ====================== STATE ====================== */
let pageRelation = null;
let rukuRelation = null;
let currentSurah = null;
let currentJuz = null;
let currentAyahs = null;
let activeAudio = null;
let currentSurahAudio = null;
let isPlaying = false;
let reciter = localStorage.getItem('reciter') || 'Mishari-Rashid';

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
let arabicFontSize = parseInt(localStorage.getItem('arabicFontSize')) || 36;

function applyFontSize(size) {
  arabicFontSize = size;
  localStorage.setItem('arabicFontSize', size);
  document.documentElement.style.setProperty('--arabic-font-size', size + 'px');
  document.documentElement.style.setProperty('--arabic-line-height', Math.round(size * 1.6 / 36 * 10) / 10 + 'em');
  const label = $('#fontSizeLabelModal');
  if (label) label.textContent = size;
}

/* ====================== DATA LOADING ====================== */
async function loadJSON(url, fallback) {
  try {
    const r = await fetch(url, {cache:'force-cache'});
    if (!r.ok) throw new Error('HTTP '+r.status);
    return await r.json();
  } catch(e) {
    console.warn('Failed to load', url, e);
    return fallback;
  }
}

async function loadPageRelation() {
  let data = await loadJSON('./data/pageRelation.json', null);
  if (!data) {
    data = await loadJSON('https://read.quranmajeed.com/JSONFiles/pageRelation.json', null);
  }
  if (data) pageRelation = data;
}
async function loadRukuRelation() {
  let data = await loadJSON('./data/rukuSurahRelation.json', null);
  if (!data) {
    data = await loadJSON('https://read.quranmajeed.com/JSONFiles/rukuSurahRelation.json', null);
  }
  if (data) rukuRelation = data;
}

/* ====================== RUKU LOOKUP ====================== */
function getRukuForAyah(surah, ayah) {
  if (!pageRelation) return '01';
  const key = `${surah}`;
  const rows = pageRelation[key] || pageRelation[key.toString()];
  if (!rows) return '01';
  for (const r of rows) {
    if (ayah >= r.ayahStart && ayah <= r.ayahEnd) {
      return String(r.ruku).padStart(2,'0');
    }
  }
  return '01';
}

function getRukuCount(surah) {
  if (!rukuRelation) return 1;
  const key = surah.toString();
  const r = rukuRelation[key] || rukuRelation.find(x => x.surah === key || x.surah === surah);
  if (r) return r.ruku || r.rukuCount || 1;
  return 1;
}

/* ====================== AUDIO ====================== */
let currentAudio = null;
let nextAudio = null;
let nextAudioUrl = null;
let currentPlayingSurah = null;
let currentPlayingJuz = null;
let currentAyahIndex = 0;
let startAyahIndex = 0;
let ayahsPlayedInRange = 0;
let rangeRepeatCount = 0;
let ayahRepeatCount = 0;

function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  if (nextAudio) {
    nextAudio.pause();
    nextAudio = null;
  }
  nextAudioUrl = null;
  currentPlayingSurah = null;
  currentPlayingJuz = null;
  document.querySelectorAll('#surahView .aya-wrapper.active').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.surah-play-btn, .rnb-play-btn').forEach(btn => btn.classList.remove('playing'));
  if ('mediaSession' in navigator) {
    navigator.mediaSession.playbackState = 'none';
  }
}

function playSurah(surahNum, btn) {
  closeSettings();
  if (currentPlayingSurah === surahNum && currentAudio) {
    if (!currentAudio.paused) {
      currentAudio.pause();
      if (btn) btn.classList.remove('playing');
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
      }
    } else {
      currentAudio.playbackRate = parseFloat(playbackSettings.speed);
      currentAudio.play().then(() => {
        if (btn) btn.classList.add('playing');
        if ('mediaSession' in navigator) {
          navigator.mediaSession.playbackState = 'playing';
        }
      }).catch(() => {});
    }
    return;
  }

  stopAudio();

  currentPlayingSurah = surahNum;
  const s = SURAH_NAMES[surahNum - 1];
  const totalAyahs = s.ayas;

  const selectedEl = document.querySelector('#surahView .aya-wrapper.selected');
  if (selectedEl) {
    startAyahIndex = parseInt(selectedEl.dataset.ayah) - 1;
    selectedEl.classList.remove('selected');
  } else {
    startAyahIndex = 0;
  }

  currentAyahIndex = startAyahIndex;
  ayahsPlayedInRange = 0;
  rangeRepeatCount = 0;
  ayahRepeatCount = 0;

  playNextAyah(btn);
}

async function preloadNextAyah() {
  const nextIdx = currentAyahIndex + 1;
  const rangeVal = playbackSettings.range;
  const maxRangeAyahs = (rangeVal === 'full') ? currentAyahs.length : parseInt(rangeVal);

  if (!currentAyahs || nextIdx >= currentAyahs.length || ayahsPlayedInRange + 1 >= maxRangeAyahs) {
    nextAudio = null;
    nextAudioUrl = null;
    return;
  }

  const nextAyahData = currentAyahs[nextIdx];
  const surahNum = (nextAyahData.surah && nextAyahData.surah.number) ? nextAyahData.surah.number : currentPlayingSurah;
  const sStr = String(surahNum).padStart(3, '0');
  const aStr = String(nextAyahData.numberInSurah).padStart(3, '0');
  const audioUrl = `https://www.everyayah.com/data/Alafasy_128kbps/${sStr}${aStr}.mp3`;

  let playUrl = audioUrl;
  try {
    const audioCache = await caches.open(AUDIO_CACHE_NAME);
    const cachedResponse = await audioCache.match(audioUrl);
    if (cachedResponse) {
      const blob = await cachedResponse.blob();
      playUrl = URL.createObjectURL(blob);
    }
  } catch(e) {}

  if (nextAudioUrl === playUrl) return; // Already preloaded

  nextAudio = new Audio(playUrl);
  nextAudio.preload = 'auto';
  nextAudio.load();
  nextAudioUrl = playUrl;
}

function updateMediaSession(surahNum, ayahData, btn) {
  if (!('mediaSession' in navigator)) return;

  const s = SURAH_NAMES[surahNum - 1];
  navigator.mediaSession.metadata = new MediaMetadata({
    title: `Ayah ${ayahData.numberInSurah} (আয়াত ${toBengaliNum(ayahData.numberInSurah)})`,
    artist: 'Mishari Rashid Al-Afasy (মিশারি রশিদ)',
    album: `${s.en} - ${s.bn}`,
    artwork: [
      { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: 'icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  });

  navigator.mediaSession.playbackState = 'playing';

  navigator.mediaSession.setActionHandler('play', () => {
    if (currentAudio) {
      currentAudio.play().then(() => {
        navigator.mediaSession.playbackState = 'playing';
        document.querySelectorAll('.surah-play-btn, .rnb-play-btn').forEach(b => b.classList.add('playing'));
      }).catch(() => {});
    }
  });

  navigator.mediaSession.setActionHandler('pause', () => {
    if (currentAudio) {
      currentAudio.pause();
      navigator.mediaSession.playbackState = 'paused';
      document.querySelectorAll('.surah-play-btn, .rnb-play-btn').forEach(b => b.classList.remove('playing'));
    }
  });

  navigator.mediaSession.setActionHandler('previoustrack', () => {
    if (currentAyahIndex > 0) {
      currentAyahIndex--;
      if (ayahsPlayedInRange > 0) ayahsPlayedInRange--;
      ayahRepeatCount = 0;
      playNextAyah(btn);
    }
  });

  navigator.mediaSession.setActionHandler('nexttrack', () => {
    currentAyahIndex++;
    ayahsPlayedInRange++;
    ayahRepeatCount = 0;
    playNextAyah(btn);
  });
}

async function playNextAyah(btn) {
  if (!currentAyahs || currentAyahIndex >= currentAyahs.length) {
    handleRangeOrSurahEnd(btn);
    return;
  }

  const rangeVal = playbackSettings.range;
  const maxRangeAyahs = (rangeVal === 'full') ? currentAyahs.length : parseInt(rangeVal);
  if (ayahsPlayedInRange >= maxRangeAyahs) {
    handleRangeOrSurahEnd(btn);
    return;
  }

  const ayahData = currentAyahs[currentAyahIndex];
  const globalNumber = ayahData.number;

  document.querySelectorAll('#surahView .aya-wrapper.active').forEach(el => el.classList.remove('active'));
  const surahNum = (ayahData.surah && ayahData.surah.number) ? ayahData.surah.number : currentPlayingSurah;
  const ayahEl = document.querySelector(`#surahView .aya-wrapper[data-surah="${surahNum}"][data-ayah="${ayahData.numberInSurah}"]`);
  if (ayahEl) {
    ayahEl.classList.add('active');
    ayahEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  const sStr = String(surahNum).padStart(3, '0');
  const aStr = String(ayahData.numberInSurah).padStart(3, '0');
  const audioUrl = `https://www.everyayah.com/data/Alafasy_128kbps/${sStr}${aStr}.mp3`;

  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  // Check if audio is cached — serve from blob URL for full offline support
  let playUrl = audioUrl;
  try {
    const audioCache = await caches.open(AUDIO_CACHE_NAME);
    const cachedResponse = await audioCache.match(audioUrl);
    if (cachedResponse) {
      const blob = await cachedResponse.blob();
      playUrl = URL.createObjectURL(blob);
    }
  } catch(e) { /* fallback to online URL */ }

  if (nextAudio && nextAudioUrl === playUrl) {
    currentAudio = nextAudio;
  } else {
    currentAudio = new Audio(playUrl);
  }

  // Clear preloader reference as it is now currentAudio
  nextAudio = null;
  nextAudioUrl = null;

  currentAudio.playbackRate = parseFloat(playbackSettings.speed);

  if (btn) btn.classList.add('playing');

  currentAudio.onended = () => {
    const ayahRepeatSetting = playbackSettings.ayahRepeat;
    const ayahRepeatMax = (ayahRepeatSetting === 'once') ? 1 : parseInt(ayahRepeatSetting);

    ayahRepeatCount++;
    if (ayahRepeatCount < ayahRepeatMax) {
      currentAudio.currentTime = 0;
      currentAudio.playbackRate = parseFloat(playbackSettings.speed);
      currentAudio.play().catch(() => {});
    } else {
      ayahRepeatCount = 0;
      currentAyahIndex++;
      ayahsPlayedInRange++;
      playNextAyah(btn);
    }
  };

  currentAudio.onerror = () => {
    console.error(`Failed to play Ayah ${globalNumber}`);
    currentAyahIndex++;
    ayahsPlayedInRange++;
    playNextAyah(btn);
  };

  currentAudio.play().then(() => {
    updateMediaSession(surahNum, ayahData, btn);
    preloadNextAyah();
  }).catch((e) => {
    console.warn("Audio play interrupted or failed", e);
    preloadNextAyah();
  });
}

function handleRangeOrSurahEnd(btn) {
  const maxRangeRepeat = parseInt(playbackSettings.repeat);

  rangeRepeatCount++;
  if (maxRangeRepeat === 0 || rangeRepeatCount < maxRangeRepeat) {
    currentAyahIndex = startAyahIndex;
    ayahsPlayedInRange = 0;
    ayahRepeatCount = 0;
    playNextAyah(btn);
  } else {
    stopAudio();
    if (btn) btn.classList.remove('playing');
  }
}

/* ====================== SURAH LIST ====================== */
function renderSurahList() {
  const container = $('#surahList');
  container.innerHTML = SURAH_NAMES.map((s,i) => `
    <div class="surah-card" data-surah="${i+1}">
      <div class="surah-card-header">
        <span class="surah-num">${String(i+1).padStart(3,'0')}</span>
        <span class="surah-arabic">${s.ar}</span>
      </div>
      <div class="surah-bn">${s.bn}</div>
      <div class="surah-en">${s.en}</div>
      <div class="surah-aya-count">${s.ayas} আয়াত</div>
    </div>
  `).join('');

  container.querySelectorAll('.surah-card').forEach(el => {
    el.addEventListener('click', () => openSurah(Number(el.dataset.surah)));
  });
}

/* ====================== SURAH VIEW ====================== */
async function openSurah(n, highlightAyah = null) {
  currentSurah = n;
  currentJuz = null;
  const main = $('main');
  const view = $('#surahView');
  view.innerHTML = '<div class="loading">আয়াত আনিতেছে...</div>';
  view.classList.add('active');
  main.style.display = 'none';
  window.scrollTo(0,0);

  const s = SURAH_NAMES[n-1];
  
  let cached = await getCache(STORE_NAME_SURAHS, n);
  let arData = cached ? cached.arData : null;
  let bnData = cached ? cached.bnData : null;

  if (!arData || !bnData) {
    try {
      // Try local JSON first
      const localRes = await fetch(`./data/surahs/${n}.json`);
      if (localRes.ok) {
        const localData = await localRes.json();
        arData = localData.arData;
        bnData = localData.bnData;
      } else {
        // Fallback to online API
        const [arRes, bnRes] = await Promise.all([
          fetch(`https://api.alquran.cloud/v1/surah/${n}/quran-uthmani`),
          fetch(`https://api.alquran.cloud/v1/surah/${n}/bn.bengali`)
        ]);
        arData = arRes.ok ? (await arRes.json()).data : null;
        bnData = bnRes.ok ? (await bnRes.json()).data : null;
      }

      if (arData && bnData) {
        await setCache(STORE_NAME_SURAHS, n, { arData, bnData });
      }
    } catch(e) {
      console.error("Fetch Surah failed", e);
    }
  }

  if (!arData) {
    view.innerHTML = '<div class="error">আয়াত লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।</div>';
    return;
  }

  currentAyahs = arData.ayahs;

  const juzNum = SURAH_TO_JUZ[n - 1] || 1;

  let html = `
    <div class="reader-nav-bar" id="readerNavBar">
      <button class="rnb-pill rnb-back" onclick="closeSurah()">
        <span class="rnb-arrow">&#8592;</span>
        <span class="rnb-juz-label">পারা ${juzNum}</span>
      </button>
      <div class="rnb-pill rnb-ayah-counter" id="readerAyahCounter">১</div>
      <div class="rnb-pill rnb-surah-info">
        <span class="rnb-surah-num">${n}</span>
        <span class="rnb-surah-name">${s.en.toUpperCase()}</span>
        <button class="rnb-dl-btn" onclick="event.stopPropagation(); toggleDownloadSurah(${n}, this)" id="rnbDlBtn" title="অডিও অফলাইনে সেভ করুন">
          <span class="dl-arrow-icon">⬇</span>
        </button>
        <button class="rnb-play-btn surah-play-btn" onclick="event.stopPropagation(); playSurah(${n}, this)"><span class="play-icon"></span></button>
      </div>
    </div>
    <div class="surah-header">
      <div class="surah-arabic">${s.ar}</div>
      <div class="surah-bn">${s.bn}</div>
      <div class="surah-info">${s.type} &bull; ${s.ayas} আয়াত</div>
    </div>
    ${n > 1 && n !== 9 ? '<div class="bismillah">\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u064e\u0647\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0650\u064a\u0645\u0650</div>' : ''}
    <div class="ayahs-container">
  `;

  arData.ayahs.forEach((a, i) => {
    const bnAyah = bnData && bnData.ayahs[i] ? bnData.ayahs[i].text : '';
    html += `
      <div class="aya-wrapper" data-surah="${n}" data-ayah="${a.numberInSurah}">
        <div class="aya-row">
          <div class="aya-ar-side">
            <span class="ayah-text">${a.text}</span>
            <span class="ayah-num-circle">${a.numberInSurah}</span>
          </div>
        </div>
        ${bnAyah ? `<div class="aya-bn-line">${bnAyah}</div>` : ''}
      </div>
    `;
  });

  html += '</div>';
  view.innerHTML = html;

  // Initialize download button state
  const dlBtn = document.getElementById('rnbDlBtn');
  if (dlBtn) updateDownloadButtonState(n, dlBtn);

  if (highlightAyah) {
    const el = view.querySelector(`.aya-wrapper[data-ayah="${highlightAyah}"]`);
    if (el) {
      el.classList.add('selected');
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }

  /* --- Scroll-based ayah counter in nav bar --- */
  const ayahCounter = document.getElementById('readerAyahCounter');
  if (ayahCounter && 'IntersectionObserver' in window) {
    const wrappers = view.querySelectorAll('.aya-wrapper');
    const observer = new IntersectionObserver((entries) => {
      // Find topmost visible ayah
      let topEntry = null;
      entries.forEach(e => {
        if (e.isIntersecting) {
          if (!topEntry || e.boundingClientRect.top < topEntry.boundingClientRect.top) {
            topEntry = e;
          }
        }
      });
      if (topEntry) {
        const ayahNum = topEntry.target.dataset.ayah;
        ayahCounter.textContent = ayahNum;
      }
    }, { threshold: 0.3, rootMargin: '-60px 0px 0px 0px' });
    wrappers.forEach(w => observer.observe(w));
  }

  view.querySelectorAll('.aya-wrapper').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('.surah-play-btn') || e.target.closest('.rnb-play-btn')) return;
      view.querySelectorAll('.aya-wrapper.selected').forEach(a => a.classList.remove('selected'));
      el.classList.add('selected');

      if (currentPlayingSurah === n) {
        const playBtn = document.querySelector('#surahView .rnb-play-btn');
        startAyahIndex = parseInt(el.dataset.ayah) - 1;
        currentAyahIndex = startAyahIndex;
        ayahsPlayedInRange = 0;
        ayahRepeatCount = 0;
        el.classList.remove('selected');
        playNextAyah(playBtn);
      }
    });
  });
}

function closeSurah() {
  stopAudio();
  currentSurah = null;
  currentAyahs = null;
  const view = $('#surahView');
  view.classList.remove('active');
  $('main').style.display = 'block';
}

/* ====================== SETTINGS ====================== */
function toggleSettings() {
  const modal = $('#settingsModal');
  modal.classList.toggle('active');
}
function closeSettings() {
  $('#settingsModal').classList.remove('active');
}

let playbackSettings = {
  range: 'full',
  repeat: '1',
  ayahRepeat: 'once',
  speed: '1'
};

function stepRange(dir) {
  const opts = ['Full Surah'];
  for (let i = 1; i <= 30; i++) opts.push(i + ' Ayat');
  const vals = ['full'];
  for (let i = 1; i <= 30; i++) vals.push(String(i));
  let idx = vals.indexOf(playbackSettings.range);
  if (idx === -1) idx = 0;
  idx = (idx + dir + opts.length) % opts.length;
  playbackSettings.range = vals[idx];
  $('#rangeValue').textContent = opts[idx];
}

function stepRepeat(dir) {
  const opts = [1, 2, 3, 5, 10, 0];
  const labels = ['1', '2', '3', '5', '10', '0'];
  let idx = opts.indexOf(parseInt(playbackSettings.repeat));
  if (idx === -1) idx = 1;
  idx = (idx + dir + opts.length) % opts.length;
  playbackSettings.repeat = String(opts[idx]);
  $('#repeatValue').textContent = opts[idx] === 0 ? '∞' : opts[idx];
}

function stepAyahRepeat(dir) {
  const opts = ['once', '2', '3', '5', '10'];
  const labels = ['Once', '2', '3', '5', '10'];
  let idx = opts.indexOf(playbackSettings.ayahRepeat);
  if (idx === -1) idx = 0;
  idx = (idx + dir + opts.length) % opts.length;
  playbackSettings.ayahRepeat = opts[idx];
  $('#ayahRepeatValue').textContent = labels[idx];
}

function stepSpeed(dir) {
  const opts = ['0.5', '0.75', '1', '1.25', '1.5', '2'];
  let idx = opts.indexOf(playbackSettings.speed);
  if (idx === -1) idx = 2;
  idx = (idx + dir + opts.length) % opts.length;
  playbackSettings.speed = opts[idx];
  $('#speedValue').textContent = opts[idx] + 'x';
  if (currentAudio) currentAudio.playbackRate = parseFloat(opts[idx]);
}

function resetDefaults() {
  playbackSettings = { range: 'full', repeat: '1', ayahRepeat: 'once', speed: '1' };
  $('#rangeValue').textContent = 'Full Surah';
  $('#repeatValue').textContent = '1';
  $('#ayahRepeatValue').textContent = 'Once';
  $('#speedValue').textContent = '1.0x';
}

/* ====================== SEARCH FILTER ====================== */
function filterSurahs() {
  const query = $('#surahSearch').value.toLowerCase().trim();
  // Only target surah cards inside #surahList — Juz cards share the class but live in #juzList
  const cards = $$('#surahList .surah-card');
  cards.forEach(card => {
    const surahNum = card.dataset.surah;
    // Guard: skip any card that doesn't have a surah number (shouldn't happen, but safety first)
    if (surahNum === undefined) return;

    const nameAr = (card.querySelector('.surah-arabic')?.textContent || '').toLowerCase();
    const nameBn = (card.querySelector('.surah-bn')?.textContent || '').toLowerCase();
    const nameEn = (card.querySelector('.surah-en')?.textContent || '').toLowerCase();
    
    const matches = !query ||
                    surahNum.includes(query) || 
                    nameAr.includes(query) || 
                    nameBn.includes(query) || 
                    nameEn.includes(query);
                    
    card.style.display = matches ? 'block' : 'none';
  });
}

/* ====================== JUZ / CURATED VERSES DATA ====================== */
const CURATED_VERSES = [
  {
    surah: 2,
    ayah: 152,
    surahName: 'আল-বাকারা',
    ar: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
    bn: 'অতএব তোমরা আমাকে স্মরণ করো, আমিও তোমাদের স্মরণ করব। আর আমার প্রতি কৃতজ্ঞতা প্রকাশ করো, অকৃতজ্ঞ হয়ো না।',
    en: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.'
  },
  {
    surah: 2,
    ayah: 186,
    surahName: 'আল-বাকারা',
    ar: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ',
    bn: 'আর যখন আমার বান্দাগণ আমার সম্পর্কে তোমাকে জিজ্ঞাসা করে, নিশ্চয় আমি নিকটে। আমি আহবানকারীর ডাকে সাড়া দেই যখন সে আমাকে আহবান করে।',
    en: 'And when My servants ask you, [O Muhammad], concerning Me - indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.'
  },
  {
    surah: 2,
    ayah: 286,
    surahName: 'আল-বাকারা',
    ar: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
    bn: 'আল্লাহ কাউকে তার সাধ্যাতীত কোন কাজের ভার দেন না।',
    en: 'Allah does not charge a soul except [with that within] its capacity.'
  },
  {
    surah: 3,
    ayah: 139,
    surahName: 'আলে-ইমরান',
    ar: 'وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنْتُمُ الْأَعْلَوْنَ إِنْ كُنْتُمْ مُؤْمِنِينَ',
    bn: 'তোমরা হীনবল হয়ো না এবং চিন্তিত হয়ো না, তোমরাই বিজয়ী হবে যদি তোমরা মুমিন হও।',
    en: 'So do not weaken and do not grieve, and you will be superior if you are [true] believers.'
  },
  {
    surah: 3,
    ayah: 159,
    surahName: 'আলে-ইমরান',
    ar: 'فَتَوَكَّلْ عَلَى اللَّهِ ۖ إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ',
    bn: 'অতঃপর আল্লাহর উপর ভরসা করুন। নিশ্চয় আল্লাহ ভরসাকারীদের ভালোবাসেন।',
    en: 'Then rely upon Allah; indeed, Allah loves those who rely [upon Him].'
  },
  {
    surah: 8,
    ayah: 2,
    surahName: 'আল-আনফাল',
    ar: 'إِنَّمَا الْمُؤْمِنُونَ الَّذِينَ إِذَا ذُكِرَ اللَّهُ وَجِلَتْ قُلُوبُهُمْ',
    bn: 'মুমিন তো তারাই, যাদের অন্তর আল্লাহকে স্মরণ করার সময় প্রকম্পিত হয়।',
    en: 'The believers are only those who, when Allah is mentioned, their hearts feel fear...'
  },
  {
    surah: 9,
    ayah: 129,
    surahName: 'আত-তাওবাহ্',
    ar: 'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
    bn: 'আমার জন্য আল্লাহই যথেষ্ট, তিনি ব্যতীত কোন উপাস্য নেই। আমি তাঁরই ওপর ভরসা করেছি এবং তিনি মহান আরশের অধিপতি।',
    en: 'Sufficient for me is Allah; there is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne.'
  },
  {
    surah: 13,
    ayah: 28,
    surahName: 'আর-রাদ',
    ar: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    bn: 'জেনে রেখো, আল্লাহর স্মরণেই কেবল হৃদয় শান্তি পায়।',
    en: 'Unquestionably, by the remembrance of Allah hearts are assured.'
  },
  {
    surah: 14,
    ayah: 7,
    surahName: 'ইব্রাহীম',
    ar: 'لَئِنْ شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
    bn: 'যদি তোমরা কৃতজ্ঞতা স্বীকার করো, তবে আমি অবশ্যই তোমাদের বাড়িয়ে দেব।',
    en: 'If you are grateful, I will surely increase you [in favor].'
  },
  {
    surah: 17,
    ayah: 82,
    surahName: 'বনী-ইসরাঈল',
    ar: 'وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِلْمُؤْمِنِينَ',
    bn: 'আমি কুরআনে এমন জিনিস অবতীর্ণ করি যা মুমিনদের জন্য আরোগ্য ও রহমতস্বরূপ।',
    en: 'And We send down of the Quran that which is a healing and mercy for the believers.'
  },
  {
    surah: 20,
    ayah: 114,
    surahName: 'ত্বোয়া-হা',
    ar: 'وَقُلْ رَبِّ زِدْنِي عِلْمًا',
    bn: 'এবং বলুন, হে আমাদের পালনকর্তা! আমার জ্ঞান বৃদ্ধি করে দিন।',
    en: 'And say, "My Lord, increase me in knowledge."'
  },
  {
    surah: 21,
    ayah: 87,
    surahName: 'আল-আম্বিয়া',
    ar: 'لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    bn: 'আপনি ব্যতীত কোন উপাস্য নেই; আপনি পবিত্র! নিশ্চয়ই আমি অপরাধীদের অন্তর্ভুক্ত ছিলাম।',
    en: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.'
  },
  {
    surah: 25,
    ayah: 74,
    surahName: 'আল-ফুরকান',
    ar: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',
    bn: 'হে আমাদের পালনকর্তা, আমাদের স্ত্রীদের পক্ষ থেকে এবং আমাদের সন্তানদের পক্ষ থেকে আমাদের জন্যে চোখের শীতলতা দান কর এবং আমাদেরকে পরহেযগারদের জন্যে অনুকরণযোগ্য কর।',
    en: 'Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.'
  },
  {
    surah: 26,
    ayah: 80,
    surahName: 'আশ-শুআরা',
    ar: 'وَإِذَا مَرِضْتُ فَهُوَ يَشْفِينِ',
    bn: 'এবং যখন আমি অসুস্থ হই, তখন তিনিই আমাকে আরোগ্য দান করেন।',
    en: 'And when I am ill, it is He who cures me.'
  },
  {
    surah: 39,
    ayah: 53,
    surahName: 'আয-যুমার',
    ar: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنْفُسِهِمْ لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا',
    bn: 'বলুন, হে আমার বান্দাগণ যারা নিজেদের ওপর জুলুম করেছ, তোমরা আল্লাহর রহমত থেকে নিরাশ হয়ো না। নিশ্চয়ই আল্লাহ সমস্ত গুনাহ ক্ষমা করে দেন।',
    en: 'Say, "O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins."'
  },
  {
    surah: 94,
    ayah: 5,
    surahName: 'আল-ইনশিরাহ',
    ar: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
    bn: 'নিশ্চয়ই কষ্টের সাথেই স্বস্তি রয়েছে।',
    en: 'For indeed, with hardship [will be] ease.'
  }
];

/* Maps surah number (1-indexed) → Juz it STARTS in (standard 30-Juz division) */
const SURAH_TO_JUZ = [
  /* 1-10  */ 1, 1, 3, 4, 5, 6, 7, 8, 9,10,
  /* 11-20 */11,11,13,13,14,14,15,15,16,16,
  /* 21-30 */17,17,18,18,18,19,19,20,20,21,
  /* 31-40 */21,21,21,22,22,22,23,23,23,24,
  /* 41-50 */24,25,25,25,25,26,26,26,26,26,
  /* 51-60 */27,27,27,27,27,27,27,28,28,28,
  /* 61-70 */28,28,28,28,28,28,29,29,29,29,
  /* 71-80 */29,29,29,29,29,29,29,30,30,30,
  /* 81-90 */30,30,30,30,30,30,30,30,30,30,
  /* 91-100*/30,30,30,30,30,30,30,30,30,30,
  /*101-110*/30,30,30,30,30,30,30,30,30,30,
  /*111-114*/30,30,30,30
];

const JUZ_LIST = [
  { id: 1, name: 'পারা ১', start: 'আল-ফাতিহা ১:১', end: 'আল-বাকারা ২:১৪১' },
  { id: 2, name: 'পারা ২', start: 'আল-বাকারা ২:১৪২', end: 'আল-বাকারা ২:২৫২' },
  { id: 3, name: 'পারা ৩', start: 'আল-বাকারা ২:২৫৩', end: 'আলে-ইমরান ৩:৯২' },
  { id: 4, name: 'পারা ৪', start: 'আলে-ইমরান ৩:৯৩', end: 'আন-নিসা ৪:২৩' },
  { id: 5, name: 'পারা ৫', start: 'আন-নিসা ৪:২৪', end: 'আন-নিসা ৪:১৪৭' },
  { id: 6, name: 'পারা ৬', start: 'আন-নিসা ৪:১৪৮', end: 'আল-মায়িদাহ ৫:৮১' },
  { id: 7, name: 'পারা ৭', start: 'আল-মায়িদাহ ৫:৮২', end: 'আল-আনআম ৬:১১০' },
  { id: 8, name: 'পারা ৮', start: 'আল-আনআম ৬:১১১', end: 'আল-আরাফ ৭:৮৭' },
  { id: 9, name: 'পারা ৯', start: 'আল-আরাফ ৭:৮৮', end: 'আল-আনফাল ৮:৪০' },
  { id: 10, name: 'পারা ১০', start: 'আল-আনফাল ৮:৪১', end: 'আত-তাওবাহ্ ৯:৯২' },
  { id: 11, name: 'পারা ১১', start: 'আত-তাওবাহ্ ৯:৯৩', end: 'হুদ ১১:৫' },
  { id: 12, name: 'পারা ১২', start: 'হুদ ১১:৬', end: 'ইউসুফ ১২:৫২' },
  { id: 13, name: 'পারা ১৩', start: 'ইউসুফ ১২:৫৩', end: 'ইব্রাহীম ১৪:৫২' },
  { id: 14, name: 'পারা ১৪', start: 'আল-হিজর ১৫:১', end: 'আন-নাহল ১৬:১২৮' },
  { id: 15, name: 'পারা ১৫', start: 'বনী-ইসরাঈল ১৭:১', end: 'আল-কাহফ ১৮:৭৪' },
  { id: 16, name: 'পারা ১৬', start: 'আল-কাহফ ১৮:৭৫', end: 'ত্বোয়া-হা ২০:১৩৫' },
  { id: 17, name: 'পারা ১৭', start: 'আল-আম্বিয়া ২১:১', end: 'আল-হাজ্জ্ব ২২:৭৮' },
  { id: 18, name: 'পারা ১৮', start: 'আল-মুমিনুন ২৩:১', end: 'আল-ফুরকান ২৫:২০' },
  { id: 19, name: 'পারা ১৯', start: 'আল-ফুরকান ২৫:২১', end: 'আন-নামল ২৭:৫৫' },
  { id: 20, name: 'পারা ২০', start: 'আন-নামল ২৭:৫৬', end: 'আল-আনকাবুত ২৯:৪৫' },
  { id: 21, name: 'পারা ২১', start: 'আল-আনকাবুত ২৯:৪৬', end: 'আল-আহযাব ৩৩:৩০' },
  { id: 22, name: 'পারা ২২', start: 'আল-আহযাব ৩৩:৩১', end: 'ইয়াসীন ৩৬:২৭' },
  { id: 23, name: 'পারা ২৩', start: 'ইয়াসীন ৩৬:২৮', end: 'আয-যুমার ৩৯:৩১' },
  { id: 24, name: 'পারা ২৪', start: 'আয-যুমার ৩৯:৩২', end: 'হা-মীম সাজদাহ ৪১:৪৬' },
  { id: 25, name: 'পারা ২৫', start: 'হা-মীম সাজদাহ ৪১:৪৭', end: 'আল-জাসিয়াহ ৪৫:৩৭' },
  { id: 26, name: 'পারা ২৬', start: 'আল-আহকাফ ৪৬:১', end: 'আয-যারিয়াত ৫১:৩০' },
  { id: 27, name: 'পারা ২৭', start: 'আয-যারিয়াত ৫১:৩১', end: 'আল-হাদীদ ৫৭:২৯' },
  { id: 28, name: 'পারা ২৮', start: 'আল-মুজাদালাহ ৫৮:১', end: 'আত-তাহরীম ৬৬:১২' },
  { id: 29, name: 'পারা ২৯', start: 'আল-মুলক ৬৭:১', end: 'আল-মুরসালাত ৭৭:৫০' },
  { id: 30, name: 'পারা ৩০', start: 'আন-নাবা ৭৮:১', end: 'আন-নাস ১১৪:৬' }
];

/* ====================== JUZ / PARA NAVIGATION ====================== */
function renderJuzList() {
  const container = $('#juzList');
  if (!container) return;
  container.innerHTML = JUZ_LIST.map(j => `
    <div class="surah-card" data-juz="${j.id}">
      <div class="surah-card-header">
        <span class="surah-num">${String(j.id).padStart(2,'0')}</span>
        <span class="surah-arabic">الجزء ${j.id}</span>
      </div>
      <div class="surah-bn">${j.name}</div>
      <div class="surah-en" style="font-size:11px; margin-top:4px;">শুরু: ${j.start}</div>
      <div class="surah-aya-count" style="font-size:10px; margin-top:6px;">শেষ: ${j.end}</div>
    </div>
  `).join('');

  container.querySelectorAll('.surah-card').forEach(el => {
    el.addEventListener('click', () => openJuz(Number(el.dataset.juz)));
  });
}

async function openJuz(n) {
  currentJuz = n;
  currentSurah = null;
  const main = $('main');
  const view = $('#surahView');
  view.innerHTML = '<div class="loading">আয়াত আনিতেছে...</div>';
  view.classList.add('active');
  main.style.display = 'none';
  window.scrollTo(0,0);

  let cached = await getCache(STORE_NAME_JUZ, n);
  let arData = cached ? cached.arData : null;
  let bnData = cached ? cached.bnData : null;

  if (!arData || !bnData) {
    try {
      // Try local JSON first
      const localRes = await fetch(`./data/juz/${n}.json`);
      if (localRes.ok) {
        const localData = await localRes.json();
        arData = localData.arData;
        bnData = localData.bnData;
      } else {
        // Fallback to online API
        const [arRes, bnRes] = await Promise.all([
          fetch(`https://api.alquran.cloud/v1/juz/${n}/quran-uthmani`),
          fetch(`https://api.alquran.cloud/v1/juz/${n}/bn.bengali`)
        ]);
        arData = arRes.ok ? (await arRes.json()).data : null;
        bnData = bnRes.ok ? (await bnRes.json()).data : null;
      }

      if (arData && bnData) {
        await setCache(STORE_NAME_JUZ, n, { arData, bnData });
      }
    } catch(e) {
      console.error("Fetch Juz failed", e);
    }
  }

  if (!arData) {
    view.innerHTML = '<div class="error">আয়াত লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।</div>';
    return;
  }

  currentAyahs = arData.ayahs;

  let html = `
    <div class="back-bar">
      <button class="back-btn" onclick="closeJuz()">\u2190</button>
      <span><strong>পারা ${n}</strong></span>
      <div class="back-bar-actions">
        <button class="surah-play-btn" onclick="event.stopPropagation(); playJuz(${n}, this)"><span class="play-icon"></span></button>
      </div>
    </div>
    <div class="surah-header">
      <div class="surah-bn">পারা ${n}</div>
      <div class="surah-info">${arData.ayahs.length} টি আয়াত</div>
    </div>
    <div class="ayahs-container">
  `;

  let lastSurahNum = null;

  arData.ayahs.forEach((a, i) => {
    const bnAyah = bnData && bnData.ayahs[i] ? bnData.ayahs[i].text : '';
    const sNum = a.surah.number;
    
    if (sNum !== lastSurahNum) {
      lastSurahNum = sNum;
      const sName = SURAH_NAMES[sNum - 1];
      html += `
        <div class="juz-surah-divider">
          <span class="juz-surah-divider-bn">${sName.bn}</span>
          <span class="juz-surah-divider-ar">${a.surah.name}</span>
        </div>
        ${sNum > 1 && sNum !== 9 && a.numberInSurah === 1 ? '<div class="bismillah">\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u064e\u0647\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0650\u064a\u0645\u0650</div>' : ''}
      `;
    }

    html += `
      <div class="aya-wrapper" data-surah="${sNum}" data-ayah="${a.numberInSurah}">
        <div class="aya-row">
          <div class="aya-ar-side">
            <span class="ayah-text">${a.text}</span>
            <span class="ayah-num-circle">${a.numberInSurah}</span>
          </div>
        </div>
        ${bnAyah ? `<div class="aya-bn-line">${bnAyah}</div>` : ''}
      </div>
    `;
  });

  html += '</div>';
  view.innerHTML = html;

  view.querySelectorAll('.aya-wrapper').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target.closest('.surah-play-btn')) return;
      view.querySelectorAll('.aya-wrapper.selected').forEach(a => a.classList.remove('selected'));
      el.classList.add('selected');

      if (currentPlayingJuz === n) {
        const playBtn = document.querySelector('#surahView .surah-play-btn');
        const surahId = parseInt(el.dataset.surah);
        const ayahId = parseInt(el.dataset.ayah);
        const idx = currentAyahs.findIndex(a => a.surah.number === surahId && a.numberInSurah === ayahId);
        if (idx !== -1) {
          startAyahIndex = idx;
          currentAyahIndex = startAyahIndex;
          ayahsPlayedInRange = 0;
          ayahRepeatCount = 0;
          el.classList.remove('selected');
          playNextAyah(playBtn);
        }
      }
    });
  });
}



function closeJuz() {
  stopAudio();
  currentJuz = null;
  currentAyahs = null;
  const view = $('#surahView');
  view.classList.remove('active');
  $('main').style.display = 'block';
}

function playJuz(juzNum, btn) {
  closeSettings();
  if (currentPlayingJuz === juzNum && currentAudio) {
    if (!currentAudio.paused) {
      currentAudio.pause();
      if (btn) btn.classList.remove('playing');
      if ('mediaSession' in navigator) {
        navigator.mediaSession.playbackState = 'paused';
      }
    } else {
      currentAudio.playbackRate = parseFloat(playbackSettings.speed);
      currentAudio.play().then(() => {
        if (btn) btn.classList.add('playing');
        if ('mediaSession' in navigator) {
          navigator.mediaSession.playbackState = 'playing';
        }
      }).catch(() => {});
    }
    return;
  }

  stopAudio();

  currentPlayingJuz = juzNum;
  currentPlayingSurah = null;

  const selectedEl = document.querySelector('#surahView .aya-wrapper.selected');
  if (selectedEl) {
    const surahId = parseInt(selectedEl.dataset.surah);
    const ayahId = parseInt(selectedEl.dataset.ayah);
    const idx = currentAyahs.findIndex(a => a.surah.number === surahId && a.numberInSurah === ayahId);
    if (idx !== -1) {
      startAyahIndex = idx;
    } else {
      startAyahIndex = 0;
    }
    selectedEl.classList.remove('selected');
  } else {
    startAyahIndex = 0;
  }

  currentAyahIndex = startAyahIndex;
  ayahsPlayedInRange = 0;
  rangeRepeatCount = 0;
  ayahRepeatCount = 0;

  playNextAyah(btn);
}

/* ====================== HOME TABS SWITCHER ====================== */
function switchHomeTab(tabName) {
  const tabSurah = $('#tabSurah');
  const tabJuz = $('#tabJuz');
  const surahList = $('#surahList');
  const juzList = $('#juzList');
  const surahSearchContainer = $('#surahSearchContainer');
  const ayahJumpContainer = $('#ayahJumpContainer');

  if (tabName === 'surah') {
    tabSurah.classList.add('active');
    tabJuz.classList.remove('active');
    surahList.classList.remove('hidden');
    juzList.classList.add('hidden');
    surahSearchContainer.classList.remove('hidden');
  } else {
    tabSurah.classList.remove('active');
    tabJuz.classList.add('active');
    surahList.classList.add('hidden');
    juzList.classList.remove('hidden');
    surahSearchContainer.classList.add('hidden');
  }
}

/* ====================== GO TO AYAH ====================== */
function parseBengaliNumerals(str) {
  const bnDigits = {'০':'0','১':'1','২':'2','৩':'3','৪':'4','৫':'5','৬':'6','৭':'7','৮':'8','৯':'9'};
  return str.replace(/[০-৯]/g, d => bnDigits[d]);
}

function jumpToAyah() {
  const input = $('#ayahJumpInput').value.trim();
  if (!input) return;
  
  const normalized = parseBengaliNumerals(input);
  const parts = normalized.split(/[:\/\s\.\-]/).filter(Boolean);
  if (parts.length < 2) {
    alert("সঠিক রেফারেন্স দিন। (যেমন- 2:255)");
    return;
  }

  const surahNum = parseInt(parts[0], 10);
  const ayahNum = parseInt(parts[1], 10);

  if (isNaN(surahNum) || surahNum < 1 || surahNum > 114) {
    alert("ভুল সূরা নম্বর! ১ থেকে ১১৪ এর মধ্যে দিন।");
    return;
  }

  const surahMeta = SURAH_NAMES[surahNum - 1];
  if (isNaN(ayahNum) || ayahNum < 1 || ayahNum > surahMeta.ayas) {
    alert(`ভুল আয়াত নম্বর! ${surahMeta.bn} সূরায় মোট ${surahMeta.ayas} টি আয়াত আছে।`);
    return;
  }

  openSurah(surahNum, ayahNum);
}

/* ====================== VERSE OF THE DAY ====================== */
function renderDailyVerse() {
  const container = $('#dailyVerseContainer');
  if (!container) return;

  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = dayOfYear % CURATED_VERSES.length;
  const v = CURATED_VERSES[index];

  container.innerHTML = `
    <div class="daily-verse-card">
      <div class="daily-verse-title">আজকের আয়াত (Daily Verse)</div>
      <div class="daily-verse-ar">${v.ar}</div>
      <div class="daily-verse-bn">${v.bn}</div>
      <div class="daily-verse-meta">
        <span class="daily-verse-source" onclick="openSurah(${v.surah}, ${v.ayah})">
          📖 ${v.surahName} (${v.surah}:${v.ayah})
        </span>
        <button class="daily-verse-btn" onclick="openSurah(${v.surah}, ${v.ayah})">সূরা পড়ুন</button>
      </div>
    </div>
  `;
}

/* ====================== INIT ====================== */
async function init() {
  // Load page/ruku relations
  await Promise.all([loadPageRelation(), loadRukuRelation()]);

  // Font size controls
  applyFontSize(arabicFontSize);
  $('#fontDecModal').addEventListener('click', () => applyFontSize(Math.max(14, arabicFontSize - 2)));
  $('#fontIncModal').addEventListener('click', () => applyFontSize(Math.min(72, arabicFontSize + 2)));

  renderSurahList();
  renderJuzList();
  renderDailyVerse();
}

// Expose for onclick
window.playSurah = playSurah;
window.closeSurah = closeSurah;
window.openSurah = openSurah;
window.toggleSettings = toggleSettings;
window.closeSettings = closeSettings;
window.stepRange = stepRange;
window.stepRepeat = stepRepeat;
window.stepAyahRepeat = stepAyahRepeat;
window.stepSpeed = stepSpeed;
window.resetDefaults = resetDefaults;
window.filterSurahs = filterSurahs;
window.switchHomeTab = switchHomeTab;
window.jumpToAyah = jumpToAyah;
window.openJuz = openJuz;
window.closeJuz = closeJuz;
window.playJuz = playJuz;

/* ====================== AUDIO DOWNLOAD SYSTEM ====================== */
const AUDIO_CACHE_NAME = 'quran-audio-cache';

function toBengaliNum(num) {
  const d = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
  return String(num).split('').map(ch => d[+ch] !== undefined ? d[+ch] : ch).join('');
}

async function checkSurahAudioCached(surahNum) {
  try {
    const localRes = await fetch(`./data/surahs/${surahNum}.json`);
    if (!localRes.ok) return false;
    const localData = await localRes.json();
    const ayahs = localData.arData.ayahs;
    const cache = await caches.open(AUDIO_CACHE_NAME);
    const sStr = String(surahNum).padStart(3, '0');
    for (const a of ayahs) {
      const aStr = String(a.numberInSurah).padStart(3, '0');
      const url = `https://www.everyayah.com/data/Alafasy_128kbps/${sStr}${aStr}.mp3`;
      const match = await cache.match(url);
      if (!match) return false;
    }
    return true;
  } catch(e) { return false; }
}

async function deleteSurahAudioCache(surahNum) {
  try {
    const localRes = await fetch(`./data/surahs/${surahNum}.json`);
    if (!localRes.ok) return;
    const localData = await localRes.json();
    const ayahs = localData.arData.ayahs;
    const cache = await caches.open(AUDIO_CACHE_NAME);
    const sStr = String(surahNum).padStart(3, '0');
    for (const a of ayahs) {
      const aStr = String(a.numberInSurah).padStart(3, '0');
      const url = `https://www.everyayah.com/data/Alafasy_128kbps/${sStr}${aStr}.mp3`;
      await cache.delete(url);
    }
  } catch(e) { console.error('Delete audio cache failed', e); }
}

async function updateDownloadButtonState(surahNum, btn) {
  if (!btn) return;
  const cached = await checkSurahAudioCached(surahNum);
  if (cached) {
    btn.innerHTML = '<span class="dl-success-icon">✓</span>';
    btn.classList.add('downloaded');
    btn.classList.remove('downloading');
    btn.title = 'অডিও ডাউনলোড হয়েছে — ডিলিট করতে ক্লিক করুন';
    btn.disabled = false;
  } else {
    btn.innerHTML = '<span class="dl-arrow-icon">⬇</span>';
    btn.classList.remove('downloaded', 'downloading');
    btn.title = 'অডিও অফলাইনে সেভ করুন';
    btn.disabled = false;
  }
}

async function startDownloadSurahAudio(surahNum, btn) {
  btn.disabled = true;
  btn.classList.add('downloading');
  btn.classList.remove('downloaded');
  btn.innerHTML = '<span class="dl-progress">০%</span>';

  try {
    const localRes = await fetch(`./data/surahs/${surahNum}.json`);
    if (!localRes.ok) throw new Error('No local Surah data');
    const localData = await localRes.json();
    const ayahs = localData.arData.ayahs;
    const cache = await caches.open(AUDIO_CACHE_NAME);

    let done = 0;
    const total = ayahs.length;
    const chunkSize = 5;
    const sStr = String(surahNum).padStart(3, '0');

    for (let i = 0; i < total; i += chunkSize) {
      const chunk = ayahs.slice(i, i + chunkSize);
      await Promise.all(chunk.map(async (a) => {
        const aStr = String(a.numberInSurah).padStart(3, '0');
        const url = `https://www.everyayah.com/data/Alafasy_128kbps/${sStr}${aStr}.mp3`;
        if (!(await cache.match(url))) {
          const resp = await fetch(url, { mode: 'cors', credentials: 'omit' });
          if (resp.ok) await cache.put(url, resp);
        }
        done++;
        const pct = Math.round((done / total) * 100);
        const dlSpan = btn.querySelector('.dl-progress');
        if (dlSpan) dlSpan.textContent = toBengaliNum(pct) + '%';
      }));
    }

    await updateDownloadButtonState(surahNum, btn);
  } catch(e) {
    console.error('Audio download failed', e);
    alert('অডিও ডাউনলোড ব্যর্থ হয়েছে। ইন্টারনেট সংযোগ পরীক্ষা করুন।');
    await updateDownloadButtonState(surahNum, btn);
  }
}

async function toggleDownloadSurah(surahNum, btn) {
  const isCached = await checkSurahAudioCached(surahNum);
  if (isCached) {
    if (confirm('এই সূরার ডাউনলোড করা অডিও মুছে ফেলতে চান?')) {
      await deleteSurahAudioCache(surahNum);
      await updateDownloadButtonState(surahNum, btn);
    }
  } else {
    await startDownloadSurahAudio(surahNum, btn);
  }
}

window.toggleDownloadSurah = toggleDownloadSurah;

document.addEventListener('DOMContentLoaded', init);
})();
