import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-orange-50 via-white to-amber-50 px-6">

            <div className="max-w-xl text-center">

                <Image
                    src="https://illustrations.popsy.co/amber/crashed-error.svg"
                    alt="404 Illustration"
                    width={420}
                    height={420}
                    className="mx-auto"
                />

                <h1 className="mt-8 text-6xl font-bold text-gray-900">
                    404
                </h1>

                <h2 className="mt-4 text-3xl font-bold">
                    Page Not Found
                </h2>

                <p className="mt-4 text-lg text-gray-600">
                    Sorry, the page you are looking for does not exist or may
                    have been moved.
                </p>

                <Link
                    href="/"
                    className="mt-10 inline-flex items-center rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600"
                >
                    ← Back to Home
                </Link>

            </div>

        </div>
    );
}