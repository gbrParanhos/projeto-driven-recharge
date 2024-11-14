export type error = {
  type: string,
  message: string | string[]
}

export type document = {
  id_document: number,
  cpf: string
}

export type phone = {
  id: number,
  number: string,
  name: string,
  description: string,
  id_carrier: number,
  id_document: number
}

export type phoneData = Omit<phone, 'id' | 'id_carrier' | 'id_document'> & {
  carrierCode: number,
  cpf: string
}

export type completePhone = document & phone & {
  carrier: string
}

export type carrier = {
  id: number,
  name: string,
  code: number
}