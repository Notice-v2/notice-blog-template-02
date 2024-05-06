'use client'

import { Flex } from '@chakra-ui/react'
import { ArticlesGrid } from './ArticlesGrid'
import { Hero } from './Hero'

interface Props {
	data: any
}

export const HomeComponents = ({ data }: Props) => {
	return (
		<Flex gap={4} w="100%" h="100vh" direction={{ base: 'column', lg: 'row' }}>
			<Hero page={data?.pages[0]} />

			{/* Main Content Area */}
			<ArticlesGrid pages={data?.pages.slice(1)} />
		</Flex>
	)
}
