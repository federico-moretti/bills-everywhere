import React from 'react';
import styled from 'styled-components';
import loaderGif from '../assets/loader.gif';

const LoaderStyled = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.colors.background}40;

  img {
    max-width: 200px;
    aspect-ratio: 1;
  }
`;

type LoaderProps = {
  loading: boolean;
};
function Loader(props: LoaderProps) {
  const { loading } = props;

  if (loading) {
    return (
      <LoaderStyled role="progressbar" aria-busy={true}>
        <img alt="Loader" src={loaderGif} />
      </LoaderStyled>
    );
  }

  return null;
}

export default Loader;
