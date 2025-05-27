import React, {useState, useRef, useEffect} from 'react';
import {usePopper} from 'react-popper';
import styles from './dropdown-menu-regulations.module.scss';
import {IRegulation} from "../../../../../entities/regulation/api/types.ts";
import {SearchIcon} from "../../../../../shared/assets/icons";

interface DropdownMenuProps {
    label: string;
    isOpen: boolean;
    toggleOpen: () => void;
    selectedIds: string[];
    regulations: IRegulation[];
    onSelect: (regulationIds: string[]) => void;
}

export const DropdownMenuRegulations: React.FC<DropdownMenuProps> = (props) => {
    const {regulations, label, onSelect, selectedIds, toggleOpen, isOpen} = props;

    const [selectedValues, setSelectedValues] = useState<string[]>(props.selectedIds || []);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const {styles: popperStyles, attributes} = usePopper(
        buttonRef.current,
        menuRef.current,
        {
            placement: 'bottom',
        }
    );

    useEffect(() => {
        if (props.selectedIds) {
            setSelectedValues(props.selectedIds);
        }
    }, [props.selectedIds]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const clickedOutside =
                !menuRef.current?.contains(target) &&
                !buttonRef.current?.contains(target);

            if (isOpen && clickedOutside) {
                toggleOpen();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, toggleOpen]);


    const handleSelect = (id: string) => {
        if (selectedIds.includes(id)) {
            onSelect(selectedIds.filter(item => item !== id));
        } else {
            onSelect([...selectedIds, id]);
        }
    };

    return (
        <div
            className={styles.dropdownContainer}
            onClick={(e) => e.stopPropagation()}
        >
            <button ref={buttonRef}
                    onClick={toggleOpen}
                    className={`${styles.dropdownMenuButton} ${isOpen ? styles.active : ''}`}>
                {label}
            </button>
            {isOpen && (
                <div
                    ref={menuRef}
                    style={popperStyles}
                    {...attributes.popper}
                    className={styles.dropdownMenu}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.contentWrapper}>
                        <div className={styles.search}>
                            <SearchIcon width={17.4} height={17.4}/>
                            <div className={styles.inputContainer}>
                                <textarea
                                    style={{height: 24}}
                                    className={styles.searchArea}
                                    placeholder={'Поиск'}
                                    // value={searchValue}
                                    // onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                        <div className={styles.mainMenu}>
                            {regulations.map(regulation => (
                                <div
                                    key={regulation.id}
                                    onClick={() => handleSelect(regulation.id)}
                                    className={`${styles.dropdownMenuItem} ${selectedValues.includes(regulation.id) ? styles.selected : ''}`}
                                >
                                    <input
                                        type="checkbox"
                                        name="regulation-checkbox"
                                        value={regulation.id}
                                        checked={selectedValues.includes(regulation.id)}
                                        readOnly
                                    />
                                    {regulation.title}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button
                        className={styles.selectButton}
                        onClick={() => {
                            onSelect(selectedValues);
                            toggleOpen();
                        }}
                    >
                        Выбрать
                    </button>
                </div>
            )}
        </div>
    );
};
