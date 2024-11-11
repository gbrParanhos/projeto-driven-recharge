import { conflictError, notFoundError } from "../errors/errors";
import { phoneData } from "../protocols/protocols";
import phonesRepository from "../repositories/phonesRepository";

export const createPhone = async ({number, carrierCode, name, description, cpf}:phoneData) => {
  const phone = await phonesRepository.getPhoneByNumber(number);
  if (phone.rowCount !== 0) throw conflictError('esse número');

  const carrier = await phonesRepository.getCarrierById(carrierCode);
  if (carrier.rowCount === 0) throw notFoundError('operadora', 'código');

  let cpfFormatted = cpf.replace(/\D/g, '');
  let document = await phonesRepository.getPhonesByCpf(cpfFormatted);
  if (document.rowCount > 2) throw conflictError('3 números')
  if (document.rowCount === 0) {
    document = await phonesRepository.createDocument(cpfFormatted);
  }
    
  const carrierId: number = carrier.rows[0].id
  const documentId: number = document.rows[0].id
  const result = phonesRepository.createPhoneData(number, name, description, carrierId, documentId);
  return result
}