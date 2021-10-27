/**
 * a class to add vector-tiles layer
 *
 * @export
 * @class VectorTiles
 */

import vectorTileLayer from 'leaflet-vector-tile-layer';

import L, { Layer } from 'leaflet';
import { LayerConfig } from './layer';


export class VectorTiles {
    /**
     * Add a XYZ Tiles layer to the map.
     *
     * @param {LayerConfig} layer the layer configuration
     * @return {Promise<Layer | string>} layers to add to the map
     */
    add(layer: LayerConfig): Promise<Layer | string> {
        const { url } = layer;

        const geo = new Promise<Layer | string>((resolve) => {
            const xyzTiles = L.tileLayer(layer.url);
            resolve(xyzTiles);
        });
        return new Promise((resolve) => resolve(geo));
    }
}
