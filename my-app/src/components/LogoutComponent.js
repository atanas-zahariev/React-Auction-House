import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { logout } from '../services/data';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const { onLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            try {
                await logout();
            } catch (error) {
                console.log(error);
                if (error[0] === 'Invalid authorization token') {
                    localStorage.clear();
                    onLogout();
                    navigate('/login');
                    return;
                }
            }
        }
        fetchData();
        onLogout();
        navigate('/');
        // eslint-disable-next-line
    },[]);
}