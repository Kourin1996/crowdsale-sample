import React from 'react'
import classnames from 'classnames'

type GlassCardProps = {
  backgroundColor?: string
  opacity?: number // 0, 5, 10, ...
}

export const GlassCard: React.FC<GlassCardProps> = (props) => {
  const { children, backgroundColor = 'bg-white', opacity = 0 } = props

  const classNames = [backgroundColor, `bg-opacity-${opacity}`]

  return <div className={classnames(classNames)}>{children}</div>
}

GlassCard.defaultProps = {
  backgroundColor: 'bg-white',
  opacity: 0,
}
