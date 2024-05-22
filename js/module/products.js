import{processRequestDetails,ProductsRequests } from "./request_details.js"

//15.Devuelve un listado con todos los productos que pertenecen a
// la gama `Ornamentales` y que tienen más de `100` unidades en stock. 
//El listado deberá estar ordenado por su precio de venta, mostrando en
// primer lugar los de mayor precio.

export const getallProductsByGama= async() =>{
    let res = await fetch("http://172.16.101.146:5706/products?gama=Ornamentales")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        let { price_sale } = val 
        let stock= val.stock
        if (stock > 100 ){
            let productInf={
                nombre : val.name ,
                productCode : val.code_product,
                productstock : stock,
                productId : val.id,
                productPriceSale : val.price_sale
            }
            dataUpdate.push(productInf)
        }
    });
    dataUpdate.sort((a, b) => {
        return b.productPriceSale - a.productPriceSale;
    });
    

    return dataUpdate
}

//Crear el mapeo de códigos de producto a gama
export const getProductData = async () => {
    let res = await fetch("http://172.16.101.146:5706/products");
    let data = await res.json();

    // Crear un mapeo de code_product a gama
    let productMap = {};
    data.forEach(product => {
        productMap[product.code_product] = product.gama;
    });

    return productMap;
};


//2.11. Devuelve un listado de las diferentes gamas de producto que
// ha comprado cada cliente.
export const transformProductDictionary = async () => {
    // Obtener el diccionario de productos por cliente
    let productDictionary = await processRequestDetails();
    // Obtener el mapeo de productos a gamas
    let productMap = await getProductData();
    // Nuevo diccionario para almacenar los resultados transformados
    let gamaDictionary = {};
    // Iterar sobre el diccionario de productos por cliente
    for (let client in productDictionary) {
        let productCodes = productDictionary[client];
        let gamaSet = new Set(productCodes.map(productCode => productMap[productCode] || 'Herbales'));
        // Convertir el Set a un array y asignarlo al diccionario transformado
        gamaDictionary[client] = Array.from(gamaSet);
    }
    return gamaDictionary;
};

//3.8. Devuelve un listado de los productos que nunca han aparecido en un pedido.
export const getProductNotRequest = async () => {
    let res = await fetch("http://172.16.101.146:5706/products");
    let data = await res.json();
    let dataUpdate = [];
    
    let productsRequest = await ProductsRequests();

    data.forEach(val => {
        if (!productsRequest.has(val.code_product)) {
            dataUpdate.push({
                name: val.name,
                code: val.code_product
            });
        }
    });

    return dataUpdate;
};

//3.9. Devuelve un listado de los productos que nunca han aparecido en un pedido. 
//El resultado debe mostrar el nombre, la descripción y la imagen del producto.

export const getProductNotRequestAndDescription = async () => {
    let res = await fetch("http://172.16.101.146:5706/products");
    let data = await res.json();
    let dataUpdate = [];
    
    let productsRequest = await ProductsRequests();

    data.forEach(val => {
        let description = val.description || "Este producto no tiene descripción";
        if (!productsRequest.has(val.code_product)) {
            dataUpdate.push({
                name: val.name,
                description: description
            });
        }
    });

    return dataUpdate;
};
