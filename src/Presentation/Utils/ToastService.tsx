import { addToast } from "@heroui/react";
import i18next from "i18next";
import { CustomToast } from "../Components/Common/CustomToast";
import type { ToastType } from "../Components/Common/CustomToast";
import type { errorResponseType } from "../../Domain/Entities/generics";

export interface ToastOptions {
    descriptionKey?: string;
    duration?: number;
    params?: Record<string, unknown>;
}

/**
 * Generic Toast Service to call alerts from anywhere.
 * Uses HeroUI Toast system with a premium custom component and i18next support.
 */
class ToastService {
    public success(titleKey: string, options?: ToastOptions) {
        this.show(titleKey, "success", options);
    }

    public error(titleKey: string, options?: ToastOptions) {
        this.show(titleKey, "error", options);
    }

    public warning(titleKey: string, options?: ToastOptions) {
        this.show(titleKey, "warning", options);
    }

    public info(titleKey: string, options?: ToastOptions) {
        this.show(titleKey, "info", options);
    }

    /**
     * Handles backend errors by extracted the errorId and showing a translated message.
     * Fallbacks to a generic error message if no translation or errorId is found.
     */
    public handleBackendError(error: unknown, fallbackTitleKey: string = "toast.error_title") {
        const backendError = error as errorResponseType;
        const errorId = backendError?.error?.errorId;

        if (errorId !== undefined) {
            const translationKey = `errors.${errorId}`;
            // Check if translation exists for this errorId
            if (i18next.exists(translationKey)) {
                this.error(fallbackTitleKey, { descriptionKey: translationKey });
                return;
            }
        }

        // Fallback to description if available, otherwise use a generic message
        const description = backendError?.error?.description || "common.error";
        this.error(fallbackTitleKey, { descriptionKey: description });
    }

    private show(titleKey: string, type: ToastType, options?: ToastOptions) {
        const translatedTitle = i18next.t(titleKey, options?.params) || titleKey;
        const translatedDescription = options?.descriptionKey
            ? i18next.t(options.descriptionKey, options.params)
            : undefined;

        const timeout = options?.duration || 4000;

        addToast({
            title: (
                <CustomToast
                    message={translatedTitle}
                    description={translatedDescription}
                    type={type}
                    timeout={timeout}
                />
            ),
            timeout: timeout,
            variant: "flat",
            hideIcon: true,
            hideCloseButton: true,
            classNames: {
                base: "bg-transparent shadow-none border-none p-0 min-w-[320px] m-0 overflow-visible",
                content: "p-0",
            }
        });
    }
}

export const toast = new ToastService();


