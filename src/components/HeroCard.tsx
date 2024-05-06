'use client'
import { Link } from '@chakra-ui/next-js'
import { AbsoluteCenter, Box, Circle, Flex, Heading, HStack, Tag, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { DEFAULT_COLOR } from '../utils/theme'

interface Props {
	page: any
	containerWidth: number
	accentColor?: string
	isVisible: boolean
	onNext: (e: React.MouseEvent<HTMLElement>) => void
	onPrev: (e: React.MouseEvent<HTMLElement>) => void
	currentIndex: number
}

const variants = {
	enter: {
		opacity: 0.6,
	},
	center: {
		opacity: 1,
		transition: {
			opacity: { duration: 0.2 },
			type: 'spring',
			stiffness: 1000,
			damping: '10',
			delay: 0.5,
		},
	},
	exit: {
		opacity: 0.3,
	},
}

export const HeroCard = ({ page, containerWidth, isVisible, accentColor, onNext, onPrev, currentIndex }: Props) => {
	const formattedDate = useMemo(() => dayjs(page?.createdAt).format('MMM D, YYYY'), [page?.createdAt])

	const bgImage =
		page?.coverImage === '-' || !page?.coverImage
			? 'https://assets-notice.b-cdn.net/renderer/image-not-found-in-blog.svg'
			: page?.coverImage

	const primaryTag = useMemo(() => {
		const tag = page?.tags[0]
		if (!tag) return undefined
		return tag.charAt(0).toUpperCase() + tag.slice(1)
	}, [page?.tags])

	if (!isVisible) return null

	return (
		<Link w="fit-content" h="fit-content" href={page?.slug || page?._id}>
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
				variants={variants}
				initial="enter"
				animate="center"
				exit="exit"
			>
				<Flex
					as={motion.div}
					position="absolute"
					bottom={20}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
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
								<Tag size="md" variant="solid" bg={page?.accentColor ?? DEFAULT_COLOR} color="white">
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

				<HStack position="absolute" bottom={10} w="100%" justify="center" align="center" gap={2}>
					<SliderButton onClick={onNext} accentColor={accentColor} isActive={currentIndex === 0} />
					<SliderButton onClick={onPrev} accentColor={accentColor} isActive={currentIndex === 1} />
				</HStack>
			</Box>
		</Link>
	)
}

interface BProps {
	onClick: (e: React.MouseEvent<HTMLElement>) => void
	accentColor?: string
	isActive?: boolean
}

const SliderButton = ({ onClick, isActive }: BProps) => {
	return (
		<Box position="relative" w="20px" h="20px" borderRadius="50%" border="3px solid white" onClick={onClick}>
			<AbsoluteCenter>{isActive && <Box w="12px" h="12px" borderRadius="50%" bgColor={'white'} />}</AbsoluteCenter>
		</Box>
	)
}
