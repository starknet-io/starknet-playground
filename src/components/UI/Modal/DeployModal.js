import PropTypes from 'prop-types';
import React from 'react';
import colors from '../../../styles/colors.module.scss';
import {Button} from '../Button/Button';
import {Modal} from './Modal';

const MODAL_TITLE_TXT = 'Deploy your contract on StarkNet';
const BODY_PARTS_TXT = [
  'You are about to deploy your contract on the',
  'StarkNet Planets Alpha network',
  "Writing a contract is not the same as writing a Cairo program (for example, you shouldn't have a main() function). If you haven't referred to the",
  'StarkNet tutorial',
  'yet, now is the time.'
];
const DEPLOY_BTN_TXT = 'Deploy on StarkNet Alpha';
const STARKNET_PLANETS_ALPHA_LINK_URL =
  'https://medium.com/starkware/starknet-planets-alpha-on-ropsten-e7494929cb95';
const DEPLOY_TUTORIAL_LINK_URL =
  'https://www.cairo-lang.org/docs/hello_starknet/';

const DeployModal = ({show, onClose, onContinue}) => {
  const {color3Hover, color2Hover, color1, color4Hover} = colors;

  return (
    <Modal show={show} title={MODAL_TITLE_TXT} onClose={onClose}>
      <>
        <div>
          {BODY_PARTS_TXT[0]}&nbsp;
          <a
            href={STARKNET_PLANETS_ALPHA_LINK_URL}
            rel="noreferrer"
            target="_blank"
          >
            {BODY_PARTS_TXT[1]}
          </a>
          .<br />
          <br />
          {BODY_PARTS_TXT[2]}&nbsp;
          <a
            href={DEPLOY_TUTORIAL_LINK_URL}
            rel="noreferrer"
            target="_blank"
          >
            {BODY_PARTS_TXT[3]}
          </a>
          &nbsp;
          {BODY_PARTS_TXT[4]}
        </div>
        <Button
          colorBackground={color3Hover}
          colorBackgroundHover={color2Hover}
          colorBorder={color1}
          colorBorderHover={color2Hover}
          colorText={color1}
          colorTextHover={color4Hover}
          isBig={true}
          style={{
            fontWeight: 'bold',
            fontSize: '18px',
            margin: '30px 0 20px 0'
          }}
          text={DEPLOY_BTN_TXT}
          onClick={onContinue}
        />
      </>
    </Modal>
  );
};

DeployModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onContinue: PropTypes.func
};

export {DeployModal};
