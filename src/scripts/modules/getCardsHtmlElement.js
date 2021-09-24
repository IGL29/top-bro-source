import customCursor from './customCursor.js';
import templateCardBlogger from "./templates/templateCardBlogger";

export default function getCardsHtmlElement(bloggersData) {
  let cardElements = [];

  for (const bloggerData of bloggersData) {
    const templateCard = templateCardBlogger(bloggerData);
    const htmlElement = new DOMParser().parseFromString(templateCard, "text/html");
    const cardHtmlElement = htmlElement.querySelector('.bloger-item-js');

    // try {
      customCursor.setCursorPointer(cardHtmlElement);
    // } catch (err) {
    //   debugger
    //   const cursorDisabledElement = cardHtmlElement.querySelector('.no-cursor');
    //   cursorDisabledElement.classList.remove('no-cursor');
    //   document.body.style.cursor = 'initial';
    // }

    cardElements.push(cardHtmlElement);
  }
  return cardElements;
}
