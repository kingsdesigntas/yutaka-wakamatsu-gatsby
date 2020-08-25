import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import { Text, Box, Grid } from "@chakra-ui/core"
import Container from "../components/Container"
import Copy from "../components/Copy"
import { HeroSingle } from "../components/Hero"
import Img from "gatsby-image"

const PageTemplate = ({
  title,
  description,
  content,
  heroimage = null,
  isPreview = false,
  image = null,
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
      {heroimage && <HeroSingle title={title} image={heroimage} />}
      <Container py={[10, null, 20]}>
        <Grid templateColumns={["100%", null, "3fr 2fr", "3fr 1fr"]} gap="5">
          <Box>
            {!heroimage && (
              <Text fontSize="3xl" mb="4" as="h1">
                {title}
              </Text>
            )}
            <Copy dangerouslySetInnerHTML={{ __html: content?.html }} />
          </Box>
          <Box>
            {image && (
              <Box maxW="sm" mx="auto">
                {image?.childImageSharp ? (
                  <Img fluid={image.childImageSharp.fluid} />
                ) : (
                  <img src={image.url} alt={image.alt} />
                )}
              </Box>
            )}
          </Box>
        </Grid>
      </Container>
    </Layout>
  )
}

export default PageTemplate
