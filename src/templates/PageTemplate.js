import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import { Text, Box } from "@chakra-ui/core"
import Container from "../components/Container"
import Copy from "../components/Copy"

const PageTemplate = ({ title, description, content, isPreview = false }) => {
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
      <Container py={[10, null, 20]}>
        <Copy>{content}</Copy>
      </Container>
    </Layout>
  )
}

export default PageTemplate
