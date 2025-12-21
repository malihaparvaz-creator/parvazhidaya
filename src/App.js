import React, { useState, useEffect } from 'react';
import './App.css';
import { useHistory } from './hooks/useHistory';
import { useFavorites } from './hooks/useFavorites';
import { HistoryView } from './components/HistoryView';
import { FavoritesView } from './components/FavoritesView';
import { StoryDetailView } from './components/StoryDetailView';

const TRANSLATIONS = {
  en: { appTitle: 'PARVAZ HIDAYA', navHome: 'Home', navHistory: 'History', navFavorites: 'Favorites', subtitle: 'GENTLE ISLAMIC STORIES FOR WANDERING SOULS', placeholder: 'Enter an emotion or moment...', button: 'RECEIVE GUIDANCE', emptyState: 'Share what weighs on your heart, and receive a story of gentle wisdom and hope.', loading: 'Crafting your story...', footer: 'Let your soul take flight', historyTitle: 'YOUR JOURNEY', historySubtitle: 'STORIES AND WISDOM FROM YOUR HEART', favoritesTitle: 'YOUR JOURNEY', favoritesSubtitle: 'STORIES AND WISDOM FROM YOUR HEART', suggestions: ['lonely', 'hope', 'fear', 'patience', 'gratitude', 'lost', 'new beginning', 'strength'], shareText: 'Gentle Islamic stories for wandering souls' },
  ar: { appTitle: 'بَرْوَاز هِدَايَة', navHome: 'الرئيسية', navHistory: 'السجل', navFavorites: 'المفضلة', subtitle: 'قصص إسلامية لطيفة للنفوس التائهة', placeholder: 'أدخل مشاعرك أو لحظتك...', button: 'استقبل الهداية', emptyState: 'شارك ما يثقل قلبك، واستقبل قصة من الحكمة اللطيفة والأمل.', loading: 'نصنع قصتك...', footer: 'دع روحك تحلق', historyTitle: 'رحلتك', historySubtitle: 'القصص والحكمة من قلبك', favoritesTitle: 'رحلتك', favoritesSubtitle: 'القصص والحكمة من قلبك', suggestions: ['وحيد', 'أمل', 'خوف', 'صبر', 'شكر', 'ضائع', 'بداية جديدة', 'قوة'], shareText: 'قصص إسلامية لطيفة للنفوس التائهة' },
  ur: { appTitle: 'پرواز ہدایت', navHome: 'ہوم', navHistory: 'ریکارڈ', navFavorites: 'پسندیدہ', subtitle: 'بھٹکتی روحوں کے لیے نرم اسلامی کہانیاں', placeholder: 'اپنا احساس یا لمحہ درج کریں...', button: 'ہدایت حاصل کریں', emptyState: 'اپنے دل کا بوجھ بانٹیں، اور نرم حکمت اور امید کی کہانی حاصل کریں۔', loading: 'آپ کی کہانی بنائی جا رہی ہے...', footer: 'اپنی روح کو پرواز دیں', historyTitle: 'آپ کا سفر', historySubtitle: 'آپ کے دل سے کہانیاں اور حکمت', favoritesTitle: 'آپ کا سفر', favoritesSubtitle: 'آپ کے دل سے کہانیاں اور حکمت', suggestions: ['تنہا', 'امید', 'خوف', 'صبر', 'شکر', 'کھویا', 'نیا آغاز', 'طاقت'], shareText: 'بھٹکتی روحوں کے لیے نرم اسلامی کہانیاں' },
  hi: { appTitle: 'पारवाज़ हिदाया', navHome: 'होम', navHistory: 'इतिहास', navFavorites: 'पसंदीदा', subtitle: 'भटकी हुई रूहों के लिए कोमल इस्लामी कहानियाँ', placeholder: 'अपनी भावना या पल दर्ज करें...', button: 'मार्गदर्शन प्राप्त करें', emptyState: 'अपने दिल का बोझ साझा करें और कोमल हिकमत की कहानी प्राप्त करें।', loading: 'आपकी कहानी तैयार हो रही है...', footer: 'अपनी रूह को उड़ान दें', historyTitle: 'आपकी यात्रा', historySubtitle: 'आपके दिल से कहानियाँ और ज्ञान', favoritesTitle: 'आपकी यात्रा', favoritesSubtitle: 'आपके दिल से कहानियाँ और ज्ञान', suggestions: ['अकेलापन', 'उम्मीद', 'डर', 'सब्र', 'शुक्र', 'खोया', 'नई शुरुआत', 'ताकत'], shareText: 'भटकी हुई रूहों के लिए कोमल इस्लामी कहानियाँ' },
  tr: { appTitle: 'PARVAZ HIDAYA', navHome: 'Ana', navHistory: 'Geçmiş', navFavorites: 'Favoriler', subtitle: 'Kaybolmuş ruhlar için nazik İslami hikayeler', placeholder: 'Bir duygu veya an girin...', button: 'Hidayet Al', emptyState: 'Kalbindeki yükü paylaş, nazik hikmet ve umut dolu bir hikaye al.', loading: 'Hikayen hazırlanıyor...', footer: 'Ruhunu uçur', historyTitle: 'SENİN YOLCULUĞUN', historySubtitle: 'KALBİNDEN ÇIKAN HİKAYELER VE BİLGE', favoritesTitle: 'SENİN YOLCULUĞUN', favoritesSubtitle: 'KALBİNDEN ÇIKAN HİKAYELER VE BİLGE', suggestions: ['yalnız', 'umut', 'korku', 'sabır', 'şükür', 'kayıp', 'yeni başlangıç', 'güç'], shareText: 'Kaybolmuş ruhlar için nazik İslami hikayeler' },
  id: { appTitle: 'PARVAZ HIDAYA', navHome: 'Beranda', navHistory: 'Riwayat', navFavorites: 'Favorit', subtitle: 'Kisah Islami lembut untuk jiwa yang tersesat', placeholder: 'Masukkan perasaan atau momen...', button: 'Dapatkan Bimbingan', emptyState: 'Bagikan beban hatimu dan terima kisah penuh hikmah lembut.', loading: 'Menyusun kisahmu...', footer: 'Biarkan jiwamu terbang', historyTitle: 'PERJALANANMU', historySubtitle: 'CERITA DAN KEBIJAKSANAAN DARI HATIMU', favoritesTitle: 'PERJALANANMU', favoritesSubtitle: 'CERITA DAN KEBIJAKSANAAN DARI HATIMU', suggestions: ['kesepian', 'harapan', 'takut', 'sabar', 'syukur', 'hilang', 'awal baru', 'kekuatan'], shareText: 'Kisah Islami lembut untuk jiwa yang tersesat' },
  fr: { appTitle: 'PARVAZ HIDAYA', navHome: 'Accueil', navHistory: 'Historique', navFavorites: 'Favoris', subtitle: 'Histoires islamiques douces pour les âmes perdues', placeholder: 'Entrez une émotion ou un moment...', button: 'Recevoir la guidance', emptyState: 'Partage ce qui pèse sur ton cœur et reçois une histoire de sagesse douce.', loading: 'Création de ton histoire...', footer: "Laisse ton âme s'élever", historyTitle: 'TON VOYAGE', historySubtitle: 'HISTOIRES ET SAGESSE DE TON CŒUR', favoritesTitle: 'TON VOYAGE', favoritesSubtitle: 'HISTOIRES ET SAGESSE DE TON CŒUR', suggestions: ['solitude', 'espoir', 'peur', 'patience', 'gratitude', 'perdu', 'nouveau départ', 'force'], shareText: 'Histoires islamiques douces pour les âmes perdues' },
  es: { appTitle: 'PARVAZ HIDAYA', navHome: 'Inicio', navHistory: 'Historial', navFavorites: 'Favoritos', subtitle: 'Historias islámicas suaves para almas perdidas', placeholder: 'Ingresa una emoción o momento...', button: 'Recibir guía', emptyState: 'Comparte lo que pesa en tu corazón y recibe una historia de sabiduría suave.', loading: 'Creando tu historia...', footer: 'Deja que tu alma vuele', historyTitle: 'TU VIAJE', historySubtitle: 'HISTORIAS Y SABIDURÍA DE TU CORAZÓN', favoritesTitle: 'TU VIAJE', favoritesSubtitle: 'HISTORIAS Y SABIDURÍA DE TU CORAZÓN', suggestions: ['soledad', 'esperanza', 'miedo', 'paciencia', 'gratitud', 'perdido', 'nuevo comienzo', 'fuerza'], shareText: 'Historias islámicas suaves para almas perdidas' },
  zh: { appTitle: '巴尔瓦兹·希达亚', navHome: '首页', navHistory: '历史', navFavorites: '收藏', subtitle: '为迷失的心灵准备的温柔伊斯兰故事', placeholder: '输入一种情感或时刻...', button: '接收指引', emptyState: '分享你心中的重担，获得一段温柔而有智慧的故事。', loading: '正在构思你的故事...', footer: '让你的心灵飞翔', historyTitle: '你的旅程', historySubtitle: '来自你心的故事和智慧', favoritesTitle: '你的旅程', favoritesSubtitle: '来自你心的故事和智慧', suggestions: ['孤独', '希望', '恐惧', '耐心', '感恩', '迷失', '新开始', '力量'], shareText: '为迷失的心灵准备的温柔伊斯兰故事' }
};

