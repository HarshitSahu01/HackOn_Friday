/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { xcodeLight } from "@uiw/codemirror-theme-xcode";
import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import confetti from "canvas-confetti";
import Link from "next/link";

// Define the props interface
interface CodeEditorProps {
  question: string;
}

// Map each language to its CodeMirror extension and fun icon
const languageExtensions = {
  c: cpp(),
  python: python(),
  javascript: javascript(),
  java: java(),
};

const languageIcons = {
  c: "🧩",
  python: "🐍",
  javascript: "☕",
  java: "☕",
};

// Fun code snippets for each language with colorful outputs
const initialCodeByLanguage = {
  c: `#include <stdio.h>
int main() {
    printf("\\033[1;35m🎨 Welcome to Colorful Coding! 🎨\\033[0m\\n");
    printf("\\033[1;33m✨ Let's make programming fun! ✨\\033[0m\\n");
    return 0;
}`,
  python: `import random

colors = ["red", "orange", "yellow", "green", "blue", "purple"]
emoji = ["🌈", "🚀", "🎯", "🎮", "🎨", "✨"]

for i in range(5):
    print(f"{random.choice(emoji)} Coding in {random.choice(colors)} is awesome!")
print("🐍 Python power activated! 🐍")`,
  javascript: `// Fun animation in console
console.log("%c🎉 JavaScript Magic! 🎉", "font-size: 20px; color: #007bff");

const funEmojis = ["🚀", "🎮", "🌈", "⚡", "🔥"];
funEmojis.forEach((emoji, i) => {
  console.log(\`\${emoji} Coding adventure: level \${i + 1}\`);
});`,
  java: `public class FunJava {
    public static void main(String[] args) {
        String[] colors = {"RED", "GREEN", "BLUE", "YELLOW", "PURPLE"};
        System.out.println("🎮 Welcome to Java Arcade! 🎮");
        
        for (String color : colors) {
            System.out.println("🌟 Level up! You've unlocked: " + color);
        }
        
        System.out.println("🏆 You're a Java champion! 🏆");
    }
}`,
};

interface RunResponse {
  output: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ question }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof languageExtensions>("python");
  const [code, setCode] = useState<string>(initialCodeByLanguage["python"]);
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [score, setScore] = useState<number | null>(null);

  // Minimal theme: light background, dark text, minimal accent for CTAs
  const minimalTheme = {
    bg: "#ffffff",
    text: "#333333",
    primary: "#007bff", // accent for buttons
    border: "#dddddd",
    outputBg: "#f5f5f5",
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value as keyof typeof languageExtensions;
    setSelectedLanguage(lang);
    setCode(initialCodeByLanguage[lang]);
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput("");
    setScore(null); // reset score on new run

    // A small burst to celebrate clicking Run
    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.6 },
    });

    try {
      const response = await fetch(`https://repo-2bdf.onrender.com/run/${selectedLanguage}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result: RunResponse = await response.json();
      setOutput(result.output);

      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak % 3 === 0) {
        // Celebrate every 3 successful runs
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: [minimalTheme.primary],
        });
      }

      // After running the code, call handleSubmit to get the score
      await handleSubmit(question);
    } catch (error: any) {
      setOutput(`Error: ${error.message}`);
      setStreak(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (question: string) => {
    try {
      const response = await fetch("https://coderunnerfastapi-ok95.onrender.com/give_score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const returnedScore = Number(data.score);
      console.log("Score:", returnedScore);
      setScore(returnedScore);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div
      style={{
        color: minimalTheme.text,
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          border: `1px solid ${minimalTheme.border}`,
          borderRadius: "8px",
          background: "#fafafa",
        }}
      >
        <div
          style={{
            marginBottom: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label htmlFor="language-select" style={{ fontSize: "16px", marginRight: "10px" }}>
            Language:
          </label>
          <select
            id="language-select"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            style={{
              padding: "6px 12px",
              fontSize: "16px",
              border: `1px solid ${minimalTheme.border}`,
              borderRadius: "4px",
              outline: "none",
            }}
          >
            <option value="c">C {languageIcons.c}</option>
            <option value="python">Python {languageIcons.python}</option>
            <option value="javascript">JavaScript {languageIcons.javascript}</option>
            <option value="java">Java {languageIcons.java}</option>
          </select>
        </div>

        <div
          style={{
            marginBottom: "20px",
            border: `1px solid ${minimalTheme.border}`,
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <CodeMirror
            value={code}
            height="300px"
            theme={xcodeLight}
            extensions={[languageExtensions[selectedLanguage]]}
            onChange={(value) => setCode(value)}
          />
        </div>

        {/* Action buttons placed below the editor */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleRunCode}
            disabled={isLoading}
            style={{
              flex: "1",
              padding: "10px 20px",
              fontSize: "16px",
              color: "#fff",
              background: minimalTheme.primary,
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            {isLoading ? "Running..." : "Run Code"}
          </button>
          <Link href="/learn/1">
            <button
              style={{
                flex: "1",
                padding: "10px 20px",
                fontSize: "16px",
                color: minimalTheme.primary,
                background: "transparent",
                border: `2px solid ${minimalTheme.primary}`,
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background 0.3s ease",
              }}
            >
              Complete
            </button>
          </Link>
        </div>

        {output && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: minimalTheme.outputBg,
              border: `1px solid ${minimalTheme.border}`,
              borderRadius: "4px",
              whiteSpace: "pre-wrap",
              fontFamily: "monospace",
              fontSize: "14px",
            }}
          >
            <strong>Output:</strong>
            <pre style={{ marginTop: "10px" }}>{output}</pre>
          </div>
        )}

        {score !== null && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: minimalTheme.outputBg,
              border: `1px solid ${minimalTheme.border}`,
              borderRadius: "4px",
              fontFamily: "monospace",
              fontSize: "16px",
              textAlign: "center",
            }}
          >
            <strong>Score:</strong> {score}
          </div>
        )}
      </div>

      {streak > 0 && (
        <p style={{ textAlign: "center", marginTop: "20px", fontStyle: "italic" }}>
          {`You're on fire! ${streak} successful run${streak !== 1 ? "s" : ""} in a row!`}
        </p>
      )}
    </div>
  );
};

export default CodeEditor;
