import { Theme } from '@mui/material/styles';
export declare const getSxClasses: (theme: Theme) => {
    scaleControl: {
        display: string;
    };
    scaleContainer: {
        display: string;
        backgroundColor: string;
        border: string;
        height: string;
        ':hover': {
            backgroundColor: string;
            color: string;
        };
        '&.interaction-static': {
            padding: string;
            backdropFilter: string;
        };
    };
    scaleExpandedContainer: {
        display: string;
        flexDirection: string;
        justifyContent: string;
        height: string;
        gap: string;
    };
    scaleExpandedCheckmarkText: {
        display: string;
        flexDirection: string;
        alignItems: string;
        justifyContent: string;
        height: string;
        maxHeight: string;
    };
    scaleText: {
        fontSize: any;
        color: string;
        whiteSpace: string;
        border: string;
        borderColor: string;
        borderTop: string;
        borderLeft: string;
        borderRight: string;
        textTransform: string;
        '&.interaction-static': {
            fontSize: any;
            fontWeight: string;
            borderBottom: string;
        };
    };
    scaleCheckmark: {
        paddingRight: number;
        color: string;
    };
};
