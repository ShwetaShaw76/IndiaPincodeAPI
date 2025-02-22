# IndiaPincodeAPI

## API Usage

### **Base URL**
```
http://localhost:3000
```


### **`GET /pincode`**
Retrieves a record by pincode.

**Query params**: `pin` (required)


### **`GET /office`**
Retrieves a list of offices by pincode.

**Query params**: `pin` (required)


### **`GET /location`**
Retrieves Google Maps URLs for offices by pincode and latitude.

**Query params**: `pin` (required), `latitude` (optional)


### **`POST /office`**
Retrieves a record by office name.

**Request Body**: `{ "officename": "office_name" }`
