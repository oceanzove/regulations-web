import styles from './ProcessView.module.scss';
import React, {useEffect, useMemo, useState} from "react";
import {Label} from "../../../../../../../shared/ui/label/label.tsx";
import {Input} from "../../../../../../../shared/ui/input/input.tsx";
import {IProcess} from "../../../../../../../entities/process/api/types.ts";
import {processApi} from "../../../../../../../entities/process/api/api.ts";
import {notificationError, notificationSuccess} from "../../../../../../../widgets/notifications/callNotification.tsx";
import {IRegulation} from "../../../../../../../entities/regulation/api/types.ts";
import {IStep} from "../../../../../../../entities/step/api/types.ts";
import {Button} from "../../../../../../../shared/ui/button";
import {IconEnum} from "../../../../../../../shared/ui/icon/IconType.tsx";
import {useNavigate} from "react-router-dom";
import {organizationApi} from "../../../../../../../entities/employee/api/api.ts";
import {RegulationViewModal} from "../../../../../../../widgets/modal/regulation/view";
import {DropdownMenuSingle} from "../../../../../../../widgets/modal/employee/create/ui/dropdown-menu/DropdownMenu.tsx";
import {EmployeeMaritalStatusEnum, IDepartment, IPosition} from "../../../../../../../entities/employee/api/types.ts";
import {DropdownMenuRegulations} from "../../../../../../../widgets/modal/process-create/ui/drowdown-menu-regulations";
import {regulationApi} from "../../../../../../../entities/regulation/api/api.ts";
import {v4 as uuid} from "uuid";

interface IProcessEditorProps {
    steps: IStep[],
    process: IProcess,
    regulations: IRegulation[],
}

