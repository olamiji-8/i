export const Cookies = ({ setState }) => {


    const handleCookies = (choice) => {
        localStorage.setItem('useCookies', choice);
        setState((prevState) => {
            return { ...prevState, actionTaken: true, useCookies: choice };
        });
    };

    return (
        <div className='cookies'>
            <span className='cookies-buttons'>
                <button onClick={() => handleCookies(true)}>Accept</button>
                <button onClick={() => handleCookies(false)}>Decline</button>
            </span>
        </div>
    );
};