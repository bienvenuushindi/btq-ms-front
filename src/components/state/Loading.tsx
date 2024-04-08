import Text from '@/components/Text';
import React from 'react';
import Card from '@/components/utils/wrappers/Card';

export default function DataLoading(){
  return(
    <Card className="w-full flex items-center justify-center h-24 bg-white ">
      <div className="emoji-container">
        <div className={`emoji  sad`}> 🤔</div>
      </div><Text size="medium" intent="tertiary" className="font-extrabold">Loading ...</Text>
    </Card>
  )
}