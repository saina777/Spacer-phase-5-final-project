import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HomePage from './pages/HomePage.jsx'
import ClientDashboard from './pages/ClientDashboard.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
	const { isAuthenticated, user } = useSelector(state => state.auth)
	
	if (!isAuthenticated) {
		return <Navigate to="/" replace />
	}
	
	if (requiredRole && user?.role !== requiredRole) {
		return <Navigate to="/" replace />
	}
	
	return children
}

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route 
				path="/client-dashboard" 
				element={
					<ProtectedRoute requiredRole="client">
						<ClientDashboard />
					</ProtectedRoute>
				} 
			/>
			<Route 
				path="/admin-dashboard" 
				element={
					<ProtectedRoute requiredRole="admin">
						<AdminDashboard />
					</ProtectedRoute>
				} 
			/>
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	)
} 
