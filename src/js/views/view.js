import icons from 'url:../../img/icons.svg';
import fracty from 'fracty';

export default class View {
  _data;

  /**
   *Render received objects to the DOM
   * @param {Object | Object[]} data the data to be rendered (e.g Recipe)
   * @param {boolean} [render = true] if false create markup string instead of rendering to DOM
   * @returns {undefined | string} A markup string is returned if render is false
   * @this {object} view instance
   * @todo finish implementation
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElement = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    newElements.forEach((newEl, i) => {
      const currEl = currentElement[i];
      // console.log(currEl, newEl.isEqualNode(currEl));

      //updates changed text
      if (
        !newEl.isEqualNode(currEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log(newEl.firstChild.nodeValue.trim(), '🧒🧒🧒');
        currEl.textContent = newEl.textContent;
      }

      //updates changed attributes
      if (!newEl.isEqualNode(currEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          //this gives the changed attribute name like which attribute in order
          //to use setAttribute to set the value
          //setAttribute takes two arguments
          currEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    //this function is useful as reusable code if you have a parent element and you want the html to be clear before appending any element then you can set that parent element in any module or class like above and below and run it.
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
