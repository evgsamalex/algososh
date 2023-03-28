import reverseElements from "./reverse";
import {IElement} from "../types/structures/element";

const elementsToString = (elements: IElement<string>[]): string => {
  return elements.map(x => x.value).join('');
}

const reverseText = (str: string) => {
  return str.split('').reverse().join('');
}

type TestData = {
  name: string,
  text: string,
}

const data: TestData[] = [
  {name: "Разворот строки с четным количеством символов", text: '1234'},
  {name: "Разворот строки с нечетным количеством символов", text: '12345'},
  {name: "Разворот строки с одним символом", text: '1'},
  {name: "Разворот пустой строки", text: ''},
]

describe.each<TestData>(data)('Тест строки', ({name, text}) => {
  it(name, () => {
    let lastState: IElement<string>[] = [];
    for (let state of reverseElements(text)) {
      lastState = state;
    }

    expect(elementsToString(lastState)).toBe(reverseText(text));
  })
})
