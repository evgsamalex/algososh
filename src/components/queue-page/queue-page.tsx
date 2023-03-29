import React, {FormEvent, useRef, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import Form from "../ui/form/form";
import FieldSet from "../ui/fieldset/fieldset";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import CircleList from "../ui/circle-list/circle-list";
import Container from "../container/Container";
import {IElement} from "../../types/structures/element";
import {useFetching} from "../../hooks/useFetching";
import {IQueue, Queue} from "../../types/structures/queue";
import {dequeueGenerator, enqueueGenerator, toItems} from "../../services/queue";
import {withDelay} from "../../services/utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

const QueueSize = 7;
const EmptyValue = '';

export const QueuePage: React.FC = () => {
  const queueRef = useRef<IQueue<IElement<string>>>(new Queue<IElement<string>>(QueueSize));

  const [text, setText] = useState<string>(EmptyValue);
  const [items, setItems] = useState<IElement<string>[]>(toItems(queueRef.current, EmptyValue)); //for refresh;
  const [isLoading, , fetching] = useFetching(async ([callback]) => {
    await callback();
  });

  const run = (generator: Generator<IElement<string>[]>) => {
    return async () => await withDelay(generator, item => setItems(item), SHORT_DELAY_IN_MS);
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetching(run(enqueueGenerator(queueRef.current, items, text, EmptyValue)));
    setText(EmptyValue);
  }

  const remove = () => {
    fetching(run(dequeueGenerator(queueRef.current, items, EmptyValue)));
  }

  const clear = () => {
    fetching(async () => {
      queueRef.current = new Queue<IElement<string>>(QueueSize);
      setItems(toItems(queueRef.current, EmptyValue));
    })
  }

  return (
    <SolutionLayout title="Очередь">
      <Container
        control={
          <Form onSubmit={onSubmit}>
            <FieldSet>
              <Input maxLength={4}
                     isLimitText
                     onChange={(e) => setText(e.currentTarget.value)}
                     value={text}
                     disabled={isLoading}
                     data-cy={'input'}
              />
              <Button text={'Добавить'}
                      disabled={isLoading || queueRef.current.isFull() || !text.length}
                      type={"submit"}
                      data-cy={'submit'}
              />
              <Button text={'Удалить'}
                      onClick={remove}
                      disabled={isLoading || queueRef.current.isEmpty()}
                      type={"button"}
                      data-cy={'remove'}
              />
              <Button text={'Очистить'}
                      disabled={isLoading}
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
