import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

function DropdownMenu({ items }) {
  // The animated underline effect using Tailwind CSS
  const navLinkClass = "relative font-medium text-gray-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-gray-800 after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 hover:text-black";

  return (
    <div className="max-w-7xl mx-auto px-8 py-8 flex flex-wrap gap-x-16 gap-y-8 justify-start text-black">
      {items.map((column) => (
        <div key={column.title} className="flex flex-col w-52">
          {/* Column Title */}
          <h3 className="font-semibold mb-4 uppercase flex items-center justify-between">
            {column.title}
            <Link
              to={`/${column.title.toLowerCase()}/all`} 
              className="text-black transition-all duration-200 flex items-center space-x-1"
            >
              <span className='text-xs font-normal'>ALL</span>
              <ArrowRightIcon className="h-3 w-3" />
            </Link>
          </h3>

          {/* Column Links */}
          <ul className="space-y-3">
            {column.links.map((link) => (
              <li key={link.label}>
                <Link to={link.path} className={navLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default DropdownMenu;