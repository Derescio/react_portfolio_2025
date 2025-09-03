type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    // const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null;
    return (
        <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => onPageChange(index + 1)}
                    className={`px-4 py-2 cursor-pointer rounded 
          ${currentPage === index + 1 ? "bg-blue-500 text-white"
                            : "bg-gray-200"}`
                    }
                >
                    {index + 1}
                </button>
            ))}
        </div>
    )
}

export default Pagination
