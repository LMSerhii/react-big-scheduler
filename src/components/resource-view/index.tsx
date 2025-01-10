import React from 'react';
import { Resource } from '../../types';

interface ResourceViewProps {
  resource: Resource;
  height: number;
}

const ResourceView: React.FC<ResourceViewProps> = ({ resource, height }) => {
  return (
    <div style={{ height: `${height}px` }} className="resource-view">
      <span>{resource.name}</span>
    </div>
  );
};

export default ResourceView;