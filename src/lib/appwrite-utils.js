// src/lib/appwrite-utils.js
import { ID, Query } from 'node-appwrite';
import { databases } from './appwrite-server';

const DB_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;

/**
 * Fetch a single document from Appwrite
 */
export async function getDocument(collectionId, documentId) {
  try {
    const document = await databases.getDocument(DB_ID, collectionId, documentId);
    return document;
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
}

/**
 * Fetch all documents from a collection
 */
export async function getCollection(collectionId, limit = 100) {
  try {
    const response = await databases.listDocuments(DB_ID, collectionId, [Query.limit(limit)]);
    return response.documents;
  } catch (error) {
    console.error('Error fetching collection:', error);
    throw error;
  }
}

/**
 * Fetch page content
 */
export async function getPageContent() {
  try {
    const pages = await getCollection(process.env.NEXT_PUBLIC_PAGES_COLLECTION_ID);
    return pages[0] || null;
  } catch (error) {
    console.error('Error fetching page content:', error);
    throw error;
  }
}

/**
 * Fetch all services
 */
export async function getServices() {
  try {
    const services = await getCollection(process.env.NEXT_PUBLIC_SERVICES_COLLECTION_ID);
    return services.sort((a, b) => (a.order || 0) - (b.order || 0));
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
}

/**
 * Fetch all portfolio items
 */
export async function getPortfolio() {
  try {
    const portfolio = await getCollection(process.env.NEXT_PUBLIC_PORTFOLIO_COLLECTION_ID);
    return portfolio;
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    throw error;
  }
}

/**
 * Create a lead/booking
 */
export async function createLead(leadData) {
  try {
    const lead = await databases.createDocument(
      DB_ID,
      process.env.NEXT_PUBLIC_LEADS_COLLECTION_ID,
      ID.unique(),
      {
        ...leadData,
        status: 'pending',
        created_at: new Date().toISOString(),
      }
    );
    return lead;
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
}

/**
 * Update lead status
 */
export async function updateLeadStatus(leadId, status) {
  try {
    const lead = await databases.updateDocument(
      DB_ID,
      process.env.NEXT_PUBLIC_LEADS_COLLECTION_ID,
      leadId,
      { status }
    );
    return lead;
  } catch (error) {
    console.error('Error updating lead:', error);
    throw error;
  }
}

/**
 * Fetch all leads
 */
export async function getLeads() {
  try {
    const leads = await getCollection(process.env.NEXT_PUBLIC_LEADS_COLLECTION_ID, 500);
    return leads.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
}
