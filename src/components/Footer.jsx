export default function Footer() {
    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 bg-white">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/20 pb-6">

                {/* LOGO + DESCRIPTION */}
                <div className="md:max-w-96">
                    <div className="flex items-center gap-2 ">
                        <img 
                            src="/traindesk_logo.png" 
                            alt="TrainDesk Logo" 
                            className="w-12 h-12"
                        />
                        <h1 className="text-xl font-semibold text-blue-700">
                            TrainDesk
                        </h1>
                    </div>

                    <p className="mt-4 text-sm">
                        TrainDesk is a property of Hibon Technologies and reserves every right to it.
                    </p>
                </div>

                {/* RIGHT LINKS */}
                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="#" className="hover:text-blue-600">Home</a></li>
                            <li><a href="#" className="hover:text-blue-600">About us</a></li>
                            <li><a href="#" className="hover:text-blue-600">Contact us</a></li>
                            <li><a href="#" className="hover:text-blue-600">Privacy policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Get in touch</h2>
                        <div className="text-sm space-y-2">
                            <p className="hover:text-blue-600 cursor-pointer">+91 9079230480</p>
                            <p className="hover:text-blue-600 cursor-pointer">hibon.technologies@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>

            <p className="pt-4 text-center text-xs md:text-sm pb-5">
                Copyright 2025 © 
                <span className="text-blue-600"> Hibon Technologies</span>. All Rights Reserved.
            </p>
        </footer>
    );
}
