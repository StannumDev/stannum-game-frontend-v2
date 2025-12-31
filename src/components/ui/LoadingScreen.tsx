interface Props{
    fullScreen?: boolean;
}

export const LoadingScreen = ({ fullScreen = false }: Props) => {
    return (
        <main className={`main-container size-full justify-center items-center ${fullScreen ? 'min-h-dvh' : 'min-h-0'}`}>
            <span className="sr-only">Cargando...</span>
            <div role="status" className="size-24 flex justify-center items-center">
                <svg className='size-24 aspect-square animate-pulse fill-stannum' viewBox="0 0 2237 2236" xmlns="http://www.w3.org/2000/svg">
                    <path d="M992.746 1396.22H558.086L205.71 1044.28L1392.88 0.389202L278.932 2.07049e-05C110.249 -0.0555766 0.0555973 111.862 0 281.044V2235.79L992.746 1396.22Z" fill="current"/>
                    <path d="M1267.56 838.965H1676.98C1677.98 838.965 1678.92 839.354 1679.59 840.077L2028.07 1190.17C2029.58 1191.67 2029.52 1194.18 2027.91 1195.62L847.021 2227.34C844.407 2229.62 846.02 2233.85 849.467 2233.85L1962.41 2234.18C2113.42 2234.18 2235.84 2111.87 2235.9 1960.86L2236.56 13.0114C2236.56 9.84231 2232.84 8.1188 2230.45 10.1759L1265.06 832.46C1262.44 834.684 1264 839.021 1267.45 839.021L1267.56 838.965Z" fill="current"/>
                </svg>
            </div>
        </main>
    )
}