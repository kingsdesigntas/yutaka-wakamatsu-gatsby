import React from "react"
import { Link } from "gatsby"

import Layout from "../components/Layout"
//import Image from "../components/image"
import SEO from "../components/seo"
import Hero from "../components/Hero"
import { Text, Grid, Box, Stack } from "@chakra-ui/core"
import Container from "../components/Container"
import Img from "gatsby-image"
import Copy from "../components/Copy"
import Button from "../components/Button"
import TestimonialCarousel from "../components/TestimonialCarousel"
import { MdFormatQuote } from "react-icons/md"

const Section = ({
  image = null,
  title = null,
  content = null,
  actions = [],
}) => {
  return (
    <Box as="section">
      <Container>
        <Grid templateColumns={["100%", , "2fr 3fr"]} gap="5">
          <Box>
            {image && (
              <Box maxW="sm" mx="auto">
                {image.childImageSharp ? (
                  <Img fluid={image.childImageSharp.fluid} />
                ) : (
                  <img src={image.url} />
                )}
              </Box>
            )}
          </Box>
          <Box>
            <Text fontSize={["2xl", "3xl"]} as="h1" mb="3">
              {title}
            </Text>
            {content && <Copy>{content}</Copy>}
            {actions?.length && (
              <Box pt="6">
                <Stack isInline spacing="5">
                  {actions.map((action, index) => {
                    const linkProps = {}
                    let url
                    if (action.url) {
                      url = action.url
                    } else if (action.collection && action.slug) {
                      url = `${action.collection}/${action.slug}`
                    }
                    let as = Link
                    if (url) {
                      if (url.charAt(0) === "#") {
                        as = "a"
                      }
                      if (
                        url.substr(0, "http://".length) === "http://" ||
                        url.substr(0, "https://".length) === "https://"
                      ) {
                        as = "a"
                      }
                    }
                    if (as === "a") {
                      linkProps.href = url
                    } else {
                      linkProps.to = url
                    }
                    return (
                      <Button
                        key={index}
                        as={as}
                        {...linkProps}
                        px="6"
                        variant="outline"
                        variantColor={index === 0 ? "red" : "blue"}
                      >
                        {action.title}
                      </Button>
                    )
                  })}
                </Stack>
              </Box>
            )}
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}

const IndexPageTemplate = ({
  hero,
  title,
  description,
  main,
  isPreview = false,
  sections = [],
  testimonials = [],
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
      <Hero
        title={hero.title}
        text={hero.text}
        backgroundImage={hero.image}
        actions={[
          { url: "/", title: "Book now" },
          { url: "/", title: "More info", variant: "secondary" },
        ]}
      />
      <Container py={[10, , 20]}>
        <Grid templateColumns={["100%", , "3fr 2fr", "3fr 1fr"]} gap="5">
          <Box>
            <Text fontSize={["2xl", "3xl", "4xl"]} as="h1" mb="3">
              {main.title}
            </Text>
            <Copy dangerouslySetInnerHTML={{ __html: main.content }} />
          </Box>
          <Box>
            <Box maxW="sm" mx="auto">
              {main.image.childImageSharp ? (
                <Img fluid={main.image.childImageSharp.fluid} />
              ) : (
                <img src={main.image.url} />
              )}
            </Box>
          </Box>
        </Grid>
      </Container>
      {(testimonials?.length || isPreview) && (
        <Box bg="blue.500-10" py={[10]}>
          <Box maxW="3xl" mx="auto" px="2">
            {isPreview ? (
              <Text fontSize="lg" fontWeight="bold">
                Testimonials
              </Text>
            ) : (
              <TestimonialCarousel>
                {testimonials.map(({ name, text }, index) => (
                  <Box pb="4" key={index}>
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
              </TestimonialCarousel>
            )}
          </Box>
        </Box>
      )}
      {sections?.length && (
        <Grid gridTemplateColumns="100%" gap={[10, , 20]} py={[10, , 20]}>
          {sections.map((section, index) => (
            <Section
              key={index}
              title={section.title}
              content={section.content}
              image={section.image}
              actions={section.actions}
            />
          ))}
        </Grid>
      )}
    </Layout>
  )
}

export default IndexPageTemplate
