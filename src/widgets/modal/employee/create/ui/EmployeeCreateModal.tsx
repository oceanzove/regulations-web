import React, {FC, useCallback, useEffect, useState} from "react";
import styles from './EmployeeCreateModal.module.scss';
import {IconButton} from "../../../../../shared/ui/icon-button/icon-button.tsx";
import {IconEnum} from "../../../../../shared/ui/icon/IconType.tsx";
import {DropdownMenuSingle} from "./dropdown-menu/DropdownMenu.tsx";
import {
    AccountRoleEnum,
    EmployeeMaritalStatusEnum,
    IDepartment,
    IPosition
} from "../../../../../entities/employee/api/types.ts";
import {organizationApi} from "../../../../../entities/employee/api/api.ts";
import {Button} from "../../../../../shared/ui/button";
import {Label} from "../../../../../shared/ui/label/label.tsx";
import {Input} from "../../../../../shared/ui/input/input.tsx";
import {generateCredentials} from "../../../../utils/CredentialsGenerator.ts";
import {notificationError, notificationSuccess} from "../../../../notifications/callNotification.tsx";
import {v4 as uuid} from 'uuid';
import {CustomDatePicker} from "../../../../date-picker";



type TEmployeeCreateModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export const EmployeeCreateModal: FC<TEmployeeCreateModalProps> = (props) => {
    const { isOpen, onClose } = props;

    const [isDropdownDepartmentOpen, setIsDropdownDepartmentOpen] = useState(false);
    const [isDropdownPositionOpen, setIsDropdownPositionOpen] = useState(false);
    const [isDropdownMaritalOpen, setIsDropdownMaritalOpen] = useState(false);

    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);

    const [positions, setPositions] = useState<IPosition[]>([]);
    const [selectedPositionId, setSelectedPositionId] = useState<string | null>(null);

    const [fullName, setFullName] = useState<string>('');

    const today = new Date();
    const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    );
    const [selectedBirthDate, setSelectedBirthDate] = useState<Date | null>(eighteenYearsAgo);
    const [selectedEmploymentDate, setSelectedEmploymentDate] = useState<Date | null>(new Date());


    const maritalStatusItems: { id: keyof typeof EmployeeMaritalStatusEnum; name: string }[] = [
        { id: "SINGLE", name: "Холост / Не замужем" },
        { id: "MARRIED", name: "Женат / Замужем" },
        { id: "WINDOWED", name: "Вдовец / Вдова" },
        { id: "DIVORCED", name: "Разведён / Разведена" },
    ];

    type MaritalStatusKey = keyof typeof EmployeeMaritalStatusEnum;
    const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<MaritalStatusKey | null>(null);
    const onSelectMarital = (id: string) => {
        const key = id as MaritalStatusKey;
        setSelectedMaritalStatus(key);
    };

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState<string | null>(null);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState<string | null>(null);

    const [address, setAddress] = useState('');

    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isValidPhone = (phone: string): boolean => {
        const digits = phone.replace(/\D/g, '');
        return digits.length >= 10 && digits.length <= 15;
    };

    const formatInternationalPhone = (value: string): string => {
        const digits = value.replace(/\D/g, '');

        if (digits.length < 4) return '+' + digits;

        const chunks: string[] = [];
        let i = 0;

        // 1–3 цифры — код страны
        chunks.push(digits.slice(i, i + 1));
        i += 1;

        // по 3-3-2-2 дальше
        while (i < digits.length) {
            const size = i === 1 ? 3 : i === 4 ? 3 : 2;
            chunks.push(digits.slice(i, i + size));
            i += size;
        }

        return '+' + chunks.filter(Boolean).join('-');
    };

    const isFormValid = () => {
        return (
            fullName.trim().split(' ').length >= 3 &&
            selectedDepartmentId !== null &&
            selectedPositionId !== null &&
            selectedMaritalStatus !== null &&
            selectedBirthDate !== null &&
            selectedEmploymentDate !== null &&
            email.trim() !== '' &&
            isValidEmail(email) &&
            phoneNumber.trim() !== '' &&
            isValidPhone(phoneNumber)
        );
    };

    const {data: departmentsData} = organizationApi.useGetDepartmentsQuery();
    const {data: positionData} = organizationApi.useGetPositionsByDepartmentQuery(selectedDepartmentId!, {
        skip: !selectedDepartmentId,
    });

    useEffect(() => {
        if (departmentsData && departmentsData.departments) {
            setDepartments(departmentsData.departments as IDepartment[]);
        }
    }, [departmentsData, setDepartments]);

    useEffect(() => {
        if (positionData?.positions) {
            setPositions(positionData.positions);
            setSelectedPositionId(null);
        }
    }, [positionData]);

    const onSelectDepartment = (id: string) => {
        setSelectedDepartmentId(id);
    };

    const onSelectPosition = (id: string) => {
        setSelectedPositionId(id);
    };

    const onCloseClick = () => {
        onClose();
        clearStates();
    };

    const [createEmployee] = organizationApi.useCreateEmployeeMutation();

    const clearStates = useCallback(() => {
        setIsDropdownDepartmentOpen(false);
        setIsDropdownPositionOpen(false);
        setIsDropdownMaritalOpen(false);

        setDepartments([]);
        setPositions([]);

        setSelectedDepartmentId(null);
        setSelectedPositionId(null);
        setSelectedMaritalStatus(null);

        setFullName('');
        setEmail('');
        setPhoneNumber('');
        setAddress('');

        setSelectedBirthDate(eighteenYearsAgo);
        setSelectedEmploymentDate(new Date());

        setEmailError(null);
        setPhoneError(null);
    }, [eighteenYearsAgo]);

    const onSaveClick = useCallback(async () => {
        const employeeId = uuid();

        if (!isFormValid()) {
            return;
        }

        const { login } = generateCredentials({
            words: fullName.trim().split(' '),
            loginSuffix: '@start-set',
            passwordLength: 12,
        });

        try {
            await createEmployee({
                employee: {
                    id: employeeId,
                    fullName,
                    phoneNumber,
                    birthDate: selectedBirthDate!,
                    employmentDate: selectedEmploymentDate!,
                    residentialAddress: address,
                    maritalStatus: EmployeeMaritalStatusEnum[selectedMaritalStatus!],
                    email,
                },
                account: {
                    id: employeeId,
                    login: login,
                    password: '$2a$10$A6lwFl3TlDyZA3UkbobGFOFe.PyI0iQsEUlm1rILs7HWGAaV3AKcC',
                    role: AccountRoleEnum.EMPLOYEE,
                },
                departmentId: selectedDepartmentId!,
                positionId: selectedPositionId!,
            }).unwrap();

            notificationSuccess("Сотрудник создан");
            clearStates();
            onClose();
        } catch (error) {
            console.error("Ошибка создания сотрудника:", error);
            notificationError("Ошибка создания сотрудника");
        }
    }, [isFormValid, createEmployee,
        fullName, phoneNumber,
        selectedBirthDate, selectedEmploymentDate,
        address, selectedMaritalStatus,
        email, selectedDepartmentId,
        selectedPositionId, clearStates,
        onClose
    ]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                onSaveClick();
            } else if (e.key === 'Escape') {
                clearStates();
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onSaveClick, isOpen, onClose, clearStates]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    Создание сотрудника
                    <div className={styles.iconButtonContainer}>
                        <IconButton
                            typeIcon={IconEnum.CROSS}
                            onClick={onCloseClick}
                        />
                    </div>
                </div>
                <div className={styles.organizationBlock}>
                    <div className={styles.signa}>
                        <div className={styles.photo}>
                            <div className={styles.avatar}>
                                +
                            </div>
                            <div className={styles.upload}>
                                <div style={{
                                    lineHeight: "1.5",
                                }}>
                                    Загрузите фотографию <br/>
                                    <span style={{
                                        color: '#8692A7',
                                    }}>
                                    Размер 200×200 px
                                    </span>
                                </div>
                                <Button
                                    className={styles.uploadButton}
                                    disabled={true}
                                >
                                    Загрузить фото
                                </Button>
                            </div>
                        </div>
                        <div className={styles.fullName}>
                            <Label label={'ФИО'}>
                                <Input value={fullName}
                                       onChange={(e) => setFullName(e.target.value)}
                                />
                            </Label>
                        </div>
                    </div>
                    <div className={styles.organization}>
                        <div className={styles.departmentBlock}>
                            <DropdownMenuSingle<IDepartment>
                                label="Подразделение"
                                isOpen={isDropdownDepartmentOpen}
                                toggleOpen={() => {
                                    setIsDropdownDepartmentOpen(prev => !prev)
                                }}
                                selectedId={selectedDepartmentId}
                                items={departments}
                                getId={(d) => d.id}
                                getLabel={(d) => d.name}
                                onSelect={(id) => {
                                    onSelectDepartment(id)
                                }}
                                placeholder="Выбрать подразделения"
                                disabled={false}
                                classes={{
                                    dropdownContainer: styles.dropdownDepartment
                                }}
                            />
                        </div>

                        <div className={styles.positionBlock}>
                            <DropdownMenuSingle<IDepartment>
                                label="Должность"
                                isOpen={isDropdownPositionOpen}
                                toggleOpen={() => {
                                    setIsDropdownPositionOpen(prev => !prev)
                                }}
                                selectedId={selectedPositionId}
                                items={positions}
                                getId={(p) => p.id}
                                getLabel={(p) => p.name}
                                onSelect={(id) => onSelectPosition(id)}
                                placeholder="Выбрать должность"
                                disabled={selectedDepartmentId === null}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.aboutBlock}>
                    <div className={styles.aboutHeader}>
                        <Button className={styles.aboutHeaderButton}>
                            Сведения
                        </Button>
                    </div>
                    <div className={styles.about}>
                        <div style={{
                            width: 324,
                            display: "flex",
                            flexDirection: "column",
                            gap: 5,
                        }}>
                            <Label label={"Дата рождения"}>
                                <CustomDatePicker
                                    value={selectedBirthDate}
                                    onSelect={setSelectedBirthDate}
                                    maxDate={eighteenYearsAgo}
                                />
                            </Label>

                            <Label label={"Дата приёма на работу"}>
                                <CustomDatePicker
                                    value={selectedEmploymentDate}
                                    onSelect={setSelectedEmploymentDate}
                                />
                            </Label>

                            <Label label={"Эл. почта"}>
                                <Input
                                    placeholder={"example@gmail.com"}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (!isValidEmail(e.target.value)) {
                                            setEmailError("Неверный формат email");
                                        } else {
                                            setEmailError(null);
                                        }
                                    }}
                                />
                                {emailError && <div className={styles.error}>{emailError}</div>}
                            </Label>
                        </div>
                        <div style={{
                            width: 473,
                            display: "flex",
                            flexDirection: "column",
                            gap: 5,
                        }}>
                            <Label label={"Адрес"}>
                                <Input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Label>

                            <DropdownMenuSingle<{
                                id: MaritalStatusKey;
                                name: string;
                            }>
                                label="Семейное положение"
                                isOpen={isDropdownMaritalOpen}
                                toggleOpen={() => setIsDropdownMaritalOpen(prev => !prev)}
                                selectedId={selectedMaritalStatus}
                                items={maritalStatusItems}
                                getId={(p) => p.id}
                                getLabel={(p) => p.name}
                                onSelect={onSelectMarital}
                                placeholder="Выбрать семейное положение"
                            />

                            <Label label={"Телефон"}>
                                <Input
                                    placeholder={"+7 999 999 99 99"}
                                    value={phoneNumber}
                                    onChange={(e) => {
                                        const formatted = formatInternationalPhone(e.target.value);
                                        setPhoneNumber(formatted);

                                        if (!isValidPhone(formatted)) {
                                            setPhoneError("Введите корректный номер (10–15 цифр)");
                                        } else {
                                            setPhoneError(null);
                                        }
                                    }}
                                />
                                {phoneError && <div className={styles.error}>{phoneError}</div>}
                            </Label>
                        </div>
                    </div>
                </div>
                <div className={styles.control}>
                    <Button className={styles.saveButton}
                            onClick={onSaveClick}
                            disabled={!isFormValid()}
                    >
                        Сохранить и закрыть
                    </Button>
                    <Button className={styles.closeButton}
                            onClick={onCloseClick}
                    >
                        Отменить
                    </Button>
                </div>
            </div>
        </div>
    );
}

