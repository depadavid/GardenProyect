import { getAllClientsByCode, getAllClients } from "./client.js"
//7. Devuelve un listado con los distintos estados por los que puede pasar un pedido.
export const getAllRequestStatus = async () => {
    let res = await fetch("http://172.16.101.146:5538/requests")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        let exists = dataUpdate.some(item => item.status == val.status)
        if (!exists) dataUpdate.push({ status: val.status })
    })
    return dataUpdate;
}


//9. Devuelve un listado con el código de pedido, código de cliente, fecha esperada y
//fecha de entrega de los pedidos que no han sido entregados a tiempo.
export const getAllRequestsOutOfTime = async () => {
    let res = await fetch("http://172.16.101.146:5538/requests")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        let fecha1 = new Date(val.date_wait);
        let fecha2 = new Date(val.date_delivery);
        if (fecha2 > fecha1) {
            dataUpdate.push({
                code_request: val.code_request,
                code_client: val.code_client,
                date_wait: val.date_wait,
                date_delivery: val.date_delivery,
            })
        }
    })
    return dataUpdate;
}

//10. Devuelve un listado con el código de pedido, código de cliente, fecha esperada y fecha de entrega
//de los pedidos cuya fecha de entrega ha sido al menos dos días antes de la fecha esperada.
export const getAllRequestsWithTwoDaysOfAnticipation = async () => {
    let res = await fetch("http://172.16.101.146:5538/requests")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        let fecha1 = new Date(val.date_wait);
        let fecha2 = new Date(val.date_delivery);
        if (fecha2 < fecha1) {
            let diferenciaM = fecha1.getTime() - fecha2.getTime();
            let diferenciaD = diferenciaM / (1000 * 3600 * 24)
            if (diferenciaD >= 2 && val.date_delivery != null) {
                dataUpdate.push({
                    code_request: val.code_request,
                    code_client: val.code_client,
                    date_wait: val.date_wait,
                    date_delivery: val.date_delivery,
                })
            }
        }
    })
    return dataUpdate;
}

//11. Devuelve un listado de todos los pedidos que fueron rechazados en 2009.
export const getAllRequestsRejected2009 = async () => {
    let res = await fetch("http://172.16.101.146:5538/requests")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        let { date_request } = val;
        let [year] = date_request.split("-")
        let status = val.status;
        if (year == "2009" && status == "Rechazado") {
            dataUpdate.push(val)
        }
    })
    return dataUpdate;
}

//12. Devuelve un listado de todos los pedidos que han sido entregados en el mes de enero de cualquier año.
export const getAllRequestsDeliveredJanuary = async () => {
    let res = await fetch("http://172.16.101.146:5538/requests?status=Entregado")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        let fecha = new Date(val.date_delivery);
        let mes = fecha.getMonth()
        if (mes == 0) {
            dataUpdate.push(val);
        }
    })
    return dataUpdate;
}

// 10. Devuelve el nombre de los clientes a los que no se les ha entregado a tiempo un pedido.
export const getAllClientsWhoRecievedLateAProduct = async () => {
    let res = await fetch("http://172.16.101.146:5538/requests?status=Entregado");
    let dataRequest = await res.json();
    let dataClients = [];

    // Obtener todos los clientes
    let clients = await getAllClients();
    let clientsMap = new Map(clients.map(client => [client.client_code, client.client_name])); // Corregido clientsData a clients

    for (let i = 0; i < dataRequest.length; i++) {
        let fecha1 = new Date(dataRequest[i].date_wait);
        let fecha2 = new Date(dataRequest[i].date_delivery);
        if (fecha2 > fecha1) {
            let clientName = clientsMap.get(dataRequest[i].code_client);
            if (clientName) {
                let exists = dataClients.some(item => item.client_name === clientName);
                if (!exists) {
                    dataClients.push({
                        "client_name": clientName,
                    });
                }
            }
        }
    }
    return dataClients;
};

export const getAllClientsWhoRequest = async (code) => {
    let res = await fetch(`http://172.16.101.146:5538/requests?code_client=${code}`)
    let data = await res.json();
    return data;
}

export const getAllOrdersByClientCode = async (code = "") => {
    let res = await fetch("http://172.16.101.146:5538/requests?code_client=${code}").then(res => res.json());
    return res
}