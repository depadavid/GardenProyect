// import { getAllOficceAndcodeCity, getAllOficceCityAndMovil ,getAddressOfficeByClient} from "./module/offices.js";
// console.log(await getAddressOfficeByClient());

// import { getallPaymentFromPayPalEachYear, getallPaymentForms } from "./module/payments.js";
// console.log( await getallPaymentForms());

import { getAllMadridClients,
    getAllSpainClients,
    getAllClientsAndEmployees,
    getAllPAyClientsAndEmployees,
    getAllNotPAyClientsAndEmployees,
    getAllPAyClientsAndEmployeesCity,
    getAllNotPAyClientsAndEmployeesCity,
    getAllClientsAndEmployeesCity,
    getAllClientsByDeliveryDate,
    getAllNotPAyClients,getAllNotRequestClients,
    getClientsWithoutPaymentsAndRequests,
    getAllRequestClientsButNotPay,
    getAllRequestClient} from "./module/clients.js"
/* console.log(await getAllNotPAyClientsAndEmployeesCity()) */
import {getallFullNameAndPosition,
    getallFullNameAndEmails, 
    getBoss,
    getFullNameAndBossBoss,
    getallDataEmployeeNotOffice,
    getallDataEmployeeNotClient,
    getallDataEmployeeNotClientAndOffice,
    getallDataEmployeeNotClientAndBoss
    } from "./module/employees.js"
console.log(await getFullNameAndBossBoss()) 

/* import { getAll, getAllRequestByTime, 
    getAllClientsYear, 
    getAllRequestByTimeDays,
    getAllRequestByYear } from "./module/requests.js" 
console.log(await getAllRequestByYear()) */

import { getAllClientsYear,getAllRequestByClient } from "./module/requests.js"
// console.log(await getAllRequestByClient())

import {getallPaymentFromPayPalEachYear,
    transformProductDictionary,
    getProductData,
    getProductNotRequest,
    getProductNotRequestAndDescription} from "./module/product.js"
// console.log(await getProductNotRequestAndDescription())

import {processRequestDetails,ProductsRequests} from "./module/request_details.js"
// console.log(await ProductsRequests())