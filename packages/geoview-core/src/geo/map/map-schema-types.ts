import { Extent } from 'ol/extent';
import BaseLayer from 'ol/layer/Base';
import { TypeBasemapOptions } from '../layer/basemap/basemap-types';
import { TypeGeoviewLayerType } from '../layer/geoview-layers/abstract-geoview-layers';

/** ******************************************************************************************************************************
 *  Definition of a bilingual string.
 */
export type TypeLocalizedString = TypeLocalizedStringEnAndFr | TypeLocalizedStringFr | TypeLocalizedStringEn;

/** ******************************************************************************************************************************
 *  Definition of a bilingual string, only English provided.
 */
export type TypeLocalizedStringEn = Pick<TypeLocalizedStringEnAndFr, 'en'> & Partial<Pick<TypeLocalizedStringEnAndFr, 'fr'>>;

/** ******************************************************************************************************************************
 *  Definition of a bilingual string, only French provided.
 */
export type TypeLocalizedStringFr = Pick<TypeLocalizedStringEnAndFr, 'fr'> & Partial<Pick<TypeLocalizedStringEnAndFr, 'en'>>;

/** ******************************************************************************************************************************
 *  Definition of a bilingual string, both English and French provided.
 */
export type TypeLocalizedStringEnAndFr = Required<Record<TypeDisplayLanguage, string>>;

/** ******************************************************************************************************************************
 * Basic type used to identify the layer to display on the map.
 */
export type TypeLayerBasicInfoConfig = {
  /** The id of the layer to display on the map. */
  layerId: string;
  /** The display name of the layer (English/French). */
  layerName?: TypeLocalizedString;
};

/** ******************************************************************************************************************************
 * Initial settings to apply to the GeoView layer at creation time.
 */
export type TypeLayerInitialSettings = {
  /** Initial opacity setting. Domain = [0..1] and default = 1. */
  opacity?: number;
  /** Initial visibility setting. Default = true. */
  visible?: boolean;
  /** The extent that constrains the view. Called with [minX, minY, maxX, maxY] extent coordinates. */
  extent?: Extent;
  /** The minimum view zoom level (exclusive) above which this layer will be visible. */
  minZoom?: number;
  /** The maximum view zoom level (inclusive) below which this layer will be visible. */
  maxZoom?: number;
  /** A CSS class name to set to the layer element. */
  className?: string;
};

/** ******************************************************************************************************************************
 * Type that defines the vector layer source formats.
 */
export type TypeVectorSourceFormats = 'GeoJSON' | 'EsriJSON' | 'KML' | 'WFS' | 'featureAPI';

/** ******************************************************************************************************************************
 * Type used to configure the cluster feature of a vector layer. Works out of the box with point geometries. If another geometry is
 * provided, it will be converted to points geometry.
 */
export type TypeSourceVectorClusterConfig = {
  /** Flag used to enable clustering. Default = false. */
  enable: boolean;
  /** Distance in pixels within which features will be clustered together (deafult 20px). */
  distance: number;
  /** Minimum distance in pixels between clusters. Will be capped at the configured distance. By default no minimum distance is
   * guaranteed. This config can be used to avoid overlapping icons. As a tradoff, the cluster feature's position will no longer
   * be the center of all its features.
   */
  minDistance: number;
};

/** ******************************************************************************************************************************
 * Type used to configure a custom parser.
 */
export type TypeDetailsLayerConfig = {
  /**
   * A path to a javascript file with a function for parsing the layers identify output. Only needed if a custom template is
   * being used.
   */
  parser?: string;
  /** A path to an html template (English/French) that will override default identify output. */
  template: TypeLocalizedString;
};

/** ******************************************************************************************************************************
 * Type used to configure the feature info for a layer.
 */
export type TypeFeatureInfoLayerConfig = {
  /** Allow querying. Default = false. */
  queryable: boolean;
  customParser?: TypeDetailsLayerConfig;
  /**
   * The display field (English/French) of the layer. If it is not present the viewer will make an attempt to find the first valid
   * field.
   */
  nameField?: TypeLocalizedString;
  /** A comma separated list of attribute names (English/French) that should be requested on query (all by default). */
  outfields?: TypeLocalizedString;
  /** A comma separated list of attribute names (English/French) that should be use for alias. If empty, no alias will be set */
  aliasFields?: TypeLocalizedString;
};

/** ******************************************************************************************************************************
 * Initial settings to apply to the GeoView vector layer source at creation time.
 */
export type TypeBaseSourceVectorInitialConfig = {
  /** Path used to access the data. */
  dataAccessPath?: TypeLocalizedString;
  /** The feature format used by the XHR feature loader when url is set. */
  format?: TypeVectorSourceFormats | 'MVT';
  /** The projection code of the source. Default value is EPSG:4326. */
  dataProjection?: string;
  /** Definition of the feature information structure that will be used by the getFeatureInfo method. */
  featureInfo?: TypeFeatureInfoLayerConfig;
};

/** ******************************************************************************************************************************
 * Initial settings to apply to the GeoView vector layer source at creation time.
 */
