export declare const GITHUB_REPO = "https://github.com/Canadian-Geospatial-Platform/geoview";
export declare const GEO_URL_TEXT: {
    url: string;
    text: string;
};
/** The default geocore url */
export declare const CONFIG_GEOCORE_URL = "https://geocore-stage.api.geo.ca";
/** The default geolocator url */
export declare const CONFIG_GEOLOCATOR_URL = "https://geolocator.api.geo.ca?keys=geonames,nominatim,locate";
export declare const OL_ZOOM_DURATION = 500;
export declare const NORTH_POLE_POSITION: [number, number];
export declare const OL_ZOOM_PADDING: [number, number, number, number];
export declare const OL_OVERVIEWMAP_SIZE: {
    width: string;
    height: string;
};
export declare const LAYER_STATUS: {
    readonly REGISTERED: "registered";
    readonly NEW_INSTANCE: "newInstance";
    readonly PROCESSING: "processing";
    readonly PROCESSED: "processed";
    readonly LOADING: "loading";
    readonly LOADED: "loaded";
    readonly ERROR: "error";
};
export declare const VECTOR_LAYER: {
    csv: string;
    esriFeature: string;
    GeoJSON: string;
    GeoPackage: string;
    ogcFeature: string;
    ogcWfs: string;
};
export declare const ARROW_KEY_CODES: string[];
export declare const ARROW_KEYS_WITH_SPACE: string[];
export declare const TABS: {
    readonly LEGEND: "legend";
    readonly DETAILS: "details";
    readonly LAYERS: "layers";
    readonly DATA_TABLE: "data-table";
    readonly GUIDE: "guide";
    readonly TIME_SLIDER: "time-slider";
    readonly GEO_CHART: "geochart";
};
