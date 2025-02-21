// app/page.tsx
"use client";

import Collapsible from '@/components/Collapsible';
import { useEffect, useState } from 'react';
import { firestore } from '@/firebase/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

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
    const [courseSections, setCourseSections] = useState<Section[]>([]);

    useEffect(() => {
        const fetchSections = async () => {
            // First fetch chapters
            const chaptersRef = collection(firestore, 'chapters');
            const chaptersSnapshot = await getDocs(chaptersRef);

            const sectionsPromises = chaptersSnapshot.docs.map(async (chapterDoc) => {
                const chapterData = chapterDoc.data();
                const moduleRefs = chapterData.modules || [];
                
                // Fetch all modules for this chapter
                const modulesPromises = moduleRefs.map(async (moduleId: string) => {
                    const moduleDoc = await getDoc(doc(firestore, 'modules', moduleId));
                    return moduleDoc.data();
                });

                const modules = await Promise.all(modulesPromises);

                // Convert to Section format
                return {
                    title: chapterData.title,
                    description: `${modules.length} modules`,
                    exercises: modules.map(module => ({
                        name: module.title,
                        completed: false,
                        xp: 10, // Default XP value,
                        url: `/learn/${chapterData.chapter_no}/${module.module_no}`
                    }))
                };
            });

            const sections = await Promise.all(sectionsPromises);
            setCourseSections(sections);
        };

        fetchSections();
    }, []);

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Collapsible sections={courseSections} />
        </main>
    );
}