"use client";
import { useState } from "react";
import { Popover } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="bg-rose-950">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <p>Course Advisor</p>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <a href="/" className="text-sm font-semibold leading-6 text-gray-200">
            Home
          </a>
          <a href="/signup" className="text-sm font-semibold leading-6 text-gray-200">
            Sign-up
          </a>
          <a href="/login" className="text-sm font-semibold leading-6 text-gray-200">
            Login
          </a>
        </Popover.Group>
      </nav>
    </header>
  );
}
