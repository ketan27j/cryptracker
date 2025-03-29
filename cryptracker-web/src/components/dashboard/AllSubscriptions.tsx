import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  useReactTable, 
  getCoreRowModel, 
  getPaginationRowModel, 
  flexRender,
  createColumnHelper 
} from '@tanstack/react-table';
import  prisma  from 'prisma-shared'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllSubscriptions = () => {
  type Subscription = prisma.Subscription
  const API_HOST = import.meta.env.VITE_API_HOST || 'http://localhost:3004';
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  });

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_HOST}/api/subscription/all-subscriptions`);
        setData(response.data.subscriptions); // Assuming the API returns an array of subscriptions
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Column definition
  const columnHelper = createColumnHelper<Subscription>();
  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: info => info.getValue(),
      meta: { 
        mobileHidden: true 
      }
    }),
    columnHelper.accessor('transactionType', {
      header: 'Transaction Type',
      cell: info => info.getValue(),
      meta: {
        mobileHeader: true
      }
    }),
    columnHelper.accessor('addressType', {
        header: 'Address Type',
        cell: info => info.getValue(),
        meta: { 
          mobileHidden: true 
        }
      }),
    columnHelper.accessor('address', {
      header: 'Address',
      cell: info => info.getValue(),
      meta: { 
        mobileHidden: true 
      }
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => (
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(info.getValue())}`}>
          {info.getValue()}
        </span>
      )
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const subscriptionRow = row.original as Subscription;
        return (
          <button 
            onClick={() => deleteRow(subscriptionRow)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Delete
          </button>
        );
      }
    })
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'RUNNING': return 'bg-green-100 text-green-800';
      case 'STOPPED': return 'bg-red-100 text-red-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

// Row action handler
const deleteRow = async (rowData: Subscription) => {
    console.log('Row action for:', rowData);
    try {
        const response = await axios.post(`${API_HOST}/api/subscription/delete-subscription`, { id: rowData.id });
        if (response && response.data.success) {
            toast.success('Subscription deleted successfully!');
            setData(data.filter((row: Subscription) => row.id !== rowData.id));
        }
    } catch (error) {
        console.error('Error deleting subscription:', error);
    }
};

  // Create table instance
  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Mobile card view for each row
  const MobileRowCard = ({ row }: { row: Subscription }) => {
    return (
      <div className="bg-white shadow rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{row.id}</h3>
          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(row.status)}`}>
            {row.status}
          </span>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>Address Type:</strong> {row.addressType}</p>
          <p><strong>Transaction Type:</strong> {row.transactionType}</p>
          <p><strong>Address:</strong> {row.address}</p>
        </div>
        <div className="mt-4 flex justify-end">
          <button 
            onClick={() => deleteRow(row)}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            View Details
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
    <ToastContainer position="top-right" autoClose={5000} />
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto shadow rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id} 
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr 
                key={row.id} 
                className="hover:bg-gray-50 border-b last:border-b-0"
              >
                {row.getVisibleCells().map(cell => (
                  <td 
                    key={cell.id} 
                    className="px-4 py-3 text-sm"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {table.getRowModel().rows.map(row => (
          <MobileRowCard key={row.id} row={row.original as Subscription} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        
        {table.getPageOptions().map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => table.setPageIndex(pageNumber)}
            className={`
              px-4 py-2 rounded
              ${table.getState().pagination.pageIndex === pageNumber 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }
            `}
          >
            {pageNumber + 1}
          </button>
        ))}

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllSubscriptions;