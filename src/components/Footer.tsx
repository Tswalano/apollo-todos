type Props = {}

export default function Footer({ }: Props) {
    return (
        <footer className="p-4 bg-white sm:p-6">
            <div className="mx-auto max-w-screen-xl">
                <hr className="my-6 border-gray-200 sm:mx-auto  lg:my-8" />
                <div className="flex justify-between">
                    <div className='items-center flex sm:text-center'>
                        Apollo
                        <p className="text-lg font-bold tracking-tight sm:text-xl text-indigo-600">Tasks</p>
                    </div>
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="text-sm text-gray-500 sm:text-center"> Apollo Tasks © 2022 All Rights Reserved.
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}