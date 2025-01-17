import { Theme } from '@mui/material';
export declare const getSxClasses: (theme: Theme) => {
    dataPanel: {
        background: string;
        paddingBottom: string;
    };
    gridContainer: {
        paddingLeft: string;
        paddingRight: string;
    };
    selectedRows: {
        transition: string;
        fontWeight: number;
        fontSize: any;
        linHeight: number;
        letterSpacing: string;
        display: string;
        padding: string;
    };
    selectedRowsDirection: {
        display: string;
        flexDirection: string;
    };
    tableCell: {
        whiteSpace: string;
        textOverflow: string;
        overflow: string;
    };
    dataTableWrapper: {
        '& .MuiPaper-root': {
            border: string;
            borderRadius: string;
        };
        '& .MuiTableContainer-root': {
            borderRadius: string;
        };
        '& .MuiToolbar-root ': {
            borderRadius: string;
        };
    };
    filterMap: {
        '& .Mui-checked': {
            '& .MuiTouchRipple-root': {
                color: string;
            };
        };
        '& .MuiTouchRipple-root': {
            color: string;
        };
    };
    tableHeadCell: {
        '& .MuiCollapse-wrapperInner': {
            '& .MuiBox-root': {
                gridTemplateColumns: string;
            };
        };
        '& .MuiInput-root': {
            fontSize: any;
            '& .MuiSvgIcon-root': {
                width: string;
                height: string;
            };
        };
        '& .MuiBadge-root': {
            marginLeft: string;
            '>span': {
                width: string;
            };
            svg: {
                marginTop: string;
                marginBottom: string;
            };
            '& .keyboard-focused': {
                backgroundColor: string;
                borderRadius: string;
                border: string;
                '> svg': {
                    opacity: number;
                };
            };
        };
    };
    dataTableInstructionsTitle: {
        fontSize: any;
        fontWeight: string;
        lineHeight: string;
    };
    dataTableInstructionsBody: {
        fontSize: any;
    };
};
