import { Badge as MaterialBadge, BadgeProps } from '@mui/material';

/**
 * Create a badge component
 *
 * @param {BadgeProps} props badge properties
 * @returns {JSX.Element} returns badge component
 */
export function Badge(props: BadgeProps): JSX.Element {
  return <MaterialBadge {...props} />;
}
