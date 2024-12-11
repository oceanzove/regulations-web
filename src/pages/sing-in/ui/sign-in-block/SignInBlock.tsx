import css from './SignInBlock.module.scss'
import {Label} from "../../../../shared/ui/label/label.tsx";
import {Input} from "../../../../shared/ui/input/input.tsx";
import {MainButton} from "../../../../shared/ui/button/button.tsx";
import {useSignIn} from "../../../../entities/user/auth/model/hooks/useSignIn.ts";
import {authAPI} from "../../../../entities/user/auth/api/api.ts";
import {ISignInRequest} from "../../../../entities/user/auth/api/types.ts";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";

export const SignInBlock = () => {
    const {
        signInState,
        updateEmail,
        updatePassword,
        resetCredentials,
    } = useSignIn();
    // const navigate = useNavigate();


    const authorizationData: ISignInRequest = {
        email: signInState.email,
        password: signInState.password,
    };
    const [signIn] = authAPI.useSignInMutation();

    const onSignIn = async () => {
        try {
            const res = await signIn(authorizationData)
                .unwrap();

            const { accessToken } = res;

            localStorage.setItem('token', accessToken);

            resetCredentials();
        } catch (error) {
            if ((error as FetchBaseQueryError).status === 401) {
                console.error(
                    'Ошибка авторизации, Пароль введен неверно. Пожалуйста, убедитесь в правильности ввода и повторите попытку.',
                );
            } else if ((error as FetchBaseQueryError).status === 404) {
                console.error(
                    'Ошибка авторизации, Аккаунт не найден. Проверьте данные или зарегистрируйтесь.',
                );
            } else {
                console.error(
                    'Ошибка! Произошла ошибка при авторизации. Пожалуйста, попробуйте еще раз позже.', error
                );
            }
        }
        // navigate('/');
    };
    return (
        <div className={css.wrapper}>
            <div className={css.title}>Войти</div>
            <Label label="Почта">
                <Input
                    placeholder="Введите почту"
                    value={signInState.email}
                    onChange={updateEmail}
                />
            </Label>
            <Label label="Пароль">
                <Input
                    placeholder="Введите пароль"
                    value={signInState.password}
                    onChange={updatePassword}
                />
            </Label>
            <MainButton text={'Войти'} onClick={onSignIn}/>
        </div>
    )
}