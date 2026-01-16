import { useState } from 'react';
import { AuthLayout } from '../Components/AuthLayout';
import { SignUpForm } from '../Components/SignUpForm';
import { SignInForm } from '../Components/SignInForm';
import { useTheme } from '../Context/ThemeContext';

const Auth = ({ initialView }) => {
    const [view, setView] = useState(initialView || 'signup');
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="min-h-screen">
            <AuthLayout toggleTheme={toggleTheme} theme={theme}>
                {view === 'signup' ? (
                    <SignUpForm onSwitch={() => setView('signin')} theme={theme} />
                ) : (
                    <SignInForm onSwitch={() => setView('signup')} theme={theme} />
                )}
            </AuthLayout>
        </div>
    );
};

export default Auth;
