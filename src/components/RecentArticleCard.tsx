'use client'

import { Link as ChakraLink, Text, VStack } from '@chakra-ui/react'
import { useIsHovered } from '@notice-org/renderer-helper'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRef } from 'react'
import { ScalingImage } from './ScalingImage'

interface Props {
	page: any
}

export const RecentArticleCard = ({ page }: Props) => {
	const ref = useRef<HTMLDivElement>(null)
	const isHovered = useIsHovered([ref]).some(Boolean)

	const item = {
		hidden: { opacity: 0 },
		show: { opacity: 1 },
	}

	return (
		<ChakraLink _hover={{ textDecoration: 'none' }} variant="unstyled" as={Link} href={page?.slug || page?._id}>
			<VStack as={motion.div} variants={item} ref={ref} align="flex-start" w={'200px'} h="auto" spacing="12px">
				<ScalingImage src={page?.coverImage} isParentHovered={isHovered} />
				<Text fontWeight={600} noOfLines={2} overflowWrap="anywhere" as="h5" fontSize="md" color="blackAlpha.800">
					{page.title}
				</Text>
			</VStack>
		</ChakraLink>
	)
}
