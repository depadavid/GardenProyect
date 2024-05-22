import{getallDataEmployeeByCode, getEmployeesByCode } from "./employees.js"
import {getallPayClients} from "./payments.js"
import {getOfficesByCode} from "./offices.js"
import {getAllRequestByTime, getAllRequestByClient} from "./requests.js"

//16Devuelve un listado con todos los clientes que sean de la ciudad de Madrid
// y cuyo representante de ventas tenga el código de empleado 11 o 30.

export const getAllMadridClients = async() =>{
    let res = await fetch("http://localhost:5501/clients?city=Madrid")
    let data = await res.json();
    let dataUpdate = [];
    dataUpdate=data.filter(val=> val.code_employee_sales_manager==11 || val.code_employee_sales_manager==30)
    return dataUpdate
}


//6. Devuelve un listado con el nombre de los todos los clientes españoles.
export const getAllSpainClients = async() => {
    let res = await fetch("http://localhost:5501/clients?country=Spain")
    let data = await res.json();
    let dataUpdate = data.map(val =>{ 
        return {
            name:`${val.contact_name} ${val.contact_lastname} `
        }
})
return dataUpdate;
}

//2.1. Obtén un listado con el nombre de cada cliente y el nombre y apellido de su representante de ventas.
export const getAllClientsAndEmployees = async () => {
    let res = await fetch("http://localhost:5501/clients");
    let data = await res.json();

    let dataUpdate = [];
    for (let val of data) {
        let codeEmployee = val.code_employee_sales_manager;
        let employeeData = await getallDataEmployeeByCode(codeEmployee);

        dataUpdate.push({
            clientName: `${val.contact_name} ${val.contact_lastname}`,
            employeeName: `${employeeData.name} ${employeeData.fullLastname}`,
            employeeCode: `${employeeData.employeeCode}`
        });
    }
    
    return dataUpdate;
};

//2.2. Muestra el nombre de los clientes que hayan realizado pagos junto con el nombre de sus representantes de ventas.

export const getAllPAyClientsAndEmployees = async () => {
    let res = await fetch("http://localhost:5501/clients");
    let data = await res.json();

    let dataUpdate = [];
    for (let val of data) {
        let codeEmployee = val.code_employee_sales_manager;
        let codeClients = await getallPayClients();
        let employeeData = await getallDataEmployeeByCode(codeEmployee);

        if (codeClients.has(val.client_code)){
        dataUpdate.push({
            clientName: `${val.contact_name} ${val.contact_lastname}`,
            employeeName: `${employeeData.name} ${employeeData.fullLastname}`
        })};
    }
    
    return dataUpdate;
};

//2.3. Muestra el nombre de los clientes que **no** hayan realizado pagos
// junto con el nombre de sus representantes de ventas.

export const getAllNotPAyClientsAndEmployees = async () => {
    let res = await fetch("http://localhost:5501/clients");
    let data = await res.json();

    let dataUpdate = [];
    for (let val of data) {
        let codeEmployee = val.code_employee_sales_manager;
        let codeClients = await getallPayClients();
        let employeeData = await getallDataEmployeeByCode(codeEmployee);

        if (!codeClients.has(val.client_code)){
        dataUpdate.push({
            clientName: `${val.contact_name} ${val.contact_lastname}`,
            employeeName: `${employeeData.name} ${employeeData.fullLastname}`
        })};
    }
    
    return dataUpdate;
};

//2.4. Devuelve el nombre de los clientes que han hecho pagos y el nombre de
// sus representantes junto con la ciudad de la oficina a la que pertenece el representante.
export const getAllPAyClientsAndEmployeesCity = async () => {
    let res = await fetch("http://localhost:5501/clients");
    let data = await res.json();

    let dataUpdate = [];
    for (let val of data) {
        let codeEmployee = val.code_employee_sales_manager;
        let codeClients = await getallPayClients();
        let [employeeData] = await getEmployeesByCode(codeEmployee);
        let [dataOffice] = await getOfficesByCode(employeeData.code_office);

        if (codeClients.has(val.client_code)) {
            dataUpdate.push({
                clientId: val.client_code,
                clientName: `${val.contact_name} ${val.contact_lastname}`,
                employeeName: `${employeeData.name} ${employeeData.lastname1} ${employeeData.lastname2}`,
                cityOffice: dataOffice.city
           });
        }
       
    }
    return dataUpdate;
    
};

//2.5. Devuelve el nombre de los clientes que **no** hayan hecho pagos y el nombre de
// sus representantes junto con la ciudad de la oficina a la que 
//pertenece el representante.

export const getAllNotPAyClientsAndEmployeesCity = async () => {
    let res = await fetch("http://localhost:5501/clients");
    let data = await res.json();

    let dataUpdate = [];
    for (let val of data) {
        let codeEmployee = val.code_employee_sales_manager;
        let codeClients = await getallPayClients();
        let [employeeData] = await getEmployeesByCode(codeEmployee);
        let [dataOffice] = await getOfficesByCode(employeeData.code_office);

        if (!codeClients.has(val.client_code)) {
            dataUpdate.push({
                clientId: val.client_code,
                clientName: `${val.contact_name} ${val.contact_lastname}`,
                employeeName: `${employeeData.name} ${employeeData.lastname1} ${employeeData.lastname2}`,
                cityOffice: dataOffice.city
            });
        }
       
    }
    return dataUpdate;
    
};

