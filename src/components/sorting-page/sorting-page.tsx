import React, {useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import Form from "../ui/form/form";
import {Button} from "../ui/button/button";
import Container from "../container/Container";
import {useFetching} from "../../hooks/useFetching";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Direction} from "../../types/direction";
import {bubbleGenerator, randomArr, selectGenerator} from "../../services/sort";
import {IElement} from "../../types/structures";
import {Column} from "../ui/column/column";
import {withDelay} from "../../services/utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

enum SortType {
  select = 'select',
  bubble = 'bubble'
}

export const SortingPage: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.bubble);

  const [items, setItems] = useState<IElement<number>[]>([]);

  const [ascending, ,runAscending] = useFetching(async ()=> await sort(Direction.Ascending));
  const [descending, ,runDescending] = useFetching(async ()=> await sort(Direction.Descending));

  const sort = async (sorting: Direction) => {
    const sortGenerator = sortType === SortType.select ? selectGenerator : bubbleGenerator;

    const arr = items.map(x=>{x.default(); return x});

    await withDelay(sortGenerator(arr, sorting), item=>{
      setItems([...item]);
    }, SHORT_DELAY_IN_MS)
  }

  const createArray = () => {
    const arr = randomArr();
    setItems(arr);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <Container
        control={
          <Form align={'center'}>
            <RadioInput label={'Выбор'} value={SortType.select} checked={sortType === SortType.select}
                        extraClass={'mr-20'}
                        onChange={() => setSortType(SortType.select)}
                        disabled={ascending || descending}
            />
            <RadioInput label={'Пузырек'} value={SortType.bubble} checked={sortType === SortType.bubble}
                        extraClass={'mr-20'}
                        onChange={()=> setSortType(SortType.bubble)}
                        disabled={ascending || descending}
            />
            <Button text={'По возрастанию'}
                    isLoader={ascending}
                    type={"button"}
                    sorting={Direction.Ascending}
                    onClick={runAscending}
                    disabled={descending || !items.length}
                    style={{width: '220px'}}
            />
            <Button text={'По убыванию'}
                    isLoader={descending}
                    type={"button"}
                    sorting={Direction.Descending}
                    onClick={runDescending}
                    disabled={ascending || !items.length}
                    style={{width: '220px'}}
            />
            <Button text={'Новый массив'}
                    onClick={createArray}
                    disabled={ascending || descending}
                    type={"button"}
                    extraClass={'ml-20'}
            />
          </Form>
        }>
        <div style={{display: "flex", gap: '12px', alignItems:"end", height:'340px'}} className={'mt-20'}>
          {
            items.map((item)=> (
              <Column index={item.value} key={item.index} state={item.state} />
            ))
          }
        </div>
      </Container>
    </SolutionLayout>
  );
};
