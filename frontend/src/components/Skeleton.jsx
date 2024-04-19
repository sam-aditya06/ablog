export default function Skeleton({ count }) {
  const elements = [...Array(count)].map((_, i) => {
    return (
      <div key={i}>
        <div className="flex gap-4 rounded-md border p-2 w-[42rem] max-sm:flex-col max-sm:w-full dark:border-none dark:bg-[#383838]">
          <div
            className="max-sm:self-center max-sm:mt-2 min-w-48 w-48 h-48 dark:bg-[#494949] animate-pulse"
          >
          </div>
          <div className="grow flex flex-col gap-3">
            <div className="max-sm:text-center rounded-md h-8 dark:bg-[#494949] animate-pulse">
            </div>
            <div className="max-sm:self-center flex items-center gap-2 text-xs">
              <div className="rounded-full w-6 h-6 dark:bg-[#494949] animate-pulse"></div>
              <div className="w-32 h-4 dark:bg-[#494949] animate-pulse"></div>
              <div className="w-20 h-4 dark:bg-[#494949] animate-pulse"></div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <p className="w-full h-6 dark:bg-[#494949] animate-pulse"></p>
              <p className="w-full h-6 dark:bg-[#494949] animate-pulse"></p>
            </div>
            <div className="flex justify-end mt-auto">
                <div className="rounded-md w-24 h-8 dark:bg-[#494949] ">
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return elements;
}
