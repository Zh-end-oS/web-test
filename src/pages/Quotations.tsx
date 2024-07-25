import { useEffect, useRef, useState } from "react";
import CustomTable from "../components/Table/CustomTable";
import APIPoloniex from "../store/APIPoloniex";
import toast, { Toaster } from "react-hot-toast";
import { TabContent, TabList, TabTrigger, Tabs } from "../components/ui/Tabs";
import { ModalBroker, ModalDataType, useModal } from "../components/ui/Modal";

export default function Quotations() {
  // Состояния загрузки данных
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTextMuted, setIsTextMuted] = useState<boolean>(false);
  // Статус ошибки
  const isErrorRef = useRef<boolean>(false);

  const { isOpen, openModal } = useModal();

  const openModalRow = (dataRow: ModalDataType) => {
    openModal({
      content: <ModalContent />,
      data: {
        dataRow,
        dataName: {
          symbol: "Имя тикера",
          price: "Последняя цена",
          bestBidSize: "Самая высокая цена",
          priceChangePercent: "Изменение цены",
          sequence: "sequence",
          side: "side",
          size: "size",
          bestBidPrice: "bestBidPrice",
          bestAskPrice: "bestAskPrice",
          tradeId: "tradeId",
          bestAskSize: "bestAskSize",
          ts: "ts",
        },
      },
    });
  };

  useEffect(() => {
    let myInterval: NodeJS.Timeout | undefined;

    const fetchQuote = async () => {
      if (APIPoloniex.tickers.length === 0) {
        setIsLoading(true);
      }
      try {
        await APIPoloniex.getPoloniexTickers();
        setIsLoading(APIPoloniex.tickers.length === 0);

        if (isErrorRef.current) {
          toast.dismiss("error");
          setIsTextMuted(false);
          isErrorRef.current = false;
        }
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);

        if (!isErrorRef.current) {
          isErrorRef.current = true;
          toast.loading("Ошибка!", {
            id: "error",
            icon: "❌",
          });
          setIsTextMuted(true);
        }
      }
    };

    // Обновление данных в зависимости от модального окна
    if (!isOpen) {
      if (APIPoloniex.tickers.length === 0) {
        fetchQuote();
      } else {
        setIsLoading(false);
      }
      // Установка таймера запроса
      myInterval = setInterval(fetchQuote, 5000);
    } else {
      // Очистка таймера запроса
      clearInterval(myInterval);
    }
    return () => clearInterval(myInterval);
  }, [isOpen]);

  // Пропс таблицы
  const tableProps = {
    data: APIPoloniex.tickers,
    loaderProps: {
      styleCellSus: "p-1 px-2",
      styleSusDiv: "border h-[36.5px] w-full bg-white/20",
      countSusRows: 8,
      isFade: true,
      minFadeOpacity: 15,
    },
    bodyProps: {
      styleBodyRow: "cursor-pointer user-select-none",
      styleBodyCell: "select-none",
      additionalHandlers: [openModalRow],
    },
    tableProps: {
      styleWrapper: "rounded-md",
      styleContainer: "rounded-md bg-neutral-900/20",
      styleHeader: "bg-cyan-800 text-nowrap",
      styleHBSeparator: "h-2",
      styleBody:
        isTextMuted && APIPoloniex.tickers.length !== 0 ? "animate-pulse" : "",
    },
    isLoading: isLoading,
  };

  // Пропс модального окна
  const modalProps = {
    styleModalBG: "flex justify-center",
    styleModalContainer: "",
    styleModalHeader: "border-b border-neutral-800",
    styleModalContent: "",
  };
  return (
    <>
      <div className="w-full h-full flex text-white py-[_max(60px,10vh)] px-[_max(20px,10vw)] justify-center z-20">
        <Tabs
          defaultValue="a"
          className="gap-2"
          styleTriggers="min-w-min text-white bg-transparent transition-all duration-[0.4s] ease-in-out"
          styleActiveTriggers="bg-white"
        >
          <TabList className="gap-2">
            <TabTrigger
              className="p-2 rounded-md ring-1 ring-white  hover:text-cyan-700"
              styleActiveTrigger="text-cyan-700"
              value="a"
            >
              Tab A
            </TabTrigger>
            <TabTrigger
              className="p-2 rounded-md ring-1 ring-white hover:text-green-700"
              styleActiveTrigger="text-green-700"
              value="b"
            >
              Tab B
            </TabTrigger>
          </TabList>
          <TabContent value="a">
            <CustomTable
              colContentHeader={{
                symbol: "Имя тикера",
                price: "Последняя цена",
                bestBidPrice: "Самая высокая цена",
                priceChangePercent: "Изменение цены",
              }}
              {...tableProps}
            />
          </TabContent>
          <TabContent value="b">
            <CustomTable
              colContentHeader={{
                sequence: "sequence",
                side: "side",
                size: "size",
                bestBidSize: "bestBidSize",
                bestAskPrice: "bestAskPrice",
                tradeId: "tradeId",
                bestAskSize: "bestAskSize",
                ts: "ts",
              }}
              {...tableProps}
            />
          </TabContent>
        </Tabs>
        <ModalBroker {...modalProps} />
        <Toaster />
      </div>
      <div className="bg-cyan-300 absolute top-0 bottom-0 left-0 right-0 w-full mix-blend-color z-10"></div>
      <div className="quotations absolute top-0 bottom-0 left-0 right-0 w-full z-0"></div>
    </>
  );
}

const ModalContent = ({ modalData }: ModalDataType) => {
  const { dataRow, dataName } = modalData;
  const d = dataRow.d;
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {Object.entries(dataName).map(([key, value]) => {
        const displayValue = d && d.hasOwnProperty(key) ? d[key] : "-";
        const stringValue = value as string;
        return (
          <div className="flex flex-col min-w-[220px] h-min p-1 rounded-md border border-neutral-900 flex-1">
            <div className="font-semibold">{stringValue}</div>
            <div>{displayValue}</div>
          </div>
        );
      })}
    </div>
  );
};
