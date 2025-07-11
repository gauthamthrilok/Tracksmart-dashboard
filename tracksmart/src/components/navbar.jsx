export default function Navbar() {
    return (
        <nav className="flex flex-row justify-between bg-blue-500 items-center px-6 py-4 relative">
            {/* Logo */}
            <div>
            <a href="/" className="font-platypi text-xl font-bold">
                Tracksmart
            </a>
            </div>

            {/* Nav Links */}
            <ul className="flex flex-row space-x-6">
            <li className="hover:underline underline-offset-4">
                <a href="/view">View orders</a>
            </li>
            <li className="hover:underline underline-offset-4">
                <a href="/trackorder">Track order</a>
            </li>
            </ul>
        </nav>
    );
}