export interface TypeVectorSourceInitialConfig extends TypeBaseSourceVectorInitialConfig {
  /** The feature format used by the XHR feature loader when url is set. */
  format?: TypeVectorSourceFormats;
  /** Vector source clustering configuration. */
  cluster?: TypeSourceVectorClusterConfig;
}

/** ******************************************************************************************************************************
 * Kind of symbol vector settings.
 */
export type TypeKinfOfSymbolVectorSettings =
  | TypeBaseVectorConfig
  | TypeLineStringVectorConfig
  | TypePolygonVectorConfig
  | TypeSimpleSymbolVectorConfig
  | TypeIconSymbolVectorConfig;

/** ******************************************************************************************************************************
 * Definition of the line symbol vector settings type.
 */
export type TypeBaseVectorConfig = {
  /** Type of vector config */
  type: 'lineString' | 'filledPolygon' | 'simpleSymbol' | 'iconSymbol';
};

/** ******************************************************************************************************************************
 * Type Gard function that redefines a TypeBaseVectorConfig as a TypeLineStringVectorConfig if the type attribute of the
 * verifyIfConfig parameter is 'lineString'. The type ascention applies only to the true block of the if clause that use
 * this function.
 *
 * @param {TypeBaseVectorConfig} verifyIfConfig Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const isLineStringVectorConfig = (verifyIfConfig: TypeBaseVectorConfig): verifyIfConfig is TypeLineStringVectorConfig => {
  return verifyIfConfig.type === 'lineString';
};

/** ******************************************************************************************************************************
 * Type Gard function that redefines a TypeBaseVectorConfig as a TypePolygonVectorConfig if the type attribute of the
 * verifyIfConfig parameter is 'filledPolygon'. The type ascention applies only to the true block of the if clause that use
 * this function.
 *
 * @param {TypeBaseVectorConfig} verifyIfConfig Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const isFilledPolygonVectorConfig = (verifyIfConfig: TypeBaseVectorConfig): verifyIfConfig is TypePolygonVectorConfig => {
  return verifyIfConfig.type === 'filledPolygon';
};

/** ******************************************************************************************************************************
 * Type Gard function that redefines a TypeBaseVectorConfig as a TypeSimpleSymbolVectorConfig if the type attribute of the
 * verifyIfConfig parameter is 'simpleSymbol'. The type ascention applies only to the true block of the if clause that use
 * this function.
 *
 * @param {TypeBaseVectorConfig} verifyIfConfig Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const isSimpleSymbolVectorConfig = (verifyIfConfig: TypeBaseVectorConfig): verifyIfConfig is TypeSimpleSymbolVectorConfig => {
  return verifyIfConfig.type === 'simpleSymbol';
};

/** ******************************************************************************************************************************
 * Type Gard function that redefines a TypeBaseVectorConfig as a TypeIconSymbolVectorConfig if the type attribute of the
 * verifyIfConfig parameter is 'iconSymbol'. The type ascention applies only to the true block of the if clause that use
 * this function.
 *
 * @param {TypeBaseVectorConfig} verifyIfConfig Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const isIconSymbolVectorConfig = (verifyIfConfig: TypeBaseVectorConfig): verifyIfConfig is TypeIconSymbolVectorConfig => {
  return verifyIfConfig.type === 'iconSymbol';
};

/** ******************************************************************************************************************************
 * Valid values to specify line styles.
 */
export type TypeLineStyle =
  | 'dash'
  | 'dash-dot'
  | 'dash-dot-dot'
  | 'dot'
  | 'longDash'
  | 'longDash-dot'
  | 'null'
  | 'shortDash'
  | 'shortDash-dot'
  | 'shortDash-dot-dot'
  | 'solid';

/** ******************************************************************************************************************************
 * Stroke style for vector features.
 */
export type TypeStrokeSymbolConfig = {
  /** Color to use for vector features. */
  color?: string;
  /** Line style to use for the feature. */
  lineStyle?: TypeLineStyle;
  /** Width to use for the stroke */
  width?: number;
};

/** ******************************************************************************************************************************
 * Definition of the line symbol vector settings type.
 */
export interface TypeLineStringVectorConfig extends TypeBaseVectorConfig {
  /** Type of vector config */
  type: 'lineString';
  /** Line stroke symbology */
  stroke: TypeStrokeSymbolConfig;
}

/** ******************************************************************************************************************************
 * Valid values to specify fill styles.
 */
export type TypeFillStyle =
  | 'null'
  | 'solid'
  | 'backwardDiagonal'
  | 'cross'
  | 'diagonalCross'
  | 'forwardDiagonal'
  | 'horizontal'
  | 'vertical';

/** ******************************************************************************************************************************
 * Definition of the line symbol vector settings type.
 */
export interface TypePolygonVectorConfig extends TypeBaseVectorConfig {
  /** Type of vector config */
  type: 'filledPolygon';
  /** Fill color for vector features. */
  color?: string;
  /** Line stroke symbology */
  stroke: TypeStrokeSymbolConfig;
  /** Distance between patern lines. Default = 8. */
  paternSize?: number;
  /** Patern line width.default = 1. */
  paternWidth?: number;
  /** Kind of filling  for vector features. Default = solid.  */
  fillStyle: TypeFillStyle;
}

