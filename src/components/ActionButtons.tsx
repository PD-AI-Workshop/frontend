const ActionButtons = ({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) => {
    return (
        <div className="ml-10 md:ml-auto md:flex md:gap-2.5">
            <button
                onClick={onEdit}
                className="border-2 mb-2 rounded-2xl w-25 h-10 bg-amber-300 border-amber-500 cursor-pointer hover:bg-amber-600"
            >
                Изменить
            </button>
            <button
                onClick={onDelete}
                className="border-2 rounded-2xl w-25 h-10 bg-red-300 border-red-500 cursor-pointer hover:bg-red-600"
            >
                Удалить
            </button>
        </div>
    )
}

export default ActionButtons
