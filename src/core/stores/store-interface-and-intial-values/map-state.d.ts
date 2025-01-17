import { Map as OLMap } from 'ol';
import { Coordinate } from 'ol/coordinate';
import Overlay from 'ol/Overlay';
import { Extent } from 'ol/extent';
import { FitOptions } from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import { TypeSetStore, TypeGetStore } from '@/core/stores/geoview-store';
import { TypeFeatureInfoEntry } from '@/geo/utils/layer-set';
import { TypeMapFeaturesConfig } from '@/core/types/global-types';
import { TypeInteraction, TypeHighlightColors, TypeValidMapProjectionCodes, TypeMapMouseInfo } from '@/geo/map/map-schema-types';
import { TypeClickMarker } from '@/core/components/click-marker/click-marker';
import { TypeBasemapOptions } from '@/geo/layer/basemap/basemap-types';
import { TypeHoverFeatureInfo } from '@/geo/utils/hover-feature-info-layer-set';
export interface IMapState {
    attribution: string[];
    basemapOptions: TypeBasemapOptions;
    centerCoordinates: Coordinate;
    clickCoordinates?: TypeMapMouseInfo;
    clickMarker: TypeClickMarker | undefined;
    currentProjection: TypeValidMapProjectionCodes;
    fixNorth: boolean;
    highlightColor?: TypeHighlightColors;
    highlightedFeatures: TypeFeatureInfoEntry[];
    hoverFeatureInfo: TypeHoverFeatureInfo | undefined | null;
    interaction: TypeInteraction;
    mapElement?: OLMap;
    mapExtent: Extent | undefined;
    mapLoaded: boolean;
    northArrow: boolean;
    northArrowElement: TypeNorthArrow;
    orderedLayerInfo: TypeOrderedLayerInfo[];
    overlayClickMarker?: Overlay;
    overlayNorthMarker?: Overlay;
    overviewMap: boolean;
    overviewMapHideZoom: number;
    pointerPosition?: TypeMapMouseInfo;
    rotation: number;
    scale: TypeScaleInfo;
    size: [number, number];
    visibleLayers: string[];
    zoom: number;
    setDefaultConfigValues: (config: TypeMapFeaturesConfig) => void;
    actions: {
        createBaseMapFromOptions: () => void;
        createEmptyBasemap: () => TileLayer<XYZ>;
        getPixelFromCoordinate: (coord: Coordinate) => [number, number];
        getIndexFromOrderedLayerInfo: (layerPath: string) => number;
        getVisibilityFromOrderedLayerInfo: (layerPath: string) => boolean;
        showClickMarker: (marker: TypeClickMarker) => void;
        hideClickMarker: () => void;
        highlightBBox: (extent: Extent, isLayerHighlight?: boolean) => void;
        addHighlightedFeature: (feature: TypeFeatureInfoEntry) => void;
        removeHighlightedFeature: (feature: TypeFeatureInfoEntry | 'all') => void;
        reorderLayer: (layerPath: string, move: number) => void;
        setOrToggleLayerVisibility: (layerPath: string, newValue?: boolean) => void;
        setMapKeyboardPanInteractions: (panDelta: number) => void;
        setZoom: (zoom: number, duration?: number) => void;
        setInteraction: (interaction: TypeInteraction) => void;
        setRotation: (rotation: number) => void;
        zoomToExtent: (extent: Extent, options?: FitOptions) => void;
        zoomToInitialExtent: () => void;
        zoomToGeoLocatorLocation: (coords: [number, number], bbox?: [number, number, number, number]) => void;
        zoomToMyLocation: (position: GeolocationPosition) => void;
        transformPoints: (coords: Coordinate[], outputProjection: number) => Coordinate[];
        setClickCoordinates: (pointerPosition: TypeMapMouseInfo) => void;
        setFixNorth: (ifFix: boolean) => void;
        setOverlayClickMarkerRef: (htmlRef: HTMLElement) => void;
        setOverlayNorthMarkerRef: (htmlRef: HTMLElement) => void;
    };
    setterActions: {
        setMapChangeSize: (size: [number, number], scale: TypeScaleInfo) => void;
        setMapElement: (mapElem: OLMap, zoom: number, scale: TypeScaleInfo) => void;
        setMapLoaded: (mapLoaded: boolean) => void;
        setAttribution: (attribution: string[]) => void;
        setInteraction: (interaction: TypeInteraction) => void;
        setZoom: (zoom: number) => void;
        setRotation: (rotation: number) => void;
        setOverlayClickMarker: (overlay: Overlay) => void;
        setOverlayNorthMarker: (overlay: Overlay) => void;
        setProjection: (projectionCode: TypeValidMapProjectionCodes) => void;
        setMapMoveEnd: (centerCoordinates: Coordinate, pointerPosition: TypeMapMouseInfo, degreeRotation: string, isNorthVisible: boolean, scale: TypeScaleInfo) => void;
        setPointerPosition: (pointerPosition: TypeMapMouseInfo) => void;
        setClickCoordinates: (clickCoordinates: TypeMapMouseInfo) => void;
        setFixNorth: (ifFix: boolean) => void;
        setHighlightedFeatures: (highlightedFeatures: TypeFeatureInfoEntry[]) => void;
        setHighlightColor: (color: TypeHighlightColors) => void;
        setVisibleLayers: (newOrder: string[]) => void;
        setOrderedLayerInfo: (newOrderedLayerInfo: TypeOrderedLayerInfo[]) => void;
        setHoverable: (layerPath: string, hoverable: boolean) => void;
        setQueryable: (layerPath: string, queryable: boolean) => void;
        setClickMarker: (coord: number[] | undefined) => void;
        setHoverFeatureInfo: (hoverFeatureInfo: TypeHoverFeatureInfo) => void;
    };
}
/**
 * Initializes a Map State and provide functions which use the get/set Zustand mechanisms.
 * @param {TypeSetStore} set - The setter callback to be used by this state
 * @param {TypeGetStore} get - The getter callback to be used by this state
 * @returns The initialized Map State
 */
