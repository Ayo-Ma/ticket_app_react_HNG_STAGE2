export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 text-center">
      <p className="text-lg font-medium">
        © {new Date().getFullYear()} TicketApp. All rights reserved.
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Built with ❤️ by Asimiyu Abdulmaleek.
      </p>
    </footer>
  );
}
