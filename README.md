## Компоненты

<p style="margin-bottom: 10px;">В проекте созданы несколько компонентов для работы с таблицами:</p>

- Табличные компоненты для создания таблиц.
- Компоненты табов для переходов между информацией по нажатию на вкладки.
- Компоненты можального окна для отображения необзодимой информации.
- Компонент таблицы, представляющий управляемую таблицу, отображающую переданные в нее данные.

<br style="content: ''; display: block; margin: 20px 0;">

<details style="margin: 10px 0 20px 0;">
  <summary>
    <h3 style="margin: 0;">Табличные компоненты</h3>
  </summary>

  <p style="margin-top: 20px;">Компоненты для работы с таблицами.</p>

<h3 style="margin-bottom: 10px;">Table</h3>

Компонент `Table` представляет собой HTML тег `<table>`, который можно использовать для отображения данных в виде таблицы.

<h3 style="margin-bottom: 10px;">THeader</h3>
 
Компонент `THeader` представляет собой HTML тег `<thead>`, используемый для создания заголовка таблицы.

<h3 style="margin-bottom: 10px;">THead</h3>

Компонент `THead` представляет собой HTML тег `<th>`, который используется для создания ячеек заголовка таблицы.

<h3 style="margin-bottom: 10px;">TBody</h3>

Компонент `TBody` представляет собой HTML тег `<tbody>`, используемый для создания тела таблицы.

<h3 style="margin-bottom: 10px;">TRow</h3>

Компонент `TRow` представляет собой HTML тег `<tr>`, который используется для создания строк таблицы.

<h3 style="margin-bottom: 10px;">TCell</h3>

Компонент `TCell` представляет собой HTML тег `<td>`, который используется для создания ячеек в строках таблицы.

<h3 style="margin-bottom: 10px;">TLoaderRow</h3>

Компонент `TLoaderRow` представляет собой специальную строку таблицы для отображения прелоадера или заглушек во время загрузки данных. Он может использоваться для создания анимированных элементов загрузки в таблице.

> Параметры `TLoaderRow`
>
> - `styleCellSus`: CSS класс стиля ячейки заглушки.
> - `styleSusDiv`: CSS класс стиля для содержимого заглушки.
> - `countSusRows`: Количество заглушек строк по умолчанию равно 5.
> - `isFade`: Флаг, указывающий на необходимость плавного исчезновения заглушек.
> - `minFadeOpacity`: Минимальная непрозрачность заглушек, указывается в диапазоне [0, 100].

<h4 style="margin: 16px 0 4px 0;">Использование</h4>

Пример использования компонентов:

```jsx
import {
  Table,
  THeader,
  THead,
  TBody,
  TRow,
  TCell,
  TLoaderRow,
} from "./components/Table";

const MyTable = ({ isLoading, loaderProps }) => (
  <Table>
    <THeader>
      <TRow>
        <THead>Column 1</THead>
        <THead>Column 2</THead>
      </TRow>
    </THeader>
    <TBody>
      {isLoading ? (
        <TLoaderRow {...loaderProps} />
      ) : (
        <>
          <TRow>
            <TCell>Row 1, Cell 1</TCell>
            <TCell>Row 1, Cell 2</TCell>
          </TRow>
          <TRow>
            <TCell>Row 2, Cell 1</TCell>
            <TCell>Row 2, Cell 2</TCell>
          </TRow>
        </>
      )}
    </TBody>
  </Table>
);
```

---

</details>

<details  style="margin: 10px 0 20px 0;">
  <summary>
    <h3 style="margin: 0;">Компоненты табов</h3>
  </summary>

<p style="margin-top: 20px;">Компоненты для создания интерфейса с вкладками (табами).</p>

<h3 style="margin-bottom: 10px;">Tabs</h3>

`Tabs` является оберткой для компонентов табов. Он предоставляет контекст для управления активной вкладкой и стилями табов.

> Параметры `Tabs`
>
> - `defaultValue` (обязательный): Изначально активная вкладка.
> - `className`: Дополнительные классы для стилизации.
> - `styleTriggers`: Стили для триггеров (кнопок табов).
> - `styleActiveTriggers`: Стили для активных триггеров.

<h3 style="margin-bottom: 10px;">TabList</h3>

`TabList` представляет собой обертку для списка кнопок табов.

> Параметры `TabList`
>
> - `className`: Дополнительные классы для стилизации.

<h3 style="margin-bottom: 10px;">TabTrigger</h3>

`TabTrigger` представляет собой кнопку для переключения между табами.

> Параметры `TabTrigger`
>
> - `value` (обязательный): Уникальное значение таба.
> - `styleActiveTrigger`: Стили для активной кнопки таба.
> - `className`: Дополнительные классы для стилизации.

<h3 style="margin-bottom: 10px;">TabContent</h3>

`TabContent` представляет собой содержимое для каждого таба.

