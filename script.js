const invitation = document.querySelector('.poster-slot');
const video = invitation.querySelector('video');
const fallback = invitation.querySelector('.invitation-fallback');
let fallbackActive = false;
let playbackStarted = false;

const useFallback = () => {
  if (fallbackActive) return;
  fallbackActive = true;

  const source = fallback.querySelector('source');
  const image = fallback.querySelector('img');
  source.srcset = source.dataset.srcset;
  image.src = image.dataset.src;
  invitation.classList.add('fallback-active');
  video.pause();
};

const playVideo = () => {
  if (fallbackActive || document.documentElement.classList.contains('kakao-browser')) return;
  video.muted = true;
  const attempt = video.play();
  if (attempt && typeof attempt.catch === 'function') attempt.catch(useFallback);
};

if (document.documentElement.classList.contains('kakao-browser')) {
  useFallback();
} else {
  video.addEventListener('playing', () => { playbackStarted = true; });
  video.addEventListener('error', useFallback);
  window.setTimeout(() => { if (!playbackStarted) useFallback(); }, 3500);
  playVideo();
}

window.addEventListener('pageshow', playVideo);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) playVideo();
});

invitation.addEventListener('click', () => {
  playVideo();
  const isFlipped = invitation.getAttribute('aria-pressed') === 'true';
  invitation.setAttribute('aria-pressed', String(!isFlipped));
  invitation.setAttribute(
    'aria-label',
    isFlipped ? '초대장 뒷면 보기' : '초대장 앞면 보기',
  );
});
