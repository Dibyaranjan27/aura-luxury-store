import { Link } from "react-router-dom";

function MobileDropdownMenu({ items, onLinkClick }) {
  const navLinkClass = "text-gray-700 text-sm hover:text-black transition-colors";

  return (
    <div className="pl-6 pt-2 pb-2">
      <ul className="space-y-3">
        {items.map((column) =>
          column.links.map((link) => (
            <li key={link.label}>
              <Link
                to={link.path}
                className={navLinkClass}
                onClick={onLinkClick} // This closes the whole menu on navigation
              >
                {link.label}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default MobileDropdownMenu;