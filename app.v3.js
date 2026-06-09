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

/* ====================== STATE ====================== */
let pageRelation = null;
let rukuRelation = null;
let currentSurah = null;
let currentAyahs = null;
let activeAudio = null;
let reciter = localStorage.getItem('reciter') || 'Mishari-Rashid';

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
let arabicFontSize = parseInt(localStorage.getItem('arabicFontSize')) || 36;

function applyFontSize(size) {
  arabicFontSize = size;
  localStorage.setItem('arabicFontSize', size);
  document.documentElement.style.setProperty('--arabic-font-size', size + 'px');
  document.documentElement.style.setProperty('--arabic-line-height', Math.round(size * 1.6 / 36 * 10) / 10 + 'em');
  const label = $('#fontSizeLabel');
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
  const data = await loadJSON('https://read.quranmajeed.com/JSONFiles/pageRelation.json', null);
  if (data) pageRelation = data;
}
async function loadRukuRelation() {
  const data = await loadJSON('https://read.quranmajeed.com/JSONFiles/rukuSurahRelation.json', null);
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
function playAyahAudio(surah, ayah) {
  const ruku = getRukuForAyah(surah, ayah);
  const surahPadded = String(surah).padStart(3,'0');
  const url = `https://q1.pakdata.com/Audio/Script/${reciter}/${surahPadded}-${ruku}.mp3`;

  if (activeAudio) {
    activeAudio.pause();
    activeAudio = null;
  }

  const audio = new Audio(url);
  audio.preload = 'auto';
  activeAudio = audio;

  const controls = $('#audioControls');
  controls.classList.add('active');
  const playBtn = controls.querySelector('.play-btn');
  const progressBar = controls.querySelector('.progress-bar');
  const timeLabel = controls.querySelector('.time');

  playBtn.textContent = '\u23F8';
  playBtn.dataset.playing = 'true';

  audio.onloadedmetadata = () => {
    controls.querySelector('.duration').textContent = formatTime(audio.duration);
  };

  audio.ontimeupdate = () => {
    if (audio.duration) {
      progressBar.style.width = (audio.currentTime / audio.duration * 100)+'%';
      timeLabel.textContent = formatTime(audio.currentTime);
    }
  };

  audio.onended = () => {
    playBtn.textContent = '\u25B6';
    playBtn.dataset.playing = 'false';
    progressBar.style.width = '0%';
    timeLabel.textContent = '0:00';
  };

  audio.play().catch(e => {
    console.warn('Audio play failed:', e);
    playBtn.textContent = '\u25B6';
    playBtn.dataset.playing = 'false';
  });

  playBtn.onclick = () => {
    if (audio.paused) {
      audio.play();
      playBtn.textContent = '\u23F8';
      playBtn.dataset.playing = 'true';
    } else {
      audio.pause();
      playBtn.textContent = '\u25B6';
      playBtn.dataset.playing = 'false';
    }
  };
}

function stopAudio() {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio = null;
  }
  const controls = $('#audioControls');
  controls.classList.remove('active');
}

function formatTime(s) {
  if (!s || !isFinite(s)) return '0:00';
  const m = Math.floor(s/60);
  const sec = Math.floor(s%60);
  return m+':'+String(sec).padStart(2,'0');
}

/* ====================== SURAH LIST ====================== */
function renderSurahList() {
  const container = $('#surahList');
  container.innerHTML = SURAH_NAMES.map((s,i) => `
    <div class="surah-card" data-surah="${i+1}">
      <div class="surah-num">${String(i+1).padStart(3,'0')}</div>
      <div class="surah-arabic">${s.ar}</div>
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
async function openSurah(n) {
  currentSurah = n;
  const main = $('main');
  const view = $('#surahView');
  view.innerHTML = '<div class="loading">আয়াত আনিতেছে...</div>';
  view.classList.add('active');
  main.style.display = 'none';
  window.scrollTo(0,0);

  const s = SURAH_NAMES[n-1];
  const [arRes, bnRes] = await Promise.all([
    fetch(`https://api.alquran.cloud/v1/surah/${n}/quran-uthmani`),
    fetch(`https://api.alquran.cloud/v1/surah/${n}/bn.bengali`)
  ]);

  const arData = arRes.ok ? (await arRes.json()).data : null;
  const bnData = bnRes.ok ? (await bnRes.json()).data : null;

  if (!arData) {
    view.innerHTML = '<div class="error">আয়াত লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।</div>';
    return;
  }

  currentAyahs = arData.ayahs;

  let html = `
    <div class="back-bar">
      <button class="back-btn" onclick="closeSurah()">\u2190</button>
      <span><strong>${s.bn}</strong></span>
    </div>
    <div class="surah-header">
      <div class="surah-arabic">${s.ar}</div>
      <div class="surah-bn">${s.bn}</div>
      <div class="surah-info">${s.type} \u2022 ${s.ayas} আয়াত</div>
    </div>
    ${n > 1 && n !== 9 ? '<div class="bismillah">\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u064e\u0647\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0650\u064a\u0645\u0650</div>' : ''}
    <div class="ayahs-container">
  `;

  arData.ayahs.forEach((a, i) => {
    const bnAyah = bnData && bnData.ayahs[i] ? bnData.ayahs[i].text : '';
    html += `
      <div class="aya-wrapper" data-surah="${n}" data-ayah="${a.numberInSurah}" onclick="playAyahAudio(${n}, ${a.numberInSurah})">
        <div class="aya-row">
          <div class="aya-ar-side">
            <span class="ayah-text">${a.text}</span>
            <span class="ayah-num-circle">${a.numberInSurah}</span>
          </div>
          <button class="aya-play-btn" title="Play this ayah">▶</button>
        </div>
        ${bnAyah ? `<div class="aya-bn-line">${bnAyah}</div>` : ''}
      </div>
    `;
  });

  html += '</div>';
  view.innerHTML = html;

}

function closeSurah() {
  stopAudio();
  currentSurah = null;
  currentAyahs = null;
  const view = $('#surahView');
  view.classList.remove('active');
  $('main').style.display = 'block';
}

/* ====================== INIT ====================== */
async function init() {
  // Load page/ruku relations
  await Promise.all([loadPageRelation(), loadRukuRelation()]);

  // Font size controls
  applyFontSize(arabicFontSize);
  $('#fontDec').addEventListener('click', () => applyFontSize(Math.max(14, arabicFontSize - 2)));
  $('#fontInc').addEventListener('click', () => applyFontSize(Math.min(72, arabicFontSize + 2)));

  renderSurahList();
}

// Expose for onclick
window.playAyahAudio = playAyahAudio;
window.closeSurah = closeSurah;
window.stopAudio = stopAudio;

document.addEventListener('DOMContentLoaded', init);
})();
