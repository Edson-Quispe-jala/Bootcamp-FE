const template = document.createElement('template');
template.innerHTML = `
<style>
    .credential {
        display: flex;
        flex-direction: column;
        width: fit-content;
        background-color: white;
        text-align: center;
        color: white;
        border: 4px solid black;
    }
    header {
        background: white;
    }
    main {
        background: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        gap: 24px;
    }
    footer {
        background: red;
    }
    h1 {
        margin: 0;
    }
    .avatar {
        border-radius: 2rem;
    }
    .colors{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
</style>
<body>
    <section class="credential">
        <header>
            <img src="jalaLogo.png" alt="Logo" class="logo">
        </header>
        <main>
            <img alt="Avatar" class="avatar">
            <h1><slot name="name"></slot></h1>
        </main>
        <footer>
            <h2><slot name="role"></slot></h2>
        </footer>
    </section>
    <section class="colors">
        <div class="colorsMain">
            <span>main:</span>
            <slot name="colorsMain"></slot>
        </div>
        <div class="colorsFooter">
            <span>footer:</span>
            <slot name="colorsFooter"></slot>
        </div>
        <button id="applyColors">Apply Colors</button>
    </section>
</body>
`

class Credential extends HTMLElement {
    static observedAttributes = ['avatar'];
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'closed' });
        this._root.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const avatar = this.getAttribute('avatar');
        const avatarElement = this._root.querySelector('.avatar');
        avatarElement.src = avatar;
        const button = this._root.querySelector('#applyColors');
        button.addEventListener('click', () => {
            this.applyColors();
        });
    }
    
    applyColors() {
        const mainColorComponent = this.querySelector('color-component[slot="colorsMain"]');
        const footerColorComponent = this.querySelector('color-component[slot="colorsFooter"]');

        const mainColor = mainColorComponent.shadowRoot.querySelector('#colorPicker').value;
        const footerColor = footerColorComponent.shadowRoot.querySelector('#colorPicker').value;

        const main = this._root.querySelector('main');
        const footer = this._root.querySelector('footer');

        main.style.backgroundColor = mainColor;
        footer.style.backgroundColor = footerColor;
    }
}

customElements.define('credential-component', Credential);