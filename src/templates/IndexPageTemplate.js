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

const Section = ({ image = null, title = null, text = null, actions = [] }) => {
  return (
    <Box as="section">
      <Container>
        <Grid templateColumns={["100%", , "2fr 3fr"]} gap="5">
          <Box>
            {image?.childImageSharp?.fluid && (
              <Box maxW="sm" mx="auto">
                <Img fluid={image.childImageSharp.fluid} />
              </Box>
            )}
          </Box>
          <Box>
            <Text fontSize={["2xl", "3xl"]} as="h1" mb="3">
              {title}
            </Text>
            {text && <Copy>{text}</Copy>}
            {actions?.length && (
              <Box pt="6">
                <Stack isInline spacing="5">
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      as={Link}
                      to={action.url}
                      px="6"
                      variant="outline"
                      variantColor={
                        action.variant === "secondary" ? "blue" : "red"
                      }
                    >
                      {action.title}
                    </Button>
                  ))}
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
}) => {
  const sections = [, , ,].fill({
    title: "Craniosacral Therapy",
    text: (
      <p>
        Remedial massage is a manual manipulation of soft tissue which aims to
        treat muscles that are damaged, knotted, tense or immobile. It is useful
        for a number of body dysfunctions that affect the muscles, tendons and
        bones.
      </p>
    ),
    //image: hero.image,
    actions: [
      { url: "/", title: "Book now" },
      { url: "/", title: "More info", variant: "secondary" },
    ],
  })
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
      <Box bg="blue.500-10" py={[10]}>
        <Box maxW="2xl" mx="auto" px="2">
          <Text fontSize={["2xl", "3xl"]} mb="3" textAlign="center">
            Carousel of testimonials?
          </Text>
        </Box>
      </Box>
      {sections?.length && (
        <Grid gridTemplateColumns="100%" gap={[10, , 20]} py={[10, , 20]}>
          {sections.map((section, index) => (
            <Section
              key={index}
              title={section.title}
              text={section.text}
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
