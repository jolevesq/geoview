import { Extent } from 'ol/extent';
import { TypeHighlightColors } from '@/geo/map/map-schema-types';
import { TypeFeatureInfoEntry } from './layer-set';
/** *****************************************************************************************************************************
 * A class to handle highlighting of features
 *
 * @exports
 * @class FeatureHighlight
 */
export declare class FeatureHighlight {
    /** The map identifier the layer set belongs to */
    private mapId;
    /** The vector source to use for the animation features */
    private highlighSource;
    /** The hidden layer to display animations */
    private overlayLayer;
    /** The fill for the highlight */
    private highlightColor;
    /** The fill for the highlight */
    private highlightFill;
    /** The style for the highlight */
    private highlightStyle;
    /** The style for the bbox highlight */
    private darkOutlineStyle;
    /** The ID's of currently highlighted features */
    private highlightedFeatureIds;
    /** Timeout of the bounding box highlight */
    private bboxTimeout;
    constructor(mapId: string);
    /**
     * Changes the highlight color
     * @param {TypeHighlightColor} color the new color
     */
    changeHighlightColor(color: TypeHighlightColors): void;
    /**
     * Styles and registers feature for highlighting
     * @param {Feature} feature the feature to add
     * @param {string} id the id of the feature
     * @private
     */
    private styleHighlightedFeature;
    /**
     * Removes feature highlight(s)
     * @param {string} id the Uid of the feature to deselect, or 'all' to clear all
     */
    removeHighlight(id: string): void;
    /**
     * Highlights a feature with a plain overlay
     * @param {TypeFeatureInfoEntry} feature the feature to highlight
     */
    highlightFeature(feature: TypeFeatureInfoEntry): void;
    /**
     * Highlights a bounding box
     * @param {Extent} extent the extent to highlight
     * @param {boolean} isLayerHighlight optional if it is a layer highlight
     */
    highlightGeolocatorBBox(extent: Extent, isLayerHighlight?: boolean): void;
    /**
     * Removes bounding box highlight
     */
    removeBBoxHighlight(): void;
}
