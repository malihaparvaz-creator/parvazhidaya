import React, { useState, useMemo } from 'react';

const HISTORY_LABELS = {
  en: { back: '← Back', history: '📖 History', search: '🔍 Search stories...', empty: '✨ No stories yet. Create your first one!', save: '🤍 Save', saved: '❤️ Saved', delete: '🗑️ Delete', clearAll: '🗑️ Delete All', emotion: '💭', date: '📅' },
  ar: { back: '← رجوع', history: '📖 السجل', search: '🔍 ابحث عن القصص...', empty: '✨ لا توجد قصص بعد. أنشئ قصتك الأولى!', save: '🤍 حفظ', saved: '❤️ محفوظة', delete: '🗑️ حذف', clearAll: '🗑️ حذف الكل', emotion: '💭', date: '📅' },
  ur: { back: '← پیچھے', history: '📖 ریکارڈ', search: '🔍 کہانیاں تلاش کریں...', empty: '✨ ابھی کوئی کہانی نہیں۔ اپنی پہلی کہانی بنائیں!', save: '🤍 محفوظ', saved: '❤️ محفوظ', delete: '🗑️ حذف', clearAll: '🗑️ سب حذف کریں', emotion: '💭', date: '📅' },
  hi: { back: '← वापस', history: '📖 इतिहास', search: '🔍 कहानियां खोजें...', empty: '✨ अभी कोई कहानी नहीं है। अपनी पहली कहानी बनाएं!', save: '🤍 सहेजें', saved: '❤️ सहेजी गई', delete: '🗑️ हटाएं', clearAll: '🗑️ सब हटाएं', emotion: '💭', date: '📅' },
  tr: { back: '← Geri', history: '📖 Tarih', search: '🔍 Hikayeleri ara...', empty: '✨ Henüz hikaye yok. İlk hikayeni oluştur!', save: '🤍 Kaydet', saved: '❤️ Kaydedildi', delete: '🗑️ Sil', clearAll: '🗑️ Hepsini Sil', emotion: '💭', date: '📅' },
  id: { back: '← Kembali', history: '📖 Riwayat', search: '🔍 Cari cerita...', empty: '✨ Belum ada cerita. Buat cerita pertamamu!', save: '🤍 Simpan', saved: '❤️ Tersimpan', delete: '🗑️ Hapus', clearAll: '🗑️ Hapus Semua', emotion: '💭', date: '📅' },
  fr: { back: '← Retour', history: '📖 Historique', search: '🔍 Rechercher des histoires...', empty: '✨ Pas encore d\'histoires. Crée la tienne!', save: '🤍 Enregistrer', saved: '❤️ Enregistré', delete: '🗑️ Supprimer', clearAll: '🗑️ Supprimer tout', emotion: '💭', date: '📅' },
  es: { back: '← Atrás', history: '📖 Historial', search: '🔍 Buscar historias...', empty: '✨ Sin historias aún. ¡Crea la tuya!', save: '🤍 Guardar', saved: '❤️ Guardado', delete: '🗑️ Eliminar', clearAll: '🗑️ Eliminar todo', emotion: '💭', date: '📅' },
  zh: { back: '← 返回', history: '📖 历史', search: '🔍 搜索故事...', empty: '✨ 还没有故事。创建你的第一个故事!', save: '🤍 保存', saved: '❤️ 已保存', delete: '🗑️ 删除', clearAll: '🗑️ 删除全部', emotion: '💭', date: '📅' }
};

