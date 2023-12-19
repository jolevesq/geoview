import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import _ from 'lodash';
import { TypeLegendLayer, TypeLegendItem } from '../types';
import { getSxClasses } from './layer-details-style';
import {
  Box,
  CheckBoxIcon,
  CheckBoxOutineBlankIcon,
  IconButton,
  Paper,
  SliderBase,
  Typography,
  ZoomInSearchIcon,
  Grid,
  RestartAltIcon,
  HighlightOutlinedIcon,
  TableViewIcon,
  BrowserNotSupportedIcon,
  Divider,
} from '@/ui';
import { useLayerHighlightedLayer, useLayerStoreActions } from '@/core/stores/store-interface-and-intial-values/layer-state';
import { useUIStoreActions } from '@/core/stores/store-interface-and-intial-values/ui-state';
import { generateId } from '@/core/utils/utilities';
import { LayerIcon } from '../layer-icon';

interface LayerDetailsProps {
  layerDetails: TypeLegendLayer;
}

export function LayerDetails(props: LayerDetailsProps): JSX.Element {
  const { layerDetails } = props;

  const { t } = useTranslation<string>();

  const theme = useTheme();
  const sxClasses = getSxClasses(theme);

  // get store actions
  const highlightedLayer = useLayerHighlightedLayer();
  const { setAllItemsVisibility, toggleItemVisibility, setLayerOpacity, setHighlightLayer, zoomToLayerExtent, getLayerBounds } =
    useLayerStoreActions();
  const { openModal } = useUIStoreActions();

  const handleZoomTo = () => {
    zoomToLayerExtent(layerDetails.layerPath);
  };

  const handleOpenTable = () => {
    openModal({ activeElementId: 'layerDatatable', callbackElementId: `table-details` });
  };

  if (layerDetails.bounds === undefined || layerDetails.bounds[0] === Infinity) {
    const bounds = getLayerBounds(layerDetails.layerPath);
    if (bounds) layerDetails.bounds = bounds;
  }

  const handleRefreshLayer = () => {
    // eslint-disable-next-line no-console
    console.log('refresh layer');
  };

  const handleHighlightLayer = () => {
    setHighlightLayer(layerDetails.layerPath);
  };

  const handleSetOpacity = (opacityValue: number | number[]) => {
    const val = Array.isArray(opacityValue) ? opacityValue[0] : opacityValue;
    setLayerOpacity(layerDetails.layerPath, val / 100);
  };

  const getSubTitle = () => {
    if (layerDetails.children.length > 0) {
      const validChildren = layerDetails.children?.filter(
        (c) => c.isVisible !== 'no' && ['processed', 'loaded'].includes(c.layerStatus ?? '')
      );
      if (validChildren.length) {
        return t('legend.subLayersCount').replace('{count}', validChildren.length.toString());
      }
    } else {
      const count = layerDetails.items.filter((d) => d.isVisible !== 'no').length;
      const totalCount = layerDetails.items.length;
      return t('legend.itemsCount').replace('{count}', count.toString()).replace('{totalCount}', totalCount.toString());
    }
    return null;
  };

  const allItemsChecked = () => {
    return _.every(layerDetails.items, (i) => ['yes', 'always'].includes(i.isVisible!));
  };

  function renderOpacityControl() {
    return (
      <div style={{ padding: '16px 17px 16px 23px' }}>
        <Box sx={sxClasses.opacityMenu}>
          <Typography sx={{ fontWeight: 'bold' }}>{t('legend.opacity')}</Typography>
          <SliderBase min={0} max={100} value={(layerDetails.opacity ? layerDetails.opacity : 1) * 100} customOnChange={handleSetOpacity} />
        </Box>
      </div>
    );
  }

  function renderItemCheckbox(item: TypeLegendItem) {
    // no checkbox for simple style layers
    if (
      layerDetails.styleConfig?.LineString?.styleType === 'simple' ||
      layerDetails.styleConfig?.Point?.styleType === 'simple' ||
      layerDetails.styleConfig?.Polygon?.styleType === 'simple'
    ) {
      return null;
    }
    if (item.isVisible === 'always') {
      return (
        <IconButton disabled>
          {' '}
          <CheckBoxIcon color="disabled" />{' '}
        </IconButton>
      );
    }

    return (
      <IconButton color="primary" onClick={() => toggleItemVisibility(layerDetails.layerPath, item.geometryType, item.name)}>
        {item.isVisible === 'yes' ? <CheckBoxIcon /> : <CheckBoxOutineBlankIcon />}
      </IconButton>
    );
  }

  function renderItems() {
    return (
      <Grid container direction="column" spacing={0} sx={sxClasses.itemsGrid} justifyContent="left" justifyItems="stretch">
        {layerDetails.items.length > 1 && (
          <Grid container direction="row" justifyContent="center" alignItems="stretch" justifyItems="stretch">
            <Grid item xs="auto">
              <IconButton color="primary" onClick={() => setAllItemsVisibility(layerDetails.layerPath, !allItemsChecked() ? 'yes' : 'no')}>
                {allItemsChecked() ? <CheckBoxIcon /> : <CheckBoxOutineBlankIcon />}
              </IconButton>
            </Grid>
            <Grid item xs="auto">
              <span>{t('general.name')}</span>
            </Grid>
          </Grid>
        )}
        {layerDetails.items.map((item) => (
          <Grid container direction="row" key={item.name} justifyContent="center" alignItems="stretch">
            <Grid item xs="auto">
              {renderItemCheckbox(item)}
            </Grid>
            <Grid item xs="auto">
              {item.icon ? <img alt={item.name} src={item.icon} /> : <BrowserNotSupportedIcon />}
              <span style={sxClasses.tableIconLabel}>{item.name}</span>
            </Grid>
          </Grid>
        ))}
      </Grid>
    );
  }

  function renderLayers() {
    return (
      <>
        <Typography sx={{ fontWeight: 'bold', textAlign: 'left', margin: '10px 0px' }}>{t('layers.subLayersList')}</Typography>
        <Grid container direction="column" spacing={0} sx={sxClasses.itemsGrid} justifyContent="left" justifyItems="stretch">
          {layerDetails.children.map((layer) => (
            <Box
              key={layer.layerId}
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', padding: '8px 0', borderBottom: '1px solid #ccc' }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ marginLeft: '20px' }}>
                  <LayerIcon layer={layer} />
                </Box>
                <Box>
                  <span style={sxClasses.tableIconLabel}>{layer.layerName}</span>
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>
      </>
    );
  }

  function renderLayerButtons() {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '15px' }}>
        {layerDetails.items.length > 0 && (
          <IconButton id="table-details" tooltip="legend.tableDetails" sx={{ backgroundColor: '#F6F6F6' }} onClick={handleOpenTable}>
            <TableViewIcon />
          </IconButton>
        )}
        <IconButton tooltip="legend.refreshLayer" sx={{ backgroundColor: '#F6F6F6' }} onClick={handleRefreshLayer}>
          <RestartAltIcon />
        </IconButton>
        <IconButton
          tooltip="legend.highlightLayer"
          sx={{ backgroundColor: layerDetails.layerPath !== highlightedLayer ? '#F6F6F6' : theme.palette.action.active }}
          onClick={handleHighlightLayer}
        >
          <HighlightOutlinedIcon />
        </IconButton>
        <IconButton
          tooltip="legend.zoomTo"
          onClick={handleZoomTo}
          sx={{ backgroundColor: '#F6F6F6' }}
          disabled={layerDetails.bounds === undefined}
        >
          <ZoomInSearchIcon />
        </IconButton>
      </Box>
    );
  }

  // function renderItems

  return (
    <Paper sx={sxClasses.layerDetails}>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box sx={{ textAlign: 'left' }}>
          <Typography sx={sxClasses.categoryTitle}> {layerDetails.layerName} </Typography>
          <Typography sx={{ fontSize: '0.8em' }}> {getSubTitle()} </Typography>
        </Box>
        {renderLayerButtons()}
      </Box>
      {renderOpacityControl()}
      <Box sx={{ marginTop: '20px' }}>
        {layerDetails.items?.length > 0 && renderItems()}
        {layerDetails.children.length > 0 && renderLayers()}
      </Box>
      <Divider sx={{ marginTop: '50px', marginBottom: '10x' }} variant="middle" />
      {layerDetails.layerAttribution &&
        layerDetails.layerAttribution!.map((attribution) => {
          return (
            <Typography sx={{ marginTop: '10px', color: '#808080', fontSize: '0.8em' }} key={generateId()}>
              {attribution.indexOf('©') === -1 ? `© ${attribution}` : attribution}
            </Typography>
          );
        })}
    </Paper>
  );
}
