import { GetStaticProps } from 'next';
import React from 'react';
import NextLink from 'next/link';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Container
} from '@chakra-ui/react';
import { prisma } from '../lib/prisma';
import Head from 'next/head';

export const getStaticProps: GetStaticProps = async () => {
  const albums = await prisma.album.findMany({
    include: { Artist: true },
    orderBy: { id: 'desc' }
  });
  return {
    props: {
      albums
    }
  };
};

export default ({ albums }) => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta property="og:title" content="Home" key="title" />
        <meta
          property="og:description"
          content="Songs of Various Artists from different albums"
          key="description"
        />
      </Head>
      <Container maxW="container.md" mb={10}>
        <Table
          variant="striped"
          colorScheme="gray"
          className="table-auto w-full"
        >
          <Thead className="">
            <Tr className="text-left">
              <Th>Album</Th>
              <Th>Artist</Th>
              <Th>Link</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr className="">
              <Td>Random Songs</Td>
              <Td>Various Artists</Td>
              <Td>
                <NextLink href="/random" passHref>
                  <Link>Listen</Link>
                </NextLink>
              </Td>
            </Tr>
            {albums?.map((album) => (
              <Tr key={album.id} className="">
                <Td>{album.name}</Td>
                <Td>
                  <NextLink href={`/artists/${album.artistId}`} passHref>
                    <Link>{album.Artist.name}</Link>
                  </NextLink>
                </Td>
                <Td>
                  <NextLink href={`/albums/${album.id}`} passHref>
                    <Link>Listen</Link>
                  </NextLink>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    </>
  );
};
