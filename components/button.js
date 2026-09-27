class Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});

        this.shadowRoot.innerHTML = `
        
        <button
            type="submit"
            class="enviar inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onclick="cadastrarCarro()"
            value="Enviar"
          >
            Salvar
          </button>
        
        
        `
    }
}

customElements.define('botao', Button)