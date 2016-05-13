import React, { Component } from 'react'
import Tooltip from 'material-ui/tooltip'
import PropTypes from 'material-ui/utils/prop-types'
import { mergeStyles } from 'material-ui/utils/styles'

class ComponentWithTooltip extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      tooltipShown: false
    }
    this._handleMouseLeave = this._handleMouseLeave.bind(this)
    this._handleMouseEnter = this._handleMouseEnter.bind(this)
  }

  getStyles () {
    let styles = {
      tooltip: {
        boxSizing: 'border-box'
      }
    }
    return styles
  }

  _handleMouseLeave (e) {
    console.log('_handleMouseLeave')
    if (this.props.tooltip) {
      this.setState({tooltipShown: false})
    }
  }

  _handleMouseEnter (e) {
    console.log('_handleMouseEnter')
    if (this.props.tooltip) {
      this.setState({tooltipShown: true})
    }
  }

  render () {
    const {
      tooltip,
      touch
    } = this.props
    let styles = this.getStyles()
    let tooltipPosition = this.props.tooltipPosition.split('-')
    let tooltipElement = tooltip
      ? (
        <Tooltip
          ref='tooltip'
          label={tooltip}
          show={this.state.tooltipShown}
          touch={touch}
          style={mergeStyles(styles.tooltip, this.props.tooltipStyles)}
          verticalPosition={tooltipPosition[0]}
          horizontalPosition={tooltipPosition[1]}
        />
      )
      : null

    return (
      <h4
        onBlur={this._handleBlur}
        onFocus={this._handleFocus}
        onMouseLeave={this._handleMouseLeave}
        onMouseEnter={this._handleMouseEnter}
      >
        {this.props.children}
        {tooltipElement}
      </h4>
    )
  }
}

ComponentWithTooltip.propTypes = {
  children: React.PropTypes.object.isRequired,
  /**
   * The tooltip text to show.
   */
  tooltip: React.PropTypes.node,
  /**
   * Allows the tooltip to be viewed with different
   * alignments: "bottom-center", "top-center",
   * "bottom-right", "top-right", "bottom-left" and "top-left".
   */
  tooltipPosition: PropTypes.cornersAndCenter,
  /**
   * Styles prop passed down to the tooltip.
   */
  tooltipStyles: React.PropTypes.object,
  /**
   * Prop for tooltip to make it larger for mobile.
   */
  touch: React.PropTypes.bool
}

ComponentWithTooltip.defaultProps = {
  tooltipPosition: 'bottom-center',
  touch: false
}

ComponentWithTooltip.contextTypes = {
  muiTheme: React.PropTypes.object
}

export default ComponentWithTooltip
