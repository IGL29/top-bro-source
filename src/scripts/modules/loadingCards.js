import regeneratorRuntime from "regenerator-runtime";
import fetch from './fetch.js';
import getCardsHtmlElement from './getCardsHtmlElement.js';
import showErrorMessage from './showErrorMessage.js';

const listElements = document.getElementById('bloggers-list');
const loaderCardsElement = document.getElementById('loader-cards');
const bloggersSectionElement = document.querySelector('.bloggers');

export default async function loadingCards() {
  const data = await getCardsData();
  addCardsOnPage(data, setObserver);
}

async function getCardsData() {
  showLoader(loaderCardsElement);

  const data = await fetch()
    .then((response) => {
      hideLoader(loaderCardsElement);
      return JSON.parse(response)
    })
    .catch(() => {
      hideLoader(loaderCardsElement);
      showErrorMessage({
        text: 'Произошла ошибка при загрузке',
        containerElement: bloggersSectionElement,
        request: getCardsData
      });
    });
  return data;
}

function showLoader(loaderElement) {
  loaderElement.classList.remove('loader--hide');
}

function hideLoader(loaderElement) {
  loaderElement.classList.add('loader--hide');
}

function addCardsOnPage(data, callback) {
  const cardElements = getCardsHtmlElement(data.data);

  for (const card of cardElements) {
    listElements.append(card);
  }

  if (callback) {
    callback();
  }
}

function setObserver() {
  const lastElement = listElements.children[listElements.children.length - 1];

  const observer = new IntersectionObserver(callback, options);
  observer.observe(lastElement);
}

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
}

const callback = async function (entries, observer) {

  const targetElement = entries[0].target;
  const isNotIntersecting = !entries[0].isIntersecting;

  if (isNotIntersecting) {
    return;
  }
  observer.unobserve(targetElement);
  loadingCards();
}
