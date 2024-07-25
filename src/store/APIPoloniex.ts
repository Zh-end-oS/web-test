import { makeAutoObservable } from "mobx";

const url = "/api/tickers";

export type TickerType = {
  sequence: number;
  symbol: string;
  side: string;
  size: number;
  price: string;
  bestBidSize: number;
  bestBidPrice: string;
  bestAskPrice: string;
  tradeId: string;
  bestAskSize: number;
  ts: number;
  priceChangePercent?: string;
};

class APIPoloniex {
  tickers: TickerType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Запрос на тикеры
  fetchAPIPoloniex = async (url: string): Promise<any> => {
    try {
      const res = await fetch(url, {
        method: "GET",

        headers: {
          Accept: "application/json",
          "Content-Type": "applications/json",
        },

      });

      if (!res.ok) {
        throw new Error(`Ошибка HTTP. Cтатус: ${res.status}.`);
      }
      return await res.json();
    } catch (error) {
      throw error;
    }
  };

  // Выполнить запрос на тикеры, проверить полученные данные на ошибки
  getPoloniexTickers = async () => {
    try {
      const { data } = await this.fetchAPIPoloniex(url);

      if (Array.isArray(data)) {
        this.updateTickers(data);
      }
    } catch (error) {
      throw error;
    }
  };

  updateTickers(newTickers: TickerType[]) {
    newTickers.forEach((newTicker) => {
      const index = this.tickers.findIndex(
        (ticker) => ticker.symbol === newTicker.symbol
      );

      if (index !== -1) {
        const currentTicker = this.tickers[index];
        // Перебор свойств тикера
        for (const key in newTicker) {
          if (key === "price") {
            // Процент изменения цены
            const oldPrice = parseFloat(currentTicker.price);
            const newPrice = parseFloat(newTicker.price);
            const priceChangePercent = ((newPrice - oldPrice) / oldPrice) * 100;
            currentTicker.priceChangePercent =
              priceChangePercent.toFixed(5) + "%";
          }

          if (
            newTicker[key as keyof TickerType] !==
            currentTicker[key as keyof TickerType]
          ) {
            // Обновить свойство только если оно изменилось
            (currentTicker[
              key as keyof TickerType
            ] as TickerType[keyof TickerType]) =
              newTicker[key as keyof TickerType];
          }
        }
      } else {
        // Добавить новый тикер, если он не существует в массиве
        this.tickers.push(newTicker);
      }
    });
  }
}

const apiPoloniexInstance = new APIPoloniex();
export default apiPoloniexInstance;
