import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import NotOwner from './NotOwnerComponent';
import Owner from './OwnerComponent';

import { ErrorContext } from '../../contexts/ErrorContext';
import { DataContext } from '../../contexts/DataContext';

export default function Details() {
    const { getError, cleanError } = useContext(ErrorContext);


    const { getSpecificDataWithId } = useContext(DataContext);


    const { id } = useParams();

    const [item, setItem] = useState({});



    useEffect(() => {
        cleanError();

        async function fetchData() {
            try {
                const result = await getSpecificDataWithId(id);
                setItem(result);
            } catch (error) {
                getError(error);
            }
        }

        fetchData();
        // eslint-disable-next-line
    }, [id]);

    function setNewState({ updatedItem, user }) {
        setItem(() => ({ item: { ...updatedItem }, user: { ...user } }));
    }

    if (item.item) {
        const isOwner = item.item.owner === item.user?._id;
        if (isOwner) {
            return (
                <Owner item={item} />
            );
        }
        return (
            <NotOwner item={item} setNewState={setNewState} />
        );

    }
}