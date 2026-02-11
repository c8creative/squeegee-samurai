# API Contract – Squeegee Samurai

## Base URL
- Local (Express): `http://localhost:3000`
- Production (Vercel): same-origin via `vercel.json` routes

---

## POST /api/quote

Submit a quote request. Server validates, recomputes quote, stores lead, generates PDF, and sends emails.

### Request
`Content-Type: application/json`

```json
{
  "contact": {
    "firstName": "string (optional for commercial)",
    "lastName": "string (optional for commercial)",
    "email": "string (required)",
    "phone": "string (optional)",
    "address": "string (optional)",
    "city": "string (optional)",
    "zipCode": "string (optional)"
  },
  "formInput": {
    "propertyType": "string (optional)",
    "serviceType": "interior | exterior | Interior+Exterior",
    "windowCount": "number",
    "screenCount": "number",
    "stories": "string (optional)",
    "frequency": "string (optional)",
    "interiorExterior": "string (optional)",
    "estimatedPrice": "number (optional, residential calculator result)",
    "businessName": "string (optional, commercial)",
    "additionalServices": ["string"],
    "specialRequests": "string (optional)",
    "preferredContact": "string (optional)",
    "bestTimeToCall": "string (optional)",
    "couponCode": "string (optional)",
    "imageUrls": ["string (optional)"]
  }
}
```

### Server-Side Processing
1. Validate request body
2. Recompute quote (server-side authoritative)
3. Save to `quotes` table
4. Generate branded PDF → upload to Supabase Storage
5. Email customer with signed PDF link (Resend)
6. Email owner with lead notification + PDF link (Resend)
7. Update DB with PDF/email metadata

> PDF/email failures are logged but do not fail the request.

### Response (201)
```json
{
  "success": true,
  "quoteId": "uuid",
  "total": 123,
  "breakdown": { "subtotal": 100, "discount": 10, "total": 90 },
  "message": "Quote received. We'll be in touch within 24 hours."
}
```

### Response (400)
Validation error: `{ "success": false, "error": "message" }`

### Response (405)
Method not allowed: `{ "success": false, "error": "Method not allowed" }`

### Response (500)
Server error: `{ "success": false, "error": "message" }`

---

## GET /api/health

Liveness/readiness. No auth.

### Response (200)
```json
{
  "status": "ok",
  "service": "squeegee-samurai-api",
  "timestamp": "ISO8601"
}
```

---

## GET /api/test-pdf (dev only)

Renders a sample PDF with test data. Returns `application/pdf` for in-browser viewing.

### Response (200)
`Content-Type: application/pdf`

Binary PDF content displayed inline in the browser.

### Response (500)
`{ "success": false, "error": "message" }`
