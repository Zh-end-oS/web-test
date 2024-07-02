import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { cn } from "../ui/lib/cn";
import {
  TBody,
  TCell,
  THead,
  THeader,
  TLoaderRow,
  TRow,
  Table,
} from "../ui/Table";
import { ModalDataType, useModal } from "../ui/Modal";

// interface CustomTablePropsType {
//   data?: DataType[];
//   colContentHeader?: ColContentHeaderType;
//   styleWrapper?: string;
//   styleContainer?: string;
//   styleTable?: string;
//   styleHeader?: string;
//   styleHeaderRow?: string;
//   styleHeaderCell?: string;
//   styleHBSeparator?: string;
//   styleBody?: string;
//   styleBodyRow?: string;
//   styleBodyCell?: string;
//   styleCellSus?: string;
//   styleSusDiv?: string;

//   countSusRows?: number;
//   isFade?: boolean;
//   minFadeOpacity?: number;
//   isLoading?: boolean;

//   modalRow?: boolean;
//   openModalRow: OpenModalRowType;
// }
interface CustomTablePropsType {
  headerProps: {
    styleHeaderRow?: string;
    styleHeaderCell?: string;
  };
  loaderProps: {
    styleCellSus?: string;
    styleSusDiv?: string;
    countSusRows?: number;
    isFade?: boolean;
    minFadeOpacity?: number;
  };
  bodyProps: {
    styleBodyRow?: string;
    styleBodyCell?: string;
    data?: DataType[];
    modalRow?: boolean;
    openModalRow: OpenModalRowType;
  };
  tableProps: {
    styleWrapper?: string;
    styleContainer?: string;
    styleTable?: string;
    styleHeader?: string;
    styleHBSeparator?: string;
    styleBody?: string;
  };
  colContentHeader?: ColContentHeaderType;
  isLoading?: boolean;
}

type OpenModalRowType = (data: ModalDataType) => void;
type HeaderRowPropsType = {
  styleHeaderCell?: string;
  styleHeaderRow?: string;
  colContentHeader: ColContentHeaderType;
};

type DataRowsPropsType = {
  styleBodyRow?: string;
  styleBodyCell?: string;
  data?: DataType[];
  colContentHeader: ColContentHeaderType;
  modalRow?: boolean;
  openModalRow: OpenModalRowType;
};

type RowPropsType = {
  styleBodyRow?: string;
  styleBodyCell?: string;
  d: DataType;
  colContentHeader: ColContentHeaderType;
  id: number;
  modalRow?: boolean;
  openModalRow: OpenModalRowType;
};

type DataType = {
  [key: string]: string | number;
};

type ColContentHeaderType = {
  [key: string]: string;
};

/**
 * Таблица
 */
const CustomTable = observer((props: CustomTablePropsType) => {
  const {
    // data = [],
    // colContentHeader = {},

    // styleWrapper,
    // styleContainer,
    // styleTable,
    // styleHeader,
    // styleHeaderRow,
    // styleHeaderCell,
    // styleHBSeparator,
    // styleBody,
    // styleBodyRow,
    // styleBodyCell,

    // styleCellSus,
    // styleSusDiv,
    // countSusRows = 5,
    // isFade = false,
    // minFadeOpacity = 100,

    // isLoading = false,

    // modalRow = false,
    // openModalRow,

    colContentHeader = {},

    tableProps,
    // styleWrapper,
    // styleContainer,
    // styleTable,
    // styleHeader,
    // styleHBSeparator,
    // styleBody,

    headerProps,
    // styleHeaderRow,
    // styleHeaderCell,

    loaderProps,
    // styleCellSus,
    // styleSusDiv,
    // countSusRows = 5,
    // isFade = false,
    // minFadeOpacity = 100,

    bodyProps,
    // styleBodyRow,
    // styleBodyCell,
    // data = [],
    // modalRow = false,
    // openModalRow,

    isLoading = false,
  } = props;
  const {
    styleWrapper,
    styleContainer,
    styleTable,
    styleHeader,
    styleHBSeparator,
    styleBody,
  } = tableProps;
  const colCount = Object.keys(colContentHeader).length;

  return (
    <div className={cn("w-full h-full overflow-hidden", styleWrapper)}>
      <div className={cn("w-full h-full overflow-auto", styleContainer)}>
        <Table className={styleTable}>
          <THeader className={styleHeader}>
            <HeaderRow
              {...headerProps}
              colContentHeader={colContentHeader}
              // styleHeaderRow={styleHeaderRow}
              // styleHeaderCell={styleHeaderCell}
            />
          </THeader>
          <div className={cn("w-full", styleHBSeparator)}></div>
          <TBody className={cn("[&_tr:last-child]:border-0", styleBody)}>
            {isLoading ? (
              <TLoaderRow
                {...loaderProps}
                // styleSusDiv={styleSusDiv}
                // styleCellSus={styleCellSus}
                // countSusRows={countSusRows}
                // isFade={isFade}
                // minFadeOpacity={minFadeOpacity}
                colCount={colCount}
              />
            ) : (
              <DataRows
                {...bodyProps}
                colContentHeader={colContentHeader}
                // styleBodyRow={styleBodyRow}
                // styleBodyCell={styleBodyCell}
                // data={data}
                // modalRow={modalRow}
                // openModalRow={openModalRow}
              />
            )}
          </TBody>
        </Table>
      </div>
    </div>
  );
});

