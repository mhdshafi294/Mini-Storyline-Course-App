import { StepTracker } from "@/components/step-tracker";

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Step Tracker */}
      <div className=" z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <StepTracker />
      </div>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
