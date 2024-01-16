/* DataTable Header Data */
import React from "react";
import { MdEdit } from "react-icons/md";
import { FaTrashRestore } from "react-icons/fa";
import { FaRegImage } from "react-icons/fa6";

/*  PRODUCT    */
const PRODUCTHEADER = [
    {
        id: '1',
        name: 'SI NO',
        feild: 'sino',
        custom: true,
        headerstyleProps: { style: { textAlign: 'center ' } },
        contentstyleProps: { style: { textAlign: 'center', fontSize: 13 } },
        customdata: (x, i) => { return i + 1 }
    },
    {
        id: '2',
        name: 'Name',
        feild: 'name'
    },
    {
        id: '3',
        name: 'Category',
        feild: 'category'
    },
    {
        id: '3',
        name: 'Category',
        feild: 'category'
    },
    {
        id: '4',
        name: 'Description',
        feild: 'description',
        contentstyleProps: { style: { maxWidth: "300px", with: 'auto', textWrap: 'pretty' } },
        headerstyleProps: { style: { maxWidth: "300px", with: 'auto' } }
    },
    {
        id: '4',
        name: 'URL',
        feild: 'url',
        custom: true,
        contentstyleProps: { style: { textAlign: 'center', fontSize: 13 } },
        customdata: (x, i, setElement, onView, onImageView) => { return (x.url ? <FaRegImage className="primary-table-icon" onClick={() => onImageView(x)} /> : '-') }
    },
    {
        id: '5',
        name: 'Action',
        feild: 'action',
        custom: true,
        headerstyleProps: { style: { textAlign: 'center ' } },
        contentstyleProps: { style: { textAlign: 'center', fontSize: 13 } },
        customdata: (x, i, setElement, onView, onImageView, onDelete) => { return (<><MdEdit className="primary-table-icon" onClick={() => setElement(x)} /> <FaTrashRestore className="primary-table-icon" onClick={() => onDelete(x)} /> </>) }
    }
];

export const TableHeader = {
    PRODUCT: PRODUCTHEADER
}

