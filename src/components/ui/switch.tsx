"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      style={{ width: 48, height: 28, padding: 3 }}
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center rounded-full shadow-inner transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/20",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        style={{ width: 22, height: 22 }}
        className={cn(
          "pointer-events-none block rounded-full bg-white shadow-md ring-1 ring-black/5 transition-transform duration-200 ease-in-out",
          "data-[state=unchecked]:translate-x-0",
          "data-[state=checked]:translate-x-5 rtl:data-[state=checked]:-translate-x-5"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }

