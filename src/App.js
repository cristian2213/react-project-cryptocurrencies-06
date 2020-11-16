import React, { useState, useEffect } from 'react';
import logo from './cryptomonedas.png';
import styled from '@emotion/styled';
import axios from 'axios';

import Form from './components/Form';
import Error from './components/Error';
import Quotation from './components/Quotation';
import Spinner from './components/Spinner';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 150px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {
  const [coin, saveCoin] = useState('');
  const [usecryptocurrency, saveCryptocurrency] = useState('');
  const [result, saveResult] = useState({});
  const [spinner, showSpinner] = useState(false);

  useEffect(() => {
    // doesn't load for the first time
    if (coin === '') return;

    // consult the api for get the quote
    const cosultCryptocurrency = async () => {
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${usecryptocurrency}&tsyms=${coin}`;
      const resultApi = await axios.get(url);

      showSpinner(true);

      setTimeout(() => {
        saveResult(resultApi.data.DISPLAY[usecryptocurrency][coin]);
        showSpinner(false);
      }, 3000);
    }
    cosultCryptocurrency();

  }, [coin, usecryptocurrency]);

  const component = (spinner) ? <Spinner /> : <Quotation result={result} />;

  return (
    <Container>
      <div>
        <Image src={logo} alt="cryptocurrency image" />
      </div>
      <div>
        <Heading>Quote Cryptocurrencies Instantly</Heading>
        <Form
          Error={Error}
          saveCoin={saveCoin}

          saveCryptocurrency={saveCryptocurrency}
        />
        {/* load spinner or result component */}
        {component}
      </div>


    </Container>
  );
}

export default App;
