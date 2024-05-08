import { 
    getEmployByCode 
} from "./employees.js";

import { 
    getOfficesByCode
} from "./offices.js";

// 8. Devuelve un listado con el código de cliente de aquellos clientes 
// que realizaron algún pago en 2008. Tenga en cuenta que deberá eliminar 
// aquellos códigos de cliente que aparezcan repetidos. 
// Resuelva la consulta:

export const getAll2 = async()=>{
    let res = await fetch("http://localhost:5501/clients")
    let data = await res.json();
    data.filter(val=>{
        // if(val.)
    })
    return data;
}


// Obtener la informacion de un empleado por su codigo
export const getAllClients = async() =>{
    let res = await fetch(`http://localhost:5501/clients`);
    let data = await res.json();
    return data;
}

// Consultas multitabla (Composición interna)

// 7. Devuelve el nombre de los clientes y el nombre de sus representantes 
// junto con la ciudad de la oficina a la que pertenece el representante.
export const getClientsEmploy = async() =>{
    let res = await fetch("http://localhost:5501/clients");
    let clients = await res.json();
    for (let i = 0; i < clients.length; i++) {
        let {
            client_code,
            contact_name,
            contact_lastname,
            phone,
            fax,
            address1:address1Client,
            address2:address2Client,
            city,
            region:regionClients,
            country:countryClients,
            postal_code:postal_codeClients,
            limit_credit,
            id:idClients,
            ...clientsUpdate
        } = clients[i];

        let [employ] = await getEmployByCode(clientsUpdate.code_employee_sales_manager)
        let {
            extension,
            email,
            code_boss,
            position,
            id:idEmploy,
            name,
            lastname1,
            lastname2,
            employee_code,
            ...employUpdate
        } = employ

        let [office] = await getOfficesByCode(employUpdate.code_office)

        let {
            country:countryOffice,
            region:regionOffice,
            postal_code:postal_codeOffice,
            movil,
            address1:address1Office,
            address2:address2Office,
            id:idOffice,
            ...officeUpdate
        } = office


        let data = {...clientsUpdate, ...employUpdate, ...officeUpdate};
        let {
            code_employee_sales_manager,
            code_office,
            ...dataUpdate       
        }=data;

        dataUpdate.name_employee = `${name} ${lastname1} ${lastname2}`
        clients[i] = dataUpdate
    }
    // [
    //     {
    //         city: "San Francisco"
    //         client_name : "GoldFish Garden"
    //         name_employee: "Walter Santiago Sanchez Lopez"
    //     }
    // ]
    return clients;
}
// 16. Devuelve un listado con todos los clientes que sean de la ciudad de Madrid 
// y cuyo representante de ventas tenga el código de empleado 11 o 30.
export const getAllClientsFromSpainAndRepresentative11Or30 = async ()=> {
    let res = await fetch ("http://localhost:5501/clients?city=Madrid")
    let data = await res.json()
    let dataUpdate = []

    data.forEach(client => {

        if (client.code_employee_sales_manager == '11' || client.code_employee_sales_manager == '30'){
            dataUpdate.push(client)
        }

    })
    
    return dataUpdate

}