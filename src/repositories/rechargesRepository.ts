import db from "../database/connection";
import { recharge } from "../protocols/protocols";

const createRecharge = (id_phone: number, value: number) => {
  return db.query<recharge>(`
    INSERT INTO recharges (id_phone, value)
      VALUES ($1, $2)
      RETURNING *
  `, [id_phone, value])
}

const listRechargesByNumber = (number:string) => {
  return db.query<recharge>(`
    SELECT recharges.* FROM recharges
	    JOIN phones ON recharges.id_phone = phones.id
	    WHERE phones.number = $1
  `, [number])
}

// const createPhone = (number: string, name: string, description: string, carrierId: number, documentId: number) => {
//   return db.query<phone>(`
//     INSERT INTO phones (number, name, description, id_carrier, id_document)
//       VALUES ($1, $2, $3, $4, $5)
//       RETURNING *;
//   `, [number, name, description, carrierId, documentId])
// }

// const listPhoneByNumber = (number: string) => {
//   return db.query<phone>(`
//     SELECT * FROM phones
//       WHERE number = $1;
//   `, [number])
// }

// const listCarrierById = (code: number) => {
//   return db.query<carrier>(`
//     SELECT * FROM carriers
//       WHERE code = $1;
//   `, [code])
// }

const rechargesRepository = {
  createRecharge,
  listRechargesByNumber,
  // createPhone,
  // listPhoneByNumber,
  // listCarrierById
}

export default rechargesRepository