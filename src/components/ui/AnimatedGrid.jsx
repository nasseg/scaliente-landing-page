const AnimatedGrid = () => {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
            </div>
            <div
                className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-orange-500 opacity-20 blur-[100px]">
            </div>
            <div
                className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-purple-600 opacity-20 blur-[100px]">
            </div>
        </div>
    );
};

export default AnimatedGrid;
