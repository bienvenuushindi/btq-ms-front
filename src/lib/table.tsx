import {Edit, Trash2} from "react-feather";

const actions = [
    {
        label: 'Edit',
        className: 'text-lightBlue-100',
        icon: (
            <Edit size={20} color="#2962FF"/>
        ),
        onClick: (rowIndex: any) => {
            console.log(`Edit clicked for row ${rowIndex}`);
        },
    },
    {
        label: 'Delete',
        className: 'text-red-600',
        icon: (
            <Trash2 size={20} color="#EF4444FF"/>
        ),
        onClick: (rowIndex: any) => {
            console.log(`Delete clicked for row ${rowIndex}`);
        },
    },
];

export default actions;