import React, {useEffect, useState} from 'react';
// import { Popover } from '@headlessui/react';
import TableLoader from '@/components/banners/TableLoader';
import clsx from 'clsx';
import {renderCell} from '@/components/DataGrid';
import {MoreVertical} from 'react-feather';
import {createPortal} from 'react-dom';
import Button from '@/components/Button';

const DataGridWithActions = ({data, columns, tHeadProps, isLoading, loader, actions}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [popoverPosition, setPopoverPosition] = useState({top: 0, left: 0});


  const closePopover = () => {
    setIsOpen(false);
    setSelectedRowIndex(null);
  };
  const handleButtonActionsClick = (event, rowIndex) => {
    const button = event.currentTarget;
    const popoverWidth = 94;
    const popoverPosition = calculatePopoverPosition(button, popoverWidth);
    setPopoverPosition(popoverPosition);
    if (selectedRowIndex !== rowIndex) {
      openPopover(rowIndex);
    } else {
      closePopover();
    }
  };

  const calculatePopoverPosition = (button, popoverWidth) => {
    const buttonRect = button.getBoundingClientRect();
    const spaceRight = window.innerWidth - buttonRect.right;
    const top = buttonRect.bottom + window.scrollY;
    let left = buttonRect.right + window.scrollX;
    if (spaceRight < popoverWidth) {
      left = buttonRect.left + window.scrollX - popoverWidth;
    }
    return {
      top,
      left,
    };
  };


  const handleOutsideClick = (event) => {
    // event.stopPropagation();
    const target = event.target;
    if (isOpen) {
      const popover = document.querySelector('.popover');
      if (popover && !popover.contains(target) && !target.parentNode?.classList.contains('actions-button')) {
        closePopover();
      }
    }
  };

  useEffect(() => {
    if(isOpen) closePopover()
  },[data])

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', closePopover);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', closePopover);
    };
  }, [isOpen]);


  const openPopover = (rowIndex) => {
    setIsOpen(true);
    setSelectedRowIndex(rowIndex);
  };
  const handleScroll = () => {
    console.log('scrolling');
    if (isOpen) closePopover();
  };
  return (
    <div className="w-full relative">
      <table className="w-full text-sm text-left text-gray-500 -dark:text-gray-40 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 -dark:bg-gray-700 -dark:text-gray-400">
        <tr>
          {columns.map((column) => (
            <th scope="col" className="px-6 py-3" {...tHeadProps}
                key={`thead-${column.key as React.Key}-${Math.random()}`}>{column.label}</th>
          ))}
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sr-only">
            Actions
          </th>
        </tr>
        </thead>
        <tbody>
        {isLoading && (<tr
          className="bg-white border-b -dark:bg-gray-800 -dark:border-gray-700 hover:bg-gray-50 -dark:hover:bg-gray-600">
          <td colSpan={columns.length} className="text-center">{loader || <TableLoader columnLength={columns.length}/>}
          </td>
        </tr>)}
        {isLoading || (data.length === 0 ?
          <tr
            className="bg-white border-b -dark:bg-gray-800 -dark:border-gray-700 hover:bg-gray-50 -dark:hover:bg-gray-600">
            <td colSpan={columns.length} className="text-center">No Data Found</td>
          </tr>
          :
          data.map((row, index) => (

            <tr
              className="bg-white border-b -dark:bg-gray-800 -dark:border-gray-700 hover:bg-gray-50 -dark:hover:bg-gray-600"
              key={`row-${index}`}>
              {columns.map((column) => (
                <td key={`row-cell-${column.key as React.Key}-${Math.random()}`}
                    className={clsx('px-6 py-4', column.key ? 'table-cell' : 'd-flex justify-content-end')}>
                  {column.key ? renderCell(column, row) : renderCell(column, column.customKey)}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-start text-sm font-medium">
                <Button
                  size={'small'}
                  intent={'text'}
                  // ref={buttonRefs.current[selectedRowIndex]}
                  onClick={(e) => handleButtonActionsClick(e, index)}
                  className="text-gray-400 hover:text-gray-600 actions-button"
                >
                  <MoreVertical size={20}/>
                </Button>
              </td>
            </tr>
          )))}
        </tbody>

      </table>

      {isOpen &&
        createPortal(
          <div
            className="popover fixed z-10 bg-white border border-gray-300 rounded-lg shadow-md"
            style={{
              top: popoverPosition.top,
              left: popoverPosition.left,
            }}
          >
            <div className="relative inline-block align-middle max-w-xs w-full p-2">
              <div className="text-lg font-semibold">Actions</div>
              <ul className="mt-2 space-y-2">
                {actions.map((action, index) => (
                  <li key={'action' + index} className="flex items-center space-x-2">
                    <Button
                      size="small"
                      intent="text"
                      className="text-gray-600 hover:text-gray-800 flex items-center w-full"
                      onClick={() => {
                        action.onClick(selectedRowIndex);
                        closePopover();
                      }}
                    >
                      {action.icon && (
                        <span className="text-gray-500">{action.icon}</span>
                      )}
                      {action.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default DataGridWithActions;
