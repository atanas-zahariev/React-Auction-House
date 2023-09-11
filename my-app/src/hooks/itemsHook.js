import { useState } from 'react';

export const useItemsHook = () => {
    const [items, setItems] = useState({});

    const setItemsState = (values) => {
        setItems(values);
    };

    return [
        items,
        setItemsState
    ];
};
