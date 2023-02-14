import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import css from './strring.module.css';
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {withDelay} from "../../services/utils";
import {ElementStates} from "../../types/element-states";
import reverseElements from "../../services/reverse";
import {useFetching} from "../../hooks/useFetching";

type TItem = {
  letter: string,
  state: ElementStates;
}


export const StringComponent: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [letters, setLetters] = useState<TItem[]>([]);

    const [isLoading, , fetching] = useFetching(async () => {
      await reverse(text);
    });

    const reverse = async (text: string) => {
      await withDelay(reverseElements(text), item => {
        const items = item.map((element) => {
          return {letter: element.value, state: element.state};
        })
        setLetters(items);
      })
    }

    return (
      <SolutionLayout title="Строка">
        <div className={css.container}>
          <div className={css.control}>
            <Input maxLength={11}
                   isLimitText
                   onChange={(e) => setText(e.currentTarget.value)}
                   disabled={isLoading}
            />
            <Button text={'Развернуть'} disabled={text.length === 0} onClick={fetching} isLoader={isLoading}/>
          </div>
          <div className={css.letters + ' mt-40'}>
            {
              letters.map((item, index) => (
                <Circle key={index} letter={item.letter} state={item.state}/>
              ))
            }
          </div>
        </div>
      </SolutionLayout>
    );
  }
;
