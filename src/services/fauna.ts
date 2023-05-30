import { Client } from 'faunadb'

const fauna_key = process.env.FAUNADB_KEY

if(!fauna_key) {
  throw new Error('FAUNADB_KEY is not defined')
}

export const fauna = new Client({
  secret: fauna_key,
})