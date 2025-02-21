'use client'

// components/Collapsible.tsx
import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface Exercise {
  name: string;
  completed?: boolean;
  xp?: number;
}

interface BonusArticle {
  name: string;
  completed?: boolean;
  xp?: number;
}

interface Section {
  title: string;
  description: string;
  exercises?: Exercise[];
  bonus?: BonusArticle;
}

interface CollapsibleProps {
  sections: Section[];
}

const Collapsible: React.FC<CollapsibleProps> = ({ sections }) => {
  const [openSection, setOpenSection] = useState<number | null>(0);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  // Get first exercise for each section
  const getFirstExercise = (section: Section) => {
    if (section.exercises && section.exercises.length > 0) {
      return section.exercises[0];
    }
    return null;
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg p-4 shadow-md">
      {sections.map((section, index) => {
        const firstExercise = getFirstExercise(section);
        
        return (
        <div key={index} className="mb-4 border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection(index)}
            className="w-full flex items-center justify-between p-4 text-left text-gray-800 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 mr-4 text-white">
                {index + 1}
              </div>
              <h2 className="text-xl font-mono">{section.title}</h2>
            </div>
            {openSection === index ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          
          {/* Quick preview of first exercise
          {openSection !== index && firstExercise && (
            <div className="flex items-center justify-between p-4 bg-white border-t border-gray-200">
              <div className="flex">
                <span className="text-gray-500 w-24">Exercise 1</span>
                <span className="text-gray-800">{firstExercise.name}</span>
              </div>
              <div>
                {firstExercise.completed ? (
                  <div className="bg-yellow-500 text-black font-semibold py-1 px-2 rounded text-xs">
                    +{firstExercise.xp}XP
                  </div>
                ) : (
                  <div className="bg-gray-200 text-gray-500 py-1 px-2 rounded text-xs">
                    ???
                  </div>
                )}
              </div>
            </div>
          )} */}
          
          {openSection === index && (
            <div className="p-4 bg-white">
              <div className="bg-gray-50 rounded p-4">
                <p className="text-gray-700 mb-6">{section.description}</p>
                
                {section.exercises && (
                  <div className="space-y-4">
                    {section.exercises.map((exercise, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex">
                          <span className="text-gray-500 w-24">Exercise {idx + 1}</span>
                          <span className="text-gray-800">{exercise.name}</span>
                        </div>
                        <div>
                          {exercise.completed ? (
                            <div className="bg-yellow-500 text-black font-semibold py-1 px-2 rounded text-xs">
                              +{exercise.xp}XP
                            </div>
                          ) : (
                            <div className="bg-gray-200 text-gray-500 py-1 px-2 rounded text-xs">
                              ???
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {section.bonus && (
                      <div className="flex items-center justify-between">
                        <div className="flex">
                          <span className="text-gray-500 w-24">Bonus Article</span>
                          <span className="text-gray-800">{section.bonus.name}</span>
                        </div>
                        <div>
                          {section.bonus.completed ? (
                            <div className="bg-yellow-500 text-black font-semibold py-1 px-2 rounded text-xs">
                              +{section.bonus.xp}XP
                            </div>
                          ) : (
                            <div className="bg-gray-200 text-gray-500 py-1 px-2 rounded text-xs">
                              ???
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )})}
    </div>
  );
};

export default Collapsible;