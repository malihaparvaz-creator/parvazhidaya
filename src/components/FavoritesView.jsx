import React from 'react';

const FAVORITES_LABELS = {
  en: { back: '← Back', favorites: '❤️ Favorites', empty: '💫 No favorites yet. Add stories you love!', remove: '💝 Remove', emotion: '✨', date: '📅' },
  ar: { back: '← رجوع', favorites: '❤️ المفضلة', empty: '💫 لا توجد مفضلات بعد. أضف القصص التي تحب!', remove: '💝 إزالة', emotion: '✨', date: '📅' },
  ur: { back: '← پیچھے', favorites: '❤️ پسندیدہ', empty: '💫 ابھی کوئی پسندیدہ نہیں۔ اپنی پسندیدہ کہانیاں شامل کریں!', remove: '💝 ہٹائیں', emotion: '✨', date: '📅' },
  hi: { back: '← वापस', favorites: '❤️ पसंदीदा', empty: '💫 अभी कोई पसंदीदा नहीं है। अपनी पसंद की कहानियां जोड़ें!', remove: '💝 हटाएं', emotion: '✨', date: '📅' },
  tr: { back: '← Geri', favorites: '❤️ Favoriler', empty: '💫 Henüz favori yok. Beğendiğin hikayeleri ekle!', remove: '💝 Kaldır', emotion: '✨', date: '📅' },
  id: { back: '← Kembali', favorites: '❤️ Favorit', empty: '💫 Belum ada favorit. Tambahkan cerita yang kamu sukai!', remove: '💝 Hapus', emotion: '✨', date: '📅' },
  fr: { back: '← Retour', favorites: '❤️ Favoris', empty: '💫 Pas encore de favoris. Ajoute tes histoires préférées!', remove: '💝 Supprimer', emotion: '✨', date: '📅' },
  es: { back: '← Atrás', favorites: '❤️ Favoritos', empty: '💫 Sin favoritos aún. ¡Añade historias que ames!', remove: '💝 Quitar', emotion: '✨', date: '📅' },
  zh: { back: '← 返回', favorites: '❤️ 收藏', empty: '💫 还没有收藏。添加你喜欢的故事!', remove: '💝 删除', emotion: '✨', date: '📅' }
};

export function FavoritesView({ favorites, onBack, onSelectItem, onDelete, onToggleFavorite, language, translations, isRTL }) {
  const labels = FAVORITES_LABELS[language] || FAVORITES_LABELS.en;

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(language === 'ar' || language === 'ur' ? 'en-US' : language, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', animation: 'slideUp 0.5s ease-out' }}>
      <div style={{ paddingBottom: 24, textAlign: 'center', borderBottom: '1px solid rgba(212, 165, 116, 0.2)', marginBottom: 24, animation: 'fadeInDown 0.5s ease-out' }}>
        <h1 style={{ fontSize: 38, letterSpacing: '0.18em', margin: '0 0 8px 0', fontWeight: 300, color: '#2d5a4a' }}>{translations.favoritesTitle}</h1>
        <p style={{ color: '#8b7355', marginTop: 4, fontSize: 14, margin: 0 }}>{translations.favoritesSubtitle}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, animation: 'fadeInDown 0.5s ease-out' }}>
        <button onClick={onBack} style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.5)', cursor: 'pointer', fontSize: 12, fontWeight: 500, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 24px rgba(45,90,74,0.12)'; }} onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; }}>
          {labels.back}
        </button>
        <p style={{ color: '#8b7355', margin: 0, fontSize: 12, fontWeight: 500 }}>Saved favorites: {favorites.length}</p>
      </div>

      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#8b7355', animation: 'fadeIn 0.5s ease-out' }}>{labels.empty}</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, animation: 'fadeIn 0.5s ease-out' }}>
          {favorites.map((item, idx) => (
            <div
              key={item.id}
              style={{
                padding: 18,
                borderRadius: 16,
                border: '2px solid rgba(212, 165, 116, 0.4)',
                background: 'rgba(255, 252, 249, 0.7)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(212, 165, 116, 0.12)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: `slideUp 0.5s ease-out ${idx * 0.05}s backwards`,
              }}
              onClick={() => onSelectItem(item)}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.6)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(212, 165, 116, 0.18)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.4)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(212, 165, 116, 0.12)'; }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#d4a574', fontSize: 17, fontWeight: 600 }}>
                    {labels.emotion} {item.emotion}
                  </h3>
                  <p style={{ margin: '0 0 10px 0', color: '#2d5a4a', fontSize: 14, lineHeight: 1.6 }}>
                    {item.story_text.substring(0, 120)}...
                  </p>
                  <p style={{ margin: 0, color: '#999', fontSize: 12 }}>
                    {labels.date} {formatDate(item.created_date)} • {item.language.toUpperCase()}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(item.id);
                    }}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 8,
                      background: 'rgba(212, 165, 116, 0.3)',
                      color: '#d4a574',
                      border: '1px solid rgba(212, 165, 116, 0.5)',
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: 500,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 4px 12px rgba(212,165,116,0.2)'; }}
                    onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; }}
                  >
                    {labels.remove}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
