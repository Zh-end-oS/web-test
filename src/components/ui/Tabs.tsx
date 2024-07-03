import { cn } from "./lib/cn";
import React, { createContext, useContext, ReactNode, useState } from "react";

type TabsContextType = {
  activeTab: string;
  setTab: (value: string) => void;
  styleTriggers?: string;
  styleActiveTriggers?: string;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

type TabsPropsType = {
  children?: ReactNode;
  defaultValue: string;
  className?: string;
  styleTriggers?: string;
  styleActiveTriggers?: string;
};

// Обертка для табов
const Tabs: React.FC<TabsPropsType> = ({
  children,
  defaultValue,
  className,
  styleActiveTriggers,
  styleTriggers,
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultValue);

  const setTab = (value: string) => {
    setActiveTab(value);
  };

  return (
    <TabsContext.Provider
      value={{ activeTab, setTab, styleTriggers, styleActiveTriggers }}
    >
      <div className={cn("w-full flex flex-col", className)}>{children}</div>
    </TabsContext.Provider>
  );
};

type TabListPropsType = {
  children?: ReactNode;
  className?: string;
};

// Обертка для кнопок
const TabList: React.FC<TabListPropsType> = ({ children, className }) => {
  return (
    <div className={cn("flex flex-row text-nowrap", className)}>{children}</div>
  );
};

type TabTriggerPropsType = {
  children?: ReactNode;
  value: string;
  styleActiveTrigger?: string;
  styleActiveTriggers?: string;
  className?: string;
};

// Кнопки смены табов
const TabTrigger: React.FC<TabTriggerPropsType> = ({
  children,
  value,
  styleActiveTrigger,
  className,
}) => {
  const { activeTab, setTab, styleTriggers, styleActiveTriggers } =
    useContext(TabsContext)!;

  const handleClick = () => {
    setTab(value);
  };

  const styleAll = styleTriggers || "";
  const styleAllAct = styleActiveTrigger || "";
  const styleAct = styleActiveTriggers || "";
  const isActive = value === activeTab;

  return (
    <div
      className={cn(
        "cursor-pointer text-center hover:bg-gray-50 hover:text-gray-700",
        className,
        styleAll,
        isActive ? styleAllAct + " " + styleAct : ""
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

type TabContentPropsType = {
  children?: ReactNode;
  value: string;
  className?: string;
};

// Содержимое табов
const TabContent: React.FC<TabContentPropsType> = ({
  children,
  value,
  className,
}) => {
  const { activeTab } = useContext(TabsContext)!;

  return (
    <div
      className={cn("w-full flex-1 min-h-0", className)}
      style={{ display: value === activeTab ? "block" : "none" }}
    >
      {children}
    </div>
  );
};

export { Tabs, TabList, TabTrigger, TabContent };
