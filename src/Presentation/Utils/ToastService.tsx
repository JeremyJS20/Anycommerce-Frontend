import { addToast } from "@heroui/react";
import i18next from "i18next";
import { CustomToast } from "../Components/Common/CustomToast";
import type { ToastType } from "../Components/Common/CustomToast";

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


