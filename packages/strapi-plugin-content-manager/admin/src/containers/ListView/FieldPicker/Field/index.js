import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '@buffetjs/core';
import { useIntl } from 'react-intl';
import Wrapper from './Wrapper';
import { getTrad } from '../../../../utils';

const Field = ({ name, onChange, value }) => {
  const { formatMessage } = useIntl();

  const handleChange = ({ target: { name, value } }) => {
    onChange({ name, value: !value });
  };

  return (
    <Wrapper>
      <Checkbox
        name={name}
        message={formatMessage({ id: getTrad(name), defaultMessage: name })}
        onChange={handleChange}
        value={value}
      />
    </Wrapper>
  );
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};

export default Field;
