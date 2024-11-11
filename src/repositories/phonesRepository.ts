import db from "../database/connection";

const createDocument = (cpf:string) => {
  return db.query(`
    INSERT INTO documents (cpf)
      VALUES ($1)
      RETURNING *
  `, [cpf])
}

const getPhonesByCpf = (cpf:string) => {
  return db.query(`
    SELECT documents.id FROM documents
	    JOIN phones ON documents.id = phones.id_document
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

const getPhoneByNumber = (number: string) => {
  return db.query(`
    SELECT * FROM phones
      WHERE number = $1;
  `, [number])
}

const getCarrierById = (code: number) => {
  return db.query(`
    SELECT * FROM carriers
      WHERE code = $1;
  `, [code])
}

const phonesRepository = {
  createDocument,
  getPhonesByCpf,
  createPhoneData,
  getPhoneByNumber,
  getCarrierById
}

export default phonesRepository