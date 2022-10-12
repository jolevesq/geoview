import { TypeStyleConfig, TypeLayerEntryConfig } from '../map/map-schema-types';
export declare type EsriRendererTypes = 'uniqueValue' | 'simple' | 'classBreaks';
export declare type EsriBaseRenderer = {
    type: EsriRendererTypes;
};
declare type TypeEsriColor = [number, number, number, number];
/** *****************************************************************************************************************************
 * Type Gard function that redefines an EsriBaseRenderer as an EsriUniqueValueRenderer if the type attribute of the
 * verifyIfRenderer parameter is 'uniqueValue'. The type ascention applies only to the true block of the if clause that use
 * this function.
 *
 * @param {EsriBaseRenderer} verifyIfRenderer Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export declare const esriRendererIsUniqueValue: (verifyIfRenderer: EsriBaseRenderer) => verifyIfRenderer is EsriUniqueValueRenderer;
export interface EsriUniqueValueRenderer extends EsriBaseRenderer {
    type: 'uniqueValue';
    defaultLabel: string;
    defaultSymbol: EsriSymbol;
    field1: string;
    field2: string;
    field3: string;
    fieldDelimiter: string;
    rotationType: 'arithmetic' | 'geographic';
    uniqueValueInfos: EsriUniqueValueInfo[];
}
export declare type EsriUniqueValueInfo = {
    description: string;
    label: string;
    symbol: EsriSymbol;
    value: string;
};
export declare type EsriSymbol = EsriBaseSymbol | EsriSimpleMarkerSymbol | EsriSimpleLineSymbol | EsriPictureMarkerSymbol;
export declare type EsriBaseSymbol = {
    type: 'esriSMS' | 'esriSLS' | 'esriPMS' | 'esriSFS';
};
/** *****************************************************************************************************************************
 * Type Gard function that redefines an EsriBaseSymbol as an EsriSimpleMarkerSymbol if the type attribute of the verifyIfSymbol
 * parameter is 'esriSMS'. The type ascention applies only to the true block of the if clause that use this function.
 *
 * @param {EsriBaseSymbol} verifyIfSymbol Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export declare const isSimpleMarkerSymbol: (verifyIfSymbol: EsriBaseSymbol) => verifyIfSymbol is EsriSimpleMarkerSymbol;
export interface EsriSimpleMarkerSymbol extends EsriBaseSymbol {
    angle: number;
    color: TypeEsriColor;
    outline: EsriSimpleLineSymbol;
    size: number;
    style: EsriSymbolStyle;
    type: 'esriSMS';
    xoffset: number;
    yoffset: number;
}
/** *****************************************************************************************************************************
 * Type Gard function that redefines an EsriBaseSymbol as an EsriSimpleFillSymbol if the type attribute of the verifyIfSymbol
 * parameter is 'esriSFS'. The type ascention applies only to the true block of the if clause that use this function.
 *
 * @param {EsriBaseSymbol} verifyIfSymbol Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export declare const isEsriSimpleFillSymbol: (verifyIfSymbol: EsriBaseSymbol) => verifyIfSymbol is EsriSimpleFillSymbol;
export interface EsriSimpleFillSymbol extends EsriBaseSymbol {
    color: TypeEsriColor;
    outline: EsriSimpleLineSymbol;
    style: EsriFillStyle;
    type: 'esriSFS';
    width: number;
}
export declare type EsriFillStyle = 'esriSFSBackwardDiagonal' | 'esriSFSCross' | 'esriSFSDiagonalCross' | 'esriSFSForwardDiagonal' | 'esriSFSHorizontal' | 'esriSFSNull' | 'esriSFSSolid' | 'esriSFSVertical';
/** *****************************************************************************************************************************
 * Type Gard function that redefines an EsriBaseSymbol as an EsriSimpleLineSymbol if the type attribute of the verifyIfSymbol
 * parameter is 'esriSLS'. The type ascention applies only to the true block of the if clause that use this function.
 *
 * @param {EsriBaseSymbol} verifyIfSymbol Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export declare const isSimpleLineSymbol: (verifyIfSymbol: EsriBaseSymbol) => verifyIfSymbol is EsriSimpleLineSymbol;
export interface EsriSimpleLineSymbol extends EsriBaseSymbol {
    color: TypeEsriColor;
    style: EsriLineStyle;
    type: 'esriSLS';
    width: number;
}
export declare type EsriLineStyle = 'esriSLSDash' | 'esriSLSDashDot' | 'esriSLSDashDotDot' | 'esriSLSDot' | 'esriSLSLongDash' | 'esriSLSLongDashDot' | 'esriSLSNull' | 'esriSLSShortDash' | 'esriSLSShortDashDot' | 'esriSLSShortDashDotDot' | 'esriSLSShortDot' | 'esriSLSSolid';
export declare type EsriSymbolStyle = 'esriSMSCircle' | 'esriSMSCross' | 'esriSMSDiamond' | 'esriSMSSquare' | 'esriSMSTriangle' | 'esriSMSX';
/** *****************************************************************************************************************************
 * Type Gard function that redefines an EsriBaseSymbol as an EsriPictureMarkerSymbol if the type attribute of the verifyIfSymbol
 * parameter is 'esriPMS'. The type ascention applies only to the true block of the if clause that use this function.
 *
 * @param {EsriBaseSymbol} verifyIfSymbol Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export declare const isPictureMarkerSymbol: (verifyIfSymbol: EsriBaseSymbol) => verifyIfSymbol is EsriPictureMarkerSymbol;
export interface EsriPictureMarkerSymbol extends EsriBaseSymbol {
    angle: number;
    contentType: string;
    height: number;
    imageData: string;
    type: 'esriPMS';
    width: number;
    xoffset: number;
    yoffset: number;
}
/** *****************************************************************************************************************************
 * Type Gard function that redefines an EsriBaseRenderer as an EsriSimpleRenderer if the type attribute of the verifyIfRenderer
 * parameter is 'simple'. The type ascention applies only to the true block of the if clause that use this function.
 *
 * @param {EsriBaseRenderer} verifyIfRenderer Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export declare const esriRendererIsSimple: (verifyIfRenderer: EsriBaseRenderer) => verifyIfRenderer is EsriSimpleRenderer;
export interface EsriSimpleRenderer extends EsriBaseRenderer {
    type: 'simple';
    description: string;
    label: string;
    rotationExpression: string;
    rotationType: 'arithmetic' | 'geographic';
    symbol: EsriSymbol;
}
/** *****************************************************************************************************************************
 * Type Gard function that redefines an EsriBaseRenderer as an EsriClassBreakRenderer if the type attribute of the
 * verifyIfRenderer parameter is 'classBreaks'. The type ascention applies only to the true block of the if clause that use this
 * function.
 *
 * @param {EsriBaseRenderer} verifyIfRenderer Polymorphic object to test in order to determine if the type ascention is valid.
 *
 * @returns {boolean} true if the type ascention is valid.
 */
export declare const esriRendererIsClassBreaks: (verifyIfRenderer: EsriBaseRenderer) => verifyIfRenderer is EsriClassBreakRenderer;
declare type EsriClassBreakInfoEntry = {
    classMaxValue: number;
    classMinValue: number | undefined | null;
    description: string;
    label: string;
    symbol: EsriSymbol;
};
export interface EsriClassBreakRenderer extends EsriBaseRenderer {
    type: 'classBreaks';
    classBreakInfos: EsriClassBreakInfoEntry[];
    defaultLabel: string;
    defaultSymbol: EsriSymbol;
    field: string;
    minValue: number;
    rotationExpression: string;
    rotationType: 'arithmetic' | 'geographic';
}
export declare function getStyleFromEsriRenderer(mapId: string, layerEntryConfig: TypeLayerEntryConfig, renderer: EsriBaseRenderer): TypeStyleConfig | undefined;
export {};
