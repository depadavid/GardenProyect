//8. Devuelve un listado con el código de cliente de aquellos clientes que realizaron algún pago en 2008.
//Tenga en cuenta que deberá eliminar aquellos códigos de cliente que aparezcan repetidos. 
export const getAllClientCodesOfPaymentsIn2008 = async () => {
    let res = await fetch("http://172.16.101.146:5535/payments")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        let include = val.date_payment.includes("2008")
        if (include) {
            let exists = dataUpdate.some(item1 => item1.code_client == val.code_client);
            if (!exists) {
                dataUpdate.push({
                    code_client: val.code_client
                })
            }
        }
    })
    return dataUpdate;
}

//13. Devuelve un listado con todos los pagos que se realizaron en el año 2008 mediante Paypal.
//Ordene el resultado de mayor a menor.
export const getAllPaymentsFromPayPalEachYear = async () => {
    let res = await fetch("http://172.16.101.146:5535/payments?payment=PayPal")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        let { date_payment } = val
        let [year] = date_payment.split("-")
        if (year == "2008") {
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

//14. Devuelve un listado con todas las formas de pago que aparecen en la tabla pago.
//Tenga en cuenta que no deben aparecer formas de pago repetidas.
export const getAllPaymentMethods = async () => {
    let res = await fetch("http://172.16.101.146:5535/payments")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        let { payment } = val;
        if (!dataUpdate.some(item => item.payment_method === val.payment)) {
            dataUpdate.push({
                payment_method: payment
            })
        }
    })
    return dataUpdate
}

//Obtener si el cliente ha realizado pagos
export const getAllClientsWhoPaid = async (code) => {
    let res = await fetch(`http://172.16.101.146:5535/payments?code_client=${code}`)
    let data = await res.json();
    return data;

}