'use client'

import { Flex } from '@chakra-ui/react'
import { useMemo } from 'react'
import { ArticlesGrid } from './ArticlesGrid'
import { Hero } from './Hero'

interface Props {
	data: any
}

export const HomeComponents = ({ data }: Props) => {
	const heroElements = useMemo(() => (data?.pages.length >= 3 ? data?.pages.slice(0, 2) : data?.pages.slice(0, 1)), [])
	const mainArticles = useMemo(() => (data?.pages.length >= 3 ? data?.pages.slice(2) : data?.pages.slice(1)), [])

	return (
		<Flex gap={4} w="100%" h="100vh" direction={{ base: 'column', lg: 'row' }}>
			<Hero pages={heroElements} />
			<ArticlesGrid pages={mainArticles} />
		</Flex>
	)
}
