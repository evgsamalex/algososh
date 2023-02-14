import React, {FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {withDelay} from "../../services/utils";
import reverseElements from "../../services/reverse";
import {useFetching} from "../../hooks/useFetching";
import Container from "../container/Container";
import CircleList from "../ui/circle-list/circle-list";
import {IElement} from "../../types/structures";
import Form from "../ui/form/form";

export const StringComponent: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [letters, setLetters] = useState<IElement<string>[]>([]);

    const [isLoading, , fetching] = useFetching(async () => {
      await reverse(text);
    });

    const onSubmit = async (e: FormEvent) => {
      e.preventDefault();
      await fetching();
    }

    const reverse = async (text: string) => {
      await withDelay(reverseElements(text), item => {
        setLetters([...item]);
      })
    }

    return (
      <SolutionLayout title="Строка">
        <Container
          control={
            <Form onSubmit={fetching}>
              <Input maxLength={11}
                     isLimitText
                     onChange={(e) => setText(e.currentTarget.value)}
                     disabled={isLoading}/>
              <Button text={'Развернуть'}
                      disabled={text.length === 0}
                      onClick={onSubmit}
                      isLoader={isLoading}
                      type={"submit"}/>
            </Form>
          }>
          <CircleList items={letters} extraClassName={'mt-40'}/>
        </Container>
      </SolutionLayout>
    );
  }
;
