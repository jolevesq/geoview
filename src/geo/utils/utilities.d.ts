import { ReadOptions } from 'ol/format/Feature';
import Geometry from 'ol/geom/Geometry';
import { Style } from 'ol/style';
import { Color } from 'ol/color';
import { Extent } from 'ol/extent';
import { TypeJsonObject } from '@/core/types/global-types';
import { TypeFeatureStyle } from '@/geo/layer/geometry/geometry-types';
import { AbstractGeoViewLayer } from '@/geo/layer/geoview-layers/abstract-geoview-layers';
export declare const layerTypes: Record<"CSV" | "ESRI_DYNAMIC" | "ESRI_FEATURE" | "ESRI_IMAGE" | "IMAGE_STATIC" | "GEOJSON" | "GEOPACKAGE" | "XYZ_TILES" | "VECTOR_TILES" | "OGC_FEATURE" | "WFS" | "WMS", import("@/geo/layer/geoview-layers/abstract-geoview-layers").TypeGeoviewLayerType>;
/**
 * Fetch the json response from the ESRI map server to get REST endpoint metadata
 * @function getESRIServiceMetadata
 * @param {string} url the url of the ESRI map server
 * @returns {Promise<TypeJsonObject>} a json promise containing the result of the query
 */
export declare function getESRIServiceMetadata(url: string): Promise<TypeJsonObject>;
/**
 * Fetch the json response from the XML response of a WMS getCapabilities request
 * @function getWMSServiceMetadata
 * @param {string} url the url the url of the WMS server
 * @param {string} layers the layers to query separate by ,
 * @returns {Promise<TypeJsonObject>} a json promise containing the result of the query
 */
export declare function getWMSServiceMetadata(url: string, layers: string): Promise<TypeJsonObject>;
/**
 * Fetch the json response from the XML response of a WFS getCapabilities request
 * @function getWFSServiceMetadata
 * @param {string} url the url of the WFS server
 * @returns {Promise<TypeJsonObject>} a json promise containing the result of the query
 */
export declare function getWFSServiceMetadata(url: string): Promise<TypeJsonObject>;
/**
 * Return the map server url from a layer service
 *
 * @param {string} url the service url for a wms / dynamic or feature layers
 * @param {boolean} rest boolean value to add rest services if not present (default false)
 * @returns the map server url
 */
export declare function getMapServerUrl(url: string, rest?: boolean): string;
/**
 * Return the root server url from a OGC layer service
 *
 * @param {string} url the service url for an ogc layer
 * @returns the root ogc server url
 */
export declare function getOGCServerUrl(url: string): string;
/**
 * Returns the WKT representation of a given geometry
 * @function geometryToWKT
 * @param {string} geometry the geometry
 * @returns {string | null} the WKT representation of the geometry
 */
export declare function geometryToWKT(geometry: Geometry): string | null;
/**
 * Returns the Geometry representation of a given wkt
 * @function wktToGeometry
 * @param {string} wkt the well known text
 * @param {ReadOptions} readOptions read options to convert the wkt to a geometry
 * @returns {Geometry | null} the Geometry representation of the wkt
 */
export declare function wktToGeometry(wkt: string, readOptions: ReadOptions): Geometry | null;
/**
 * Returns the Geometry representation of a given geojson
 * @function geojsonToGeometry
 * @param {string} geojson the geojson
 * @param {ReadOptions} readOptions read options to convert the geojson to a geometry
 * @returns {Geometry | null} the Geometry representation of the geojson
 */
export declare function geojsonToGeometry(geojson: string, readOptions: ReadOptions): Geometry | null;
/**
 * Gets the area of a given geometry
 * @param {Geometry} geometry the geometry to calculate the area
 * @returns the area of the given geometry
 */
export declare function getArea(geometry: Geometry): number;
/**
 * Default drawing style for GeoView
 * @returns an Open Layers styling for drawing on a map
 */
export declare function getDefaultDrawingStyle(strokeColor?: Color | string, strokeWidth?: number, fillColor?: Color | string): Style;
/**
 * Gets computed translate values
 * https://zellwk.com/blog/css-translate-values-in-javascript/
 * @param {HTMLElement} element the HTML element to get value for
 * @returns {Object} the x, y and z translation values
 */
export declare function getTranslateValues(element: HTMLElement): {
    x: number;
    y: number;
    z: number;
};
/**
 * Format the coordinates for degrees - minutes - seconds (lat, long)
 * @param {number} value the value to format
 * @returns {string} the formatted value
 */
export declare function coordFormnatDMS(value: number): string;
/**
 * Converts a TypeFeatureStyle to an Open Layers Style object.
 * @returns an Open Layers styling for drawing on a map or undefined
 */
export declare function convertTypeFeatureStyleToOpenLayersStyle(style?: TypeFeatureStyle): Style;
/**
 * Compare sets of extents of the same projection and return the smallest or largest set.
 * Extents must be in OpenLayers extent format - [minx, miny, maxx, maxy]
 *
 * @param {Extent} extentsA First set of extents
 * @param {Extent} extentsB Second set of extents
 * @param {string} minmax Decides whether to get smallest or largest extent
 * @returns {Extent} the smallest or largest set from the extents
 */
export declare function getMinOrMaxExtents(extentsA: Extent, extentsB: Extent, minmax?: string): Extent;
/**
 * Determine if layer instance is a vector layer
 *
 * @param {AbstractGeoViewLayer} layer the layer to check
 * @returns {boolean} true if layer is a vector layer
 */
export declare const isVectorLayer: (layer: AbstractGeoViewLayer) => boolean;
