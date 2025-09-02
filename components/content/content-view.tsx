"use client";

import { Button } from "@/components/ui/button";
import {
  fetchStep3Content,
  type ContentData,
  type ContentSection,
} from "@/lib/course-data/step3.content";
import { CheckCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";

export default function ContentView() {
  const [contentData, setContentData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [completedSections, setCompletedSections] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const loadContent = async () => {
      try {
        const data = await fetchStep3Content();
        setContentData(data);
      } catch (error) {
        console.error("Failed to load content:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, []);

  const markSectionComplete = (sectionId: string) => {
    setCompletedSections((prev) => new Set([...prev, sectionId]));
  };

  const renderSection = (section: ContentSection) => {
    const isCompleted = completedSections.has(section.id);

    const renderContent = () => {
      switch (section.type) {
        case "text":
          return (
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {section.content}
              </p>
            </div>
          );

        case "list":
          return (
            <div className="space-y-2">
              {section.content.split("\n").map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item.trim()}
                  </span>
                </div>
              ))}
            </div>
          );

        case "code":
          return (
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                {section.content}
              </p>
              <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-gray-800 dark:text-gray-200 font-mono">
                  {section.code}
                </code>
              </pre>
            </div>
          );

        case "image":
          return (
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                {section.content}
              </p>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">
                  Image Placeholder
                </span>
              </div>
            </div>
          );

        default:
          return (
            <p className="text-gray-700 dark:text-gray-300">
              {section.content}
            </p>
          );
      }
    };

    return (
      <div
        key={section.id}
        className={`bg-white dark:bg-gray-800 rounded-lg border p-6 transition-all duration-200 ${
          isCompleted
            ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10"
            : "border-gray-200 dark:border-gray-700"
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {section.title}
          </h3>
          {isCompleted && (
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          )}
        </div>

        {renderContent()}

        {!isCompleted && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={() => markSectionComplete(section.id)}
              variant="outline"
              size="sm"
            >
              Mark as Read
            </Button>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-4">
          <div className="bg-gray-200 dark:bg-gray-700 h-8 rounded animate-pulse" />
          <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded animate-pulse w-3/4" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 dark:bg-gray-700 h-32 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!contentData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Failed to Load Content
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  const completionPercentage = Math.round(
    (completedSections.size / contentData.sections.length) * 100
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {contentData.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {contentData.description}
        </p>

        {/* Progress and Time */}
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{contentData.estimatedReadTime} min read</span>
          </div>
          <div>
            <span>{completionPercentage}% Complete</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      {/* Content Sections */}
      <div className="space-y-6">{contentData.sections.map(renderSection)}</div>

      {/* Completion Action */}
      {completionPercentage === 100 && (
        <div className="text-center py-8">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 max-w-md mx-auto">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              Content Completed!
            </h3>
            <p className="text-green-700 dark:text-green-300 mb-4">
              You have finished reading all sections. Ready to continue?
            </p>
            <Button className="bg-green-600 hover:bg-green-700">
              Continue to Next Step
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
