import React from 'react';
import styled from 'styled-components';
import { baseFontProperties } from '../shared/constants';

const TabsStyled = styled.div`
  background-color: ${(p) => p.theme.colors.accent50};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 30px;
  border-radius: 10px;
`;

const TabStyled = styled.button<{ active: boolean }>`
  background-color: ${(p) => p.theme.colors.accent200};
  border: 3px solid ${(p) => (p.active ? p.theme.colors.accent400 : p.theme.colors.accent200)};
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 6px;
  min-width: 100px;
  transition: border-color 0.2s, background-color 0.2s;

  ${baseFontProperties}
  font-size: 1.1rem;
  font-weight: bold;

  &:focus,
  &:hover {
    outline: none;
    background-color: ${(p) => p.theme.colors.accent300};
    border: 3px solid ${(p) => (p.active ? p.theme.colors.accent400 : p.theme.colors.accent300)};
  }

  ${(p) => p.theme.mediaQueries.md} {
    margin: 0 10px;
  }
`;

type TabsProps<Item> = {
  items: Item[];
  selectedItem: Item;
  labelAccessor: (i: Item) => string;
  valueAccessor: (i: Item) => string;
  onChange: (i: Item) => void;
  style?: React.CSSProperties;
};
function Tabs<Item>(props: TabsProps<Item>) {
  const { items, selectedItem, labelAccessor, valueAccessor, onChange, style } = props;

  return (
    <TabsStyled style={style}>
      {items.map((item) => (
        <TabStyled
          role="tab"
          key={valueAccessor(item)}
          onClick={() => onChange(item)}
          active={valueAccessor(item) === valueAccessor(selectedItem)}
          aria-selected={valueAccessor(item) === valueAccessor(selectedItem)}
        >
          {labelAccessor(item)}
        </TabStyled>
      ))}
    </TabsStyled>
  );
}

export default Tabs;
