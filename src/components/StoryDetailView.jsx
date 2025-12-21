import React from 'react';

const DETAIL_LABELS = {
  en: { back: '← Back', save: '🤍 Save', saved: '❤️ Saved', delete: '🗑️ Delete', emotion: '💭 Your Emotion', story: '📖 Your Story', wisdom: '💎 Wisdom', copyStory: '📋 Copy Story', copyWisdom: '📋 Copy Wisdom', share: '🔗 Share', regenerate: '✨ Regenerate', regenerating: '⏳ Regenerating...' },
  ar: { back: '← رجوع', save: '🤍 احفظ', saved: '❤️ محفوظة', delete: '🗑️ حذف', emotion: '💭 شعورك', story: '📖 قصتك', wisdom: '💎 الحكمة', copyStory: '📋 انسخ القصة', copyWisdom: '📋 انسخ الحكمة', share: '🔗 شارك', regenerate: '✨ إعادة توليد', regenerating: '⏳ إعادة التوليد...' },
  ur: { back: '← پیچھے', save: '🤍 محفوظ', saved: '❤️ محفوظ', delete: '🗑️ حذف', emotion: '💭 آپ کا احساس', story: '📖 آپ کی کہانی', wisdom: '💎 حکمت', copyStory: '📋 کہانی کاپی کریں', copyWisdom: '📋 حکمت کاپی کریں', share: '🔗 شیئر کریں', regenerate: '✨ دوبارہ تیار کریں', regenerating: '⏳ دوبارہ تیار ہو رہا ہے...' },
  hi: { back: '← वापस', save: '🤍 सहेजें', saved: '❤️ सहेजी गई', delete: '🗑️ हटाएं', emotion: '💭 आपकी भावना', story: '📖 आपकी कहानी', wisdom: '💎 हिकमत', copyStory: '📋 कहानी कॉपी करें', copyWisdom: '📋 हिकमत कॉपी करें', share: '🔗 साझा करें', regenerate: '✨ पुनर्जन्म करें', regenerating: '⏳ पुनर्जन्म हो रहा है...' },
  tr: { back: '← Geri', save: '🤍 Kaydet', saved: '❤️ Kaydedildi', delete: '🗑️ Sil', emotion: '💭 Duygun', story: '📖 Hikayen', wisdom: '💎 Hikmet', copyStory: '📋 Hikayeyi Kopyala', copyWisdom: '📋 Hikmeti Kopyala', share: '🔗 Paylaş', regenerate: '✨ Yeniden Oluştur', regenerating: '⏳ Yeniden Oluşturuluyor...' },
  id: { back: '← Kembali', save: '🤍 Simpan', saved: '❤️ Tersimpan', delete: '🗑️ Hapus', emotion: '💭 Perasaanmu', story: '📖 Ceritamu', wisdom: '💎 Hikmah', copyStory: '📋 Salin Cerita', copyWisdom: '📋 Salin Hikmah', share: '🔗 Bagikan', regenerate: '✨ Hasilkan Ulang', regenerating: '⏳ Menghasilkan Ulang...' },
  fr: { back: '← Retour', save: '🤍 Enregistrer', saved: '❤️ Enregistré', delete: '🗑️ Supprimer', emotion: '💭 Ton Émotion', story: '📖 Ton Histoire', wisdom: '💎 Sagesse', copyStory: '📋 Copier l\'Histoire', copyWisdom: '📋 Copier la Sagesse', share: '🔗 Partager', regenerate: '✨ Régénérer', regenerating: '⏳ Régénération...' },
  es: { back: '← Atrás', save: '🤍 Guardar', saved: '❤️ Guardado', delete: '🗑️ Eliminar', emotion: '💭 Tu Emoción', story: '📖 Tu Historia', wisdom: '💎 Sabiduría', copyStory: '📋 Copiar Historia', copyWisdom: '📋 Copiar Sabiduría', share: '🔗 Compartir', regenerate: '✨ Regenerar', regenerating: '⏳ Regenerando...' },
  zh: { back: '← 返回', save: '🤍 保存', saved: '❤️ 已保存', delete: '🗑️ 删除', emotion: '💭 你的情感', story: '📖 你的故事', wisdom: '💎 智慧', copyStory: '📋 复制故事', copyWisdom: '📋 复制智慧', share: '🔗 分享', regenerate: '✨ 重新生成', regenerating: '⏳ 正在重新生成...' }
};

