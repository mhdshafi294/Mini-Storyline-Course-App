"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Award, BookOpen, Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:24px_24px]" />

      {/* Geometric Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl" />
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-accent/10 rounded-full blur-lg" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-secondary/5 rotate-45" />

      <div className="relative z-10">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-24">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div
              className={`space-y-8 transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
                  <Award className="w-4 h-4 text-accent-foreground" />
                  <span className="text-sm font-medium text-accent-foreground">
                    Interactive Learning
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                  Master the
                  <span className="block bg-gradient-to-r from-primary via-accent-foreground to-secondary bg-clip-text text-transparent">
                    Fundamentals
                  </span>
                </h1>
              </div>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Embark on an interactive learning journey with carefully crafted
                video lessons, engaging quizzes, and comprehensive content
                designed to accelerate your understanding.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/course/mini/step/1">
                  <Button
                    size="lg"
                    className="px-8 py-4 text-lg font-medium group"
                  >
                    Start Learning
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Link href="/course/mini/step/1">
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-4 text-lg font-medium"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Take a Tour
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Element */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="relative">
                {/* Main Card */}
                <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    {/* Progress Section */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-card-foreground">
                        Your Progress
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        4 Steps
                      </span>
                    </div>

                    {/* Progress Bars */}
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((step) => (
                        <div key={step} className="flex items-center space-x-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              step === 1
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {step}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-card-foreground">
                                Step {step}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {step === 1 ? "25%" : "0%"}
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-700 ${
                                  step === 1
                                    ? "bg-primary w-1/4"
                                    : "bg-muted w-0"
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 text-accent-foreground" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <section id="features" className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose This Course?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Designed with modern learning principles and Swiss precision for
                optimal comprehension.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Play,
                  title: "Video Lessons",
                  description:
                    "High-quality video content with clear explanations and visual aids.",
                },
                {
                  icon: BookOpen,
                  title: "Interactive Quizzes",
                  description:
                    "Engaging assessments that reinforce learning through active participation.",
                },
                {
                  icon: Award,
                  title: "Progress Tracking",
                  description:
                    "Comprehensive tracking of your learning journey with detailed analytics.",
                },
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className={`bg-card border border-border rounded-xl p-8 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="bg-muted/30 rounded-2xl p-8 md:p-12 mb-24">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: "4", label: "Interactive Steps" },
                { number: "15", label: "Minutes Average" },
                { number: "95%", label: "Completion Rate" },
                { number: "24/7", label: "Access" },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`transition-all duration-500 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${800 + index * 100}ms` }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div
              className={`max-w-2xl mx-auto transition-all duration-500 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Begin Your Journey?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of learners who have mastered these fundamentals
                through our structured approach.
              </p>
              <Link href="/course/mini/step/1">
                <Button
                  size="lg"
                  className="px-12 py-4 text-lg font-medium group"
                >
                  Start Your Course
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-24">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  Mini Storyline Course
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                © 2025 Course Platform. Crafted with precision.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
