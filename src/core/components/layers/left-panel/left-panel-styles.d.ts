import { Theme } from '@mui/material/styles';
export declare const getSxClasses: (theme: Theme) => {
    list: {
        color: string;
        width: string;
        padding: string;
        paddingRight: string;
        overflowY: string;
        '& .MuiListItemText-primary': {
            fontWeight: string;
            padding: string;
            fontSize: string;
            lineHeight: number;
            overflow: string;
            textOverflow: string;
            whiteSpace: string;
        };
        '& .layer-panel': {
            '& .MuiListItemText-root': {
                marginLeft: string;
            };
            '& .rightIcons-container': {
                display: string;
                flexDirection: string;
                justifyContent: string;
                alignItems: string;
                '& .MuiIconButton-root': {
                    margin: string;
                };
            };
        };
        '& .MuiListItem-root': {
            height: string;
            '& .MuiListItemButton-root': {
                padding: string;
                height: string;
            };
            '& .MuiBox-root': {
                height: string;
                borderTopRightRadius: string;
                borderBottomRightRadius: string;
                position: string;
                display: string;
                justifyContent: string;
                alignItems: string;
            };
        };
        '& .MuiListItemIcon-root': {
            minWidth: string;
            marginRight: string;
        };
        '& .MuiListItemText-root': {
            '>span': {
                fontSize: any;
            };
            '> p': {
                fontSize: any;
                overflow: string;
                textOverflow: string;
                whiteSpace: string;
            };
        };
    };
    evenDepthList: {
        background: string;
        boxShadow: number;
        padding: string;
        margin: string;
        width: string;
        boxSizing: string;
        '& .layerItemContainer': {
            backgroundColor: string;
            marginBottom: string;
        };
    };
    oddDepthList: {
        background: string;
        boxShadow: number;
        padding: string;
        margin: string;
        width: string;
        boxSizing: string;
        '& .layerItemContainer': {
            backgroundColor: string;
            marginBottom: string;
        };
    };
};
