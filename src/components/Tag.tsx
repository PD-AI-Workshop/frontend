const Tag = ({ name }: { name: string }) => {
    return (
        <div className="inline-block py-2.5 px-2 rounded-[12px] bg-[rgba(243,243,247,1)]">
            <p className="text-lg font-semibold text-black">{name}</p>
        </div>
    )
}

export default Tag
