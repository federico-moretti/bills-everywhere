import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { baseFontProperties } from '../shared/constants';
import { useCurrency } from '../shared/hooks';
import { handleExecuteKeyActions } from '../shared/utils';
import { useAppActions, useAppSelector } from '../store';
import type { Merchant } from '../types';
import IconChevron from './IconChevron';

const MerchantAccordionStyled = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding: 20px 30px;
  border-radius: 10px;
  background-color: ${(p) => p.theme.colors.secondary50};
  border: 2px solid ${(p) => p.theme.colors.secondary400};
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s;
  overflow: hidden;

  &:hover,
  &:focus {
    background-color: ${(p) => p.theme.colors.secondary100};
    outline: none;
  }
`;

const TitleStyled = styled.h3`
  ${baseFontProperties}
  font-weight: bold;
  margin: 0 0 5px;
`;

const SubtitleStyled = styled.span`
  display: block;
  ${baseFontProperties}
  font-size: 0.8rem;
  color: ${(p) => p.theme.colors.font200};
`;

const ActionsStyled = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonStyled = styled.button`
  background-color: ${(p) => p.theme.colors.secondary200};
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 6px;
  min-width: 100px;
  border: none;
  transition: background-color 0.2s;

  ${baseFontProperties}
  font-weight: bold;

  &:hover,
  &:focus {
    outline: none;
    background-color: ${(p) => p.theme.colors.secondary300};
  }
`;

const HeaderStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ListStyled = styled(motion.ul)`
  margin: 0 20px;
  padding: 0;

  & > div {
    margin-top: 20px;
  }

  & li {
    margin-bottom: 10px;
    font-size: 0.9em;
  }
`;

const variants = {
  open: { opacity: 1, height: 'auto' },
  closed: { opacity: 0, height: 0 },
};

type MerchantAccordionProps = {
  merchant: Merchant;
  style?: React.CSSProperties;
};
function MerchantAccordion(props: MerchantAccordionProps) {
  const { merchant, style } = props;
  const { currency } = useCurrency();
  const theme = useTheme();
  const actions = useAppActions();

  const categories = useAppSelector((s) => s.categories);
  const category = categories.items.find(({ id }) => merchant.categoryId === id);

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleOpen = React.useCallback(() => setIsOpen((v) => !v), []);

  const changeBillStatus = React.useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();
      actions.actionMerchantsPatch({ id: merchant.id, isBill: !merchant.isBill });
    },
    [actions, merchant.id, merchant.isBill]
  );

  return (
    <MerchantAccordionStyled
      style={style}
      onClick={toggleOpen}
      onKeyDown={(e) => handleExecuteKeyActions(e, toggleOpen)}
      tabIndex={0}
    >
      <HeaderStyled>
        <div>
          <TitleStyled>{merchant.name}</TitleStyled>
          <SubtitleStyled>Transactions count: {merchant.transactions.length}</SubtitleStyled>
          {category && <SubtitleStyled>Category: {category?.name}</SubtitleStyled>}
        </div>
        <ActionsStyled>
          <ButtonStyled
            onClick={changeBillStatus}
            onKeyDown={(e) => handleExecuteKeyActions(e, () => changeBillStatus(e))}
            title={`${merchant.isBill ? 'Remove bill' : 'Add as bill'} - ${merchant.name}`}
          >
            {merchant.isBill ? 'Remove bill' : 'Add as bill'}
          </ButtonStyled>
          <IconChevron direction={isOpen ? 'top' : 'bottom'} color={theme.colors.secondary400} />
        </ActionsStyled>
      </HeaderStyled>
      <AnimatePresence>
        {isOpen && (
          <ListStyled initial="closed" animate="open" exit="closed" variants={variants}>
            <div>
              {merchant.transactions.map((transaction) => (
                <li data-testid="transaction" key={transaction.id}>
                  {Number(transaction.amount).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  {currency} ({new Date(transaction.date).toLocaleDateString()})
                </li>
              ))}
            </div>
          </ListStyled>
        )}
      </AnimatePresence>
    </MerchantAccordionStyled>
  );
}

export default MerchantAccordion;
