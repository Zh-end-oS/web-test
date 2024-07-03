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

export type ModalDataType = any;
export type ModalContentType = ReactElement | null | undefined;
export type ModalContentDataType = {
  content?: ModalContentType;
  data?: ModalDataType;
};

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

  openModal: (props: ModalContentDataType) => void;
  closeModal: () => void;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContentType>(null);
  const [modalData, setModalData] = useState<ModalDataType>({
    modalData: null,
  });

  const openModal = (props: ModalContentDataType) => {
    const { content, data } = props;
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

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        setIsOpen,

        openModal,
        closeModal,

        modalContent,
        modalData,
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

const ModalBroker = ({ ...props }: ModalStyleType) => {
  const { closeModal, modalContent, modalData, isOpen } = useModal();
  if (!isOpen) return null;

  const {
    styleModalBG,
    styleModalContainer,
    styleModalHeader,
    styleModalContent,
    styleCloseModal,
  } = props;

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
            <MdOutlineClose className="h-3/4 w-3/4" />
          </div>
        </div>

        <div className={cn("overflow-y-auto py-2", styleModalContent)}>
          {modalContent &&
            React.cloneElement(modalContent, {
              modalData,
            })}
        </div>
      </div>
    </div>
  );
};

export { useModal, ModalProvider, ModalBroker };
