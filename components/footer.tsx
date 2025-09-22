import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className='bg-black text-gray-300 mt-10'>
      <div className='mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10'>
        {/* Brand + About */}
        <div>
          <h2 className='text-2xl font-bold text-yellow-400'>CineBook</h2>
          <p className='mt-3 text-sm leading-6'>
            Discover and book your favorite movies with the best cinema
            experience. Bringing you the latest blockbusters at your fingertips.
          </p>
          <div className='flex gap-4 mt-4'>
            <a
              href='#'
              className='hover:text-yellow-400'
            >
              <Facebook size={20} />
            </a>
            <a
              href='#'
              className='hover:text-yellow-400'
            >
              <Instagram size={20} />
            </a>
            <a
              href='#'
              className='hover:text-yellow-400'
            >
              <Twitter size={20} />
            </a>
            <a
              href='#'
              className='hover:text-yellow-400'
            >
              <Youtube size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className='text-lg font-semibold text-white mb-4'>Quick Links</h3>
          <ul className='space-y-2'>
            <li>
              <a
                href='/movies'
                className='hover:text-yellow-400'
              >
                Movies
              </a>
            </li>
            <li>
              <a
                href='/about'
                className='hover:text-yellow-400'
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href='/contact'
                className='hover:text-yellow-400'
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href='/faq'
                className='hover:text-yellow-400'
              >
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className='text-lg font-semibold text-white mb-4'>Support</h3>
          <ul className='space-y-2'>
            <li>
              <a
                href='/terms'
                className='hover:text-yellow-400'
              >
                Terms & Conditions
              </a>
            </li>
            <li>
              <a
                href='/privacy'
                className='hover:text-yellow-400'
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href='/help'
                className='hover:text-yellow-400'
              >
                Help Center
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className='text-lg font-semibold text-white mb-4'>Contact</h3>
          <p className='flex items-center gap-2'>
            <MapPin size={16} /> Ahmedabad, India
          </p>
          <p className='flex items-center gap-2 mt-2'>
            <Phone size={16} /> +91 XXXX XXXX
          </p>
          <p className='flex items-center gap-2 mt-2'>
            <Mail size={16} /> support@cinebook.com
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-700 py-4 text-center text-sm'>
        <p>© {new Date().getFullYear()} CineBook. All rights reserved.</p>
      </div>
    </footer>
  );
}
