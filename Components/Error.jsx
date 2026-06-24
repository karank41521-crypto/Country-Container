import React from 'react'
import { useRouteError } from 'react-router'

export default function Error() {
    const Error = useRouteError()
    console.log(Error)
  return (
    <div>
      Something went wrong... {Error.status} {Error.statusText}
    </div>
  )
}
