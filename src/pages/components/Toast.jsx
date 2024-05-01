function Toast(props) {
    return (
        <>
            {/* Toast */}
            {props.successToast && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center w-full max-w-xs p-4 text-white bg-green-500 rounded-lg shadow">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg">
                        <svg className="w-5 h-5 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                    </div>
                    <div className="ms-3 text-sm font-normal">{props.message}</div>

                    <button
                        type="button"
                        onClick={() => props.setSuccessToast(false)}
                        aria-label="Close"
                        className="btn btn-circle ms-auto -mx-1.5 -my-1.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            )}

        </>
    );
}

export default Toast;