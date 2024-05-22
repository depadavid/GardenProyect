import {
    getAllOficceAndCodeCity,
    getAllOficceCityAndMovil,
    getAllOfficesAddressWithClientsInFuenlabrada
} from "./module/offices.js";
import {
    getAllFullNameAndEmailsAndBoss,
    getBossFullNameAndEmail,
    getAllFullnamePositionDiferentSalesRepresentative,
    getAllEmployeesAndBossesNames,
    getAllEmployeesWithBossNameAndTheBossesNames,
    getAllEmployeesThatDontHaveOffice,
    getAllEmployeesThatArentAssociatedWithAnyClient,
    getAllEmployeesThatArentAssociatedWithAnyClientAndDataOfHisOffice,
    getAllEmployeesThatArentAssociatedWithAnyClientOrOffice,
    getAllEmployeesThatArentAssociatedWithAnyClientAndHisBossName
} from "./module/employees.js";
import {
    getAllSpanishClients,
    getAllMadridClients,
    getAllClientsAndSalesManagersName,
    getAllClientsAndSalesManagersNameAndIfThereIsPayments,
    getAllClientsAndSalesManagersNameAndIfThereIsntPayments,
    getAllClientsAndSalesManagersNameAndIfThereIsPaymentsAndOfficeCity,
    getAllClientsAndSalesManagersNameAndIfThereIsntPaymentsAndOfficeCity,
    getAllClientsAndSalesManagersNameWithTheCItyOfTheOffice,
    getAllClientsWhoHaventPaid,
    getAllClientsWhoHaventRequest,
    getAllClientsWhoHaveNeitherPaidNorRequest,
    getAllClientsWhoHaveRequestedButHaventPaid,
    getAllProductGamaThatAClientRequest,
    getAllProductGamaThatAClientRequest1
} from "./module/client.js";
import {
    getAllRequestStatus,
    getAllRequestsOutOfTime,
    getAllRequestsWithTwoDaysOfAnticipation,
    getAllRequestsRejected2009,
    getAllRequestsDeliveredJanuary,
    getAllClientsWhoRecievedLateAProduct
} from "./module/requests.js";
import {
    getAllClientCodesOfPaymentsIn2008,
    getAllPaymentsFromPayPalEachYear,
    getAllPaymentMethods
} from "./module/payments.js";
import {
    getAllOrnamentalProductsWithMoreThan100Stock,
    getAllProductsThatNeverHasBeenRequested,
    getAllProductsThatNeverHasBeenRequestedWithItsNDI
} from "./module/product.js";

console.log(await getAllClientsWhoRecievedLateAProduct())
