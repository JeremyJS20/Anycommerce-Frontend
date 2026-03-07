import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@Presentation/Components/Common/Button';
import { Input } from '@Presentation/Components/Common/Input';
import { Logo } from '@Presentation/Components/Common/Logo';
import { Alert } from '@Presentation/Components/Common/Alert';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@Presentation/Context/AuthContext';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export const SignIn = () => {
    const { t } = useTranslation();
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        try {
            await login(formData);
            navigate(from, { replace: true });
        } catch (err) {
            console.error(err);
            const errorData = err as { error?: { description?: string } };
            setError(errorData.error?.description || t('auth.login_failed'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-pfm-bg p-6 relative overflow-hidden">
            {/* Background Decorative Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-pfm-primary/10 rounded-full blur-3xl animate-pulse delay-700"></div>
            <div className="absolute bottom-0 -right-4 w-96 h-96 bg-pfm-secondary/10 rounded-full blur-3xl animate-pulse"></div>

            {/* Left Side: Login Form */}
            <div className="relative z-10 flex-1 flex flex-col justify-center px-8 py-12 lg:px-16 bg-pfm-card/50 glass w-full max-w-[500px] rounded-2xl">
                <div className="sm:mx-auto sm:w-full">
                    {/* Logo */}
                    <Logo config={{ size: "lg", className: "mb-8 " }} />
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-pfm-text mb-2 tracking-tight">{t('auth.welcome_back')}</h1>
                    <p className="text-base text-pfm-text-muted">
                        {t('auth.enter_details')}
                    </p>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full">
                    <AnimatePresence mode="wait">
                        {error && (
                            <div className="mb-10">
                                <Alert
                                    config={{
                                        variant: "danger",
                                        message: error,
                                        onClose: () => setError(null)
                                    }}
                                />
                            </div>
                        )}
                    </AnimatePresence>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Input */}
                        <div>
                            <Input
                                config={{
                                    name: "username",
                                    type: "text",
                                    label: t('auth.username'),
                                    labelPlacement: "outside",
                                    placeholder: t('auth.username_placeholder'),
                                    variant: "bordered",
                                    radius: "lg",
                                    size: "lg",
                                    isRequired: true,
                                    classNames: {
                                        inputWrapper: "bg-pfm-bg border-pfm-border hover:border-pfm-primary focus-within:border-pfm-primary transition-all shadow-sm",
                                        input: "text-pfm-text placeholder:text-pfm-text-muted/60",
                                        label: "text-pfm-text font-bold pb-2 text-sm"
                                    }
                                }}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-pfm-text font-bold text-sm">
                                    {t('auth.password')}
                                </label>
                                <Link className="text-sm font-bold text-pfm-primary hover:text-pfm-primary-hover transition-colors" to="/forgot-password">
                                    {t('auth.forgot_password')}
                                </Link>
                            </div>
                            <Input
                                config={{
                                    name: "password",
                                    type: isVisible ? "text" : "password",
                                    labelPlacement: "outside",
                                    placeholder: "••••••••",
                                    variant: "bordered",
                                    radius: "lg",
                                    size: "lg",
                                    isRequired: true,
                                    endContent: (
                                        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                            {isVisible ? (
                                                <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                                <Eye className="text-2xl text-default-400 pointer-events-none" />
                                            )}
                                        </button>
                                    ),
                                    classNames: {
                                        inputWrapper: "bg-pfm-bg border-pfm-border hover:border-pfm-primary focus-within:border-pfm-primary transition-all shadow-sm",
                                        input: "text-pfm-text placeholder:text-pfm-text-muted/60",
                                    }
                                }}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-10">
                            <Button
                                config={{
                                    type: "submit",
                                    variant: "solid",
                                    isLoading: isSubmitting,
                                    className: "w-full bg-pfm-primary text-white font-bold rounded-xl px-6 h-12 shadow-lg shadow-pfm-primary/20 transition-all hover:bg-pfm-primary-hover hover:shadow-xl hover:-translate-y-1 active:scale-95 text-lg",
                                    children: t('auth.sign_in')
                                }}
                            />
                        </div>
                    </form>
                </div>

                {/* Sign Up Link */}
                <p className="mt-10 text-center text-sm text-pfm-text-muted">
                    {t('auth.no_account')}{' '}
                    <Link className="font-semibold leading-6 text-pfm-primary hover:text-pfm-primary-hover transition-colors" to="/register">
                        {t('auth.sign_up')}
                    </Link>
                </p>
            </div>
        </div>
    );
};
