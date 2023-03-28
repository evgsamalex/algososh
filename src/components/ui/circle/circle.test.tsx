import renderer from "react-test-renderer";
import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";

it('Кружок без буквы', () => {
  const tree = renderer
    .create(<Circle/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Кружок с буквами', () => {
  const tree = renderer
    .create(<Circle letter={'123'}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Кружок с head', () => {
  const tree = renderer
    .create(<Circle letter={'H'} head={'h'}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Кружок с react-элементом в head', () => {
  const tree = renderer
    .create(<Circle letter={'H'} head={<Circle isSmall letter={'h'}/>}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Кружок с tail', () => {
  const tree = renderer
    .create(<Circle letter={'T'} tail={'t'}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Кружок с react-элементом в tail', () => {
  const tree = renderer
    .create(<Circle letter={'T'} tailType={"element"} tail={<Circle letter={'t'}/>}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Кружок c index', () => {
  const tree = renderer
    .create(<Circle index={1}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Кружок с пропcом isSmall ===  true', () => {
  const tree = renderer
    .create(<Circle isSmall/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Кружок default', () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Default}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Кружок changing', () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Changing}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Кружок modified', () => {
  const tree = renderer
    .create(<Circle state={ElementStates.Modified}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
