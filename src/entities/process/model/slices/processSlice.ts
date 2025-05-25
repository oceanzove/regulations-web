import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IProcess} from "../../api/types.ts";

interface IProcessState {
    activeProcess: string | null;
    processes: IProcess[];
}

const initialState: IProcessState = {
    activeProcess:  "",
    processes: [],
};

export const processSlice = createSlice({
    name: 'process',
    initialState,
    reducers: {
        addProcess(state, action: PayloadAction<IProcess>) {
            state.processes.push(action.payload);
        },
        setProcesses(state, action: PayloadAction<IProcess[]>) {
            state.processes = action.payload;
        },
        setActiveProcess(state, action: PayloadAction<string | null>) {
            state.activeProcess = action.payload;
        },
    },
});

export const {
    actions: processActions,
    reducer: processReducer,
    selectors: processSelectors,
} = processSlice;