> Параметры `TabContent`
>
> - `value` (обязательный): Уникальное значение таба, с которым связано содержимое.
> - `className`: Дополнительные классы для стилизации.

<h4 style="margin: 16px 0 4px 0;">Использование</h4>

Пример использования компонентов:

```jsx
import { Tabs, TabList, TabTrigger, TabContent } from "./components/Tabs";

const MyTable = () => (
  <Tabs defaultValue="a">
    <TabList>
      <TabTrigger value="a">Tab A</TabTrigger>
      <TabTrigger value="b">Tab B</TabTrigger>
    </TabList>
    <TabContent value="a">Content A</TabContent>
    <TabContent value="b">Content B</TabContent>
  </Tabs>
);
```

---

</details>

<details  style="margin: 10px 0 20px 0;">
  <summary>
    <h3 style="margin: 0;">Компоненты модального окна</h3>
  </summary>

<p style="margin-top: 20px;">Компоненты для создания модального окна с контекстом управления.</p>

<h3 style="margin-bottom: 10px;">ModalProvider</h3>

`ModalProvider` является провайдером контекста для управления состоянием модального окна. Он должен оборачивать компоненты, которые будут использовать модальные окна.

> Параметры `ModalProvider`
>
> - `children` (обязательный): Дочерние компоненты, которые будут иметь доступ к контексту модального окна.

<h4 style="margin: 16px 0 4px 0;">Использование</h4>

Пример использования компонента:

```jsx
import { ModalProvider } from "./components/Modal";

const App = () => (
  <ModalProvider>
    <YourComponents />
  </ModalProvider>
);
```

<h3 style="margin-bottom: 10px;">useModal</h3>

`useModal` представляет хук, который предоставляет доступ к контексту модального окна. Его можно использовать для открытия и закрытия модального окна, а также для получения состояния модального окна.

> Переменные `useModal`
>
> - `isOpen`: Состояние открытости модального окна.
> - `setIsOpen`: Функция открытия модального окна. Принимает параметры: `modalContent` – компонент контента, `modalData` - данные любого формата.
> - `closeModal`: Функция закрытия модального окна.
> - `modalContent`: Компонент, который отображается внутри модального окна при использовании `<ModalBroker/>`.
> - `modalData`: Данные, которые передаются в компонент `<ModalBroker/>`.

<h3 style="margin-bottom: 10px;">ModalBroker</h3>

`ModalBroker` представляет собой компонент, который отвечает за рендеринг модального окна. Он использует контекст для управления отображением модального окна.

> Параметры `ModalBroker`
>
> - `styleModalBG`: Дополнительные классы для стилизации фона модального окна.
> - `styleModalContainer`: Дополнительные классы для стилизации контейнера модального окна.
> - `styleModalHeader`: Дополнительные классы для стилизации заголовка модального окна.
> - `styleModalContent`: Дополнительные классы для стилизации контента модального окна.
> - `styleCloseModal`: Дополнительные классы для стилизации кнопки закрытия модального окна.

<h4 style="margin: 16px 0 4px 0;">Использование</h4>

Первый пример (без использования `ModalBroker`):

```jsx
// jsx

import { useModal } from "./components/Modal";
import "./style.css";

export default function YourComponent() {
  const { openModal, closeModal, isOpen } = useModal();

  const handleOpenModal = () => {
    openModal({});
  };

  return (
    <div className="page">
      <button onClick={handleOpenModal}>Open Modal</button>
      {isOpen && (
        <div className="modal-wrapper" onClick={closeModal}>
          Modal Wrapper
          <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
            Custom Modal ...Modal Content...
            <button className="close-modal" onClick={closeModal}>
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

```css
/* css */

.page,
.modal-wrapper {
  width: 100%;
  height: 100%;
}

.modal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.custom-modal {
  position: relative;
  width: 200px;
  height: 100px;
  background-color: white;
  padding: 5px;
}

.close-modal {
  position: absolute;
  right: 0;
  top: 0;
  padding: 0 5px;
}
```

Второй пример (с использованием `ModalBroker`, Tailwind и TypeScript):

```tsx
// tsx

import { useModal, ModalBroker, ModalDataType } from "./components/Modal";

export default function YourComponent() {
  const { openModal, closeModal } = useModal();

  const handleOpenModal = () => {
    openModal({
      content: <ModalContent />,
      data: {
        textOpen: "Модальное окно открыто в: ",
        dateOpen: new Date(),
        closeModal: closeModal,
      },
    });
  };

  const modalProps = {
    styleModalBG: "flex justify-center",
    styleModalHeader: "border-b border-neutral-800",
  };

  return (
    <div className="page">
      <button onClick={handleOpenModal}>Открыть модальное окно</button>
      <ModalBroker {...modalProps} />
    </div>
  );
}

