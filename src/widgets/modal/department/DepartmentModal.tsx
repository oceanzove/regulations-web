import React, {FC, useEffect, useState} from "react";
import {IconButton} from "../../../shared/ui/icon-button/icon-button.tsx";
import {IconEnum} from "../../../shared/ui/icon/IconType.tsx";
import {Label} from "../../../shared/ui/label/label.tsx";
import {Input} from "../../../shared/ui/input/input.tsx";
import {IDepartment} from "../../../entities/employee/api/types.ts";
import {organizationApi} from "../../../entities/employee/api/api.ts";
import styles from './DepartmentModal.module.scss'
import {Button} from "../../../shared/ui/button";
import {v4 as uuid} from 'uuid';
import {notificationError, notificationSuccess} from "../../notifications/callNotification.tsx";


type TPositionModalProps = {
    isOpen: boolean;
    createMode: boolean;
    department: IDepartment | null;
    onClose: () => void;
}

export const DepartmentModal: FC<TPositionModalProps> = (props) => {
    const {isOpen, createMode, department, onClose} = props;

    const [name, setName] = useState('');

    useEffect(() => {
        if (department?.name) {
            setName(department.name);
        }
    }, [department]);

    const [ editMode, setEditMode ] = useState(false);

    const [createDepartment] = organizationApi.useCreateDepartmentMutation();

    const onCreateClick = async () => {
        const departmentId = uuid();

        try {
            await createDepartment({
                id: departmentId,
                name: name,
            }).unwrap();

            notificationSuccess("Создание", "Подразделение успешно создано");
            onCloseClick();
        } catch (error) {
            console.error("Ошибка создания подразделения:", error);
            notificationError("Ошибка создания должности");
        }
    };

    const [updateDepartment] = organizationApi.useUpdateDepartmentByIdMutation();

    const onSaveClick = async () => {
        if (!department) return;

        try {
            await updateDepartment({
                id: department.id,
                name: name,
            });

            notificationSuccess("Сохранение", "Подразделение успешно обновлено");
            onCloseClick();
        } catch (error) {
            console.error("Ошибка обновление сотрудника:", error);
            notificationError("Ошибка сохранения подразделения");
        }
    }

    const onCloseClick = () => {
        onClose();

        setName('');
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
                        value={name}
                        disabled={!editMode && !createMode}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Label>

                {createMode ? (
                    <div className={styles.control}>
                        <Button
                            className={styles.saveButton}
                            onClick={onCreateClick}
                            disabled={name.trim().length < 3}
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
                            disabled={name.trim().length < 3}
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