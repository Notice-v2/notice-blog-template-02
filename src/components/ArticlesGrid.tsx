'use client'

import { useSelectedTag } from '@/providers/selectedTagProvider'
import { Box, Divider, Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import { motion, useInView } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { ArticleCard } from './ArticleCard'
import { TagsGroup } from './TagsGroup'

interface Props {
	pages: any[]
	accentColor?: string
}

export const ArticlesGrid = ({ pages, accentColor }: Props) => {
	const { selectedTag } = useSelectedTag()

	const ref = useRef(null)
	const isInView = useInView(ref)

	const tags: any = useMemo(() => pages.reduce((acc, page) => [...acc, ...(page?.tags ?? [])], []), [pages])

	const filteredArticles = useMemo(
		() =>
			selectedTag === 'All'
				? pages
				: pages.filter((page) => {
						return page?.tags?.includes(selectedTag)
				  }),
		[pages, selectedTag]
	)

	const container = {
		hidden: { opacity: isInView ? 1 : 0 },
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
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			viewport={{ once: true }}
			boxSizing="border-box"
			overflow="auto"
			mx="auto"
			mb="10px"
			px={6}
			pt={2}
			pb={12}
			w={{ base: '100%', lg: '50%' }}
			maxW="900px"
			layout
			layoutRoot
		>
			<Flex
				mb={2}
				gap={{ base: '6px', md: '12px' }}
				direction={{ base: 'column', md: 'row' }}
				justify="space-between"
				align="center"
			>
				<Heading
					id="all-posts"
					flexShrink={0}
					fontWeight="bold"
					as="h1"
					fontSize={{ base: '2xl', lg: '4xl' }}
					color="blackAlpha.800"
				>
					All posts
				</Heading>
				<TagsGroup tags={tags} activeTag={selectedTag} accentColor={accentColor} />
			</Flex>
			<Divider mb={12} orientation="horizontal" color="gray.400" />
			<SimpleGrid
				ref={ref}
				as={motion.div}
				variants={container}
				initial={isInView ? 'show' : 'hidden'}
				whileInView="show"
				viewport={{ once: true }}
				gridAutoRows="1fr"
				columns={{ base: 1, sm: 2, md: 2 }}
				gap="46px"
				justifyContent="stretch"
			>
				{filteredArticles.map((page) => (
					<ArticleCard key={page.id} page={page} accentColor={accentColor} />
				))}
			</SimpleGrid>
		</Box>
	)
}
