import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorContext } from '../contexts/ErrorContext';
import { getUserAction } from '../services/data';

export default function CloseOffer() {
    const { id } = useParams();
       
   const navigate = useNavigate();

   const {getError} = useContext(ErrorContext);

   useEffect(() => {
    async function fetchData(){
        try {
            await getUserAction(id);
            navigate('/closed');
        } catch (error) {
            //getError(error);
            console.log(error);
        }
    }
    fetchData();
   });

}