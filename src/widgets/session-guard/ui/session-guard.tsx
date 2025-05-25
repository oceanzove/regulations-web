import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

export const SessionGuard = ({children}: { children: React.ReactNode }) => {
    const [isLocked, setIsLocked] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes scaleIn {
                from { transform: scale(0.9); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    useEffect(() => {
        const checkLock = () => {
            setIsLocked(localStorage.getItem('isSessionLocked') === 'true');
        };

        checkLock();
        const interval = setInterval(checkLock, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (isLocked) {
            const timeout = setTimeout(() => {
                localStorage.removeItem('isSessionLocked');
                localStorage.removeItem('isSessionExpiredShown');
                navigate('/'); // или '/login' — в зависимости от твоих маршрутов
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [isLocked, navigate]);

    // console.log(`session locke ${localStorage.getItem('isSessionLocked')}`);
    // useEffect(() => {
    //     const checkLock = () => {
    //         setIsLocked(localStorage.getItem('isSessionLocked') === 'true');
    //     };
    //
    //     checkLock();
    //
    //     const interval = setInterval(checkLock, 500); // обновление статуса блокировки
    //
    //     return () => clearInterval(interval);
    // }, []);

    if (isLocked) {
        return (
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    zIndex: 9999,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: 'sans-serif',
                    animation: 'fadeIn 0.4s ease',
                }}
            >
                <div
                    style={{
                        backgroundColor: '#fff',
                        color: '#333',
                        padding: '40px 60px',
                        borderRadius: '12px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                        textAlign: 'center',
                        maxWidth: '90%',
                        width: '400px',
                        animation: 'scaleIn 0.3s ease',
                    }}
                >
                    <h2 style={{marginBottom: '20px', fontSize: '24px'}}>Сеанс завершён</h2>
                    <p style={{fontSize: '18px', marginBottom: '10px'}}>
                        Пожалуйста, авторизируйтесь заново.
                    </p>
                    <p style={{fontSize: '14px', color: '#888'}}>
                        Вы будете автоматически перенаправлены на страницу входа.
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};