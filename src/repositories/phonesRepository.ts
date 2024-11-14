import db from "../database/connection";
import { carrier, completePhone, document, phone } from "../protocols/protocols";

const createDocument = (cpf:string) => {
  return db.query<document>(`
    INSERT INTO documents (cpf)
      VALUES ($1)
      RETURNING documents.id AS id_document, documents.cpf
  `, [cpf])
}

const listPhonesByCpf = (cpf:string) => {
  return db.query<completePhone>(`
    SELECT documents.cpf, phones.*, carriers.name AS carrier FROM documents
	    JOIN phones ON documents.id = phones.id_document
      JOIN carriers ON phones.id_carrier = carriers.id
	    WHERE documents.cpf = $1
  `, [cpf])
}

const createPhone = (number: string, name: string, description: string, carrierId: number, documentId: number) => {
  return db.query<phone>(`
    INSERT INTO phones (number, name, description, id_carrier, id_document)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
  `, [number, name, description, carrierId, documentId])
}

const listPhoneByNumber = (number: string) => {
  return db.query<phone>(`
    SELECT * FROM phones
      WHERE number = $1;
  `, [number])
}

const listCarrierById = (code: number) => {
  return db.query<carrier>(`
    SELECT * FROM carriers
      WHERE code = $1;
  `, [code])
}

const phonesRepository = {
  createDocument,
  listPhonesByCpf,
  createPhone,
  listPhoneByNumber,
  listCarrierById
}

export default phonesRepository