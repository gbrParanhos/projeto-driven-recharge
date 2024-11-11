export type error = {
  type: string,
  message: string | string[]
}

export type phoneData = {
  number: string,
  carrierCode: number,
  name: string,
  description: string,
  cpf: string
}