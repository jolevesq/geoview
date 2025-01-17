/// <reference types="react" />
import { GeoListItem } from './geolocator';
type GeoListProps = {
    geoListItems: GeoListItem[];
    searchValue: string;
};
/**
 * Create list of items to display under search.
 * @param {GeoListItem[]} geoListItems - items to display
 * @param {string} searchValue - search text
 * @returns {JSX} - React JSX element
 */
export default function GeoList({ geoListItems, searchValue }: GeoListProps): import("react").JSX.Element;
export {};
