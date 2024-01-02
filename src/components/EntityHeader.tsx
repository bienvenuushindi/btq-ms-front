import React from 'react';
import {PlusCircle} from 'react-feather';
import ButtonLink from '@/components/ButtonLink';
import Button from '@/components/Button';

const EntityHeader = ({title, actions, addAction,children}:any) => {
  return (
    <div className="container mx-auto">
      <div className="space-y-3">
        <div className="flex justify-between ">
          <div className="space-y-1">
            <h4 className="text-2xl">{title}</h4>
            <div className="flex items-center space-x-1">
              {actions.map((action, index) => (
                <Button
                  intent="text"
                  key={index}
                  size="small"
                  onClick={action.onClick}
                  className="flex items-center space-x-1"
                >
                  {action.icon}
                  <span className="text-gray-500 font-light">{action.text}</span>
                </Button>
              ))}
            </div>
          </div>
          <div>
            {addAction ? ( <ButtonLink
              href={addAction}
              size="small"
              intent={'primary'}
              className="px-3 py-2 rounded-md flex items-center space-x-1"
            >
              <PlusCircle color="#FFFFFF" size={20}/>
              <span className="text-neutral-50 px-1">Add</span>
            </ButtonLink>): children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityHeader;
