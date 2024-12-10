import css from './SignInBlock.module.scss'
import {Label} from "../../../../widgets/label/label.tsx";
import {Input} from "../../../../widgets/input/input.tsx";
import {MainButton} from "../../../../widgets/button/button.tsx";

export const SignInBlock = () => {
    return (
        <div className={css.wrapper}>
            <div className={css.title}>Войти</div>
            <Label label="Логин">
                <Input placeholder="Введите логин"/>
            </Label>
            <Label label="Пароль">
                <Input placeholder="Введите пароль"/>
            </Label>
            <MainButton text={'Войти'}/>
        </div>
    )
}