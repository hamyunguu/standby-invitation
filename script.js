const invitation = document.querySelector('.poster-slot');

invitation.addEventListener('click', () => {
  const isFlipped = invitation.getAttribute('aria-pressed') === 'true';
  invitation.setAttribute('aria-pressed', String(!isFlipped));
  invitation.setAttribute(
    'aria-label',
    isFlipped ? '초대장 뒷면 보기' : '초대장 앞면 보기',
  );
});
