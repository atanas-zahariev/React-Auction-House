import { createContext, useContext } from 'react';

import { clearUser, setUserData } from '../services/utility';

import { ApiContext } from './ApiContext';

export const DataContext = createContext();


export const DataProvider = ({
    children,
}) => {
    const { get, post } = useContext(ApiContext);

    const endpoints = {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout',
        getAllDataInSistem: '/house/catalog',
        getSpecificDataWithId: '/house/details/',
        addInSysten: '/house/create',
        edit: '/house/edit/',
        delete: '/house/delete/',
        closed: '/house/closed',
        action: '/house/userAction/'
    };

    async function login(data) {
        const result = await post(endpoints.login, data);
        setUserData(result);
    }

    async function register(data) {
        const result = await post(endpoints.register, data);
        setUserData(result);
    }

    async function logout() {
        const result = get(endpoints.logout);
        clearUser();
        return result;
    }

    async function getAllDataInSystem() {
        const result = await get(endpoints.getAllDataInSistem);
        return result;
    }

    async function getSpecificDataWithId(id) {
        const result = await get(endpoints.getSpecificDataWithId + id);
        return result;
    }

    async function offer(id, data) {
        const result = await post(endpoints.getSpecificDataWithId + id, data);
        return result;
    }

    async function onEdit(id, data) {
        const result = await post(endpoints.edit + id, data);
        return result;
    };

    async function addInSystem(data) {
        const result = await post(endpoints.addInSysten, data);
        return result;
    }

    async function onDelete(id) {
        const result = await get(endpoints.delete + id);
        return result;
    }

    async function makeAction(specificId) {
        const result = await post({ specificId });
        return result;
    }

    async function getTotalAction() {
        const result = await get(endpoints.closed);
        return result;
    }

    async function getUserAction(id) {
        const result = await get(endpoints.action + id);
        return result;
    }

    const contextValues = {
        login,
        register,
        logout,
        getAllDataInSystem,
        getSpecificDataWithId,
        offer,
        onEdit,addInSystem,
        onDelete,
        makeAction,
        getTotalAction,
        getUserAction,
    };

    return (
        <>
        <DataContext.Provider value={contextValues}>
            {children}
        </DataContext.Provider>
        </>
    );
};