// 13 Devuelve un listado con todos los pagos que se realizaron en el 
// año 2008 mediante Paypal. Ordene el resultado de mayor a menor.

export const getallPaymentFromPayPalEachYear = async() =>{
    let res = await fetch("http://172.16.101.146:5705/payments?payment=PayPal")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        let { date_payment } = val 
        let [year] =  date_payment.split("-")
        if(year == "2008"){
            dataUpdate.push(val)
        }
    });
    dataUpdate.sort((a, b) => {
        const dateA = new Date(a.date_payment);
        const dateB = new Date(b.date_payment);
        return dateB - dateA;
    });

    return dataUpdate
}

//14.Devuelve un listado con todas las formas de pago que aparecen en 
//la tabla `pago`. Tenga en cuenta que no deben aparecer formas de pago repetidas.

export const getallPaymentForms = async() =>{
    let res = await fetch("http://172.16.101.146:5705/payments?payment")
    let data = await res.json();
    let getTime = new Set();

    data.forEach(val => {
    
            let FormasPago = val.payment
            if (FormasPago ) {
                let requestInfo = (
                    FormasPago
                );
                getTime.add(requestInfo);
        
        
    }});

    return getTime;
}

// M.2 Ayuda Devuelve un conjunto con el codigo de cada cliente que hizo un pago 
export const getallPayClients = async() =>{
    let res = await fetch("http://172.16.101.146:5705/payments?payment")
    let data = await res.json();
    let getTime = new Set();

    data.forEach(val => {
    
            let codeClients = val.code_client
            if (codeClients ) {
                let requestInfo = (
                    codeClients
                );
                getTime.add(requestInfo);
           
        
    }});

    return getTime;
}