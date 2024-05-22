
import {getEmployeeCodeByCity} from "./clients.js"
//1. Devuelve un listado con el codigo de oficina y la ciudad 
// donde hay oficinas.
export const getAllOficceAndcodeCity = async () => {
    let res = await fetch("http://172.16.101.146:5704/offices")
    let data = await res.json()
    let dataUpdate = data.map(val => {
        return {
            code_office: val.code_office,
            city: val.city
        }
    })
    return dataUpdate;

}

//2. Devuelve un listado con la ciudad y el telefono de las oficinas de España
export const getAllOficceCityAndMovil = async () => {
    let res = await fetch("http://172.16.101.146:5704/offices?country=España")
    let data = await res.json()
    let dataUpdate = data.map(val => {
        return {
            code_office: val.code_office,
            movil: val.movil
        }
    })
    return dataUpdate;
}

// Obtener la informacion de una oficina por su codigo
export const getOfficesByCode = async(code) =>{
    let res = await fetch(`http://172.16.101.146:5704/offices?code_office=${code}`);
    let dataClients = await res.json();
    return dataClients;
}

//2.6. Lista la dirección de las oficinas que tengan clientes en `Fuenlabrada`.
export const getAddressOfficeByClient = async()=>{
    let dataUpdate = [];
    let employee = await getEmployeeCodeByCity()

    for (let codeEmployee of employee){
        let [employeeData] = await getEmployeesByCode(codeEmployee)
        let [oficina] = await getOfficesByCode(employeeData.code_office)
        dataUpdate.push({
            oficina : oficina.code_office,
            direccionOficina: `${oficina.address1} ${oficina.address2}`
        })
    }
    return dataUpdate
}

// Función para obtener todas las oficinas
export const getAllOffices = async () => {
    // Realizar la solicitud para obtener todas las oficinas
    const res = await fetch("http://172.16.101.146:5704/offices");
    const offices = await res.json();
    return offices;
};
//3.10. Devuelve las oficinas donde **no trabajan** ninguno de los empleados que hayan sido los representantes de ventas
// de algún cliente que haya realizado la compra de algún producto de la gama `Frutales`.


export const getOfficesWithoutSalesRepresentatives = async () => {
    // Obtener los representantes de ventas de clientes que hayan comprado productos de la gama Frutales
    const salesRepresentatives = await getSalesRepresentativesOfFrutalesClients();

    // Obtener todas las oficinas
    const offices = await getAllOffices();

    // Filtrar las oficinas donde no trabajan los representantes de ventas obtenidos
    const officesWithoutSalesRepresentatives = offices.filter(office => {
        for (const representative of salesRepresentatives) {
            if (office.code_office === representative.code_office) {
                return false;
            }
        }
        return true;
    });

    return officesWithoutSalesRepresentatives;
};