/** ******************************************************************************************************************************
 * Valid values to specify symbol shapes.
 */
export type TypeSymbol = 'circle' | '+' | 'diamond' | 'square' | 'triangle' | 'X' | 'star';

/** ******************************************************************************************************************************
 * Definition of the circle symbol vector settings type.
 */
export interface TypeSimpleSymbolVectorConfig extends TypeBaseVectorConfig {
  /** Type of vector config */
  type: 'simpleSymbol';
  /** Symbol rotation in radians. */
  rotation?: number;
  /** Fill color for vector features. */
  color?: string;
  /** Symbol stroke symbology */
  stroke?: TypeStrokeSymbolConfig;
  /** size of the symbol. */
  size?: number;
  /** Ofset of the symbol. */
  offset?: [number, number];
  /** Symbol to draw. */
  symbol: TypeSymbol;
}

/** ******************************************************************************************************************************
 * Definition of the icon symbol vector settings type.
 */
export interface TypeIconSymbolVectorConfig extends TypeBaseVectorConfig {
  /** Type of vector config */
  type: 'iconSymbol';
  /** Mime type of the icon. */
  mimeType: string;
  /** Icon source. */
  src: string;
  /** Icon width in pixel. */
  width?: number;
  /** Icon height in pixel. */
  height?: number;
  /** Icon rotation in radians. */
  rotation?: number;
  /** Icon opacity. */
  opacity?: number;
  /** Ofset of the icon. */
  offset?: [number, number];
  /**
   * The crossOrigin attribute for loaded images. Note that you must provide a crossOrigin value if you want to access pixel data
   * with the Canvas renderer.
   */
  crossOrigin?: string;
}

/** ******************************************************************************************************************************
 * Base style configuration.
 */
export type TypeBaseStyleType = 'simple' | 'uniqueValue' | 'classBreaks';

/** ******************************************************************************************************************************
 * Base style configuration.
 */
export type TypeBaseStyleConfig = {
  /** Type of style. */
  styleType: TypeBaseStyleType;
};

/** ******************************************************************************************************************************
 * Type Gard function that redefines a TypeBaseStyleConfig as a TypeSimpleStyleConfig if the type attribute of the
 * verifyIfConfig parameter is 'simple'. The type ascention applies only to the true block of the if clause that use
 * this function.
 *
 * @param {TypeBaseStyleConfig} verifyIfConfig Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const isSimpleStyleConfig = (verifyIfConfig: TypeBaseStyleConfig): verifyIfConfig is TypeSimpleStyleConfig => {
  return verifyIfConfig.styleType === 'simple';
};

/** ******************************************************************************************************************************
 * Simple style configuration.
 */
export interface TypeSimpleStyleConfig extends TypeBaseStyleConfig {
  /** Style identifier. */
  id?: string;
  /** Type of style. */
  styleType: 'simple';
  /** Label associated to the style */
  label: string;
  /** options associated to the style. */
  settings: TypeKinfOfSymbolVectorSettings;
}

/** ******************************************************************************************************************************
 * Unique value style information configuration.
 */
export type TypeUniqueValueStyleInfo = {
  /** Label used by the style. */
  label: string;
  /** Values associated to the style. */
  values: string[];
  /** options associated to the style. */
  settings: TypeKinfOfSymbolVectorSettings;
};

/** ******************************************************************************************************************************
 * Type Gard function that redefines a TypeBaseStyleConfig as a TypeUniqueValueStyleConfig if the type attribute of the
 * verifyIfConfig parameter is 'uniqueValue'. The type ascention applies only to the true block of the if clause that use
 * this function.
 *
 * @param {TypeBaseStyleConfig} verifyIfConfig Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const isUniqueValueStyleConfig = (verifyIfConfig: TypeBaseStyleConfig): verifyIfConfig is TypeUniqueValueStyleConfig => {
  return verifyIfConfig.styleType === 'uniqueValue';
};

/** ******************************************************************************************************************************
 * Unique value style configuration.
 */
export interface TypeUniqueValueStyleConfig extends TypeBaseStyleConfig {
  /** Style identifier. */
  id?: string;
  /** Type of style. */
  styleType: 'uniqueValue';
  /** Label used if field/value association is not found. */
  defaultLabel?: string;
  /** Options used if field/value association is not found. */
  defaultSettings?: TypeKinfOfSymbolVectorSettings;
  /** Fields used by the style. */
  fields: string[];
  /** Unique value style information configuration. */
  uniqueValueStyleInfo: TypeUniqueValueStyleInfo[];
}

/** ******************************************************************************************************************************
 * Class break style information configuration.
 */
export type TypeClassBreakStyleInfo = {
  /** Label used by the style. */
  label: string;
  /** Minimum values associated to the style. */
  minValue: number | undefined | null;
  /** Maximum values associated to the style. */
  maxValue: number;
  /** options associated to the style. */
  settings: TypeKinfOfSymbolVectorSettings;
};

