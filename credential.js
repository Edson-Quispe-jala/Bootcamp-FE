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
    
</style>
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
`

class Credential extends HTMLElement {
    static observedAttributes = ['avatar'];
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const avatar = this.getAttribute('avatar');
        const avatarElement = this.shadowRoot.querySelector('.avatar');
        avatarElement.src = avatar;
    }
}

customElements.define('credential-component', Credential);