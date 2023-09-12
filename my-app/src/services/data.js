import { clearUser, setUserData } from './utility.js';
import { get, post} from './api.js';

const endpoints = {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    getAllDataInSistem: '/house/catalog',
    getSpecificDataWithId: '/house/details/',
    addInSysten: '/house/create',
    edit:'/house/edit/',
    delete:'/house/delete/',
    closed : '/house/closed',
    action:'/house/userAction/'
};

export async function login(data) {
    const result = await post(endpoints.login, data);
    setUserData(result);
}

export async function register(data) {
    const result = await post(endpoints.register, data);
    setUserData(result);
}

export async function logout() {
    get(endpoints.logout);
    clearUser();
}

export async function getAllDataInSystem() {
    const result = await get(endpoints.getAllDataInSistem);
    return result;
}

export async function getSpecificDataWithId(id) {
    const result = await get(endpoints.getSpecificDataWithId + id);
    return result;
}

export async function offer(id,data){
    const result = await post(endpoints.getSpecificDataWithId + id, data);
    return result;
}

export async function onEdit(id, data) {
    const result = await post(endpoints.edit + id, data);
    return result;
};

export async function addInSystem(data) {
    const result = await post(endpoints.addInSysten, data);
    return result;
}

export async function onDelete(id) {
    const result = await get(endpoints.delete + id);
    return result;
}

export async function makeAction(specificId) {
    await post({ specificId });
}

export async function getTotalAction() {
    const result = await get(endpoints.closed);
    return result;
}

export async function getUserAction(id) {
    const result = await get(endpoints.action + id);
    return result;
}