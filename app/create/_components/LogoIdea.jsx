import React, { useEffect, useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import axios from 'axios'
import Prompt from '@/app/_data/Prompt'

function LogoIdea({formData}) {


  const[ideas,setIdeas] = useState();
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    generateLogoDesignIdea();
  } ,[])

  const generateLogoDesignIdea=async()=>{
    setLoading(true)
    const PROMPT= Prompt.DESIGN_IDEA_PROMPT
    .replace('{logoType}',formData?.design.title )
    .replace('{logoTitle}',formData.title)
    .replace('{logoDesc}',formData.desc)
    .replace('{logoPrompt}',formData.design.prompt)
    

 

    const result=await axios.post('/api/ai-design-ideas',{
      prompt: PROMPT
    })

    console.log(result.data)

    setIdeas(result.data.ideas);
    setLoading(false);

  }
  return (
    <div className='my-10'>
      <HeadingDescription
      title={Lookup.LogoIdeaTitle} 
      description={Lookup.LogoIdeaDesc}/>

      {ideas&&ideas.map((item,index) => (
        <h2 key={index} className={`p-2 roundex-full border px-3 cursor-pointer`}></h2>
      ))}
    </div>
  )
}

export default LogoIdea