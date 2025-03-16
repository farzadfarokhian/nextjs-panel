"use client";

import { useState, useMemo, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { PencilIcon } from '@heroicons/react/24/solid';
import {
    ClientSideRowModelModule, ModuleRegistry,
    QuickFilterModule,
} from 'ag-grid-community';

ModuleRegistry.registerModules([
    QuickFilterModule,
    ClientSideRowModelModule,
]);


export default function Home() {
    const gridRef = useRef();

    const onFilterTextBoxChanged = useCallback((e) => {
        gridRef.current.api.setGridOption(
            "quickFilterText",
            e.target.value,
        );
    }, []);

    console.log("gridRef", gridRef)

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
        { headerName: 'وضعیت', field: 'price' },
        { headerName: 'تاریخ ثبت نام', field: 'price' },
        { headerName: 'ایمل', field: 'model' },
        { headerName: 'نام', field: 'make' }
    ]);

    const handleEdit = (params) => {
        alert(`ویرایش: ${params.data.make} ${params.data.model}`);
    };

    const [rowData] = useState([
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxster', price: 72000 }
    ]);


    return (
        <div className="flex flex-col items-center justify-center  ">
            <div className="flex items-center justify-center  ">
                <button className="px-6 py-3 hover:cursor-pointer bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300">
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
        </div>
    );
}