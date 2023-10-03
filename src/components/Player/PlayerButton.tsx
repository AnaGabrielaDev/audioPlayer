export interface PlayerButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

export default function PlayerButton({ children, onClick }: PlayerButtonProps) {
    return (
        <button className="transparent p-6 rounded-full h-20 w-20" onClick={onClick}>{children}</button>
    )
}