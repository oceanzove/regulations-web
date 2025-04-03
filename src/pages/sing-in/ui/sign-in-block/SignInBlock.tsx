import css from './SignInBlock.module.scss'
import {Label} from "../../../../shared/ui/label/label.tsx";
import {Input} from "../../../../shared/ui/input/input.tsx";
import {MainButton} from "../../../../shared/ui/main-button/main-button.tsx";
import {useSignIn} from "../../../../entities/user/auth/model/hooks/useSignIn.ts";
import {authAPI} from "../../../../entities/user/auth/api/api.ts";
import {ISignInRequest} from "../../../../entities/user/auth/api/types.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {useNavigate} from "react-router-dom";
import {notificationError} from "../../../../widgets/notifications/callNotification.tsx";

export const SignInBlock = () => {
    const {
        signInState,
        updateEmail,
        updatePassword,
        resetCredentials,
    } = useSignIn();
    const navigate = useNavigate();
    
    const authorizationData: ISignInRequest = {
        email: signInState.email,
        password: signInState.password,
    };
    const [signIn] = authAPI.useSignInMutation();

    const onSignIn = async () => {
        try {
            const res = await signIn(authorizationData)
                .unwrap();

            const { access_token } = res;
            if (access_token) {
                localStorage.setItem('token', access_token); // Сохраняем токен в localStorage
                navigate('./regulation');
                resetCredentials();
            } else {
                console.error('Токен не найден в ответе от сервера.');
            }
        } catch (error) {
            if ((error as FetchBaseQueryError).status === 401) {
                notificationError('Ошибка авторизации', 'Пожалуйста, убедитесь в правильности ввода и повторите попытку.')
            } else if ((error as FetchBaseQueryError).status === 404) {
                notificationError('Ошибка авторизации', 'Проверьте данные или зарегистрируйтесь.')
            } else {
                notificationError('Ошибка авторизации', 'Пожалуйста, попробуйте еще раз позже.')
            }
        }
    };
    return (
        <div className={css.wrapper}>
            <div className={css.title}>Войти</div>
            <Label label="Почта">
                <Input
                    placeholder="Введите почту"
                    value={signInState.email}
                    onChange={(e) => updateEmail(e.target.value)}
                />
            </Label>
            <Label label="Пароль">
                <Input
                    placeholder="Введите пароль"
                    value={signInState.password}
                    onChange={(e) => updatePassword(e.target.value)}
                />
            </Label>
            <MainButton text={'Войти'} onClick={onSignIn}/>
        </div>
    )
}