/** ******************************************************************************************************************************
 * Type Gard function that redefines a TypeBaseStyleConfig as a TypeClassBreakStyleConfig if the type attribute of the
 * verifyIfConfig parameter is 'classBreaks'. The type ascention applies only to the true block of the if clause that use
 * this function.
 *
 * @param {TypeBaseStyleConfig} verifyIfConfig Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const isClassBreakStyleConfig = (verifyIfConfig: TypeBaseStyleConfig): verifyIfConfig is TypeClassBreakStyleConfig => {
  return verifyIfConfig.styleType === 'classBreaks';
};

/** ******************************************************************************************************************************
 * Class break style configuration.
 */
export interface TypeClassBreakStyleConfig extends TypeBaseStyleConfig {
  /** Style identifier. */
  id?: string;
  /** Type of style. */
  styleType: 'classBreaks';
  /** Label used if field/value association is not found. */
  defaultLabel?: string;
  /** Options used if field/value association is not found. */
  defaultSettings?: TypeKinfOfSymbolVectorSettings;
  /** Field used by the style. */
  field: string;
  /** Class break style information configuration. */
  classBreakStyleInfos: TypeClassBreakStyleInfo[];
}

/** ******************************************************************************************************************************
 * Type of Style to apply to the GeoView vector layer source at creation time.
 */
export type TypeStyleSettings = TypeBaseStyleConfig | TypeSimpleStyleConfig | TypeUniqueValueStyleConfig | TypeClassBreakStyleConfig;

/** ******************************************************************************************************************************
 * Valid keys for the TypeStyleConfig object.
 */
export type TypeStyleConfigKey = 'Point' | 'LineString' | 'Polygon';

/** ******************************************************************************************************************************
 * Type of Style to apply to the GeoView vector layer based on geometry types.
 */
export type TypeStyleConfig = Partial<Record<TypeStyleConfigKey, TypeStyleSettings>>;

/** ******************************************************************************************************************************
 * Type of Style to apply to the GeoView vector layer source at creation time.
 */
export type TypeLayerEntryType = 'vector' | 'vectorTile' | 'vectorHeatmap' | 'raster' | 'geocore';

/** ******************************************************************************************************************************
 * Type Gard function that redefines a TypeLayerEntryConfig as a TypeLayerGroupEntryConfig if the entryType attribute of the
 * verifyIfLayer parameter is 'group'. The type ascention applies only to the true block of the if clause that use this function.
 *
 * @param {TypeLayerEntryConfig} verifyIfLayer Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const layerEntryIsGroupLayer = (verifyIfLayer: TypeLayerEntryConfig): verifyIfLayer is TypeLayerGroupEntryConfig => {
  return 'entryType' in verifyIfLayer && verifyIfLayer.entryType === 'group';
};

/** ******************************************************************************************************************************
 * Type Gard function that redefines a TypeLayerEntryConfig as a TypeVectorLayerEntryConfig if the entryType attribute of
 * the verifyIfLayer parameter is 'vector'. The type ascention applies only to the true block of the if clause that use this
 * function.
 *
 * @param {TypeLayerEntryConfig} verifyIfLayer Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const layerEntryIsVector = (verifyIfLayer: TypeLayerEntryConfig): verifyIfLayer is TypeVectorLayerEntryConfig => {
  return verifyIfLayer.entryType === 'vector';
};

/** ******************************************************************************************************************************
 * Type Gard function that redefines a TypeLayerEntryConfig as a TypeVectorHeatmapLayerEntryConfig if the entryType attribute of
 * the verifyIfLayer parameter is 'vectorHeatmap'. The type ascention applies only to the true block of the if clause that use this
 * function.
 *
 * @param {TypeLayerEntryConfig} verifyIfLayer Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const layerEntryIsVectorHeatmap = (verifyIfLayer: TypeLayerEntryConfig): verifyIfLayer is TypeVectorHeatmapLayerEntryConfig => {
  return verifyIfLayer.entryType === 'vectorHeatmap';
};

/** ******************************************************************************************************************************
 * Type Gard function that redefines a TypeLayerEntryConfig as a TypeVectorTileLayerEntryConfig if the entryType attribute of the
 * verifyIfLayer parameter is 'vector' and the object has a style attribute. The type ascention applies only to the true block
 * of the if clause that use this function.
 *
 * @param {TypeLayerEntryConfig} verifyIfLayer Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const layerEntryIsVectorTile = (verifyIfLayer: TypeLayerEntryConfig): verifyIfLayer is TypeVectorTileLayerEntryConfig => {
  return verifyIfLayer.entryType === 'vectorTile';
};

/** ******************************************************************************************************************************
 * Type Gard function that redefines a TypeLayerEntryConfig as a TypeImageLayerEntryConfig | TypeTileLayerEntryConfig if the
 * entryType attribute of the verifyIfLayer parameter is 'raster'. The type ascention applies only to the true block of the if
 * clause that use this function.
 *
 * @param {TypeLayerEntryConfig} verifyIfLayer Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const layerEntryIsRaster = (
  verifyIfLayer: TypeLayerEntryConfig
): verifyIfLayer is TypeImageLayerEntryConfig | TypeTileLayerEntryConfig => {
  return verifyIfLayer.entryType === 'raster';
};

/** ******************************************************************************************************************************
 * Type Gard function that redefines a TypeLayerEntryConfig as a TypeGeocoreLayerEntryConfig if the entryType attribute of
 * the verifyIfLayer parameter is 'geocore'. The type ascention applies only to the true block of the if clause that use
 * this function.
 *
 * @param {TypeLayerEntryConfig} verifyIfLayer Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export const layerEntryIsGeocore = (verifyIfLayer: TypeLayerEntryConfig): verifyIfLayer is TypeGeocoreLayerEntryConfig => {
  return verifyIfLayer.entryType === 'geocore';
};

/** ******************************************************************************************************************************
 * Base type used to define a GeoView layer to display on the map.
 */
