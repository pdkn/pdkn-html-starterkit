import * as React from "react";
import type { ComponentProps, ReactNode } from 'react'

const baseClasses = 'btn'

const variantsLookup = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
}

const sizesLookup = {
  xsmall: 'btn-xs',
  small: 'btn-sm',
  medium: 'btn-md',
  large: 'btn-lg',
}

const shapesLookup = {
  square: 'btn-square',
  circle: 'btn-circle',
  wide: 'btn-wide',
}

const outlineClass = 'btn-outline'
const disabledClass = 'btn-disabled'

type ButtonVariant = keyof typeof variantsLookup
type ButtonSize = keyof typeof sizesLookup
type ButtonShape = keyof typeof shapesLookup

interface ButtonProps extends Omit<ComponentProps<'button'>, 'className'> {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  shape?: ButtonShape
  outline?: boolean
  class?: string | ''
  className?: `Hey, sorry but you can't pass classes to the Button component - Design System decision 🤷‍♀️`
}

export const Button = (props: ButtonProps) => {
  const { variant, size, shape, outline, children, disabled, onClick, ...rest } = props
  const classes = `${baseClasses} ${outline ? outlineClass : ''} ${variant ? variantsLookup[variant] : ''} ${size ? sizesLookup[size] : ''} ${shape ? shapesLookup[shape] : ''}`
  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
    );
};
