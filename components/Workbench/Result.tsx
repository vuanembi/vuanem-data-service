import { FC, useEffect } from 'react';

import { Flex, Collapse, Button, Link, useToast } from '@chakra-ui/react';

import { FaCloudDownloadAlt } from 'react-icons/fa';

type ResultProps = {
    url: string;
};

const Result: FC<ResultProps> = ({ url }) => {
    const toast = useToast();

    useEffect(() => {
        url &&
            toast({
                title: 'Link Generated',
                description: 'Link will be valid for 1 hour',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
    }, [toast, url]);

    return (
        <Collapse in={!!url}>
            <Flex w="full" p={4} justifyContent="flex-end" borderWidth={1}>
                <Link w="full" isExternal href={url} variant="button">
                    <Button
                        w="full"
                        rightIcon={<FaCloudDownloadAlt fill="white" />}
                        colorScheme="blue"
                    >
                        Download
                    </Button>
                </Link>
            </Flex>
        </Collapse>
    );
};
export default Result;
