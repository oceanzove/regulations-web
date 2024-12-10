import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISignInState {
    email: string;
    password: string;
}

const initialState: ISignInState = {
    email: '',
    password: '',
};

export const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload;
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },
        clearCredentials(state) {
            state.email = '';
            state.password = '';
        }
    },
    // selectors: {
    //     getEmail: (state) => state.email,
    //     getPassword: (state) => state.password,
    // }
});

export const {
    actions: signInActions,
    reducer: signInReducer,
    selectors: signInSelectors,
} = signInSlice;