export const LoadingScreen = () => {
    return (
        <main className="main-container justify-center items-center">
            <span className="sr-only">Cargando...</span>
            <div role="status" className="size-24 flex justify-center items-center">
                <svg className='size-24 aspect-square animate-pulse fill-stannum' viewBox="0 0 2237 2236" xmlns="http://www.w3.org/2000/svg">
                    <path d="M992.746 1396.22H558.086L205.71 1044.28L1392.88 0.389202L278.932 2.07049e-05C110.249 -0.0555766 0.0555973 111.862 0 281.044V2235.79L992.746 1396.22Z" fill="current"/>
                    <path d="M1267.56 838.965H1676.98C1677.98 838.965 1678.92 839.354 1679.59 840.077L2028.07 1190.17C2029.58 1191.67 2029.52 1194.18 2027.91 1195.62L847.021 2227.34C844.407 2229.62 846.02 2233.85 849.467 2233.85L1962.41 2234.18C2113.42 2234.18 2235.84 2111.87 2235.9 1960.86L2236.56 13.0114C2236.56 9.84231 2232.84 8.1188 2230.45 10.1759L1265.06 832.46C1262.44 834.684 1264 839.021 1267.45 839.021L1267.56 838.965Z" fill="current"/>
                </svg>
            </div>
            {/* <div role="status" className="size-24 bg-gradient-to-br from-background-sidebar to-card rounded-full flex justify-center items-center relative">
                <svg className="size-full animate-spin-fast absolute top-0 left-0 right-0 mx-auto" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="stroke-card animate-pulse"
                    />
                    <path
                        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="stroke-stannum"
                    />
                </svg>
                <svg className='size-10 aspect-square animate-pulse fill-stannum relative z-10' viewBox="0 0 2237 2236" xmlns="http://www.w3.org/2000/svg">
                    <path d="M992.746 1396.22H558.086L205.71 1044.28L1392.88 0.389202L278.932 2.07049e-05C110.249 -0.0555766 0.0555973 111.862 0 281.044V2235.79L992.746 1396.22Z" fill="current"/>
                    <path d="M1267.56 838.965H1676.98C1677.98 838.965 1678.92 839.354 1679.59 840.077L2028.07 1190.17C2029.58 1191.67 2029.52 1194.18 2027.91 1195.62L847.021 2227.34C844.407 2229.62 846.02 2233.85 849.467 2233.85L1962.41 2234.18C2113.42 2234.18 2235.84 2111.87 2235.9 1960.86L2236.56 13.0114C2236.56 9.84231 2232.84 8.1188 2230.45 10.1759L1265.06 832.46C1262.44 834.684 1264 839.021 1267.45 839.021L1267.56 838.965Z" fill="current"/>
                </svg>
            </div> */}
        </main>
    )
}
