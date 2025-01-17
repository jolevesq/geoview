import { Theme } from '@mui/material/styles';
export declare const getSxClasses: (theme: Theme) => {
    guideContainer: {
        background: string;
        paddingBottom: string;
    };
    rightPanelContainer: {
        overflowY: string;
        border: string;
        borderRadius: string;
        backgroundColor: string;
        color: string;
    };
    guideBox: {
        ml: string;
        mb: string;
        td: {
            width: string;
            paddingLeft: string;
        };
        th: {
            textAlign: string;
            paddingLeft: string;
        };
    };
    footerGuideListItemText: {
        '&:hover': {
            cursor: string;
        };
        '& .MuiListItemText-primary': {
            padding: string;
            fontSize: string;
            lineHeight: number;
            fontWeight: string;
            textTransform: string;
        };
    };
    footerGuideListItemCollapse: {
        '& .MuiListItemText-primary': {
            padding: string;
            fontSize: string;
            lineHeight: number;
            whiteSpace: string;
        };
    };
    errorMessage: {
        marginLeft: string;
        marginTop: string;
        marginBottom: string;
    };
};
