import React from 'react';
import { Tag } from 'react-feather';
import Badge from '@/components/Badge';
import Text from '@/components/Text';
import {tagColors} from '@/lib/utils';


const TagsSection = ({ tags, label=null }) => {
  return (
    <>
      {tags && tags.length > 0 && (
        <>
          <div className="flex items-center mb-2">
            <Tag className="mr-2" size={16} color={tagColors.primary} />
            <Text size="small" intent="secondary" className="font-bold">
              {label || 'Tags'} :
            </Text>
          </div>
          <ul className="flex gap-2 list-inside ml-2">
            {tags.map((tag, index) => (
              <li key={index}>
                <Badge variant="primary" className="p-1">
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default TagsSection;