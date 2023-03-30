import React, {FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import Form from "../ui/form/form";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import CircleList from "../ui/circle-list/circle-list";
import Container from "../container/Container";
import {IElement} from "../../types/structures/element";
import {useFetching} from "../../hooks/useFetching";
import {withDelay} from "../../services/utils";
import fibonacci from "../../services/fibonacci";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import FieldSet from "../ui/fieldset/fieldset";

export const FibonacciPage: React.FC = () => {
  const [number, setNumber] = useState<number>(0);
  const [numbers, setNumbers] = useState<IElement<number>[]>([]);

  const [isLoading, , fetching] = useFetching(async () => {
    await run(number);
  });

  const onSubmit = (e: FormEvent) => {
    setNumbers([]);
    e.preventDefault();
    fetching();
  }

  const run = async (number: number) => {
    await withDelay(fibonacci(number), item => {
      setNumbers(prevState => [...prevState, item]);
    }, SHORT_DELAY_IN_MS)
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <Container
        control={
          <Form onSubmit={fetching}>
            <FieldSet>
              <Input max={19}
                     isLimitText
                     onChange={(e) => setNumber(Number(e.currentTarget.value))}
                     disabled={isLoading}
                     type={'number'}
                     data-cy={'input'}
                     value={number}
              />
              <Button text={'Рассчитать'}
                      onClick={onSubmit}
                      disabled={number < 1 || number > 19}
                      isLoader={isLoading}
                      type={"submit"}
                      data-cy={'submit'}
              />
            </FieldSet>
          </Form>
        }>
        <CircleList items={numbers} extraClassName={'mt-40'} showIndex/>
      </Container>
    </SolutionLayout>
  );
};
