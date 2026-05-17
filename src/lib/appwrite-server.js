// src/lib/appwrite-server.js
import 'server-only';
import { Client, Databases, Users } from 'node-appwrite';

function createServerClient() {
  const client = new Client();

  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || '');

  return client;
}

const client = createServerClient();
const databases = new Databases(client);
const adminUsers = new Users(client);

export { client, databases, adminUsers };
