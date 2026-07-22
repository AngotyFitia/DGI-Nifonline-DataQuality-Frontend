type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex gap-2 justify-center mt-4 font-[Montserrat]">
      <button disabled={currentPage === 0} onClick={() => onPageChange(currentPage - 1)} className="px-3 py-1 rounded-md border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]">Précédent</button>
      {[...Array(totalPages)].map((_, i) => (
        <button key={i} className={`px-3 py-1 rounded-md ${ i === currentPage ? "bg-[var(--primary)] text-white" : "border border-[var(--border)]" }`}onClick={() => onPageChange(i)}>{i + 1}</button>
      ))}
      <button disabled={currentPage === totalPages - 1} onClick={() => onPageChange(currentPage + 1)} className="px-3 py-1 rounded-md border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]">Suivant</button>
    </div>
  );
}
