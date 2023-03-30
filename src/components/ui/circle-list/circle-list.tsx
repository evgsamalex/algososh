import React from 'react';
import {IElement, THeadTail} from "../../../types/structures/element";
import css from './circle-list.module.css';
import {Circle} from "../circle/circle";
import classNames from "classnames";
import {ArrowIcon} from "../icons/arrow-icon";
import {ElementStates} from "../../../types/element-states";

interface ICircleListProps<T> {
  items: IElement<T>[],
  extraClassName?: string
  showIndex?: boolean,

  showArrows?: boolean
}

const CircleList = <T, >({items, extraClassName, showIndex = false, showArrows = false}: ICircleListProps<T>) => {
  if (!items.length) return null;

  return (
    <div className={classNames(css.items, extraClassName)} data-cy={'circle-list'}>
      {
        items.map((item, index) => {
            const letter = (item.head && item.head.hideElement) || (item.tail && item.tail.hideElement)
              ? '' : String(item.value);
            if (!showArrows) {
              return (<Circle
                key={item.index}
                letter={letter}
                state={item.state}
                index={showIndex ? item.index : undefined}
                head={toTailOrHead(item.head)}
                tail={toTailOrHead(item.tail)}
              />)
            } else {
              return (<div className={css.item} key={item.index}>
                <Circle
                  letter={letter}
                  state={item.state}
                  index={showIndex ? item.index : undefined}
                  head={toTailOrHead(item.head)}
                  tail={toTailOrHead(item.tail)}
                />
                {index < items.length - 1 &&
                  <ArrowIcon fill={fill(item.state)} data-cy={'arrow'}/>
                }
              </div>)
            }
          }
        )
      }
    </div>
  )
}

const toTailOrHead = <T, >(t?: THeadTail): string | React.ReactElement | null => {
  if (!t) return null;
  if (t.elementType === "string") {
    return String(t.value);
  }
  return <Circle letter={String(t.value)} state={t.state} isSmall/>
}

const fill = (state: ElementStates) => {
  switch (state) {
    case ElementStates.Changing:
      return "#d252e1";
    case ElementStates.Modified:
      return "#7fe051";
    default:
      return "#0032FF";
  }
}

export default CircleList;