const ModalContent = ({ modalData }: ModalDataType) => {
  const { textOpen, dateOpen, closeModal } = modalData;

  const dateString = dateOpen.toLocaleString();

  return (
    <button onClick={closeModal}>
      {textOpen}
      {dateString}
    </button>
  );
};
```

---

</details>

<details  style="margin: 10px 0 20px 0;">
  <summary>
    <h3 style="margin: 0;">Компонент таблицы</h3>
  </summary>

  <p style="margin-top: 20px;">Компонент <code>CustomTable</code> предназначен для отображения данных в виде табличной структуры. Он поддерживает заголовок таблицы, строки данных и возможность отображения загрузочных состояний.</p>

> Параметры `CustomTable`
>
> - `data`: Массив объектов, представляющих данные типа <code><string, string | number | boolean></code> для отображения в таблице.
> - `colContentHeader`: Объект, определяющий заголовки столбцов таблицы и соответствующие им ключи данных типа <code><string, string | number></code>.
> - `isLoading`: Флаг указывающий на состояние загрузки данных.
> - `tableProps`: Объект, содержащий дополнительные классы для стилизации компонента таблицы.
>
>   <p style="margin: -11px 0 0 1px; font-weight: 500">Поля <code>tableProps</code>:</p>
>
>   - `styleWrapper`: Стили обертки таблицы.
>   - `styleContainer`: Стили контейнера таблицы.
>   - `styleHeader`: Стили шапки таблицы.
>   - `styleHBSeparator`: Стили разделителя шапки и тела таблицы.
>   - `styleBod`: Стили тела таблицы.
>
> - `headerProps`: Объект, содержащий дополнительные классы для стилизации заголовка таблицы.
>
>   <p style="margin: -11px 0 0 1px; font-weight: 500">Поля <code>headerProps</code>:</p>
>
>   - `styleHeaderRow`: Стили строки шапки таблицы.
>   - `styleHeaderCell`: Стили ячеек шапки таблицы.
>
> - `bodyProps`: Объект, содержащий дополнительные классы для стилизации строк и ячеек данных таблицы.
>
>   <p style="margin: -11px 0 0 1px; font-weight: 500">Поля <code>bodyProps</code>:</p>
>
>   - `styleBodyRow`: Стили строки тела таблицы.
>   - `styleBodyCell`: Стили ячеек тела таблицы.
>   - `additionalHandlers`: Передаваемый строке тела таблицы массив функций, активирующихся по нажатию на строку.
>
> - `loaderProps`: Объект, содержащий параметры для отображения загрузочных состояний.
>
>   <p style="margin: -11px 0 0 1px; font-weight: 500">Поля <code>loaderProps</code>:</p>
>
>   - `styleCellSus`: Стили ячейки, представляющей обертку для ячейки предзагрузки.
>   - `styleSusDiv`: Стили прелоадера строки.
>   - `countSusRows`: Количество прелоадеров строки.
>   - `isFade`: Наличие угасания кадой следующей строки.
>   - `minFadeOpacity`: Значение минимального значения прозрачности последнего элемента прелоадера строки.

<h4 style="margin: 16px 0 4px 0;">Использование</h4>

Пример объявления компонента со всеми параметрами:

```tsx
// tsx

import CustomTable from "./components/CustomTable";

export default function YourComponent() {
  const anotherData: Record<string, string | number | boolean>[] = [
    {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: "quis ut nam facilis et officia qui",
      completed: false,
    },
    {
      userId: 1,
      id: 3,
      title: "fugiat veniam minus",
      completed: false,
    },
  ];

  const f1 = () => console.log("Сейчас сработал");
  const f2 = () => console.log("additionalHandlers");

  return (
    <CustomTable
      data={anotherData}
      colContentHeader={{
        userId: "User's ID",
        id: "ID",
        title: "Title",
        completed: "Comleted",
      }}
      headerProps={{
        styleHeaderRow: "",
        styleHeaderCell: "",
      }}
      loaderProps={{
        styleCellSus: "p-1 px-2",
        styleSusDiv: "border h-[36.5px] w-full bg-white/20",
        countSusRows: 8,
        isFade: true,
        minFadeOpacity: 15,
      }}
      bodyProps={{
        styleBodyRow: "cursor-pointer",
        styleBodyCell: "select-none",
        additionalHandlers: [f1, f2],
      }}
      tableProps={{
        styleWrapper: "rounded-md",
        styleContainer: "rounded-md bg-neutral-900/20",
        styleTable: "",
        styleHeader: "bg-cyan-800 text-nowrap",
        styleHBSeparator: "h-2",
        styleBody: "",
      }}
      isLoading={false}
    />
  );
}
```

---

</details>

<style>
  details summary {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  details summary::before {
    content: "▶";
    display: inline-block;
    margin-right: 6px;
    transition: transform 0.2s ease;
  }

  details[open] summary::before {
    content: "▼";
  }
</style>
