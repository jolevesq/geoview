import { Theme } from '@mui/material/styles';
export declare const getSxClasses: (theme: Theme) => {
    notificationPanel: {
        display: string;
        flexDirection: string;
        width: string;
        maxHeight: string;
        overflowY: string;
        gap: string;
        marginLeft: string;
        backgroundColor: string;
        borderRadius: string;
        boxShadow: number;
        padding: string;
    };
    notificationsTitle: {
        fontSize: any;
        fontWeight: string;
        padding: string;
        color: string;
        borderBottom: string;
        marginBottom: string;
    };
    notificationsList: {
        overflowY: string;
        padding: string;
    };
    notificationItem: {
        display: string;
        flexDirection: string;
        alignItems: string;
        gap: string;
        padding: string;
        '&:not(:last-child)': {
            borderBottom: string;
        };
        '& .MuiIconButton-root': {
            color: string;
            '&:hover': {
                color: string;
            };
        };
    };
    notificationsCount: {
        backgroundColor: string;
        color: string;
        fontSize: any;
        borderRadius: string;
        height: string;
        width: string;
        textAlign: string;
        lineHeight: string;
    };
};
