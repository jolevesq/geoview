/// <reference types="react" />
import { Root } from 'react-dom/client';
import { i18n } from 'i18next';
import OLMap from 'ol/Map';
import View, { FitOptions } from 'ol/View';
import { Coordinate } from 'ol/coordinate';
import { Extent } from 'ol/extent';
import { Basemap } from '@/geo/layer/basemap/basemap';
import { LayerApi } from '@/geo/layer/layer';
import { TypeFeatureStyle } from '@/geo/layer/geometry/geometry-types';
import { TypeRecordOfPlugin } from '@/api/plugin/plugin-types';
import { AppBarApi } from '@/core/components/app-bar/app-bar-api';
import { NavBarApi } from '@/core/components/nav-bar/nav-bar-api';
import { FooterBarApi } from '@/core/components/footer-bar/footer-bar-api';
import { GeoviewRenderer } from '@/geo/renderer/geoview-renderer';
import { Select } from '@/geo/interaction/select';
import { Draw } from '@/geo/interaction/draw';
import { Extent as ExtentInteraction } from '@/geo/interaction/extent';
import { Modify } from '@/geo/interaction/modify';
import { Snap } from '@/geo/interaction/snap';
import { Translate } from '@/geo/interaction/translate';
import { EventDelegateBase } from '@/api/events/event-helper';
import { ModalApi } from '@/ui';
import { TypeDisplayLanguage, TypeViewSettings, TypeMapState, TypeDisplayTheme, TypeInteraction, TypeValidMapProjectionCodes, TypeMapMouseInfo } from '@/geo/map/map-schema-types';
import { TypeMapFeaturesConfig, TypeHTMLElement, TypeJsonObject } from '@/core/types/global-types';
import { TypeClickMarker } from '@/core/components/click-marker/click-marker';
import { Notifications } from '@/core/utils/notifications';
/**
 * Class used to manage created maps
 *
 * @exports
 * @class MapViewer
 */
