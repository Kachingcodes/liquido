'use client';
import React, { useEffect, useState } from 'react';
import { db } from '@/app/firebase'; // adjust path
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { Check } from 'lucide-react';
import moment from 'moment';
import { motion } from 'framer-motion';


const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // filter the types of messages all | new | read
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);


  useEffect(() => {
    const q = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const markAsRead = async (id) => {
    const docRef = doc(db, 'contactMessages', id);
    await updateDoc(docRef, { status: 'read' });
  };

  const handleExportCSV = () => {
    const filtered = filteredMessages();
    if (!filtered.length) return alert('No messages to export.');

    const headers = ['Name', 'Contact', 'Social', 'Message', 'Status', 'Sent At'];
    const rows = filtered.map(msg => [
      msg.name,
      msg.contact,
      msg.social || '',
      msg.message,
      msg.status,
      msg.createdAt?.toDate ? moment(msg.createdAt.toDate()).format('DD/MM/YYYY, hh:mm A') : ''
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `contact_messages_${moment().format('YYYYMMDD_HHmm')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredMessages = () => {
    if (filter === 'all') return messages;
    return messages.filter(msg => msg.status === filter);
  };

  if (loading) return <p className="p-6">Loading messages...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contact Messages</h1>

      {/* Filters + Export */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`px-3 py-1 rounded ${filter === 'new' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('new')}
        >
          New
        </button>
        <button
          className={`px-3 py-1 rounded ${filter === 'read' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setFilter('read')}
        >
          Read
        </button>

        <button
          className="px-3 py-1 ml-auto bg-green-500 text-white rounded hover:bg-green-600"
          onClick={handleExportCSV}
        >
          Export CSV
        </button>
      </div>

      {filteredMessages().length === 0 && <p>No messages to display.</p>}

      <div className="space-y-4">

        {filteredMessages().map(msg => (
          <div key={msg.id} className={`p-4 rounded-lg shadow-md ${msg.status === 'new' ? 'bg-blue-50' : 'bg-gray-100'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p><strong>Name:</strong> {msg.name}</p>
                <p><strong>Contact:</strong> {msg.contact}</p>
                {msg.social && <p><strong>Social:</strong> {msg.social}</p>}
                <p><strong>Message:</strong> {msg.message}</p>
                <p className="text-sm text-gray-500">
                  <strong>Sent:</strong> {msg.createdAt?.toDate ? moment(msg.createdAt.toDate()).format('DD MMM YYYY, hh:mm A') : '—'}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {msg.status === 'new' && (
                  <button onClick={() => markAsRead(msg.id)} className="bg-green-500 text-white px-2 py-1 rounded flex items-center gap-1 hover:bg-green-600">
                    <Check size={16} /> Mark as Read
                  </button>
                )}

                {/* Delete button */}
                <button
                  onClick={() => {
                  setDeleteId(msg.id);
                  setShowDeleteModal(true);
                }}
                  className="bg-red-500 text-white px-2 py-1 rounded flex items-center gap-1 hover:bg-red-600"
                >
                  Delete
                </button>

                <span className={`px-2 py-1 rounded text-white ${msg.status === 'new' ? 'bg-blue-500' : 'bg-gray-500'}`}>
                  {msg.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showDeleteModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-2xl p-6 max-w-sm w-[90%] shadow-xl text-center"
    >
      <h2 className="text-xl font-semibold text-[#1C4672] mb-2">
        Delete Message?
      </h2>
      <p className="text-gray-600 text-sm">
        This action cannot be undone. Are you sure you want to remove this message?
      </p>

      <div className="flex justify-center gap-3 mt-5">
        {/* Cancel button */}
        <button
          onClick={() => {
            setShowDeleteModal(false);
            setDeleteId(null);
          }}
          className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        >
          Cancel
        </button>

        {/* Delete button */}
        <button
          onClick={async () => {
            try {
              setDeleting(true);
              await deleteDoc(doc(db, "contactMessages", deleteId));

              setDeleting(false);
              setShowDeleteModal(false);
              setDeleteId(null);
            } catch (err) {
              console.error(err);
              alert("Failed to delete message.");
              setDeleting(false);
            }
          }}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition shadow"
        >
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </motion.div>
  </div>
)}

    </div>
  );
};

export default AdminMessages;
