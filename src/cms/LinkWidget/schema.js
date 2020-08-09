export default {
  properties: {
    collections: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        fields: {
          name: { type: "string" },
          searchFields: { type: "array", items: { type: "string" } },
          displayField: { type: "string" },
          valueField: { type: "string" },
        },
      },
    },
  },
  //required: ["collection", "valueField", "searchFields"],
}

// const linkSchema = {
//   properties: {
//     link: { type: "object" },
//   },
// }
// export default linkSchema
