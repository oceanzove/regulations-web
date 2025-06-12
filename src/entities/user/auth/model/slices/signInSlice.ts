import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISignInState {
    login: string;
    password: string;
}

const initialState: ISignInState = {
    login: '',
    password: '',
};

export const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        setLogin(state, action: PayloadAction<string>) {
            state.login = action.payload;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        clearCredentials(state) {
            state.login = '';
            state.password = '';
        },
    },
});

export const {
    actions: signInActions,
    reducer: signInReducer,
    selectors: signInSelectors,
} = signInSlice;