import React, {FC, forwardRef, useState} from "react";
import DatePicker from "react-datepicker";
import styles from './custom-date-picker.module.scss';
import {Icon} from "../../shared/ui/icon";
import {IconEnum} from "../../shared/ui/icon/IconType.tsx";

interface CustomDateInputProps {
    value?: string;
    onClick?: () => void;
    disabled?: boolean;
}

const CustomDateInput = forwardRef<HTMLInputElement, CustomDateInputProps>(
    ({ value, onClick, disabled }, ref) => (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                background: '#fff',
                width: '100%',
                cursor: 'default'
            }}
        >
            <input
                value={value}
                ref={ref}
                readOnly
                style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '16px',
                    background: 'transparent',
                    cursor: 'pointer',
                }}
                className={`${disabled ? styles.disabled : ''}`}
                onClick={onClick} // только input открывает
            />
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    onClick?.();
                }}
                style={{ cursor: 'pointer' }}
            >
                <Icon type={IconEnum.DATE_PICKER} className={`${disabled ? styles.disabled : ''}`} />
            </div>
        </div>
    )
);

type CustomDatePickerProps = {
    value: Date | null;
    onSelect: React.Dispatch<React.SetStateAction<Date | null>>;
    maxDate?: Date;
    disabled?: boolean;
}

const MAX_DATE = new Date();
const MIN_DATE = new Date(1900, 0, 1);

export const CustomDatePicker: FC<CustomDatePickerProps> = (props) => {
    const { value, onSelect, maxDate, disabled } = props;

    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (date: Date | null) => {
        if (!date) return onSelect(null);
        if (date > MAX_DATE) return onSelect(MAX_DATE);
        if (date < MIN_DATE) return onSelect(MIN_DATE);
        onSelect(date);
        setIsOpen(false);
    };


    return (
        <DatePicker
            disabled={disabled}
            className={styles.dataPicker}
            dateFormat="dd.MM.yyyy"
            placeholderText="дд.мм.гггг"
            maxDate={maxDate || MAX_DATE}
            minDate={new Date(1900, 0, 1)}
            selected={value}
            showYearDropdown
            wrapperClassName={`${styles.dataPickerWrapper}`}
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            onSelect={handleChange}
            onChange={handleChange}
            customInput={<CustomDateInput disabled={disabled} />}
            open={isOpen}
            onClickOutside={() => setIsOpen(false)}
            onInputClick={() => {
                if (disabled) return;
                if (!isOpen) setIsOpen(true);
            }}
        />

    )
};