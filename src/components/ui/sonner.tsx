import { useSyncExternalStore } from "react";
import { Toaster as Sonner } from "sonner";
import type { ToasterProps } from "sonner";

const subscribe = (callback: (matches: boolean) => void) => {
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', () => callback(media.matches));
  return () => media.removeEventListener('change', () => callback(media.matches));
};

const Toaster = ({ ...props }: ToasterProps) => {
  const isDark = useSyncExternalStore(
    subscribe,
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
    () => false
  );

  return (
    <Sonner
      theme={isDark ? 'dark' : 'light'}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-background dark:group-[.toaster]:text-foreground",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "group-[.toaster]:bg-green-100 group-[.toaster]:text-green-900 group-[.toaster]:border-green-200 dark:group-[.toaster]:bg-green-900 dark:group-[.toaster]:text-green-100",
          error: "group-[.toaster]:bg-red-100 group-[.toaster]:text-red-900 group-[.toaster]:border-red-200 dark:group-[.toaster]:bg-red-900 dark:group-[.toaster]:text-red-100",
          info: "group-[.toaster]:bg-blue-100 group-[.toaster]:text-blue-900 group-[.toaster]:border-blue-200 dark:group-[.toaster]:bg-blue-900 dark:group-[.toaster]:text-blue-100",
          warning: "group-[.toaster]:bg-yellow-100 group-[.toaster]:text-yellow-900 group-[.toaster]:border-yellow-200 dark:group-[.toaster]:bg-yellow-900 dark:group-[.toaster]:text-yellow-100"
        },
        duration: 3000,
        position: "bottom-right"
      }}
      {...props}
    />
  );
};

export { Toaster };