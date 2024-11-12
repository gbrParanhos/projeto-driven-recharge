import db from "../database/connection";

const createDocument = (cpf:string) => {
  return db.query(`
    INSERT INTO documents (cpf)
      VALUES ($1)
      RETURNING documents.id AS id_document, documents.cpf
  `, [cpf])
}

const listPhonesByCpf = (cpf:string) => {
  return db.query(`
    SELECT documents.id AS id_document, documents.cpf, phones.*, carriers.name AS carrier FROM documents
	    JOIN phones ON documents.id = phones.id_document
      JOIN carriers ON phones.id_carrier = carriers.id
	    WHERE documents.cpf = $1
  `, [cpf])
}

const createPhoneData = (number: string, name: string, description: string, carrierId: number, documentId: number) => {
  return db.query(`
    INSERT INTO phones (number, name, description, id_carrier, id_document)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
  `, [number, name, description, carrierId, documentId])
}

const listPhoneByNumber = (number: string) => {
  return db.query(`
    SELECT * FROM phones
      WHERE number = $1;
  `, [number])
}

const listCarrierById = (code: number) => {
  return db.query(`
    SELECT * FROM carriers
      WHERE code = $1;
  `, [code])
}

const phonesRepository = {
  createDocument,
  listPhonesByCpf,
  createPhoneData,
  listPhoneByNumber,
  listCarrierById
}

export default phonesRepository