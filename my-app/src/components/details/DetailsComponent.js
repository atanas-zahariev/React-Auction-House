import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSpecificDataWithId } from '../../services/data';
import { ErrorContext } from '../../contexts/ErrorContext';
import NotOwner from './NotOwnerComponent';
import Owner from './OwnerComponent';

export default function Details() {
    const { getError } = useContext(ErrorContext);

    const { id } = useParams();

    const [item, setItem] = useState({});

    useEffect(() => {

        async function fetchData() {
            try {
                const result = await getSpecificDataWithId(id);
                setItem(result);
            } catch (error) {
                getError(error);
            }
        }

        fetchData();

    }, [getError, id]);

    if (item.item) {
        const isOwner = item.item.owner === item.user?._id;
        if (isOwner) {
            return (
                <Owner item={item} />
            );
        }
        return (
            <NotOwner item={item} />
        );

    }
}