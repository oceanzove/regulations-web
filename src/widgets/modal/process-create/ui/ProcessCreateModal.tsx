import React, {FC, useCallback, useEffect, useState} from "react";
import styles from './ProcessCreateModal.module.scss';
import {IconButton} from "../../../../shared/ui/icon-button/icon-button.tsx";
import {IconEnum} from "../../../../shared/ui/icon/IconType.tsx";
import {Label} from "../../../../shared/ui/label/label.tsx";
import {Input} from "../../../../shared/ui/input/input.tsx";
import {Button} from "../../../../shared/ui/button";
import {v4 as uuid} from 'uuid';
import {IProcess} from "../../../../entities/process/api/types.ts";
import {IStep} from "../../../../entities/step/api/types.ts";
import {IRegulation} from "../../../../entities/regulation/api/types.ts";
import {DropdownMenuRegulations} from "./drowdown-menu-regulations";
import {DropdownMenuSingle} from "../../employee/create/ui/dropdown-menu/DropdownMenu.tsx";
import {IDepartment, IPosition} from "../../../../entities/employee/api/types.ts";
import {organizationApi} from "../../../../entities/employee/api/api.ts";

type TProcessCreateModalProps = {
    isOpen: boolean;
    onClose: () => void;
    regulations: IRegulation[];
    onProcessCreate: (process: IProcess, steps: IStep[], regulationIds: string[]) => void;
}

