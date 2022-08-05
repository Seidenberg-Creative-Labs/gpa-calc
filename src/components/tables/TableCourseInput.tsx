import React, {useState, useCallback, useEffect, useMemo, useRef, ChangeEvent} from 'react';

import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    flexRender,
} from '@tanstack/react-table'
import TextInput from "../Input/TextInput";
import {IoClose} from "react-icons/io5";
import {CSSTransition, TransitionGroup} from "react-transition-group";

declare module '@tanstack/react-table' {
    interface TableMeta {
        updateData: (rowIndex: number, columnId: string, value: unknown) => void
    }
}

type Course = {
    courseTitle: string;
    credits: number;
    grade: number;
};

const TableCourseInput = props => {
    const defaultColumn: Partial<ColumnDef<Course>> = {
        cell: ({ getValue, row: { index }, column: { id }, table }) =>  {
            const [value, setValue] = useState('');

            const onBlur = () => {
                table.options.meta?.updateData(index, id, value);
            };

            return (
                <TextInput
                    // @ts-ignore
                    type="text"
                    value={value as string}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        console.log('changeKey')
                        setValue(e.target.value)
                    }}
                    onBlur={onBlur}
                />
            );
        },
    };

    const useSkipper = () => {
        const shouldSkipRef = useRef(true);
        const shouldSkip = shouldSkipRef.current;

        const skip = useCallback(() => {
            shouldSkipRef.current = false;
        }, []);

        useEffect(() => {
            shouldSkipRef.current = true;
        });

        return [shouldSkip, skip] as const;
    };

    const columns = useMemo<ColumnDef<Course>[]>(
        () => [
            {
                accessorKey: 'id',
                header: '#',
                footer: props => props.column.id,
                cell: props => (<span style={{fontWeight: 'bold'}}>{props.row.index + 1 as number}</span>)
            },
            {
                accessorKey: 'courseTitle',
                header: 'Course Title',
                footer: props => props.column.id,
            },
            {
                accessorKey: 'credits',
                header: 'Credits/Hours *',
                footer: props => props.column.id,
            },
            {
                accessorKey: 'grade',
                header: 'Grade *',
                footer: props => props.column.id,
            },
            {
                accessorKey: 'deleteRow',
                header: '',
                cell: row => (
                    <div
                        style={{alignContent: 'center', justifyContent: 'center', cursor: 'pointer'}}
                        onClick={() => {
                            const dataCopy = [...data];
                            dataCopy.splice(row.row.index, 1);
                            console.log(JSON.stringify(row.row));
                            setData(dataCopy);
                        }}>
                        <IoClose size={24} />
                    </div>
                )
            },
        ],
        []
    );

    const [data, setData] = useState(props.data);

    const table = useReactTable({
        // @ts-ignore
        data,
        columns,
        defaultColumn,
        getCoreRowModel: getCoreRowModel(),
        debugTable: true,
    });

    return (
        <div className="p-2">
            <table>
                <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody>
                {table.getRowModel().rows.map(row => {
                    return (
                        // <TransitionGroup component="tbody">
                        //     {data.map((data, index) => (
                        //     <CSSTransition key={index} timeout={500} classNames="fade">
                                <tr key={row.id}>
                                    {row.getVisibleCells().map(cell => {
                                        return (
                                            <td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        )
                                    })}
                                </tr>
                        //     </CSSTransition>
                        //     ))}
                        // </TransitionGroup>
                    )})
                }
                </tbody>
                {/*<tfoot>*/}
                {/*    {table.getFooterGroups().map(footerGroup => (*/}
                {/*        <tr key={footerGroup.id}>*/}
                {/*            {footerGroup.headers.map(header => (*/}
                {/*                <th key={header.id}>*/}
                {/*                    {header.isPlaceholder*/}
                {/*                        ? null*/}
                {/*                        : flexRender(*/}
                {/*                            header.column.columnDef.footer,*/}
                {/*                            header.getContext()*/}
                {/*                        )}*/}
                {/*                </th>*/}
                {/*            ))}*/}
                {/*        </tr>*/}
                {/*    ))}*/}
                {/*</tfoot>*/}
            </table>
        </div>
    );
};

export default TableCourseInput;
