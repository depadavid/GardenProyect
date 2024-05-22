import { getAllEmployeeNames } from "./employees.js";
import { getAllClientsWhoPaid } from "./payments.js";
import { getAllOffices,getAllOfficesByCity } from "./offices.js";
import { getAllClientsWhoRequest } from "./requests.js";
import { getAllRequestDetailsByRequestCode } from "./request_details.js";
import { getAllProductsByCode } from "./product.js"

//6. Devuelve un listado con el nombre de los todos los clientes españoles. 
export const getAllSpanishClients = async () => {
    let res = await fetch("http://172.16.101.146:5471/clients")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        if (val.country == "Spain") {
            dataUpdate.push({
                name: val.client_name,
            })
        }
    })
    return dataUpdate;
}

//Devuelve un listado con todos los clientes que sean de la ciudad de Madrid
//y cuyo representante de ventas tenga el código de empleado 11 o 30. 
export const getAllMadridClients = async () => {
    let res = await fetch("http://172.16.101.146:5471/clients?region=Madrid")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        let { code_employee_sales_manager } = val;
        if (code_employee_sales_manager == 11 || code_employee_sales_manager == 30) {
            dataUpdate.push(val)
        }
    })
    return dataUpdate
}

//1. Obten un listado con el nombre de cada cliente y el nombre y apellido de
//su representante de ventas. 
export const getAllClientsAndSalesManagersName = async () => {
    let res = await fetch("http://172.16.101.146:5471/clients")
    let client = await res.json();
    for (let i = 0; i < client.length; i++) {
        let { ...clientUpdate } = client[i];
        client[i] = clientUpdate;
        let [employee] = await getAllEmployeeNames(clientUpdate.code_employee_sales_manager);
        let { ...employeeUpdate } = employee;
        let data = { ...clientUpdate, ...employeeUpdate };
        client[i] = {
            "client_name": `${data.client_name}`,
            "sales_manager_complete_name": `${data.name} ${data.lastname1} ${data.lastname2}`
        }
    }
    return client;
}

//2. Muestra el nombre de los clientes que hayan realizado pagos
//junto con el nombre de sus representantes de ventas. 
export const getAllClientsAndSalesManagersNameAndIfThereIsPayments = async () => {
    let res = await fetch("http://172.16.101.146:5471/clients")
    let client = await res.json();
    let dataUpdated = [];
    for (let i = 0; i < client.length; i++) {
        let [payments] = await getAllClientsWhoPaid(client[i].client_code);
        if (payments != null) {
            let { ...paymentsUpdate } = payments;
            let { ...clientUpdate } = client[i];
            client[i] = clientUpdate;
            let [employee] = await getAllEmployeeNames(clientUpdate.code_employee_sales_manager);
            let { ...employeeUpdate } = employee;
            let data = { ...clientUpdate, ...employeeUpdate, ...paymentsUpdate };
            dataUpdated.push({
                "client_name": `${data.client_name}`,
                "sales_manager_complete_name": `${data.name} ${data.lastname1} ${data.lastname2}`
            })
        }
    }
    return dataUpdated;
}

//3. Muestra el nombre de los clientes que no hayan realizado pagos
//junto con el nombre de sus representantes de ventas. 
export const getAllClientsAndSalesManagersNameAndIfThereIsntPayments = async () => {
    let res = await fetch("http://172.16.101.146:5471/clients")
    let client = await res.json();
    let dataUpdated = [];
    for (let i = 0; i < client.length; i++) {
        let [payments] = await getAllClientsWhoPaid(client[i].client_code);

        if (payments === undefined) {
            let { ...clientUpdate } = client[i];
            client[i] = clientUpdate;
            let [employee] = await getAllEmployeeNames(clientUpdate.code_employee_sales_manager);
            let { ...employeeUpdate } = employee;
            let data = { ...clientUpdate, ...employeeUpdate };
            dataUpdated.push({
                "client_name": `${data.client_name}`,
                "sales_manager_complete_name": `${data.name} ${data.lastname1} ${data.lastname2}`
            })
        }
    }
    return dataUpdated;
}

