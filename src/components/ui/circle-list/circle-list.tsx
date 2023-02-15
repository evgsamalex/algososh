import React from 'react';
import {IElement} from "../../../types/structures/element";
import css from './circle-list.module.css';
import {Circle} from "../circle/circle";
import classNames from "classnames";

interface ICircleListProps<T> {
  items: IElement<T>[],
  extraClassName?: string
  showIndex?: boolean,
  head?: string,
  tail?: string,
}

const CircleList = <T,>({items, extraClassName, showIndex = false}:ICircleListProps<T>) => {
  if(!items.length) return null;

  return (
    <div className={classNames(css.items, extraClassName)}>
      {
        items.map((item)=>
          <Circle
            key={item.index}
            letter={String(item.value)}
            state={item.state}
            index={showIndex ? item.index : undefined}
            head={item.head}
            tail={item.tail}
          />
        )
      }
    </div>
  );
};

export default CircleList;
