/** @jsx jsx */
import { css, jsx } from "@emotion/core"
//import CMS from "netlify-cms-app"
import styled from "@emotion/styled"
import React, { forwardRef, memo } from "react"
import { Async as AsyncSelect } from "react-select"
//import { FixedSizeList } from "react-window"
//import { find, isEmpty, last, debounce, get, uniqBy, sortBy } from "lodash"
import { reactSelectStyles } from "netlify-cms-ui-default"
import Modal from "react-modal"
import { Map } from "immutable"
//import { searchEntries } from "netlify-cms-core/dist/esm/actions/search"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

Modal.setAppElement("#nc-root")

const FormControl = styled.div``
const FormLabel = styled.label`
  font-size: 1rem;
  padding-right: 12px;
  padding-bottom: 4px;
  opacity: 1;
  font-weight: 500;
  text-align: left;
  vertical-align: middle;
  display: inline-block;
`
const Input = styled.input`
  width: 100%;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  appearance: none;
  font-size: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: rgb(255, 255, 255);
  transition: all 0.2s ease 0s;
  outline: none;
  border-radius: 0.25rem;
  border-width: 2px;
  border-color: #dfdfe3;
  border-style: solid;
  border-image: initial;
`
const FormHelp = styled.span`
  margin-bottom: 0.5rem;
  color: rgb(113, 128, 150);
  line-height: normal;
  font-size: 0.875rem;
`

const shouldUpdate = (prevProps, nextProps) => {
  return (
    prevProps.value === nextProps.value &&
    prevProps.hasActiveStyle === nextProps.hasActiveStyle &&
    prevProps.queryHits === nextProps.queryHits
  )
}

const LinkWidget = memo(
  forwardRef(
    (
      {
        value,
        field,
        forID,
        classNameWrapper,
        onChange,
        query,
        queryHits,
        setActiveStyle,
        setInactiveStyle,
        ...props
      },
      ref
    ) => {
      // const collections = [
      //   {
      //     name: "pages",
      //     searchFields: ["label"],
      //     displayField: "label",
      //     valueField: "slug",
      //   },
      // ]
      const collections = field.get("collections").toJS()

      const parseValue = raw => {
        return Map.isMap(raw) ? raw.toJS() : raw
      }

      const [isModalOpen, setIsModalOpen] = React.useState(false)

      const parsedValue = parseValue(value)
      const [formData, setFormData] = React.useState({
        title: "",
        url: "",
        object: "",
        ...parsedValue,
      })

      // useEffect(() => {
      //   onChange(formData)
      // }, [formData])

      const handleChange = e => {
        const newData = { [e.target.name]: e.target.value }
        setFormData({ ...formData, ...newData })
      }

      const handleSelectChange = e => {
        const newData = {
          slug: e.data.slug,
          collection: e.data.collection,
          label: e.label,
          value: e.value,
        }
        setFormData({ ...formData, ...newData })
      }

      const handleSubmit = e => {
        e.preventDefault()
        onChange(formData)
        setIsModalOpen(false)
      }

      //loadOPtions will return an array of arrays of hits. We need to flatten these out by collection
      //and turn into something that react-select will display
      const parseHitOptions = hits => {
        return hits.reduce((acc, collectionHits) => {
          collectionHits.forEach(hit => {
            const collection = collections.find(c => c.name === hit.collection)
            if (!collection) return //This should never happen...
            const label = hit[collection.displayField]
            const value = hit[collection.valueField]
            acc.push({ label, value, data: hit })
          })
          return acc
        }, [])
      }

      const loadOptions = async term => {
        const file = null
        const optionsLength = 20

        const options = await Promise.all(
          collections.map(collection =>
            query(
              forID,
              collection.name,
              collection.searchFields,
              term,
              file,
              optionsLength
            ).then(({ payload }) => {
              const hits = payload.response?.hits || []
              console.log({ hits })

              return hits
            })
          )
        )

        const parsedOptions = parseHitOptions(options)

        return parsedOptions
      }

      return (
        <div className={classNameWrapper} ref={ref}>
          <div
            css={css`
              display: flex;
            `}
          >
            <div
              css={css`
                flex-grow: 1;
              `}
            >
              <strong>Link</strong> - {formData.title} :{" "}
              {formData.label ? formData.label : formData.url}
            </div>
            <div>
              <button onClick={() => setIsModalOpen(true)}>Edit link</button>
            </div>
          </div>
          <Modal isOpen={isModalOpen} style={customStyles} contentLabel="Link">
            <button onClick={() => setIsModalOpen(false)}>close</button>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel for="link-title">Title</FormLabel>
                <FormHelp>What text should the link display?</FormHelp>
                <Input
                  id="link-title"
                  value={formData.title}
                  onChange={handleChange}
                  name="title"
                />
              </FormControl>
              <FormControl>
                <FormLabel for="link-url">URL</FormLabel>
                <FormHelp>
                  Specify a URL or select a page/post etc. below.
                </FormHelp>
                <Input
                  id="link-url"
                  value={formData.url}
                  onChange={handleChange}
                  name="url"
                />
              </FormControl>
              <FormControl>
                <FormLabel for="link-object">Select linked content</FormLabel>
                <AsyncSelect
                  menuPortalTarget={document.body}
                  menuPosition={"absolute"}
                  menuPlacement={"auto"}
                  inputId={"link-object"}
                  cacheOptions
                  defaultOptions
                  value={formData.object}
                  onChange={handleSelectChange}
                  loadOptions={loadOptions}
                  className={classNameWrapper}
                  onFocus={setActiveStyle}
                  onBlur={setInactiveStyle}
                  styles={{
                    ...reactSelectStyles,
                    menuPortal: base => ({ ...base, zIndex: 9999 }),
                  }}
                  isMulti={false}
                  isClearable={true}
                  placeholder=""
                />
              </FormControl>
              <button>Save</button>
            </form>
          </Modal>
        </div>
      )
    }
  ),
  shouldUpdate
)

export default LinkWidget
