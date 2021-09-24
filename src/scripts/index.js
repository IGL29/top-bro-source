import shared from './modules/shared.js';
import loadingCards from './modules/loadingCards.js';
import Select from './modules/Select.js';

const bodyElement = document.getElementById('body');
const selectDirection = new Select({ selectId: 'select-direction', bodyElement });
const selectArea = new Select({ selectId: 'select-area', bodyElement });

shared();

loadingCards();

selectDirection.setSelectHandlers();
selectArea.setSelectHandlers();
