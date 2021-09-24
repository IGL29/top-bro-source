import BurgerMenu from './showBurgerMenu.js';
import './customCursor.js';

export default function shared() {

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
}
