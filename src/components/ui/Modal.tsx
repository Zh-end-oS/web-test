import React, {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { MdOutlineClose } from "react-icons/md";
import { cn } from "./lib/cn";

export type ModalDataType = Record<string, any>;
export type ModalContentType = ReactElement | null;
export type ModalStyleType = {
  styleModalBG?: string;
  styleModalContainer?: string;
  styleModalHeader?: string;
  styleModalContent?: string;
  styleCloseModal?: string;
};

interface ModalContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;

  modalContent: ModalContentType;

  modalData: ModalDataType;

  styles: ModalStyleType;
  setModalStyles: (styles: ModalStyleType) => void;

  openModal: (content: ModalContentType, data: ModalDataType) => void;
  closeModal: () => void;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContentType>(null);
  const [modalData, setModalData] = useState<ModalDataType>({
    modalData: null,
  });
  const [styles, setStyles] = useState<ModalStyleType>({});

  const openModal = (content: ModalContentType, data: ModalDataType) => {
    setIsOpen(true);
    setModalContent(content);
    setModalData(data);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalContent(null);
    setModalData({
      modalData: null,
    });
  };

  const setModalStyles = (styles: ModalStyleType) => {
    setStyles(styles);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,

        modalContent,

        modalData,

        openModal,
        closeModal,

        styles,
        setModalStyles,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(
      "useModal должен использоваться в контексте ModalProvider!"
    );
  }

  return context;
};

const ModalBroker = () => {
  const { closeModal, modalContent, modalData, isOpen, styles } = useModal();

  if (!isOpen) return null;

  const {
    styleModalBG,
    styleModalContainer,
    styleModalHeader,
    styleModalContent,
    styleCloseModal,
  } = styles;

  return (
    <div
      onClick={closeModal}
      className={cn(
        "fixed w-full h-full py-[_max(60px,30vh)] px-[_max(20px,10vw)] left-0 top-0 z-[100] bg-neutral-800/50",
        styleModalBG
      )}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative flex flex-col w-full h-full p-2 bg-white text-neutral-800 rounded-md",
          styleModalContainer
        )}
      >
        <div className={cn("w-full flex justify-between", styleModalHeader)}>
          <div className={cn("flex items-center min-w-0 cursor-pointer")}>
            Тикеры
          </div>
          <div
            onClick={closeModal}
            className={cn(
              "flex items-center h-[30px] w-[30px] cursor-pointer justify-end",
              styleCloseModal
            )}
          >
            <MdOutlineClose className="h-3/4 w-3/4 " />
          </div>
        </div>
        <div className={styleModalContent}>
          {modalContent && React.cloneElement(modalContent, modalData)}
        </div>
      </div>
    </div>
  );
};

export { useModal, ModalProvider, ModalBroker };
