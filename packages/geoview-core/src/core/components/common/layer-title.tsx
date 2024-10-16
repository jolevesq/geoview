import { useTheme } from '@mui/material';
import { Typography } from '@/ui';

interface LayerTitleProp {
  children: React.ReactNode;
  hideTitle?: boolean;
  fullWidth?: boolean;
}

/**
 * Create Layer Title.
 * @param {string} children the name of the layer.
 * @param {boolean} hideTitle hide the layer title for desktop view.
 * @param {boolean} fullWidth show and hide title when width of container is maximum.
 * @returns JSX.Element
 */
export function LayerTitle({ children, hideTitle, fullWidth }: LayerTitleProp) {
  const theme = useTheme();

  return (
    <Typography
      sx={{
        fontSize: fullWidth ? theme.palette.geoViewFontSize.sm : theme.palette.geoViewFontSize.lg,
        fontWeight: '600',
        marginTop: '12px',
        ...(!fullWidth && { [theme.breakpoints.up('md')]: { display: hideTitle ? 'none' : 'block' } }),
      }}
      component="div"
    >
      {children}
    </Typography>
  );
}

LayerTitle.defaultProps = {
  hideTitle: false,
  fullWidth: false,
};
