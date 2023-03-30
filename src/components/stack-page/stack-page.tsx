import React, {FormEvent, useRef, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import Form from "../ui/form/form";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import CircleList from "../ui/circle-list/circle-list";
import Container from "../container/Container";
import {useFetching} from "../../hooks/useFetching";
import {IStack, Stack} from "../../types/structures/stack";
import {IElement} from "../../types/structures/element";
import {withDelay} from "../../services/utils";
import {stackPush, stackRemove} from "../../services/stack";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import FieldSet from "../ui/fieldset/fieldset";

export const StackPage: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [items, setItems] = useState<IElement<string>[]>([]); //for refresh;
  const [isRemoving, , removing] = useFetching(async () => {
    await withDelay(stackRemove(stackRef.current), item => {
      setItems([...item.all()])
    }, SHORT_DELAY_IN_MS);
  });

  const [isAdding, , adding] = useFetching(async () => {
    await withDelay(stackPush(stackRef.current, text), item => {
      setItems([...item.all()])
    }, SHORT_DELAY_IN_MS);
    setText('');
  });

  const stackRef = useRef<IStack<IElement<string>>>(new Stack<IElement<string>>());

  const clear = () => {
    stackRef.current = new Stack<IElement<string>>();
    setItems([...stackRef.current.all()])
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    adding();
  }

  return (
    <SolutionLayout title="Стек">
      <Container
        control={
          <Form onSubmit={onSubmit}>
            <FieldSet>
              <Input maxLength={4}
                     isLimitText
                     onChange={(e) => setText(e.currentTarget.value)}
                     value={text}
                     disabled={isAdding || isRemoving}
                     data-cy={'input'}
              />
              <Button text={'Добавить'}
                      disabled={text.length === 0 || isRemoving}
                      isLoader={isAdding}
                      type={"submit"}
                      data-cy={'submit'}
              />

              <Button text={'Удалить'}
                      onClick={() => removing()}
                      disabled={items.length === 0 || isAdding}
                      isLoader={isRemoving}
                      type={"button"}
                      data-cy={'remove'}
              />

              <Button text={'Очистить'}
                      disabled={isAdding || isRemoving || items.length === 0}
                      type={"button"}
                      extraClass={'ml-40'}
                      onClick={clear}
                      data-cy={'clear'}
              />
            </FieldSet>
          </Form>
        }>
        <CircleList items={items} extraClassName={'mt-40'} showIndex/>
      </Container>
    </SolutionLayout>
  );
};
