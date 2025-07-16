import { NavLinkProps } from "@/props/NavLinkProps"
import Link from "next/link"

const NavLink = ({ src, href, children, isTg = false }: NavLinkProps) => {
    return (
        <Link
            className="flex gap-2 no-underline text-black font-medium"
            target={isTg ? '_blank' : '_self'}
            href={href}
        >
            <figure className="w-6 h-6">
                <img alt="icon" src={src} className="w-full h-full object-cover" />
            </figure>
            
            {children}
        </Link>
    )
}

export default NavLink