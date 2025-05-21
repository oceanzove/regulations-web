import React, {FC, useEffect, useState} from "react";
import styles from './ProcessCreateModal.module.scss';
import {IconButton} from "../../../../shared/ui/icon-button/icon-button.tsx";
import {IconEnum} from "../../../../shared/ui/icon/IconType.tsx";
import {Label} from "../../../../shared/ui/label/label.tsx";
import {Input} from "../../../../shared/ui/input/input.tsx";
import {Button} from "../../../../shared/ui/button";
import {v4 as uuid} from 'uuid';
import {IProcess, IStep} from "../../../../entities/process/api/types.ts";

type TProcessCreateModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onProcessCreate: (process: IProcess) => void;
}

export const ProcessCreateModal: FC<TProcessCreateModalProps> = (props) => {
    const {
        isOpen, onClose, onProcessCreate
    } = props;

    const [steps, setSteps] = useState<IStep[]>([{
        id: uuid(),
        title: "",
        description: "",
        order: 0
    }])

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const onSave = () => {
        onClose();

        const process: IProcess = {
            id: uuid(),
            title,
            description
        }

        onProcessCreate(process);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                onSave();
            } else if (e.key === 'Escape') {
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

    const onAddStepClick = () => {
        setSteps(prevSteps => {
            const newStep: IStep = {
                id: uuid(),
                title: "",
                description: "",
                order: prevSteps.length
            };
            return [...prevSteps, newStep];
        });
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
                    <Label label={'Название процесса'}>
                        <Input
                            onChange={(e) => setTitle(e.target.value || '')}
                            placeholder={'Например, разработка сервиса'}
                        />
                    </Label>
                    <Label label={'Описание процесса'}>
                        <Input
                            onChange={(e) => setDescription(e.target.value || '')}
                            placeholder={'Например, описание сервиса'}
                        />
                    </Label>
                    <Label label={'Инструкция'}>
                        <div className={styles.stepControl}>
                            <div className={styles.stepsContainer}>
                                {steps.map(step => (
                                    <Label label={`Шаг ${step.order + 1}`}>
                                        <Input>
                                        </Input>
                                    </Label>
                                ))}
                            </div>
                            <Button
                                className={styles.addStepButton}
                                onClick={onAddStepClick}
                            >
                                Добавить шаг
                            </Button>
                        </div>
                    </Label>
                </div>
                <div className={styles.footer}>
                    <Button
                        className={styles.controlButton}
                        onClick={onClose}
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