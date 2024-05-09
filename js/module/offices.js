// 1. Devuelve un listado con el código de oficina y la ciudad donde hay oficinas.
export const getAllOfficesCodeAndCity = async ()=>{
    let res = await fetch("http://localhost:5504/offices")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        dataUpdate.push({
            codigo: val.code_office,
            ciudad: val.city
        })
    });
    return dataUpdate;
}
// 2. Devuelve un listado con la ciudad y el teléfono de las oficinas de España.
export const getAllOfficesFromSpainCityAndMovil = async() =>{
    let res = await fetch("http://localhost:5504/offices?country=España")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        dataUpdate.push({
            ciudad: val.city,
            telefono: val.movil
        })
    });
    return dataUpdate;
}

// Obtener la informacion de una oficina por su codigo
export const getOfficesByCode = async(code) =>{
    let res = await fetch(`http://localhost:5504/offices?code_office=${code}`);
    let dataClients = await res.json();
    return dataClients;
}

// MULTITABLA
// 6. Lista la dirección de las oficinas que tengan clientes en Fuenlabrada.
async function getOficinasConClientesPorCiudad(ciudad) {
    const clientes = await getClientesPorCiudad(ciudad)
    
    const data = clientes.map(async ({code_employee_sales_manager}) =>{
        const empleado = await getEmpleadoPorId(code_employee_sales_manager)
        const oficina = await getOficinaPorId(empleado[0].code_office)

        return {
            "office_address": oficina[0].address1
        }
    })

    console.log(await Promise.all(data));
}

getOficinasConClientesPorCiudad("Fuenlabrada")