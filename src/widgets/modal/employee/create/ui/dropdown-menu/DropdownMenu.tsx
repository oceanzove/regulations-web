import React, {useEffect, useState} from 'react';
import {usePopper} from 'react-popper';
import styles from './DropdownMenu.module.scss';
import {createPortal} from "react-dom";

interface IClasses {
    dropdownContainer?: string;
    dropdownMenu?: string;
    dropdownButton?: string;
}

interface DropdownMenuProps<T> {
    label?: string;
    isOpen: boolean;
    toggleOpen: () => void;
    selectedId: string | null;
    items: T[];
    getId: (item: T) => string;
    getLabel: (item: T) => string;
    onSelect: (id: string) => void;
    placeholder?: string;
    disabled?: boolean;
    classes?: IClasses;
}

export function DropdownMenuSingle<T>({
                                          label,
                                          isOpen,
                                          toggleOpen,
                                          selectedId,
                                          items,
                                          getId,
                                          getLabel,
                                          onSelect,
                                          placeholder = 'Выбрать...',
                                          disabled = false,
                                          classes,
                                      }: DropdownMenuProps<T>) {
    const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);

    const {styles: popperStyles, attributes, update} = usePopper(referenceElement, popperElement, {
        placement: 'bottom-start',
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                isOpen &&
                popperElement &&
                referenceElement &&
                !popperElement.contains(target) &&
                !referenceElement.contains(target)
            ) {
                toggleOpen();
            }
        };

        if (!disabled) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, toggleOpen, popperElement, referenceElement, disabled]);

    useEffect(() => {
        if (isOpen && referenceElement && popperElement) {
            popperElement.style.width = `${referenceElement.offsetWidth}px`;
        }
    }, [isOpen, referenceElement, popperElement]);

    const selectedItem = items.find((item) => getId(item) === selectedId);
    const selectedLabel = selectedItem ? getLabel(selectedItem) : placeholder;

    return (
        <div className={`${styles.dropdownContainer} ${classes?.dropdownContainer}`}>
            <label className={styles.label}>{label}</label>
            <button
                ref={setReferenceElement}
                onClick={() => {
                    if (!disabled) {
                        toggleOpen();
                        setTimeout(() => update?.(), 0); // 🛠 Пересчет позиции popper
                    }
                }}
                className={`${styles.dropdownMenuButton} ${isOpen ? styles.active : ''} ${disabled ? styles.disabled : ''} ${classes?.dropdownButton}`}
                disabled={disabled}
            >
                {selectedLabel}
                <span className={styles.arrow}>{isOpen ? '▴' : '▾'}</span>
            </button>

            {isOpen && !disabled && createPortal(
                <div
                    ref={setPopperElement}
                    style={popperStyles.popper}
                    {...attributes.popper}
                    className={`${styles.dropdownMenu} ${classes?.dropdownMenu}`}
                >
                    <div className={styles.mainMenu}>
                        {items.map((item) => {
                            const id = getId(item);
                            const label = getLabel(item);
                            return (
                                <div
                                    key={id}
                                    className={styles.dropdownMenuItem}
                                    onClick={() => {
                                        onSelect(id);
                                        toggleOpen();
                                    }}
                                >
                                    {label}
                                </div>
                            );
                        })}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}