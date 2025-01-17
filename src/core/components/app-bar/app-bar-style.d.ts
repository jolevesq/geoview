import { Theme } from '@mui/material/styles';
export declare const getSxClasses: (theme: Theme) => {
    appBar: {
        display: string;
        flexDirection: string;
        justifyContent: string;
        zIndex: number;
        pointerEvents: string;
        backgroundColor: string;
        border: string;
        '&.interaction-static': {
            position: string;
            left: number;
            top: number;
            height: string;
            backgroundColor: string;
            border: string;
            paddingBottom: string;
            '&>div': {
                border: string;
            };
        };
    };
    appBarList: {
        width: number;
        '& li': {
            backgroundColor: string;
            justifyContent: string;
            margin: string;
            padding: number;
            '&:hover': {
                backgroundColor: string;
                color: string;
            };
        };
        '& hr': {
            width: string;
            marginLeft: string;
        };
    };
    appBarButtons: {
        borderRightColor: string;
        borderRightWidth: number;
        borderRightStyle: string;
        width: number;
    };
    appBarButton: {
        backgroundColor: string;
        color: string;
        height: number;
        width: number;
        transition: string;
        border: string;
        '&:hover': {
            backgroundColor: string;
            color: string;
        };
        '&:focus': {
            backgroundColor: string;
            color: string;
        };
        '&:active': {
            backgroundColor: string;
            color: string;
        };
        '&.active': {
            border: string;
            backgroundColor: string;
            color: string;
        };
        '& .MuiSvgIcon-root': {
            height: number;
            width: number;
        };
    };
    versionButtonDiv: {
        position: string;
        bottom: number;
    };
    appBarPanels: {};
};
