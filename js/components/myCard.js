import { 
    getAllMadridClients, 
    getAllSpainClients 
} from "../module/clients.js";
import {
    getAllOficceAndcodeCity 
} from "../module/employees.js";

export class Mycard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = /*html*/`
            <link rel="stylesheet" href="../css/myCard.css">  
        `
    }
    async getAllMadridClientsDesign(){
        let data = await getAllMadridClients();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.client_name}</div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Codigo del empleado: </b>${val.code_employee_sales_manager}</p>
                            <p><b>Ciudad: </b>${val.city}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    async getAllSpainClientsDesign(){
        let data = await getAllSpainClients();
        data.forEach(val => {
            let money = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(val.limit_credit);
            this.shadowRoot.innerHTML += /*html*/`
            
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.code} </div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>Nombre: </b> ${val.name}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    async getAllOficceAndcodeCityDesign(){
        let data = await getAllOficceAndcodeCity();
        data.forEach(val => {
            this.shadowRoot.innerHTML += /*html*/`
            
                <div class="report__card">
                    <div class="card__title">
                        <div>${val.code_office} </div>
                    </div>
                    <div class="card__body">
                        <div class="body__marck">
                            <p><b>City: </b> ${val.kelly}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    static get observedAttributes() {
        return ["logic"];
    }
    attributeChangedCallback(name, old, now) {
        if(name=="logic" && now=="client_6") this.getAllMadridClientsDesign()
        if(name=="logic" && now=="client_16") this.getAllSpainClientsDesign()
        if(name=="logic" && now=="employ_12") this.getAllOficceAndcodeCityDesign()
    }
}
