import { TypeSetStore, TypeGetStore } from '@/core/stores/geoview-store';
import { TypeLayerData } from '@/geo/utils/layer-set';
export type TypeColumnFiltersState = ColumnFilter[];
export interface ColumnFilter {
    id: string;
    value: unknown;
}
interface IDataTableSettings {
    columnFiltersRecord: TypeColumnFiltersState;
    mapFilteredRecord: boolean;
    rowsFilteredRecord: number;
    toolbarRowSelectedMessageRecord: string;
}
export interface IDataTableState {
    allFeaturesDataArray: TypeLayerData[];
    isEnlargeDataTable: boolean;
    activeLayerData: TypeLayerData[];
    layersDataTableSetting: Record<string, IDataTableSettings>;
    selectedLayerPath: string;
    tableHeight: number;
    actions: {
        applyMapFilters: (filterStrings: string) => void;
        setActiveLayersData: (layers: TypeLayerData[]) => void;
        setColumnFiltersEntry: (filtered: TypeColumnFiltersState, layerPath: string) => void;
        setIsEnlargeDataTable: (isEnlarge: boolean) => void;
        setMapFilteredEntry: (mapFiltered: boolean, layerPath: string) => void;
        setRowsFilteredEntry: (rows: number, layerPath: string) => void;
        setToolbarRowSelectedMessageEntry: (message: string, layerPath: string) => void;
        setTableHeight: (tableHeight: number) => void;
        setSelectedLayerPath: (layerPath: string) => void;
        triggerGetAllFeatureInfo: (layerPath: string) => void;
    };
    setterActions: {
        setActiveLayersData: (layers: TypeLayerData[]) => void;
        setAllFeaturesDataArray: (allFeaturesDataArray: TypeLayerData[]) => void;
        setColumnFiltersEntry: (filtered: TypeColumnFiltersState, layerPath: string) => void;
        setInitiallayerDataTableSetting: (layerPath: string) => void;
        setIsEnlargeDataTable: (isEnlarge: boolean) => void;
        setMapFilteredEntry: (mapFiltered: boolean, layerPath: string) => void;
        setRowsFilteredEntry: (rows: number, layerPath: string) => void;
        setToolbarRowSelectedMessageEntry: (message: string, layerPath: string) => void;
        setTableHeight: (tableHeight: number) => void;
        setSelectedLayerPath: (layerPath: string) => void;
    };
}
export declare function initialDataTableState(set: TypeSetStore, get: TypeGetStore): IDataTableState;
export declare const useDataTableAllFeaturesDataArray: () => TypeLayerData[];
export declare const useDataTableSelectedLayerPath: () => string;
export declare const useDataTableLayerSettings: () => Record<string, IDataTableSettings>;
export declare const useDataTableTableHeight: () => number;
export declare const useDataTableStoreActions: () => {
    applyMapFilters: (filterStrings: string) => void;
    setActiveLayersData: (layers: TypeLayerData[]) => void;
    setColumnFiltersEntry: (filtered: TypeColumnFiltersState, layerPath: string) => void;
    setIsEnlargeDataTable: (isEnlarge: boolean) => void;
    setMapFilteredEntry: (mapFiltered: boolean, layerPath: string) => void;
    setRowsFilteredEntry: (rows: number, layerPath: string) => void;
    setToolbarRowSelectedMessageEntry: (message: string, layerPath: string) => void;
    setTableHeight: (tableHeight: number) => void;
    setSelectedLayerPath: (layerPath: string) => void;
    triggerGetAllFeatureInfo: (layerPath: string) => void;
};
export {};
