'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} BeproEx. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
