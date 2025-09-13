// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localStorage
export function getLocalStorage(key) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

// save data to localStorage
export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get URL query parameter by name
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

/**
 * Renderiza una lista usando un template literal
 * @param {Function} templateFn - Función que recibe un objeto y devuelve un string HTML
 * @param {HTMLElement} parentElement - Elemento donde se insertará el HTML
 * @param {Array} list - Lista de objetos a renderizar
 * @param {String} position - 'afterbegin', 'beforeend', etc. (default: 'afterbegin')
 * @param {Boolean} clear - Si true limpia el contenedor antes de insertar (default: false)
 */
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (!parentElement) return;
  if (clear) parentElement.innerHTML = "";
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
