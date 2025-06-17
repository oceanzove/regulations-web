import {IconButton} from "../../../../../shared/ui/icon-button/icon-button.tsx";
import {IconEnum} from "../../../../../shared/ui/icon/IconType.tsx";
import {Button} from "../../../../../shared/ui/button";
import {Label} from "../../../../../shared/ui/label/label.tsx";
import {Input} from "../../../../../shared/ui/input/input.tsx";
import {DropdownMenuSingle} from "../../create/ui/dropdown-menu/DropdownMenu.tsx";
import {EmployeeMaritalStatusEnum, IDepartment, IPosition} from "../../../../../entities/employee/api/types.ts";
import {CustomDatePicker} from "../../../../date-picker";
import React, {FC, useEffect, useState} from "react";
import styles from './EmployeeViewEditModal.module.scss';
import {organizationApi} from "../../../../../entities/employee/api/api.ts";

type TEmployeeViewModalProps = {
    isOpen: boolean;
    onClose: () => void;
    employeeId: string | null;
}

export const EmployeeViewEditModal: FC<TEmployeeViewModalProps> = (props) => {
    const {isOpen, onClose, employeeId} = props;

    const [editMode, setEditMode] = useState<boolean>(false);


    const {data: employeeData} = organizationApi.useGetEmployeeByIdQuery(employeeId!, {
        skip: !employeeId
    });

    const {data: accountData} = organizationApi.useGetAccountByIdQuery(employeeId!, {
        skip: !employeeId
    });

    const {data: departmentData} = organizationApi.useGetDepartmentByEmployeeIdQuery(employeeId!, {
        skip: !employeeId
    });

    const {data: positionData} = organizationApi.useGetPositionByEmployeeIdQuery(employeeId!, {
        skip: !employeeId
    });

    const {data: departmentsData} = organizationApi.useGetDepartmentsQuery();

    const {data: positionsData} = organizationApi.useGetPositionsByDepartmentQuery(
        departmentData?.id ?? '',
        {
            skip: !departmentData?.id,
        }
    );

    const [isDropdownDepartmentOpen, setIsDropdownDepartmentOpen] = useState(false);
    const [isDropdownPositionOpen, setIsDropdownPositionOpen] = useState(false);
    const [isDropdownMaritalOpen, setIsDropdownMaritalOpen] = useState(false);

    const [departments, setDepartments] = useState<IDepartment[]>([]);

    const [positions, setPositions] = useState<IPosition[]>([]);

    // employee
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const today = new Date();
    const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    );
    const [birthDate, setBirthDate] = useState<Date | null>(null);

    const [employmentDate, setEmploymentDate] = useState<Date | null>(null);
    const [residentialAddress, setResidentialAddress] = useState('');
    const [email, setEmail] = useState('');

    type MaritalStatusKey = keyof typeof EmployeeMaritalStatusEnum;
    const maritalStatusItems: { id: MaritalStatusKey; name: string }[] = [
        { id: "SINGLE", name: "Холост / Не замужем" },
        { id: "MARRIED", name: "Женат / Замужем" },
        { id: "WINDOWED", name: "Вдовец / Вдова" },
        { id: "DIVORCED", name: "Разведён / Разведена" },
    ];
    const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<MaritalStatusKey | null>(null);
    const onSelectMarital = (id: string) => {
        setSelectedMaritalStatus(id as MaritalStatusKey);
    };

    const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);

    const [selectedPositionId, setSelectedPositionId] = useState<string | null>(null);

    const [emailError, setEmailError] = useState<string | null>(null);
    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const [phoneError, setPhoneError] = useState<string | null>(null);
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

    // account
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    // const [role, setRole] = useState('');

    const isLoading =
        !employeeData ||
        !accountData ||
        !departmentData ||
        !positionData;

    useEffect(() => {
        if (employeeData) {
            setFullName(employeeData.fullName);
            setPhoneNumber(employeeData.phoneNumber);
            setBirthDate(new Date(employeeData.birthDate));
            setEmploymentDate(new Date(employeeData.employmentDate));
            setResidentialAddress(employeeData.residentialAddress);
            setSelectedMaritalStatus(
                Object.entries(EmployeeMaritalStatusEnum).find(([, v]) => v === employeeData.maritalStatus)?.[0] as MaritalStatusKey
            );
            setEmail(employeeData.email);
        }

        if (accountData) {
            setLogin(accountData.login);
            setPassword(accountData.password);
            // setRole(accountData.role);
        }

        if (departmentsData) {
            setDepartments(departmentsData.departments);
        }

        if (departmentData) {
            setSelectedDepartmentId(departmentData.id);
        }

        if (positionsData) {
            setPositions([...positionsData.positions]);
        }

        if (positionData) {
            setSelectedPositionId(positionData.id)
        }
    }, [employeeData, accountData, departmentData, departmentsData, positionData, positionsData]);

    const setDefault = () => {
        if (employeeData) {
            setFullName(employeeData.fullName);
            setPhoneNumber(employeeData.phoneNumber);
            setBirthDate(new Date(employeeData.birthDate));
            setEmploymentDate(new Date(employeeData.employmentDate));
            setResidentialAddress(employeeData.residentialAddress);
            setSelectedMaritalStatus(
                Object.entries(EmployeeMaritalStatusEnum).find(([, v]) => v === employeeData.maritalStatus)?.[0] as MaritalStatusKey
            );
            setEmail(employeeData.email);
        }

        if (accountData) {
            setLogin(accountData.login);
            setPassword(accountData.password);
            // setRole(accountData.role);
        }

        if (departmentsData) {
            setDepartments(departmentsData.departments);
        }

        if (departmentData) {
            setSelectedDepartmentId(departmentData.id);
        }

        if (positionsData) {
            setPositions([...positionsData.positions]);
        }

        if (positionData) {
            setSelectedPositionId(positionData.id)
        }
    };

    const onCloseClick = () => {
        onClose();
        // clearStates();
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                // onSaveClick();
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
        <div className={styles.modalWrapper}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    Карточка сотрудника
                    <div className={styles.iconButtonContainer}>
                        <IconButton
                            typeIcon={IconEnum.CROSS}
                            onClick={onCloseClick}
                        />
                    </div>
                </div>
                {isLoading ?
                    <div className={styles.loaderOverlay}>
                        <div className={styles.spinner}></div>
                    </div>
                    :
                    <div>
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
                                               disabled={!editMode}
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
                                        onSelect={(id: string) => {
                                            setSelectedDepartmentId(id)
                                            setSelectedPositionId(null);
                                        }}
                                        placeholder="Выбрать подразделения"
                                        disabled={!editMode}
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
                                        onSelect={(id: string) => {
                                            setSelectedPositionId(id)
                                        }}
                                        placeholder="Выбрать должность"
                                        disabled={!editMode || selectedDepartmentId === null}
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
                                            value={birthDate}
                                            onSelect={setBirthDate}
                                            maxDate={eighteenYearsAgo}
                                            disabled={!editMode}
                                        />
                                    </Label>

                                    <Label label={"Дата приёма на работу"}>
                                        <CustomDatePicker
                                            value={employmentDate}
                                            onSelect={setEmploymentDate}
                                            disabled={!editMode}
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
                                            disabled={!editMode}
                                        />
                                        {emailError && <div className={styles.error}>{emailError}</div>}
                                    </Label>

                                    <Label label={'Логин'}>
                                        <Input value={login}
                                               disabled={true}
                                               onChange={(e) => setLogin(e.target.value)}
                                               readOnly={true} showCopyButton={true}
                                        />
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
                                            value={residentialAddress}
                                            onChange={(e) => setResidentialAddress(e.target.value)}
                                            disabled={!editMode}
                                        />
                                    </Label>

                                    <DropdownMenuSingle<{
                                        id: MaritalStatusKey;
                                        name: string;
                                    }>
                                        label="Семейное положение"
                                        isOpen={false}
                                        toggleOpen={() => {
                                            // setIsDropdownMaritalOpen(prev => !prev)
                                        }}
                                        selectedId={selectedMaritalStatus}
                                        items={maritalStatusItems}
                                        getId={(p) => p.id}
                                        getLabel={(p) => p.name}
                                        onSelect={onSelectMarital}
                                        disabled={!editMode}
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
                                            disabled={!editMode}
                                        />
                                        {phoneError && <div className={styles.error}>{phoneError}</div>}
                                    </Label>

                                    <Label label={'Пароль'}>
                                        <Input
                                            value={password}
                                            disabled={true}
                                            onChange={(e) => setPassword(e.target.value)}
                                            readOnly={true} showCopyButton={true}
                                        />
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    !editMode ?
                        <div className={styles.control}>
                            <Button className={styles.saveButton}
                                    onClick={() => setEditMode(true)}
                            >
                                Редактировать
                            </Button>
                            <Button className={styles.closeButton}
                                    onClick={onCloseClick}
                            >
                                Закрыть
                            </Button>
                        </div>
                        :
                        <div className={styles.control}>
                            <Button className={styles.saveButton}
                                    onClick={() => setEditMode(true)}
                            >
                                Сохранить
                            </Button>
                            <Button className={styles.saveButton}
                                    onClick={() => setEditMode(true)}
                            >
                                Сохранить и закрыть
                            </Button>
                            <Button className={styles.closeButton}
                                    onClick={() => {
                                        setEditMode(false);
                                        setDefault();
                                    }}
                            >
                                Отменить
                            </Button>
                        </div>
                }

            </div>
        </div>
    );
}