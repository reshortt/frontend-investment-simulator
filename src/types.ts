// Shared with frontend
export type Asset = { symbol: string; name: string };
export type StockPrices = { bid: number; ask: number; previousClose: number };
export type UserInfo = { name: string; email: string, cash:number};
export type Lot= {shares: number; basis: number}
export type Transaction = {date:Date, type: TransactionType, amount:number, symbol:string, shares:number}


enum TransactionType {
    "gift",
    "buy",
    "sell",
    "dividend",
}
// backend only

export const commission:number = 15


