import React, {useState, useRef, useEffect} from 'react';
import {usePopper} from 'react-popper';
import styles from './dropdown-menu-dynamic-field.module.scss';
import css from "./dropdown-menu-dynamic-field.module.scss";
import {IconButton} from "../../shared/ui/icon-button/icon-button.tsx";
import {IconEnum} from "../../shared/ui/icon/IconType.tsx";
import {SearchIcon} from "../../shared/assets/icons";

export interface MenuItem {
    label: string;
    value: string;
    children?: MenuItem[];
}

interface DropdownMenuProps {
    items: MenuItem[];
    label: string;
    onSelect: (value: string) => void;
    toggleOpen: () => void;
    isOpen: boolean;
}

const DropdownMenuDynamicField: React.FC<DropdownMenuProps> = (props) => {
    const {items, label, onSelect, toggleOpen, isOpen} = props;

    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Вынесем использование usePopper в начало компонента
    const {styles: popperStyles, attributes} = usePopper(
        buttonRef.current,
        menuRef.current,
        {
            placement: 'bottom',
        }
    );

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

    const toggleExpand = (value: string) => {
        setExpandedItems((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };

    const handleSelect = (value: string) => {
        setSelectedValue(value);
    };

    const renderItem = (item: MenuItem) => {
        const isExpanded = expandedItems.includes(item.value);
        const hasChildren = item.children && item.children.length > 0;
        const isSelected = selectedValue === item.value;

        return (
            <li key={item.value} className={`${styles.dropdownMenuItem} ${isSelected ? styles.selected : ''}`}>
                <div
                    className={styles.itemHeader}
                    onClick={hasChildren ? () => toggleExpand(item.value) : () => handleSelect(item.value)}
                >
                    <div className={styles.expandIcon}>
                        {isExpanded ?
                            <IconButton typeIcon={IconEnum.ARROW_DOWN}
                            />
                            :
                            <IconButton typeIcon={IconEnum.ARROW_RIGHT}
                            />
                        }
                    </div>
                    <div>{item.label}</div>
                </div>
                {hasChildren && isExpanded && (
                    <ul className={styles.subMenu}>
                        {item.children!.map((child) => (
                            <li
                                key={child.value}
                                className={`${styles.subMenuItem} ${selectedValue === child.value ? styles.selected : ''}`}
                                onClick={() => handleSelect(child.value)}
                            >
                                <input
                                    type="radio"
                                    name="menu-radio"
                                    value={child.value}
                                    checked={selectedValue === child.value}
                                    onChange={() => handleSelect(child.value)}
                                />
                                <span>{child.label}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </li>
        );
    };

    return (
        <div
            className={styles.dropdownContainer}
            onClick={(e) => e.stopPropagation()}>
            <button ref={buttonRef} onClick={toggleOpen} className={css.dropdownMenuButton}>
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
                            <SearchIcon
                                width={17.4}
                                height={17.4}
                            />
                            <div className={styles.inputContainer}>
                            <textarea
                                style={{height: 24}}
                                className={styles.searchArea}
                                placeholder={'Поиск'}
                                // value={value}
                                // onChange={handleChange}
                            />
                            </div>
                        </div>
                        <ul className={styles.mainMenu}>
                            {items.map(renderItem)}
                        </ul>
                    </div>
                    <button
                        className={styles.selectButton}
                        onClick={() => {
                            if (selectedValue) {
                                onSelect(selectedValue);
                            }
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


export default DropdownMenuDynamicField;
