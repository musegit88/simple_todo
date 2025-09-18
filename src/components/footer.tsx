import Link from "next/link";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:justify-between  border-t border-gray-800 mt-12 pt-8 text-center">
          <p>&copy; {year} Simple Todo. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Link
              href={
                "https://github.com/musegit88/privacy-terms/blob/main/privacy.md"
              }
              target="_blank"
            >
              Privacy policy
            </Link>
            <Link
              href={
                "https://github.com/musegit88/privacy-terms/blob/main/terms-of-use.md"
              }
              target="_blank"
            >
              Terms of service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
