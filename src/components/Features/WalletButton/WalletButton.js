import {WalletStatus} from '@starkware-industries/commons-js-enums';
import {shortenAddress} from '@starkware-industries/commons-js-utils';
import PropTypes from 'prop-types';
import React from 'react';
import colors from '../../../styles/colors.module.scss';
import {AccountButton} from '../../UI/AccountButton/AccountButton';
import {DynamicIcon} from '../../UI/DynamicIcon/DynamicIcon';
import styles from './WalletButton.module.scss';

export const WalletButtonIconSize = {
  SMALL: 10,
  MEDIUM: 20,
  LARGE: 30
};

const CONNECT_WALLET_BTN_TXT = 'Connect StarkNet Wallet';

export const WalletButton = ({
  account,
  chain,
  network,
  logoPath,
  status,
  onClick
}) => {
  return status === WalletStatus.CONNECTED ? (
    <AccountWalletButton
      account={account}
      chain={chain}
      logoPath={logoPath}
    />
  ) : (
    <ConnectWalletButton network={network} onClick={onClick} />
  );
};

WalletButton.propTypes = {
  account: PropTypes.string,
  chain: PropTypes.string,
  network: PropTypes.string,
  logoPath: PropTypes.string,
  status: PropTypes.string,
  onClick: PropTypes.func
};

const AccountWalletButton = ({account, chain, logoPath}) => {
  const {
    colorOrangeSoda,
    colorWhiteOp10,
    colorWhite,
    colorDarkBlueGray
  } = colors;

  return (
    <AccountButton
      className={styles.accountWalletButton}
      colorBackground={colorWhiteOp10}
      colorBackgroundHover={colorDarkBlueGray}
      colorBorder={colorOrangeSoda}
      colorText={colorWhite}
      height={'40px'}
      iconLeft={
        <DynamicIcon
          path={logoPath}
          size={WalletButtonIconSize.MEDIUM}
        />
      }
      iconRight={<ChainLabel chain={chain} />}
      text={shortenAddress(account)}
    />
  );
};

AccountWalletButton.propTypes = {
  account: PropTypes.string,
  chain: PropTypes.string,
  logoPath: PropTypes.string,
  onClick: PropTypes.func
};

const ConnectWalletButton = ({onClick}) => {
  const {colorOrangeSoda, colorFlame, colorWhite} = colors;
  return (
    <AccountButton
      className={styles.connectWalletButton}
      colorBackground={colorOrangeSoda}
      colorBackgroundHover={colorFlame}
      colorText={colorWhite}
      height={'40px'}
      text={CONNECT_WALLET_BTN_TXT}
      onClick={onClick}
    />
  );
};

ConnectWalletButton.propTypes = {
  onClick: PropTypes.func,
  network: PropTypes.string
};

const ChainLabel = ({chain}) => {
  return <div className={styles.networkLabel}>{chain}</div>;
};

ChainLabel.propTypes = {
  chain: PropTypes.string
};
