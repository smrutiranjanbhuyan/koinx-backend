# KoinX Backend Assignment - Deployment Guide

## Live App
The app is deployed on [Render](https://render.com). Access it here:

**Live App**: [https://koinx-backend-yshh.onrender.com/api](https://koinx-backend-yshh.onrender.com/api)

## API Endpoints

1. **Get Latest Cryptocurrency Data:**
   - Endpoint: `/stats?coin=bitcoin`
   - Example: 
     ```bash
     https://koinx-backend-yshh.onrender.com/api/stats?coin=bitcoin
     ```

2. **Get Price Standard Deviation:**
   - Endpoint: `/deviation?coin=bitcoin`
   - Example:
     ```bash
     https://koinx-backend-yshh.onrender.com/api/deviation?coin=bitcoin
     ```

## Deployment Details
- **Backend**: Deployed on Render (free tier).
- **MongoDB**: Hosted on MongoDB Atlas.

## Testing the API
- Use Postman or cURL to make requests to the live endpoints.

---

Thank you for reviewing the deployment!
