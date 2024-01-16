
// reactstrap components
import InputSelect from "../Select";
import React, { useEffect } from "react";
import { BsArrowDown } from "react-icons/bs";
import {
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Row,
    Col,
} from "reactstrap";
import './index.css'
import { IF } from "../../service/util/Conditional";
import Button from "../Button";
import { TableHeader } from "./TableHeader";

// core components

const Tables = (props) => {

    let {
        HeaderName,
        TableData = [],
        setElement = {},
        onView = {},
        onDelete = {},
        onImageView = {},
        downloadButton = false,
        downloadFuc
    } = props;

    const showmore = [
        { option: 5, id: 1 },
        { option: 10, id: 2 },
        { option: 20, id: 3 },
        { option: 50, id: 4 },
        { option: 100, id: 5 }];

    const [currentPage, setCurrentPage] = React.useState(1);
    const [minPageLimit, setMinPageLimit] = React.useState(1);
    const [maxPageLimit, setMaxPageLimit] = React.useState(4);

    const [show, setShow] = React.useState({ label: 5, value: 5 });

    const [totalPage, setTotalPage] = React.useState();
    const [minData, setMinData] = React.useState(0);
    const [maxData, setMaxData] = React.useState(show.value);

    const [tableData, setTableData] = React.useState([]);

    React.useEffect(() => {
        _reset();
    }, [TableData])

    //Header Components

    const Header = () => TableHeader[HeaderName].map((x, i) => {
        let style = x.headerstyleProps || {}
        return <th key={i} className="text-center primary-table-header" scope="col" {...style} >{x.name}</th>
    });

    //Content Components

    const Content = () => TableData.length > 0 && TableData.map((x, i) => (minData < i + 1 && maxData >= i + 1) && <tr key={i}>
        {TableHeader[HeaderName].map((y, j) => {
            let style = y.contentstyleProps || {};
            return <td key={`${i}-${j}`} scope="row" {...style} >{y.custom ? y.customdata(x, i, setElement, onView, onImageView, onDelete) : x[y.feild]}</td>
        })}
    </tr>)

    //Pagination Components

    const PaginationData = () => totalPage.length > 0 && totalPage.map((x, i) =>

        (minPageLimit <= x && maxPageLimit >= x) && <>{
            x === currentPage ?
                <PaginationItem key={i} className="active">
                    <PaginationLink
                        onClick={() => _OnPaginationAct('crt', x)}
                    >
                        {x}
                    </PaginationLink>
                </PaginationItem> :
                <PaginationItem key={i} >
                    <PaginationLink
                        onClick={() => _OnPaginationAct('crt', x)}
                    >
                        {x}
                    </PaginationLink>
                </PaginationItem>
        }
        </>
    );

    //Pagination initial fuc

    const PageFuc = () => {
        setTotalPage('');
        setTableData([]);

        let data = Math.ceil(TableData.length / show.value) || 1;
        let page = [];

        for (let index = 1; index <= data; index++) {
            page.push(index);
        }


        if (currentPage > 1 && currentPage <= data) {
            let min = show.value * (currentPage - 1), max = show.value * currentPage;
            setMinData(min);
            setMaxData(max);
        }

        if (currentPage === 1) {
            setMinData(0);
            setMaxData(show.value);
        }
        setTableData(tableData);
        setTotalPage(page);
    }

    //useEffect  for call initial function 

    useEffect(() => {
        return PageFuc();
    }, [show, currentPage, TableData]);

    // Reset Function

    const _reset = () => {
        setCurrentPage(1);
        setMinPageLimit(1)
        setMaxPageLimit(4);
        setMinData(0);
        setMaxData(show.value);
    }

    // pagination functionality

    const _OnPaginationAct = (action, value) => {

        let maction = '';
        let len = totalPage[totalPage.length - 1];

        if (action === 'first') {
            setCurrentPage(1);
            setMinPageLimit(1);
            setMaxPageLimit(4);
        }

        if (action === 'last') {
            setCurrentPage(totalPage[totalPage.length - 1]);
            setMinPageLimit(len > 4 ? totalPage[totalPage.length - 5] : 1);
            setMaxPageLimit(totalPage[totalPage.length - 1]);
        }

        if (action === 'inc' && currentPage < totalPage[totalPage.length - 1]) {
            setCurrentPage(currentPage + 1);
            maction = 'plus';
        }

        if (action === 'dec' && currentPage > totalPage[0]) {
            setCurrentPage((prevs) => prevs - 1);
            maction = 'sub';
        }

        if (action === 'crt' && currentPage !== value) {
            setCurrentPage(value);
            if (value > currentPage) {
                maction = 'plus';
            } else if (value < currentPage) {
                maction = 'sub';
            }
        }

        if (len < 4) {
            setMinPageLimit(1);
            setMaxPageLimit(totalPage[totalPage.length - 1]);
        } else {

            if (maction === 'plus') {
                setMaxPageLimit(maxPageLimit + 1);
                setMinPageLimit(minPageLimit + 1);
            }

            if (maction === 'sub') {
                setMaxPageLimit(maxPageLimit - 1);
                setMinPageLimit(minPageLimit - 1);
            }
        }
    }

    /* Button Css */

    const BtnProps = {
        downloadBin: {
            name: 'Download',
            bgColor: '#172b4d',
            width: '80%',
            textColor: '#fff',
            borderRadiusValue: '0.25rem',
            borderless: true,
            shadow: true,
            onClick: () => downloadFuc()
        },
    }


    return (
        <>
            {/* Page content */}

            {/* Table */}

            <Row className="pl-3 p-3" style={{ justifyContent: 'space-between' }} >
                <Col lg={2} sm={8} md={6} xs={8}>
                    <InputSelect
                        title={true}
                        name={<span>Row Per Page : <BsArrowDown /></span>}
                        titleStyle={{ marginBottom: '10px' }}
                        options={showmore}
                        value={show}
                        onSelect={(field, value) => { setShow(value); _reset(); }}
                        field={'option'}
                        label={'option'}
                        placeholder={"Select Row Pre Page"}
                    />
                </Col>

                <IF condition={downloadButton}>
                    <Col className="mt-4" lg={2} md={6} sm={6} xs={8}>
                        <Button {...BtnProps.downloadBin} />
                    </Col>
                </IF>
            </Row>
            <Row className="pl-1 p-2 " >
                <Col>
                    <Table className="align-items-start table-flush" responsive>
                        <thead className="thead-light">
                            <tr>
                                <Header />
                            </tr>
                        </thead>
                        <tbody>
                            <Content />
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <CardFooter className="py-4 border-0">
                <nav aria-label="...">
                    <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                    >
                        <PaginationItem >
                            <PaginationLink
                                onClick={() => _OnPaginationAct('first')}
                                tabIndex="-1"
                            >
                                <i className="fas fa-angle-left" />
                                <i className="fas fa-angle-left" />
                                <span className="sr-only">Previous</span>
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem >
                            <PaginationLink
                                onClick={() => _OnPaginationAct('dec')}
                                tabIndex="-1"
                            >
                                <i className="fas fa-angle-left" />
                                <span className="sr-only">Previous</span>
                            </PaginationLink>
                        </PaginationItem>
                        {totalPage && <PaginationData />}
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => _OnPaginationAct('inc')}
                            >
                                <i className="fas fa-angle-right" />
                                <span className="sr-only">Next</span>
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink
                                onClick={() => _OnPaginationAct('last')}
                            >
                                <i className="fas fa-angle-right" />
                                <i className="fas fa-angle-right" />
                                <span className="sr-only">Next</span>
                            </PaginationLink>
                        </PaginationItem>
                    </Pagination>
                </nav>
            </CardFooter>

        </>
    );
};

export default Tables;
