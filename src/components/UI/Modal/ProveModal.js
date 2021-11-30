import PropTypes from 'prop-types';
import React from 'react';
import colors from '../../../styles/colors.module.scss';
import {Button} from '../Button/Button';
import {Modal} from './Modal';

const MODAL_TITLE_TXT = 'Prove your Cairo run with SHARP';
const BODY_PARTS_TXT = [
  'You are about to send your run to be proved by the Shared Prover. This may take some time to finalize.',
  "To learn about what's happening behind the scenes",
  'click here'
];
const PROVE_BTN_TXT = 'prove with SHARP';
const PROVE_LINK_URL =
  'https://www.cairo-lang.org/playground-gps-alpha/';

const ProveModal = ({show, onClose, onContinue}) => {
  const {color3Hover, color2Hover, color1, color4Hover} = colors;

  return (
    <Modal show={show} title={MODAL_TITLE_TXT} onClose={onClose}>
      <>
        <div>
          {BODY_PARTS_TXT[0]}
          <br />
          <br /> {BODY_PARTS_TXT[1]}&nbsp;
          <a href={PROVE_LINK_URL} rel="noreferrer" target="_blank">
            {BODY_PARTS_TXT[2]}
          </a>
          .
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
          text={PROVE_BTN_TXT}
          onClick={onContinue}
        />
      </>
    </Modal>
  );
};

ProveModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  onContinue: PropTypes.func
};

export {ProveModal};
