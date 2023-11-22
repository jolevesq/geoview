import { useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material';
// YC import { LegendItemsDetailsProps } from './types';
import { Box, DeleteIcon, Grid, HandleIcon, IconButton, Paper } from '@/ui';
import { getSxClasses } from './layers-style';
// YC import { useLegendHelpers } from './hooks/helpers';
import { LayersActions } from './left-panel/layers-actions';
import { LayersList } from './left-panel/layers-list';
import { LayerDetails } from './right-panel/layer-details';
import { useLayersDisplayState, useSelectedLayer } from '@/core/stores/store-interface-and-intial-values/layer-state';
import { AddNewLayer } from './left-panel/add-new-layer';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#262B32' : '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
}));

export function Layers(/* // YC props: LegendItemsDetailsProps */): JSX.Element {
  // const { mapId } = props;

  const theme = useTheme();
  const sxClasses = getSxClasses(theme);

  const layerDetailsRef = useRef<HTMLDivElement>(null);

  // Populating fake legend data
  // YC const helpers = useLegendHelpers(mapId);

  const selectedLayer = useSelectedLayer(); // get store value
  const displayState = useLayersDisplayState();

  useEffect(() => {
    // YC helpers.populateLegendStoreWithFakeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (layerDetailsRef.current) {
      layerDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedLayer]);

  const leftPanel = () => {
    return (
      <div>
        <LayersActions />
        {displayState === 'add' ? <AddNewLayer /> : <LayersList />}
      </div>
    );
  };

  const rightPanel = () => {
    if (selectedLayer && displayState === 'view') {
      return (
        <Item ref={layerDetailsRef}>
          <LayerDetails layerDetails={selectedLayer} />
        </Item>
      );
    }
    if (displayState === 'remove') {
      return (
        <Paper sx={{ padding: '20px' }}>
          <h3>Removing layers</h3>
          <Box sx={sxClasses.rightPanel.buttonDescriptionContainer}>
            <IconButton>
              <DeleteIcon style={{ fill: '#a9a9a9' }} />
            </IconButton>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum perspiciatis doloribus veritatis iste? Quae alias praesentium,
              delectus reprehenderit itaque voluptatibus!
            </p>
          </Box>
        </Paper>
      );
    }
    if (displayState === 'order') {
      return (
        <Paper sx={{ padding: '20px' }}>
          <h3>Re-ordering layers</h3>
          <Box sx={sxClasses.rightPanel.buttonDescriptionContainer}>
            <IconButton>
              <HandleIcon style={{ fill: '#a9a9a9' }} />
            </IconButton>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium animi, perferendis nemo quas sequi totam minima ad
              labore.
            </p>
          </Box>
        </Paper>
      );
    }

    return null;
  };

  return (
    <Box sx={sxClasses.legendContainer}>
      <Grid container direction={{ xs: 'column', sm: 'row' }} spacing={12}>
        <Grid item xs={12} sm={6}>
          {leftPanel()}
        </Grid>
        <Grid item xs={12} sm={6}>
          {rightPanel()}
        </Grid>
      </Grid>
    </Box>
  );
}
