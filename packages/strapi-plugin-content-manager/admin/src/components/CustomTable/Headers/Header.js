import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Carret, useGlobalContext } from 'strapi-helper-plugin';
import { useIntl } from 'react-intl';
import { useListView } from '../../../hooks';
import { getTrad } from '../../../utils';

const Header = ({ fieldSchema: { type }, metadatas: { sortable, mainField }, name }) => {
  const { _sort, firstSortableHeader, setQuery } = useListView();
  const { emitEvent } = useGlobalContext();
  const [sortBy, sortOrder] = _sort.split(':');
  const { formatMessage } = useIntl();

  let sortField = name;
  let useRelation = false;

  if (type === 'relation') {
    useRelation = true;
    sortField = `${name}.${mainField.name}`;
  }

  const handleClick = () => {
    if (sortable) {
      emitEvent('didSortEntries', { useRelation });

      const isCurrentSort = sortField === sortBy;
      const nextOrder = isCurrentSort && sortOrder === 'ASC' ? 'DESC' : 'ASC';
      let value = `${sortField}:${nextOrder}`;

      if (isCurrentSort && sortOrder === 'DESC') {
        value = `${firstSortableHeader}:ASC`;
      }

      setQuery({
        _sort: value,
      });
    }
  };

  return (
    <th onClick={handleClick}>
      <span className={sortable ? 'sortable' : ''}>
        {formatMessage({ id: getTrad(name), defaultMessage: name })}
        {sortBy === sortField && <Carret fill="#212529" isUp={sortOrder === 'ASC' && 'isAsc'} />}
      </span>
    </th>
  );
};

Header.propTypes = {
  fieldSchema: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
  metadatas: PropTypes.shape({
    label: PropTypes.string.isRequired,
    sortable: PropTypes.bool.isRequired,
    mainField: PropTypes.object,
  }).isRequired,
  name: PropTypes.string.isRequired,
};

export default memo(Header);
