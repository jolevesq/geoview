import { Theme } from '@mui/material/styles';
export declare const getSxClasses: (theme: Theme) => {
    formControl: {
        fontSize: any;
        width: string;
        color: string;
        '& .MuiOutlinedInput-notchedOutline': {
            border: string;
            padding: string;
            '&[aria-hidden="true"]': {
                border: string;
            };
        };
        '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
                border: string;
            };
        };
        '& .MuiFormLabel-root.Mui-focused': {
            color: string;
            background: {
                [x: number]: string;
            };
        };
        '& .MuiSelect-select': {
            padding: string;
        };
        '& .MuiSvgIcon-root': {
            color: string;
        };
    };
    label: {
        color: string;
        fontSize: any;
    };
    menuItem: {
        fontSize: any;
    };
};