export const ProcessCreateModal: FC<TProcessCreateModalProps> = (props) => {
    const {
        isOpen, onClose, onProcessCreate, regulations
    } = props;

    const [steps, setSteps] = useState<IStep[]>([{
        id: uuid(),
        name: "",
        order: 0,
        processId: "",
        description: "",
        responsible: ""
    }]);

    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [isDropdownDepartmentOpen, setIsDropdownDepartmentOpen] = useState(false);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);

    const {data: departmentsData} = organizationApi.useGetDepartmentsQuery();

    useEffect(() => {
        if (departmentsData && departmentsData.departments) {
            setDepartments(departmentsData.departments as IDepartment[]);
        }
    }, [departmentsData, setDepartments]);

    const onSelectDepartment = (id: string) => {
        setSelectedDepartmentId(id);
    };

    const [openedStepId, setOpenedStepId] = useState<string | null>(null);
    const [positions, setPositions] = useState<IPosition[]>([]);
    const [selectedPositionId, setSelectedPositionId] = useState<string | null>(null);

    const {data: positionData} = organizationApi.useGetPositionsByDepartmentQuery(selectedDepartmentId!, {
        skip: !selectedDepartmentId,
    });

    useEffect(() => {
        if (positionData?.positions) {
            setPositions(positionData.positions);
            setSelectedPositionId(null);
        }
    }, [positionData]);

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [selectedRegulations, setSelectedRegulations] = useState<string[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const onSave = useCallback(() => {
        onClose();

        const processID = uuid();

        const process: IProcess = {
            id: processID,
            title,
            description,
            responsible: selectedDepartmentId!,
        };

        const stepsWithProcessId = steps
            .map(step => ({
                ...step,
                processId: processID
            }));

        onProcessCreate(process, stepsWithProcessId, selectedRegulations);

        clearStates();
    }, [onClose, title, description, selectedDepartmentId, steps, onProcessCreate, selectedRegulations]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                onSave();
            } else if (e.key === 'Escape') {
                clearStates();
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onSave, isOpen, onClose]);

    if (!isOpen) return null;

    const clearStates = () => {
        setTitle('');
        setDescription('');
        setSelectedDepartmentId('');
        setSteps([{
            id: uuid(),
            name: "",
            order: 0,
            processId: "",
            description: "",
            responsible: ""
        }]);
        setSelectedRegulations([]);
        setIsDropdownOpen(false);
    };

    const onAddStepClick = () => {
        setSteps(prevSteps => {
            const newStep: IStep = {
                id: uuid(),
                name: "",
                processId: "",
                description: "",
                responsible: "",
                order: prevSteps.length
            };
            return [...prevSteps, newStep];
        });
    };

    const onStepChange = (id: string, field: keyof IStep, value: string) => {
        setSteps(prev =>
            prev.map(step =>
                step.id === id ? {...step, [field]: value} : step
            )
        );
    };

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    Создать процесс
                    <div className={styles.iconButtonContainer}>
                        <IconButton
                            typeIcon={IconEnum.CROSS}
                            onClick={onClose}
                        />
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.aboutBlock}>
                        <div className={styles.meta}>
                            <Label label={'Название процесса'}>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value || '')}
                                    placeholder={'Например, разработка сервиса'}
                                />
                            </Label>
                            <Label label={'Описание процесса'}>
                                <Input
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value || '')}
                                    placeholder={'Например, описание сервиса'}
                                />
                            </Label>
                        </div>
                        <DropdownMenuSingle<IDepartment>
                            label="Подразделение"
                            isOpen={isDropdownDepartmentOpen}
                            toggleOpen={() => {
                                setIsDropdownDepartmentOpen(prev => !prev)
                            }}
                            selectedId={selectedDepartmentId}
                            items={departments}
                            getId={(d) => d.id}
                            getLabel={(d) => d.name}
                            onSelect={(id) => {
                                onSelectDepartment(id)
                            }}
                            placeholder="Выбрать подразделения"
                            disabled={false}
                            classes={{
                                dropdownContainer: styles.dropdownDepartment
                            }}
                        />
                    </div>
                    <div className={styles.regulations}>
                        <Label className={'Регламенты'}>
                            {selectedRegulations.length > 0
                                ?
                                <div className={styles.selectedRegulations}>
                                    {selectedRegulations
                                        .map((id => regulations.find(r => r.id === id)))
                                        .filter(Boolean)
                                        .map(regulation => (
                                            <div key={regulation?.id} className={styles.regulationTag}>
                                                {regulation?.title}
                                                <div
                                                    className={styles.removeRegulation}
                                                    onClick={() =>
                                                        setSelectedRegulations(ids => ids
                                                            .filter(x => x !== regulation!.id))}
                                                >
                                                    ×
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                :
                                <div className={styles.noRegulation}>
                                    Пока нет прикрепленных регламентов
                                </div>
                            }
                        </Label>
                        <DropdownMenuRegulations
                            regulations={regulations}
                            label={"Прикрепить регламент"}
                            selectedIds={selectedRegulations}
                            onSelect={(ids) => setSelectedRegulations(ids)}
                            toggleOpen={() => setIsDropdownOpen(o => !o)}
                            isOpen={isDropdownOpen}
                        />
                    </div>

                    <Label label={'Инструкция'} childClassName={styles.instructionContainer}>
                        <div className={styles.filter}>
                            <Button
                                className={styles.filterButton}
                            > № </Button>
                            <Button
                                typeIcon={IconEnum.FILTER}
                                className={styles.filterButton}
                            > Название </Button>
                            <Button
                                typeIcon={IconEnum.FILTER}
                                className={styles.filterButton}
                            > Описание </Button>
                            <Button
                                typeIcon={IconEnum.FILTER}
                                className={styles.filterButton}
                            > Ответственный </Button>
                        </div>
                        <div className={styles.stepsContainer}>
                            {steps.map(step => (
                                <div key={step.id} className={styles.stepBlock}>
                                    <div className={styles.step}>
                                        {step.order + 1}
                                    </div>
                                    <Input
                                        className={styles.step}
                                        value={step.name}
                                        onChange={(e) => onStepChange(step.id, 'name', e.target.value)}
                                        placeholder="Введите название"
                                    />
                                    <Input
                                        className={styles.step}
                                        value={step.description}
                                        onChange={(e) => onStepChange(step.id, 'description', e.target.value)}
                                        placeholder="Введите описание"
                                    />
                                    <DropdownMenuSingle<IPosition>
                                        isOpen={openedStepId === step.id}
                                        toggleOpen={() => setOpenedStepId(prev => prev === step.id ? null : step.id)}
                                        selectedId={step.responsible || null}
                                        items={positions}
                                        getId={(p) => p.id}
                                        getLabel={(p) => p.name}
                                        onSelect={(id) => onStepChange(step.id, 'responsible', id)}
                                        placeholder="Выбрать ответственного"
                                        disabled={false}
                                        classes={{
                                            dropdownButton: styles.dropdownPosition
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </Label>
                    <Button
                        className={styles.addStepButton}
                        onClick={onAddStepClick}
                    >
                        Добавить шаг
                    </Button>
                </div>
                <div className={styles.footer}>
                    <Button
                        className={styles.controlButton}
                        onClick={() => {
                            clearStates()
                            onClose()
                        }}
                    > Отмена </Button>
                    <Button
                        className={styles.controlButton}
                        onClick={onSave}
                    > Сохранить </Button>
                </div>
            </div>
            {/*<div className={css.overlay} onClick={onClose}></div>*/}
            {/*<div className={css.content}>*/}
            {/*    <h2>Выберите компетенции</h2>*/}
            {/*    <ul className={css.list}>*/}
            {/*        {Array.from(competencyNames.entries()).map(([competencyId, competencyName]) => (*/}
            {/*            <li*/}
            {/*                key={competencyId}*/}
            {/*                className={selected.includes(competencyId) ? css.selected : ''}*/}
            {/*                onClick={() => handleCompetencyToggle(competencyId)}*/}
            {/*            >*/}
            {/*                {competencyName}*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*    <div className={css.actions}>*/}
            {/*        <button onClick={onClose}>Отмена</button>*/}
            {/*        <button onClick={handleSave}>Сохранить</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
};