import { useEffect, useState } from "react";
import { getUser } from "../APIService";
import { Transaction, TransactionType, User } from "../types";
import { Table } from "antd";
import {
  formatCurrency,
  formatDate,
} from "../Calculations";

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
        ")";
      break;

    case TransactionType.DIVIDEND:
      description =
        "Dividend Received from " +
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
        " of " +
        transaction.name +
        " (" +
        transaction.symbol +
        ")";
      break;
    default:
      console.log("This is transaction type: " + transaction.type);
      description = "There is no describing this transaction";
      break;
  }

  console.log("Description for ", transaction, " -> ", description);
  return description;
};

function Transactions() {
  const [user, setUser] = useState<User | null>();

  const getData = (): object[] => {
    const data: object[] = [];
    if (user && user.transactions) {
      for (var transaction of user.transactions) {
        if (!transaction) {
          console.log("===================>>> null transaction!!!");
        } else {
          console.log(
            "table row = ",
            transaction.date,
            formatDate(transaction.date)
          );
          data.push({
            date: formatDate(transaction.date),
            description: createDescription(transaction),
            amount: formatCurrency(transaction.amount),
            cash: formatCurrency(transaction.cash),
          });
        }
      }
    }


    console.log("Transactions are :" + JSON.stringify(data))
    return data;
  };

  const getColumns = (): object[] => {
    return [
      { title: "Date", dataIndex: "date", key: "date" },
      { title: "Description", dataIndex: "description", key: "description" },
      { title: "Amount", dataIndex: "amount", key: "amount" },
      { title: "Cash Balance", dataIndex: "cash", key: "cash" },
    ];
  };

  useEffect(() => {
    getUser().then((foundUser) => {
      setUser(foundUser);
    });
  }, []);

  return (
    <div className="Transactions">
      <header className="Transactions-header">
        <Table dataSource={getData()} columns={getColumns()} />
      </header>
    </div>
  );
}

export default Transactions;
