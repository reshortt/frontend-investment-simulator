import { useEffect, useState } from "react";
import { getTransactions } from "../APIService";
import { Transaction, TransactionType, Account } from "../types";
import { Spin, Table, TablePaginationConfig } from "antd";
import { calcSharePrice, formatCurrency, formatDate } from "../Calculations";

type TransactionRow = {
  date: string;
  description: string;
  amount: string;
  cash: string;
};

function Transactions() {
  const [data, setData] = useState<TransactionRow[] | undefined>();

  useEffect(() => {
    getTransactions().then((transactions) => {
      setData(calcData(transactions));
    });
  }, []);

  const calcData = (transactions: Transaction[]): TransactionRow[] => {
    const rows: TransactionRow[] = [];
    for (var transaction of transactions) {
      rows.push({
        date: formatDate(transaction.date, true),
        description: createDescription(transaction),
        amount: transaction.amount? formatCurrency(transaction.amount) : formatCurrency(0),
        cash: formatCurrency(transaction.cash),
      });
    }
    return rows;
  };

  const createDescription = (transaction: Transaction) => {
    var description: string = "";

    switch (transaction.type) {
      case TransactionType.BUY:
        description =
          "Buy " +
          transaction.shares +
          " of " +
          transaction.name +
          " (" +
          transaction.symbol +
          ") at " +
          formatCurrency(calcSharePrice(transaction))
        break;

      case TransactionType.DIVIDEND:
        description =
          "Dividend on " +
          transaction.shares +
          " shares of " +
          transaction.name +
          " (" +
          transaction.symbol +
          ")";
        break;

      case TransactionType.GIFT:
        description = "Initial Deposit";
        break;
      case TransactionType.SELL:
        description =
          "Sell " +
          transaction.shares +
          " " +
          transaction.symbol +
          " (" +
          transaction.name +
          ") at " +
          formatCurrency(calcSharePrice(transaction))
        break;
      case TransactionType.SPLIT:
        description = transaction.symbol + " " + transaction.to + "-for-" + transaction.from + " Stock Split"
        break;
      default:
        console.log("This is transaction type: " + transaction.type);
        description = "There is no describing this transaction";
        break;
    }

    //console.log("Description for ", transaction, " -> ", description);
    return description;
  };

  const columns: object[] = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Cash Balance", dataIndex: "cash", key: "cash" },
  ];

  const tablePaginationConfig:TablePaginationConfig = {
    pageSize : 100
  }

  return (
    <div className="Transactions">
      <header className="Transactions-header"></header>
      {data === undefined ? (
        <Spin size = "default" />
      ) : (
        <Table 
        dataSource={data} 
        columns={columns} 
        pagination={tablePaginationConfig}
        />
      )}
    </div>
  );
}

export default Transactions;
