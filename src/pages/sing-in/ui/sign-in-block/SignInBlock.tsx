import css from './SignInBlock.module.scss'
import {Label} from "../../../../shared/ui/label/label.tsx";
import {Input} from "../../../../shared/ui/input/input.tsx";
import {MainButton} from "../../../../shared/ui/main-button/main-button.tsx";
import {useSignIn} from "../../../../entities/user/auth/model/hooks/useSignIn.ts";
import {authAPI} from "../../../../entities/user/auth/api/api.ts";
import {ISignInRequest} from "../../../../entities/user/auth/api/types.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {useNavigate} from "react-router-dom";
import {notificationError, notificationSuccess} from "../../../../widgets/notifications/callNotification.tsx";

export const SignInBlock = () => {
    const {
        signInState,
        updateLogin,
        updatePassword,
        resetCredentials,
    } = useSignIn();
    const navigate = useNavigate();
    
    const authorizationData: ISignInRequest = {
        login: signInState.login,
        password: signInState.password,
    };

    const [signIn] = authAPI.useSignInMutation();

    const onSignIn = async () => {
        try {
            const res = await signIn(authorizationData).unwrap();
            const { access_token, refresh_token } = res;
            if (access_token) {
                localStorage.setItem('access_token', access_token);
            }
            if (refresh_token) {
                localStorage.setItem('refresh_token', refresh_token);
            }


            resetCredentials();
            navigate('./');
            localStorage.removeItem('isSessioanLocked');
            localStorage.removeItem('isSessionExpiredShown');
            notificationSuccess('Успешный вход');
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
                    value={signInState.login}
                    onChange={(e) => updateLogin(e.target.value)}
                />
            </Label>
            <Label label="Пароль">
                <Input
                    type={'password'}
                    placeholder="Введите пароль"
                    value={signInState.password}
                    onChange={(e) => updatePassword(e.target.value)}
                />
            </Label>
            <MainButton text={'Войти'} onClick={onSignIn}/>
        </div>
    )
}
