import * as React from "react";
import type { ComponentProps, ReactNode } from 'react'
import { Button } from 'ui'



interface ModalButtonProps extends ComponentProps<'button'> {
  children: ReactNode
}

const onClickHandler = () => {
  console.log("ON CLICK Handler")
}

export const ModalButton = (props: ModalButtonProps) => {
  const { children, disabled, ...rest } = props
  
  return (
    <Button onClick={onClickHandler} disabled={disabled} variant="secondary">
      {children}
    </Button>
    );
};
