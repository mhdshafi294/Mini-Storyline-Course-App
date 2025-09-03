export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 Mini Storyline Course App. Built with Next.js and TypeScript.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            Interactive learning platform with progress tracking and lazy
            loading.
          </p>
        </div>
      </div>
    </footer>
  );
}
