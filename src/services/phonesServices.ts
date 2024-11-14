import { conflictError, notFoundError } from "../errors/errors";
import { phoneData } from "../protocols/protocols";
import phonesRepository from "../repositories/phonesRepository";

export const createPhone = async ({number, carrierCode, name, description, cpf}:phoneData) => {
  const phone = await phonesRepository.listPhoneByNumber(number);
  if (phone.rowCount !== 0) throw conflictError('esse número');

  const carrier = await phonesRepository.listCarrierById(carrierCode);
  if (carrier.rowCount === 0) throw notFoundError('operadora', 'código');
  const carrierId = carrier.rows[0].id

  const cpfFormatted = cpf.replace(/\D/g, '');
  const completePhone = await phonesRepository.listPhonesByCpf(cpfFormatted);
  let documentId = completePhone.rows[0]?.id_document
  if (completePhone.rowCount > 2) throw conflictError('3 números')
  if (completePhone.rowCount === 0) {
    documentId = (await phonesRepository.createDocument(cpfFormatted)).rows[0].id_document;
  }
    
  const result = phonesRepository.createPhone(number, name, description, carrierId, documentId);
  return result
}

export const listPhones = async (cpf: string) => {
  const {rows} = await phonesRepository.listPhonesByCpf(cpf)
  const result = rows.map(phone => {
    const {id_document, cpf, id_carrier, ...phoneFormatted} = phone
    return phoneFormatted
  })
  return result
}