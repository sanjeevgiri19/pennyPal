import { Link } from "react-router-dom";
// import {
//   RiGithubFill,
//   RiTwitterFill,
//   RiInstagramLine,
//   RiMoneyDollarCircleFill,
// } from "remixicon-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-zinc-50 to-blue-100/60 pt-16 pb-12 border-t-[1px] border-zinc-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 text-primary">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center shadow-sm">
                {/* <RiMoneyDollarCircleFill className="w-6 h-6 text-purple-600" /> */}
              </div>
              <span className="text-xl font-bold text-gray-800">PennyPal</span>
            </Link>
            <p className="text-gray-600 text-sm">
              Elegant expense tracking to help you manage your finances with
              clarity and precision.
            </p>
            <div className="flex space-x-4 text-gray-500">
              <a
                href="#"
                className="hover:text-blue-600 transition-colors"
                aria-label="GitHub"
              >
                <i className="ri-github-fill text-xl"></i>
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors"
                aria-label="Twitter"
              >
                <i className="ri-twitter-x-line text-xl"></i>
              </a>
              <a
                href="#"
                className="hover:text-blue-600 transition-colors"
                aria-label="Instagram"
              >
                <i className="ri-instagram-line text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-gray-800 mb-4">
              Features
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/transactions"
                  className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  Transactions
                </Link>
              </li>
              <li>
                <Link
                  to="/budgets"
                  className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  Budgets
                </Link>
              </li>
              <li>
                <Link
                  to="/reports"
                  className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  Reports
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-gray-800 mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-sm uppercase tracking-wider text-gray-800 mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} PennyPal Finance. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  Status
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
