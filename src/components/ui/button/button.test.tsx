import renderer from 'react-test-renderer'
import {Button} from "./button";
import {render, screen, fireEvent} from "@testing-library/react";

it('Кнопка с текстом', () => {
  const tree = renderer
    .create(<Button type={"button"} text={'text'}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Кнопка без текста', () => {
  const tree = renderer
    .create(<Button type={"button"}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Заблокированная кнопка', () => {
  const tree = renderer
    .create(<Button type={"button"} disabled/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Кнопка с индикацией загрузки', () => {
  const tree = renderer
    .create(<Button type={"button"} isLoader/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Клик по кнопке', () => {
  window.alert = jest.fn();

  const text = 'click';

  render(<Button text={'click'} onClick={() => {
    alert(text)
  }}/>)

  const button = screen.getByText(text);

  fireEvent.click(button);

  expect(window.alert).toHaveBeenCalledWith(text);
})


