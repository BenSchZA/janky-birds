/**
 *
 * NetworkState
 *
 */

import React, { Fragment } from 'react';
import { Theme, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { colors } from 'theme';

const styles = (theme: Theme) => createStyles({
  root: {
    position: 'fixed',
    bottom:0,
    right:0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'black',
    borderTopLeftRadius: 10,
    color: 'white',
    padding: "3px 10px",
    "& > *:last-child":{
      height: 10,
      width: 10,
      marginLeft: 5,
      display: 'block',
      borderRadius: 30,
      backgroundColor: 'red',
      "&.ready":{
        backgroundColor: 'green'
      }
    }
  }
});

interface OwnProps extends WithStyles<typeof styles> {
  ready: boolean;
  networkId: number;
}

const NetworkState: React.SFC<OwnProps> = (props: OwnProps) => {
  const {classes, ready, networkId} = props;
  let networkName: string = "";
  if(networkId == 1){
    networkName = "Mainnet"
  }else if(networkId == 4){
    networkName = 'Rinkeby'
  }else{
    networkName =  'Not connected'
  }
  return <div className={classes.root}>
    <span>
      {networkName}
    </span>
    <div className={ready ? 'ready'  : ''} />
  </div>;
};

export default withStyles(styles, { withTheme: true })(NetworkState);
