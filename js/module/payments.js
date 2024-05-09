import pedidosPorAno from '../utils/index.js'

export default async function getPagos() {
    const response = await fetch("http://localhost:5502/payments")
    return await response.json()
};
