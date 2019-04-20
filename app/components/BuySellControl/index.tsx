/**
 *
 * BuySell
 *
 */

import React, { Fragment } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    // JSS in CSS goes here
  });

interface OwnProps extends WithStyles<typeof styles> {}

const BuySellControl: React.SFC<OwnProps> = (props: OwnProps) => {
  return <Fragment>BuySell</Fragment>;
};

export default withStyles(styles, { withTheme: true })(BuySellControl);
