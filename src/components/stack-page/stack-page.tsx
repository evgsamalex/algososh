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

export const StackPage: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [items, setItems] = useState<IElement<string>[]>([]); //for refresh;
  const [isLoading, , fetching] = useFetching(async ([callback]) => {
    await callback();
  });

  const stackRef = useRef<IStack<IElement<string>>>(new Stack<IElement<string>>());

  const add = async () => {
    await withDelay(stackPush(stackRef.current, text), item => {
      setItems([...item.all()])
    }, SHORT_DELAY_IN_MS);
    setText('');
  }

  const remove = async () => {
    await withDelay(stackRemove(stackRef.current), item => {
      setItems([...item.all()])
    }, SHORT_DELAY_IN_MS);
  }

  const clear = () => {
    stackRef.current = new Stack<IElement<string>>();
    setItems([...stackRef.current.all()])
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetching(add);
  }

  return (
    <SolutionLayout title="Стек">
      <Container
        control={
          <Form onSubmit={onSubmit}>
            <Input maxLength={4}
                   isLimitText
                   onChange={(e) => setText(e.currentTarget.value)}
                   value={text}
                   disabled={isLoading}/>
            <Button text={'Добавить'}
                    disabled={isLoading || text.length === 0}
                    type={"submit"}/>

            <Button text={'Удалить'}
                    onClick={() => fetching(remove)}
                    disabled={isLoading || items.length === 0}
                    type={"button"}/>

            <Button text={'Очистить'}
                    disabled={isLoading || items.length === 0}
                    type={"button"}
                    extraClass={'ml-40'}
                    onClick={clear}/>
          </Form>
        }>
        <CircleList items={items} extraClassName={'mt-40'} showIndex/>
      </Container>
    </SolutionLayout>
  );
};
