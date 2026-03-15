import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@Presentation/Components/Common/Button';
import { Input } from '@Presentation/Components/Common/Input';
import { Logo } from '@Presentation/Components/Common/Logo';
import { Alert } from '@Presentation/Components/Common/Alert';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@Presentation/Context/AuthContext';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, EyeOff, CheckCircle, Circle } from 'lucide-react';
import { signUpSchema, type SignUpFormData } from '@Validation/Auth.schema';
import { z } from 'zod';

export const SignUp = () => {
    const { t } = useTranslation();
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof SignUpFormData, string>>>({});
    const [isVisible, setIsVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);

    const [formData, setFormData] = useState<SignUpFormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [passwordCriteria, setPasswordCriteria] = useState({
        minChars: false,
        uppercase: false,
        number: false,
        specialChar: false
    });

    useEffect(() => {
        const { password } = formData;
        setPasswordCriteria({
            minChars: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[^A-Za-z0-9]/.test(password)
        });
    }, [formData.password]);

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleConfirmVisibility = () => setConfirmVisible(!confirmVisible);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear field error when user starts typing
        if (fieldErrors[name as keyof SignUpFormData]) {
            setFieldErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setFieldErrors({});

        try {
            // Validate with Zod
            signUpSchema.parse(formData);

            setIsSubmitting(true);
            const signUpData = {
                name: formData.firstName,
                lastName: formData.lastName,
                email: {
                    value: formData.email,
                    verified: false
                },
                password: formData.password
            };
            await signUp(signUpData);
            navigate('/signin');
        } catch (err) {
            if (err instanceof z.ZodError) {
                const errors: Partial<Record<keyof SignUpFormData, string>> = {};
                err.issues.forEach((issue) => {
                    const path = issue.path[0] as keyof SignUpFormData;
                    if (path && !errors[path]) {
                        errors[path] = issue.message;
                    }
                });
                setFieldErrors(errors);
            } else {
                console.error(err);
                // Backend errors are handled in AuthContext via toast.handleBackendError
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-pfm-bg p-6 relative overflow-hidden">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-pfm-primary/10 rounded-full blur-3xl animate-pulse delay-700"></div>
            <div className="absolute bottom-0 -right-4 w-96 h-96 bg-pfm-secondary/10 rounded-full blur-3xl animate-pulse"></div>

            <div className="relative z-10 flex-1 flex flex-col justify-center px-8 py-10 lg:px-16 bg-pfm-card/50 glass w-full max-w-[550px] rounded-2xl">
                <div className="sm:mx-auto sm:w-full">
                    <Logo config={{ size: "lg", className: "mb-6" }} />
                    <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-pfm-text mb-2">{t('auth.create_account')}</h1>
                    <p className="text-base text-pfm-text-muted">
                        {t('auth.join_anycommerce')}
                    </p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full">
                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mb-6"
                            >
                                <Alert
                                    config={{
                                        variant: "danger",
                                        message: error,
                                        onClose: () => setError(null)
                                    }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-y-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mb-8">
                            <Input
                                config={{
                                    name: "firstName",
                                    type: "text",
                                    label: t('auth.first_name'),
                                    labelPlacement: "outside",
                                    placeholder: t('auth.first_name_placeholder'),
                                    variant: "bordered",
                                    radius: "lg",
                                    size: "lg",
                                    isRequired: true,
                                    isInvalid: !!fieldErrors.firstName,
                                    errorMessage: fieldErrors.firstName ? t(fieldErrors.firstName) : undefined,
                                    value: formData.firstName,
                                    onChange: handleInputChange,
                                    classNames: {
                                        inputWrapper: "bg-pfm-bg border-pfm-border hover:border-pfm-primary focus-within:border-pfm-primary transition-all shadow-sm",
                                        input: "text-pfm-text placeholder:text-pfm-text-muted/60",
                                        label: "text-pfm-text font-bold pb-2 text-sm"
                                    }
                                }}
                            />
                            <Input
                                config={{
                                    name: "lastName",
                                    type: "text",
                                    label: t('auth.last_name'),
                                    labelPlacement: "outside",
                                    placeholder: t('auth.last_name_placeholder'),
                                    variant: "bordered",
                                    radius: "lg",
                                    size: "lg",
                                    isRequired: true,
                                    isInvalid: !!fieldErrors.lastName,
                                    errorMessage: fieldErrors.lastName ? t(fieldErrors.lastName) : undefined,
                                    value: formData.lastName,
                                    onChange: handleInputChange,
                                    classNames: {
                                        inputWrapper: "bg-pfm-bg border-pfm-border hover:border-pfm-primary focus-within:border-pfm-primary transition-all shadow-sm",
                                        input: "text-pfm-text placeholder:text-pfm-text-muted/60",
                                        label: "text-pfm-text font-bold pb-2 text-sm"
                                    }
                                }}
                            />
                        </div>

                        <div className="mb-8">
                            <Input
                                config={{
                                    name: "email",
                                    type: "email",
                                    label: t('auth.email_address'),
                                    labelPlacement: "outside",
                                    placeholder: t('auth.email_placeholder'),
                                    variant: "bordered",
                                    radius: "lg",
                                    size: "lg",
                                    isRequired: true,
                                    isInvalid: !!fieldErrors.email,
                                    errorMessage: fieldErrors.email ? t(fieldErrors.email) : undefined,
                                    value: formData.email,
                                    onChange: handleInputChange,
                                    classNames: {
                                        inputWrapper: "bg-pfm-bg border-pfm-border hover:border-pfm-primary focus-within:border-pfm-primary transition-all shadow-sm",
                                        input: "text-pfm-text placeholder:text-pfm-text-muted/60",
                                        label: "text-pfm-text font-bold pb-2 text-sm"
                                    }
                                }}
                            />
                        </div>

                        <div className="space-y-8">
                            <div className="relative">
                                <label className="text-pfm-text font-bold text-sm mb-2 block">
                                    {t('auth.password')}
                                </label>
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
                                        isInvalid: !!fieldErrors.password,
                                        errorMessage: fieldErrors.password ? t(fieldErrors.password) : undefined,
                                        value: formData.password,
                                        onChange: handleInputChange,
                                        endContent: (
                                            <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                                                {isVisible ? (
                                                    <EyeOff className="text-2xl text-pfm-text-muted pointer-events-none" />
                                                ) : (
                                                    <Eye className="text-2xl text-pfm-text-muted pointer-events-none" />
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

                            <div className="bg-pfm-primary/5 dark:bg-pfm-primary/10 rounded-xl p-4 space-y-3">
                                <p className="text-[10px] font-bold text-pfm-primary uppercase tracking-widest">{t('auth.password_strength')}</p>
                                <div className="grid grid-cols-2 gap-y-2">
                                    <RequirementItem fulfilled={passwordCriteria.minChars} text={t('auth.min_chars')} />
                                    <RequirementItem fulfilled={passwordCriteria.uppercase} text={t('auth.one_uppercase')} />
                                    <RequirementItem fulfilled={passwordCriteria.number} text={t('auth.one_number')} />
                                    <RequirementItem fulfilled={passwordCriteria.specialChar} text={t('auth.one_special')} />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="text-pfm-text font-bold text-sm mb-2 block">
                                    {t('auth.confirm_password')}
                                </label>
                                <Input
                                    config={{
                                        name: "confirmPassword",
                                        type: confirmVisible ? "text" : "password",
                                        labelPlacement: "outside",
                                        placeholder: "••••••••",
                                        variant: "bordered",
                                        radius: "lg",
                                        size: "lg",
                                        isRequired: true,
                                        isInvalid: !!fieldErrors.confirmPassword,
                                        errorMessage: fieldErrors.confirmPassword ? t(fieldErrors.confirmPassword) : undefined,
                                        value: formData.confirmPassword,
                                        onChange: handleInputChange,
                                        endContent: (
                                            <button className="focus:outline-none" type="button" onClick={toggleConfirmVisibility} aria-label="toggle password visibility">
                                                {confirmVisible ? (
                                                    <EyeOff className="text-2xl text-pfm-text-muted pointer-events-none" />
                                                ) : (
                                                    <Eye className="text-2xl text-pfm-text-muted pointer-events-none" />
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
                        </div>

                        <div className="pt-4">
                            <Button
                                config={{
                                    type: "submit",
                                    variant: "solid",
                                    isLoading: isSubmitting,
                                    className: "w-full bg-pfm-primary text-white font-bold rounded-xl px-6 h-12 shadow-lg shadow-pfm-primary/20 transition-all hover:bg-pfm-primary-hover hover:shadow-xl hover:-translate-y-1 active:scale-95 text-lg",
                                    children: t('auth.sign_up')
                                }}
                            />
                        </div>
                    </form>
                </div>

                <div className="mt-8 pt-6 border-t border-pfm-border text-center">
                    <p className="text-sm text-pfm-text-muted">
                        {t('auth.already_have_account')}{' '}
                        <Link className="font-semibold text-pfm-primary hover:text-pfm-primary-hover transition-colors" to="/signin">
                            {t('auth.sign_in')}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const RequirementItem = ({ fulfilled, text }: { fulfilled: boolean; text: string }) => (
    <div className={`flex items-center gap-2 text-[13px] transition-colors ${fulfilled ? 'text-pfm-primary' : 'text-pfm-text-muted'}`}>
        {fulfilled ? (
            <CheckCircle size={16} className="text-pfm-primary" />
        ) : (
            <Circle size={16} className="text-pfm-text-muted/50" />
        )}
        <span className={fulfilled ? 'font-medium' : ''}>{text}</span>
    </div>
);
