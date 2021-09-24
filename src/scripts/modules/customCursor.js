import Cursor from './Cursor.js';

const bodyElement = document.querySelector('body');
const customCursor = new Cursor(bodyElement);

customCursor.appendCursor();
customCursor.setCursorPointer();

export default customCursor;
