export default function showErrorMessage({ text, containerElement, request }) {
  const containerErrorElement = document.createElement('div');
  const messageElement = document.createElement('p');
  const buttonElement = document.createElement('button');

  containerErrorElement.classList.add('error');
  messageElement.classList.add('error__text');
  buttonElement.classList.add('error__button');

  messageElement.textContent = text;
  buttonElement.textContent = 'повторить запрос';
  buttonElement.addEventListener('click', () => {
    containerErrorElement.remove();
    request();
  });

  containerErrorElement.append(messageElement, buttonElement);
  containerElement.append(containerErrorElement);
}
