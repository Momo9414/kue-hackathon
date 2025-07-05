import React from 'react';
import ModulePlaceholder from '../common/ModulePlaceholder';

const DocumentsModule = ({ userType }) => {
  return (
    <ModulePlaceholder 
      moduleName="Génération de Documents"
      description="Générez automatiquement vos documents juridiques personnalisés"
      icon="📄"
    />
  );
};

export default DocumentsModule;
