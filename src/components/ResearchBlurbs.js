import React from 'react'
import PropTypes from 'prop-types'

const ResearchBlurb = ({ gridItems }) => (
  <div className="columns is-multiline">
    {gridItems.map((item) => (
      <div key={item.text} className="column is-6">
        <section className="section">
          
          <p>{item.title}</p>
          <p>{item.text}</p>
        </section>
      </div>
    ))}
  </div>
)

ResearchBlurb.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
        title: PropTypes.string,
      text: PropTypes.string,
    })
  ),
}

export default ResearchBlurb
