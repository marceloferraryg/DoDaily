type Props = {
  onClick: () => void
}

export function FabButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-10 right-10
        w-18 h-18
        rounded-full
        bg-(--color-primary)
        text-white text-5xl
        flex items-center justify-center
        shadow-lg
        active:scale-95 transition
      "
    >
      +
    </button>
  )
}