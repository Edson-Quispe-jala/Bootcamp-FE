const templateColor = document.createElement('template');
templateColor.innerHTML = `
<style>
</style>
<body>
    <section class="button">
        <input type="color" id="colorPicker">
    </section>
</body>
`

class Color extends HTMLElement {
    static observedAttributes = ['color'];
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(templateColor.content.cloneNode(true));
    }

    connectedCallback() {
        const color = this.getAttribute('color');
        const colorElement = this.shadowRoot.querySelector('#colorPicker');
        colorElement.value = color;
        colorElement.addEventListener('input', () => {
            this.setAttribute('color', colorElement.value);
        });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'color') {
            const colorPicker = this.shadowRoot.querySelector('#colorPicker');

            if (colorPicker) {
                colorPicker.value = newValue;
            }

            const credential = this.parentElement;

            if (credential && credential.tagName.toLowerCase() === 'credential-component') {
                credential.applyColors();
            }
        }
    }
}

customElements.define('color-component', Color);