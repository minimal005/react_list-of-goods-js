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

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [style, setStyle] = useState({
    SORT_ALPHABET: false,
    SORT_LENGTH: false,
    REVERSE: false,
  });

  function changeList(btn) {
    const changeGoods = [...visibleGoods];

    switch (btn) {
      case SORT_ALPHABET:
        if (style.REVERSE) {
          return setVisibleGoods(
            changeGoods.sort((a, b) => a.localeCompare(b)).reverse(),
          );
        }

        return setVisibleGoods(changeGoods.sort((a, b) => a.localeCompare(b)));

      case SORT_LENGTH:
        if (style.REVERSE) {
          return setVisibleGoods(
            changeGoods.sort((a, b) => b.length - a.length),
          );
        }

        return setVisibleGoods(changeGoods.sort((a, b) => a.length - b.length));
      case REVERSE:
        return setVisibleGoods(changeGoods.reverse());
      case RESET:
        return setVisibleGoods(goodsFromServer);
      default:
        return setVisibleGoods(goodsFromServer);
    }
  }

  const reset =
    style.SORT_ALPHABET === false &&
    style.SORT_LENGTH === false &&
    style.REVERSE === false;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            changeList(SORT_ALPHABET);
            setStyle(prev => ({
              ...prev,
              SORT_LENGTH: false,
              SORT_ALPHABET: true,
            }));
          }}
          type="button"
          className={clsx(
            'button',
            styleClass(SORT_ALPHABET),
            !style.SORT_ALPHABET && 'is-light',
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            changeList(SORT_LENGTH);
            setStyle(prev => ({
              ...prev,
              SORT_LENGTH: true,
              SORT_ALPHABET: false,
            }));
          }}
          type="button"
          className={clsx(
            'button',
            styleClass(SORT_LENGTH),
            !style.SORT_LENGTH && 'is-light',
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            changeList(REVERSE);
            setStyle(prev => {
              const reverse = prev.REVERSE !== true;

              return {
                ...prev,
                REVERSE: reverse,
              };
            });
          }}
          type="button"
          className={clsx(
            'button',
            styleClass(REVERSE),
            !style.REVERSE && 'is-light',
          )}
        >
          Reverse
        </button>

        {!reset && (
          <button
            onClick={() => {
              changeList(RESET);
              // const reset =
              //   style.SORT_ALPHABET === false &&
              //   style.SORT_LENGTH === false &&
              //   style.REVERSE === false;

              setStyle({
                SORT_ALPHABET: false,
                SORT_LENGTH: false,
                REVERSE: false,
              });
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
