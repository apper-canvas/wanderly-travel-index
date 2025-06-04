import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DocumentCard from '../molecules/DocumentCard';
import DocumentUpload from '../molecules/DocumentUpload';
import Button from '../atoms/Button';
import ApperIcon from '../ApperIcon';
import ShimmerEffect from '../atoms/ShimmerEffect';

const DocumentManager = ({ 
  documents, 
  loading, 
  onUpload, 
  onUpdate, 
  onDelete,
  searchQuery,
  activeFilter 
}) => {
  const [showUpload, setShowUpload] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const handleUploadComplete = (documentData) => {
    onUpload(documentData);
    setShowUpload(false);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <ShimmerEffect className="h-8 w-48" />
          <ShimmerEffect className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ShimmerEffect key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {documents.length} Document{documents.length !== 1 ? 's' : ''}
            {searchQuery && (
              <span className="text-sm font-normal text-gray-600 ml-2">
                matching "{searchQuery}"
              </span>
            )}
          </h3>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
            >
              <ApperIcon name="Grid3X3" className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
            >
              <ApperIcon name="List" className="h-4 w-4" />
            </button>
          </div>
          
          <Button
            onClick={() => setShowUpload(true)}
            className="px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white"
            icon={ApperIcon}
            iconProps={{ name: "Plus" }}
          >
            Add Document
          </Button>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUpload(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-900">Upload Document</h3>
                  <button
                    onClick={() => setShowUpload(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <DocumentUpload
                  onUpload={handleUploadComplete}
                  onCancel={() => setShowUpload(false)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Documents Display */}
      {documents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto">
            <ApperIcon name="FileText" className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-gray-700 mb-2">No Documents Found</h4>
            <p className="text-gray-600 mb-6">
              {searchQuery || activeFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Start by uploading your first travel document'
              }
            </p>
            {!searchQuery && activeFilter === 'all' && (
              <Button
                onClick={() => setShowUpload(true)}
                className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white"
                icon={ApperIcon}
                iconProps={{ name: "Upload" }}
              >
                Upload First Document
              </Button>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          layout
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          <AnimatePresence>
            {documents.map((document, index) => (
              <DocumentCard
                key={document.documentId}
                document={document}
                index={index}
                viewMode={viewMode}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default DocumentManager;