const LANGUAGE_NAMES = { en: 'English', ar: 'العربية', ur: 'اردو', hi: 'हिंदी', tr: 'Türkçe', id: 'Bahasa Indonesia', fr: 'Français', es: 'Español', zh: '中文 (简体)' };
const RTL_LANGS = ['ar', 'ur'];

function uid() { return Math.random().toString(36).slice(2, 9); }

const USER_ID_KEY = 'parvaz_hidaya_user_id';
function getUserId() {
  let id = localStorage.getItem(USER_ID_KEY);
  if (!id) { id = 'user_' + Math.random().toString(36).slice(2, 10); localStorage.setItem(USER_ID_KEY, id); }
  return id;
}
const USER_ID = getUserId();

const FALLBACK_STORIES = {
  en: { story: 'I see what you carry today — the weight is real.\nBut know that every breath you take is a prayer.\nYour heart seeking guidance shows strength already.\nIn this moment, you are exactly where you need to be.\nTrust the path unfolding before you.\nSmall steps forward are miracles in themselves.\nYou are more resilient than you know.', wisdom: 'Dua changes the heart. Patience reveals the way.' },
  ar: { story: 'أرى ما تحمله اليوم — الثقل حقيقي.\nلكن اعلم أن كل نفس تأخذه هو دعاء.\nقلبك الذي يبحث عن الهداية يظهر قوة بالفعل.\nفي هذه اللحظة، أنت بالضبط حيث تحتاج إلى أن تكون.\nثق بالطريق الذي ينفتح أمامك.\nالخطوات الصغيرة للأمام هي معجزات في حد ذاتها.\nأنت أقوى مما تعتقد.', wisdom: 'الدعاء يغير القلب. الصبر يكشف الطريق.' },
  ur: { story: 'میں دیکھ رہا ہوں کہ آج آپ کیا لے جا رہے ہیں — وہ وزن حقیقی ہے۔\nلیکن جانیں کہ ہر سانس جو آپ لیتے ہیں وہ ایک دعا ہے۔\nآپ کا دل جو ہدایت تلاش کر رہا ہے وہ طاقت کو ظاہر کرتا ہے۔\nاس لمحے میں، آپ بالکل وہاں ہیں جہاں ہونے کی ضرورت ہے۔\nاپنے سامنے کھلنے والے راستے پر اعتماد کریں۔\nآگے کی طرف چھوٹے قدم معجزے ہیں۔\nآپ اس سے زیادہ مضبوط ہیں جتنا آپ سوچتے ہیں۔', wisdom: 'دعا دل کو بدلتی ہے۔ صبر راستہ ظاہر کرتی ہے۔' },
  hi: { story: 'मैं देख रहा हूँ कि आप आज क्या सहन कर रहे हैं — वह वजन वास्तविक है।\nलेकिन जानिए कि आप जो हर सांस लेते हैं वह एक प्रार्थना है।\nआपका दिल जो मार्गदर्शन खोज रहा है वह पहले से ही शक्ति दिखाता है।\nइस पल में, आप बिलकुल वहीं हैं जहाँ होने की जरूरत है।\nअपने सामने खुलने वाले रास्ते पर विश्वास करें।\nआगे की ओर छोटे कदम चमत्कार हैं।\nआप सोचते हैं उससे कहीं अधिक मजबूत हैं।', wisdom: 'दुआ दिल को बदलती है। धैर्य रास्ता दिखाता है।' },
  tr: { story: 'Bugün ne taşıdığını görüyorum — o ağır bir yüktür.\nAma her nefes aldığında bir dua olduğunu bil.\nHidayet arayan kalbiniz zaten gücü gösteriyor.\nBu anda tam olarak nereye ihtiyaç duyuyorsan oradasın.\nSenin önünde açılan yola güven.\nİleri doğru küçük adımlar mucizedir.\nSanıdığından çok daha güçlüsün.', wisdom: 'Dua kalbi değiştirir. Sabır yolu gösterir.' },
  id: { story: 'Saya melihat apa yang Anda bawa hari ini — beban itu nyata.\nTapi ketahui bahwa setiap napas yang Anda ambil adalah doa.\nHati Anda yang mencari bimbingan sudah menunjukkan kekuatan.\nPada saat ini, Anda berada tepat di mana yang Anda butuhkan.\nPercayai jalan yang terbuka di hadapan Anda.\nLangkah kecil maju adalah keajaiban itu sendiri.\nAnda jauh lebih tangguh dari yang Anda pikirkan.', wisdom: 'Doa mengubah hati. Sabar mengungkap jalan.' },
  fr: { story: 'Je vois ce que tu portes aujourd\'hui — le fardeau est réel.\nMais sache que chaque respiration que tu prends est une prière.\nTon cœur qui cherche la guidance montre déjà ta force.\nEn ce moment, tu es exactement où tu dois être.\nFais confiance à la voie qui s\'ouvre devant toi.\nLes petits pas en avant sont des miracles eux-mêmes.\nTu es bien plus résilient que tu ne le penses.', wisdom: 'La dua change le cœur. La patience révèle le chemin.' },
  es: { story: 'Veo lo que cargas hoy — el peso es real.\nPero sabe que cada aliento que tomas es una oración.\nTu corazón que busca guía ya muestra fortaleza.\nEn este momento, estás exactamente donde necesitas estar.\nConfía en el camino que se abre ante ti.\nLos pequeños pasos adelante son milagros en sí mismos.\nEres mucho más resiliente de lo que crees.', wisdom: 'El dua cambia el corazón. La paciencia revela el camino.' },
  zh: { story: '我看到你今天承载的东西——那个重担是真实的。\n但要知道，你每一次呼吸都是一次祈祷。\n你寻求指引的心已经展现了力量。\n此刻，你正好在你需要的地方。\n相信你面前展开的道路。\n向前迈的小步子本身就是奇迹。\n你比自己想象的要有韧性得多。', wisdom: '杜阿改变心灵。耐心揭示道路。' }
};

