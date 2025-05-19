import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IRegulation} from "../../api/types.ts";

interface IRegulationState {
    activeRegulationId: string | null;
    regulations: IRegulation[];
}

const initialState: IRegulationState = {
    activeRegulationId:  "",
    regulations: []
};

export const regulationSlice = createSlice({
    name: 'regulation',
    initialState,
    reducers: {
        addRegulation(state, action: PayloadAction<IRegulation>) {
            state.regulations.push(action.payload);
        },
        setRegulations(state, action: PayloadAction<IRegulation[]>) {
            state.regulations = action.payload;
        },
        setContent(state, action: PayloadAction<{ id: string; content: string }>) {
            const updatedRegulations = state.regulations.map(reg =>
                reg.id === action.payload.id
                    ? { ...reg, content: action.payload.content }
                    : reg
            );

            return {
                ...state,
                regulations: updatedRegulations,
            };
        },
        setTitle(state, action: PayloadAction<{id: string; title: string}>) {
            console.log(state.regulations);
            console.log(action.payload);
            const updatedRegulations = state.regulations.map(reg =>
                reg.id === action.payload.id
                    ? { ...reg, title: action.payload.title }
                    : reg
            );

            return {
                ...state,
                regulations: updatedRegulations,
            };
        },
        setActiveRegulation(state, action: PayloadAction<string | null>) {
            console.log(action.payload)
            return {
                ...state,
                activeRegulation: action.payload
            }
        },
    },
});

export const {
    actions:regulationActions,
    reducer: regulationReducer,
    selectors: regulationSelectors,
} = regulationSlice;