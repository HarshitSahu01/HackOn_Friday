'use client'

import { getDoc, doc, collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/firebase"
import { useEffect, useState } from "react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { set } from "firebase/database";
import './page.css';
import { useParams } from "next/navigation";
import CodeEditor from "@/components/CodeEditor";

export default function Page() {
    const [moduleData, setModuleData] = useState<any>(null);
    const params = useParams();
    const chapterNo = Number(params.chapterNo as string);
    const moduleNo = Number(params.moduleNo as string);

    useEffect(() => {
        const fetchData = async () => {
            const modulesRef = collection(firestore, "modules");
            const q = query(modulesRef, 
                where("module_no", "==", moduleNo),
                where("chapter_no", "==", chapterNo)
            );
            const querySnapshot = await getDocs(q);
            
            if (querySnapshot.empty) {
                console.error("Invalid module or chapter ID");
                setModuleData({ content: "Invalid module or chapter ID" });
                return;
            }

            const moduleDoc = querySnapshot.docs[0];
            let data = moduleDoc.data()
            let s = !data ? '' : data.content;
            s = s.replace(/<br>/g, '\n');
            if (data) data.content = s;
            console.log(s)
            setModuleData(data);
            console.log(moduleData)
        };
        fetchData();
    }, [firestore]);

    return <>
        <div className="flex h-screen">
            <div className="w-1/2 overflow-auto p-4">
            <div className="prose prose-lg prose-indigo">
                {moduleData && <MarkdownRenderer content={moduleData.content} />}
            </div>
            </div>
            <div className="w-1/2">
            <CodeEditor />
            </div>
        </div>
    </>
}