export declare class MapViewer {
    #private;
    createMapConfigHasRun: boolean;
    mapFeaturesConfig: TypeMapFeaturesConfig;
    mapId: string;
    map: OLMap;
    plugins: TypeRecordOfPlugin;
    overviewRoot: Root | undefined;
    appBarApi: AppBarApi;
    navBarApi: NavBarApi;
    footerBarApi: FooterBarApi;
    basemap: Basemap;
    notifications: Notifications;
    layer: LayerApi;
    modal: ModalApi;
    geoviewRenderer: GeoviewRenderer;
    get mapInit(): boolean;
    get mapReady(): boolean;
    get mapLayersProcessed(): boolean;
    get mapLayersLoaded(): boolean;
    /**
     * Constructor for a MapViewer, setting:
     * - the mapId
     * - the mapFeaturesConfig
     * - i18n
     * - AppBar, NavBar, FooterBar
     * - modalApi
     * - geoviewRenderer
     * - basemap
     * @param {TypeMapFeaturesConfig} mapFeaturesConfig map properties
     * @param {i18n} i18instance language instance
     */
    constructor(mapFeaturesConfig: TypeMapFeaturesConfig, i18instance: i18n);
    /**
     * Initializes map, layer class and geometries
     * @param {OLMap} cgpMap - The OpenLayers map object
     */
    initMap(cgpMap: OLMap): void;
    /**
     * Registers a map init event callback.
     * @param {MapInitDelegate} callback - The callback to be executed whenever the event is emitted
     */
    onMapInit(callback: MapInitDelegate): void;
    /**
     * Unregisters a map init event callback.
     * @param {MapInitDelegate} callback - The callback to stop being called whenever the event is emitted
     */
    offMapInit(callback: MapInitDelegate): void;
    /**
     * Registers a map ready event callback.
     * @param {MapReadyDelegate} callback - The callback to be executed whenever the event is emitted
     */
    onMapReady(callback: MapReadyDelegate): void;
    /**
     * Unregisters a map ready event callback.
     * @param {MapReadyDelegate} callback - The callback to stop being called whenever the event is emitted
     */
    offMapReady(callback: MapReadyDelegate): void;
    /**
     * Registers a map layers processed event callback.
     * @param {MapLayersProcessedDelegate} callback - The callback to be executed whenever the event is emitted
     */
    onMapLayersProcessed(callback: MapLayersProcessedDelegate): void;
    /**
     * Unregisters a map layers processed event callback.
     * @param {MapLayersProcessedDelegate} callback - The callback to stop being called whenever the event is emitted
     */
    offMapLayersProcessed(callback: MapLayersProcessedDelegate): void;
    /**
     * Registers a map layers loaded event callback.
     * @param {MapLayersLoadedDelegate} callback - The callback to be executed whenever the event is emitted
     */
    onMapLayersLoaded(callback: MapLayersLoadedDelegate): void;
    /**
     * Unregisters a map layers loaded event callback.
     * @param {MapLayersLoadedDelegate} callback - The callback to stop being called whenever the event is emitted
     */
    offMapLayersLoaded(callback: MapLayersLoadedDelegate): void;
    /**
     * Registers a map move end event callback.
     * @param {MapMoveEndDelegate} callback - The callback to be executed whenever the event is emitted
     */
    onMapMoveEnd(callback: MapMoveEndDelegate): void;
    /**
     * Unregisters a map move end event callback.
     * @param {MapMoveEndDelegate} callback - The callback to stop being called whenever the event is emitted
     */
    offMapMoveEnd(callback: MapMoveEndDelegate): void;
    /**
     * Registers a map pointer move event callback.
     * @param {MapPointerMoveDelegate} callback - The callback to be executed whenever the event is emitted
     */
    onMapPointerMove(callback: MapPointerMoveDelegate): void;
    /**
     * Unregisters a map pointer move event callback.
     * @param {MapPointerMoveDelegate} callback - The callback to stop being called whenever the event is emitted
     */
    offMapPointerMove(callback: MapPointerMoveDelegate): void;
    /**
     * Registers a map single click event callback.
     * @param {MapSingleClickDelegate} callback - The callback to be executed whenever the event is emitted
     */
    onMapSingleClick(callback: MapSingleClickDelegate): void;
    /**
     * Unregisters a map single click end event callback.
     * @param {MapSingleClickDelegate} callback - The callback to stop being called whenever the event is emitted
     */
    offMapSingleClick(callback: MapSingleClickDelegate): void;
    /**
     * Registers a map zoom end event callback.
     * @param {MapZoomEndDelegate} callback - The callback to be executed whenever the event is emitted
     */
    onMapZoomEnd(callback: MapZoomEndDelegate): void;
    /**
     * Unregisters a map zoom end event callback.
     * @param {MapZoomEndDelegate} callback - The callback to stop being called whenever the event is emitted
     */
    offMapZoomEnd(callback: MapZoomEndDelegate): void;
    /**
     * Registers a map rotation event callback.
     * @param {MapRotationDelegate} callback - The callback to be executed whenever the event is emitted
     */
    onMapRotation(callback: MapRotationDelegate): void;
    /**
     * Unregisters a map rotation event callback.
     * @param {MapRotationDelegate} callback - The callback to stop being called whenever the event is emitted
     */
    offMapRotation(callback: MapRotationDelegate): void;
    /**
     * Registers a map change size event callback.
     * @param {MapChangeSizeDelegate} callback - The callback to be executed whenever the event is emitted
     */
    onMapChangeSize(callback: MapChangeSizeDelegate): void;
    /**
     * Unregisters a map change size event callback.
     * @param {MapChangeSizeDelegate} callback - The callback to stop being called whenever the event is emitted
     */
    offMapChangeSize(callback: MapChangeSizeDelegate): void;
    /**
     * Registers a component added event callback.
     * @param {MapComponentAddedDelegate} callback - The callback to be executed whenever the event is emitted
     */
    onMapComponentAdded(callback: MapComponentAddedDelegate): void;
    /**
     * Unregisters a component added event callback.
     * @param {MapComponentAddedDelegate} callback - The callback to stop being called whenever the event is emitted
     */
    offMapComponentAdded(callback: MapComponentAddedDelegate): void;
    /**
     * Registers a component removed event callback.
     * @param {MapComponentRemovedDelegate} callback - The callback to be executed whenever the event is emitted
     */
    onMapComponentRemoved(callback: MapComponentRemovedDelegate): void;
    /**
     * Unregisters a component removed event callback.
     * @param {MapComponentRemovedDelegate} callback - The callback to stop being called whenever the event is emitted
     */
    offMapComponentRemoved(callback: MapComponentRemovedDelegate): void;
    /**
     * Add a new custom component to the map
     *
     * @param {string} mapComponentId - An id to the new component
     * @param {JSX.Element} component - The component to add
     */
    addComponent(mapComponentId: string, component: JSX.Element): void;
    /**
     * Remove an existing custom component from the map
     *
     * @param mapComponentId - The id of the component to remove
     */
    removeComponent(mapComponentId: string): void;
    /**
     * Add a localization ressource bundle for a supported language (fr, en). Then the new key added can be
     * access from the utilies function getLocalizesMessage to reuse in ui from outside the core viewer.
     *
     * @param {TypeDisplayLanguage} language - The language to add the ressoruce for (en, fr)
     * @param {TypeJsonObject} translations - The translation object to add
     */
    addLocalizeRessourceBundle(language: TypeDisplayLanguage, translations: TypeJsonObject): void;
    /**
     * Return the current display language
     *
     * @returns {TypeDisplayLanguage} The display language
     */
    getDisplayLanguage(): TypeDisplayLanguage;
    /**
     * Return the current display theme
     *
     * @returns {TypeDisplayTheme} The display theme
     */
    getDisplayTheme(): TypeDisplayTheme;
    /**
     * Return the map current state information
     *
     * @returns {TypeMapState} The map state
     */
    getMapState(): TypeMapState;
    /**
     * Get the map viewSettings
     *
     * @returns the map viewSettings
     */
    getView(): View;
    /**
     * set fullscreen / exit fullscreen
     *
     * @param status - Toggle fullscreen or exit fullscreen status
     * @param {HTMLElement} element - The element to toggle fullscreen on
     */
    setFullscreen(status: boolean, element: TypeHTMLElement): void;
    /**
     * Set map to either dynamic or static
     *
     * @param {TypeInteraction} interaction - Map interaction
     */
    setInteraction(interaction: TypeInteraction): void;
    /**
     * Set the display language of the map
     *
     * @param {TypeDisplayLanguage} displayLanguage - The language to use (en, fr)
     * @param {boolean} resetLayer - Optional flag to ask viewer to reload layers with the new localize language
     */
    setLanguage(displayLanguage: TypeDisplayLanguage, resetLayer?: boolean | false): void;
    /**
     * Set the display projection of the map
     *
     * @param {TypeValidMapProjectionCodes} projectionCode - The projection code (3978, 3857)
     */
    setProjection(projectionCode: TypeValidMapProjectionCodes): void;
    /**
     * Rotates the view to align it at the given degrees
     *
     * @param {number} degree - The degrees to rotate the map to
     */
    rotate(degree: number): void;
    /**
     * Set the display theme of the map
     *
     * @param {TypeDisplayTheme} displayTheme - The theme to use (geo.ca, light, dark)
     */
    setTheme(displayTheme: TypeDisplayTheme): void;
    /**
     * Set the map viewSettings
     *
     * @param {TypeViewSettings} mapView - Map viewSettings object
     */
    setView(mapView: TypeViewSettings): void;
    /**
     * Loop through all geoview layers and refresh their respective source.
     * Use this function on projection change or other viewer modification who may affect rendering.
     *
     * @returns A Promise which resolves when the rendering is completed after the source(s) were changed.
     */
    refreshLayers(): Promise<void>;
    /**
     * Hide a click marker from the map
     */
    clickMarkerIconHide(): void;
    /**
     * Show a marker on the map
     * @param {TypeClickMarker} marker - The marker to add
     */
    clickMarkerIconShow(marker: TypeClickMarker): void;
    /**
     * Check if geometries needs to be loaded from a URL geoms parameter
     */
    loadGeometries(): void;
    /**
     * Remove map
     *
     * @param {boolean} deleteContainer true if we want to delete div from the page
     * @returns {HTMLElement} return the HTML element
     */
    remove(deleteContainer: boolean): HTMLElement;
    /**
     * Reload a map from a config object stored in store
     */
    reload(): void;
    /**
     * Zoom to the specified extent.
     *
     * @param {Extent} extent - The extent to zoom to.
     * @param {FitOptions} options - The options to configure the zoomToExtent (default: { padding: [100, 100, 100, 100], maxZoom: 11 }).
     */
    zoomToExtent(extent: Extent, options?: FitOptions): Promise<void>;
    /**
     * Fit the map to its boundaries. It is assumed that the boundaries use the map projection. If projectionCode is undefined,
     * the boundaries are used as is, otherwise they are reprojected from the specified projection code to the map projection.
     *
     * @param {Extent} bounds - Bounding box to zoom to
     * @param {string | number | undefined} projectionCode - Optional projection code used by the bounds.
     */
    fitBounds(bounds?: Extent, projectionCode?: string | number | undefined): void;
    /**
     * Initializes selection interactions
     */
    initSelectInteractions(): Select;
    /**
     * Initializes extent interactions
     */
    initExtentInteractions(): ExtentInteraction;
    /**
     * Initializes translation interactions
     */
    initTranslateInteractions(): Translate;
    /**
     * Initializes drawing interactions on the given vector source
     * @param {string} geomGroupKey - The geometry group key in which to hold the geometries
     * @param {string} type - The type of geometry to draw (Polygon, LineString, Circle, etc)
     * @param {TypeFeatureStyle} styles - The styles for the drawing
     */
    initDrawInteractions(geomGroupKey: string, type: string, style: TypeFeatureStyle): Draw;
    /**
     * Initializes modifying interactions on the given vector source
     * @param {string} geomGroupKey - The geometry group key in which to hold the geometries
     */
    initModifyInteractions(geomGroupKey: string): Modify;
    /**
     * Initializes snapping interactions on the given vector source
     * @param {string} geomGroupKey - The geometry group key in which to hold the geometries
     */
    initSnapInteractions(geomGroupKey: string): Snap;
    /**
     * Check if north is visible. This is not a perfect solution and is more a work around
     *
     * @returns {boolean} true if visible, false otherwise
     */
    checkNorth(): boolean;
    /**
     * Get north arrow bearing. Angle use to rotate north arrow for non Web Mercator projection
     * https://www.movable-type.co.uk/scripts/latlong.html
     *
     * @returns {string} the arrow angle
     */
    getNorthArrowAngle(): string;
}
/**
 * Define a delegate for the event handler function signature
 */
