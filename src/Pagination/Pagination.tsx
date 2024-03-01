import React, { ChangeEvent, useEffect, useState } from 'react'

type Props = {
    currentPage: number
    setCurrentPage: (page: number) => void
    limit: number
    elementsPerPage: number
    colorPrimary: string
    colorFont: string
}

const Pagination = (props: Props) => {
    const [showNext, setShowNext] = useState<boolean>(true);
    const [showPrevious, setShowPrevious] = useState<boolean>(true);
    const pageCount = Math.ceil(props.limit / props.elementsPerPage);
    const handlePrevious = () => {
        props.setCurrentPage(props.currentPage - 1);
    };
    const handleNext = () => {
        props.setCurrentPage(props.currentPage + 1);
    };

    useEffect(() => {
        if (pageCount === 1) {
            setShowNext(false)
            setShowPrevious(false)
            props.setCurrentPage(1)
        } else {
            props.currentPage === pageCount ? setShowNext(false) : setShowNext(true);
            props.currentPage === 1 ? setShowPrevious(false) : setShowPrevious(true);
        }
    }, [props.currentPage, pageCount]);
    // Pagination Input
    const [inputValue, setInputValue] = useState(props.currentPage.toString());

    const [hover1, setHover1] = useState(false);
    const [hover2, setHover2] = useState(false);
    const [hover3, setHover3] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
    };

    useEffect(() => {
        setInputValue(props.currentPage.toString());
    }, [props.currentPage]);
    const handleBlur = () => {
        const pageNumber = parseInt(inputValue, 10);
        if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= pageCount) {
            props.setCurrentPage(pageNumber);
        } else {
            setInputValue(props.currentPage.toString());
        }
    };



    return (
        <div>
            <div style={{ fontSize: '14px' }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        width: 'calc(100% - 40px)',
                        justifyContent: 'flex-end',
                        padding: '20px',
                    }}
                >
                    {showPrevious && (
                        <button
                            aria-label='Previous Page'
                            onClick={handlePrevious}
                            style={{
                                border: "none",
                                borderRadius: "5px",
                                padding: "2.5px 5px 2.5px",
                                fontWeight: "bold",
                                background: hover1 ? props.colorFont : props.colorPrimary,
                                color: hover1 ? props.colorPrimary : props.colorFont,
                                cursor: 'pointer'
                            }}
                            onMouseEnter={() => setHover1(true)}
                            onMouseLeave={() => setHover1(false)}
                        >
                            &laquo;
                        </button>
                    )}

                    <ul
                        style={{
                            margin: "0 10px 0",
                            padding: "0"
                        }}
                    >
                        <div
                            className="pagination-container"
                            style={{
                                display: 'flex',
                            }}
                        >
                            <input
                                aria-label='Change page'
                                type='text'
                                value={inputValue}
                                className="inputPage"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                style={{
                                    width: 'calc(50px - 30px)',
                                    border: "none",
                                    padding: "2.5px 15px 2.5px",
                                    borderRadius: "5px",
                                    textOverflow: "hidden",
                                    background: props.colorPrimary,
                                    color: props.colorFont,
                                    outline: "none"
                                }}
                            />
                            <button
                                onClick={handleBlur}
                                style={{
                                    border: "none",
                                    borderRadius: "5px",
                                    padding: "2.5px 5px 2.5px",
                                    marginLeft: "-15px",
                                    background: hover2 ? props.colorFont : props.colorPrimary,
                                    color: hover2 ? props.colorPrimary : props.colorFont,
                                    cursor: 'pointer'
                                }}
                                aria-label='Validation change page'
                                onMouseEnter={() => setHover2(true)}
                                onMouseLeave={() => setHover2(false)}
                            >
                                &#10140;
                            </button>
                        </div>
                    </ul>
                    {showNext && (
                        <button
                            aria-label='Next Page'
                            onClick={handleNext}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                border: "none",
                                borderRadius: "5px",
                                padding: "2.5px 5px 2.5px",
                                fontWeight: "bold",
                                background: hover3 ? props.colorFont : props.colorPrimary,
                                color: hover3 ? props.colorPrimary : props.colorFont,
                                cursor: 'pointer'
                            }}
                            onMouseEnter={() => setHover3(true)}
                            onMouseLeave={() => setHover3(false)}
                        >
                            &raquo;
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Pagination