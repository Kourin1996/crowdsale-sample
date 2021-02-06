import React from 'react'

type IndexPageTemplateProps = {}

export const IndexPageTemplate: React.FC<IndexPageTemplateProps> = (_props) => {
  return (
    <div
      className="p-12 w-screen h-screen bg-cover"
      style={{
        backgroundImage: `url("${process.env.PUBLIC_URL}/img/background1.jpg")`,
      }}
    >
      <div
        className="w-full h-full bg-white bg-opacity-0 border-2 border-solid border-white border-opacity-40 rounded-3xl object-center"
        style={{ backdropFilter: 'blur(14px)' }}
      >
        Hello
      </div>
    </div>
  )
}