export type TypeBaseLayerEntryConfig = {
  /** This attribute is not part of the schema. It is used to link the layer entry config to the GeoView root layer config. */
  geoviewRootLayer?: TypeGeoviewLayerConfig;
  /** This attribute is not part of the schema. It is used to link the layer entry config to the parent's layer config. */
  parentLayerConfig?: TypeGeoviewLayerConfig | TypeLayerGroupEntryConfig;
  /** This attribute is not part of the schema. It is used to link the displayed layer to its layer entry config. */
  gvLayer?: BaseLayer;
  /** This attribute is not part of the schema. It is used internally to distinguish dynamic layer groups derived from the
   * metadata. */
  isDynamicLayerGroup?: boolean;
  /** Layer entry data type. */
  entryType?: 'vector' | 'vectorTile' | 'vectorHeatmap' | 'raster' | 'group';
  /** The id of the layer to display on the map. */
  layerId: string;
  /** The display name of the layer (English/French). */
  layerName?: TypeLocalizedString;
  /**
   * Initial settings to apply to the GeoView layer entry at creation time. Initial settings are inherited from the parent in the
   * configuration tree.
   */
  initialSettings?: TypeLayerInitialSettings;
  /** Source settings to apply to the GeoView vector layer source at creation time. */
  source?: TypeBaseSourceVectorInitialConfig | TypeSourceImageInitialConfig | TypeSourceTileInitialConfig;
  /** The listOfLayerEntryConfig attribute is used only on group entry and on GeoView layer configurations. */
  listOfLayerEntryConfig?: never;
};

/** ******************************************************************************************************************************
 * Type used to define a GeoView vector layer to display on the map.
 */
export interface TypeVectorLayerEntryConfig extends TypeBaseLayerEntryConfig {
  /** Layer entry data type. */
  entryType?: 'vector';
  /** Initial settings to apply to the GeoView vector layer source at creation time. */
  source?: TypeVectorSourceInitialConfig;
  /** Style to apply to the vector layer. */
  style?: TypeStyleConfig;
}

/** ******************************************************************************************************************************
 * Type that defines the domain of valid values for the ESRI format parameter.
 */
export type TypeEsriFormatParameter = 'png' | 'jpg' | 'gif' | 'svg';

/** ******************************************************************************************************************************
 * Type of server.
 */
export type TypeOfServer = 'mapserver' | 'geoserver' | 'qgis';

/** ******************************************************************************************************************************
 * Initial settings for image sources.
 */
export type TypeSourceImageInitialConfig = TypeSourceImageWmsInitialConfig | TypeSourceImageEsriInitialConfig;

/** ******************************************************************************************************************************
 * Initial settings for image sources.
 */
export type TypeBaseSourceImageInitialConfig = {
  /**
   * The service endpoint of the layer (English/French). If not specified, the metadataAccessPath of the GeoView parent
   * layer is used
   */
  dataAccessPath?: TypeLocalizedString;
  /**
   * The crossOrigin attribute for loaded images. Note that you must provide a crossOrigin value if you want to access pixel data
   * with the Canvas renderer.
   * */
  crossOrigin?: string;
  /** Spatial Reference EPSG code supported (https://epsg.io/). We support Web Mercator and Lambert Conical Conform Canada. */
  projection?: TypeProjectionCodes;
  /** Definition of the feature information structure that will be used by the getFeatureInfo method. */
  featureInfo?: TypeFeatureInfoLayerConfig;
};

/** ******************************************************************************************************************************
 * Initial settings for WMS image sources.
 */
export interface TypeSourceImageWmsInitialConfig extends TypeBaseSourceImageInitialConfig {
  /** The type of the remote WMS server. The default value is mapserver. */
  serverType?: TypeOfServer;
  /** Style to apply. Default = '' */
  style?: string;
}

/** ******************************************************************************************************************************
 * Initial settings for WMS image sources.
 */
export interface TypeSourceImageEsriInitialConfig extends TypeBaseSourceImageInitialConfig {
  /** The format used by the image layer. */
  format?: TypeEsriFormatParameter;
  /**
   * If true, the image will be exported with the background color of the map set as its transparent color. Only the .png and
   * .gif formats support transparency. Default = true.
   */
  transparent?: boolean;
}

/** ******************************************************************************************************************************
 * Definition of the tile grid structure.
 */
