"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Award,
  BookOpen,
  Play,
  Star,
  Target,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced Swiss-Style Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.09)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Radial Gradient Overlays */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-primary/[0.02] via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-accent/[0.03] to-transparent" />

        {/* Geometric Elements */}
        <div
          className="absolute top-20 left-10 w-40 h-40 border-8 border-primary/20 rotate-12 animate-spin"
          style={{ animationDuration: "99s" }}
        />
        <div
          className="absolute top-1/4 right-20 w-24 h-24 bg-primary/20 rotate-45 animate-spin"
          style={{ animationDuration: "40s", animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/6 w-32 h-32 border-4 border-accent/90 rounded-full animate-spin"
          style={{ animationDuration: "50s", animationDelay: "4s" }}
        />

        {/* Diagonal Lines */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent transform rotate-12 origin-top-left" />
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-accent/10 to-transparent transform -rotate-12 origin-top-right" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + i * 8}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${8 + i * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-24">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-center mb-16 sm:mb-24 lg:mb-32">
            <div
              className={`space-y-12 transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-flex items-center space-x-2 sm:space-x-3 px-4 sm:px-5 py-2 sm:py-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full border border-primary/10 backdrop-blur-sm">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="text-xs sm:text-sm font-semibold text-foreground tracking-wide uppercase">
                    Interactive Learning Platform
                  </span>
                </div>

                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-foreground leading-[0.9] tracking-tight">
                    Master the
                  </h1>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent leading-[0.9] tracking-tight">
                    Fundamentals
                  </h1>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl font-light">
                  Embark on an interactive learning journey with carefully
                  crafted video lessons, engaging quizzes, and comprehensive
                  content designed to accelerate your understanding.
                </p>

                <div className="flex flex-col sm:flex-row gap-6">
                  <Link href="/course/mini/step/1">
                    <Button
                      size="lg"
                      className="px-10 py-5 text-lg font-semibold group bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Start Learning
                      <ArrowRight className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-2" />
                    </Button>
                  </Link>

                  <Link href="/course/mini/step/1">
                    <Button
                      variant="outline"
                      size="lg"
                      className="px-10 py-5 text-lg font-semibold border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                    >
                      <Play className="w-5 h-5 mr-3" />
                      Take a Tour
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Visual Element */}
            <div
              className={`relative max-w-sm mx-auto lg:max-w-none lg:mx-0 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <div className="relative">
                {/* Main Card with Swiss Style */}
                <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:sm:scale-105">
                  <div className="space-y-8">
                    {/* Progress Section */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-8 bg-primary rounded-full"></div>
                        <h3 className="text-xl font-bold text-card-foreground tracking-tight">
                          Your Progress
                        </h3>
                      </div>
                      <div className="px-4 py-2 bg-primary/10 rounded-full">
                        <span className="text-sm font-semibold text-primary">
                          4 Steps
                        </span>
                      </div>
                    </div>

                    {/* Progress Bars with Enhanced Design */}
                    <div className="space-y-4 sm:space-y-6">
                      {[1, 2, 3, 4].map((step, index) => (
                        <div
                          key={step}
                          className="flex items-center space-x-4 sm:space-x-6 group"
                        >
                          <div
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-bold transition-all duration-300 ${
                              step === 1
                                ? "bg-primary text-primary-foreground shadow-lg scale-110"
                                : "bg-muted/50 text-muted-foreground group-hover:bg-muted group-hover:scale-105"
                            }`}
                          >
                            {step}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-sm font-semibold ${
                                  step === 1
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                                }`}
                              >
                                Step {step}
                              </span>
                              <span className="text-xs font-medium text-muted-foreground">
                                {step === 1 ? "25%" : "0%"}
                              </span>
                            </div>
                            <div className="relative">
                              <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden">
                                <div
                                  className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                                    step === 1
                                      ? "bg-gradient-to-r from-primary to-primary/80 w-1/4"
                                      : "bg-muted w-0"
                                  }`}
                                  style={{
                                    transitionDelay: `${index * 200}ms`,
                                  }}
                                />
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enhanced Floating Elements */}
                <div className="absolute -top-3 -right-3 sm:-top-6 sm:-right-6 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300">
                  <Play className="w-6 h-6 sm:w-8 sm:h-8 text-accent-foreground" />
                </div>
                <div className="absolute -bottom-3 -left-3 sm:-bottom-6 sm:-left-6 w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center border border-primary/20 hover:scale-110 transition-transform duration-300">
                  <Award className="w-7 h-7 sm:w-10 sm:h-10 text-primary" />
                </div>

                {/* Additional Swiss Elements */}
                <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-4 h-4 sm:w-6 sm:h-6 border-2 border-primary/30 rotate-45" />
                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 border border-accent/40 rounded-full" />
              </div>
            </div>
          </div>

          {/* Features Section */}
          <section id="features" className="mb-32">
            <div className="text-center mb-20">
              <div className="inline-flex items-center space-x-3 mb-6">
                <div className="w-12 h-px bg-primary"></div>
                <Target className="w-6 h-6 text-primary" />
                <div className="w-12 h-px bg-primary"></div>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                Why Choose This Course?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
                Designed with modern learning principles and Swiss precision for
                optimal comprehension and engagement.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Play,
                  title: "Video Lessons",
                  description:
                    "High-quality video content with clear explanations and visual aids that make complex concepts accessible.",
                  gradient: "from-blue-500/10 to-cyan-500/10",
                  borderColor: "border-blue-500/20",
                },
                {
                  icon: BookOpen,
                  title: "Interactive Quizzes",
                  description:
                    "Engaging assessments that reinforce learning through active participation and immediate feedback.",
                  gradient: "from-purple-500/10 to-pink-500/10",
                  borderColor: "border-purple-500/20",
                },
                {
                  icon: Award,
                  title: "Progress Tracking",
                  description:
                    "Comprehensive tracking of your learning journey with detailed analytics and personalized insights.",
                  gradient: "from-emerald-500/10 to-teal-500/10",
                  borderColor: "border-emerald-500/20",
                },
              ].map((feature, index) => (
                <div
                  key={feature.title}
                  className={`group bg-card/50 backdrop-blur-sm border ${
                    feature.borderColor
                  } rounded-2xl p-8 lg:p-10 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 hover:bg-card/80 ${
                    isVisible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${800 + index * 150}ms` }}
                >
                  <div
                    className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {feature.description}
                    </p>
                  </div>

                  {/* Swiss-style accent */}
                  <div className="absolute top-6 right-6 w-8 h-8 border-2 border-primary/20 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="relative mb-32">
            {/* Background with Swiss pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted/20 via-muted/10 to-muted/5 rounded-3xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(0,0,0,0.02)_0%,transparent_50%),radial-gradient(circle_at_70%_30%,rgba(0,0,0,0.02)_0%,transparent_50%)] rounded-3xl" />

            <div className="relative bg-card/30 backdrop-blur-sm border border-border/50 rounded-3xl p-12 md:p-16">
              <div className="grid md:grid-cols-4 gap-12 text-center">
                {[
                  { number: "4", label: "Interactive Steps", icon: Star },
                  { number: "15", label: "Minutes Average", icon: Zap },
                  { number: "95%", label: "Completion Rate", icon: Target },
                  { number: "24/7", label: "Access", icon: Award },
                ].map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`group transition-all duration-700 ${
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                    style={{ transitionDelay: `${1000 + index * 150}ms` }}
                  >
                    <div className="relative">
                      {/* Icon background */}
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="w-8 h-8 text-primary" />
                      </div>

                      {/* Number with enhanced styling */}
                      <div className="text-4xl md:text-5xl font-black text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {stat.number}
                      </div>

                      {/* Label */}
                      <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                        {stat.label}
                      </div>

                      {/* Swiss accent line */}
                      <div className="w-8 h-px bg-primary mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative elements */}
              <div className="absolute top-8 left-8 w-4 h-4 border-2 border-primary/20 rotate-45" />
              <div className="absolute bottom-8 right-8 w-6 h-6 border border-accent/30 rounded-full" />
              <div className="absolute top-1/2 left-4 w-px h-12 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
              <div className="absolute top-1/2 right-4 w-px h-12 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center relative">
            {/* Swiss-style background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] via-transparent to-accent/[0.02] rounded-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.02)_25%,rgba(0,0,0,0.02)_50%,transparent_50%,transparent_75%,rgba(0,0,0,0.02)_75%)] bg-[length:32px_32px] rounded-3xl" />

            <div
              className={`relative max-w-4xl mx-auto p-12 md:p-16 transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "1200ms" }}
            >
              <div className="space-y-8">
                <div className="inline-flex items-center space-x-4 mb-8">
                  <div className="w-16 h-px bg-primary"></div>
                  <Star className="w-8 h-8 text-primary" />
                  <div className="w-16 h-px bg-primary"></div>
                </div>

                <h2 className="text-3xl md:text-6xl font-black text-foreground mb-8 tracking-tight">
                  Ready to Begin Your
                  <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-[1.3]">
                    Learning Journey?
                  </span>
                </h2>

                <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                  Join thousands of learners who have mastered these
                  fundamentals through our structured, interactive approach
                  designed for optimal comprehension.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/course/mini/step/1">
                    <Button
                      size="lg"
                      className="px-12 py-6 text-xl font-bold group bg-primary hover:bg-primary/90 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                    >
                      Start Your Course
                      <ArrowRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-2" />
                    </Button>
                  </Link>

                  <Link href="/course/mini/step/1">
                    <Button
                      variant="outline"
                      size="lg"
                      className="px-12 py-6 text-xl font-bold border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                    >
                      <Play className="w-6 h-6 mr-3" />
                      Preview Course
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Swiss decorative elements */}
              <div className="absolute top-8 left-8 w-8 h-8 border-2 border-primary/20 rotate-45" />
              <div className="absolute bottom-8 right-8 w-6 h-6 border border-accent/30 rounded-full" />
              <div className="absolute top-1/2 left-6 w-px h-16 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
              <div className="absolute top-1/2 right-6 w-px h-16 bg-gradient-to-b from-transparent via-accent/20 to-transparent" />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-32 relative">
          {/* Swiss-style footer background */}
          <div className="absolute inset-0 bg-gradient-to-t from-muted/10 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.01)_50%,transparent_100%)]" />

          <div className="relative max-w-7xl mx-auto px-6 py-16">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-8 md:mb-0">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="space-y-1">
                  <span className="text-lg font-bold text-foreground">
                    Mini Storyline Course
                  </span>
                  <div className="text-sm text-muted-foreground">
                    Interactive Learning Platform
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end space-y-2">
                <div className="text-sm text-muted-foreground font-medium">
                  © 2025 Course Platform
                </div>
                <div className="text-xs text-muted-foreground/80">
                  Crafted with Swiss precision
                </div>
              </div>
            </div>

            {/* Swiss decorative elements */}
            <div className="absolute bottom-8 left-8 w-4 h-4 border border-primary/20 rotate-45" />
            <div className="absolute bottom-8 right-8 w-6 h-6 border border-accent/20 rounded-full" />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          </div>
        </footer>
      </div>
    </div>
  );
}
