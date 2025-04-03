import Link from 'next/link';

const Header = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          ABConvert
        </Link>
        <div className="space-x-6">
          <Link href="/" className="hover:text-gray-600 transition-colors font-semibold">
            Home
          </Link>
          <Link href="/cart" className="hover:text-gray-600 transition-colors font-semibold">
            Cart
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
