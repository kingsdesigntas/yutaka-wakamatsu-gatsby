import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import { Text, Box } from "@chakra-ui/core"
import Container from "../components/Container"
import Copy from "../components/Copy"
import TestimonialCarousel from "../components/TestimonialCarousel"
import { MdFormatQuote } from "react-icons/md"

const TestimonialsPageTemplate = ({
  title,
  description,
  content,
  testimonials = [],
  isPreview = false,
}) => {
  return (
    <Layout isPreview={isPreview}>
      {!isPreview ? (
        <SEO title={title} description={description} />
      ) : (
        <Box bg="white" borderBottom="1px" borderBottomColor="gray.300">
          <Box bg="white" textAlign="center" fontSize="xl" p="4">
            <Text fontSize="sm" textAlign="left" fontWeight="bold">
              Meta Title
            </Text>
            {title}
          </Box>
          <Box bg="white" textAlign="center" p="4">
            <Text fontSize="sm" textAlign="left" fontWeight="bold">
              Meta Description
            </Text>
            {description}
          </Box>
        </Box>
      )}
      {(title || content) && (
        <Container py={[10, null, 20]}>
          <Text fontSize="3xl" mb="4">
            {title}
          </Text>
          <Copy>{content}</Copy>
        </Container>
      )}
      {(testimonials?.length || isPreview) && (
        <Box bg="blue.500-10" py={[10]}>
          <Box maxW="3xl" mx="auto" px="2">
            {isPreview ? (
              <Text fontSize="lg" fontWeight="bold">
                Testimonials
              </Text>
            ) : (
              <Box>
                {testimonials.map(({ name, text }, index) => (
                  <Box pb="4" mb="20" key={index}>
                    <Text fontSize="lg">
                      <Text as={"span"} display="inline-block" fontSize="2xl">
                        <MdFormatQuote />
                      </Text>
                      {text}
                      <Text as={"span"} display="inline-block" fontSize="2xl">
                        <MdFormatQuote />
                      </Text>
                    </Text>
                    <Text mt="4" textAlign="right" fontWeight="bold">
                      - {name}
                    </Text>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Layout>
  )
}

export default TestimonialsPageTemplate