type MapInitDelegate = EventDelegateBase<MapViewer, undefined>;
/**
 * Define a delegate for the event handler function signature
 */
type MapReadyDelegate = EventDelegateBase<MapViewer, undefined>;
/**
 * Define a delegate for the event handler function signature
 */
type MapLayersProcessedDelegate = EventDelegateBase<MapViewer, undefined>;
/**
 * Define a delegate for the event handler function signature
 */
type MapLayersLoadedDelegate = EventDelegateBase<MapViewer, undefined>;
/**
 * Define an event for the delegate
 */
export type MapMoveEndEvent = {
    lnglat: Coordinate;
};
/**
 * Define a delegate for the event handler function signature
 */
type MapMoveEndDelegate = EventDelegateBase<MapViewer, MapMoveEndEvent>;
/**
 * Define an event for the delegate
 */
export type MapPointerMoveEvent = TypeMapMouseInfo;
/**
 * Define a delegate for the event handler function signature
 */
type MapPointerMoveDelegate = EventDelegateBase<MapViewer, MapPointerMoveEvent>;
/**
 * Define an event for the delegate
 */
export type MapSingleClickEvent = TypeMapMouseInfo;
/**
 * Define a delegate for the event handler function signature
 */
type MapSingleClickDelegate = EventDelegateBase<MapViewer, MapSingleClickEvent>;
/**
 * Define an event for the delegate
 */
