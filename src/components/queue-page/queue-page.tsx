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

  const [isEnqueue, , enqueue] = useFetching(async () => {
    await withDelay(enqueueGenerator(queueRef.current, items, text, EmptyValue), item => setItems(item), SHORT_DELAY_IN_MS)
  });

  const [isDequeue, , dequeue] = useFetching(async () => {
    await withDelay(dequeueGenerator(queueRef.current, items, EmptyValue), item => setItems(item), SHORT_DELAY_IN_MS)
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    enqueue();
    setText(EmptyValue);
  }

  const remove = () => {
    dequeue();
  }

  const clear = () => {
    queueRef.current = new Queue<IElement<string>>(QueueSize);
    setItems(toItems(queueRef.current, EmptyValue));
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
                     disabled={isEnqueue || isDequeue}
                     data-cy={'input'}
              />
              <Button text={'Добавить'}
                      disabled={isDequeue || queueRef.current.isFull() || !text.length}
                      isLoader={isEnqueue}
                      type={"submit"}
                      data-cy={'submit'}
              />
              <Button text={'Удалить'}
                      onClick={remove}
                      disabled={isEnqueue || queueRef.current.isEmpty()}
                      isLoader={isDequeue}
                      type={"button"}
                      data-cy={'remove'}
              />
              <Button text={'Очистить'}
                      disabled={isEnqueue || isDequeue}
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
