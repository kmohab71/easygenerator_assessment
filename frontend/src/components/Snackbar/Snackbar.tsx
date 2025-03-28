import * as React from 'react';
import {
  useNotifications,
  NotificationsProvider,
} from '@toolpad/core/useNotifications';
import Button from '@mui/material/Button';

function NotifyButton({ isError, message }: { isError: boolean; message: string }) {
    const notifications = useNotifications();
    const [online, setOnline] = React.useState(true);
    const prevOnline = React.useRef(online);
    React.useEffect(() => {
        if (prevOnline.current === online) {
            return () => {};
        }
        prevOnline.current = online;

        // preview-start
        const key = notifications.show(message, {
            severity: isError ? 'error' : 'success',
            autoHideDuration: isError ? undefined : 3000,
        });

        return () => {
            notifications.close(key);
        };
        // preview-end
    }, [notifications, online, isError, message]);

    return <Button onClick={() => setOnline((prev) => !prev)}>Notify</Button>;
}

export default function ToolpadNotificationsNoSnap({ isError, message }: { isError: boolean; message: string }) {
  return (
    <NotificationsProvider>
      <NotifyButton isError={isError} message={message} />
    </NotificationsProvider>
  );
}
