const Footer = () => {
    return (
        <footer className="flex justify-between items-center gap-8 h-[104px] py-5 px-20">
            <div className="h-full">
                <figure className="h-full">
                    <a href="/">
                        <img src="/img/logo.svg" className="w-full h-full object-cover" alt="logotype" />
                    </a>
                </figure>
            </div>

            <p className="font-normal">2025</p>
        </footer>
    )
}

export default Footer