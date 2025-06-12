import React, {FC, useCallback, useEffect, useState} from "react";
import styles from './EmployeeCreateModal.module.scss';
import {IconButton} from "../../../../../shared/ui/icon-button/icon-button.tsx";
import {IconEnum} from "../../../../../shared/ui/icon/IconType.tsx";
import {DropdownMenuSingle} from "./dropdown-menu/DropdownMenu.tsx";
import {AccountRoleEnum, IDepartment, IPosition} from "../../../../../entities/employee/api/types.ts";
import {organizationApi} from "../../../../../entities/employee/api/api.ts";
import {Button} from "../../../../../shared/ui/button";
import {Label} from "../../../../../shared/ui/label/label.tsx";
import {Input} from "../../../../../shared/ui/input/input.tsx";
import {generateCredentials} from "../../../../utils/CredentialsGenerator.ts";
import {notificationError, notificationSuccess} from "../../../../notifications/callNotification.tsx";
import {v4 as uuid} from 'uuid';


type TProcessCreateModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

export const EmployeeCreateModal: FC<TProcessCreateModalProps> = (props) => {
    const {
        isOpen, onClose
    } = props;


    const [isDropdownDepartmentOpen, setIsDropdownDepartmentOpen] = useState(false);
    const [isDropdownPositionOpen, setIsDropdownPositionOpen] = useState(false);

    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<string | null>(null);

    const [positions, setPositions] = useState<IPosition[]>([]);
    const [selectedPositionId, setSelectedPositionId] = useState<string | null>(null);

    const [fullName, setFullName] = useState<string>('');


    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('')

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

    const onSaveClick = useCallback( async () => {
        const employeeId = uuid();

        onClose();
        try {
            await createEmployee({
                employee: {
                    id: employeeId,
                    fullName,
                    phoneNumber: '',
                    birthDate: new Date(),
                    employmentDate: new Date(),
                    residentialAddress: '',
                    maritalStatus: 'single',
                    email: '',
                },
                account: {
                    id: employeeId,
                    login,
                    password: '$2a$10$A6lwFl3TlDyZA3UkbobGFOFe.PyI0iQsEUlm1rILs7HWGAaV3AKcC',
                    role: AccountRoleEnum.EMPLOYEE,
                },
                departmentId: selectedDepartmentId!,
                positionId: selectedPositionId!,
            }).unwrap();

            notificationSuccess('Сотрудник создан')
            clearStates();
        } catch (error) {
            console.error('Ошибка создания сотрудника:', error);
            notificationError('Ошибка создания сотрудника');
        }

        clearStates();
    }, [createEmployee, fullName, login, onClose, password, selectedDepartmentId, selectedPositionId]);

    const clearStates = () => {
        setIsDropdownDepartmentOpen(false);
        setIsDropdownPositionOpen(false);

        setDepartments([]);
        setSelectedDepartmentId(null);

        setPositions([]);
        setSelectedPositionId(null);

        setFullName('');
    };

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
    }, [onSaveClick, isOpen, onClose]);

    if (!isOpen) return null;

    console.log(fullName.length < 3 ||
        selectedPositionId === null ||
        selectedDepartmentId === null)
    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modalContent}>
                <div className={styles.header}>
                    Карточка сотрудника
                    <div className={styles.iconButtonContainer}>
                        <IconButton
                            typeIcon={IconEnum.CROSS}
                            onClick={onClose}
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
                    <div className={styles.aboutCredentials}>
                        <Label label={"Логин"} className={styles.login}>
                            <Input
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                readOnly={true} showCopyButton={true}/>
                        </Label>
                        <Label label={"Пароль"} className={styles.password}>
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                readOnly={true} showCopyButton={true}/>
                        </Label>
                    </div>
                    <Button
                        className={styles.generateButton}
                        onClick={() => {
                            const {login} = generateCredentials({
                                words: fullName.split(' '),
                                loginSuffix: '@start-set',
                                passwordLength: 12,
                            });

                            setLogin(login);
                            setPassword('1234');
                        }}
                        disabled={
                            fullName.length < 3 ||
                            selectedPositionId === null ||
                            selectedDepartmentId === null
                        }
                    >
                        Сгенерировать логин и пароль
                    </Button>
                </div>
                <div className={styles.control}>
                    <Button className={styles.saveButton}
                            onClick={onSaveClick}
                            disabled={
                                fullName.split(' ').length < 3 ||
                                selectedPositionId === null ||
                                selectedDepartmentId === null
                            }
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