//4. Devuelve el nombre de los clientes que han hecho pagos y el nombre de sus representantes
//junto con la ciudad de la oficina a la que pertenece el representante. 
export const getAllClientsAndSalesManagersNameAndIfThereIsPaymentsAndOfficeCity = async () => {
    let res = await fetch("http://172.16.101.146:5471/clients")
    let client = await res.json();
    let dataUpdated = [];
    for (let i = 0; i < client.length; i++) {
        let [payments] = await getAllClientsWhoPaid(client[i].client_code);
        if (payments != undefined) {
            let { ...paymentsUpdate } = payments;
            let { ...clientUpdate } = client[i];
            client[i] = clientUpdate;
            let [employee] = await getAllEmployeeNames(clientUpdate.code_employee_sales_manager);
            let { ...employeeUpdate } = employee;
            let [office] = await getAllOfficesByCity(employeeUpdate.code_office);
            let { ...officeUpdate } = office;
            let data = { ...clientUpdate, ...employeeUpdate, ...paymentsUpdate, ...officeUpdate };
            dataUpdated.push({
                "client_name": `${data.client_name}`,
                "sales_manager_complete_name": `${data.name} ${data.lastname1} ${data.lastname2}`,
                "office_city": `${data.city}`
            })
        }
    }
    return dataUpdated;
}

//5. Devuelve el nombre de los clientes que no hayan hecho pagos y el nombre de sus representantes
//junto con la ciudad de la oficina a la que pertenece el representante. 
export const getAllClientsAndSalesManagersNameAndIfThereIsntPaymentsAndOfficeCity = async () => {
    let res = await fetch("http://172.16.101.146:5471/clients")
    let client = await res.json();
    let dataUpdated = [];
    for (let i = 0; i < client.length; i++) {
        let [payments] = await getAllClientsWhoPaid(client[i].client_code);
        if (payments === undefined) {
            let { ...clientUpdate } = client[i];
            client[i] = clientUpdate;
            let [employee] = await getAllEmployeeNames(clientUpdate.code_employee_sales_manager);
            let { ...employeeUpdate } = employee;
            let [office] = await getAllOfficesByCity(employeeUpdate.code_office);
            let { ...officeUpdate } = office;
            let data = { ...clientUpdate, ...employeeUpdate, ...officeUpdate };
            dataUpdated.push({
                "client_name": `${data.client_name}`,
                "sales_manager_complete_name": `${data.name} ${data.lastname1} ${data.lastname2}`,
                "office_city": `${data.city}`
            })
        }
    }
    return dataUpdated;
}

//Obtener clientes en fuenlabrada
export const getAllClientsInFuenlabrada = async () => {
    let res = await fetch("http://172.16.101.146:5471/clients?city=Fuenlabrada")
    let data = await res.json();
    return data;
}

// 7. Devuelve el nombre de los clientes y el nombre de sus representantes
// junto con la ciudad de la oficina a la que pertenece el representante. 
export const getAllClientsAndSalesManagersNameWithTheCItyOfTheOffice = async () => {
    let res = await fetch("http://172.16.101.146:5471/clients")
    let client = await res.json();
    for (let i = 0; i < client.length; i++) {
        // Actualiza la data clientes eliminando identificadores que no queremos
        let {
            id: id_client,
            limit_credit,
            postal_code: postal_code_client,
            country: country_client,
            region: region_client,
            city,
            address2: address2_client,
            address1: address1_client,
            fax,
            phone,
            ...clientUpdate } = client[i]
        client[i] = clientUpdate
        // Realizamos la consulta al fucion modular de los empleados para buscar
        // la informacion del empleado segun su id de la data cliente anterior
        // buscada
        let [employee] = await getAllEmployeeNames(clientUpdate.code_employee_sales_manager)

        let {
            id: id_employee,
            extension,
            email,
            code_boss,
            position,
            ...employeeUpdate
        } = employee
        let [office] = await getAllOfficesByCity(employeeUpdate.code_office)
        let {
            id: id_office,
            country,
            region,
            postal_code,
            movil,
            address1,
            address2,
            ...officeUpdate
        } = office
        let data = { ...clientUpdate, ...employeeUpdate, ...officeUpdate }
        client[i] = {
            client_name: `${data.client_name}`,
            employees_full_name: `${data.name} ${data.lastname1} ${data.lastname2}`,
            employees_office_code: data.code_office,
            city_employees: data.city
        }

    }
    return client;
}

//obtener el cliente por el codigo
export const getAllClientsByCode = async (code) => {
    let res = await fetch(`http://172.16.101.146:5471/clients?client_code=${code}`)
    let data = await res.json();
    return data;
}

