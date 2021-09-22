import BurgerMenu from './showBurgerMenu.js';
import setCursor from './setCursor.js';

function shared() {

  const bodyElement = document.getElementById('body');
  const burgerButtonElement = document.getElementById('burger-btn');
  const burgerMenuElement = document.getElementById('burger-menu');
  const classBtnActive = 'burger-btn--active';
  const classMenuActive = 'burger-menu--active';
  const classVisibilityHidden = 'burger-menu--visibility-hidden';

  const burgerMenu = new BurgerMenu({
    bodyElement,
    burgerButtonElement,
    burgerMenuElement,
    classBtnActive,
    classMenuActive,
    classVisibilityHidden
  });

  burgerMenu.createMenu();

  try {
    setCursor({ parentElement: bodyElement });
  } catch (err) {
    const cursorDisabledElements = document.getElementsByClassName('.no-cursor');
    for (element of cursorDisabledElements) {
      element.classList.remove('no-cursor');
    }
    bodyElement.style.cursor = 'initial';
    throw new Error(err);
  }
}

export default shared;
