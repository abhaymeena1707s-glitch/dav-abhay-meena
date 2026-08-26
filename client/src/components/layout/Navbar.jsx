import { Menu, Search, Bell, ChevronDown } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Navbar = ({ onMenuClick }) => {
  const { admin } = useContext(AuthContext);

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="text-gray-500 hover:text-gray-700 lg:hidden"
        >
          <Menu size={24} />
        </button>
        <div className="hidden lg:flex lg:items-center lg:gap-2 lg:rounded-md lg:bg-gray-100 lg:px-3 lg:py-2">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search here..."
            className="bg-transparent text-sm outline-none placeholder:text-gray-500 w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-400 hover:text-gray-500">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3 border-l pl-4">
          <img
            src="https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff"
            alt="Admin"
            className="h-8 w-8 rounded-full"
          />
          <div className="hidden md:flex md:items-center md:gap-1">
            <span className="text-sm font-medium text-gray-700">
              {admin?.username || 'Admin'}
            </span>
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
