// app/page.tsx
"use client";

import Collapsible from '@/components/Collapsible';

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

export default function Home() {
  const courseSections: Section[] = [
    {
      title: "Hello World",
      description: "Learn how to write your first line of Python by printing messages to the terminal.",
      exercises: [
        { name: "Setting Up", completed: true, xp: 10 },
        { name: "Hello World", completed: false },
        { name: "Pattern", completed: false },
        { name: "Initials", completed: false },
        { name: "Snail Mail", completed: false },
      ],
      bonus: { name: "Complete chapter to unlock", completed: false }
    },
    {
      title: "Variables",
      description: "Learn how to store and manipulate data using variables in Python.",
      exercises: [
        { name: "Variable Declaration", completed: false },
        { name: "Data Types", completed: false },
        { name: "Operations", completed: false }
      ]
    },
    {
      title: "Control Flow",
      description: "Master conditional statements and loops to control program execution.",
      exercises: [
        { name: "If Statements", completed: false },
        { name: "For Loops", completed: false },
        { name: "While Loops", completed: false }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Collapsible sections={courseSections} />
    </main>
  );
}