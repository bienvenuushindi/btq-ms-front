import Card from '@/components/utils/wrappers/Card';
import Text from '@/components/Text';
import React from 'react';

export default function Found(){
  return(
    <Card className="w-full flex items-center justify-center h-24 ">
      <Text size="medium" intent="tertiary" className="font-extrabold"> Not Found</Text>
      <div className="emoji-container">
        <div className={`emoji  happy`}>😊</div>
      </div>
    </Card>
  )
}