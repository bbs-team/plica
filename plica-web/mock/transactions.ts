import faker from 'faker'
import { Response, Request } from 'express'
import { ITransactionData } from '../src/api/types'

const transactionList: ITransactionData[] = []
const transactionCount = 20

for (let i = 0; i < transactionCount; i++) {
  transactionList.push({
    orderId: 100,
    status: 35,
    timestamp: faker.date.past().getTime(),
    username: faker.name.findName(),
    price: 21
  })
}

export const getTransactions = (req: Request, res: Response) => {
  return res.json({
    code: 20000,
    data: {
      total: transactionList.length,
      items: transactionList
    }
  })
}
