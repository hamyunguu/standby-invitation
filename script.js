const invitation = document.querySelector('.poster-slot');
const video = invitation.querySelector('video');

const playVideo = () => {
  video.muted = true;
  video.play().catch(() => {});
};

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