// 11. Devuelve un listado de las diferentes gamas de producto que ha comprado cada cliente.
export const getAllProductGamaThatAClientRequest = async () => {
    let clientes = await fetch("http://172.16.101.146:5471/clients").then(response => response.json());
    let ordenes = [];
    // Obtener todas las órdenes por cada cliente
    for (const val of clientes) {
        let { client_code } = val;
        let orden = await getAllClientsWhoRequest(client_code);
        orden.forEach((val, i) => {
            ordenes.push({
                codeClient: client_code,
                code_request: val.code_request
            });
        });
    }
    // Obtener detalles de cada orden y las gamas de productos correspondientes
    for (const val of ordenes) {
        let detalles = await getAllRequestDetailsByRequestCode(val.code_request);
        let codePdt = [];
        detalles.forEach(elmt => {
            codePdt.push(elmt.product_code);
        });
        ordenes[ordenes.indexOf(val)].codigo_producto = codePdt;
        let codigos = [...ordenes[ordenes.indexOf(val)].codigo_producto];
        let gamma = ordenes[ordenes.indexOf(val)].gamasDistintas = [];
        // Obtener gama de cada producto
        for (const elmt of codigos) {
            let [producto] = await getAllProductsByCode(elmt);
            if (producto != undefined) {
                if (!gamma.some(prot => prot == producto.gama)) {
                    gamma.push(producto.gama);
                }
            } else {
                gamma.push(`El código ${elmt} no existe`);
            }
        }
        ordenes[ordenes.indexOf(val)] = {
            codigoCliente: val.codeClient,
            gamasDistintas: val.gamasDistintas
        };
    }
    return ordenes;
};




export const getAllProductGamaThatAClientRequest1 = async () => {
    let res = await fetch("http://172.16.101.146:5471/clients");
    let data = await res.json();
    let dataUpdate = [];

    for (let client of data) {
        let requests = await getAllClientsWhoRequest(client.client_code);
        if (requests !== undefined) {
            let gamas = [];

            for (let request of requests) {
                let request_details = await getAllRequestDetailsByRequestCode(request.code_request);

                for (let request_detail of request_details) {
                    let product = await getAllProductsByCode(request_detail.product_code);

                    for (let prod of product) {
                        let exists = gamas.some(item => item.gama === prod.gama);
                        if (!exists) {
                            gamas.push({
                                gama: prod.gama
                            });
                        }
                    }
                }
            }
            let arrayFusionado = { ...client, gamas };
            dataUpdate.push(arrayFusionado);
        }
    }
    return dataUpdate;
};


//1. Devuelve un listado que muestre solamente los clientes que no han realizado ningún pago. O
export const getAllClientsWhoHaventPaid = async () => {
    let res = await fetch("http://172.16.101.146:5471/clients")
    let data = await res.json();
    let dataClient = [];
    for (let i = 0; i < data.length; i++) {
        let [payments] = await getAllClientsWhoPaid(data[i].client_code);
        if (payments === undefined) {
            dataClient.push(data[i]);
        }
    }
    return dataClient;
}

//2. Devuelve un listado que muestre solamente los clientes que no han realizado ningún pedido. 
export const getAllClientsWhoHaventRequest = async () => {
    let res = await fetch("http://172.16.101.146:5471/clients")
    let data = await res.json();
    let dataClient = [];
    for (let i = 0; i < data.length; i++) {
        let [requests] = await getAllClientsWhoRequest(data[i].client_code);
        if (requests === undefined) {
            dataClient.push(data[i]);
        }
    }
    return dataClient;
}

//3. Devuelve un listado que muestre los clientes que no han realizado ningún pago y los que no han realizado ningún pedido. 
export const getAllClientsWhoHaveNeitherPaidNorRequest = async () => {
    let res = await fetch("http://172.16.101.146:5471/clients")
    let data = await res.json();
    let dataClient = [];
    for (let i = 0; i < data.length; i++) {
        let [payments] = await getAllClientsWhoPaid(data[i].client_code);
        let [requests] = await getAllClientsWhoRequest(data[i].client_code);
        if (payments === undefined && requests === undefined) {
            dataClient.push(data[i]);
        }
    }
    return dataClient;
}

//obtener cliente por codigo de asesor de ventas
export const getAllClientsByManagerCode = async (code) => {
    let res = await fetch("http://172.16.101.146:5471/clients?code_employee_sales_manager=${code}")
    let data = await res.json();
    return data;
}

//11. Devuelve un listado con los clientes que han realizado algún pedido pero no han realizado ningún pago. 
export const getAllClientsWhoHaveRequestedButHaventPaid = async () => {
    let res = await fetch("http://172.16.101.146:5471/clients")
    let data = await res.json();
    let dataClient = [];
    for (let i = 0; i < data.length; i++) {
        let [payments] = await getAllClientsWhoPaid(data[i].client_code);
        let [requests] = await getAllClientsWhoRequest(data[i].client_code);
        if (payments === undefined && requests != undefined) {
            dataClient.push(data[i]);
        }
    }
    return dataClient;
}

//Obtener todos los clientes
export const getAllClients = async () => {
    let res = await fetch("http://172.16.101.146:5471/clients")
    let data = await res.json();
    return data;
}