import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addInSystem, getAllDataInSystem } from '../services/data';
import { ErrorContext } from './ErrorContext';

export const ItemsContext = createContext();

export const ItemsProvider = ({
    children,
}) => {
    const navigate = useNavigate();

    const [incomingItems, setItems] = useState({});

    const { items, user } = incomingItems;



    const { getError, cleanError } = useContext(ErrorContext);

    const fetchData = useCallback( async () => {
        try {
            const result = await getAllDataInSystem();
            setItems(result);
        } catch (error) {
            getError(['Something happened, please try again later']);
        }
    },[getError,]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const createItem = async (data) => {
        try {
            const result = await addInSystem(data);
            cleanError();
            navigate('/catalog');
            setItems((state) => ({ items: [...state.items, result], ...state.user }));
        } catch (error) {
            getError(error);
        }
    };



    const contextVaues = {
        user,
        items,
        createItem,
        fetchData,
    };

    return (
        <>
            <ItemsContext.Provider value={contextVaues}>
                {children}
            </ItemsContext.Provider>
        </>
    );
};