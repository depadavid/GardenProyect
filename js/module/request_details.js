import{getAllRequestByClient} from "./requests.js"
// M2.11. ayuda Se dan todos los codigos de cada producto que se compró en ese request
export const processRequestDetails = async () => {
    // Obtener los detalles de las solicitudes
    let res = await fetch("http://172.16.101.146:5707/request_details");
    let data = await res.json();
    
    // Obtener el diccionario de solicitudes por cliente
    let requestData = await getAllRequestByClient();

    // Nuevo diccionario para almacenar los resultados
    let productDictionary = {};

    // Iterar sobre los detalles de las solicitudes
    data.forEach(val => {
        // Verificar si el code_request coincide con alguno de los valores en requestData
        for (let client in requestData) {
            if (requestData[client].includes(val.code_request)) {
                // Si el cliente no está en el nuevo diccionario, agregarlo
                if (!productDictionary[client]) {
                    productDictionary[client] = [];
                }
                // Agregar el tipo de producto a la lista del cliente
                productDictionary[client].push(val.product_code);
                break; // Opcional: romper el bucle si se encuentra una coincidencia
            }
        }
    });

    // Retornar el nuevo diccionario
    return productDictionary;
};

//3.8 AYUDA conjunto con todos los productos que han sido pedidos 
export const ProductsRequests = async () => {
    // Obtener los detalles de las solicitudes
    let res = await fetch("http://172.16.101.146:5707/request_details");
    let data = await res.json();
    let productSet = new Set();

    // Iterar sobre los detalles de las solicitudes y agregar los códigos de productos al conjunto
    data.forEach(val => {
        productSet.add(val.product_code);
    });

    // Retornar el nuevo conjunto
    return productSet;
};
