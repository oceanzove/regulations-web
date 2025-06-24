import React, {FC, useEffect, useState} from "react";
import {IconButton} from "../../../shared/ui/icon-button/icon-button.tsx";
import {IconEnum} from "../../../shared/ui/icon/IconType.tsx";
import {Label} from "../../../shared/ui/label/label.tsx";
import {Input} from "../../../shared/ui/input/input.tsx";
import {IDepartment, IPosition} from "../../../entities/employee/api/types.ts";
import {organizationApi} from "../../../entities/employee/api/api.ts";
import {DropdownMenuSingle} from "../employee/create/ui/dropdown-menu/DropdownMenu.tsx";
import styles from './PositionModal.module.scss';
import {Button} from "../../../shared/ui/button";
import {v4 as uuid} from 'uuid';
import {notificationError, notificationSuccess} from "../../notifications/callNotification.tsx";


type TPositionModalProps = {
    isOpen: boolean;
    createMode: boolean;
    positionId: IPosition | null;
    departmentId: string | null;
    onClose: () => void;
}

export const PositionModal: FC<TPositionModalProps> = (props) => {
    const {isOpen, createMode, positionId, departmentId, onClose} = props;

    const [position, setPosition] = useState('');

    useEffect(() => {
        if (positionId?.name) {
            setPosition(positionId.name);
        }
    }, [positionId]);

    const [ editMode, setEditMode ] = useState(false);

    const {data: departmentsData} = organizationApi.useGetDepartmentsQuery();

    const [isDropdownDepartmentOpen, setIsDropdownDepartmentOpen] = useState(false);
    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);

    useEffect(() => {
        if (departmentId) {
            setSelectedDepartmentId(departmentId);
        }
    }, [departmentId]);

    const onSelectDepartment = (id: string) => {
        setSelectedDepartmentId(id);
    };

    useEffect(() => {
        if (departmentsData && departmentsData.departments) {
            setDepartments(departmentsData.departments as IDepartment[]);
        }
    }, [departmentsData, setDepartments]);

    const [createPosition] = organizationApi.useCreatePositionMutation();

    const onCreateClick = async () => {
        const positionId = uuid();

        try {
            await createPosition({
                id: positionId,
                name: position,
                departmentId: selectedDepartmentId!
            }).unwrap();

            notificationSuccess("Создание", "Должность успешно создана");
            onCloseClick();
        } catch (error) {
            console.error("Ошибка создания сотрудника:", error);
            notificationError("Ошибка создания должности");
        }
    };

    const [updatePosition] = organizationApi.useUpdatePositionByIdMutation();

    const onSaveClick = async () => {
        if (!positionId || !selectedDepartmentId) return;

        try {
            await updatePosition({
                id: positionId.id,
                name: position,
                departmentId: selectedDepartmentId!
            });

            notificationSuccess("Сохранение", "Должность успешно обновлена");
            onCloseClick();
        } catch (error) {
            console.error("Ошибка обновление сотрудника:", error);
            notificationError("Ошибка сохранения должности");
        }
    }

    const onCloseClick = () => {
        onClose();

        setSelectedDepartmentId(null);
        setPosition('');
        setEditMode(false);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                // onSaveClick();
            } else if (e.key === 'Escape') {
                // clearStates();
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    {
                        createMode ? (
                            "Создать должности"
                        ) : editMode ? (
                            "Редактирование должности"
                        ) : (
                            "Просмотр должности"
                        )
                    }
                    <div className={styles.iconButtonContainer}>
                        <IconButton
                            typeIcon={IconEnum.CROSS}
                            onClick={onCloseClick}
                        />
                    </div>
                </div>
                <Label label={"Название должности"}>
                    <Input
                        value={position}
                        disabled={!editMode && !createMode}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                </Label>

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
                    disabled={!editMode && !createMode}
                    classes={{
                        dropdownContainer: styles.dropdownDepartment
                    }}
                />

                {createMode ? (
                    <div className={styles.control}>
                        <Button
                            className={styles.saveButton}
                            onClick={onCreateClick}
                            disabled={position.trim().length < 3 || selectedDepartmentId === null}
                        >
                            Создать
                        </Button>
                        <Button
                            className={styles.closeButton}
                            onClick={onCloseClick}
                        >
                            Отменить
                        </Button>
                    </div>
                ) : editMode ? (
                    <div className={styles.control}>
                        <Button
                            className={styles.saveButton}
                            onClick={onSaveClick}
                            disabled={position.trim().length < 3 || selectedDepartmentId === null}
                        >
                            Сохранить изменения
                        </Button>
                        <Button
                            className={styles.closeButton}
                            onClick={onCloseClick}
                        >
                            Отменить
                        </Button>
                    </div>
                ) : (
                    <div className={styles.control}>
                        <Button
                            className={styles.saveButton}
                            onClick={() => setEditMode(true)}
                        >Редактировать</Button>
                        <Button
                            className={styles.closeButton}
                            onClick={onCloseClick}
                        >
                            Отменить
                        </Button>
                    </div>

                )}
            </div>
        </div>
    )

}