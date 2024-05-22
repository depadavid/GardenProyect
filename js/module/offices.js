import { getAllClientsInFuenlabrada } from "./client.js"
import { getAllEmployeeNames } from "./employees.js"

// 1. Devuelve un listado con el código de oficina y la ciudad 
// donde hay oficinas.
export const getAllOficceAndCodeCity = async () => {
    let res = await fetch("http://172.16.101.146:5534/offices")
    let data = await res.json();
    let dataUpdate = data.map(val => {
        return {
            code_office: val.code_office,
            city: val.city
        }
    })
    return dataUpdate;
}
// 2. Devuelve un listado con la ciudad y el teléfono de las oficinas de España.
export const getAllOficceCityAndMovil = async () => {
    let res = await fetch("http://172.16.101.146:5534/offices?country=España")
    let data = await res.json();
    let dataUpdate = data.map(val => {
        return {
            code_office: val.code_office,
            movil: val.movil
        }
    })
    return dataUpdate
}

//obtener el nombre de la ciudad de la oficina
export const getAllOfficesByCity = async (codeOffice) => {
    let res = await fetch(`http://172.16.101.146:5534/offices?code_office=${codeOffice}`)
    let data = await res.json();
    return data;
}


// Obtener datos de todos los clientes
export const getAllOffices = async () => {
    let resOffices = await fetch("http://172.16.101.146:5534/offices");
    return await resOffices.json();
};


//6. Lista la dirección de las oficinas que tengan clientes en Fuenlabrada.
export const getAllOfficesAddressWithClientsInFuenlabrada = async () => {
    let res = await fetch("http://172.16.101.146:5534/offices")
    let offices = await res.json();
    let dataUpdate = [];
    for (let i = 0; i < offices.length; i++) {
        let [clients] = await getAllClientsInFuenlabrada();
        let {
            address1: client_address1,
            address2: client_address2,
            ...clientsUpdate } = clients;
        clients = clientsUpdate
        let [employee] = await getAllEmployeeNames(clientsUpdate.code_employee_sales_manager);
        if ((employee.code_office == offices[i].code_office) === true) {
            let { ...employeeUpdate } = employee;
            //console.log((employee.code_office == offices[i].code_office)===true)
            //HAY UN ERROR AQUI
            //EL ERROR SE BASA EN QUE HACEN CONFLICTO LA DIRECCION DEL CLIENTE Y LA DIRECCION DE LA OFICINA
            //POR ESO CUANDO SE INTENTA IMPRIMIR SOLO TIRA UNA DIRECCION PERO NO COINCIDE CON LA DIRECCION DE NINGUNA OFICINA
            let { ...officesUpdate } = offices[i];
            offices[i] = officesUpdate;
            //console.log(officesUpdate)
            let data = { ...clientsUpdate, ...employeeUpdate, ...officesUpdate };
            dataUpdate.push({
                "code_office": `${data.code_office}`,
                "Address": `${data.address1} ${(data.office_address2) ? data.office_address2 : ""}`
            })
        }
    }
    return dataUpdate;
}
