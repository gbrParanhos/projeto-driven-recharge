import { notFoundError } from "../errors/errors"
import { rechargeData } from "../protocols/protocols"
import phonesRepository from "../repositories/phonesRepository"
import rechargesRepository from "../repositories/rechargesRepository"


export const createRecharge = async ({id_phone, value}: rechargeData) => {
  const phone = await phonesRepository.listPhoneById(id_phone);
  if (phone.rowCount === 0) throw notFoundError('número','id');

  const result = rechargesRepository.createRecharge(id_phone, value);
  return result
}

export const listRecharges = async (number: string) => {
  const {rows} = await rechargesRepository.listRechargesByNumber(number);

  const result = rows.map(recharge => {
    const valueFormatted = ((recharge.value / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }))
    return {...recharge, value: valueFormatted}
  })

  return result
}