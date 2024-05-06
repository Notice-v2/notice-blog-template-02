'use client'

import { Box, Circle, Flex, Heading, HStack, Tag, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_COLOR } from '../utils/theme'

interface Props {
	page: any
	accentColor?: string
}

export const Hero = ({ page, accentColor }: Props) => {
	const formattedDate = useMemo(() => dayjs(page?.createdAt).format('MMM D, YYYY'), [page?.createdAt])

	const [containerWidth, setContainerWidth] = useState(0)

	useEffect(() => {
		const handleResize = () => {
			setContainerWidth(window.innerWidth / 2)
		}

		// Add event listener on client side
		window.addEventListener('resize', handleResize)

		// Initial calculation on component mount
		handleResize()

		// Cleanup function to remove event listener
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const primaryTag = useMemo(() => {
		const tag = page?.tags[0]
		if (!tag) return undefined
		return tag.charAt(0).toUpperCase() + tag.slice(1)
	}, [page?.tags])

	const bgImage =
		page?.coverImage === '-' || !page?.coverImage
			? 'https://assets-notice.b-cdn.net/renderer/image-not-found-in-blog.svg'
			: page?.coverImage

	return (
		<Box as={Link} href={page?.slug || page?._id} position="relative" w={{ base: '100%', lg: '50%' }} h="100vh">
			<Box
				as={motion.div}
				bgImage={bgImage}
				bgSize="cover"
				bgRepeat="no-repeat"
				bgPosition={{ base: 'top', lg: 'center' }}
				position={{ base: 'inherit', lg: 'fixed' }}
				left={0}
				top={0}
				borderRightWidth={1}
				w={{ base: '100%', lg: containerWidth }}
				h={{ base: '450px', lg: '100%' }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { duration: 0.1, delay: 0.1, ease: [0, 0.71, 0.2, 1.01] } }}
			>
				<Flex
					as={motion.div}
					position="absolute"
					bottom={20}
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					transition="0.8 0.5 cubic-bezier(0, 0.71, 0.2, 1.01)"
					direction="column"
					align="start"
					justify="center"
					w="100%"
					p={{ base: 4, lg: 8 }}
				>
					<HStack w="100%" gap="6px" justify="flex-start" align="center">
						{primaryTag && (
							<>
								<Tag size="md" variant="solid" bg={accentColor ?? DEFAULT_COLOR} color="white">
									{primaryTag}
								</Tag>
								<Circle size="4px" bg="gray.200"></Circle>
							</>
						)}
						<Text pb={1} fontSize={{ base: 'xs', md: 'sm', lg: 'md' }} color={'gray.200'}>
							{formattedDate}
						</Text>
					</HStack>
					<Heading
						lineHeight={1.2}
						fontWeight="bold"
						as="h1"
						fontSize={{ base: '4xl', lg: '6xl' }}
						color="white"
						noOfLines={2}
					>
						{page?.title}
					</Heading>
				</Flex>
			</Box>
		</Box>
	)
}
