import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "../../../../app/reducers.ts";
import {processActions} from "../slices/processSlice.ts";
import {IProcess, IStep} from "../../api/types.ts";

export const useProcess = () => {
    const dispatch = useDispatch();
    const processState = useSelector((state: RootState) => state.process);

    const updateActiveProcess = (id: string) => {
        dispatch(processActions.setActiveProcess(id));
    };

    const updateProcesses = (processes: IProcess[]) => {
        dispatch(processActions.setProcesses(processes))
    };

    const addProcess = (process: IProcess) => {
        dispatch(processActions.addProcess(process));
    };
    const updateDescription = (id: string, description: string) => {
        dispatch(processActions.setDescription({id, description}));
    };

    const updateTitle = (id: string, title: string) => {
        dispatch(processActions.setTitle({id, title}));
    };

    const updateSteps = (steps: IStep[]) => {
        dispatch(processActions.setProcessSteps(steps));
    };

    const addStep = (step: IStep) => {
        dispatch(processActions.addProcessStep(step));
    };

    const updateStepTitle = (id: string, title: string) => {
        dispatch(processActions.setTitleStep({id, title}));
    };

    const updateStepDescription = (id: string, description: string) => {
        dispatch(processActions.setDescriptionStep({id, description}));
    }



    return {
        addStep,
        addProcess,
        updateSteps,
        updateTitle,
        processState,
        updateStepTitle,
        updateProcesses,
        updateDescription,
        updateActiveProcess,
        updateStepDescription,
    };
};