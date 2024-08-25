"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [url, setUrl] = useState(""); // State to hold the input value
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const router = useRouter(); // Next.js router for navigation

  // Toggle dark mode and save to localStorage
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  // Apply dark or light theme based on state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Handle Ask AI button click
  const handleAskAI = async () => {
    if (!url) {
      console.error("URL is empty. Please enter a valid URL.");
      return;
    }

    setIsLoading(true); // Set loading state to true

    try {
      const formattedUrl = encodeURIComponent(url);
      console.log("Navigating to:", `/${formattedUrl}`);

      // Simulate loading time (e.g., fetching data or processing)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      router.push(`/${formattedUrl}`);
    } catch (error) {
      console.error("Error navigating to the URL:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Handle page reload
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}>
      {/* Navbar */}
      <nav className={`flex items-center justify-between p-4 ${isDarkMode ? "bg-gray-800" : "bg-gray-200"} border-b border-gray-300 dark:border-gray-700`}>
        <div className="container mx-auto flex items-center justify-between">
          {/* Left side: Logo and Text as One Button */}
          <button
            onClick={handleReload}
            className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ease-in-out ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
          >
            <img
              src={isDarkMode ? "/light_ask.png" : "/dark_ask.png"} // Switch between images based on theme
              alt="AskThisWebsite Logo"
              className="h-8 w-8 transition-transform duration-300 ease-in-out"
            />
            <span
              className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-black"} transition-transform duration-300 ease-in-out`}
            >
              ThisWebsite
            </span>
          </button>

          {/* Right side: GitHub link, About button, and Dark Mode toggle */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Neerabh/Ask-this-website.git" // Replace with your GitHub page URL
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 ${isDarkMode ? "text-gray-300 hover:text-white" : "text-gray-900 hover:text-blue-600"} transition-transform duration-300 ease-in-out`}
            >
              <i className="fab fa-github text-xl transition-transform duration-300 ease-in-out transform hover:scale-125"></i> {/* Font Awesome GitHub icon */}
              <span>GitHub</span>
            </a>
            <button
              onClick={() => router.push("/about")} // Navigate to the About page
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out transform hover:scale-105`}
            >
              About
            </button>
            <button
              onClick={toggleDarkMode} // Toggle dark mode
              className={`bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300 ease-in-out transform hover:scale-105`}
            >
              <i className={`fas ${isDarkMode ? "fa-sun" : "fa-moon"} text-xl transition-transform duration-300 ease-in-out transform hover:scale-125`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex min-h-screen flex-col items-center justify-center p-6">
        {/* Large Hello Message */}
        <h1 className="text-6xl font-bold text-center mb-4">Hello !</h1>
        <h1 className="text-4xl font-strong text-center mb-4">Welcome to AskThisWebsite.</h1>
        <p className="text-lg text-center mb-8">
          Enter a website URL below to start asking questions to the AI about the website.
        </p>

        {/* Input for Website URL */}
        <div className="w-full max-w-md">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL..."
            className={`w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 ${isDarkMode ? "bg-gray-800 text-white border-gray-600" : "bg-gray-100 text-gray-900 border-gray-300"}`}
          />
          <button
            onClick={handleAskAI}
            className={`w-full mt-4 p-3 rounded-lg transition-colors ${isDarkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-500 text-white hover:bg-blue-400"} transition-transform duration-300 ease-in-out transform hover:scale-105`}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Please wait..." : "Ask AI"}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-4 ${isDarkMode ? "bg-gray-800 text-gray-100" : "bg-gray-200 text-gray-900"} border-t border-gray-300 dark:border-gray-700`}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; 2024 <span className={`font-semibold`}>AskThisWebsite</span>. All rights reserved.
          </p>
          <p className="text-xs mt-2">
            <a href="/privacy" className={`text-blue-500 hover:underline ${isDarkMode ? "text-blue-300" : "text-blue-700"}`}>Privacy Policy</a> | <a href="/terms" className={`text-blue-500 hover:underline ${isDarkMode ? "text-blue-300" : "text-blue-700"}`}>Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
}