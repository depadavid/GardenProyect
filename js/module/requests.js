//7. Devuelve un listado con los distintos estados por los que puede pasar un pedido.export const getAll = async() => {
    export const getAll = async() => {    
        let res = await fetch("http://172.16.101.146:5708/requests")
        let data = await res.json();
        let dataUpdate =  data.map(val =>(val.status
        ))
        
        const conjuntos = new Set(dataUpdate);
    return conjuntos;
    }
    
    // 8. Devuelve un listado con el código de cliente de aquellos 
    //clientes que realizaron algún pago en 2008. Tenga en cuenta 
    //que deberá eliminar aquellos códigos de cliente que aparezcan
    //repetidos. Resuelva la consulta:
    
    export const getAllClientsYear = async() => {
        let res = await fetch("http://172.16.101.146:5708/requests")
        let data = await res.json();
        let YearRequest = new Set ()
        data.forEach(val => {
            let year = val.date_request.split("-")[0];
            if (year==="2008") {
                YearRequest.add(val.code_client);
            }
        });
    
        return YearRequest }
    
    
    //9. Devuelve un listado con el código de pedido, código de 
    //cliente, fecha esperada 
    //y fecha de entrega de los pedidos que no han sido entregados
    // a tiempo.  
    
    export const getAllRequestByTime = async () => {
        let res = await fetch("http://172.16.101.146:5708/requests");
        let data = await res.json();
        let getTime = new Set();
    
        data.forEach(val => {
            if (val.date_wait && val.date_delivery) { // Se chequea que tenga un valor 
                let monthWait = val.date_wait.split("-")[1];
                let dayWait = val.date_wait.split("-")[2];
    
                let monthDelivery = val.date_delivery.split("-")[1];
                let dayDelivery = val.date_delivery.split("-")[2];
    
                if (monthWait === monthDelivery && dayWait < dayDelivery) {
                    let requestInfo = {
                        requestCode: val.code_request,
                        clientCode: val.code_client,
                        dateWait: val.date_wait,
                        dateDelivery: val.date_delivery
                    };
                    getTime.add(requestInfo);
                }
            }
        });
    
        return getTime;
    }
    
    //10. Devuelve un listado con el código de pedido, código de cliente,
    // fecha esperada y fecha de entrega de los pedidos cuya fecha de 
    //entrega ha sido al menos dos días antes de la fecha esperada.
    export const getAllRequestByTimeDays = async () => {
        let res = await fetch("http://172.16.101.146:5708/requests");
        let data = await res.json();
        let getTime = new Set();
    
        data.forEach(val => {
            if (val.date_wait && val.date_delivery) { // Se chequea que tenga un valor 
                let monthWait = val.date_wait.split("-")[1];
                let dayWait = val.date_wait.split("-")[2];
    
                let monthDelivery = val.date_delivery.split("-")[1];
                let dayDelivery = val.date_delivery.split("-")[2];
    
                if (monthWait === monthDelivery && (dayDelivery-dayWait)>2) {
                    let requestInfo = {
                        requestCode: val.code_request,
                        clientCode: val.code_client,
                        dateWait: val.date_wait,
                        dateDelivery: val.date_delivery
                    };
                    getTime.add(requestInfo);
                }
            }
        });
    
        return getTime;
    }
    //11. Devuelve un listado de todos los pedidos que fueron
    // **rechazados** en `2009`.
    export const getAllRequestByYear = async () => {
        let res = await fetch("http://172.16.101.146:5708/requests");
        let data = await res.json();
        let getTime = new Set();
    
        data.forEach(val => {
        
                let yearRequest = val.date_request.split("-")[0];
                let statusRequest = val.status
    
    
                if (yearRequest === "2009" && statusRequest==="Rechazado" ) {
                    let requestInfo = {
                        codigoPedido: val.code_request,
                    };
                    getTime.add(requestInfo);
                }
            
        });
    
        return getTime;
    }
    
    //12.Devuelve un listado de todos los pedidos
    //que han sido **entregados** en el mes de enero de cualquier año.
    export const getAllRequestByMonth = async () => {
        let res = await fetch("http://172.16.101.146:5708/requests");
        let data = await res.json();
        let getTime = new Set();
    
        data.forEach(val => {
        
                let monthRequest = val.date_delivery.split("-")[1];
                let statusRequest = val.status
    
    
                if (monthRequest === "01" && statusRequest==="Entregado" ) {
                    let requestInfo = {
                        codigoPedido: val.code_request,
                        fechaentrega: val.date_delivery
                    };
                    getTime.add(requestInfo);
                }
            
        });
    
        return getTime;
    }
    
    //M11. Ayuda Devuelve los pedidos de cada cliente
    export const getAllRequestByClient = async () => {
        let res = await fetch("http://172.16.101.146:5708/requests");
        let data = await res.json();
    
        let requestDictionary = {};
    
        data.forEach(val => {
            // Si el código de cliente ya existe en el diccionario, agregamos el número de pedido a la lista existente
            if (requestDictionary.hasOwnProperty(val.code_client)) {
                requestDictionary[val.code_client].push(val.code_request);
            } else { // Si el código de cliente no existe, creamos una nueva lista con el número de pedido
                requestDictionary[val.code_client] = [val.code_request];
            }
        });
    
        return requestDictionary;
    }
    
    