export declare function initializeMapState(set: TypeSetStore, get: TypeGetStore): IMapState;
export interface TypeScaleInfo {
    lineWidth: string;
    labelGraphic: string;
    labelNumeric: string;
}
export interface TypeNorthArrow {
    degreeRotation: string;
    isNorthVisible: boolean;
}
export interface TypeOrderedLayerInfo {
    hoverable?: boolean;
    layerPath: string;
    queryable?: boolean;
    visible: boolean;
}
export declare const useMapAttribution: () => string[];
export declare const useMapBasemapOptions: () => TypeBasemapOptions;
export declare const useMapCenterCoordinates: () => Coordinate;
export declare const useMapClickMarker: () => TypeClickMarker | undefined;
export declare const useMapElement: () => OLMap | undefined;
export declare const useMapExtent: () => Extent | undefined;
export declare const useMapFixNorth: () => boolean;
export declare const useMapInteraction: () => TypeInteraction;
export declare const useMapHiglightColor: () => TypeHighlightColors | undefined;
export declare const useMapHoverFeatureInfo: () => TypeHoverFeatureInfo;
export declare const useMapLoaded: () => boolean;
export declare const useMapNorthArrow: () => boolean;
export declare const useMapNorthArrowElement: () => TypeNorthArrow;
export declare const useMapOrderedLayerInfo: () => TypeOrderedLayerInfo[];
export declare const useMapOverviewMap: () => boolean;
export declare const useMapOverviewMapHideZoom: () => number;
export declare const useMapPointerPosition: () => TypeMapMouseInfo | undefined;
export declare const useMapProjection: () => TypeValidMapProjectionCodes;
export declare const useMapRotation: () => number;
export declare const useMapScale: () => TypeScaleInfo;
export declare const useMapSize: () => [number, number];
export declare const useMapVisibleLayers: () => string[];
export declare const useMapZoom: () => number;
export declare const useMapStoreActions: () => {
    createBaseMapFromOptions: () => void;
    createEmptyBasemap: () => TileLayer<XYZ>;
    getPixelFromCoordinate: (coord: Coordinate) => [number, number];
    getIndexFromOrderedLayerInfo: (layerPath: string) => number;
    getVisibilityFromOrderedLayerInfo: (layerPath: string) => boolean;
    showClickMarker: (marker: TypeClickMarker) => void;
    hideClickMarker: () => void;
    highlightBBox: (extent: Extent, isLayerHighlight?: boolean) => void;
    addHighlightedFeature: (feature: TypeFeatureInfoEntry) => void;
    removeHighlightedFeature: (feature: TypeFeatureInfoEntry | 'all') => void;
    reorderLayer: (layerPath: string, move: number) => void;
    setOrToggleLayerVisibility: (layerPath: string, newValue?: boolean) => void;
    setMapKeyboardPanInteractions: (panDelta: number) => void;
    setZoom: (zoom: number, duration?: number) => void;
    setInteraction: (interaction: TypeInteraction) => void;
    setRotation: (rotation: number) => void;
    zoomToExtent: (extent: Extent, options?: FitOptions) => void;
    zoomToInitialExtent: () => void;
    zoomToGeoLocatorLocation: (coords: [number, number], bbox?: [number, number, number, number]) => void;
    zoomToMyLocation: (position: GeolocationPosition) => void;
    transformPoints: (coords: Coordinate[], outputProjection: number) => Coordinate[];
    setClickCoordinates: (pointerPosition: TypeMapMouseInfo) => void;
    setFixNorth: (ifFix: boolean) => void;
    setOverlayClickMarkerRef: (htmlRef: HTMLElement) => void;
    setOverlayNorthMarkerRef: (htmlRef: HTMLElement) => void;
};