export type TypeTileGrid = {
  /** The extent that constrains the view. Called with [minX, minY, maxX, maxY] extent coordinates. */
  extent?: Extent;
  /**
   * The tile grid origin, i.e. where the x and y axes meet ([z, 0, 0]). Tile coordinates increase left to right and downwards.
   * If not specified, extent must be provided.
   */
  origin: [number, number];
  /**
   * Resolutions. The array index of each resolution needs to match the zoom level. This means that even if a minZoom is
   * configured, the resolutions array will have a length of maxZoom + 1.
   */
  resolutions: number[];
  /**
   * The tile grid origin, i.e. where the x and y axes meet ([z, 0, 0]). Tile coordinates increase left to right and downwards.
   * If not specified, extent must be provided. Default = [256, 256].
   */
  tileSize?: [number, number];
};

/** ******************************************************************************************************************************
 * Initial settings for tile image sources.
 */
export type TypeSourceTileInitialConfig = {
  /** The service endpoint of the layer (English/French). */
  dataAccessPath: TypeLocalizedString;
  /** The crossOrigin attribute for loaded images. Note that you must provide a crossOrigin value if you want to access pixel data
   * with the Canvas renderer.
   */
  crossOrigin?: string;
  /** The source type for the tile layer. Default = XYZ. */
  projection?: TypeProjectionCodes;
  /** Tile grid parameters to use. */
  tileGrid?: TypeTileGrid;
};

/** ******************************************************************************************************************************
 * Type used to identify a GeoView vector heamap layer to display on the map.
 */
export interface TypeVectorHeatmapLayerEntryConfig extends TypeBaseLayerEntryConfig {
  /** Layer entry data type. */
  entryType?: 'vectorHeatmap';
  /** Initial settings to apply to the GeoView vector layer source at creation time. */
  source?: TypeVectorSourceInitialConfig;
  /**
   * Color gradient of the heatmap, specified as an array of CSS color strings.
   * Default = ["#00f", "#0ff", "#0f0", "#ff0", "#f00"].
   */
  gradient?: string[];
  /** Radius size in pixels. Default = 8px. */
  radius?: number;
  /** Blur size in pixels. Default = 15px. */
  blur?: number;
  /** Feature attribute to use for the weight or a function (ADD FORMAT) that returns a weight from a feature. */
  weight?: string;
}

/** ******************************************************************************************************************************
 * Initial settings to apply to the GeoView vector tile layer source at creation time.
 */
export interface TypeVectorTileSourceInitialConfig extends TypeBaseSourceVectorInitialConfig {
  /** Tile grid parameters to use. */
  tileGrid?: TypeTileGrid;
}

/** ******************************************************************************************************************************
 * Type used to define a GeoView vector tile layer to display on the map. The vector data is divided into a tile grid.
 */
export interface TypeVectorTileLayerEntryConfig extends TypeBaseLayerEntryConfig {
  /** Layer entry data type. */
  entryType?: 'vectorTile';
  /**
   * Initial settings to apply to the GeoView vector layer source at creation time. Layer sources providing vector data divided
   * into a tile grid.
   */
  source?: TypeVectorTileSourceInitialConfig;
  /** Style to apply to the vector layer. */
  style?: TypeStyleConfig;
}

/** ******************************************************************************************************************************
 * Type used to define a GeoView image layer to display on the map.
 */
export interface TypeImageLayerEntryConfig extends TypeBaseLayerEntryConfig {
  /** Layer entry data type. */
  entryType?: 'raster';
  source?: TypeSourceImageInitialConfig;
  /** Style to apply to the raster layer. */
  style?: TypeStyleConfig;
}

/** ******************************************************************************************************************************
 * Type used to define a GeoView image layer to display on the map.
 */
export interface TypeTileLayerEntryConfig extends TypeBaseLayerEntryConfig {
  /** Layer entry data type. */
  entryType?: 'raster';
  /** Initial settings to apply to the GeoView image layer source at creation time. */
  source?: TypeSourceTileInitialConfig;
}

/** ******************************************************************************************************************************
 * Type used to define a GeoView layer where configration is extracted by a configuration snippet stored on a server. The server
 * configuration will handle bilangual informations.
 */
export type TypeGeocoreLayerEntryConfig = {
  /** This attribute is not part of the schema. It is used to link the layer config config to the GeoView parent's layer config. */
  geoviewRootLayer?: TypeGeoviewLayerConfig;
  /** This attribute is not part of the schema. It is used to link the layer entry config to the parent's layer config. */
  parentLayerConfig?: TypeGeoviewLayerConfig | TypeLayerGroupEntryConfig;
  /** This attribute is not part of the schema. It is used to link the displayed layer to its layer entry config. */
  gvLayer?: BaseLayer;
  /** Layer entry data type. */
  entryType?: 'geocore';
  /** Basic information used to identify the GeoView layer. The GeoCore catalog uuid of the layer is stored in the layerId
   * attribute. The id will have the language extension (id-'lang').
   */
  layerId: string;
  /** The display name of the layer (English/French). */
  layerName?: TypeLocalizedString;
  /** The access path to the geoCore endpoint (optional, this value should be embeded in the GeoView API). */
  source?: TypeSourceGeocoreConfig;
  /** Attribute initialSettings is never used by GeoCore layer entry. */
  initialSettings?: never;
  /** The listOfLayerEntryConfig attribute is used only on group entry and on GeoView layer configurations. */
  listOfLayerEntryConfig?: never;
};

