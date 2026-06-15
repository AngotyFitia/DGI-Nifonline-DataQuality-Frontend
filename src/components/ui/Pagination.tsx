export default function Pagination() {
    return (
      <div className="flex gap-2 justify-center mt-4">
        <button className="px-3 py-1 bg-white/10 rounded">Prev</button>
        <button className="px-3 py-1 bg-blue-600 rounded">1</button>
        <button className="px-3 py-1 bg-white/10 rounded">2</button>
        <button className="px-3 py-1 bg-white/10 rounded">Next</button>
      </div>
    );
  }