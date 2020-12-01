import React from 'react'
import PropTypes from 'prop-types'
import { NewsPostTemplate } from '../../templates/news-post'

const NewsPostPreview = ({ widgetFor }) => {
  return (
    <NewsPostTemplate
      content={widgetFor('body')}
    />
  )
}

NewsPostPreview.propTypes = {
  widgetFor: PropTypes.func,
}

export default NewsPostPreview
