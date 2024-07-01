'use client'

import { Avatar, Text, VStack } from '@chakra-ui/react'
import { SocialShare } from '@notice-org/renderer-helper'
import { Author } from './Author'

interface Props {
	authorSrc: string
	authorName: string
	size: 'sm' | 'lg'
}

export const AuthorSocial = ({ authorSrc, authorName, size }: Props) => {
	return size === 'sm' ? (
		<ForSmallScreen authorSrc={authorSrc} authorName={authorName} size={size} />
	) : (
		<ForLargeScreen authorSrc={authorSrc} authorName={authorName} size={size} />
	)
}

const ForLargeScreen = ({ authorSrc, authorName }: Props) => {
	return (
		<VStack justifyContent="center" align="center" maxW="235px" gap={4} flexGrow={0} flexBasis="min-content">
			<VStack w={'100%'} justify="center" align="start" gap={1}>
				<Avatar name={authorName} src={authorSrc} size="2xl" />
				<Text color={'gray.600'} noOfLines={2} overflowWrap={'anywhere'} as="h4" fontSize="md">
					by {authorName}
				</Text>
			</VStack>
		</VStack>
	)
}

const ForSmallScreen = ({ authorSrc, authorName }: Props) => {
	return (
		<VStack spacing={4} align="center" justify="flex-start">
			<Author author={{ name: authorName, picture: authorSrc }} size={'xs'} />
			<SocialShare />
		</VStack>
	)
}