/** ******************************************************************************************************************************
 * Initial settings to apply to the GeoView vector layer source at creation time.
 */
export type TypeSourceGeocoreConfig = {
  /** Path used to access the data. */
  dataAccessPath: TypeLocalizedString;
};

/** ******************************************************************************************************************************
 * Type used to define a layer group.
 */
export interface TypeLayerGroupEntryConfig extends Omit<TypeBaseLayerEntryConfig, 'listOfLayerEntryConfig'> {
  /** This attribute is not part of the schema. It is used internally to distinguish dynanic layer groups derived from the
   * metadata. */
  isDynamicLayerGroup?: boolean;
  /** Layer entry data type. */
  entryType: 'group';
  /** The source attribute does not exists on the layer group entry. */
  source: never;
  /** The list of layer entry configurations to use from the GeoView layer group. */
  listOfLayerEntryConfig: TypeListOfLayerEntryConfig;
}

/** ******************************************************************************************************************************
 * Layer config type.
 */
export type TypeLayerEntryConfig =
  | TypeLayerGroupEntryConfig
  | TypeBaseLayerEntryConfig
  | TypeVectorHeatmapLayerEntryConfig
  | TypeVectorTileLayerEntryConfig
  | TypeVectorLayerEntryConfig
  | TypeImageLayerEntryConfig
  | TypeTileLayerEntryConfig
  | TypeGeocoreLayerEntryConfig;

/** ******************************************************************************************************************************
 * List of layers. Corresponds to the layerList defined in the schema.
 */
export type TypeListOfLayerEntryConfig = TypeLayerEntryConfig[];

/** ******************************************************************************************************************************
 *  Definition of the map feature configuration according to what is specified in the schema.
 */
export type TypeMapFeaturesInstance = {
  map: TypeMapConfig;
  /** Display theme, default = dark. */
  theme?: 'dark' | 'light';
  /** App bar properties. */
  appBar?: TypeAppBarProps;
  /** Nav bar properies. */
  navBar?: TypeNavBarProps;
  /** Map components. */
  components?: TypeMapComponents;
  /** List of core packages. */
  corePackages?: TypeMapCorePackages;
  /** List of external packages. */
  externalPackages?: TypeExternalPackages;
  /** Service URLs. */
  serviceUrls?: TypeServiceUrls;
  /**
   * ISO 639-1 code indicating the languages supported by the configuration file. It will use value(s) provided here to
   * access bilangual configuration nodes. For value(s) provided here, each bilingual configuration node MUST provide a value..
   * */
  suportedLanguages: TypeListOfLocalizedLanguages;
  /**
   * The schema version used to validate the configuration file. The schema should enumerate the list of versions accepted by
   * this version of the viewer.
   */
  versionUsed?: '1.0';
};

/* *******************************************************************************************************************************
/** ISO 639-1  language code prefix. */
export type TypeDisplayLanguage = 'en' | 'fr';
/** Constante mainly use for language prefix validation. */
export const VALID_DISPLAY_LANGUAGE: TypeDisplayLanguage[] = ['en', 'fr'];
/** ******************************************************************************************************************************
 * ISO 639-1 code indicating the languages supported by the configuration file. It will use value(s) provided here to access
 * bilangual nodes. For value(s) provided here, each bilingual node MUST provide a value.
 */
export type TypeLocalizedLanguages = 'en' | 'fr';
/** List of languages supported by the map. */
export type TypeListOfLocalizedLanguages = TypeLocalizedLanguages[];
/** Constante mainly use for language code validation. */
export const VALID_LOCALIZED_LANGUAGES: TypeListOfLocalizedLanguages = ['en', 'fr'];

/* *******************************************************************************************************************************
/** Valid version number. */
export type TypeValidVersions = '1.0';
/** Constante mainly use for version validation. */
export const VALID_VERSIONS: TypeValidVersions[] = ['1.0'];

/** ******************************************************************************************************************************
 *  Definition of the map configuration settings.
 */
export type TypeMapConfig = {
  /** Basemap options settings for this map configuration. */
  basemapOptions: TypeBasemapOptions;
  /** Type of interaction. */
  interaction: TypeInteraction;
  /** List of GeoView Layers in the order which they should be added to the map. */
  listOfGeoviewLayerConfig?: TypeListOfGeoviewLayerConfig;
  /** View settings. */
  viewSettings: TypeViewSettings;
  /** Additional options used for OpenLayers map options. */
  extraOptions?: Record<string, unknown>;
};

/** ******************************************************************************************************************************
 *  Definition of the valid map interactiom valuess. If map is dynamic (pan/zoom) or static to act as a thumbnail (no nav bar).
 */
export type TypeInteraction = 'static' | 'dynamic';
/** Constante mainly use for interaction validation. */
export const VALID_INTERACTION: TypeInteraction[] = ['static', 'dynamic'];

/** ******************************************************************************************************************************
 *  Definition of the Geoview layer list.
 */
