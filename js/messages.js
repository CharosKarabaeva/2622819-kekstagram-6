const showMessage = (templateId) => {
  const template = document.querySelector(`#${templateId}`);
  if (!template) {
    return;
  }

  const fragment = template.content.cloneNode(true);
  const messageElement = fragment.querySelector('.success') || fragment.querySelector('.error');

  if (messageElement) {
    messageElement.style.zIndex = '10000';
  }

  document.body.appendChild(fragment);

  const node = messageElement;

  function onEsc(evt) {
    if (evt.key === 'Escape') {
      evt.stopPropagation();
      removeMessage();
    }
  }

  function removeMessage() {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
    document.removeEventListener('keydown', onEsc);
  }

  document.addEventListener('keydown', onEsc);

  if (node) {
    node.addEventListener('click', (evt) => {
      const target = evt.target;
      const button = target.closest('button');

      if (button && (button.classList.contains('success__button') || button.classList.contains('error__button'))) {
        removeMessage();
        return;
      }

      if (target === node) {
        removeMessage();
      }
    });
  }
};

const showSuccessMessage = () => showMessage('success');
const showErrorMessage = () => showMessage('error');

export { showSuccessMessage, showErrorMessage };
