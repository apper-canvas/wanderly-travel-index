import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../ApperIcon';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Select from '../atoms/Select';

const DocumentUpload = ({ onUpload, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'passport',
    description: '',
    expiryDate: '',
    issueDate: '',
    country: '',
    documentNumber: '',
    file: null
  });
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const documentTypeOptions = [
    { value: 'passport', label: 'Passport' },
    { value: 'visa', label: 'Visa' },
    { value: 'ticket', label: 'Flight/Train Ticket' },
    { value: 'insurance', label: 'Travel Insurance' },
    { value: 'other', label: 'Other Document' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload only JPEG, PNG, or PDF files');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setFormData(prev => ({ ...prev, file }));
    
    // Auto-fill name from filename if empty
    if (!formData.name) {
      const nameWithoutExtension = file.name.split('.').slice(0, -1).join('.');
      setFormData(prev => ({ ...prev, name: nameWithoutExtension }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error('Please enter a document name');
      return;
    }

    if (!formData.file) {
      toast.error('Please select a file to upload');
      return;
    }

    setUploading(true);
    
    try {
      // Simulate file upload delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create document data
      const documentData = {
        name: formData.name.trim(),
        type: formData.type,
        description: formData.description.trim(),
        expiryDate: formData.expiryDate || null,
        issueDate: formData.issueDate || null,
        country: formData.country.trim() || null,
        documentNumber: formData.documentNumber.trim() || null,
        fileName: formData.file.name,
        fileSize: formData.file.size,
        fileType: formData.file.type,
        fileUrl: URL.createObjectURL(formData.file), // In real app, this would be uploaded to cloud storage
        uploadedAt: new Date().toISOString()
      };

      await onUpload(documentData);
    } catch (error) {
      toast.error('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          isDragging
            ? 'border-primary bg-blue-50'
            : formData.file
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileInputChange}
          className="hidden"
        />
        
        {formData.file ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-center">
              <ApperIcon name="CheckCircle" className="h-12 w-12 text-green-500" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{formData.file.name}</p>
              <p className="text-sm text-gray-600">{formatFileSize(formData.file.size)}</p>
            </div>
            <Button
              onClick={() => setFormData(prev => ({ ...prev, file: null }))}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Remove file
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <ApperIcon name="Upload" className="h-12 w-12 text-gray-400" />
            </div>
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drop your document here
              </p>
              <p className="text-sm text-gray-600 mb-4">
                or click to browse files
              </p>
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-2 bg-primary text-white"
              >
                Choose File
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Supports: JPEG, PNG, PDF • Max size: 10MB
            </p>
          </div>
        )}
      </div>

      {/* Document Information Form */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Document Information</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Document Name *"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="e.g., US Passport"
            icon="FileText"
          />
          <Select
            label="Document Type *"
            value={formData.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
            options={documentTypeOptions}
            icon="Tag"
          />
        </div>
        
        <Input
          label="Description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Additional details about this document"
          icon="MessageSquare"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Country"
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            placeholder="Issuing country"
            icon="MapPin"
          />
          <Input
            label="Document Number"
            value={formData.documentNumber}
            onChange={(e) => handleInputChange('documentNumber', e.target.value)}
            placeholder="Document number/ID"
            icon="Hash"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="date"
            label="Issue Date"
            value={formData.issueDate}
            onChange={(e) => handleInputChange('issueDate', e.target.value)}
            icon="Calendar"
          />
          <Input
            type="date"
            label="Expiry Date"
            value={formData.expiryDate}
            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
            icon="AlertCircle"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <Button
          onClick={onCancel}
          disabled={uploading}
          className="px-6 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={uploading || !formData.name.trim() || !formData.file}
          className="px-6 py-2 bg-gradient-to-r from-primary to-primary-dark text-white disabled:opacity-50 disabled:transform-none"
          icon={uploading ? ApperIcon : ApperIcon}
          iconProps={{ 
            name: uploading ? "Loader" : "Upload", 
            className: uploading ? "animate-spin" : "" 
          }}
        >
          {uploading ? 'Uploading...' : 'Upload Document'}
        </Button>
      </div>
    </div>
  );
};

export default DocumentUpload;