// Frontend/src/utils/emotionColors.js

export const emotionColors = {
  Great: 'bg-green-400',
  Happy: 'bg-emerald-400',
  Calm: 'bg-blue-400',
  Tired: 'bg-yellow-400',
  Distressed: 'bg-red-400',
};

// (optional helper)
export const getEmotionColor = (emotion) =>
  emotionColors[emotion] || 'bg-slate-200';
