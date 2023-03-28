import React, {FormEvent, useRef, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import Container from "../container/Container";
import Form from "../ui/form/form";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import FieldSet from "../ui/fieldset/fieldset";
import css from './list-page.module.css'
import {ILinkedList, LinkedList} from "../../types/structures/linked-list";
import {IElement} from "../../types/structures/element";
import {
  addToHead,
  addToTail,
  insertAtIndex,
  removeAtIndex,
  removeFromHead,
  removeFromTail
} from "../../services/linked-list";
import CircleList from "../ui/circle-list/circle-list";
import {useFetching} from "../../hooks/useFetching";
import {withDelay} from "../../services/utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

const DefaultText = '';
const DefaultIndex = 0; //A component is changing an uncontrolled input to be controlled.

enum ProcessType {
  addToHead,
  addToTail,
  removeHead,
  removeTail,
  insertAt,
  removeAt
}

export const ListPage: React.FC = () => {
  const listRef = useRef<ILinkedList<IElement<string>>>(new LinkedList<IElement<string>>());
  const processRef = useRef<ProcessType>(ProcessType.addToHead);
  const [text, setText] = useState<string>(DefaultText);
  const [index, setIndex] = useState<number | undefined>(DefaultIndex);
  const [items, setItems] = useState<IElement<string>[]>([]);

  const [isLoading, , fetching] = useFetching(async ([callback]) => {
    await callback();
  });

  const run = (generator: Generator<IElement<string>[]>, processType: ProcessType) => {
    processRef.current = processType;
    return async () => {
      await withDelay(generator, item => setItems(item), SHORT_DELAY_IN_MS);
      setText(DefaultText);
      setIndex(DefaultIndex)
    };
  }

  const onSubmit = (e: FormEvent) => {
    console.log(123);
    e.preventDefault();
    fetching(run(addToHead(listRef.current, text), ProcessType.addToHead))
  }

  const removeHead = () => {
    fetching(run(removeFromHead(listRef.current), ProcessType.addToHead));
  }

  const addTail = () => {
    fetching(run(addToTail(listRef.current, text), ProcessType.addToTail));
    let num = Number(text);
    setText(!isNaN(num) ? String(++num) : '1')
  }

  const removeTail = () => {
    fetching(run(removeFromTail(listRef.current), ProcessType.removeTail));
  }

  const insertAt = () => {
    if (index === undefined) return;
    fetching(run(insertAtIndex(listRef.current, text, index), ProcessType.insertAt));
  }

  const removeAt = () => {
    if (index === undefined) return;
    fetching(run(removeAtIndex(listRef.current, index), ProcessType.removeAt));
  }

  return (
    <SolutionLayout title="Связный список">
      <Container
        control={
          <Form onSubmit={onSubmit}>
            <FieldSet>
              <Input maxLength={4}
                     isLimitText
                     value={text}
                     onChange={e => setText(e.currentTarget.value)}
                     placeholder={'Введите значение'}
                     extraClass={css.input}
              />
              <Button text={'Добавить в head'}
                      type={"submit"}
                      extraClass={css.defaultButton}
                      disabled={isLoading || !text.length}
                      isLoader={isLoading && processRef.current === ProcessType.addToHead}
              />
              <Button text={'Добавить в tail'}
                      type={"button"}
                      onClick={addTail}
                      extraClass={css.defaultButton}
                      disabled={isLoading || !text.length}
                      isLoader={isLoading && processRef.current === ProcessType.addToTail}
              />
              <Button text={'Удалить из head'}
                      type={"button"}
                      onClick={removeHead}
                      extraClass={css.defaultButton}
                      disabled={isLoading || !listRef.current.size}
                      isLoader={isLoading && processRef.current === ProcessType.removeHead}
              />
              <Button text={'Удалить из tail'}
                      type={"button"}
                      extraClass={css.defaultButton}
                      onClick={removeTail}
                      disabled={isLoading || !listRef.current.size}
                      isLoader={isLoading && processRef.current === ProcessType.removeTail}
              />
            </FieldSet>
            <FieldSet>
              <Input
                placeholder={'Введите индекс'}
                type={'number'}
                value={index}
                min={0}
                max={listRef.current.size === 0 ? 0 : listRef.current.size - 1}
                onChange={e => setIndex(Number(e.currentTarget.value))}
                extraClass={css.input}
              />
              <Button
                text={'Добавить по индексу'}
                extraClass={css.bigButton}
                onClick={insertAt}
                disabled={isLoading || !text.length || index === undefined}
                isLoader={isLoading && processRef.current === ProcessType.insertAt}
                type={'button'}
              />
              <Button
                text={'Удалить по индексу'}
                extraClass={css.bigButton}
                onClick={removeAt}
                disabled={isLoading || index === undefined}
                isLoader={isLoading && processRef.current === ProcessType.removeAt}
                type={'button'}
              />
            </FieldSet>
          </Form>
        }>
        <CircleList items={items} extraClassName={'mt-40'} showIndex showArrows/>
      </Container>
    </SolutionLayout>
  );
};
