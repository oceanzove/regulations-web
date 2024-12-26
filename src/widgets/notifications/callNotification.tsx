import React from 'react';
import { toast } from 'react-toastify';
import styles from './toastContainer.module.scss';
import { Notifications } from "./notifications.tsx";

export enum ERROR_MESSAGE_LIST {
    ERROR = 'Ошибка!',
    ACCESS_DENIED = 'Доступ запрещен!',
    GENERAL_EXCEPTION = 'Мы уже устраняем неисправность, попробуйте обновить страницу через некоторое время!',
    ITEM_NOT_FOUND = 'Ресурс не найден!',
    INVALID_REQUEST = 'Введенные данные некорректны!',
    RESOURCE_MODIFIED = 'Обновленный ресурс изменился с момента последнего чтения!',
    UN_AUTHENTICATED = 'Логин/пароль не верны!',
    SEND_EMAIL = 'Возникла ошибка при работе с e-mail!',
    RESOURCE_DELETED = 'Все действия с ресурсом запрещены, поскольку он был удален!',
    NOT_CONFIRMED = 'Код подтверждения неверный, попробуйте еще раз!',
    TIMEOUT_EXPIRED = 'Срок выполнения действия истек!',
    HEADER_EXCEPTION = 'Обязательные заголовки запроса отсутствуют или неверны!',
}

const ACCESS_DENIED = 'accessDenied';
const GENERAL_EXCEPTION = 'generalException';
const ITEM_NOT_FOUND = 'itemNotFound';
const INVALID_REQUEST = 'invalidRequest';
const RESOURCE_MODIFIED = 'resourceModified';
const UN_AUTHENTICATED = 'unAuthenticated';
const SEND_EMAIL = 'sendEmail';
const RESOURCE_DELETED = 'resourceDeleted';
const NOT_CONFIRMED = 'notConfirmed';
const TIMEOUT_EXPIRED = 'timeoutExpired';
const HEADER_EXCEPTION = 'headerException';

/**
 * Функция отображения среднего уведомления
 * @param text Текст уведомления
 * @param autoClose Время автозакрытия в миллисекундах
 */
export const showMiddleNotification = (text: string, autoClose = 100000000) => {
    toast(
        (
            <Notifications
                title={text}
                description=""
            />
        ), {
            position: 'top-right',
            autoClose,
            hideProgressBar: true,
            pauseOnHover: true,
            className: styles.ToastBottom,
        },
    );
};

/**
 * Функция отображения успешного уведомления
 * @param title Заголовок уведомления
 * @param description Описание уведомления
 * @param filled Заполнен ли стиль
 * @param autoClose Время автозакрытия в миллисекундах
 */
