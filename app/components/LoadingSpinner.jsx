export default function LoadingSpinner() {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-[#FF6B35]"></div>
            </div>
        </div>
    );
}