export function HistoryView({ history, onBack, onSelectItem, onDelete, onToggleFavorite, isFavorite, language, translations, isRTL, onClearAll }) {
  const [searchFilter, setSearchFilter] = useState('');
  const labels = HISTORY_LABELS[language] || HISTORY_LABELS.en;

  const filteredHistory = useMemo(() => {
    if (!searchFilter.trim()) return history.slice().reverse();
    const q = searchFilter.toLowerCase();
    return history
      .slice()
      .reverse()
      .filter(h =>
        (h.emotion || '').toLowerCase().includes(q) ||
        (h.story_text || '').toLowerCase().includes(q)
      );
  }, [history, searchFilter]);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(language === 'ar' || language === 'ur' ? 'en-US' : language, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', animation: 'slideUp 0.5s ease-out' }}>
      <div style={{ paddingBottom: 24, textAlign: 'center', borderBottom: '1px solid rgba(212, 165, 116, 0.2)', marginBottom: 24, animation: 'fadeInDown 0.5s ease-out' }}>
        <h1 style={{ fontSize: 38, letterSpacing: '0.18em', margin: '0 0 8px 0', fontWeight: 300, color: '#2d5a4a' }}>{translations.historyTitle}</h1>
        <p style={{ color: '#8b7355', marginTop: 4, fontSize: 14, margin: 0 }}>{translations.historySubtitle}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, animation: 'fadeInDown 0.5s ease-out' }}>
        <button onClick={onBack} style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.5)', cursor: 'pointer', fontSize: 12, fontWeight: 500, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 24px rgba(45,90,74,0.12)'; }} onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; }}>
          {labels.back}
        </button>
        <p style={{ color: '#8b7355', margin: 0, fontSize: 12, fontWeight: 500 }}>Stories saved: {filteredHistory.length}</p>
        {history.length > 0 && (
          <button onClick={onClearAll} style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(220, 53, 69, 0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(220, 53, 69, 0.3)', cursor: 'pointer', fontSize: 12, fontWeight: 500, color: '#dc3545', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.background = 'rgba(220, 53, 69, 0.2)'; e.target.style.boxShadow = '0 8px 24px rgba(220,53,69,0.12)'; }} onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.background = 'rgba(220, 53, 69, 0.1)'; e.target.style.boxShadow = 'none'; }}>
            {labels.clearAll}
          </button>
        )}
      </div>

      <input
        type="text"
        placeholder={labels.search}
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        dir={isRTL ? 'rtl' : 'ltr'}
        style={{
          width: '100%',
          padding: 12,
          borderRadius: 12,
          border: '1px solid rgba(212, 165, 116, 0.3)',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          marginBottom: 20,
          boxSizing: 'border-box',
          fontSize: 14,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onFocus={e => { e.target.style.borderColor = '#d4a574'; e.target.style.background = 'rgba(255, 255, 255, 0.95)'; e.target.style.boxShadow = '0 0 0 3px rgba(212, 165, 116, 0.1)'; }}
        onBlur={e => { e.target.style.borderColor = 'rgba(212, 165, 116, 0.3)'; e.target.style.background = 'rgba(255, 255, 255, 0.7)'; e.target.style.boxShadow = 'none'; }}
      />

      {filteredHistory.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#8b7355', animation: 'fadeIn 0.5s ease-out' }}>{labels.empty}</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, animation: 'fadeIn 0.5s ease-out' }}>
          {filteredHistory.map((item, idx) => (
            <div
              key={item.id}
              style={{
                padding: 16,
                borderRadius: 16,
                border: '1px solid rgba(212, 165, 116, 0.2)',
                background: 'rgba(253, 251, 248, 0.6)',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: `slideUp 0.5s ease-out ${idx * 0.05}s backwards`,
              }}
              onClick={() => onSelectItem(item)}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(45,90,74,0.12)'; e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'rgba(212, 165, 116, 0.2)'; }}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 8px 0', color: '#2d5a4a', fontSize: 16, fontWeight: 500 }}>{labels.emotion} {item.emotion}</h3>
                  <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: 13, lineHeight: 1.4 }}>
                    {item.story_text.substring(0, 100)}...
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
                      background: isFavorite(item.id) ? 'rgba(212, 165, 116, 0.3)' : 'rgba(255, 255, 255, 0.7)',
                      border: '1px solid ' + (isFavorite(item.id) ? 'rgba(212, 165, 116, 0.5)' : 'rgba(224, 213, 197, 0.6)'),
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: 500,
                      color: isFavorite(item.id) ? '#d4a574' : '#666',
                      transition: 'all 0.2s ease',
                    }}
                    title={isFavorite(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                    onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 4px 12px rgba(212,165,116,0.15)'; }}
                    onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; }}
                  >
                    {isFavorite(item.id) ? labels.saved : labels.save}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 8,
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#dc2626',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 4px 12px rgba(239,68,68,0.15)'; }}
                    onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; }}
                  >
                    {labels.delete}
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
