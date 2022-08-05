import React, {useState, useCallback, useEffect, useMemo, useRef} from 'react';

import {
    Column,
    Table,
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    flexRender, createColumnHelper,
} from '@tanstack/react-table'

declare module '@tanstack/react-table' {
    interface TableMeta {
        updateData: (rowIndex: number, columnId: string, value: unknown) => void
    }
}

type Course = {
    id: number
    courseTitle: string
    credits: number
    grade: number
}

const TableCourseInput = () => {
    const defaultColumn: Partial<ColumnDef<Course>> = {
        cell: ({ getValue, row: { index }, column: { id }, table }) =>  {
            const [value, setValue] = useState('');

            const onBlur = () => {
                table.options.meta?.updateData(index, id, value);
            };

            return (
                <input
                    value={value as string}
                    onChange={e => setValue(e.target.value)}
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

    const columnHelper = createColumnHelper<Course>();

    const columns = useMemo<ColumnDef<Course>[]>(
        () => [
            {
                accessorKey: 'id',
                header: '#',
                footer: props => props.column.id,
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
        ],
        []
    );

    const [data, setData] = useState([{id: 1, courseTitle: null, credits: null, grade: null}]);

    const table = useReactTable({
        // @ts-ignore
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),

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
