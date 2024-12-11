import {useDispatch, useSelector} from 'react-redux';
import {RootState} from "../../../../app/reducers.ts";
import {IRegulation, regulationActions} from "../slices/regulationSlice.ts";

export const useRegulation = () => {
    const dispatch = useDispatch();
    const regulationState = useSelector((state: RootState) => state.regulation);

    const updateRegulation = (regulations: IRegulation[]) => {
        dispatch(regulationActions.setRegulations(regulations))
    };

    const updateContent = (id: string, content: string) => {
        dispatch(regulationActions.setContent({id, content}));
    };

    const updateActiveRegulation = (id: string) => {
        dispatch(regulationActions.setActiveRegulation(id));
    };
    //
    // const updatePassword = (password: string) => {
    //     dispatch(signInActions.setPassword(password));
    // };
    //
    // const resetCredentials = () => {
    //     dispatch(signInActions.clearCredentials());
    // };



    return {
        updateContent,
        regulationState,
        updateRegulation,
        updateActiveRegulation,
        // updatePassword,
        // resetCredentials,
    };
};