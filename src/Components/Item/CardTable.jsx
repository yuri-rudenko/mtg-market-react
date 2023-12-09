import { Table } from 'antd';
import React from 'react';
import combinations from '../Selector/Selectors/Colors/combinations';
import { findMatchingCombination } from './Item';

const CardTable = (props) => {
  const card = props.card;

  const columns = [
    {
      title: 'Attribute',
      dataIndex: 'attribute',
      key: 'attribute',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  const dataSource = [
    {
      key: 'name',
      attribute: 'Name',
      value: card.name,
    },
    {
      key: 'set',
      attribute: 'Set',
      value: card.set_name,
    },
    {
      key: 'year',
      attribute: 'Year',
      value: card.released_at.slice(0, 4),
    },
    {
      key: 'manaCost',
      attribute: 'Mana cost',
      value: card.cmc,
    },
    {
      key: 'colors',
      attribute: 'Colors',
      value: findMatchingCombination(combinations, card.colors),
    },
    {
      key: 'rarity',
      attribute: 'Rarity',
      value: card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1),
    },
    {
      key: 'types',
      attribute: 'Types',
      value: card.type_line.split(' — ')[0],
    },
    {
      key: 'subtypes',
      attribute: 'Subtypes',
      value: card.type_line.includes(' — ')
        ? card.type_line.split(' — ')[1]
        : 'None',
    },
  ];

  return (
    <div className='table'>
      <Table dataSource={dataSource} columns={columns} showHeader={false} pagination={false} style={{}} />
    </div>
  );
};

export default CardTable;
