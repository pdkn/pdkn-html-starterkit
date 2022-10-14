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
  disabled?: boolean
}

export const Button = (props: ButtonProps) => {
  const { variant, size, shape, outline, children, ...rest } = props
  return (
    <button {...rest} className={`${baseClasses} ${outline ? outlineClass : ''} ${variantsLookup[variant]} ${sizesLookup[size]} ${shapesLookup[shape]}`}>
      {children}
    </button>
    );
};