export type MapZoomEndEvent = {
    zoom: number;
};
/**
 * Define a delegate for the event handler function signature
 */
type MapZoomEndDelegate = EventDelegateBase<MapViewer, MapZoomEndEvent>;
/**
 * Define an event for the delegate
 */
export type MapRotationEvent = {
    rotation: number;
};
/**
 * Define a delegate for the event handler function signature
 */
type MapRotationDelegate = EventDelegateBase<MapViewer, MapRotationEvent>;
/**
 * Define an event for the delegate
 */
export type MapChangeSizeEvent = {
    size: [number, number];
};
/**
 * Define a delegate for the event handler function signature
 */
type MapChangeSizeDelegate = EventDelegateBase<MapViewer, MapChangeSizeEvent>;
/**
 * Define an event for the delegate
 */
export type MapComponentAddedEvent = {
    mapComponentId: string;
    component: JSX.Element;
};
/**
 * Define a delegate for the event handler function signature
 */
type MapComponentAddedDelegate = EventDelegateBase<MapViewer, MapComponentAddedEvent>;
/**
 * Define an event for the delegate
 */
export type MapComponentRemovedEvent = {
    mapComponentId: string;
};
/**
 * Define a delegate for the event handler function signature
 */
type MapComponentRemovedDelegate = EventDelegateBase<MapViewer, MapComponentRemovedEvent>;
export {};
