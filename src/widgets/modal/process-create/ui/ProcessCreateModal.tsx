import React, {FC, useEffect} from "react";
import styles from './ProcessCreateModal.module.scss';
import {IconButton} from "../../../../shared/ui/icon-button/icon-button.tsx";
import {IconEnum} from "../../../../shared/ui/icon/IconType.tsx";
import {Label} from "../../../../shared/ui/label/label.tsx";
import {Input} from "../../../../shared/ui/input/input.tsx";

type TProcessCreateModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export const ProcessCreateModal: FC<TProcessCreateModalProps> = (props) => {
    const {
        isOpen, onClose
    } = props;

    const handleSave = () => {
        // onSelect(selected);
        console.log('close from enter')
        onClose();
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                handleSave();
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
    }, [isOpen, onClose]);
    // }, [isOpen, selected, onSelect, onClose]);

    if (!isOpen) return null;


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
                            placeholder={'Например, разработка сервиса'}
                        />
                    </Label>
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