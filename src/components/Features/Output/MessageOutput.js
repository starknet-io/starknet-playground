import PropTypes from 'prop-types';
import React, {Fragment} from 'react';

const MessageOutput = ({message}) => {
  if (typeof message === 'string') {
    message = message.split('\n');
  }

  const renderMessage = msg => {
    const regExp = /\[@(.*?),(.*?)@]/g;
    const matches = [...msg.matchAll(regExp)];
    if (matches.length > 0) {
      const result = matches[0];
      return <span title={result[2]}>{result[1]}</span>;
    }
    return msg;
  };

  const renderMessages = () => {
    return message.map((msg, index) => {
      return (
        <div key={index} style={{whiteSpace: 'pre'}}>
          {index === 0 ? '> ' : <>&nbsp;&nbsp;</>}
          {renderMessage(msg)}
          <br />
        </div>
      );
    });
  };

  return <div>{renderMessages()}</div>;
};

MessageOutput.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};

export {MessageOutput};