export default CustomTable;

/**
 * Строки шапки
 */
const HeaderRow = ({
  styleHeaderCell,
  styleHeaderRow,
  colContentHeader,
}: HeaderRowPropsType) => {
  return (
    <TRow className={cn("hover:bg-white/20", styleHeaderRow)}>
      {Object.keys(colContentHeader).map((key) => (
        <THead key={key} className={styleHeaderCell}>
          {colContentHeader[key] || ""}
        </THead>
      ))}
    </TRow>
  );
};

/**
 * Строки таблицы
 */
const DataRows = observer(({ data = [], ...rowProps }: DataRowsPropsType) => {
  return (
    <>
      {data.map((d, index) => (
        <Row d={d} key={index} id={index} {...rowProps} />
      ))}
    </>
  );
});

/**
 * Строка таблицы
 */
const Row = observer(
  ({
    d,
    colContentHeader,
    id,
    styleBodyRow,
    styleBodyCell,
    openModalRow,
  }: // modalRow,
  RowPropsType) => {
    const handleClick = (d: ModalDataType) => {
      openModalRow(d);
    };

    const newD: DataType = {};
    Object.keys(colContentHeader).forEach((header) => {
      newD[header] = d.hasOwnProperty(header) ? d[header] : "–"; // Значение по умолчанию для отсутствующих полей
    });

    // Проверка на обновление строк. Если в консоль приходит меньше 26 сообщений, то обновляются только измененные строки. Если 26, то обновились все строки (возможно при новом рендере страницы или с случае изменения данных каждого тикера (каждая таблица обновляет данные только для поступающей в нее информации, то есть если в одной таблице обновится последняя цена тикера, а данные из второй не изменились, то во второй таблице эта строка обновляться не будет))
    console.log(d.symbol);
    return (
      <>
        <TRow
          className={cn(
            "manrope font-light hover:bg-white/20 border-b border-white/20",
            styleBodyRow
          )}
          key={id}
          onClick={() => handleClick({ d })}
        >
          {Object.keys(colContentHeader).map((field) => (
            <Cell key={field} className={styleBodyCell} field={newD[field]} />
          ))}
        </TRow>
      </>
    );
  }
);

type CellPropsType = {
  className?: string;
  field: string | number;
};
const Cell = observer(({ field, className }: CellPropsType) => {
  const [isFading, setIsFading] = useState(false);
  const [currentData, setCurrentData] = useState(field);

  useEffect(() => {
    setIsFading(true);
    const fadeOutTimeout = setTimeout(() => {
      setCurrentData(field);
      setIsFading(false);
    }, 300); // Длительность анимации fade-out

    return () => clearTimeout(fadeOutTimeout);
  }, [field]);
  // console.log(field);

  return (
    <TCell
      className={cn(
        className,
        isFading
          ? "opacity-0 transition-all duration-300 ease-out"
          : "opacity-1 transition-all duration-300 ease-in"
      )}
    >
      {currentData}
    </TCell>
  );
});
