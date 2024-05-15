'use client'

import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { HeroCard } from './HeroCard'

interface Props {
	pages: any[]
}

export const Hero = ({ pages }: Props) => {
	const interval = 15000
	const [containerWidth, setContainerWidth] = useState(0)

	const [activeIndex, setActiveIndex] = useState(0)

	const nextSlide = (e: React.MouseEvent<HTMLElement>) => {
		if (e) {
			e.preventDefault()
		}
		setActiveIndex((prevIndex) => (prevIndex === pages.length - 1 ? 0 : prevIndex + 1))
	}
	const prevSlide = (e: React.MouseEvent<HTMLElement>) => {
		if (e) {
			e.preventDefault()
		}
		setActiveIndex((prevIndex) => (prevIndex === 0 ? pages.length - 1 : prevIndex - 1))
	}

	useEffect(() => {
		const autoPlayInterval = setInterval(nextSlide, interval)
		return () => {
			clearInterval(autoPlayInterval)
		}
	}, [interval])

	useEffect(() => {
		const handleResize = () => {
			setContainerWidth(window.innerWidth / 2)
		}

		window.addEventListener('resize', handleResize)

		handleResize()

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<Box position="relative" w={{ base: '100%', lg: '50%' }} h="100vh">
			{pages.map((page, index) => {
				return (
					<HeroCard
						page={page}
						key={page?._id}
						containerWidth={containerWidth}
						isVisible={activeIndex === index}
						onNext={nextSlide}
						onPrev={prevSlide}
						currentIndex={index}
						showControls={pages.length > 1}
					/>
				)
			})}
		</Box>
	)
}
