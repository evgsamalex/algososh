import {bubbleGenerator, selectGenerator} from "./sort";
import {Element, IElement} from "../types/structures/element";
import {Direction} from "../types/direction";

type TestData = {
  name: string,
  input: IElement<number>[],
}

type TMethod = 'select' | 'bubble';

const data: TestData[] = [
  {name: 'Пустой массив', input: []},
  {
    name: 'Массив из одного элемента', input: [
      new Element<number>(0, 1)
    ]
  },
  {
    name: 'Массив из нескольких элементов', input: [
      new Element<number>(0, 3),
      new Element<number>(1, 6),
      new Element<number>(2, 2),
      new Element<number>(3, 0),
    ]
  },
]

const sort = (arr: IElement<number>[], direction: Direction) => {
  arr.sort((a, b) => {
    return direction === Direction.Ascending ? a.value - b.value : b.value - a.value;
  })
  return arr;
}

const testSort = (input: IElement<number>[], direction: Direction, method: TMethod) => {
  let result: IElement<number>[] = [];
  const generator = method === "select" ? selectGenerator : bubbleGenerator;
  for (let state of generator(input, direction)) {
    result = state;
  }

  return result;
}

const methods: TMethod[] = ["select", "bubble"];

describe.each<TestData>(data)('Тесты сортировок', ({name, input}) => {
  for (let method of methods) {
    it(`${name} ${method}`, () => {
      const ascRes = testSort(input, Direction.Ascending, method);
      const ascSort = sort([...input], Direction.Ascending);
      expect(ascRes).toEqual(ascSort);

      const desRes = testSort(input, Direction.Descending, method);
      const desSort = sort([...input], Direction.Descending);
      expect(desRes).toEqual(desSort);
    })
  }
})
