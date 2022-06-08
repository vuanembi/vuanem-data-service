import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';

import Layout from '../components/Layout';
import theme from '../styles/theme';

const App = ({ Component, pageProps }: AppProps) => (
    <ChakraProvider theme={theme}>
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </ChakraProvider>
);

export default App;
