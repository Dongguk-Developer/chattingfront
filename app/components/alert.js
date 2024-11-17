export default function Alert({state}) {
    return(
        <>
            {state && (
                <div 
                    role="alert" 
                    className={`alert ${state.type === "success" ? "alert-success" : "alert-error"} absolute top-0 left-1/2 transform -translate-x-1/2 text-white text-xs max-w-xs`} 
                    style={{ fontFamily: 'NotoSansKR-Regular', display:'absolute',padding: '4px 8px', top: '120px', display: 'flex', alignItems: 'center' }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        {state.type === "success" ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        )}
                    </svg>
                    <span style={{ marginLeft: '8px' }}>{state.message}</span>
                </div>
            )}
        </>
    )
}
