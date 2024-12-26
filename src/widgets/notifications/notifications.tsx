import React from 'react';
import css from './notification.module.scss';

interface INotificationsProps {
    title: string,
    filled?: boolean,
    btnText?: string,
    description: string,
    children?: React.ReactNode,
    btnOnClick?: () => null | void,
}

export const Notifications = (props: INotificationsProps) => {
    const {
        title,
        filled,
        description,
        children,
    } = props;

    return (
        <div className={css.wrapper}>
            <div className={css.picture}>
                {children}
            </div>
            <div className={css.content}>
                {
                    !!title && (
                        <div
                            className={css.title}
                            style={filled ? { color: '#fff' } : { }}
                        >
                            {title}
                        </div>
                    )
                }
                {
                    !!description && (
                        <div
                            className={css.description}
                            style={filled ? { color: '#fff' } : { }}
                        >
                            {description}
                        </div>
                    )
                }
            </div>
        </div>
    );
};
