export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// get data from local storage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// set data in local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set up click and touch event for an element
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

/**
 * Renderiza una lista usando un template literal
 * @param {Function} templateFn - Función que recibe un objeto y devuelve un string HTML
 * @param {HTMLElement} parentElement - Elemento donde se insertará el HTML
 * @param {Array} list - Lista de objetos a renderizar
 * @param {String} position - 'afterbegin', 'beforeend', etc. (default: 'afterbegin')
 * @param {Boolean} clear - Si true limpia el contenedor antes de insertar (default: false)
 */

// get URL parameters
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}
// Render a list of items using a template function
export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const response = await fetch(path);
  const template = await response.text();
  return template;
}


export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}
