export default class BurgerMenu {

  timer = null;

  constructor({
    bodyElement,
    burgerButtonElement,
    burgerMenuElement,
    classBtnActive,
    classMenuActive,
    classVisibilityHidden
  }) {
    this.bodyElement = bodyElement;
    this.burgerButtonElement = burgerButtonElement;
    this.burgerMenuElement = burgerMenuElement;
    this.classBtnActive = classBtnActive;
    this.classMenuActive = classMenuActive;
    this.classVisibilityHidden = classVisibilityHidden;

    this.#setHandlerClose();
  }

  createMenu() {
    this.burgerButtonElement.addEventListener('click', this.#manageMenu.bind(this));
  }

  openMenu() {
    clearTimeout(this.timer);
    this.bodyElement.style.overflow = 'hidden';
    this.burgerMenuElement.classList.remove(this.classVisibilityHidden);
    this.burgerMenuElement.classList.add(this.classMenuActive);
    this.burgerButtonElement.classList.add(this.classBtnActive);
    this.burgerButtonElement.ariaLabel = 'Закрыть меню';
  }

  closeMenu() {
    this.bodyElement.style.overflow = 'auto';
    this.burgerMenuElement.classList.remove(this.classMenuActive);
    this.burgerButtonElement.classList.remove(this.classBtnActive);
    this.burgerButtonElement.ariaLabel = 'Открыть меню';
    this.timer = setTimeout(() => {
      this.burgerMenuElement.classList.add(this.classVisibilityHidden);
    }, 300);
  }

  #manageMenu() {
    if (!this.burgerMenuElement.classList.contains(this.classMenuActive)) {
      this.openMenu();
      return;
    }
    this.closeMenu();
  }

  #setHandlerClose() {
    this.bodyElement.addEventListener('click', (ev) => {
      const isNotBurgerButton = ev.target !== this.burgerButtonElement;
      const isNotBurgerMenu = !this.burgerMenuElement.contains(ev.target);
      const isBurgerOpen = this.burgerMenuElement.classList.contains(this.classMenuActive);

      if (isBurgerOpen && isNotBurgerButton && isNotBurgerMenu) {
        this.closeMenu();
      }
    });
  }
}
