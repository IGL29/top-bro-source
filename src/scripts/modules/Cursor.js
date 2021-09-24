export default class Cursor {
  parentElement = null;
  cursorElement = null;
  cursorPointerElementClass = 'cursor-pointer-js';
  cursorPointerClass = 'cursor--pointer';
  scrollStatus = false;
  mousedownStatus = false;
  lastScrollY = null;
  lastCursorY = null;

  constructor({ parentElement }) {
    this.parentElement = parentElement;
    this.cursorElement = this.createCursorElement();
    this.setHandler(this.cursorElement);
  }

  createCursorElement() {
    const cursorElement = document.createElement('div');
    const innerBlockElement = document.createElement('div');
    cursorElement.classList.add('cursor');
    cursorElement.setAttribute('id', 'cursor');
    innerBlockElement.classList.add('cursor__effect');
    cursorElement.append(innerBlockElement);
    return cursorElement;
  }

  setHandler() {
    this.parentElement.addEventListener('mousemove', this.handlerMouseMove.bind(this));
  }

  handlerMouseMove(ev) {
    const isCursorHidden = !Number(this.cursorElement.style.opacity);
    const isCursorVisible = this.cursorElement.style.opacity === '1';
    const isCursorYTop = ev.clientY === 0;
    const cursorStyle = this.cursorElement.style;
    cursorStyle.left = ev.clientX + 'px';
    cursorStyle.top = ev.clientY + 'px';

    if (isCursorYTop && isCursorVisible) {
      cursorStyle.opacity = '0';
      return;
    }

    if (isCursorHidden) {
      cursorStyle.opacity = '1';
    }
  }

  appendCursor() {
    this.parentElement.append(this.cursorElement);
  }

  setCursorPointer(cursorPointerElements = this.getChildPointerElements()) {
    try {
      if (!cursorPointerElements.length) {
        this.setHendlerPointer(cursorPointerElements);
        return;
      }
      for (const element of cursorPointerElements) {
        this.setHendlerPointer(element);
      }
    } catch (error) {
      const cursorDisabledElements = document.getElementsByClassName('.no-cursor');

      for (element of cursorDisabledElements) {
        element.classList.remove('no-cursor');
      }
      this.cursorElement.style.display = 'none'
      this.parentElement.style.cursor = 'initial';
      console.log(error);
    }
  }

  getChildPointerElements() {
    return this.parentElement.getElementsByClassName(this.cursorPointerElementClass);
  }

  setHendlerPointer(element) {
    element.classList.add('no-cursor');

    element.addEventListener('mouseover', () => {
      this.cursorElement.classList.add(this.cursorPointerClass);
    });

    element.addEventListener('mouseout', () => {
      this.cursorElement.classList.remove(this.cursorPointerClass);
    });
  }
}
