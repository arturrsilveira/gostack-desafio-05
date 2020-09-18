/* eslint-disable no-param-reassign */
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (incrementValue: Balance, transaction: Transaction) => {
        // eslint-disable-next-line default-case
        switch (transaction.type) {
          case 'income':
            incrementValue.income += transaction.value;
            break;
          case 'outcome':
            incrementValue.outcome += transaction.value;
            break;
          default:
            break;
        }
        return incrementValue;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;
    return { income, outcome, total };
  }

  // eslint-disable-next-line class-methods-use-this
  public create({ title, value, type }: Request): Transaction {
    const oneTransaction = new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(oneTransaction);
    return oneTransaction;
  }
}

export default TransactionsRepository;