export const notificationSuccess = (title: string, description = '', filled = true, autoClose = 1000) => {
    console.log('success');
    toast(
        (
            <Notifications
                title={title}
                filled={filled}
                description={description}
            >
                {filled ? (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228
    								2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                ) : (
                    <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7.5 12L10.5 15L16.5 9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228
    									2 12C2
    					6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                            stroke="#249C5C"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </Notifications>
        ), {
            position: 'top-right',
            autoClose,
            hideProgressBar: true,
            pauseOnHover: true,
            type: 'success',
            icon: false,
            closeButton: true,
            className: filled ? styles.ToastFilledSuccess : '',
        },
    );
};

/**
 * Функция отображения информационного уведомления
 * @param title Заголовок уведомления
 * @param description Описание уведомления
 * @param filled Заполнен ли стиль
 * @param autoClose Время автозакрытия в миллисекундах
 */
export const notificationInfo = (title: string, description = '', filled = true, autoClose = 7000) => {
    toast(
        (
            <Notifications
                title={title}
                filled={filled}
                description={description}
            />
        ), {
            position: 'top-right',
            autoClose,
            hideProgressBar: true,
            pauseOnHover: true,
            type: 'info',
            icon: false,
            closeButton: true,
            className: filled ? styles.ToastFilledInfo : '',
        },
    );
};

/**
 * Функция отображения ошибочного уведомления
 * @param title Заголовок уведомления
 * @param description Описание уведомления
 * @param filled Заполнен ли стиль
 * @param autoClose Время автозакрытия в миллисекундах
 */
export const notificationError = (title: string, description = '', filled = true, autoClose = 7000) => {
    toast(
        (
            <Notifications
                title={title}
                filled={filled}
                description={description}
            >
                {filled ? (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11.9998 8.99999V13M11.9998 17H12.0098M10.6151 3.89171L2.39019 18.0983C1.93398
    								18.8863 1.70588 19.2803 1.73959 19.6037C1.769 19.8857 1.91677 20.142 2.14613
    								20.3088C2.40908 20.5 2.86435 20.5 3.77487 20.5H20.2246C21.1352 20.5 21.5904 20.5
    								21.8534 20.3088C22.0827 20.142 22.2305 19.8857 22.2599 19.6037C22.2936 19.2803 22.0655
    								18.8863 21.6093 18.0983L13.3844 3.89171C12.9299 3.10654 12.7026 2.71396 12.4061
    								2.58211C12.1474 2.4671 11.8521 2.4671 11.5935 2.58211C11.2969 2.71396 11.0696 3.10655
    								10.6151 3.89171Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                ) : (
                    <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11.9998 8.99999V13M11.9998 17H12.0098M10.6151 3.89171L2.39019 18.0983C1.93398
    									18.8863
    					1.70588 19.2803 1.73959 19.6037C1.769 19.8857 1.91677 20.142 2.14613 20.3088C2.40908 20.5 2.86435
    					20.5 3.77487 20.5H20.2246C21.1352 20.5 21.5904 20.5 21.8534 20.3088C22.0827 20.142 22.2305 19.8857
    					22.2599 19.6037C22.2936 19.2803 22.0655 18.8863 21.6093 18.0983L13.3844 3.89171C12.9299 3.10654
    					12.7026 2.71396 12.4061 2.58211C12.1474 2.4671 11.8521 2.4671 11.5935 2.58211C11.2969 2.71396 11.0696 3.10655
    					10.6151 3.89171Z"
                            stroke="#FF3636"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </Notifications>
        ), {
            position: 'top-right',
            autoClose,
            hideProgressBar: true,
            pauseOnHover: true,
            type: 'error',
            icon: false,
            closeButton: true,
            className: filled ? styles.ToastFilledError : '',
        },
    );
};

/**
 * Функция отображения предупреждающего уведомления
 * @param title Заголовок уведомления
 * @param description Описание уведомления
 * @param filled Заполнен ли стиль
 * @param autoClose Время автозакрытия в миллисекундах
 */
export const notificationWarning = (title: string, description = '', filled = true, autoClose = 7000) => {
    toast(
        (
            <Notifications
                title={title}
                filled={filled}
                description={description}
            >
                {filled ? (
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2
    								17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                ) : (
                    <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2
    									17.5228 2 12C2 6.47715
    					6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                            stroke="#F2B519"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </Notifications>
        ), {
            position: 'top-right',
            autoClose,
            hideProgressBar: true,
            pauseOnHover: true,
            type: 'warning',
            icon: false,
            closeButton: true,
            className: filled ? styles.ToastFilledWarning : '',
        },
    );
};

/**
 * Обработчик уведомлений по коду ошибки
 * @param code Код ошибки
 */
export const notificationHandler = (code: string) => {
    switch (code) {
        case ACCESS_DENIED:
            notificationError(ERROR_MESSAGE_LIST.ERROR, ERROR_MESSAGE_LIST.ACCESS_DENIED);
            break;
        case GENERAL_EXCEPTION:
            notificationError(ERROR_MESSAGE_LIST.ERROR, ERROR_MESSAGE_LIST.GENERAL_EXCEPTION);
            break;
        case ITEM_NOT_FOUND:
            notificationError(ERROR_MESSAGE_LIST.ERROR, ERROR_MESSAGE_LIST.ITEM_NOT_FOUND);
            break;
        case INVALID_REQUEST:
            notificationError(ERROR_MESSAGE_LIST.ERROR, ERROR_MESSAGE_LIST.INVALID_REQUEST);
            break;
        case RESOURCE_MODIFIED:
            notificationError(ERROR_MESSAGE_LIST.ERROR, ERROR_MESSAGE_LIST.RESOURCE_MODIFIED);
            break;
        case UN_AUTHENTICATED:
            notificationError(ERROR_MESSAGE_LIST.ERROR, ERROR_MESSAGE_LIST.UN_AUTHENTICATED);
            break;
        case SEND_EMAIL:
            notificationError(ERROR_MESSAGE_LIST.ERROR, ERROR_MESSAGE_LIST.SEND_EMAIL);
            break;
        case RESOURCE_DELETED:
            notificationError(ERROR_MESSAGE_LIST.ERROR, ERROR_MESSAGE_LIST.RESOURCE_DELETED);
            break;
        case NOT_CONFIRMED:
            notificationError(ERROR_MESSAGE_LIST.ERROR, ERROR_MESSAGE_LIST.NOT_CONFIRMED);
            break;
        case TIMEOUT_EXPIRED:
            notificationError(ERROR_MESSAGE_LIST.ERROR, ERROR_MESSAGE_LIST.TIMEOUT_EXPIRED);
            break;
        case HEADER_EXCEPTION:
            notificationError(ERROR_MESSAGE_LIST.ERROR, ERROR_MESSAGE_LIST.HEADER_EXCEPTION);
            break;
        default:
            // Обработка неизвестного кода ошибки
            break;
    }
};
