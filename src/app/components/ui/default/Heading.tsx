import React from 'react'
interface HeadingProps {
    title: string;
  }
  
  // Use the interface to type the function's parameters
  const Heading: React.FC<HeadingProps> = ({title}) => {
  return (
    <h2 className="text-5xl font-bold">{title}</h2>
  )
}

export default Heading