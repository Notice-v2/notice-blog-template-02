'use client'

import { ArrowLeft, ArrowRight } from '@/icons'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { useHorizontalScrollShadow, useIsHovered } from '@notice-org/renderer-helper'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { RecentArticleCard } from './RecentArticleCard'

interface Props {
	pages: any[]
}

export const RecentArticles = ({ pages }: Props) => {
	const childRef = useRef<HTMLDivElement>(null)
	const parentRef = useRef<HTMLDivElement>(null)

	const [showStart, showEnd] = useHorizontalScrollShadow(childRef, pages)
	const isHovered = useIsHovered([parentRef, childRef]).some(Boolean)

	const scrollHorizontally = (scrollOffset: number) => {
		if (!childRef.current) return

		childRef.current.scrollLeft += scrollOffset
	}

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	}

	return (
		<Box
			as={motion.div}
			initial={{ opacity: 0, y: 200 }}
			animate={{ opacity: 1, y: 0 }}
			position="relative"
			boxSizing="border-box"
			mx="auto"
			p={{ base: '24px', md: '32px', lg: '60px' }}
			w="100%"
			maxW="1260px"
			borderRadius="4px"
			bgColor={'gray.50'}
			ref={parentRef}
		>
			<Heading fontWeight="bold" as="h1" fontSize={{ base: '2xl', lg: '4xl' }} mb={6} color="blackAlpha.800">
				Recent Posts
			</Heading>

			<Flex
				as={motion.div}
				variants={container}
				initial="hidden"
				whileInView="show"
				viewport={{ once: true }}
				ref={childRef}
				overflow="scroll"
				flexDirection="row"
				justifyContent="start"
				gap="30px"
			>
				{pages.map((page) => (
					<RecentArticleCard key={page.id} page={page} />
				))}
			</Flex>
			{showEnd && isHovered && (
				<Flex
					position="absolute"
					height="40px"
					width="40px"
					borderRadius="full"
					top={'50%'}
					right={'10px'}
					background="rgba(0, 0, 0, .5)"
					justify="center"
					align="center"
					zIndex={1}
					cursor="pointer"
					onClick={() => scrollHorizontally(80)}
				>
					<ArrowRight size={30} color="white" />
				</Flex>
			)}

			{showStart && isHovered && (
				<Flex
					position="absolute"
					height="40px"
					width="40px"
					borderRadius="full"
					top={'50%'}
					left={'10px'}
					background="rgba(0, 0, 0, .5)"
					justify="center"
					align="center"
					zIndex={1}
					cursor="pointer"
					onClick={() => scrollHorizontally(-80)}
				>
					<ArrowLeft size={30} color="white" />
				</Flex>
			)}
		</Box>
	)
}
