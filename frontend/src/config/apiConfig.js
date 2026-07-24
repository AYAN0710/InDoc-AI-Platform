/**
 * Centralized API Configuration
 * Defaults to http://127.0.0.1:8000 for reliable IPv4 connections on Windows
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';
