# Getting Started with Create React App

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

> Пропсы `TLoaderRow`
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

> Пропсы `Tabs`
>
> - `defaultValue` (обязательный): Изначально активная вкладка.
> - `className`: Дополнительные классы для стилизации.
> - `styleTriggers`: Стили для триггеров (кнопок табов).
> - `styleActiveTriggers`: Стили для активных триггеров.

<h3 style="margin-bottom: 10px;">TabList</h3>

`TabList` представляет собой обертку для списка кнопок табов.

> Пропсы `TabList`
>
> - `className`: Дополнительные классы для стилизации.

<h3 style="margin-bottom: 10px;">TabTrigger</h3>

`TabTrigger` представляет собой кнопку для переключения между табами.

> Пропсы `TabTrigger`
>
> - `value` (обязательный): Уникальное значение таба.
> - `styleActiveTrigger`: Стили для активной кнопки таба.
> - `className`: Дополнительные классы для стилизации.

<h3 style="margin-bottom: 10px;">TabContent</h3>

`TabContent` представляет собой содержимое для каждого таба.

> Пропсы `TabContent`
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

> Пропсы `ModalProvider`
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

<h3 style="margin-bottom: 10px;">TabList</h3>

`TabList` представляет собой обертку для списка кнопок табов.

> Пропсы `TabList`
>
> - `className`: Дополнительные классы для стилизации.

<h3 style="margin-bottom: 10px;">TabTrigger</h3>

`TabTrigger` представляет собой кнопку для переключения между табами.

> Пропсы `TabTrigger`
>
> - `value` (обязательный): Уникальное значение таба.
> - `styleActiveTrigger`: Стили для активной кнопки таба.
> - `className`: Дополнительные классы для стилизации.

<h3 style="margin-bottom: 10px;">TabContent</h3>

`TabContent` представляет собой содержимое для каждого таба.

> Пропсы `TabContent`
>
> - `value` (обязательный): Уникальное значение таба, с которым связано содержимое.
> - `className`: Дополнительные классы для стилизации.

<h4 style="margin: 16px 0 4px 0;">Использование</h4>

Пример использования компонентов:

```jsx
import { Tabs, TabList, TabTrigger, TabContent } from "./components/Tabs";

const YourComponents = () => (
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
    <h3 style="margin: 0;">Компонент Таблицы</h3>
  </summary>

  <p style="margin-top: 20px;">Компонент предназначен для отображения данных в виде табличной структуры. Он поддерживает заголовок таблицы, строки данных и возможность отображения загрузочных состояний.</p>

<h3 style="margin-bottom: 10px;">ModalProvider</h3>

`ModalProvider` является провайдером контекста для управления состоянием модального окна. Он должен оборачивать компоненты, которые будут использовать модальные окна.

> Пропсы `ModalProvider`
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

> Пропсы `useModal`
>
> - `className`: Дополнительные классы для стилизации.


```jsx
import { useModal } from './components/Modal';

const YourComponent = () => {
  const { openModal, closeModal, isOpen } = useModal();

  const handleOpenModal = () => {
    openModal(<div>Your Modal Content</div>, { someData: 'data' });
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      {isOpen && <button onClick={closeModal}>Close Modal</button>}
    </div>
  );
};

const ModalContent = ({
  modalData,
}: // settings
//  ModalDataContentType
ModalDataType) => {
  const { data, dataName } = modalData;
  const d = data.d;
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
```





<h3 style="margin-bottom: 10px;">TabTrigger</h3>

`TabTrigger` представляет собой кнопку для переключения между табами.

> Пропсы `TabTrigger`
>
> - `value` (обязательный): Уникальное значение таба.
> - `styleActiveTrigger`: Стили для активной кнопки таба.
> - `className`: Дополнительные классы для стилизации.

<h3 style="margin-bottom: 10px;">TabContent</h3>

`TabContent` представляет собой содержимое для каждого таба.

> Пропсы `TabContent`
>
> - `value` (обязательный): Уникальное значение таба, с которым связано содержимое.
> - `className`: Дополнительные классы для стилизации.

<h4 style="margin: 16px 0 4px 0;">Использование</h4>

Пример использования компонентов:

```jsx
import { Tabs, TabList, TabTrigger, TabContent } from "./components/Tabs";

const YourComponents = () => (
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
