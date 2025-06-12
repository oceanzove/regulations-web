import { useDispatch, useSelector } from 'react-redux';
import {signInActions} from "../slices/signInSlice.ts";
import {RootState} from "../../../../../app/reducers.ts";

export const useSignIn = () => {
    const dispatch = useDispatch();
    const signInState = useSelector((state: RootState) => state.signIn);

    const updateLogin = (login: string) => {
        dispatch(signInActions.setLogin(login));
    };

    const updatePassword = (password: string) => {
        dispatch(signInActions.setPassword(password));
    };

    const resetCredentials = () => {
        dispatch(signInActions.clearCredentials());
    };



    return {
        signInState,
        updateLogin,
        updatePassword,
        resetCredentials,
    };
};