import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { clearUser, getUser } from '../services/utility';

import { AuthContext } from './AuthContext';

export const ApiContext = createContext();


export const ApiProvider = ({
    children,
}) => {
    const navigate = useNavigate();

    const { onLogout } = useContext(AuthContext);

    const host = 'http://localhost:3030';

    async function request(method, url, data) {
        const user = getUser();

        const option = {
            method,
            headers: {}
        };

        if (user != null) {
            option.headers['X-Authorization'] = user;
        }

        if (data !== undefined) {
            option.headers['Content-Type'] = 'application/json';
            option.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(host + url, option);

            let result;

            if (response.status !== 204) {
                result = await response.json();
            }

            if (response.ok === false) {

                if (response.status === 403) {
                    clearUser();
                }

                const err = result;

                throw err;
            }

            return result;


        } catch (error) {
            if (error[0] === 'Invalid authorization token') {
                localStorage.clear();
                onLogout();
                navigate('/login');
                return;
            }
            throw error;
        }
    }

    const get = request.bind(null, 'get');
    const post = request.bind(null, 'post');
    const put = request.bind(null, 'put');
    const del = request.bind(null, 'delete');

    const contextValues = {
        get,
        post,
        put,
        del,
    };

    return (
        <>
            <ApiContext.Provider value={contextValues}>
                {children}
            </ApiContext.Provider>
        </>
    );
};