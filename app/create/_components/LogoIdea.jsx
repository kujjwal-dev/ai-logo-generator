import React, { useEffect, useState } from 'react';
import HeadingDescription from './HeadingDescription';
import Lookup from '@/app/_data/Lookup';
import axios from 'axios';
import Prompt from '@/app/_data/Prompt';

function LogoIdea({ formData,  }) {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOption,setSelectedOption] = useState();

  useEffect(() => {
    generateLogoDesignIdea();
  }, []);

  const generateLogoDesignIdea = async () => {
    setLoading(true);

    const PROMPT = Prompt.DESIGN_IDEA_PROMPT
      .replace('{logoType}', formData?.design.title)
      .replace('{logoTitle}', formData.title)
      .replace('{logoDesc}', formData.desc)
      .replace('{logoPrompt}', formData.design.prompt);

    try {
      const result = await axios.post('/api/ai-design-ideas', { prompt: PROMPT });

      console.log(result.data); // Log the response to see its structure

      // Check if result.data is an array of objects or an object with 'ideas' array
      if (Array.isArray(result.data)) {
        // If it's an array of objects, we map over it
        const normalizedIdeas = result.data.map(item => item.ideas);
        setIdeas(normalizedIdeas);
      } else if (result.data.ideas) {
        // If it's an object with 'ideas' array
        setIdeas(result.data.ideas);
      } else {
        console.error('Unexpected response structure:', result.data);
        setIdeas([]);  // Clear ideas if data is unexpected
      }
    } catch (error) {
      console.error('Error generating logo ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-10">
      <HeadingDescription
        title={Lookup.LogoIdeaTitle}
        description={Lookup.LogoIdeaDesc}
      />
      <div className='flex flex-wrap gap-3 mt-6'>
      {loading && <p>Loading...</p>}
      {!loading && ideas.length > 0 ? (
        ideas.map((idea, index) => (
          <h2 key={index}
          onClick={() => {setSelectedOption(idea);
            onHanleInputChange(idea)
          }

          }
           className={`p-2 rounded-full border px-3 cursor-pointer hover:border-primary
          ${selectedOption==idea&&'border-primary'}`}>
            {idea}
          </h2>
        ))
      ) : (
        !loading && <p>No ideas generated yet.</p>
      )}
      </div>
      <h2  onClick={() => {setSelectedOption(idea);
            onHanleInputChange('Let AI Select the best idea')
          }}
      className={`p-2 rounded-full border px-3 cursor-pointer hover:border-primary
          ${selectedOption=="Let AI Select the best idea"&&'border-primary'}`}>Let AI Select the best idea</h2>
    </div>
  );
}

export default LogoIdea;