const WISDOM_COLLECTION = {
  en: ['Trust the process. Your journey is unfolding perfectly.', 'Every challenge is a blessing in disguise.', 'Patience is the key to peace.', 'Your heart knows the way.', 'In stillness, you find your strength.', 'What you seek is seeking you.', 'Each moment is a new beginning.'],
  ar: ['ثق بالعملية. رحلتك تتطور بشكل مثالي.', 'كل تحدٍ هو نعمة مقنعة.', 'الصبر هو مفتاح السلام.', 'قلبك يعرف الطريق.', 'في الصمت، تجد قوتك.', 'ما تبحث عنه يبحث عنك.', 'كل لحظة هي بداية جديدة.'],
  ur: ['عمل پر یقین رکھیں۔ آپ کی سفر بہترین طریقے سے آگے بڑھ رہی ہے۔', 'ہر چیلنج ایک برکت میں چھپا ہوا ہے۔', 'صبر امن کی کلید ہے۔', 'آپ کا دل راستہ جانتا ہے۔', 'خاموشی میں، آپ اپنی طاقت تلاش کریں۔', 'جو آپ تلاش کر رہے ہیں وہ آپ کو تلاش کر رہے ہیں۔', 'ہر لحظہ ایک نیا آغاز ہے۔'],
  hi: ['प्रक्रिया पर विश्वास करें। आपकी यात्रा पूरी तरह से आगे बढ़ रही है।', 'हर चुनौती एक आशीर्वाद में छिपी है।', 'धैर्य शांति की कुंजी है।', 'आपका दिल रास्ता जानता है।', 'मौन में, आप अपनी शक्ति पाते हैं।', 'जो आप खोज रहे हैं वह आपको खोज रहा है।', 'हर पल एक नई शुरुआत है।'],
  tr: ['Sürece güven. Yolculuğun mükemmel şekilde ilerliyor.', 'Her zorluk gizli bir bereket.', 'Sabır barışın anahtarıdır.', 'Kalbiniz yolu bilir.', 'Sessizlikte güçünüzü bulursunuz.', 'Aradığınız şey sizi arıyor.', 'Her an yeni bir başlangıç.'],
  id: ['Percayai prosesnya. Perjalananmu berkembang dengan sempurna.', 'Setiap tantangan adalah berkah terselubung.', 'Kesabaran adalah kunci kedamaian.', 'Hatimu tahu jalannya.', 'Dalam keheningan, kamu menemukan kekuatanmu.', 'Apa yang kamu cari sedang mencarimu.', 'Setiap saat adalah awal yang baru.'],
  fr: ['Faites confiance au processus. Votre voyage se déploie parfaitement.', 'Chaque défi est une bénédiction déguisée.', 'La patience est la clé de la paix.', 'Votre cœur connaît le chemin.', 'Dans le silence, vous trouvez votre force.', 'Ce que vous cherchez vous cherche.', 'Chaque moment est un nouveau début.'],
  es: ['Confía en el proceso. Tu viaje se está desarrollando perfectamente.', 'Todo desafío es una bendición disfrazada.', 'La paciencia es la clave de la paz.', 'Tu corazón conoce el camino.', 'En el silencio, encuentras tu fuerza.', 'Lo que buscas te está buscando.', 'Cada momento es un nuevo comienzo.'],
  zh: ['相信这个过程。你的旅程正在完美展开。', '每一个挑战都是伪装的祝福。', '耐心是和平的钥匙。', '你的心知道方向。', '在沉默中，你找到你的力量。', '你寻找的东西也在寻找你。', '每一刻都是新的开始。']
};

