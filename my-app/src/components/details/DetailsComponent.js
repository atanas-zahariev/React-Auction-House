import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificDataWithId } from '../../services/data';
import { ErrorContext } from '../../contexts/ErrorContext';
import NotOwner from './NotOwnerComponent';
import Owner from './OwnerComponent';
import { AuthContext } from '../../contexts/AuthContext';

export default function Details() {
    const { getError, cleanError } = useContext(ErrorContext);
    const {onLogout} = useContext(AuthContext);

    const navigate = useNavigate();

    const { id } = useParams();

    const [item, setItem] = useState({});

  

    useEffect(() => {
        cleanError();

        async function fetchData() {
            try {
                const result = await getSpecificDataWithId(id);
                setItem(result);
            } catch (error) {                
                if (error[0] === 'Invalid authorization token') {
                    localStorage.clear();
                    onLogout();
                    navigate('/login');
                    return;
                }
                getError(error);
            }
        }

        fetchData();
        // eslint-disable-next-line
    }, [getError, id, navigate]);

    async function setNewState() {
        const result = await getSpecificDataWithId(id);
        setItem(result);
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