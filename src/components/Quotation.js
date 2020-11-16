import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ResultDiv = styled.div`
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  padding: 0 10px 0 10px;
`;
const Price = styled.p`
  font-size: 30px;

  span {
    font-weight: bold;
  }
`;
const Info = styled.p`
  font-size: 18px;

  span {
    font-weight: bold;
  }
`;

const Quotation = ({ result }) => {
  if (Object.keys(result).length === 0) return null;

  return (
    <ResultDiv>
      <Price>The price is: <span>{result.PRICE}</span></Price>
      <Info>The highest price of the day: <span>{result.HIGHDAY}</span></Info>
      <Info>The most down price of the day: <span>{result.LOWDAY}</span></Info>
      <Info>Variation last 24 hours: <span>{result.CHANGEPCT24HOUR}</span></Info>
      <Info>The last update: <span>{result.LASTUPDATE}</span></Info>
    </ResultDiv>
  );
}

Quotation.propTypes = {
  result: PropTypes.object.isRequired
};

export default Quotation;