import { useEffect, useRef, useState } from "react";
import CustomTable from "../components/Table/CustomTable";
import APIPoloniex from "../store/APIPoloniex";
import toast, { Toaster } from "react-hot-toast";
import { cn } from "../components/ui/lib/cn";
import { TabContent, TabList, TabTrigger, Tabs } from "../components/ui/Tabs";
import { ModalBroker, ModalDataType, useModal } from "../components/ui/Modal";

export default function Quotations() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTextMuted, setIsTextMuted] = useState<boolean>(false);
  const isErrorRef = useRef<boolean>(false);

  const { isOpen, setModalStyles, openModal } = useModal();

  const openModalRow = (d: ModalDataType) => {
    openModal(<ModalContent />, d);
  };

  useEffect(() => {
    let myInterval: NodeJS.Timeout | undefined;

    const fetchQuote = async () => {
      try {
        setIsLoading(true && APIPoloniex.tickers.length === 0);
        await APIPoloniex.getPoloniexTickers();
        setIsLoading(false && APIPoloniex.tickers.length === 0);
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
      if (APIPoloniex.tickers.length === 0) fetchQuote();
      myInterval = setInterval(fetchQuote, 5000);
    } else {
      setModalStyles({
        styleModalBG: "flex justify-center",
        styleModalContainer: "",
        styleModalHeader: " border-b border-neutral-800",
        styleModalContent: "",
      });
      clearInterval(myInterval);
    }
    return () => clearInterval(myInterval);
  }, [isOpen]);

  // const tableProps = {
  //   styleWrapper: "rounded-md",
  //   styleContainer: "rounded-md bg-neutral-900/20",
  //   styleBody:
  //     isTextMuted && APIPoloniex.tickers.length !== 0 ? "animate-pulse" : "",
  //   styleBodyRow: "cursor-pointer",
  //   styleHeader: "bg-cyan-800",
  //   styleHBSeparator: "h-2",
  //   styleWrapperSus: "p-1 px-2",
  //   styleSusRow: "border h-[36.5px] w-full bg-white/20",
  //   isLoading: isLoading,
  //   countSusRows: 8,
  //   isFade: true,
  //   minFadeOpacity: 15,
  //   modalRow: true,
  //   openModalRow:openModalRow
  // };
  return (
    <>
      <div
        className={
          "w-full h-full flex text-white py-[_max(60px,10vh)] px-[_max(20px,10vw)] justify-center z-20"
        }
      >
        <Tabs
          defaultValue="a"
          className="gap-2"
          styleTriggers={
            "min-w-min text-white bg-transparent transition-all duration-[0.4s] ease-in-out"
          }
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
            {/* <CustomTable
              // Данные в виде саммива объекта
              data={APIPoloniex.tickers}
              // Ключи - поля данных с сервера
              // Значение - заголовок шапки
              colContentHeader={{
                symbol: "Имя тикера",
                price: "Последняя цена",
                bestBidPrice: "Самая высокая цена",
                priceChangePercent: "Изменение цены",
              }}
              //
              //
              //
              // Стиль обертки таблицы
              styleWrapper={"rounded-md"}
              // Стиль контейнера таблицы
              styleContainer={"rounded-md bg-neutral-900/20"}
              // Стиль таблиицы
              styleTable={""}
              // Стиль шапки таблицы
              styleHeader={"bg-cyan-800"}
              // Стиль строки шапки таблицы
              styleHeaderRow={""}
              // Стиль ячейки шапки таблицы
              styleHeaderCell={""}
              // Отступ между шапкой и телом таблицы
              styleHBSeparator={"h-2"}
              // Стиль тела таблицы
              styleBody={
                isTextMuted && APIPoloniex.tickers.length !== 0
                  ? "animate-pulse"
                  : ""
              }
              // Стиль строки тела таблицы
              styleBodyRow={"cursor-pointer"}
              // Стиль ячейки тела таблицы
              styleBodyCell={""}
              //
              //
              //
              // Стиль ячейки, представляющей обертку для ячейки предзагрузки
              styleCellSus={"p-1 px-2"}
              // Стиль прелоадера строки
              styleSusDiv={"border h-[36.5px] w-full bg-white/20"}
              // Статус загрузки данных (Использовать внеюшюю информацию о загрузке передаваемых данных)
              isLoading={isLoading}
              // Количество прелоадеров строки
              // Показывается если isLoading
              countSusRows={8}
              // Наличие угасания кадой следующей строки и значение минимального значения прозрачности последнего элемента прелоадера строки.
              // Показывается если isLoading и установлены suspenseRowsCount
              isFade
              minFadeOpacity={15}
              modalRow
              openModalRow={openModalRow}
            ></CustomTable> */}
            <CustomTable
              // Ключи - поля данных с сервера
              // Значение - заголовок шапки
              colContentHeader={{
                symbol: "Имя тикера",
                price: "Последняя цена",
                bestBidPrice: "Самая высокая цена",
                priceChangePercent: "Изменение цены",
              }}
              headerProps={{
                // Стиль строки шапки таблицы
                styleHeaderRow: "",
                // Стиль ячейки шапки таблицы
                styleHeaderCell: "",
              }}
              loaderProps={{
                // Стиль ячейки, представляющей обертку для ячейки предзагрузки
                styleCellSus: "p-1 px-2",
                // Стиль прелоадера строки
                styleSusDiv: "border h-[36.5px] w-full bg-white/20",
                // Количество прелоадеров строки
                // Показывается если isLoading
                countSusRows: 8,
                // Наличие угасания кадой следующей строки и значение минимального значения прозрачности последнего элемента прелоадера строки.
                // Показывается если isLoading и установлены suspenseRowsCount
                isFade: true,
                minFadeOpacity: 15,
              }}
              bodyProps={{
                // Стиль строки тела таблицы
                styleBodyRow: "cursor-pointer",
                // Стиль ячейки тела таблицы
                styleBodyCell: "",
                // Данные в виде массива объекта
                data: APIPoloniex.tickers,
                modalRow: true,
                openModalRow: openModalRow,
              }}
              tableProps={{
                // Стиль обертки таблицы
                styleWrapper: "rounded-md",
                // Стиль контейнера таблицы
                styleContainer: "rounded-md bg-neutral-900/20",
                // Стиль таблиицы
                styleTable: "",
                // Стиль шапки таблицы
                styleHeader: "bg-cyan-800",
                // Отступ между шапкой и телом
                styleHBSeparator: "h-2",
                // Стиль тела таблицы
                styleBody:
                  isTextMuted && APIPoloniex.tickers.length !== 0
                    ? "animate-pulse"
                    : "",
              }}
              // Статус загрузки данных (Использовать внеюшюю информацию о загрузке передаваемых данных)
              isLoading={isLoading}
              //
              //
              // // Стиль строки шапки таблицы
              // styleHeaderRow={""}
              // // Стиль ячейки шапки таблицы
              // styleHeaderCell={""}
              // Отступ между шапкой и телом таблицы
              //
              // // Стиль ячейки, представляющей обертку для ячейки предзагрузки
              // styleCellSus={"p-1 px-2"}
              // // Стиль прелоадера строки
              // styleSusDiv={"border h-[36.5px] w-full bg-white/20"}
              // // Количество прелоадеров строки
              // // Показывается если isLoading
              // countSusRows={8}
              // // Наличие угасания кадой следующей строки и значение минимального значения прозрачности последнего элемента прелоадера строки.
              // // Показывается если isLoading и установлены suspenseRowsCount
              // isFade
              // minFadeOpacity={15}
              // // Стиль строки тела таблицы
              // styleBodyRow={"cursor-pointer"}
              // // Стиль ячейки тела таблицы
              // styleBodyCell={""}
              // // Данные в виде саммива объекта
              // data={APIPoloniex.tickers}
              // modalRow
              // openModalRow={openModalRow}
              // // Стиль обертки таблицы
              // styleWrapper={"rounded-md"}
              // // Стиль контейнера таблицы
              // styleContainer={"rounded-md bg-neutral-900/20"}
              // // Стиль таблиицы
              // styleTable={""}
              // // Стиль шапки таблицы
              // styleHeader={"bg-cyan-800"}
              // // Отступ между шапкой и телом
              // styleHBSeparator={"h-2"}
              // // Стиль тела таблицы
              // styleBody={
              //   isTextMuted && APIPoloniex.tickers.length !== 0
              //     ? "animate-pulse"
              //     : ""
              // }
            ></CustomTable>
          </TabContent>
          <TabContent value="b">
            {/* <CustomTable
              data={APIPoloniex.tickers}
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
            ></CustomTable> */}
          </TabContent>
        </Tabs>
        <ModalBroker />
        <Toaster />
      </div>
      <div className="bg-cyan-300 absolute top-0 bottom-0 left-0 right-0 w-full mix-blend-color z-10"></div>
      <div className="quotations absolute top-0 bottom-0 left-0 right-0 w-full z-0"></div>
    </>
  );
}

const ModalContent = (modalData: ModalDataType) => {
  const { d } = modalData;

  return (
    <div>
      <h3>Modal Content</h3>
      <p>{d.bestAskPrice}</p>
    </div>
  );
};
