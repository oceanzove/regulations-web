import React, { useState, useRef, useEffect } from 'react';
import { usePopper } from 'react-popper';

interface MenuItem {
    label: string;
    value: string;
    children?: MenuItem[];
}

interface DropdownMenuProps {
    items: MenuItem[];
    onSelect: (value: string) => void;
    buttonLabel: string; // Текст на кнопке
}

const DROPMENU: React.FC<DropdownMenuProps> = ({ items, onSelect, buttonLabel }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const { styles, attributes } = usePopper(
        buttonRef.current,
        menuRef.current,
        {
            placement: 'bottom-start',
        }
    );

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        setExpandedItems([]); // Сбрасываем развернутые элементы при открытии/закрытии
    };

    const toggleExpand = (value: string) => {
        if (expandedItems.includes(value)) {
            setExpandedItems(expandedItems.filter((item) => item !== value));
        } else {
            setExpandedItems([...expandedItems, value]);
        }
    };

    const handleSelect = (value: string) => {
        setSelectedValue(value);
        onSelect(value);
        setIsOpen(false); // Закрываем меню после выбора
    };

    const renderItem = (item: MenuItem) => {
        const isExpanded = expandedItems.includes(item.value);
        const hasChildren = item.children && item.children.length > 0;
        const isSelected = selectedValue === item.value;

        return (
            <li key={item.value} className={`dropdown-menu-item ${isSelected ? 'selected' : ''}`}>
                <div className="item-header" onClick={hasChildren ? () => toggleExpand(item.value) : () => handleSelect(item.value)}>
                    {hasChildren && (
                        <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
              {isExpanded ? '▼' : '►'}
            </span>
                    )}
                    <input
                        type="radio"
                        name="menu-radio"
                        value={item.value}
                        checked={isSelected}
                        onChange={() => handleSelect(item.value)}
                    />
                    <span>{item.label}</span>
                </div>
                {hasChildren && isExpanded && (
                    <ul className="sub-menu">
                        {item.children.map((child) => (
                            <li
                                key={child.value}
                                className={`sub-menu-item ${selectedValue === child.value ? 'selected' : ''}`}
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
        <div className="dropdown-container">
            <button ref={buttonRef} onClick={toggleOpen} className="dropdown-button">
                {buttonLabel}
            </button>
            {isOpen && (
                <div ref={menuRef} style={styles} {...attributes.popper} className="dropdown-menu">
                    <div className="search-bar">
                        <input type="text" placeholder="Поиск" />
                        <span className="search-icon">🔍</span>
                    </div>
                    <ul className="main-menu">
                        {items.map((item) => renderItem(item))}
                    </ul>
                    <button className="select-button" onClick={() => setIsOpen(false)}>Выбрать</button>
                </div>
            )}
        </div>
    );
};

export default DROPMENU;