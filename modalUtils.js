export function closeModal(modalOverlay) {
  const closeBtn = modalOverlay.querySelector("#close-modal");
  closeBtn.addEventListener("click", () => {
    modalOverlay.style.display = "none";
  });
}

export function handleTypeButtons(buttons, onTypeSelect) {
  buttons.forEach(button => {
      button.addEventListener('click', () => {
          buttons.forEach(btn => btn.style.backgroundColor = '#f0f0f0');
          button.style.backgroundColor = '#ddd';
          onTypeSelect(button.id.split('-').pop());
      });
  });
}
export function handleSentimentButtons(buttons, onSentimentSelect) {
  buttons.forEach(button => {
       button.addEventListener('click', () => {
          buttons.forEach(btn => btn.style.backgroundColor = '#f0f0f0');
           button.style.backgroundColor = '#ddd';
           onSentimentSelect(button.id.split('-').pop());
      });
  });
}