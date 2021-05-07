import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import NowWhat from './components/NowWhat';
import {clientApollo} from './graphQLQueries/index'
import SelectMetrics from './components/SelectMetrics'
import Chart from './components/Chart'
import RealTimeMetrics from './components/RealTimeMetrics'
const store = createStore();


const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <ApolloProvider client={clientApollo}>
      <CssBaseline />
        <Provider store={store}>
           <Wrapper>
              <Header />
        {/* <NowWhat /> */}
        <SelectMetrics />
        <RealTimeMetrics />
        <Chart />
      </Wrapper>
    </Provider>
    </ApolloProvider>
  </MuiThemeProvider>
);

export default App;
