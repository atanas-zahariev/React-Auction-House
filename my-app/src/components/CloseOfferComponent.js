import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorContext } from '../contexts/ErrorContext';
import { getUserAction } from '../services/data';
import {AuthContext} from '../contexts/AuthContext';

export default function CloseOffer() {
    const { id } = useParams();
       
   const navigate = useNavigate();

   const {onLogout} = useContext(AuthContext);

   const {getError} = useContext(ErrorContext);

   useEffect(() => {
    async function fetchData(){
        try {
            await getUserAction(id);
            navigate('/closed');
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
   });

}