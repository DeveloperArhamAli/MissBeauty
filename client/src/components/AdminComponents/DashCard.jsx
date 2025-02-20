function DashCard({
    heading,
    content,
    svg,
    svgBg,
}) {
    return (
        <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3">

            <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">

                <div className={`p-3 bg-opacity-75 rounded-full ${svgBg}`}>
                    {svg}
                </div>

                <div className="mx-5">
                    
                    <h4 className="text-2xl font-semibold text-gray-700">{heading}</h4>
                    <div className="text-gray-500">{content}</div>

                </div>

            </div>

        </div>
    )
}
export default DashCard