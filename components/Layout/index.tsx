import { FC, PropsWithChildren } from 'react';

import { Center, Container } from '@chakra-ui/react';

const Layout: FC<PropsWithChildren> = ({ children }) => (
    <Container w="90%" h="90%" mt={20}>
        {children}
    </Container>
);

export default Layout;
