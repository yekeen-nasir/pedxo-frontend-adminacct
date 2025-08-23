import React from 'react'
import { cn } from '../utility/helper'

export const MaxScreenWrapper = ({ className, children, style }) => {
  return (
    <div className={cn('m-auto max-w-[1440px]', className)} style={style}>
      {children}
    </div>
  )
}