export type TypeListOfGeoviewLayerConfig = TypeGeoviewLayerConfig[];

/** ******************************************************************************************************************************
 *  Definition of a single Geoview layer configuration.
 */
export type TypeGeoviewLayerConfig = {
  /**
   * The id of the layer for referencing within the viewer (does not relate directly to any external service). The id will have
   * the language extension (id-'lang').
   */
  layerId: string;
  /**
   * The display name of the layer (English/French). If it is not present the viewer will make an attempt to scrape this
   * information.
   */
  layerName?: TypeLocalizedString;
  /** The GeoView layer access path (English/French). */
  metadataAccessPath?: TypeLocalizedString;
  /** Type of GeoView layer. */
  geoviewLayerType: TypeGeoviewLayerType;
  /**
   * Initial settings to apply to the GeoView layer at creation time.
   * This attribute is allowed only if listOfLayerEntryConfig.length > 1.
   */
  initialSettings?: TypeLayerInitialSettings;
  /** The layer entries to use from the GeoView layer. */
  listOfLayerEntryConfig: TypeListOfLayerEntryConfig;
};

/** ******************************************************************************************************************************
 *  Definition of the view settings.
 */
export type TypeViewSettings = {
  /**
   * Center of the map defined as [longitude, latitude]. Longitude domaine = [-160..160], default = -106.
   * Latitude domaine = [-80..80], default = 60. */
  center: [number, number];
  /** Enable rotation. If false, a rotation constraint that always sets the rotation to zero is used. Default = true. */
  enableRotation?: boolean;
  /**
   * The initial rotation for the view in degree (positive rotation clockwise, 0 means North). Will be converted to radiant by
   * the viewer. Domaine = [0..360], default = 0.
   */
  rotation?: number;
  /** The extent that constrains the view. Called with [minX, minY, maxX, maxY] extent coordinates. */
  extent?: Extent;
  /**
   * The minimum zoom level used to determine the resolution constraint. If not set, will use default from basemap.
   * Domaine = [0..50].
   */
  minZoom?: number;
  /**
   * The maximum zoom level used to determine the resolution constraint. If not set, will use default from basemap.
   * Domaine = [0..50].
   */
  maxZoom?: number;
  /**
   * Spatial Reference EPSG code supported (https://epsg.io/). We support Web Mercator and Lambert Conical Conform Canada.
   * Default = 3978.
   */
  projection: TypeProjectionCodes;
  /** Initial map zoom level. Zoom level are define by the basemap zoom levels. Domaine = [0..28], default = 12. */
  zoom: number;
};

/** ******************************************************************************************************************************
 *  Type used to define valid projection codes.
 */
export type TypeProjectionCodes = 3978 | 3857;

/** ******************************************************************************************************************************
 *  Constant mainly used to test if a TypeProjectionCodes variable is a valid projection codes.
 */
export const VALID_PROJECTION_CODES = [3978, 3857];

/** ******************************************************************************************************************************
 *  Definition of the app bar properties.
 */
export type TypeAppBarProps = {
  /**
   * The content of the about section in Markdown format. If empty, it will be ignored. If not, it will create a button
   * on the app-bar to open the panel. In the basic view, this information may be added in a container above the map.
   */
  about: TypeLocalizedString;
};

/** ******************************************************************************************************************************
 * Controls availalbe on the navigation bar. Default = ['zoom', 'fullscreen', 'fullextent'].
 */
export type TypeNavBarProps = Array<'zoom' | 'fullscreen' | 'fullextent'>;

/** ******************************************************************************************************************************
 * Core components to initialize on viewer load. Default = ['app-bar', 'nav-bar', 'north-arrow', 'overview-map'].
 */
export type TypeMapComponents = Array<'app-bar' | 'nav-bar' | 'north-arrow' | 'overview-map'>;

/** ******************************************************************************************************************************
 * Core packages to initialize on viewer load. The schema for those are on their own package. NOTE: config from packages are in
 * the same loaction as core config (<<core config name>>-<<package name>>.json).
 * Default = ['basemap-panel' | 'layers-panel' | 'details-panel' | 'geolocator-panel'].
 */
export type TypeMapCorePackages = Array<'basemap-panel' | 'layers-panel' | 'details-panel' | 'geolocator-panel'>;

/** ******************************************************************************************************************************
 * List of external packages to initialize on viewer load. Default = [].
 */
export type TypeExternalPackages = {
  /** External Package name. The name must be ideintical to the window external package object to load. */
  name: string;
  /**
   * The url to the external package configuration setting. The core package will read the configuration and pass it inside
   * the package.
   */
  configUrl?: string;
}[];

/** ******************************************************************************************************************************
 * Service endpoint urls. Default = 'https://geocore.api.geo.ca'.
 */
export type TypeServiceUrls = {
  /**
   * Service end point to access API for layers specification (loading and plugins parameters). By default it is GeoCore but can
   * be another endpoint with similar output.
   */
  keys: string;
  /**
   * An optional proxy to be used for dealing with same-origin issues.  URL must either be a relative path on the same server
   * or an absolute path on a server which sets CORS headers.
   */
  proxyUrl: string;
};