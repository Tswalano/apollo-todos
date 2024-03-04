type Props = {}

export default function Footer({ }: Props) {
    return (
        <footer className="p-4 bg-white sm:p-6">
            <div className="mx-auto max-w-screen-xl">
                <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center"> Apollo Project © 2022 All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    )
}