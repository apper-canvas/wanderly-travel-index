import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../ApperIcon';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Select from '../atoms/Select';

const DocumentCard = ({ document, index, viewMode, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editForm, setEditForm] = useState({
    name: document.name,
    type: document.type,
    description: document.description || '',
    expiryDate: document.expiryDate || '',
    issueDate: document.issueDate || '',
    country: document.country || '',
    documentNumber: document.documentNumber || ''
  });

  const getDocumentIcon = (type) => {
    const icons = {
      passport: 'BookOpen',
      visa: 'CreditCard',
      ticket: 'Ticket',
      insurance: 'Shield',
      other: 'FileText'
    };
    return icons[type] || 'FileText';
  };

  const getDocumentColor = (type) => {
    const colors = {
      passport: 'text-blue-600 bg-blue-100',
      visa: 'text-emerald-600 bg-emerald-100',
      ticket: 'text-amber-600 bg-amber-100',
      insurance: 'text-purple-600 bg-purple-100',
      other: 'text-gray-600 bg-gray-100'
    };
    return colors[type] || 'text-gray-600 bg-gray-100';
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await onUpdate(document.documentId, editForm);
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update document");
    }
  };

  const handleDelete = async () => {
    if (!isDeleting) {
      setIsDeleting(true);
      return;
    }
    
    try {
      await onDelete(document.documentId);
    } catch (err) {
      toast.error("Failed to delete document");
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString();
  };

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const sixMonthsFromNow = new Date(today.getTime() + (6 * 30 * 24 * 60 * 60 * 1000));
    return expiry <= sixMonthsFromNow;
  };

  const documentTypeOptions = [
    { value: 'passport', label: 'Passport' },
    { value: 'visa', label: 'Visa' },
    { value: 'ticket', label: 'Ticket' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'other', label: 'Other' }
  ];

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="glass-effect rounded-xl p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className={`p-3 rounded-lg ${getDocumentColor(document.type)}`}>
              <ApperIcon name={getDocumentIcon(document.type)} className="h-6 w-6" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-gray-900 truncate">{document.name}</h4>
                {isExpiringSoon(document.expiryDate) && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                    Expiring Soon
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 truncate">{document.description}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>Type: {document.type}</span>
                {document.expiryDate && (
                  <span>Expires: {formatDate(document.expiryDate)}</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"
            >
              <ApperIcon name="Edit" className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className={`p-2 rounded-lg transition-colors ${
                isDeleting 
                  ? 'text-red-600 bg-red-50' 
                  : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <ApperIcon name={isDeleting ? "AlertTriangle" : "Trash2"} className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Edit Modal for List View */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setIsEditing(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Edit Document</h3>
                  <div className="space-y-4">
                    <Input
                      label="Document Name"
                      value={editForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                    <Select
                      label="Document Type"
                      value={editForm.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      options={documentTypeOptions}
                    />
                    <Input
                      label="Description"
                      value={editForm.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                    <Input
                      type="date"
                      label="Expiry Date"
                      value={editForm.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end space-x-3 mt-6">
                    <Button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="px-4 py-2 bg-primary text-white"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="glass-effect rounded-xl overflow-hidden travel-card-hover group"
    >
      {/* Document Preview/Header */}
      <div className="relative h-32 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className={`p-4 rounded-full ${getDocumentColor(document.type)}`}>
          <ApperIcon name={getDocumentIcon(document.type)} className="h-8 w-8" />
        </div>
        
        {isExpiringSoon(document.expiryDate) && (
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
              Expiring Soon
            </span>
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex space-x-1">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 bg-white/80 text-gray-600 hover:text-primary rounded-lg backdrop-blur-sm transition-colors"
            >
              <ApperIcon name="Edit" className="h-4 w-4" />
            </button>
            <button
              onClick={handleDelete}
              className={`p-1.5 backdrop-blur-sm rounded-lg transition-colors ${
                isDeleting 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 text-gray-600 hover:text-red-600'
              }`}
            >
              <ApperIcon name={isDeleting ? "AlertTriangle" : "Trash2"} className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Document Info */}
      <div className="p-4">
        <div className="mb-3">
          <h4 className="font-semibold text-gray-900 mb-1 truncate">{document.name}</h4>
          <p className="text-sm text-gray-600 line-clamp-2">{document.description}</p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Type:</span>
            <span className="font-medium capitalize">{document.type}</span>
          </div>
          
          {document.country && (
            <div className="flex justify-between">
              <span className="text-gray-500">Country:</span>
              <span className="font-medium">{document.country}</span>
            </div>
          )}
          
          {document.documentNumber && (
            <div className="flex justify-between">
              <span className="text-gray-500">Number:</span>
              <span className="font-medium font-mono text-xs">{document.documentNumber}</span>
            </div>
          )}
          
          {document.expiryDate && (
            <div className="flex justify-between">
              <span className="text-gray-500">Expires:</span>
              <span className={`font-medium ${isExpiringSoon(document.expiryDate) ? 'text-red-600' : ''}`}>
                {formatDate(document.expiryDate)}
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            Added {formatDate(document.createdAt)}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setIsEditing(false)}
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
                  <h3 className="text-xl font-semibold text-gray-900">Edit Document</h3>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Document Name"
                    value={editForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., US Passport"
                  />
                  <Select
                    label="Document Type"
                    value={editForm.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    options={documentTypeOptions}
                  />
                </div>
                
                <Input
                  label="Description"
                  value={editForm.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Additional details about this document"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Country"
                    value={editForm.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    placeholder="Issuing country"
                  />
                  <Input
                    label="Document Number"
                    value={editForm.documentNumber}
                    onChange={(e) => handleInputChange('documentNumber', e.target.value)}
                    placeholder="Document number/ID"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="date"
                    label="Issue Date"
                    value={editForm.issueDate}
                    onChange={(e) => handleInputChange('issueDate', e.target.value)}
                  />
                  <Input
                    type="date"
                    label="Expiry Date"
                    value={editForm.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
                <Button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="px-6 py-2 bg-gradient-to-r from-primary to-primary-dark text-white"
                >
                  Save Changes
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DocumentCard;