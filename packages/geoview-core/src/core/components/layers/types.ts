import { Extent } from 'ol/extent';
import { TypeLayerControls, TypeLayerStatus, TypeStyleConfig, TypeStyleGeometry } from '@/geo/map/map-schema-types';
import { TypeGeoviewLayerType } from '@/geo/layer/geoview-layers/abstract-geoview-layers';

export type TypeLayersViewDisplayState = 'remove' | 'add' | 'order' | 'view';

export type TypeLegendLayerIcons = TypeLegendLayerItem[];

export type TypeLegendLayerItem = {
  geometryType?: TypeStyleGeometry;
  iconType?: 'simple' | 'list';
  name?: string;
  iconImage?: string | null;
  iconImageStacked?: string | null;
  iconList?: TypeLegendItem[];
};

export interface TypeLegendItem {
  geometryType: TypeStyleGeometry;
  name: string;
  isVisible: boolean;
  icon: string | null;
}

export interface TypeLegendLayer {
  bounds: Extent | undefined;
  controls?: TypeLayerControls;
  layerId: string;
  layerPath: string;
  layerAttribution?: string[];
  layerName: string;
  type?: TypeGeoviewLayerType;
  styleConfig?: TypeStyleConfig | null;
  layerStatus?: TypeLayerStatus;
  querySent?: boolean;
  canToggle?: boolean; // can sublayer visibility be toggled

  icons?: TypeLegendLayerIcons;
  // data: TypeLegend | undefined | null;
  items: TypeLegendItem[];
  children: TypeLegendLayer[];

  opacity?: number;
  opacityFromParent?: number;
  zoom?: number;
}
