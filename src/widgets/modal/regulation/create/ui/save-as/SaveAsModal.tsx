import styles from './SaveAsModal.module.scss';
import React, {FC, useEffect} from "react";
import {IconButton} from "../../../../../../shared/ui/icon-button/icon-button.tsx";
import {IconEnum} from "../../../../../../shared/ui/icon/IconType.tsx";
import {Button} from "../../../../../../shared/ui/button";

type TSaveAsModalProps = {
    isOpen: boolean;
    onSave: (type: 'section' | 'regulation') => void;
    onClose: () => void;
}

export const SaveAsModal: FC<TSaveAsModalProps> = (props) => {
    const {
        isOpen, onSave, onClose
    } = props;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                // onSave();
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
        <div className={styles.saveAsModalWrapper}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    Сохранить как
                    <div className={styles.iconButtonContainer}>
                        <IconButton
                            typeIcon={IconEnum.CROSS}
                            onClick={onClose}
                        />
                    </div>
                </div>
                <Button className={styles.saveButton}
                        onClick={() => onSave('section')}
                >
                    Сохранить как раздел
                </Button>
                <Button className={styles.saveButton}
                        onClick={() => onSave('regulation')}
                >
                    Сохранить как регламент
                </Button>
            </div>
        </div>
    )
}
