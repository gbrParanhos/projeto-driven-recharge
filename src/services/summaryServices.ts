import { notFoundError } from "../errors/errors";
import phonesRepository from "../repositories/phonesRepository"
import rechargesRepository from "../repositories/rechargesRepository"

export const readSummary = async (cpf: string) => {
  console.log(cpf)
  const cpfFormatted = cpf.replace(/\D/g, '');
  const completePhone = await phonesRepository.listPhonesByCpf(cpfFormatted);
  if (completePhone.rowCount === 0) notFoundError('documento', 'cpf');

  const numbers = completePhone.rows.map(async row => {
    const recharges = await rechargesRepository.listRechargesByNumber(row.number);
    const rechargesFormatted = recharges.rows.map(recharge => {
      const valueFormatted = ((recharge.value / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }))
      return {...recharge, value: valueFormatted}
    })
    return {
      id: row.id,
      number: row.number,
      name: row.name,
      description: row.description,
      carrier: {
        id: row.id_carrier,
        name: row.carrier,
        code: row.code
      },
      recharges: rechargesFormatted
    }
  })
  

  const result = {
    document: completePhone.rows[0].cpf,
    phones: await Promise.all(numbers)
  }
  return result
}