import {createSlice} from '@reduxjs/toolkit';



const initialState = {

};

export const organizationSlice = createSlice({
    name: 'organization',
    initialState,
    reducers: {

    },
});

export const {
    actions: organizationActions,
    reducer: organizationReducer,
    selectors: organizationSelectors,
} = organizationSlice;