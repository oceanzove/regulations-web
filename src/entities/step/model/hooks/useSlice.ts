import { useDispatch, useSelector } from 'react-redux';
import { stepActions } from '../slices/stepSlice.ts';
import {RootState} from "../../../../app/reducers.ts";
import {IStep} from "../../api/types.ts";

export const useSteps = () => {
    const dispatch = useDispatch();
    const stepState = useSelector((state: RootState) => state.step);

    const addStep = (step: IStep) => {
        dispatch(stepActions.addStep(step));
    };

    const setSteps = (steps: IStep[]) => {
        dispatch(stepActions.setSteps(steps));
    };

    const reorderStep = (id: string, newOrder: number) => {
        dispatch(stepActions.reorderStep({ id, newOrder }));
    };

    return {
        addStep,
        setSteps,
        stepState,
        reorderStep,
    };
};
