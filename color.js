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
    }
}

customElements.define('color-component', Color);