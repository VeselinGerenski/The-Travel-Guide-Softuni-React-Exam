export default function Footer() {
    return (
        <footer className="
            w-full mt-10 
            bg-black/40 backdrop-blur-md 
            border-t border-white/20 
            text-white
        ">
            <div className="max-w-6xl mx-auto px-1 py-1 text-center">

                {/* Bottom copyright */}
                <p className="text-xs text-white">
                    © {new Date().getFullYear()} The Travel Guide — All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}
