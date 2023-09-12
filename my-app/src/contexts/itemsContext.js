import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addInSystem, getAllDataInSystem } from '../services/data';
import { ErrorContext } from './ErrorContext';
import {AuthContext} from './AuthContext';

export const ItemsContext = createContext();

export const ItemsProvider = ({
    children,
}) => {
   const {onLogout} = useContext(AuthContext);

    const navigate = useNavigate();

    const [incomingItems, setItems] = useState({});

    const { items, user } = incomingItems;



    const { getError, cleanError } = useContext(ErrorContext);

    const fetchData = useCallback( async () => {
        try {
            const result = await getAllDataInSystem();
            setItems(result);
        } catch (error) {
            if (error[0] === 'Invalid authorization token') {
                localStorage.clear();
                onLogout();
                navigate('/login');
                return;
            }
            getError(['Something happened, please try again later']);
        }
        // eslint-disable-next-line
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
            if (error[0] === 'Invalid authorization token') {
                localStorage.clear();
                onLogout();
                navigate('/login');
                return;
            }
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