export const ProcessView = (props: IProcessEditorProps) => {
    const {steps, process, regulations} = props;

    const [isEditMode, setIsEditMode] = useState(false);

    const navigate = useNavigate();

    const [localTitle, setLocalTitle] = useState(process.title);
    const [localDescription, setLocalDescription] = useState(process.description);

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

    const [selectedRegulation, setSelectedRegulation] = useState<IRegulation | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen((prev) => !prev);
    }

    const {data: regulationData} = regulationApi.useGetQuery();

    const [selectedRegulationIds, setSelectedRegulations] = useState<string[]>([]);

    useEffect(() => {
        if (regulations) {
            setSelectedRegulations(regulations.map(r => r.id));
        }
    }, [regulations]);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const {data: positionsData} = organizationApi.useGetPositionsQuery();
    const {data: departmentData} = organizationApi.useGetDepartmentByIdQuery(process.responsible!, {
        skip: !process.responsible,
    });

    useEffect(() => {
        setLocalTitle(process.title);
        setLocalDescription(process.description);
        if (departmentData) {
            setSelectedDepartmentId(departmentData.id);
        }
    }, [departmentData, process]);

    const [openedStepId, setOpenedStepId] = useState<string | null>(null);
    const [positions, setPositions] = useState<IPosition[]>([]);
    const [selectedPositionId, setSelectedPositionId] = useState<string | null>(null);

    const [stepState, setStepState] = useState<IStep[]>([]);

    useEffect(() => {
        if (steps && steps.length > 0) {
            setStepState(steps);
        }
    }, [steps]);

    const {data: positionData} = organizationApi.useGetPositionsByDepartmentQuery(selectedDepartmentId!, {
        skip: !selectedDepartmentId,
    });

    useEffect(() => {
        if (positionData?.positions) {
            setPositions(positionData.positions);
            setSelectedPositionId(null);
        }
    }, [positionData]);

    const [update] = processApi.useUpdateMutation();
    const [createStep] = processApi.useCreateStepMutation();
    const [updateStep] = processApi.useUpdateStepByIdMutation();
    const [deleteStep] = processApi.useDeleteStepByIdMutation();
    const [linkRegulation] = processApi.useLinkRegulationMutation();
    const [unlinkRegulation] = processApi.useUnlinkRegulationMutation();

    const onSaveClick = async (closeAfter: boolean = false) => {
        if (!isFormValid) return;

        // if (localTitle !== activeProcess.title) {
        //     updateTitle(activeProcess.id, localTitle);
        // }
        // if (localDescription !== activeProcess.description) {
        //     updateDescription(activeProcess.id, localDescription);
        // }

        try {
            // 1. Обновляем процесс
            update({
                process: process.id,
                title: localTitle,
                description: localDescription,
                responsible: selectedDepartmentId!
            })

            // 2. Обновляем шаги
            if (stepState.length > 0) {
                const currentIds = new Set(stepState.map(step => step.id).filter(Boolean)); // только с id
                const originalIds = new Set(steps.map(step => step.id));

                const stepsToUpdate = stepState.filter(step => step.id); // есть id → обновляем
                const stepsToCreate = stepState.filter(step => !originalIds.has(step.id));

                const stepsToDelete = steps.filter(step => !currentIds.has(step.id));

                await Promise.all([
                    ...stepsToUpdate.map(step => updateStep(step)),
                    ...stepsToCreate.map(step => createStep(step)),
                    ...stepsToDelete.map(step => deleteStep(step.id)),
                ]);
            }

            // 3. Связываем регламенты
            if (selectedRegulationIds.length > 0) {
                // Текущие регламенты, связанные с процессом (предполагается, что есть в process.regulations)
                const currentLinkedIds = regulations.map(r => r.id);

                // Какие нужно добавить
                const toAdd = selectedRegulationIds.filter(id => !currentLinkedIds.includes(id));

                // Какие нужно удалить
                const toRemove = currentLinkedIds.filter(id => !selectedRegulationIds.includes(id));

                // Можно делать последовательно, если важен порядок, либо Promise.all
                await Promise.all(toAdd.map(regulationId =>
                    linkRegulation({processId: process.id, regulationId}).unwrap()
                ));

                await Promise.all(toRemove.map(regulationId =>
                    unlinkRegulation({processId: process.id, regulationId}).unwrap()
                ));
            }
            notificationSuccess('Сохранение', 'Процесс успешно создан');
        } catch (error) {
            notificationError('Сохранение', 'Не удалось сохранить обновленный процесс');
            console.error("Error creating regulation:", error);
        }

        if (closeAfter) {
            navigate(-1);
        }
    };

    const [deleteProcess] = processApi.useDeleteProcessByIdMutation();

    const onDeleteClick = async () => {
        try {
            await deleteProcess(process.id);
            navigate(-1);
            notificationSuccess("Удаление", "Процесс успешно удален");
        } catch (error) {
            notificationError("Ошибка при удаление процесса")
            console.error("Ошибка при удаление процесса", error);
        }
    };

    const onStepChange = (id: string, field: keyof IStep, value: string) => {
        setStepState(prev =>
            prev.map(step =>
                step.id === id ? {...step, [field]: value} : step
            )
        );
    };

    const setDefault = () => {
        setStepState(steps);
        setLocalTitle(process.title);
        setLocalDescription(process.description);
        setSelectedDepartmentId(process.responsible);
        setSelectedRegulations(regulations.map(r => r.id));
    };

    const onAddStepClick = () => {
        setStepState(prevSteps => {
            const newStep: IStep = {
                id: uuid(),
                name: "",
                processId: process.id,
                description: "",
                responsible: "",
                order: prevSteps.length
            };
            return [...prevSteps, newStep];
        });
    };

    const moveStep = (id: string, direction: 'up' | 'down') => {
        setStepState(prev => {
            const sorted = [...prev].sort((a, b) => a.order - b.order);
            const index = sorted.findIndex(step => step.id === id);

            if (index === -1) return prev;

            const swapWith = direction === 'up' ? index - 1 : index + 1;
            if (swapWith < 0 || swapWith >= sorted.length) return prev;

            [sorted[index], sorted[swapWith]] = [sorted[swapWith], sorted[index]];

            return sorted.map((step, i) => ({ ...step, order: i }));
        });
    };


    const {data: accountData} = organizationApi.useGetAccountQuery();
    const {data: employeeDepartmentData} = organizationApi.useGetEmployeeDepartmentQuery();

    const isAdmin = accountData?.role === 'administrator';
    useEffect(() => {
        const departmentId = employeeDepartmentData?.employeeDepartment.filter(e => e.employeeId === accountData?.id) || [];
        if (!isAdmin && departmentId.length > 0) {
            setSelectedDepartmentId(departmentId[0].departmentId || null);
        }
    }, [isAdmin, accountData, employeeDepartmentData?.employeeDepartment]);

    const isDataLoading =
        !departmentsData ||
        !regulationData ||
        !positionsData ||
        !accountData ||
        !employeeDepartmentData ||
        (process.responsible && !departmentData);

    const isFormValid = useMemo(() => {
        if (!localTitle.trim() || !localDescription.trim() || !selectedDepartmentId) return false;

        // Проверяем, что у всех шагов указана должность
        const anyStepWithoutPosition = stepState.some(step => step.responsible === '');
        return !anyStepWithoutPosition;
    }, [localTitle, localDescription, selectedDepartmentId, stepState]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>

                {isDataLoading ?
                    <div className={styles.loaderOverlay}>
                        <div className={styles.spinner}></div>
                    </div>
                    :
                    <div>
                        <div className={styles.aboutBlock}>
                            <div className={styles.meta}>
                                <Label label={'Название'} className={styles.label}>
                                    <Input
                                        value={localTitle}
                                        disabled={!isEditMode}
                                        onChange={(e) => setLocalTitle(e.target.value || '')}
                                    />
                                </Label>
                                <Label label={'Описание'}>
                                    <Input
                                        value={localDescription}
                                        disabled={!isEditMode}
                                        onChange={(e) => setLocalDescription(e.target.value || '')}
                                    />
                                </Label>
                            </div>
                            <DropdownMenuSingle<IDepartment>
                                label="Отвественный отдел"
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

                                    setStepState(prev =>
                                        prev.map(step => ({
                                            ...step,
                                            responsible: '',
                                        }))
                                    );
                                }}
                                placeholder="Выбрать ответственный отдел"
                                disabled={!isEditMode || !isAdmin}
                                classes={{
                                    dropdownContainer: styles.dropdownDepartment
                                }}
                            />
                        </div>
                        <div className={styles.regulationsBlock}>
                            <Label label={'Регламенты'} childClassName={styles.regulationInput}>
                                {selectedRegulationIds.length > 0
                                    ?
                                    <div className={styles.regulationContainer}>
                                        {(regulationData?.regulations ?? [])
                                            .filter((r) => selectedRegulationIds.includes(r.id))
                                            .map((regulation) => (
                                                <div
                                                    key={regulation.id}
                                                    className={styles.regulationTag}
                                                    onClick={() => {
                                                        setSelectedRegulation(regulation);
                                                        setIsModalOpen(true);
                                                    }}
                                                >
                                                    {regulation.title}
                                                    {isEditMode && (
                                                        <div
                                                            className={styles.removeRegulation}
                                                            onClick={(event) => {
                                                                setSelectedRegulations(ids => ids
                                                                    .filter(x => x !== regulation!.id))
                                                                event.stopPropagation();
                                                            }}
                                                        >
                                                            ×
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                    :
                                    <div className={styles.noRegulation}>
                                        Пока нет прикрепленных регламентов
                                    </div>
                                }
                                {isEditMode && (
                                    <div style={{
                                        paddingTop: 10
                                    }}>
                                        <DropdownMenuRegulations
                                            regulations={regulationData?.regulations ?? []}
                                            label={"Прикрепить регламент"}
                                            selectedIds={selectedRegulationIds}
                                            onSelect={(ids) => setSelectedRegulations(ids)}
                                            toggleOpen={() => setIsDropdownOpen((o) => !o)}
                                            isOpen={isDropdownOpen}
                                        />
                                    </div>
                                )}
                            </Label>
                        </div>
                        <div className={styles.instructionBlock}>
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
                                    {
                                        steps.length > 0
                                            ?
                                            (
                                                stepState
                                                    .slice()
                                                    .sort((a, b) => a.order - b.order)
                                                    .map(step => (
                                                        <div key={step.id} className={styles.stepBlock}>
                                                            <div className={styles.step}>
                                                                {isEditMode && (
                                                                    <div className={styles.moveButtons}>
                                                                        {step.order > 0 && (
                                                                            <button onClick={() => moveStep(step.id, 'up')}>↑</button>
                                                                        )}
                                                                        {step.order < stepState.length - 1 && (
                                                                            <button onClick={() => moveStep(step.id, 'down')}>↓</button>
                                                                        )}
                                                                    </div>
                                                                )}
                                                                {step.order + 1}
                                                            </div>
                                                            <Input
                                                                className={styles.step}
                                                                value={step.name}
                                                                disabled={!isEditMode}
                                                                onChange={(e) => onStepChange(step.id, 'name', e.target.value)}
                                                                placeholder="Введите название"
                                                            />
                                                            <Input
                                                                className={styles.step}
                                                                value={step.description}
                                                                disabled={!isEditMode}
                                                                onChange={(e) => onStepChange(step.id, 'description', e.target.value)}
                                                                placeholder="Введите описание"
                                                            />
                                                            <div className={styles.step}>
                                                                <DropdownMenuSingle<IPosition>
                                                                    isOpen={openedStepId === step.id}
                                                                    toggleOpen={() => setOpenedStepId(prev => prev === step.id ? null : step.id)}
                                                                    selectedId={step.responsible || null}
                                                                    items={positions}
                                                                    getId={(p) => p.id}
                                                                    getLabel={(p) => p.name}
                                                                    onSelect={(id) => onStepChange(step.id, 'responsible', id)}
                                                                    placeholder="Выбрать ответственного"
                                                                    disabled={!isEditMode}
                                                                    classes={{
                                                                        dropdownButton: styles.dropdownPosition,
                                                                        dropdownContainer: styles.dropdownContainer,
                                                                    }}
                                                                />
                                                                {isEditMode && (
                                                                    <div
                                                                        className={styles.removeRegulation}
                                                                        onClick={(event) => {
                                                                            setStepState(prev => prev.filter(s => s.id !== step.id));
                                                                            event.stopPropagation();
                                                                        }}
                                                                    >
                                                                        ×
                                                                    </div>
                                                                )}
                                                            </div>

                                                        </div>
                                                    ))
                                            ) :
                                            (
                                                <div>
                                                    <div className={styles.notStep}>
                                                        Нет шагов
                                                    </div>
                                                </div>
                                            )
                                    }
                                    {
                                        isEditMode && (
                                            <Button
                                                className={styles.addStepButton}
                                                onClick={onAddStepClick}
                                            >
                                                Добавить шаг
                                            </Button>
                                        )
                                    }

                                </div>
                            </Label>
                        </div>
                    </div>
                }
                {
                    !isEditMode ?
                        <div className={styles.control}
                             style={{
                                 justifyContent: "space-between",
                             }}
                        >
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "5px",
                            }}>
                                <Button className={styles.saveButton}
                                        onClick={() => setIsEditMode(true)}
                                >
                                    Редактировать
                                </Button>
                                <Button className={styles.closeButton}
                                        onClick={() => navigate(-1)}
                                >
                                    Закрыть
                                </Button>
                            </div>
                            <Button className={styles.closeButton}
                                    onClick={onDeleteClick}
                            >
                                Удалить
                            </Button>
                        </div>
                        :
                        <div className={styles.control}>
                            <Button className={styles.saveButton}
                                    onClick={async () => {
                                        await onSaveClick(false)
                                        setIsEditMode(false)
                                    }}
                                    disabled={!isFormValid}
                            >
                                Сохранить
                            </Button>
                            <Button className={styles.saveButton}
                                    onClick={async () => {
                                        await onSaveClick(true)
                                        setIsEditMode(false)
                                    }}
                                    disabled={!isFormValid}
                            >
                                Сохранить и закрыть
                            </Button>
                            <Button className={styles.closeButton}
                                    onClick={() => {
                                        setIsEditMode(false);
                                        setDefault();
                                    }}
                            >
                                Отменить
                            </Button>
                        </div>
                }

            </div>

            <RegulationViewModal
                isOpen={isModalOpen}
                onClose={toggleModal}
                process={process}
                regulation={selectedRegulation!}
            />
        </div>
    );
};
