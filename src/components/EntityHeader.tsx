import React from 'react';
import {PlusCircle} from 'react-feather';
import ButtonLink from '@/components/utils/ButtonLink';
import {Button} from '@/components/ui/button';

const EntityHeader = ({title, actions, addAction,children}:any) => {
  return (
    <div className="container mx-auto">
      <div className="space-y-4 rounded-[28px] border border-slate-200/90 bg-white px-6 py-6 shadow-[0_12px_24px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Workspace</p>
            <h4 className="font-display text-4xl font-bold text-slate-900">{title}</h4>
            <div className="flex flex-wrap items-center gap-2">
              {actions.map((action, index) => (
                <Button
                  variant="link"
                  key={index}
                  size="sm"
                  onClick={action.onClick}
                  className="flex items-center space-x-1 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 no-underline hover:border-primary/30 hover:bg-orange-50"
                >
                  {action.icon}
                  <span className="font-medium text-slate-700">{action.text}</span>
                </Button>
              ))}
            </div>
          </div>
          <div>
            {addAction ? ( <ButtonLink
              href={addAction}
              size="small"
              intent={'primary'}
              className="oasis-button flex items-center space-x-1 rounded-2xl px-4 py-3"
            >
              <PlusCircle color="#FFFFFF" size={20}/>
              <span className="px-1 text-neutral-50">Add</span>
            </ButtonLink>): children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityHeader;
