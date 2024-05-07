import {useState, type ReactNode} from "react";
import {Board} from "~/model/Board";
import {Column} from "~/model/Column";
import {Item} from "~/model/Item";
import SettingsContext from "./SettingsContext";

type IWithChildren = {
    children: ReactNode;
};

const SettingsContextProvider = ({children}: IWithChildren) => {
    const [board, setBoard] = useState<Board>({} as Board);
    const [column, setColumn] = useState<Column>({} as Column);
    const [item, setItem] = useState<Item>({} as Item);

    return (
        <SettingsContext.Provider
            value={{
                board,
                column,
                item,
                setBoard,
                setColumn,
                setItem,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export default SettingsContextProvider;
