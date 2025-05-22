import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IStep} from "../../api/types.ts";

interface IProcessState {
    steps: IStep[];
}

const initialState: IProcessState = {
    steps: [],
};

export const stepSlice = createSlice({
    name: 'step',
    initialState,
    reducers: {
        addStep(state, action: PayloadAction<IStep>) {
            state.steps.push(action.payload);
        },
        setSteps(state, action: PayloadAction<IStep[]>) {
            state.steps = action.payload;
        },
        reorderStep(state, action: PayloadAction<{ id: string; newOrder: number }>) {
            const { id, newOrder } = action.payload;

            // Найдём текущий шаг
            const currentStep = state.steps.find(step => step.id === id);
            if (!currentStep) return;

            // Удалим шаг из списка и вставим на новое место
            const filtered = state.steps.filter(step => step.id !== id);

            filtered.splice(newOrder, 0, { ...currentStep, order: newOrder });

            // Пересчитаем порядки
            state.steps = filtered.map((step, index) => ({ ...step, order: index }));
        }
    },
});

export const {
    actions: stepActions,
    reducer: stepReducer,
    selectors: stepSelectors,
} = stepSlice;
