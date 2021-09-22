export default class Select {
  optionClass = 'option-js';
  activeClass = 'is-open';
  isCursorOverDownElement = true;
  requestID = null;

  constructor({ selectId, bodyElement }) {
    this.selectElement = document.getElementById(selectId);
    this.currentOptionElement = this.selectElement.querySelector('.select__current-js');
    this.selectTitleElement = this.selectElement.querySelector('.select__title-js');
    this.listOptionElements = this.selectElement.querySelector('.list-options-js');
    this.optionsElements = this.listOptionElements.getElementsByClassName('option-js');
    this.scrollElement = this.selectElement.querySelector('.select__down-js');
    this.optionsWrapperElement = this.selectElement.querySelector('.select__content-wrapper-js');
    this.bodyElement = bodyElement;
  }

  setSelectHandlers() {
    this.selectElement.addEventListener('click', this.handlerClick.bind(this));
    this.scrollElement.addEventListener('mouseover', this.handlerScroll.bind(this));
    this.scrollElement.addEventListener('mouseout', () => {
      cancelAnimationFrame(this.requestID);
      this.isCursorOverDownElement = false
    });
    this.#setHandlerClose();
  }

  handlerClick(ev) {
    const target = ev.target;
    const isTitleElement = this.checkClickOnTitle(target);

    if (isTitleElement) {
      if (this.selectElement.classList.contains('is-open')) {
        this.optionsWrapperElement.scrollTop = 0;
        ev.currentTarget.classList.remove('is-open');
        return;
      }
      ev.currentTarget.classList.add('is-open');
      return;
    }

    if (target.classList.contains('option-js')) {
      this.hideTargetOption(target);
      this.setTargetOptionInTitle(target);

      this.optionsWrapperElement.scrollTop = 0;
      ev.currentTarget.classList.remove('is-open');
    }
  }

  checkClickOnTitle(target) {
    return target === this.selectTitleElement || this.selectTitleElement.contains(target);
  }

  hideTargetOption(target) {
    for (const option of this.optionsElements) {
      option.style.display = '';
    }
    target.style.display = 'none';
  }

  setTargetOptionInTitle(target) {
    const targetDataValue = target.dataset.value;
    const targetText = target.textContent;

    this.currentOptionElement.textContent = targetText;
    this.currentOptionElement.dataset.value = targetDataValue;
  }

  handlerScroll() {
    this.isCursorOverDownElement = true;
    this.scrollAnimate();
  }

  scrollAnimate(lastTime = 0) {
    const currentTime = new Date().getTime();
    const differenceTime = currentTime - lastTime;

    if (this.isCursorOverDownElement) {

      if (differenceTime >= 1000) {
        this.optionsWrapperElement.scrollTop += 5;
        this.requestID = requestAnimationFrame(() => { this.scrollAnimate(currentTime) });
      }
      this.requestID = requestAnimationFrame(() => { this.scrollAnimate(lastTime) });
      return;
    }
    cancelAnimationFrame(this.requestID);
  }

  #setHandlerClose() {
    this.bodyElement.addEventListener('click', (ev) => {
      const isNotSelect = !this.selectElement.contains(ev.target) && ev.target !== this.selectElement;
      const isSelectOpen = this.selectElement.classList.contains('is-open');

      if (isSelectOpen && isNotSelect) {
        this.optionsWrapperElement.scrollTop = 0;
        this.selectElement.classList.remove('is-open');
      }
    });
  }
}
