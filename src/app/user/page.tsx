import Terug from '@/app/components/ui/Terugknop/Terug'
import Heading from '@/app/components/ui/default/Heading'
import React from 'react'
import Divider from '../components/ui/divider/Divider'

function page() {
  return (
    <div className=" flex flex-col gap-4">
       <Terug />
        <Divider />
      <Heading title={"Mijn profiel"} />
    </div>
  )
}

export default page