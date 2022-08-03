class ToDoForm extends HTMLElement {
  #button = null;
  #input = null;

  constructor() {
    super();

    this.render();
  }

  connectedCallback() {
    this.#button.addEventListener('click', this.onAddClickListener);
  }

  disconnectedCallback() {
    this.#button.removeEventListener('click', this.onAddClickListener);
  }

  onAddClickListener = () => {
    this.dispatchEvent(
      new CustomEvent('onItemAdded', {
        bubbles: true,
        detail: {
          text: this.#input.value,
        },
      })
    );

    this.#input.value = '';
  };

  render() {
    // Create form controls
    const input = document.createElement('input');
    input.setAttribute('type', 'text');

    const button = document.createElement('button');
    button.textContent = 'Add';

    this.#button = button;
    this.#input = input;

    // Add the elements

    this.appendChild(input);
    this.appendChild(button);
  }
}

class ToDoList extends HTMLElement {
  #items = [];

  constructor() {
    super();

    this.render();
  }

  connectedCallback() {
    window.addEventListener('onItemAdded', this.onItemAddedListener);
  }

  disconnectedCallback() {
    window.removeEventListener('onItemAdded', this.onItemAddedListener);
  }

  onItemAddedListener = (event) => {
    const newItem = event.detail.text.trim();

    if (newItem.length > 0) {
      this.#items.push(newItem);
    }

    this.render();
  };

  render() {
    // Conditional rendering
    if (this.#items.length === 0) {
      this.innerHTML = '<span>No hay nada que mostrar :(</span>';
    } else {
      const liHtml = this.#items.map((item) => `<li>${item}</li>`).join('');
      this.innerHTML = `<ul>${liHtml}</ul>`;
    }
  }
}

window.customElements.define('to-do-form', ToDoForm);
window.customElements.define('to-do-list', ToDoList);
