"use client";

import { useState, useMemo, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { PencilIcon } from '@heroicons/react/24/solid';
import Modal from "../modal";

import {
    ClientSideRowModelModule, ModuleRegistry,
    QuickFilterModule,
} from 'ag-grid-community';

ModuleRegistry.registerModules([
    QuickFilterModule,
    ClientSideRowModelModule,
]);

export default function Home() {
    const [rowData, setRowData] = useState([
        { id: 1, name: 'علی', email: 'Celica@gmail.com', date: '23/08/1400', state: 'فعال' },
        { id: 2, name: 'حسن', email: 'Mondeo@gmail.com', date: '23/08/1400', state: 'فعال' },
        { id: 3, name: 'حسین', email: 'Boxster@gmail.com', date: '23/08/1400', state: 'فعال' },
        { id: 4, name: 'ندا', email: 'Boxster1@gmail.com', date: '23/08/1400', state: 'فعال' },
        { id: 5, name: 'سارا', email: 'Bo2@gmail.com', date: '23/08/1400', state: 'فعال' },
        { id: 6, name: 'محسن', email: 'Boxs3@gmail.com', date: '23/08/1400', state: 'فعال' },
        { id: 7, name: 'ندا', email: 'Bor1@gmail.com', date: '23/08/1400', state: 'فعال' },
        { id: 8, name: 'سارا', email: 'test2@gmail.com', date: '23/08/1400', state: 'فعال' },
        { id: 9, name: 'محسن', email: 'tester3@gmail.com', date: '23/08/1400', state: 'فعال' }
    ]);

    const initFormData = {
        name: "",
        email: "",
        date: "",
        state: ""
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
 
    const [formData, setFormData] = useState(initFormData);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedRow(null);
        setFormData(initFormData);
        setIsModalOpen(false);
    };

    const gridRef = useRef();

    const onFilterTextBoxChanged = useCallback((e) => {
        gridRef.current.api.setGridOption(
            "quickFilterText",
            e.target.value,
        );
    }, []);

    const gridStyle = useMemo(() => ({ width: "100%", textAlign: 'center', maxWidth: '63rem' }), []);

    const [columnDefs] = useState([
        {
            headerName: 'ویرایش',
            sortable: false,
            cellRenderer: (params) => {
                return (
                    <button
                        onClick={() => handleEdit(params)}
                        className="h-full"
                    >
                        <PencilIcon className="h-5 w-5 hover:cursor-pointer" />
                    </button>
                );
            }
        },
        { headerName: 'وضعیت', field: 'state' },
        { headerName: 'تاریخ ثبت نام', field: 'date' },
        { headerName: 'ایمل', field: 'email' },
        { headerName: 'نام', field: 'name' }
    ]);

    const handleEdit = (params) => {
        setSelectedRow(params.data);
        setFormData({
            name: params.data.name,
            email: params.data.email,
            date: params.data.date,
            state: params.data.state,

        });
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = () => {
        let newRowData={};

        if (selectedRow) {
            newRowData = rowData.map((row) =>
                row.id === selectedRow.id
                    ? { ...row, ...formData }
                    : row
            );
            setRowData(newRowData);
        } else {
            newRowData = {...formData, id: Number(rowData.length + 1) };
            setRowData((prevData) => [ ...prevData, newRowData ]); 
        }

        setSelectedRow(null);
        setFormData(initFormData);
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col items-center justify-center  ">
            <div className="flex items-center justify-center  ">
                <button onClick={openModal} className="px-6 py-3 hover:cursor-pointer bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300">
                    ایجاد جدید
                </button>
                <input
                    type="text"
                    id="filter-text-box"
                    placeholder="جستجو ..."
                    onInput={onFilterTextBoxChanged}
                    className='p-3 m-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 shadow-sm hover:shadow-md'
                />
            </div>
            <div style={gridStyle}>
                <AgGridReact
                    columnDefs={columnDefs}
                    ref={gridRef}
                    rowData={rowData}
                    modules={[ClientSideRowModelModule]}
                    domLayout="autoHeight"
                />
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} title="ویرایش اطلاعات">
                <div className="mb-4">
                    <label className="block text-gray-700">نام</label>
                    <input
                        type="text"
                        name="name"
                        value={formData?.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">ایمیل</label>
                    <input
                        type="text"
                        name="email"
                        value={formData?.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">تاریخ ثبت نام</label>
                    <input
                        type="text"
                        name="date"
                        value={formData?.date}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">وضعیت</label>
                    <input
                        type="text"
                        name="state"
                        value={formData?.state}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
                    />
                </div>
            </Modal>
        </div>
    );
}