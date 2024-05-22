export class Mydetails extends HTMLElement {
    myCard
    marquee
    details
    static query
    constructor() {
        super();
        this.attachShadow({ mode: "open" })
        this.shadowRoot.innerHTML = /*HTML*/`
            <link rel="stylesheet" href="../css/myDetails.css">
            <details id="queryAboutTable7">
                <summary>
                    <div class="details__description">Campus: </div>
                    <div class="details__container">
                        <p><marquee behavior="" direction=""></marquee></p>
                    </div>
                </summary>
                <div class="report__container">
                    <my-card></my-card>
                </div>
            </details>
        `;
        this.myCard = this.shadowRoot.querySelector("my-card");
        this.marquee = this.shadowRoot.querySelector("marquee");
        this.details = this.shadowRoot.querySelector("details");
    }

    connectedCallback() {
        this.myCard.setAttribute("logic", Mydetails.query)
    }
    static get observedAttributes() {
        return ["logic", "text"]
    }
    attributeChangedCallback(name, old, now) {
        if (name == "logic") Mydetails.query = now
        if (name == "text") this.marquee.textContent = now
    }
}


/*<details id="queryAboutTable7">
    <summary>
        <div class="details__description">Campus: </div>
        <div class="details__container">
            <!-- <p>7. Devuelve el nombre de los clientes y el nombre de sus representantes junto con la ciudad de la oficina a la que pertenece el representante.</p> -->
            <p><marquee behavior="" direction="">Consultas sobre una tabla 6.Devuelve un listado con el nombre de los todos los clientes españoles.</marquee></p>
        </div>
    </summary>
    <div class="report__container"></div>
</details>*/