export function StoryDetailView({ item, onBack, onDelete, onToggleFavorite, isFavorite, onRegenerate, onShare, isRegenerating, isRTL }) {
  const language = item.language || 'en';
  const labels = DETAIL_LABELS[language] || DETAIL_LABELS.en;

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div style={{ maxWidth: 780, margin: '0 auto', animation: 'slideUp 0.5s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, animation: 'fadeInDown 0.5s ease-out' }}>
        <button onClick={onBack} style={{ padding: '10px 14px', borderRadius: 12, background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.5)', cursor: 'pointer', fontSize: 12, fontWeight: 500, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 24px rgba(45,90,74,0.12)'; }} onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; }}>
          {labels.back}
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => onToggleFavorite(item.id)}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              background: isFavorite(item.id) ? 'rgba(212, 165, 116, 0.3)' : 'rgba(255, 255, 255, 0.7)',
              border: '1px solid ' + (isFavorite(item.id) ? 'rgba(212, 165, 116, 0.5)' : 'rgba(224, 213, 197, 0.6)'),
              backdropFilter: 'blur(10px)',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 500,
              color: isFavorite(item.id) ? '#d4a574' : '#666',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 4px 12px rgba(212,165,116,0.15)'; }}
            onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; }}
          >
            {isFavorite(item.id) ? labels.saved : labels.save}
          </button>
          <button
            onClick={() => onDelete(item.id)}
            style={{
              padding: '10px 14px',
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

      <div style={{ padding: 24, borderRadius: 20, border: '1px solid rgba(212, 165, 116, 0.3)', background: 'rgba(253, 251, 248, 0.8)', backdropFilter: 'blur(10px)', boxShadow: '0 8px 32px rgba(24, 24, 24, 0.08)', animation: 'slideUp 0.5s ease-out 0.1s backwards' }}>
        <div style={{ marginBottom: 20 }}>
          <p style={{ margin: '0 0 8px 0', color: '#999', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>
            {labels.emotion}
          </p>
          <h2 style={{ margin: 0, color: '#2d5a4a', fontSize: 28, fontWeight: 400 }}>{item.emotion}</h2>
          <p style={{ margin: '8px 0 0 0', color: '#999', fontSize: 13 }}>
            📅 {formatDate(item.created_date)} • 🌐 {item.language.toUpperCase()}
          </p>
        </div>

        <div style={{ borderTop: '1px solid rgba(212, 165, 116, 0.3)', paddingTop: 20, marginBottom: 20, animation: 'fadeInUp 0.6s ease-out 0.2s backwards' }}>
          <p style={{ margin: '0 0 8px 0', color: '#999', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>
            {labels.story}
          </p>
          <div dir={isRTL ? 'rtl' : 'ltr'} style={{ lineHeight: 1.8, color: '#333', fontSize: 15, marginBottom: 12 }}>
            {item.story_text}
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(item.story_text)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              background: 'rgba(212, 165, 116, 0.15)',
              border: '1px solid rgba(212, 165, 116, 0.3)',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 500,
              color: '#2d5a4a',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 4px 12px rgba(212,165,116,0.15)'; }}
            onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; }}
          >
            {labels.copyStory}
          </button>
        </div>

        {item.wisdom_text && (
          <div style={{ borderTop: '1px solid rgba(212, 165, 116, 0.3)', paddingTop: 20, marginBottom: 20, animation: 'fadeInUp 0.6s ease-out 0.25s backwards' }}>
            <p style={{ margin: '0 0 8px 0', color: '#999', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>
              {labels.wisdom}
            </p>
            <div dir={isRTL ? 'rtl' : 'ltr'} style={{ lineHeight: 1.8, color: '#555', fontSize: 14, fontStyle: 'italic', marginBottom: 12 }}>
              {item.wisdom_text}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(item.wisdom_text)}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                background: 'rgba(212, 165, 116, 0.15)',
                border: '1px solid rgba(212, 165, 116, 0.3)',
                cursor: 'pointer',
                fontSize: 12,
                fontWeight: 500,
                color: '#2d5a4a',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 4px 12px rgba(212,165,116,0.15)'; }}
              onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; }}
            >
              {labels.copyWisdom}
            </button>
          </div>
        )}

        <div style={{ borderTop: '1px solid rgba(212, 165, 116, 0.3)', paddingTop: 20, display: 'flex', gap: 10, animation: 'fadeInUp 0.6s ease-out 0.3s backwards' }}>
          <button
            onClick={() => onShare(`${item.emotion}\n\n${item.story_text}\n\n${item.wisdom_text || ''}`)}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              background: 'rgba(76, 175, 80, 0.15)',
              border: '1px solid rgba(76, 175, 80, 0.3)',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 500,
              color: '#2e7d32',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 4px 12px rgba(76,175,80,0.15)'; }}
            onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; }}
          >
            {labels.share}
          </button>
          <button
            onClick={() => onRegenerate(item)}
            disabled={isRegenerating}
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              background: isRegenerating ? 'rgba(193, 193, 193, 0.3)' : 'rgba(30, 144, 255, 0.15)',
              border: isRegenerating ? '1px solid rgba(193, 193, 193, 0.3)' : '1px solid rgba(30, 144, 255, 0.3)',
              cursor: isRegenerating ? 'not-allowed' : 'pointer',
              fontSize: 12,
              fontWeight: 500,
              color: isRegenerating ? '#999' : '#0066cc',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { if (!isRegenerating) { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 4px 12px rgba(30,144,255,0.15)'; } }}
            onMouseLeave={e => { if (!isRegenerating) { e.target.style.transform = 'none'; e.target.style.boxShadow = 'none'; } }}
          >
            {isRegenerating ? labels.regenerating : labels.regenerate}
          </button>
        </div>
      </div>
    </div>
  );
}
