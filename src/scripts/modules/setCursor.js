const cursorPointerClass = 'cursor--pointer';
const cursorElement = document.getElementById('cursor');

export default function setCursor({ parentElement }) {

  const cursorPointerElements = parentElement.getElementsByClassName('cursor-pointer-js');

  if (parentElement.tagName === 'BODY') {

    parentElement.addEventListener('mousemove', (ev) => {

      const isCursorHidden = cursorElement.style.opacity !== '1';

      if (isCursorHidden) {
        cursorElement.style.opacity = '1';
      }

      cursorElement.style.left = ev.pageX + 'px';
      cursorElement.style.top = ev.pageY + 'px';

      if (ev.clientY === 0 && cursorElement.style.opacity === '1') {
        cursorElement.style.opacity = '0';
        return;
      }

      if (cursorElement.style.opacity = '0') {
        cursorElement.style.opacity = '1';
      }
    });

    window.addEventListener('scroll', (ev) => {
      cursorElement.style.left = ev.clientX + 'px';
      cursorElement.style.top = ev.clientY + 'px';
    });
  }

  for (const element of cursorPointerElements) {
    element.classList.add('no-cursor');

    element.addEventListener('mouseover', () => {
      cursorElement.classList.add(cursorPointerClass);
    });

    element.addEventListener('mouseout', () => {
      cursorElement.classList.remove(cursorPointerClass);
    });
  }
};



