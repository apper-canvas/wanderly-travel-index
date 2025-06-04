import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import AppHeader from '../components/organisms/AppHeader';
import AppFooter from '../components/organisms/AppFooter';
import DocumentManager from '../components/organisms/DocumentManager';
import SectionTitle from '../components/atoms/SectionTitle';
import ApperIcon from '../components/ApperIcon';
import { documentService } from '../services';

const WalletPage = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const result = await documentService.getAll();
      setDocuments(result || []);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = async (documentData) => {
    try {
      const newDocument = await documentService.create(documentData);
      setDocuments(prev => [...prev, newDocument]);
      toast.success("Document uploaded successfully!");
    } catch (err) {
      toast.error("Failed to upload document");
    }
  };

  const handleDocumentUpdate = async (id, updates) => {
    try {
      const updatedDocument = await documentService.update(id, updates);
      setDocuments(prev => prev.map(doc => 
        doc.documentId === id ? updatedDocument : doc
      ));
      toast.success("Document updated successfully!");
    } catch (err) {
      toast.error("Failed to update document");
    }
  };

  const handleDocumentDelete = async (id) => {
    try {
      await documentService.delete(id);
      setDocuments(prev => prev.filter(doc => doc.documentId !== id));
      toast.success("Document deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete document");
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesFilter = activeFilter === 'all' || doc.type === activeFilter;
    const matchesSearch = searchQuery === '' || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const documentStats = {
    total: documents.length,
    passports: documents.filter(d => d.type === 'passport').length,
    visas: documents.filter(d => d.type === 'visa').length,
    tickets: documents.filter(d => d.type === 'ticket').length,
    other: documents.filter(d => !['passport', 'visa', 'ticket'].includes(d.type)).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <AppHeader />
      
      <main className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <SectionTitle
              title="Digital Travel Wallet"
              description="Securely store and organize all your travel documents in one place"
              center
            />
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
          >
            <div className="glass-effect rounded-xl p-4 text-center">
              <ApperIcon name="FileText" className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{documentStats.total}</div>
              <div className="text-sm text-gray-600">Total Documents</div>
            </div>
            <div className="glass-effect rounded-xl p-4 text-center">
              <ApperIcon name="BookOpen" className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{documentStats.passports}</div>
              <div className="text-sm text-gray-600">Passports</div>
            </div>
            <div className="glass-effect rounded-xl p-4 text-center">
              <ApperIcon name="CreditCard" className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{documentStats.visas}</div>
              <div className="text-sm text-gray-600">Visas</div>
            </div>
            <div className="glass-effect rounded-xl p-4 text-center">
              <ApperIcon name="Ticket" className="h-8 w-8 text-amber-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{documentStats.tickets}</div>
              <div className="text-sm text-gray-600">Tickets</div>
            </div>
            <div className="glass-effect rounded-xl p-4 text-center">
              <ApperIcon name="Folder" className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{documentStats.other}</div>
              <div className="text-sm text-gray-600">Other</div>
            </div>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-effect rounded-xl p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {['all', 'passport', 'visa', 'ticket', 'other'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      activeFilter === filter
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Document Manager */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <DocumentManager
              documents={filteredDocuments}
              loading={loading}
              onUpload={handleDocumentUpload}
              onUpdate={handleDocumentUpdate}
              onDelete={handleDocumentDelete}
              searchQuery={searchQuery}
              activeFilter={activeFilter}
            />
          </motion.div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
};

export default WalletPage;