export const SERVER_ENVIRONMENT_RELEASE = 'release';
export const SERVER_ENVIRONMENT_TEST = 'testing';
export const SERVER_ENVIRONMENT_DEV = 'dev';

const BASE_API_URL_DEV = 'http://localhost:25504';

/* Слой доступа к данным */
class DAL {
    apiUrl: string;

    constructor() {
        // Получаем переменную окружения для Vite
        const serverEnvironment = import.meta.env.VITE_ENVIRONMENT_SERVER;
        // Выбор URL в зависимости от среды
        // switch (serverEnvironment) {
        //     // case SERVER_ENVIRONMENT_RELEASE:
        //     //     apiUrl = 'https://wakadoo.ru/api/';
        //     //     break;
        //     // case SERVER_ENVIRONMENT_TEST:
        //     //     apiUrl = 'https://test.wakadoo.ru/api/';
        //     //     break;
        //     default:
        //         apiUrl = BASE_API_URL_DEV;
        //

        this.apiUrl = BASE_API_URL_DEV;
    }
}

const API = new DAL();

export default API;
