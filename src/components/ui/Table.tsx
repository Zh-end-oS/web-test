import { cn } from "./lib/cn";
import React from "react";

// Компонент таблицы
const Table = React.forwardRef<
  HTMLTableElement,
  React.TableHTMLAttributes<HTMLTableElement>
>(({ className, children, ...props }, ref) => (
  <table className={cn("w-full text-sm ", className)} {...props} ref={ref}>
    {children}
  </table>
));

// Компонент заголовка таблицы
const THeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <thead
    className={cn("bg-white sticky top-0 z-20", className)}
    {...props}
    ref={ref}
  >
    {children}
  </thead>
));

// Компонент ячейки заголовка таблицы
const THead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn("text-left p-3 align-middle", className)}
    {...props}
  />
));

// Компонент тела таблицы
const TBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <tbody className={className} {...props} ref={ref}>
    {children}
  </tbody>
));

// Компонент строки таблицы
const TRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, children, ...props }, ref) => (
  <tr className={cn("transition-all z-10", className)} {...props} ref={ref}>
    {children}
  </tr>
));

// Компонент ячейки строки таблицы
const TCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, children, ...props }, ref) => (
  <td className={cn("p-3 align-middle", className)} {...props} ref={ref}>
    {children}
  </td>
));

type TLoaderRowPropsType = {
  styleCellSus?: string;
  styleSusDiv?: string;
  countSusRows?: number;
  isFade?: boolean;
  minFadeOpacity?: number;
  colCount?: number;
};

type CalcOpacityPropsType = {
  index: number;
  countSusRows: number;
  isFade: boolean;
  minFadeOpacity: number;
};
/**
 * Компонент прелоадера строки таблицы
 */
const TLoaderRow = ({
  styleCellSus = "",
  styleSusDiv = "",
  colCount,
  countSusRows = 5,
  isFade = false,
  minFadeOpacity = 100,
}: TLoaderRowPropsType) => {
  // Из количества рядов делаем массив элементов
  const LoaderRows = Array.from({ length: countSusRows }, (_, index) => {
    const opacityProps = { countSusRows, index, isFade, minFadeOpacity };
    const opacity = calcOpacity(opacityProps);

    return (
      <TRow style={{ opacity: `${opacity}` }} key={index}>
        <TCell colSpan={colCount} className={styleCellSus}>
          <div className={cn("animate-pulse rounded-md", styleSusDiv)}></div>
        </TCell>
      </TRow>
    );
  });
  return <>{LoaderRows}</>;
};

// Проработать отсутствующие значаения
const calcOpacity = ({
  index,
  countSusRows,
  isFade,
  minFadeOpacity,
}: CalcOpacityPropsType) => {
  if (!isFade) return 1;

  // Максимальное применение прозрачности для предзагрузчиков
  const maxOpApp = 100 - minFadeOpacity;
  // Шаг изменения прозрачность от первого до последнего элемента
  const opStep = maxOpApp / (countSusRows - 1);
  // Прозрачность текущего элемента (по номеру итерации цикла)
  const opAppCurrEl = 100 - index * opStep;
  // Округление значения прозрачности
  const opRound = opAppCurrEl | 0;

  const opacity = opRound / 100;
  // return ((100 - (100 - minFadeOpacity) / (countSusRows - 1) *index ) | 0) / 100;
  return opacity;
};

export { Table, THeader, THead, TBody, TRow, TCell, TLoaderRow };