function generateRandomWisdom(languageCode) {
  const wisdomList = WISDOM_COLLECTION[languageCode] || WISDOM_COLLECTION.en;
  return wisdomList[Math.floor(Math.random() * wisdomList.length)];
}

async function generateFromAPI({ promptText, languageCode }) {
  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ promptText, languageCode })
    });

    if (!res.ok) {
      console.error('Backend API Error:', res.status, res.statusText);
      throw new Error('Backend API error');
    }

    const payload = await res.json();
    // Expecting { story: string, wisdom: string }
    if (payload && (payload.story || payload.wisdom)) {
      return { story: payload.story || (FALLBACK_STORIES[languageCode] || FALLBACK_STORIES.en).story, wisdom: payload.wisdom || generateRandomWisdom(languageCode) };
    }

    throw new Error('bad backend response');
  } catch (err) {
    console.error('Generate call failed:', err);
    const fallback = FALLBACK_STORIES[languageCode] || FALLBACK_STORIES.en;
    return { story: fallback.story, wisdom: fallback.wisdom };
  }
}

export default function App() {
  const [language, setLanguage] = useState('en');
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const isRTL = RTL_LANGS.includes(language);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [story, setStory] = useState('');
  const [wisdom, setWisdom] = useState('');
  const { history, addToHistory, updateHistory, deleteFromHistory, clearHistory } = useHistory(USER_ID);
  const { favorites, toggleFavorite, isFavorite } = useFavorites(history, updateHistory);
  const [view, setView] = useState('home');
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentStoryId, setCurrentStoryId] = useState(null);

  const generateStory = async (opts = { saveToHistory: true }) => {
    if (!input.trim()) return;
    setIsGenerating(true);
    setStory('');
    setWisdom('');
    try {
      const { story: s, wisdom: w } = await generateFromAPI({ promptText: input, languageCode: language });
      setStory(s);
      setWisdom(w);
      if (opts.saveToHistory) {
        const item = { id: uid(), emotion: input, story_text: s, wisdom_text: w, language, is_favorite: false, created_date: new Date().toISOString() };
        addToHistory(item);
        setCurrentStoryId(item.id);
        setInput('');
      }
    } catch (err) {
      setStory('Error generating story — check server or network.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copy = text => {
    navigator.clipboard.writeText(text).then(() => {
      const el = document.createElement('div');
      el.className = 'toast';
      el.textContent = 'Copied to clipboard';
      document.body.appendChild(el);
      setTimeout(() => el.classList.add('show'), 10);
      setTimeout(() => el.classList.remove('show'), 1500);
      setTimeout(() => document.body.removeChild(el), 1900);
    });
  };

  const share = async text => {
    if (navigator.share) { try { await navigator.share({ title: t.appTitle || 'Parvaz Hidaya', text }); } catch (e) { copy(text); } }
    else { copy(text); }
  };

  const deleteItem = id => {
    setDeleteTarget(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      if (deleteTarget === 'ALL') {
        try {
          // Use the hook's clearHistory to wipe items for this user
          clearHistory();
        } catch (e) { console.error(e); }
      } else {
        deleteFromHistory(deleteTarget);
      }
      setSelectedItem(null);
      setShowDeleteModal(false);
      setDeleteTarget(null);
    }
  };

  const clearAll = () => {
    setDeleteTarget('ALL');
    setShowDeleteModal(true);
  };

  const clearStory = () => {
    setStory('');
    setWisdom('');
    setCurrentStoryId(null);
  };

  useEffect(() => {
    if (story) {
      const regenerateStory = async () => {
        setIsGenerating(true);
        try {
          const { story: s, wisdom: w } = await generateFromAPI({ promptText: input, languageCode: language });
          setStory(s);
          setWisdom(w);
        } catch (err) {
          console.error(err);
        } finally {
          setIsGenerating(false);
        }
      };
      regenerateStory();
    }
  }, [language]);

  const regenerate = async (item) => {
    if (!item) { await generateStory({ saveToHistory: true }); return; }
    setIsGenerating(true);
    try {
      const { story: s, wisdom: w } = await generateFromAPI({ promptText: item.emotion, languageCode: item.language });
      updateHistory(item.id, { story_text: s, wisdom_text: w, created_date: new Date().toISOString() });
      setStory(s);
      setWisdom(w);
      setSelectedItem({ ...item, story_text: s, wisdom_text: w });
    } catch (e) { console.error(e); }
    finally { setIsGenerating(false); }
  };

  const suggestionClick = s => setInput(s);

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial', padding: 20, background: 'linear-gradient(135deg, #f5f1ed 0%, #faf8f5 50%, #f0ebe5 100%)', minHeight: '100vh' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        {view === 'home' && (
          <header style={{ paddingTop: 28, paddingBottom: 18, textAlign: 'center', animation: 'fadeInDown 0.6s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 24, height: 1, background: 'linear-gradient(90deg, transparent, #2d5a4a)' }} />
              <div style={{ fontSize: 20, color: '#2d5a4a' }}>✦</div>
              <div style={{ width: 24, height: 1, background: 'linear-gradient(90deg, #2d5a4a, transparent)' }} />
            </div>
            <h1 style={{ fontSize: 38, letterSpacing: '0.18em', margin: 8, fontWeight: 300, color: '#2d5a4a', animation: 'fadeInUp 0.8s ease-out 0.1s backwards' }}>{t.appTitle}</h1>
            <p style={{ color: '#8b7355', marginTop: -4, fontSize: 15, animation: 'fadeInUp 0.8s ease-out 0.2s backwards' }}>{t.subtitle}</p>
          </header>
        )}
        <div style={{ position: 'absolute', right: 20, top: 18, display: 'flex', gap: 8, animation: 'fadeIn 0.6s ease-out 0.3s backwards' }}>
          <button onClick={() => setView('home')} style={{ padding: '10px 14px', borderRadius: 12, background: view === 'home' ? 'rgba(212, 165, 116, 0.3)' : 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.5)', cursor: 'pointer', fontSize: 12, fontWeight: 500, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.target.style.transform = 'none'}>🏠 {t.navHome}</button>
          <button onClick={() => setView('history')} style={{ padding: '10px 14px', borderRadius: 12, background: view === 'history' ? 'rgba(212, 165, 116, 0.3)' : 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.5)', cursor: 'pointer', fontSize: 12, fontWeight: 500, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.target.style.transform = 'none'}>📖 {t.navHistory}</button>
          <button onClick={() => setView('favorites')} style={{ padding: '10px 14px', borderRadius: 12, background: view === 'favorites' ? 'rgba(212, 165, 116, 0.3)' : 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.5)', cursor: 'pointer', fontSize: 12, fontWeight: 500, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.target.style.transform = 'none'}>❤️ {t.navFavorites}</button>
          <select value={language} onChange={e => setLanguage(e.target.value)} style={{ padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(255, 255, 255, 0.5)', background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', cursor: 'pointer', fontSize: 12, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} onMouseEnter={e => e.target.style.boxShadow = '0 8px 24px rgba(45,90,74,0.12)'} onMouseLeave={e => e.target.style.boxShadow = 'none'}>
            {Object.entries(LANGUAGE_NAMES).map(([code, name]) => (<option value={code} key={code}>{name}</option>))}
          </select>
        </div>
        <main style={{ marginTop: 12 }}>
          {view === 'home' && (
            <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ width: '100%', maxWidth: 540, animation: 'slideUp 0.5s ease-out' }}>
                <input dir={isRTL ? 'rtl' : 'ltr'} placeholder={t.placeholder} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && generateStory()} style={{ width: '100%', padding: 14, borderRadius: 999, border: '1px solid rgba(212, 165, 116, 0.3)', background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', textAlign: 'center', boxSizing: 'border-box', fontSize: 14, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} onFocus={e => { e.target.style.borderColor = '#d4a574'; e.target.style.background = 'rgba(255, 255, 255, 0.95)'; e.target.style.boxShadow = '0 0 0 3px rgba(212, 165, 116, 0.1)'; }} onBlur={e => { e.target.style.borderColor = 'rgba(212, 165, 116, 0.3)'; e.target.style.background = 'rgba(255, 255, 255, 0.7)'; e.target.style.boxShadow = 'none'; }} />
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: 14, animation: 'fadeIn 0.6s ease-out 0.2s backwards' }}>
                  {t.suggestions.map(s => (<button key={s} onClick={() => suggestionClick(s)} style={{ padding: '8px 13px', borderRadius: 999, border: '1px solid rgba(224, 213, 197, 0.6)', background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', cursor: 'pointer', fontSize: 12, transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }} onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 6px 20px rgba(45,90,74,0.1)'; e.target.style.background = 'rgba(255, 255, 255, 0.95)'; }} onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; e.target.style.background = 'rgba(255, 255, 255, 0.7)'; }} onMouseDown={e => e.target.style.transform = 'translateY(-1px)'} onMouseUp={e => e.target.style.transform = 'translateY(-3px)'}>{s}</button>))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28, animation: 'fadeInUp 0.8s ease-out 0.3s backwards' }}>
                  <button onClick={() => generateStory()} disabled={isGenerating} style={{ marginTop: 0, padding: '15px 46px', background: isGenerating ? 'rgba(193, 193, 193, 0.5)' : 'linear-gradient(135deg, #2d5a4a, #3d6a55)', color: 'white', border: 'none', borderRadius: 999, cursor: isGenerating ? 'not-allowed' : 'pointer', fontSize: 15, fontWeight: 500, boxShadow: isGenerating ? 'none' : '0 6px 20px rgba(45,90,74,0.15)', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} onMouseEnter={e => { if (!isGenerating) { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 10px 30px rgba(45,90,74,0.25)'; } }} onMouseLeave={e => { if (!isGenerating) { e.target.style.transform = 'none'; e.target.style.boxShadow = '0 6px 20px rgba(45,90,74,0.15)'; } }}>{isGenerating ? `⏳ ${t.loading}` : `✨ ${t.button}`}</button>
                </div>
              </div>
              {!story && (<p style={{ color: '#8b7355', textAlign: 'center', marginTop: 20, animation: 'fadeIn 0.5s ease-out' }}>{t.emptyState}</p>)}
              {story && (
                <div style={{ width: '100%', maxWidth: 540, marginTop: 20, animation: 'slideUp 0.5s ease-out', position: 'relative' }}>
                  <div style={{ padding: 16, borderRadius: 20, border: '1px solid rgba(212, 165, 116, 0.3)', background: 'rgba(253, 251, 248, 0.8)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(24, 24, 24, 0.08)' }}>
                    <button onClick={clearStory} style={{ position: 'absolute', top: 8, right: 8, padding: '6px 10px', borderRadius: 8, background: 'rgba(220, 53, 69, 0.1)', border: '1px solid rgba(220, 53, 69, 0.2)', cursor: 'pointer', fontSize: 11, fontWeight: 500, color: '#dc3545', transition: 'all 0.2s ease' }} onMouseEnter={e => { e.target.style.background = 'rgba(220, 53, 69, 0.2)'; e.target.style.transform = 'scale(1.05)'; }} onMouseLeave={e => { e.target.style.background = 'rgba(220, 53, 69, 0.1)'; e.target.style.transform = 'none'; }}>✕ Clear</button>
                    <p style={{ margin: '0 0 8px 0', color: '#999', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>📖 Story</p>
                    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ lineHeight: 1.8, color: '#333', fontSize: 15, marginBottom: 16 }}>{story}</div>
                    {wisdom && (
                      <div style={{ borderTop: '1px solid rgba(212, 165, 116, 0.3)', paddingTop: 12 }}>
                        <p style={{ margin: '0 0 8px 0', color: '#999', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>💎 Wisdom</p>
                        <div dir={isRTL ? 'rtl' : 'ltr'} style={{ lineHeight: 1.8, color: '#555', fontSize: 14, fontStyle: 'italic' }}>{wisdom}</div>
                      </div>
                    )}
                    <div style={{ marginTop: 16, display: 'flex', gap: 10, justifyContent: 'center', animation: 'fadeIn 0.5s ease-out 0.2s backwards' }}>
                      <button onClick={() => copy(story)} style={{ padding: '8px 14px', borderRadius: 8, background: 'rgba(212, 165, 116, 0.15)', border: '1px solid rgba(212, 165, 116, 0.3)', cursor: 'pointer', fontSize: 12, fontWeight: 500, color: '#2d5a4a', transition: 'all 0.2s ease' }} onMouseEnter={e => { e.target.style.background = 'rgba(212, 165, 116, 0.25)'; e.target.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.target.style.background = 'rgba(212, 165, 116, 0.15)'; e.target.style.transform = 'none'; }}>📋 Copy</button>
                      <button onClick={() => share(`${input}\n\n${story}\n\n${wisdom || ''}`)} style={{ padding: '8px 14px', borderRadius: 8, background: 'rgba(76, 175, 80, 0.15)', border: '1px solid rgba(76, 175, 80, 0.3)', color: '#2e7d32', cursor: 'pointer', fontSize: 12, fontWeight: 500, transition: 'all 0.2s ease' }} onMouseEnter={e => { e.target.style.background = 'rgba(76, 175, 80, 0.25)'; e.target.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.target.style.background = 'rgba(76, 175, 80, 0.15)'; e.target.style.transform = 'none'; }}>🔗 Share</button>
                      <button onClick={() => currentStoryId && toggleFavorite(currentStoryId)} style={{ padding: '8px 14px', borderRadius: 8, background: currentStoryId && isFavorite(currentStoryId) ? 'rgba(212, 165, 116, 0.25)' : 'rgba(212, 165, 116, 0.15)', border: '1px solid rgba(212, 165, 116, 0.3)', cursor: 'pointer', fontSize: 12, fontWeight: 500, color: '#2d5a4a', transition: 'all 0.2s ease' }} onMouseEnter={e => { e.target.style.background = 'rgba(212, 165, 116, 0.25)'; e.target.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.target.style.background = currentStoryId && isFavorite(currentStoryId) ? 'rgba(212, 165, 116, 0.25)' : 'rgba(212, 165, 116, 0.15)'; e.target.style.transform = 'none'; }}>{currentStoryId && isFavorite(currentStoryId) ? '❤️ Saved' : '🤍 Save'}</button>
                    </div>
                  </div>
                  {story && (
                    <p style={{ color: '#8b7355', textAlign: 'center', marginTop: 16, animation: 'fadeIn 0.5s ease-out' }}>✨ {t.footer}</p>
                  )}
                </div>
              )}
            </section>
          )}
          {view === 'history' && (<HistoryView history={history} onBack={() => setView('home')} onSelectItem={(item) => { setSelectedItem(item); setView('detail'); }} onDelete={deleteItem} onToggleFavorite={toggleFavorite} isFavorite={isFavorite} language={language} translations={t} isRTL={isRTL} onClearAll={clearAll} />)}
          {view === 'favorites' && (<FavoritesView favorites={favorites} onBack={() => setView('home')} onSelectItem={(item) => { setSelectedItem(item); setView('detail'); }} onDelete={deleteItem} onToggleFavorite={toggleFavorite} language={language} translations={t} isRTL={isRTL} />)}
          {view === 'detail' && selectedItem && (<StoryDetailView item={selectedItem} onBack={() => setView('history')} onDelete={deleteItem} onToggleFavorite={toggleFavorite} isFavorite={isFavorite} onRegenerate={regenerate} onShare={share} isRegenerating={isGenerating} isRTL={isRTL} />)}
        </main>
        {showDeleteModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
            <div style={{ background: 'white', borderRadius: 16, padding: 24, maxWidth: 400, textAlign: 'center', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)', animation: 'slideUp 0.3s ease-out' }}>
              <h2 style={{ margin: '0 0 12px 0', fontSize: 18, color: '#2d5a4a', fontWeight: 600 }}>{deleteTarget === 'ALL' ? 'Delete all stories?' : 'Delete this story?'}</h2>
              <p style={{ margin: '0 0 24px 0', color: '#666', fontSize: 14 }}>This action cannot be undone.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button onClick={() => setShowDeleteModal(false)} style={{ padding: '10px 24px', borderRadius: 8, background: 'rgba(212, 165, 116, 0.15)', border: '1px solid rgba(212, 165, 116, 0.3)', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#2d5a4a', transition: 'all 0.2s ease' }} onMouseEnter={e => { e.target.style.background = 'rgba(212, 165, 116, 0.25)'; e.target.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.target.style.background = 'rgba(212, 165, 116, 0.15)'; e.target.style.transform = 'none'; }}>Cancel</button>
                <button onClick={confirmDelete} style={{ padding: '10px 24px', borderRadius: 8, background: 'rgba(220, 53, 69, 0.15)', border: '1px solid rgba(220, 53, 69, 0.3)', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#dc3545', transition: 'all 0.2s ease' }} onMouseEnter={e => { e.target.style.background = 'rgba(220, 53, 69, 0.25)'; e.target.style.transform = 'translateY(-2px)'; }} onMouseLeave={e => { e.target.style.background = 'rgba(220, 53, 69, 0.15)'; e.target.style.transform = 'none'; }}>Delete</button>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}
