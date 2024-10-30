/* eslint-disable import/no-extraneous-dependencies */
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import clsx from 'clsx';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_ALPHABET = 'Sort alphabetically';
const SORT_LENGTH = 'Sort by length';
const REVERSE = 'Reverse';
const RESET = 'Reset';

function styleClass(btn) {
  switch (btn) {
    case SORT_ALPHABET:
      return 'is-info';
    case SORT_LENGTH:
      return 'is-success';
    case REVERSE:
      return 'is-warning';
    case RESET:
      return 'is-danger';
    default:
      return '';
  }
}

function sortGoods(goods, { typeField, isReversed }) {
  const changedGoods = [...goods];

  if (typeField) {
    if (typeField === SORT_ALPHABET) {
      if (isReversed) {
        return changedGoods.sort((a, b) => a.localeCompare(b)).reverse();
      }

      return changedGoods.sort((a, b) => a.localeCompare(b));
    }

    if (typeField === SORT_LENGTH) {
      if (isReversed) return changedGoods.sort((a, b) => b.length - a.length);

      return changedGoods.sort((a, b) => b.length - a.length).reverse();
    }
  }

  if (!typeField && isReversed) {
    changedGoods.reverse();
  }

  return changedGoods;
}

export const App = () => {
  const [sort, setSort] = useState({ typeField: '', isReversed: false });
  const visibleGoods = sortGoods(goodsFromServer, sort);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() =>
            setSort(prev => ({ ...prev, typeField: SORT_ALPHABET }))
          }
          type="button"
          className={clsx(
            'button',
            styleClass(SORT_ALPHABET),
            sort.typeField !== SORT_ALPHABET && 'is-light',
          )}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => {
            setSort(prev => ({ ...prev, typeField: SORT_LENGTH }));
          }}
          type="button"
          className={clsx(
            'button',
            styleClass(SORT_LENGTH),
            sort.typeField !== SORT_LENGTH && 'is-light',
          )}
        >
          Sort by length
        </button>
        <button
          onClick={() => {
            setSort(prev => {
              const reverse = sort.isReversed !== true;

              return {
                ...prev,
                isReversed: reverse,
              };
            });
          }}
          type="button"
          className={clsx(
            'button',
            styleClass(REVERSE),
            !sort.isReversed && 'is-light',
          )}
        >
          Reverse
        </button>
        {(sort.typeField || sort.isReversed) && (
          <button
            onClick={() => {
              setSort({ typeField: '', isReversed: false });
            }}
            type="button"
            className={clsx('button', styleClass(RESET), 'is-light')}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
