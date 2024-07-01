'use client'

import { NarrowArrowLeftIcon } from '@/icons'
import { Link } from '@chakra-ui/next-js'
import { Box, Button, Flex, Heading, HStack, Text, useMediaQuery, VStack } from '@chakra-ui/react'
import { PageContent, SocialShare } from '@notice-org/renderer-helper'
import '@notice-org/renderer-helper/dist/style.css'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { AuthorSocial } from './AuthorSocial'

interface Props {
	data: any
}

export const SubPageComponents = ({ data }: Props) => {
	const formattedDate = useMemo(() => dayjs(data?.createdAt).format('MMM D, YYYY'), [data?.createdAt])

	const [isBigScreen] = useMediaQuery('(min-width: 1350px)', {
		ssr: true,
		fallback: false, // return false on the server, and re-evaluate on the client side
	})

	function removeFirstElement(arr: any[]) {
		const newArr = arr.slice()
		newArr.shift()
		return newArr
	}

	const filteredContent = useMemo(() => removeFirstElement(data?.content ?? []), [data])

	const homeHref = process.env.NODE_ENV === 'production' ? '/' : `/?target=${data.projectId}`

	return (
		<Box>
			<Box as="section" mt={{ base: '30px', lg: '60px' }} w="100%" h="100%">
				<Flex position="relative" maxW="1260px" justify="center" align="flex-start" mx="auto">
					{isBigScreen && (
						<VStack position="absolute" left="-1%" p={'1px 4px 4px'}>
							<Link
								_hover={{ textDecoration: 'none', color: 'primary' }}
								w="100%"
								mb={1}
								variant="unstyled"
								href={homeHref}
							>
								<HStack justify="start" align="center" w={'100%'} gap={2}>
									<NarrowArrowLeftIcon size={16} color="gray" />
									<Text color="gray.500">All Posts</Text>
								</HStack>
							</Link>
							{data?.author != undefined && (
								<AuthorSocial size="lg" authorSrc={data?.author.picture} authorName={data?.author.name} />
							)}
							<SocialShare />
						</VStack>
					)}
					<Flex
						maxW="700px"
						margin="auto"
						w="100%"
						direction="column"
						h="fit-content"
						justify="center"
						align="flex-start"
						px={{ base: '24px', md: '0px' }}
					>
						<VStack w="100%" mb={'36px'} justify="center" align="flex-start">
							{!isBigScreen && (
								<Button
									size="sm"
									variant={'outline'}
									as={Link}
									href={homeHref}
									leftIcon={<NarrowArrowLeftIcon size={16} color="black" />}
									iconSpacing={2}
									colorScheme="gray"
									my={2}
									fontWeight={500}
									_hover={{ textDecoration: 'none' }}
								>
									All Posts
								</Button>
							)}
							<Text mb={2} fontSize="md" color="fg.muted">
								Published on {formattedDate}
							</Text>
							<Heading as="h1" fontSize="42px" fontWeight={700} lineHeight={1.2}>
								{data.title}
							</Heading>
							{data?.author != undefined && !isBigScreen && (
								<AuthorSocial size="sm" authorSrc={data?.author.picture} authorName={data?.author.name} />
							)}
						</VStack>
						<PageContent blocks={filteredContent} />
						<HStack my="24px" justify="center" align="center" w="100%">
							<SocialShare />
						</HStack>
					</Flex>
				</Flex>
			</Box>
		</Box>
	)
}
