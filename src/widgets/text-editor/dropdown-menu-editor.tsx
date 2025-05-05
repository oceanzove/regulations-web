import React, {useState, useRef, useEffect} from 'react';
import {usePopper} from 'react-popper';
import styles from './dropdown-menu-editor.module.scss';

export interface MenuItem {
    label: string;
    value: string;
    children?: MenuItem[];
}

interface DropdownMenuProps {
    items: MenuItem[];
    onSelect: (value: string) => void;
    buttonRef: React.RefObject<HTMLElement>;
    toggleOpen: () => void;
    isOpen: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
    const {items, onSelect, buttonRef, toggleOpen, isOpen} = props;

    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Вынесем использование usePopper в начало компонента
    const { styles: popperStyles, attributes } = usePopper(buttonRef.current, menuRef.current, {
        placement: 'top-start',
    });

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
        const hasChildren = item.children?.length > 0;
        const isSelected = selectedValue === item.value;

        return (
            <li key={item.value} className={`${styles.dropdownMenuItem} ${isSelected ? styles.selected : ''}`}>
                <div
                    className={styles.itemHeader}
                    onClick={hasChildren ? () => toggleExpand(item.value) : () => handleSelect(item.value)}
                >
                    {hasChildren && (
                        <span className={`${styles.expandIcon} ${isExpanded ? styles.expanded : ''}`}>
                            {isExpanded ? '▼' : '►'}
                        </span>
                    )}
                    <input
                        type="radio"
                        name="menu-radio"
                        value={item.value}
                        checked={isSelected}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => handleSelect(item.value)}
                    />
                    <span>{item.label}</span>
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
        <div className={styles.dropdownContainer}>
            {isOpen && (
                <div
                    ref={menuRef}
                    style={popperStyles}
                    {...attributes.popper}
                    className={styles.dropdownMenu}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.searchBar}>
                        <input type="text" placeholder="Поиск"/>
                        <span className={styles.searchIcon}>🔍</span>
                    </div>
                    <ul className={styles.mainMenu}>
                        {items.map(renderItem)}
                    </ul>
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


export default DropdownMenu;
