// map-info.tsx
import { Theme } from '@mui/material/styles';

export const getSxClasses = (theme: Theme) => ({
  mapInfoContainer: {
    flexGrow: 1,
    zIndex: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 'calc(100%)',
    minHeight: '35px',
    maxHeight: '35px',
    backdropFilter: 'blur(5px)',
    backgroundColor: theme.palette.geoViewColor.bgColor.dark[800],
    color: `${theme.palette.geoViewColor.bgColor.light[800]} !important`,
    pointerEvents: 'all',
    gap: 0.5,
    order: 3,

    '&.interaction-static': {
      backdropFilter: 'unset',
      backgroundColor: 'unset',
      color: `${theme.palette.geoViewColor.grey.dark[900]} !important`,
      fill: `${theme.palette.geoViewColor.grey.dark[900]} !important`,
      position: 'absolute',
      width: 'calc(100% - 60px)',
      bottom: 0,
      left: '60px',

      '& button svg': {
        fill: `${theme.palette.geoViewColor.grey.dark[900]} !important`,
      },
      '& button span': {
        color: `${theme.palette.geoViewColor.grey.dark[900]} !important`,
      },
    },
  },
  mouseScaleControlsContainer: {
    display: 'flex',
    flexDirection: 'row',
    '& button': {
      cursor: 'pointer',
      margin: 'auto 0 auto auto',
    },
    justifyContent: 'end',
  },
  rotationControlsContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '20px',
    alignItems: 'flex-end',
  },

  // map-info-expand-button.tsx
  expandButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.geoViewColor.bgColor.light[800],
    height: '30px',
    width: '30px',
    marginLeft: '5px',
  },

  // map-info-rotation-button.tsx
  rotationButton: {
    rotationButton: {
      height: 25,
      width: 25,
      marginRight: 5,
    },
    rotationIcon: {
      width: '1.5em',
      height: '1.5em',
      fontSize: theme.palette.geoViewFontSize.default,
      color: theme.palette.geoViewColor.bgColor.light[800],
    },
  },
});
