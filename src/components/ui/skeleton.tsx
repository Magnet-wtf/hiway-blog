const Skeleton = ({ className }: any) => (
    <div aria-live='polite' aria-busy='true' className={className}>
        <span className='inline-flex w-full animate-pulse select-none rounded-md bg-gray-300 leading-none'>‌</span>
        <br />
    </div>
);

const SVGSkeleton = ({ className }: any) => <svg className={className + ' animate-pulse rounded bg-gray-300'} />;

export const MainLoadingSkeleton = () => (
    <>
        <div className='flex space-y-5 justify-start items-center w-full px-12 pb-12'>
            <SVGSkeleton className='rounded-xl w-[550px] h-[350px]' />
            <a className='max-w-xl ml-8'>
                <h2>
                    <Skeleton className='w-[240px] max-w-full' />
                </h2>
                <h1 className='leading-[72px]'>
                    <Skeleton className='w-[360px] max-w-full' />
                    <span>
                        <Skeleton className='w-[88px] max-w-full' />
                    </span>
                </h1>
                <span></span>
            </a>
        </div>
    </>
);

export const LoadingSkeleton = () => (
    <>
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-8'>
            <div className='flex flex-col space-y-5 justify-center items-center'>
                <SVGSkeleton className='w-[400px] h-[400px]' />
                <a className='max-w-sm'>
                    <h2>
                        <Skeleton className='w-[240px] max-w-full' />
                    </h2>
                    <h2>
                        <Skeleton className='w-[360px] max-w-full' />
                    </h2>
                    <span></span>
                </a>
            </div>
            <div className='flex flex-col space-y-5 justify-center items-center'>
                <SVGSkeleton className='w-[400px] h-[400px]' />
                <a className='max-w-sm'>
                    <h2>
                        <Skeleton className='w-[240px] max-w-full' />
                    </h2>
                    <h2>
                        <Skeleton className='w-[392px] max-w-full' />
                    </h2>
                    <span></span>
                </a>
            </div>
            <div className='flex flex-col space-y-5 justify-center items-center'>
                <SVGSkeleton className='w-[400px] h-[400px]' />
                <a className='max-w-sm'>
                    <h2>
                        <Skeleton className='w-[240px] max-w-full' />
                    </h2>
                    <h2>
                        <Skeleton className='w-[632px] max-w-full' />
                    </h2>
                    <span></span>
                </a>
            </div>
            <div className='flex flex-col space-y-5 justify-center items-center'>
                <SVGSkeleton className='w-[400px] h-[400px]' />
                <a className='max-w-sm'>
                    <h2>
                        <Skeleton className='w-[240px] max-w-full' />
                    </h2>
                    <h2>
                        <Skeleton className='w-[360px] max-w-full' />
                    </h2>
                    <span></span>
                </a>
            </div>
            <div className='flex flex-col space-y-5 justify-center items-center'>
                <SVGSkeleton className='w-[400px] h-[400px]' />
                <a className='max-w-sm'>
                    <h2>
                        <Skeleton className='w-[240px] max-w-full' />
                    </h2>
                    <h2>
                        <Skeleton className='w-[424px] max-w-full' />
                    </h2>
                    <span></span>
                </a>
            </div>
            <div className='flex flex-col space-y-5 justify-center items-center'>
                <SVGSkeleton className='w-[400px] h-[400px]' />
                <a className='max-w-sm'>
                    <h2>
                        <Skeleton className='w-[240px] max-w-full' />
                    </h2>
                    <h2>
                        <Skeleton className='w-[464px] max-w-full' />
                    </h2>
                    <span></span>
                </a>
            </div>
            <div className='flex flex-col space-y-5 justify-center items-center'>
                <SVGSkeleton className='w-[400px] h-[400px]' />
                <a className='max-w-sm'>
                    <h2>
                        <Skeleton className='w-[240px] max-w-full' />
                    </h2>
                    <h2>
                        <Skeleton className='w-[384px] max-w-full' />
                    </h2>
                    <span></span>
                </a>
            </div>
            <div className='flex flex-col space-y-5 justify-center items-center'>
                <SVGSkeleton className='w-[400px] h-[400px]' />
                <a className='max-w-sm'>
                    <h2>
                        <Skeleton className='w-[240px] max-w-full' />
                    </h2>
                    <h2>
                        <Skeleton className='w-[504px] max-w-full' />
                    </h2>
                    <span></span>
                </a>
            </div>
            <div className='flex flex-col space-y-5 justify-center items-center'>
                <SVGSkeleton className='w-[400px] h-[400px]' />
                <a className='max-w-sm'>
                    <h2>
                        <Skeleton className='w-[240px] max-w-full' />
                    </h2>
                    <h2>
                        <Skeleton className='w-[408px] max-w-full' />
                    </h2>
                    <span></span>
                </a>
            </div>
        </div>
    </>
);
