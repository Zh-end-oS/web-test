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
import { ModalDataType } from "../ui/Modal";

interface CustomTablePropsType {
  data?: DataType[];
  headerProps?: {
    styleHeaderRow?: string;
    styleHeaderCell?: string;
  };
  loaderProps?: {
    styleCellSus?: string;
    styleSusDiv?: string;
    countSusRows?: number;
    isFade?: boolean;
    minFadeOpacity?: number;
  };
  bodyProps: {
    styleBodyRow?: string;
    styleBodyCell?: string;
    additionalHandlers?: Array<(...args: any[]) => any>;
  };
  tableProps?: {
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
  additionalHandlers?: Array<(...args: any[]) => any>;
};

type RowPropsType = {
  styleBodyRow?: string;
  styleBodyCell?: string;
  d: DataType;
  colContentHeader: ColContentHeaderType;
  id: number;
  additionalHandlers?: Array<(...args: any[]) => any>;
};

type DataType = Record<string, string | number | boolean>;
type ColContentHeaderType = Record<string, string | number | boolean>;

// Таблица
const CustomTable = observer((props: CustomTablePropsType) => {
  const {
    tableProps,
    headerProps,
    loaderProps,
    bodyProps,
    isLoading = false,
    data,
    colContentHeader = {},
  } = props;
  const {
    styleWrapper,
    styleContainer,
    styleTable,
    styleHeader,
    styleHBSeparator,
    styleBody,
  } = tableProps || {};
  const colCount = Object.keys(colContentHeader).length;

  return (
    <div className={cn("w-full h-full overflow-hidden", styleWrapper)}>
      <div className={cn("w-full h-full overflow-auto", styleContainer)}>
        <Table className={styleTable}>
          <THeader className={styleHeader}>
            <HeaderRow {...headerProps} colContentHeader={colContentHeader} />
          </THeader>
          <div className={cn("w-full", styleHBSeparator)}></div>
          <TBody className={cn("[&_tr:last-child]:border-0", styleBody)}>
            {isLoading ? (
              <TLoaderRow {...loaderProps} colCount={colCount} />
            ) : (
              <DataRows
                {...bodyProps}
                colContentHeader={colContentHeader}
                data={data}
              />
            )}
          </TBody>
        </Table>
      </div>
    </div>
  );
});

export default CustomTable;

// Строки шапки
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

// Строки таблицы
const DataRows = observer(({ data = [], ...rowProps }: DataRowsPropsType) => {
  return (
    <>
      {data.map((d, index) => (
        <Row d={d} key={index} id={index} {...rowProps} />
      ))}
    </>
  );
});

// Строка таблицы
const Row = observer(
  ({
    d,
    colContentHeader,
    id,
    styleBodyRow,
    styleBodyCell,
    additionalHandlers = [],
  }: RowPropsType) => {
    const handleClick = (d: ModalDataType) => {
      additionalHandlers.forEach((handler) => handler(d));
    };

    const newD: DataType = {};
    Object.keys(colContentHeader).forEach((header) => {
      newD[header] = d.hasOwnProperty(header) ? d[header] : "–"; // Значение по умолчанию для отсутствующих полей
    });

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
  field: string | number | boolean;
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
  return (
    <TCell
      className={cn(
        className,
        isFading
          ? "opacity-0 transition-all duration-300 ease-out"
          : "opacity-1 transition-all duration-300 ease-in"
      )}
    >
      {currentData.toString()}
    </TCell>
  );
});
