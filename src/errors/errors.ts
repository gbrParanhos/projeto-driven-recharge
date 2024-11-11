import { error } from "../protocols/protocols"

export const unprocessableError = (message: string[]): error => {
  return {
    type: 'unprocessable',
    message
  }
}

export const conflictError = (entity: string): error => {
  return {
    type: 'conflict',
    message: `Já existe ${entity} cadastrado(s).`
  }
}

export const notFoundError = (entity: string, propriety: string): error => {
  return {
    type: 'notFound',
    message: `Não foi encontrado nenhum(a) ${entity} com esse(a) ${propriety}.`
  }
}