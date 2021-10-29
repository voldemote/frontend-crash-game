export function playWinSound(volumeLevel) {
  try {
    const el = document.getElementById('audio-win');
    if (el.play) {
      el.volume = volumeLevel;
      el.play();
    }
  } catch (e) {
    console.error(e);
  }
}