//2.6 Devuelve una lista de empleados que tienen clientes en fuenlabrada
export const getEmployeeCodeByCity = async()=>{
    let res = await fetch("http://localhost:5501/clients?city=Fuenlabrada");
    let data = await res.json();
    let dataUpdate = new Set();
    data.forEach(function(code){
        dataUpdate.add({
            nombre: code.client_name, 
            codigo: code.code_employee_sales_manager}
        )
    });
    return dataUpdate
}

// 2.7. Devuelve el nombre de los clientes y el nombre de sus representantes junto
// con la ciudad de la oficina a la que pertenece el representante.
export const getAllClientsAndEmployeesCity = async () => {
    let res = await fetch("http://localhost:5501/clients");
    let data = await res.json();
    let dataUpdate = [];

    for (let val of data) {
        let codeEmployee = val.code_employee_sales_manager;
        let [employeeData] = await getEmployeesByCode(codeEmployee);
        let [dataOffice] = await getOfficesByCode(employeeData.code_office);

        
            dataUpdate.push({
                clientId: val.client_code,
                clientName: `${val.contact_name} ${val.contact_lastname}`,
                employeeName: `${employeeData.name} ${employeeData.lastname1}`,
                cityOffice: dataOffice.city
            });
    }
    return dataUpdate;
    
};

//2.10  Devuelve el nombre de los clientes a los que no se les ha entregado a 
//tiempo un pedido.

export const getAllClientsByDeliveryDate = async () => {
    let res = await fetch("http://localhost:5501/clients");
    let data = await res.json();

    let dataUpdate = [];
    let processedClients = new Set(); // Conjunto para rastrear los clientes procesados

    for (let val of data) {
        let codeClient = val.client_code;
        let requestData = await getAllRequestByTime();

        // Verifica si el cliente ya ha sido procesado
        if (!processedClients.has(codeClient)) {
            for (let client of requestData) {
                if (client.clientCode === codeClient) {
                    dataUpdate.push({
                        clientId: val.client_code,
                        clientName: `${val.contact_name} ${val.contact_lastname}`,
                    });

                    // Agrega el código del cliente al conjunto de clientes procesados
                    processedClients.add(codeClient);
                    break; // Sal del bucle interno una vez que se haya encontrado el cliente
                }
            }
        }
    }
    return dataUpdate;
};


// 3.1. Devuelve un listado que muestre solamente los clientes que no 
//han realizado ningún pago.
export const getAllNotPAyClients = async () => {
    let res = await fetch("http://localhost:5501/clients");
    let data = await res.json();

    let dataUpdate = [];
    for (let val of data) {
        let codeClients = await getallPayClients();
        if (!codeClients.has(val.client_code)){
        dataUpdate.push({
            clientName: `${val.contact_name} ${val.contact_lastname}`,
            idClient: val.client_code
        })};
    }
    
    return dataUpdate;
};

//3.2. Devuelve un listado que muestre solamente los clientes que no
// han realizado ningún pedido.
export const getAllNotRequestClients = async () => {
    let res = await fetch("http://localhost:5501/clients");
    let data = await res.json();

    let dataUpdate = [];
    let requestDictionary = await getAllRequestByClient();
    
    for (let val of data) {
        if (!requestDictionary.hasOwnProperty(val.client_code)){
            dataUpdate.push({
                clientName: `${val.contact_name} ${val.contact_lastname}`,
                idClient: val.client_code
            });
        }
    }
    
    return dataUpdate;
};


// 3.3. Devuelve un listado que muestre los clientes que no han 
//realizado ningún pago y los que no han realizado ningún pedido.
export const getClientsWithoutPaymentsAndRequests = async () => {
    // Obtén clientes sin pagos
    const clientsWithoutPayments = await getAllNotPAyClients();
    // Obtén clientes sin pedidos
    const clientsWithoutRequests = await getAllNotRequestClients();
    // Combina los resultados de ambas funciones
    const combinedClients = clientsWithoutPayments.concat(clientsWithoutRequests);
    // Elimina duplicados si es necesario
    const uniqueClients = combinedClients.filter((client, index, self) =>
        index === self.findIndex((c) => (
            c.clientName === client.clientName
        ))
    );

    return uniqueClients;
};

//3.11 AYUDA se buscan los clientes que si hayan realizado pedidos
export const getAllRequestClient = async () => {
    let res = await fetch("http://localhost:5501/clients");
    let data = await res.json();

    let dataUpdate = [];
    let requestDictionary = await getAllRequestByClient();
    
    for (let val of data) {
        if (!requestDictionary.hasOwnProperty(val.client_code)){
            dataUpdate.push({
                clientName: `${val.contact_name} ${val.contact_lastname}`,
            });
        }
    }
    
    return dataUpdate;
};

//3.11. Devuelve un listado con los clientes que han realizado algún pedido pero no 
//han realizado ningún pago.

export const getAllRequestClientsButNotPay = async () => {
    let dataUpdate = [];
    const clientsWithoutPayments = await getAllNotPAyClients();
    const clientsWithRequests = await getAllRequestClient();
   
    for (let a of clientsWithRequests) {
        let found = false;
        for (let b of clientsWithoutPayments) {
            if (a.clientName === b.clientName) {
                found = true;
                break;
            }
        }
        // Si no se encontró el cliente en la lista de clientes sin pagos, se agrega a dataUpdate
        if (!found) {
            dataUpdate.push({
                clientName: a.clientName
            });
        }
    }
    
    return dataUpdate;
};
