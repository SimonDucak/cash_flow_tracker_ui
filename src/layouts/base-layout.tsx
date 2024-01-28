export interface BaseLayoutProps {
    children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
    return (
        <main className="flex justify-center items-start py-40 min-h-screen px-2">
            <div className="max-w-[1280px] h-full w-full">
                {children} 
            </div>
        </main>
    )
}

export default BaseLayout