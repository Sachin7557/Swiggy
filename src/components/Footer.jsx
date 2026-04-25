import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-8">
      <div className="max-w-[1200px] mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-bold mb-2">About</h4>
          <p className="text-sm">Order food from your favourite restaurants near you.</p>
        </div>

        <div>
          <h4 className="font-bold mb-2">Company</h4>
          <ul className="text-sm space-y-1 cursor-pointer">
            <li>About Us</li>
            <li>Team</li>
            <li>Careers</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-2">Support</h4>
          <ul className="text-sm space-y-1 cursor-pointer">
            <li>Help & Support</li>
            <li>Partner with us</li>
            <li>Terms & Privacy</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-2">Get the App</h4>
          <div className="flex flex-col gap-2">
            <a href="#" className="inline-block">
              <img src="/images/play_store.png" alt="Get it on Google Play" className="h-10" />
            </a>
            <a href="#" className="inline-block">
              <img src="/images/app_store.png" alt="Download on the App Store" className="h-10" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-sm">
        © {new Date().getFullYear()} Swiggy Clone. All rights reserved.
      </div>
    </footer>
  );
}
